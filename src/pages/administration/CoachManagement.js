import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEye, FiEyeOff, FiX, FiEdit, FiTrash2, FiUser, FiClipboard, FiLayers } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CoachManagement = ({ coaches, setCoaches, groups: groupsProp }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [editCoachId, setEditCoachId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [expandedCoach, setExpandedCoach] = useState(null);
  const [groups, setGroups] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    club: '',
    role: 'coach',
    groups: [] // Array of group IDs
  });

  // Initialize groups (use prop if available, otherwise use local state)
  useEffect(() => {
    if (groupsProp && groupsProp.length > 0) {
      setGroups(groupsProp);
    } else {
      // Fallback: Initialize groups matching PlayerManagement structure
      const mockGroups = [
        { id: 1, name: 'First Team', description: 'Main team players' },
        { id: 2, name: 'Reserves', description: 'Reserve team players' },
        { id: 3, name: 'Academy', description: 'Academy players' }
      ];
      setGroups(mockGroups);
    }
  }, [groupsProp]);

  // Mock data for demonstration
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockCoaches = [
        {
          id: 1,
          username: 'coach_sarah',
          email: 'sarah@example.com',
          phone: '+1234567890',
          club: 'FC Barcelona',
          role: 'head_coach',
          groups: [1, 2], // Array of group IDs
          teams: 3,
          rating: 4.8
        },
        {
          id: 2,
          username: 'coach_mike',
          email: 'mike@example.com',
          phone: '+1234567891',
          club: 'Real Madrid',
          role: 'coach',
          groups: [1],
          teams: 2,
          rating: 4.5
        },
        {
          id: 3,
          username: 'coach_lisa',
          email: 'lisa@example.com',
          phone: '+1234567892',
          club: 'Manchester United',
          role: 'assistant_coach',
          groups: [3],
          teams: 1,
          rating: 4.6
        },
        {
          id: 4,
          username: 'coach_david',
          email: 'david@example.com',
          phone: '+1234567893',
          club: 'Bayern Munich',
          role: 'coach',
          groups: [2, 3],
          teams: 4,
          rating: 4.9
        }
      ];
      setCoaches(mockCoaches);
      setIsLoading(false);
    }, 1000);
  }, [setCoaches]);

  // Add notification
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Password strength calculator
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return Math.min(strength, 5);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData(prev => ({ ...prev, password }));
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle group toggle (multi-select)
  const handleGroupToggle = (groupId) => {
    setFormData(prev => {
      const currentGroups = prev.groups || [];
      if (currentGroups.includes(groupId)) {
        return { ...prev, groups: currentGroups.filter(id => id !== groupId) };
      } else {
        return { ...prev, groups: [...currentGroups, groupId] };
      }
    });
  };

  // Get group names for a coach
  const getGroupNames = (groupIds) => {
    if (!groupIds || groupIds.length === 0) return [];
    return groups.filter(g => groupIds.includes(g.id)).map(g => g.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!editCoachId && passwordStrength < 3) {
      addNotification('Password is too weak. Please use a stronger password.', 'error');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (editCoachId) {
        setCoaches(coaches.map(c => (c.id === editCoachId ? { ...c, ...formData, groups: formData.groups || [] } : c)));
        addNotification('Coach updated successfully');
      } else {
        const newCoach = {
          id: coaches.length + 1,
          ...formData,
          groups: formData.groups || [],
          teams: 0,
          rating: 4.0
        };
        setCoaches(prev => [...prev, newCoach]);
        addNotification('Coach added successfully');
      }
      
      resetForm();
      setShowModal(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleEdit = (coach) => {
    setFormData({
      username: coach.username,
      email: coach.email,
      password: '',
      phone: coach.phone || '',
      club: coach.club || '',
      role: coach.role || 'coach',
      groups: coach.groups || [] // Array of group IDs
    });
    setEditCoachId(coach.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coach?')) {
      setCoaches(coaches.filter(coach => coach.id !== id));
      addNotification('Coach deleted successfully');
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      phone: '',
      club: '',
      role: 'coach',
      groups: []
    });
    setPasswordStrength(0);
    setEditCoachId(null);
    setShowPassword(false);
  };

  // UI helpers
  const filteredCoaches = (coaches || []).filter(coach => {
    const searchTermLower = (searchTerm || '').toLowerCase();
    const username = coach && coach.username ? String(coach.username).toLowerCase() : '';
    const email = coach && coach.email ? String(coach.email).toLowerCase() : '';
    const club = coach && coach.club ? String(coach.club).toLowerCase() : '';
    const role = coach && coach.role ? String(coach.role).toLowerCase() : '';

    return (
      username.includes(searchTermLower) ||
      email.includes(searchTermLower) ||
      club.includes(searchTermLower) ||
      role.includes(searchTermLower)
    );
  });

  const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-400',
    'bg-green-600'
  ];

  const roleColors = {
    head_coach: 'from-[#902bd1] to-[#4fb0ff]',
    coach: 'from-[#902bd1] to-[#7c3aed]',
    assistant_coach: 'from-[#4fb0ff] to-[#059669]'
  };

  const roleLabels = {
    head_coach: 'Head Coach',
    coach: 'Coach',
    assistant_coach: 'Assistant Coach'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="min-h-screen p-4 sm:p-6 md:p-8"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0f2a 45%, #180033 100%)'
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Notification System */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-xs w-full">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`p-4 rounded-xl shadow-lg backdrop-blur-sm border ${
                notification.type === 'success'
                  ? 'bg-gradient-to-r from-[#10B981]/20 to-[#059669]/20 border-green-700/50 text-green-100'
                  : 'bg-gradient-to-r from-red-900/30 to-red-800/20 border-red-700/50 text-red-100'
              }`}
            >
              <div className="flex items-start">
                <FiClipboard className={`flex-shrink-0 mt-0.5 mr-3 ${
                  notification.type === 'success' ? 'text-green-400' : 'text-red-400'
                }`} />
                <div className="text-sm font-medium">{notification.message}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#902bd1] via-[#00d0cb] to-[#00d0cb] bg-clip-text text-transparent">
                Coach Management
              </h1>
              <p className="text-gray-300 mt-2 text-base sm:text-lg">
                {isLoading ? 'Loading...' : `${coaches.length} coach${coaches.length !== 1 ? 'es' : ''} registered`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-gray-900/65 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-700/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#902bd1] to-[#7c3aed] flex items-center justify-center text-white font-bold">
                  <FiClipboard className="text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-white">Admin Access</p>
                  <p className="text-xs text-gray-400">Full Permissions</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] hover:from-[#00d0cb] hover:to-[#4fb0ff] text-white rounded-xl font-medium transition-all flex items-center gap-2"
                disabled={isLoading}
              >
                <FiPlus />
                Add Coach
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or club..."
              className="w-full pl-12 pr-4 py-3 bg-gray-900/65 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Coaches Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCoaches.length > 0 ? filteredCoaches.map((coach) => (
            <motion.div
              key={coach.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-gray-900/65 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-gray-600 transition-all"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${roleColors[coach.role]} flex items-center justify-center`}>
                      <FiUser className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{coach.username}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${roleColors[coach.role]} text-white`}>
                        {roleLabels[coach.role]}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(coach)}
                      className="p-2 rounded-lg bg-gradient-to-r from-[#4fb0ff]/20 to-[#00d0cb]/20 text-[#80a8ff] hover:from-[#4fb0ff]/30 hover:to-[#00d0cb]/30 transition-all duration-200"
                      title="Edit coach"
                    >
                      <FiEdit size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(coach.id)}
                      className="p-2 rounded-lg bg-gradient-to-r from-red-900/20 to-red-800/20 text-red-400 hover:from-red-900/30 hover:to-red-800/30 transition-all duration-200"
                      title="Delete coach"
                    >
                      <FiTrash2 size={18} />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="ml-2 text-white">{coach.email}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <span className="text-sm font-medium">Club:</span>
                    <span className="ml-2 text-white">{coach.club || 'No club'}</span>
                  </div>

                  {coach.phone && (
                    <div className="flex items-center text-gray-300">
                      <span className="text-sm font-medium">Phone:</span>
                      <span className="ml-2 text-white">{coach.phone}</span>
                    </div>
                  )}

                  {(coach.groups || []).length > 0 && (
                    <div className="flex flex-col text-gray-300">
                      <span className="text-sm font-medium mb-1">Groups:</span>
                      <div className="flex flex-wrap gap-1">
                        {getGroupNames(coach.groups).map((groupName, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[#902bd1]/20 to-[#7c3aed]/20 text-purple-300 border border-purple-700/30"
                          >
                            {groupName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-700/50">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{coach.teams || 0}</div>
                      <div className="text-xs text-gray-400">Teams</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{coach.rating || 4.0}</div>
                      <div className="text-xs text-gray-400">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )) : (
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-3 bg-gray-900/65 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4fb0ff]/20 to-[#902bd1]/20 flex items-center justify-center mx-auto mb-6">
                <FiUser className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No coaches found</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first coach'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] text-white rounded-xl hover:from-[#4fb0ff]/90 hover:to-[#00d0cb]/90 transition-all duration-300 flex items-center gap-2 font-medium mx-auto"
              >
                <FiPlus />
                Add Coach
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5 md:p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] bg-clip-text text-transparent">
                      {editCoachId ? 'Edit Coach' : 'Add New Coach'}
                    </h2>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <FiX size={20} />
                    </motion.button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Username */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username *</label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                          required
                          disabled={!!editCoachId}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                          required
                          disabled={!!editCoachId}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password {!editCoachId && '*'}
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                            required={!editCoachId}
                            placeholder={editCoachId ? 'Leave blank to keep current' : ''}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                          </button>
                        </div>
                        {!editCoachId && formData.password && (
                          <div className="mt-2">
                            <div className="flex gap-1 h-1.5 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 rounded-full ${i < passwordStrength ? strengthColors[i] : 'bg-gray-700'}`}
                                />
                              ))}
                            </div>
                            <p className="text-xs text-gray-400">
                              {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Enter password'}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Club */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Club</label>
                        <input
                          type="text"
                          name="club"
                          value={formData.club}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                        />
                      </div>

                      {/* Role */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                        >
                          <option value="coach" className="bg-gray-800">Coach</option>
                          <option value="head_coach" className="bg-gray-800">Head Coach</option>
                          <option value="assistant_coach" className="bg-gray-800">Assistant Coach</option>
                        </select>
                      </div>
                    </div>

                    {/* Groups Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Groups</label>
                      <div className="bg-gray-800/50 border border-gray-600/50 rounded-xl p-4 max-h-48 overflow-y-auto">
                        {groups.length > 0 ? (
                          <div className="space-y-2">
                            {groups.map((group) => (
                              <label
                                key={group.id}
                                className="flex items-center gap-3 cursor-pointer hover:bg-gray-700/30 p-2 rounded-lg transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={(formData.groups || []).includes(group.id)}
                                  onChange={() => handleGroupToggle(group.id)}
                                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-[#00d0cb] focus:ring-[#00d0cb] focus:ring-offset-gray-800"
                                />
                                <div className="flex-1">
                                  <div className="text-white font-medium">{group.name}</div>
                                  {group.description && (
                                    <div className="text-xs text-gray-400">{group.description}</div>
                                  )}
                                </div>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">No groups available. Create groups in Player Management first.</p>
                        )}
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowModal(false);
                          resetForm();
                        }}
                        className="px-5 py-2.5 bg-gray-800/50 text-gray-300 rounded-xl font-medium hover:bg-gray-700/50 transition-all border border-gray-700/50"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] hover:from-[#00d0cb] hover:to-[#4fb0ff] text-white rounded-xl font-medium transition-all flex items-center gap-2 min-w-32 justify-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiClipboard />
                            {editCoachId ? 'Save Changes' : 'Add Coach'}
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CoachManagement;