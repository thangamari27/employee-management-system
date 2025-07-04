# 🧑‍💼 Employee Management System (EMS)

A **role-based React application** that helps Admins, Managers, and Employees to **manage daily tasks**, **track attendance**, and **update profiles**. This system uses **conditional rendering, routing, and CRUD operations** with a well-structured folder architecture.

## 📌 Features

* 🔐 **Role-Based Authentication**
  Secure login and role-specific access (Admin, Manager, Employee).

* 🧽 **Role-Specific Dashboards**

  * **Admin**: View all users, assign tasks, track progress
  * **Manager**: Assign and manage team tasks
  * **Employee**: View and update own tasks

* 📝 **CRUD Operations**
  Add, view, update, and delete tasks with a smooth UI and real-time updates.

* 📊 **Attendance Tracking**
  Filter and manage daily attendance records per employee.

* 🧹 **Modular Component Structure**
  Reusable components like `TaskForm`, `TaskList`, `TaskDialog`, `AttendanceTable`.

* 💾 **LocalStorage & Firebase Support**
  (If used) Data persistence through browser localStorage and Firebase API integration.

* 📱 **Responsive Design**
  Fully responsive for all screen sizes using modern CSS layout techniques.

---

## 🛠️ Tech Stack

| Category       | Tech Used                                          |
| -------------- | -------------------------------------------------- |
| **Frontend**   | React.js, HTML5, CSS3, JavaScript                  |
| **Routing**    | React Router DOM                                   |
| **State**      | React Hooks (`useState`, `useEffect`, Context API) |
| **Storage**    | localStorage, Firebase (optional)                  |


---

## 🗂️ Folder Structure Overview

```
src/
├── api/                  # API utility files
├── assets/               # Static files (images, third-party styles)
├── components/           # Reusable components (Dashboard, Attendance, Tasks, etc.)
│   ├── Task-update-page/     # Task form, dialog, and list
│   ├── attendance/           # Attendance feature
│   └── cards/                # Dashboard cards
├── contexts/             # Auth context & reducers
├── firebase/             # Firebase config and API (if used)
├── layout/               # Page layouts and drawer/header
├── menu-items/           # Navigation config
├── pages/                # Main routes (Dashboards, Profile, Login, Register)
├── routes/               # Route definitions and protected routes
├── services/             # Business logic services
├── styles/               # Custom stylesheets
├── themes/               # Theme customization (Material UI overrides)
└── utils/                # Helper functions (password validation, colors, etc.)
```

---

## 🥪 How to Run Locally

```bash
# 1. Clone the project
git clone https://github.com/your-username/employee-management-system.git

# 2. Navigate to project directory
cd employee-management-system

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

---

## ✅ Future Improvements

* 📧 Email notifications on task updates
* 🗖️ Calendar-based task view
* 🡩‍🏫 Role-based onboarding guides

---

## Contact Info

*🔗 LinkedIn: [https://www.linkedin.com/in/thanga-mari-03334126b/]

*💼 Portfolio: [https://tm-dev-portfolio.web.app/]

*📧 Email: [mailto:thangamari616@gmail.com]

