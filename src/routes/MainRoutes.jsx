import { lazy } from "react";
import Loadable from "components/Loadable";
import Dashboard from "../layout/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const DashboardDefault = Loadable(lazy(() => import("pages/dashboard/index")));
const Profile = Loadable(lazy(() => import("pages/profile")));
const TaskTable = Loadable(lazy(() => import("pages/MainTaskTable")));
const TaskUpdate = Loadable(lazy(() => import("pages/MainTaskUpdate")));
const Attendance = Loadable(lazy(() => import("pages/AttendancePage")));
const AdminTaskTable = Loadable(lazy(() => import("pages/AdminTaskTable")))

// Define role-based access
const MainRoutes = {
  path: "/dashboard",
  element: <ProtectedRoute element={<Dashboard />} allowedRoles={["admin", "manager", "employee"]} />,
  children: [
    {
      path: "/dashboard",
      element: <ProtectedRoute element={<DashboardDefault />} allowedRoles={["admin", "manager", "employee"]} />,
    },
    {
      path: "/dashboard/profile",
      element: <ProtectedRoute element={<Profile />} allowedRoles={["admin", "manager", "employee"]} />,
    },
    {
      path: "/dashboard/TaskTable",
      element: <ProtectedRoute element={<TaskTable />} allowedRoles={["admin","employee"]} />,
    },
    {
      path:"/dashboard/AdminTaskTable",
      element:<ProtectedRoute element={<AdminTaskTable />} allowedRoles={["admin","manager"]} />
    },
    {
      path:"/dashboard/TaskUpdate",
      element: <ProtectedRoute element={<TaskUpdate />} allowedRoles={["admin","manager", "employee"]} />,
    },
    {
      path:"/dashboard/Attendance",
      element: <ProtectedRoute element={<Attendance />} allowedRoles={["admin", "employee"]} />,
    }
  ],
};

export default MainRoutes;
