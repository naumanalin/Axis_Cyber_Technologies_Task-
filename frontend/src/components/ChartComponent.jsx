// components/ChartComponent.jsx
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFetch from '../hooks/useFetch';
import { processData } from '../utils/ProcessData';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#FF9999'];

const ChartComponent = ({ type }) => {
  const { data } = useFetch("GET", "/api/transactions");
  const transactions = data?.transactions || [];
  const chartData = processData(transactions, type);

  const chartTitle = type === 'income' ? 'Income' : 'Expense';
  const noDataMessage = `No ${chartTitle.toLowerCase()} data available`;
  const barName = `${chartTitle} Bar-Chart`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">{chartTitle} Categories</h2>
      
      {chartData.length === 0 ? (
        <p className="text-gray-500">{noDataMessage}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`pie-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name={barName}
                  fill={type === 'income' ? '#4ECDC4' : '#FF6B6B'}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartComponent;