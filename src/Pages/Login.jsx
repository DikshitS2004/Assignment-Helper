import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const user = login(email, password);
      
      if (user.role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/teacher/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div className='flex items-center justify-center w-full min-h-screen p-4 sm:p-6 md:p-8'>
      <div className="login-container bg-[#D9EAFD] w-[82vw]    md:w-[20vw] lg:w-[20vw] lg:h-[25vw] p-4 sm:p-6 md:p-8  shadow-md">
        <h2 className='text-lg sm:text-xl md:text-[1.5vw] font-bold text-gray-900 mb-4 text-center'>Assignment Portal Login</h2>
        {error && <div className="error bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className='block text-xs sm:text-sm md:text-[0.8vw] mb-1 text-gray-700' htmlFor="email">Email</label>
            <input
              type="email"
              className='w-full bg-[#F2F9FF] p-2 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300'
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className='block text-xs sm:text-sm md:text-[0.8vw] mb-1 text-gray-700' htmlFor="password">Password</label>
            <input
              type="password"
              className='w-full bg-[#F2F9FF] p-2 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300'
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className='flex items-center justify-center mt-6'>
            <button 
              type="submit" 
              className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors w-full sm:w-auto sm:min-w-[7vw] sm:h-[2vw] flex items-center justify-center"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;