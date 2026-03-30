import { Message, Student, Parent, MessageLog } from "../models/index.js";

const resolveRecipients = async ({ audienceType, classId, sectionId, studentIds }) => {
  let parentIds = [];
  if (audienceType === "student") {
    const students = await Student.find({ studentId: { $in: studentIds } });
    parentIds = [...new Set(students.map((s) => s.parentId).filter(Boolean))];
  } else {
    const studentWhere = {};
    if (classId) studentWhere.classId = classId;
    if (sectionId) studentWhere.sectionId = sectionId;
    const students = await Student.find(studentWhere);
    parentIds = [...new Set(students.map((s) => s.parentId).filter(Boolean))];
  }
  return parentIds;
};

export const sendMessage = async (req, res) => {
  const { messageTitle, messageBody, audienceType, organizationId, classId, sectionId, studentIds = [], channels = "whatsapp,email", scheduledAt } = req.body;

  if (!messageTitle || !messageBody || !audienceType) {
    return res.status(400).json({ error: "messageTitle, messageBody and audienceType are required" });
  }

  const message = await Message.create({
    messageTitle,
    messageBody,
    audienceType,
    organizationId,
    classId,
    sectionId,
    studentIds: JSON.stringify(studentIds),
    channels,
    status: scheduledAt && new Date(scheduledAt) > new Date() ? "scheduled" : "sent",
    scheduledAt,
    sentBy: req.user.userId,
  });

  const parentIds = await resolveRecipients({ audienceType, classId, sectionId, studentIds });
  const parents = await Parent.find({ parentId: { $in: parentIds } });

  const logs = await Promise.all(
    parents.map((parent) =>
      MessageLog.create({
        messageId: message.messageId,
        parentId: parent.parentId,
        channel: channels,
        deliveryStatus: "sent",
        sentAt: new Date(),
      })
    )
  );

  res.status(201).json({ message, recipients: parents.length, logs: logs.length });
};

export const listMessages = async (req, res) => {
  const where = req.user.role === "superadmin" ? {} : { organizationId: req.user.organizationId };
  const messages = await Message.find(where);
  res.json(messages);
};

export const getMessage = async (req, res) => {
  const message = await Message.findOne({ messageId: req.params.id });
  if (!message) return res.status(404).json({ error: "Message not found" });
  res.json(message);
};
