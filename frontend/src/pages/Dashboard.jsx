import React from "react";
import TotalAmount from "../components/TotalAmount";
import Table from "../components/Table";

const Dashboard = () => {
  return (
    <div className=" min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <TotalAmount type="income" color="green" />
        <TotalAmount type="expense" color="red" />
        <TotalAmount type="income" of="of-current-month" color="blue" />
        <TotalAmount type="expense" of="of-current-month" color="yellow" />
      </div>

      <Table />
    </div>
  );
};

export default Dashboard;
