import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [togglePw, setTogglePW] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = { name, email, password };

    try {
      setIsLoading(true);
      const res = await axios.post('https://budget-tracker-server-lilac.vercel.app/api/user/signup', formData);

      if (res.data.success) {
        toast.success(res.data.message || '🎉 Registration successful!',  { autoClose: 5000, pauseOnHover: true, draggable: true });
        setName('')
        setEmail('');
        setPassword('')
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.',  { autoClose: 5000, pauseOnHover: true, draggable: true,});
      setPassword('')
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 min-h-[500px]">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              placeholder="Enter your name" 
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              placeholder="Enter your email" 
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between">
              <label className="block text-gray-700" htmlFor="password">Password</label>
              <span>
                <input 
                  type="checkbox" 
                  id="show" 
                  checked={togglePw} 
                  onChange={() => setTogglePW(!togglePw)} 
                  className="mx-1"
                /> 
                <label htmlFor="show" className="cursor-pointer text-blue-600">Show Password</label>
              </span>
            </div>
            <input 
              type={togglePw ? "text" : "password"} 
              id="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              placeholder="Enter your password" 
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Creating your account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
