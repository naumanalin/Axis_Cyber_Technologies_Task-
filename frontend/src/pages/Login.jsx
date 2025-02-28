  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { toast } from 'react-toastify';
  import axios from 'axios';
  
  const Login = () => {
    const [togglePw, setTogglePW] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  

    const handleLogin = async (e) => {
      e.preventDefault();
      const formData = { email, password, rememberMe };
    
      try {
        setIsLoading(true);
        const res = await axios.post(
          'https://budget-tracker-server-lilac.vercel.app/api/user/login', 
          formData,
          {
            withCredentials: true, // Crucial for cookies
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
    
        if (res.status === 200) {
          toast.success('Login successful!');
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('client_a_x_i_s_680', JSON.stringify(res.data.user));
          setPassword('');
          navigate('/dashboard');
        }
      } catch (error) {
        setPassword(''); 
        const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Login failed. Please try again.';
        toast.error(errorMessage);
        
        if (error.response?.status === 401) {
          toast.error('Invalied Credentials! Plz Provide Correct email, password.')
          setPassword('')
        }
      } finally {
        setIsLoading(false);
      }
    };
  
  


    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 min-h-[500px]">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin}>
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
                  <input type="checkbox" name='show' id='show' className="mx-1"/> 
                  <label htmlFor="show" className="cursor-pointer text-blue-600" onClick={() => setTogglePW(!togglePw)} >Show Password </label>
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
            <div className="flex justify-between items-center mb-4">
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  className="form-checkbox" 
                  name="rememberMe" 
                  checked={rememberMe} 
                  onChange={() => setRememberMe(!rememberMe)} 
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
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