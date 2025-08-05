import React from "react";
import AdminTaskTable from "../layout/DailyTask/adminTaskTable";
import { ToastContainer } from "react-toastify";

const adminTaskTable = () => {
  return (
    <div>
      <ToastContainer />
      <AdminTaskTable />
    </div>
  );
};

export default adminTaskTable;
