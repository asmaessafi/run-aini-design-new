import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Replace with actual API call
      setSuccess('Password reset instructions sent to your email');
      setEmail('');
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const gradientText = "bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] bg-clip-text text-transparent";

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
        className="w-full max-w-md md:max-w-lg relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10 space-y-4">
          <motion.h1
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${gradientText}`}
          >
            Reset Password
          </motion.h1>

          <p className="text-gray-400 text-lg md:text-xl">
            Remember your password?{' '}
            <Link
              to="/login"
              className="text-[#00d0cb] hover:text-[#00d0cb]/80 font-medium transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900/65 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gray-700/50 shadow-2xl">
          {/* Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-5 bg-red-950/60 border border-red-800/50 rounded-2xl text-red-300 text-center"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-5 bg-green-950/60 border border-green-800/50 rounded-2xl text-green-300 text-center"
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
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
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
              className={`w-full py-1.5  rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl ${
                isLoading
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] hover:brightness-110 text-white shadow-[#902bd1]/30'
              }`}
            >
              {isLoading ? 'Sending Instructions...' : 'Reset Password'}
            </motion.button>

            <div className="text-center pt-4 border-t border-gray-700/50">
              <span className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-[#00d0cb] hover:text-[#00d0cb]/80 font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;