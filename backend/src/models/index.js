import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  organizationId: { type: Number, unique: true, required: true },
  organizationName: { type: String, required: true, unique: true },
  organizationCode: { type: String, required: true, unique: true },
  contactEmail: String,
  contactPhone: String,
  status: { type: String, default: "active" },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true, required: true },
  name: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  password: String,
  role: { type: String, enum: ["superadmin", "admin", "teacher"], required: true },
  status: { type: String, default: "active" },
}, { timestamps: true });

const classSchema = new mongoose.Schema({
  classId: { type: Number, unique: true, required: true },
  className: { type: String, required: true },
}, { timestamps: true });

const sectionSchema = new mongoose.Schema({
  sectionId: { type: Number, unique: true, required: true },
  sectionName: { type: String, required: true },
}, { timestamps: true });

const teacherAssignmentSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  userId: { type: Number, required: true },
  classId: { type: Number, required: true },
  sectionId: Number,
}, { timestamps: true });

const parentSchema = new mongoose.Schema({
  parentId: { type: Number, unique: true, required: true },
  fatherName: String,
  motherName: String,
  primaryContactName: String,
  phone: { type: String, unique: true },
  whatsappNumber: String,
  email: { type: String, unique: true },
  address: String,
}, { timestamps: true });

const studentSchema = new mongoose.Schema({
  studentId: { type: Number, unique: true, required: true },
  studentName: String,
  rollNumber: String,
  status: { type: String, default: "active" },
}, { timestamps: true });

const messageSchema = new mongoose.Schema({
  messageId: { type: Number, unique: true, required: true },
  messageTitle: String,
  messageBody: { type: String, required: true },
  audienceType: { type: String, enum: ["all", "class", "section", "student"], required: true },
  classId: Number,
  sectionId: Number,
  studentIds: String,
  parentIds: String,
  channels: String,
  status: { type: String, default: "draft" },
  scheduledAt: Date,
}, { timestamps: true });

const messageLogSchema = new mongoose.Schema({
  logId: { type: Number, unique: true, required: true },
  messageId: { type: Number, required: true },
  parentId: { type: Number, required: true },
  channel: String,
  deliveryStatus: { type: String, enum: ["pending", "sent", "failed", "skipped"], default: "pending" },
  errorMessage: String,
  sentAt: Date,
}, { timestamps: true });

// Add foreign key references (optional in MongoDB, but for consistency)
organizationSchema.add({ organizationId: Number });
userSchema.add({ organizationId: Number });
classSchema.add({ organizationId: Number });
sectionSchema.add({ organizationId: Number, classId: Number });
teacherAssignmentSchema.add({ organizationId: Number });
parentSchema.add({ organizationId: Number });
studentSchema.add({ organizationId: Number, classId: Number, sectionId: Number, parentId: Number });
messageSchema.add({ organizationId: Number, sentBy: Number });
messageLogSchema.add({ messageId: Number, parentId: Number });

const Organization = mongoose.model("Organization", organizationSchema);
const User = mongoose.model("User", userSchema);
const Class = mongoose.model("Class", classSchema);
const Section = mongoose.model("Section", sectionSchema);
const TeacherAssignment = mongoose.model("TeacherAssignment", teacherAssignmentSchema);
const Parent = mongoose.model("Parent", parentSchema);
const Student = mongoose.model("Student", studentSchema);
const Message = mongoose.model("Message", messageSchema);
const MessageLog = mongoose.model("MessageLog", messageLogSchema);

export {
  Organization,
  User,
  Class,
  Section,
  TeacherAssignment,
  Parent,
  Student,
  Message,
  MessageLog,
};