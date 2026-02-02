
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { transformUserDataToProfile } from '../utils/userDataTransform';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password
      });

      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);

      if (userData) {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const profileData = transformUserDataToProfile(
          { ...storedUser, ...userData },
          {}
        );
        localStorage.setItem('user', JSON.stringify(profileData));

        setSuccess('Login successful! Redirecting...');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          if (userData.role === 'admin') {
            navigate('/administration/dashboard');
          } else if (userData.role === 'coach') {
            navigate('/coach/dashboard');
          } else {
            navigate('/players');
          }
        }, 1000);
      } else {
        setError('Login successful but user data missing');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const gradientText = "bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent";

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0f2a 45%, #180033 100%)'
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#902bd140,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#00d0cb30,transparent_60%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl relative z-10"
      >
        <div className="text-center mb-10 space-y-3">
          <motion.h1
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${gradientText}`}
          >
            Welcome to RUNAINI
          </motion.h1>

          <p className="text-gray-400 text-lg md:text-xl">
            Don't have an account yet?{' '}
            <a
              href="/signup"
              className="text-[#00d0cb] hover:text-[#00d0cb]/80 font-medium transition-colors"
            >
              Create one now
            </a>
          </p>
        </div>

        <div className="bg-gray-900/65 backdrop-blur-xl p-8 md:p-10 lg:p-12 rounded-3xl border border-gray-700/50 shadow-2xl">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-950/60 border border-red-800/50 rounded-2xl text-red-300 text-center"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-950/60 border border-green-800/50 rounded-2xl text-green-300 text-center"
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <h3 className={`text-2xl md:text-3xl font-extrabold text-center mb-8 ${gradientText}`}>
              Sign In
            </h3>

            <div className="space-y-6">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/60 rounded-2xl focus:border-[#00d0cb]/60 focus:ring-2 focus:ring-[#00d0cb]/30 outline-none transition-all placeholder-gray-500 text-white"
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/60 rounded-2xl focus:border-[#00d0cb]/60 focus:ring-2 focus:ring-[#00d0cb]/30 outline-none transition-all placeholder-gray-500 text-white"
                  placeholder="••••••••••••"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-600 bg-gray-800/50 checked:bg-[#00d0cb] checked:border-[#00d0cb] focus:ring-[#00d0cb]/30"
                    disabled={isLoading}
                  />
                  <span className="text-gray-400">Remember me</span>
                </label>

                <a
                  href="/forgot-password"
                  className="text-[#00d0cb] hover:text-[#00d0cb]/80 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-2.5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl ${
                isLoading
                  ? 'bg-gray-700 cursor-not-allowed'
                  : ' bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] p-3 hover:brightness-110 text-white shadow-[#902bd1]/30'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </motion.button>

            <div className="text-center pt-4 border-t border-gray-700/50">
              <span className="text-gray-400 text-sm">
                Back to homepage{' '}
                <a href="/" className="text-[#00d0cb] hover:text-[#00d0cb]/80 font-medium">
                  Click here
                </a>
              </span>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;