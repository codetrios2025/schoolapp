# Multi-Organization School Messaging System (Parent-Based)

## 📌 Overview

This system is a **multi-tenant communication platform** designed for schools.
It allows:

* Super Admin → manage multiple organizations (schools)
* Organization Admin → manage school data
* Teachers → access only assigned classes/sections
* Messaging → sent to **parents (not students)** based on class/section

---

## 🧩 Core Modules

### 1. Organization

* Manages schools
* Each organization is isolated (multi-tenant)

### 2. Users

* Roles:

  * `superadmin`
  * `admin`
  * `teacher`

### 3. Class & Section

* Class (e.g., 10th)
* Section (A, B, C)

### 4. Teacher Assignment

* Controls teacher access
* Defines which class/section a teacher can access

### 5. Students

* Belong to class & section
* Linked to parent

### 6. Parents

* Actual message receivers
* Can have multiple children

### 7. Messaging

* Send to parents based on:

  * Class
  * Section
  * Students

---

## 🧱 Database Schema

### Organization

```
organizationId (PK)
organizationName
organizationCode
contactEmail
contactPhone
status
createdAt
```

---

### User

```
userId (PK)
name
email
phone
password
role (superadmin/admin/teacher)
organizationId (FK)
status
createdAt
```

---

### Class

```
classId (PK)
className
organizationId (FK)
createdAt
```

---

### Section

```
sectionId (PK)
sectionName
classId (FK)
organizationId (FK)
createdAt
```

---

### TeacherAssignment

```
id (PK)
userId (FK → User)
classId (FK → Class)
sectionId (FK → Section) // NULL = full class access
organizationId (FK)
createdAt
```

---

### Parent

```
parentId (PK)
fatherName
motherName
primaryContactName
phone
whatsappNumber
email
address
organizationId (FK)
createdAt
```

---

### Student

```
studentId (PK)
studentName
rollNumber
classId (FK)
sectionId (FK)
parentId (FK)
organizationId (FK)
status
createdAt
```

---

### Message

```
messageId (PK)
messageTitle
messageBody
sentBy (FK → User)
organizationId (FK)

audienceType (all/class/section/student)

classId
sectionId
studentIds[]
parentIds[]

channels (whatsapp,email)

status
scheduledAt
createdAt
```

---

### MessageLog

```
logId (PK)
messageId (FK)
parentId (FK)

channel
deliveryStatus
errorMessage
sentAt
```

---

## 🔗 Relationships

* Organization → Users (1:N)
* Organization → Classes (1:N)
* Class → Sections (1:N)
* Section → Students (1:N)
* Parent → Students (1:N)
* User → TeacherAssignment (1:N)
* Message → MessageLog (1:N)

---

## 🔐 Access Control

### Super Admin

* Full access across organizations

### Organization Admin

* Full access within organization

### Teacher

* Access based on `TeacherAssignment`

#### Rules:

* `sectionId = NULL` → Full class access
* `sectionId = value` → Only that section

---

## 📩 Messaging Workflow

```
Select Class/Section
    ↓
Fetch Students
    ↓
Map Parents
    ↓
Remove Duplicate Parents
    ↓
Send Message (WhatsApp / Email)
    ↓
Store Logs
```

---

## 👨‍👩‍👧 Parent-Based Messaging Logic

* Students are used for filtering
* Parents are actual recipients
* If parent has multiple children:
  → Only ONE message is sent

---

## 📥 Bulk Upload (Excel)

### Supported Fields:

```
Student Name
Class
Section
Father Name
Mother Name
Phone
Email
```

### Flow:

```
Upload Excel
    ↓
Parse Data
    ↓
Check Parent (phone/email)
    ↓
Create Parent (if not exists)
    ↓
Create Student
    ↓
Link Parent & Student
```

---

## ⚙️ API Structure

### Auth

* POST /auth/login
* POST /auth/switch-org

### Organization

* GET /organizations
* POST /organizations

### Users

* POST /users
* GET /users

### Classes & Sections

* POST /classes
* POST /sections

### Students

* POST /students
* POST /students/upload

### Messaging

* POST /messages/send
* GET /messages/logs

---

## 🧠 Key Design Decisions

* Multi-tenant via `organizationId`
* Parent-based messaging (avoids duplication)
* Teacher restriction via `TeacherAssignment`
* Backend validation for security
* Scalable structure for large schools

---

## 🚀 Future Enhancements

* Message templates
* Scheduled messaging (cron jobs)
* Delivery tracking dashboard
* WhatsApp API integration
* Real-time notifications (Socket.io)

---

## 📌 Summary

This system ensures:

* ✅ Clean separation of organizations
* ✅ Controlled teacher access
* ✅ Efficient parent communication
* ✅ Scalable architecture
create full code file in this folder 
---

**End of Document**
