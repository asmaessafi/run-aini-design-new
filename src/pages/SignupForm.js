import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';
import { transformUserDataToProfile } from '../utils/userDataTransform';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    jobRole: '',
    club: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  if (!Object.values(formData).every(field => field.trim()) || !formData.jobRole) {
    setError('Please fill in all required fields');
    return;
  }

  if (!validateEmail(formData.email)) {
    setError('Please enter a valid email address');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  if (!/^\d{8}$/.test(formData.phone)) {
    setError('Phone number must be 8 numeric digits');
    return;
  }

  setIsLoading(true);

  try {
    const payload = {
  username: formData.email,           // <- requis (souvent = email)
  email: formData.email,
  password: formData.password,
  first_name: formData.firstName,
  last_name: formData.lastName,
  role: formData.jobRole,             // <- doit être "admin"
  club: formData.club,
  phone: formData.phone
};



    console.log("Payload envoyé :", payload);
    const response = await API.post('/signup/', payload);
    
    // Get token from response
    const token = response.data?.token;
    if (token) {
      localStorage.setItem('token', token);
    }

    // Transform signup data to profile structure
    const userProfileData = transformUserDataToProfile(
      {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        club: formData.club,
        role: formData.jobRole
      },
      formData
    );

    // Save structured user data to localStorage
    localStorage.setItem('user', JSON.stringify(userProfileData));

    setSuccess('Account created successfully! Redirecting...');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      jobRole: '',
      club: '',
      phone: ''
    });

    // Redirect based on role - go to dashboard
    setTimeout(() => {
      if (formData.jobRole === 'admin') {
        navigate('/administration/dashboard');
      } else if (formData.jobRole === 'coach' || formData.jobRole === 'Coaching') {
        navigate('/coach/dashboard');
      } else {
        navigate('/players');
      }
    }, 1500);
  }  catch (err) {
  console.log("Erreur complète:", err.response?.data); // 👈 Très important
  if (err.response && err.response.data) {
    const data = err.response.data;
    setError(
      typeof data === 'string'
        ? data
        : data.detail || JSON.stringify(data) // fallback pour afficher tous les messages
    );
  } else {
    setError('Registration failed. Please try again.');
  }
} finally {
    setIsLoading(false);
  }
};
return (
  <motion.div
    className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden px-4 md:px-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    style={{
      background: 'linear-gradient(135deg, #000000 0%, #0a0f2a 45%, #180033 100%)'
    }}
  >
    {/* Ambient brand glows */}
    <div className="absolute inset-0 opacity-15 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#902bd140,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#00d0cb30,transparent_60%)]" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="w-full max-w-2xl lg:max-w-3xl relative z-10"
    >
      {/* Header */}
      <div className="text-center mb-10 md:mb-12 space-y-4">
        <motion.h1
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-7 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent"
        >
          Join RUNAINI
        </motion.h1>

        <p className="text-gray-400 text-lg md:text-xl">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-[#00d0cb] hover:text-[#00d0cb]/80 font-medium transition-colors"
          >
            Login Now
          </a>
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-gray-900/65 backdrop-blur-xl p-8 md:p-10 lg:p-12 rounded-3xl border border-gray-700/50 shadow-2xl">
        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-red-950/60 border border-red-800/50 rounded-2xl text-red-300 text-center"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-green-950/60 border border-green-800/50 rounded-2xl text-green-300 text-center"
          >
            {success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/60 rounded-2xl focus:border-[#00d0cb]/60 focus:ring-2 focus:ring-[#00d0cb]/30 outline-none transition-all placeholder-gray-500 text-white"
                  placeholder="Enter first name"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/60 rounded-2xl focus:border-[#00d0cb]/60 focus:ring-2 focus:ring-[#00d0cb]/30 outline-none transition-all placeholder-gray-500 text-white"
                  placeholder="Enter last name"
                  required
                  disabled={isLoading}
                />
              </motion.div>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent">
              Account Details
            </h3>

            <div className="space-y-6">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/60 rounded-2xl focus:border-[#00d0cb]/60 focus:ring-2 focus:ring-[#00d0cb]/30 outline-none transition-all placeholder-gray-500 text-white"
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/60 rounded-2xl focus:border-[#00d0cb]/60 focus:ring-2 focus:ring-[#00d0cb]/30 outline-none transition-all placeholder-gray-500 text-white"
                    placeholder="Create password"
                    required
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Repeat Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/60 rounded-2xl focus:border-[#00d0cb]/60 focus:ring-2 focus:ring-[#00d0cb]/30 outline-none transition-all placeholder-gray-500 text-white"
                    placeholder="Confirm password"
                    required
                    disabled={isLoading}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] bg-clip-text text-transparent">
              Professional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Job Role <span className="text-red-400">*</span>
                </label>
                <select
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/60 rounded-2xl focus:border-[#00d0cb]/60 focus:ring-2 focus:ring-[#00d0cb]/30 outline-none transition-all text-white appearance-none"
                  required
                  disabled={isLoading}
                >
                  <option value="">Select your role</option>
                  <option value="admin">Admin</option>
                  <option value="Coaching">Coaching</option>
                  <option value="Player">Player</option>
                </select>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Sport <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value="Football"
                  disabled
                  className="w-full px-5 py-4 bg-gray-800/30 border border-gray-700/60 rounded-2xl cursor-not-allowed text-gray-400"
                />
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Club/Company <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="club"
                  value={formData.club}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700/60 rounded-2xl focus:border-[#00d0cb]/60 focus:ring-2 focus:ring-[#00d0cb]/30 outline-none transition-all placeholder-gray-500 text-white"
                  placeholder="Organization name"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Phone <span className="text-red-400">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-5 py-4 bg-gray-800/50 border border-r-0 border-gray-700/60 rounded-l-2xl text-gray-400">
                    +216
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 px-5 py-4 bg-gray-800/50 border border-gray-700/60 rounded-r-2xl focus:border-[#00d0cb]/60 focus:ring-2 focus:ring-[#00d0cb]/30 outline-none transition-all placeholder-gray-500 text-white"
                    placeholder="Phone number"
                    pattern="\d{8}"
                    required
                    disabled={isLoading}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Submit & Legal */}
          <div className="space-y-6 pt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
              className={`w-full py-3.5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl ${
                isLoading
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#4fb0ff] hover:brightness-110 text-white shadow-[#902bd1]/30'
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </motion.button>

            <p className="text-sm text-gray-400 text-center px-4 leading-relaxed">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-[#00d0cb] hover:text-[#00d0cb]/80 font-medium transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#00d0cb] hover:text-[#00d0cb]/80 font-medium transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  </motion.div>
);}

export default SignupForm;