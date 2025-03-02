import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleX } from 'lucide-react';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';

const AddNew = ({ open, setOpen }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const { refetch } = useFetch('GET', '/api/transactions');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !category || !type || !date || !amount) {
      toast.error('⚠️ All fields are required. Please fill in all details.');
      return;
    }

    if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(amount)) {
      toast.error('❌ Invalid amount. Please enter a positive number without signs.');
      return;
    }

    try {
      const response = await fetch('https://budget-tracker-server-lilac.vercel.app/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, category, type, date, amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      toast.success(data.message || '✅ Transaction added successfully!');
      setOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.message || '⚠️ Network error, please try again.');
    }
  };

  return (
    open && (
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-[500px] bg-[#f8f9fa] border border-green-500 p-3 rounded-lg shadow-lg z-10'
      >
        <h1 className='text-center font-semibold'>Add New Transaction</h1>
        <motion.button whileHover={{ scale: 1.1 }} onClick={() => setOpen(false)} className='absolute top-1 right-1 text-red-700 rounded-md'>
          <CircleX />
        </motion.button>

        <form onSubmit={submitHandler}>
          <div className='mb-2'>
            <label htmlFor='title' className='block text-gray-700'>Title</label>
            <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full px-4 py-2 border rounded-lg focus:outline-none' required />
          </div>

          <div className='mb-2'>
            <label className='block text-gray-700'>Transaction Type</label>
            <input type='radio' name='type' id='income' value='income' onChange={(e) => setType(e.target.value)} /> <label htmlFor='income'>Income</label>
            <input type='radio' name='type' id='expense' value='expense' onChange={(e) => setType(e.target.value)} /> <label htmlFor='expense'>Expense</label>
          </div>

          <div className='mb-2'>
            <label htmlFor='category' className='block text-gray-700'>Select Category</label>
            <select id='category' value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-2 border rounded-lg outline-none' required>
              <option value=''>Select a category</option>
              <optgroup label='Expenses'>
                <option value='Food & Dining'>Food & Dining</option>
                <option value='Rent/Mortgage'>Rent/Mortgage</option>
                <option value='Transportation'>Transportation</option>
              </optgroup>
              <optgroup label='Income'>
                <option value='Salary/Wages'>Salary/Wages</option>
                <option value='Freelance Income'>Freelance Income</option>
              </optgroup>
            </select>
          </div>

          <div className='mb-2'>
            <label htmlFor='amount' className='block text-gray-700'>Amount</label>
            <input type='number' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} className='w-full px-4 py-2 border rounded-lg focus:outline-none' required />
          </div>

          <div className='mb-2'>
            <label htmlFor='date' className='block text-gray-700'>Select Date</label>
            <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)} className='w-full px-4 py-2 border rounded-lg focus:outline-none' required />
          </div>

          <div className='flex justify-center items-center'>
            <button type='submit' className='w-[250px] bg-blue-500 text-white font-semibold cursor-pointer px-4 py-2 rounded-md text-center'>Add Transaction</button>
          </div>
        </form>
      </motion.div>
    )
  );
};

export default AddNew;
