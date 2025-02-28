import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '/home_image_1.jpg';
import image2 from '/home_image_2.jpg';

const HomeRoute = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Track Your Expenses & Income Easily</h1>
          <p className="text-lg text-gray-600 mb-6">Manage your finances effortlessly with our budget tracker. Keep track of every transaction and stay in control of your spending.</p>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700">Login</Link>
        </div>
        <div className="md:w-1/2">
          <img src={image1} alt="Budget Tracking" className="w-full rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Use Our Budget Tracker?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Easy to Use</h3>
            <p className="text-gray-600">A simple and intuitive interface that lets you track your finances effortlessly.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Secure & Private</h3>
            <p className="text-gray-600">Your financial data is safe and accessible only to you.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Insightful Reports</h3>
            <p className="text-gray-600">Analyze your spending habits with visual reports and charts.</p>
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16">
        <div className="md:w-1/2">
          <img src={image2} alt="Transactions Overview" className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-semibold mb-4">Track Your Transactions</h2>
          <p className="text-lg text-gray-600 mb-6">Easily log your income and expenses and stay updated with your financial health.</p>
          <Link to="/login" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700">Start Tracking</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeRoute;
