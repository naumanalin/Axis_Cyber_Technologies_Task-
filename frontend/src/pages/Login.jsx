import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';

const Login = () => {
  const [togglePw, setTogglePW] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await useFetch('POST', '/login', { email, password, rememberMe });
      
      if (data?.success) {
        localStorage.setItem('client_a_x_i_s_680', data.token);
        localStorage.setItem('user', user )
        toast.success('Login successful!');
        navigate('/dashboard')
      } else {
        toast.error(data?.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input 
              type="email" 
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              placeholder="Enter your email" 
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <label className="block text-gray-700" htmlFor='password'>Password</label>
              <span id='show' className='cursor-pointer' onClick={() => setTogglePW(!togglePw)}>
                <input type="checkbox" className='mx-1'/>Show Password
              </span>
            </div>
            <input 
              type={togglePw ? "text" : "password"} 
              id='password' 
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              placeholder="Enter your password" 
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;