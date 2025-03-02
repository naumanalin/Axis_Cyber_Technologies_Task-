import React, { useState } from "react";
import TotalAmount from "../components/TotalAmount";
import Table from "../components/Table";

const Dashboard = () => {
  const [openNew, setOpenNew] = useState(false)

  return (
    <div className=" min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <TotalAmount type="income" color="#22c55e" dependency={openNew} />
        <TotalAmount type="expense" color="#ef4444" dependency={openNew} />
        <TotalAmount type="income" color="#3b82f6" of="of-current-month" dependency={openNew}  />
        <TotalAmount type="expense" color="#eab308" of="of-current-month" dependency={openNew}  />
      </div>

      <Table openNew={openNew} setOpenNew={setOpenNew} />
    </div>
  );
};

export default Dashboard;
