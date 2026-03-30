import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import authRouter from "./routes/auth.js";
import organizationRouter from "./routes/organization.js";
import usersRouter from "./routes/users.js";
import classesRouter from "./routes/classes.js";
import sectionsRouter from "./routes/sections.js";
import teacherAssignmentRouter from "./routes/teacherAssignment.js";
import studentsRouter from "./routes/students.js";
import parentsRouter from "./routes/parents.js";
import messagesRouter from "./routes/messages.js";

dotenv.config();

await connectDB();

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/organizations", organizationRouter);
app.use("/users", usersRouter);
app.use("/classes", classesRouter);
app.use("/sections", sectionsRouter);
app.use("/teacher-assignments", teacherAssignmentRouter);
app.use("/students", studentsRouter);
app.use("/parents", parentsRouter);
app.use("/messages", messagesRouter);

app.get("/health", (req, res) => res.send({ status: "ok" }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
