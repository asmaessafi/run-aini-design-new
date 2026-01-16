import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEye, FiEyeOff, FiX, FiEdit, FiTrash2, FiUser, FiCheck, FiUsers, FiChevronRight, FiUserPlus, FiMail, FiPhone, FiMapPin, FiCalendar, FiXCircle, FiLayers, FiInfo, FiUserMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const PlayerManagement = () => {
  const [players, setPlayers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activeTab, setActiveTab] = useState('players'); // 'players' or 'groups'
  const [showModal, setShowModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showGroupDetailModal, setShowGroupDetailModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupSearchTerm, setGroupSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [editPlayerId, setEditPlayerId] = useState(null);
  const [editGroupId, setEditGroupId] = useState(null);
  const [errors, setErrors] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email: '',
    password: '',
    phone: '',
    position: '',
    status: 'Active',
    groups: [], // Changed from single group to groups array
    height: '',
    weight: '',
    address: '',
    notes: ''
  });

  // Group form state
  const [groupFormData, setGroupFormData] = useState({
    name: '',
    description: ''
  });

  // Mock data initialization with groups
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Initialize groups
      const mockGroups = [
        { id: 1, name: 'First Team', description: 'Main team players' },
        { id: 2, name: 'Reserves', description: 'Reserve team players' },
        { id: 3, name: 'Academy', description: 'Academy players' }
      ];
      setGroups(mockGroups);

      // Initialize players with groups array
      const mockPlayers = [
        {
          id: 1,
          username: 'alex_morgan',
          full_name: 'Alex Morgan',
          email: 'alex@example.com',
          phone: '+1234567890',
          position: 'Forward',
          status: 'Active',
          groups: [1], // Array of group IDs
          height: '180',
          weight: '75'
        },
        {
          id: 2,
          username: 'jordan_lee',
          full_name: 'Jordan Lee',
          email: 'jordan@example.com',
          phone: '+1234567891',
          position: 'Midfielder',
          status: 'Active',
          groups: [1, 2], // Can belong to multiple groups
          height: '175',
          weight: '70'
        },
        {
          id: 3,
          username: 'sam_rodriguez',
          full_name: 'Sam Rodriguez',
          email: 'sam@example.com',
          phone: '+1234567892',
          position: 'Defender',
          status: 'Active',
          groups: [2],
          height: '185',
          weight: '80'
        },
        {
          id: 4,
          username: 'chris_evans',
          full_name: 'Chris Evans',
          email: 'chris@example.com',
          phone: '+1234567893',
          position: 'Goalkeeper',
          status: 'Injured',
          groups: [1],
          height: '190',
          weight: '85'
        },
        {
          id: 5,
          username: 'mike_turner',
          full_name: 'Mike Turner',
          email: 'mike@example.com',
          phone: '+1234567894',
          position: 'Defender',
          status: 'Inactive',
          groups: [3],
          height: '178',
          weight: '72'
        }
      ];
      setPlayers(mockPlayers);
      setLoading(false);
    }, 1000);
  }, []);

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
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return Math.min(strength, 5);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!editPlayerId && !formData.password) {
      newErrors.password = 'Password is required';
    }

    if (formData.height && (formData.height < 100 || formData.height > 250)) {
      newErrors.height = 'Height must be between 100-250 cm';
    }

    if (formData.weight && (formData.weight < 30 || formData.weight > 200)) {
      newErrors.weight = 'Weight must be between 30-200 kg';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate group form
  const validateGroupForm = () => {
    const newErrors = {};
    if (!groupFormData.name.trim()) {
      newErrors.name = 'Group name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle group form changes
  const handleGroupFormChange = (e) => {
    const { name, value } = e.target;
    setGroupFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle group selection (multi-select)
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

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData(prev => ({ ...prev, password }));
    setPasswordStrength(calculatePasswordStrength(password));
    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
  };

  // Handle player submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (editPlayerId) {
        setPlayers(players.map(p => p.id === editPlayerId ? { ...p, ...formData } : p));
        addNotification('Player updated successfully');
      } else {
        const newPlayer = {
          id: players.length + 1,
          ...formData,
          groups: formData.groups || []
        };
        setPlayers([...players, newPlayer]);
        addNotification('Player added successfully');
      }

      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving player:', error);
      addNotification('Failed to save player', 'error');
    }
  };

  // Handle group submit
  const handleGroupSubmit = (e) => {
    e.preventDefault();

    if (!validateGroupForm()) {
      return;
    }

    try {
      if (editGroupId) {
        setGroups(groups.map(g => g.id === editGroupId ? { ...g, ...groupFormData } : g));
        addNotification('Group updated successfully');
      } else {
        const newGroup = {
          id: groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1,
          ...groupFormData
        };
        setGroups([...groups, newGroup]);
        addNotification('Group added successfully');
      }

      setShowGroupModal(false);
      resetGroupForm();
    } catch (error) {
      console.error('Error saving group:', error);
      addNotification('Failed to save group', 'error');
    }
  };

  // Handle player edit
  const handleEdit = (player) => {
    setEditPlayerId(player.id);
    setFormData({
      username: player.username, 
      full_name: player.full_name,
      email: player.email || '',
      password: '',
      phone: player.phone || '',
      position: player.position || '',
      status: player.status || 'Active',
      groups: player.groups || [], // Array of group IDs
      height: player.height || '',
      weight: player.weight || '',
      address: player.address || '',
      notes: player.notes || ''
    });
    setShowModal(true);
  };

  // Handle group edit
  const handleGroupEdit = (group) => {
    setEditGroupId(group.id);
    setGroupFormData({
      name: group.name,
      description: group.description || ''
    });
    setShowGroupModal(true);
  };

  // Handle player deletion
  const handleDelete = (id) => {
    try {
      const playerName = players.find(p => p.id === id)?.full_name || 'Player';

      if (window.confirm(`Are you sure you want to delete ${playerName}?`)) {
        setPlayers(players.filter(player => player.id !== id));
        addNotification(`${playerName} deleted successfully`);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      addNotification('Failed to delete player', 'error');
    }
  };

  // Handle group deletion
  const handleGroupDelete = (id) => {
    try {
      const groupName = groups.find(g => g.id === id)?.name || 'Group';

      if (window.confirm(`Are you sure you want to delete ${groupName}? Players will not be deleted, only the group assignment.`)) {
        // Remove group from all players
        setPlayers(players.map(player => ({
          ...player,
          groups: (player.groups || []).filter(gId => gId !== id)
        })));
        
        setGroups(groups.filter(group => group.id !== id));
        addNotification(`${groupName} deleted successfully`);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      addNotification('Failed to delete group', 'error');
    }
  };

  // Handle group detail view
  const handleGroupDetail = (group) => {
    setSelectedGroup(group);
    setShowGroupDetailModal(true);
  };

  // Add player to group
  const handleAddPlayerToGroup = (playerId) => {
    if (!selectedGroup) return;
    
    setPlayers(players.map(player => {
      if (player.id === playerId) {
        const currentGroups = player.groups || [];
        if (!currentGroups.includes(selectedGroup.id)) {
          return { ...player, groups: [...currentGroups, selectedGroup.id] };
        }
      }
      return player;
    }));
    addNotification('Player added to group');
  };

  // Remove player from group
  const handleRemovePlayerFromGroup = (playerId) => {
    if (!selectedGroup) return;
    
    setPlayers(players.map(player => {
      if (player.id === playerId) {
        return { ...player, groups: (player.groups || []).filter(gId => gId !== selectedGroup.id) };
      }
      return player;
    }));
    addNotification('Player removed from group');
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      username: "",
      full_name: '',
      email: '',
      password: '',
      phone: '',
      position: '',
      status: 'Active',
      groups: [],
      height: '',
      weight: '',
      address: '',
      notes: ''
    });
    setPasswordStrength(0);
    setEditPlayerId(null);
    setShowPassword(false);
    setErrors({});
  };

  // Reset group form
  const resetGroupForm = () => {
    setGroupFormData({
      name: '',
      description: ''
    });
    setEditGroupId(null);
    setErrors({});
  };

  // Get players in a group
  const getPlayersInGroup = (groupId) => {
    return players.filter(player => (player.groups || []).includes(groupId));
  };

  // Get available players for a group (players not in the group)
  const getAvailablePlayersForGroup = (groupId) => {
    return players.filter(player => !(player.groups || []).includes(groupId));
  };

  // Get group names for a player
  const getGroupNames = (groupIds) => {
    if (!groupIds || groupIds.length === 0) return [];
    return groups.filter(g => groupIds.includes(g.id)).map(g => g.name);
  };

  // Filter players
  const filteredPlayers = players.filter(player => {
    const matchesSearch = (
      player.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesSearch;
  });

  // Filter groups
  const filteredGroups = groups.filter(group => {
    return group.name?.toLowerCase().includes(groupSearchTerm.toLowerCase()) ||
           group.description?.toLowerCase().includes(groupSearchTerm.toLowerCase());
  });

  // Password strength indicators
  const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-400',
    'bg-green-600'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00d0cb]"></div>
      </div>
    );
  }

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

  const selectedGroupPlayers = selectedGroup ? getPlayersInGroup(selectedGroup.id) : [];
  const availablePlayersForGroup = selectedGroup ? getAvailablePlayersForGroup(selectedGroup.id) : [];

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
                <FiCheck className={`flex-shrink-0 mt-0.5 mr-3 ${
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
                Player & Group Management
              </h1>
              <p className="text-gray-300 mt-2 text-base sm:text-lg">
                {activeTab === 'players' 
                  ? `${players.length} player${players.length !== 1 ? 's' : ''} registered`
                  : `${groups.length} group${groups.length !== 1 ? 's' : ''} defined`
                }
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-gray-900/65 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-700/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] flex items-center justify-center text-white font-bold">
                  <FiUsers className="text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-white">Team Manager</p>
                  <p className="text-xs text-gray-400">Admin Access</p>
                </div>
              </div>
              
              {activeTab === 'players' ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] hover:from-[#00d0cb] hover:to-[#4fb0ff] text-white rounded-xl font-medium transition-all flex items-center gap-2"
                >
                  <FiPlus />
                  Add Player
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    resetGroupForm();
                    setShowGroupModal(true);
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] hover:from-[#00d0cb] hover:to-[#4fb0ff] text-white rounded-xl font-medium transition-all flex items-center gap-2"
                >
                  <FiPlus />
                  Add Group
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex gap-2 border-b border-gray-700/50">
            <button
              onClick={() => setActiveTab('players')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'players'
                  ? 'text-[#80a8ff] border-b-2 border-[#00d0cb]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <FiUsers />
                Players ({players.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'groups'
                  ? 'text-[#80a8ff] border-b-2 border-[#00d0cb]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <FiLayers />
                Groups ({groups.length})
              </div>
            </button>
          </div>
        </motion.div>

        {/* Players Tab */}
        {activeTab === 'players' && (
          <>
            {/* Search Bar */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/65 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Players Table */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-gray-900/65 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700/50">
                  <thead className="bg-gray-900/80">
                    <tr>
                      <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Player
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-wider hidden md:table-cell">
                        Contact
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                        Groups
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {filteredPlayers.length > 0 ? filteredPlayers.map((player) => {
                      const playerGroups = getGroupNames(player.groups || []);
                      return (
                        <motion.tr
                          key={player.id}
                          className="hover:bg-gray-800/40 transition-colors duration-200"
                          whileHover={{ x: 4 }}
                        >
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] flex items-center justify-center mr-3">
                                <FiUser className="text-white text-lg" />
                              </div>
                              <div>
                                <div className="text-sm md:text-base font-medium text-white">{player.full_name}</div>
                                <div className="text-xs text-gray-400">{player.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden md:table-cell">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <FiMail className="text-[#902bd1]" size={14} />
                                <span>{player.email || 'No email'}</span>
                              </div>
                              {player.phone && (
                                <div className="flex items-center gap-2">
                                  <FiPhone className="text-[#4fb0ff]" size={14} />
                                  <span>{player.phone}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[#4fb0ff]/20 to-[#00d0cb]/20 text-[#80a8ff] border border-[#4fb0ff]/30">
                              {player.position || '-'}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4 hidden lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {playerGroups.length > 0 ? (
                                playerGroups.map((groupName, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[#902bd1]/20 to-[#7c3aed]/20 text-purple-300 border border-purple-700/30"
                                  >
                                    {groupName}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-gray-500">No groups</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              player.status === 'Active'
                                ? 'bg-gradient-to-r from-[#10B981]/20 to-[#059669]/20 text-green-300 border border-green-700/40'
                                : player.status === 'Inactive'
                                ? 'bg-gradient-to-r from-red-900/40 to-red-800/30 text-red-300 border border-red-700/40'
                                : 'bg-gradient-to-r from-[#F59E0B]/20 to-[#D97706]/20 text-yellow-300 border border-yellow-700/40'
                            }`}>
                              {player.status}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEdit(player)}
                                className="p-2 rounded-lg bg-gradient-to-r from-[#4fb0ff]/20 to-[#00d0cb]/20 text-[#80a8ff] hover:from-[#4fb0ff]/30 hover:to-[#00d0cb]/30 transition-all duration-200"
                                title="Edit player"
                              >
                                <FiEdit size={18} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(player.id)}
                                className="p-2 rounded-lg bg-gradient-to-r from-red-900/20 to-red-800/20 text-red-400 hover:from-red-900/30 hover:to-red-800/30 transition-all duration-200"
                                title="Delete player"
                              >
                                <FiTrash2 size={18} />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4fb0ff]/20 to-[#902bd1]/20 flex items-center justify-center mb-4">
                              <FiUsers className="text-3xl text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">No players found</h3>
                            <p className="text-gray-400 mb-6 max-w-md">
                              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first player'}
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                resetForm();
                                setShowModal(true);
                              }}
                              className="px-5 py-2.5 bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] text-white rounded-xl hover:from-[#4fb0ff]/90 hover:to-[#00d0cb]/90 transition-all duration-300 flex items-center gap-2 font-medium"
                            >
                              <FiPlus />
                              Add Player
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}

        {/* Groups Tab */}
        {activeTab === 'groups' && (
          <>
            {/* Search Bar */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search groups..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/65 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                  value={groupSearchTerm}
                  onChange={(e) => setGroupSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>

            {/* Groups Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredGroups.length > 0 ? filteredGroups.map((group) => {
                const groupPlayers = getPlayersInGroup(group.id);
                return (
                  <motion.div
                    key={group.id}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="bg-gray-900/65 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-gray-600 transition-all"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#902bd1] to-[#7c3aed] flex items-center justify-center">
                            <FiLayers className="text-white text-xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-lg">{group.name}</h3>
                            <p className="text-xs text-gray-400">{groupPlayers.length} player{groupPlayers.length !== 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleGroupDetail(group)}
                            className="p-2 rounded-lg bg-gradient-to-r from-[#4fb0ff]/20 to-[#00d0cb]/20 text-[#80a8ff] hover:from-[#4fb0ff]/30 hover:to-[#00d0cb]/30 transition-all duration-200"
                            title="View details"
                          >
                            <FiInfo size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleGroupEdit(group)}
                            className="p-2 rounded-lg bg-gradient-to-r from-[#4fb0ff]/20 to-[#00d0cb]/20 text-[#80a8ff] hover:from-[#4fb0ff]/30 hover:to-[#00d0cb]/30 transition-all duration-200"
                            title="Edit group"
                          >
                            <FiEdit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleGroupDelete(group.id)}
                            className="p-2 rounded-lg bg-gradient-to-r from-red-900/20 to-red-800/20 text-red-400 hover:from-red-900/30 hover:to-red-800/30 transition-all duration-200"
                            title="Delete group"
                          >
                            <FiTrash2 size={18} />
                          </motion.button>
                        </div>
                      </div>

                      {group.description && (
                        <p className="text-sm text-gray-400 mb-4">{group.description}</p>
                      )}

                      <div className="pt-4 border-t border-gray-700/50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Players</span>
                          <span className="text-sm font-semibold text-white">{groupPlayers.length}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }) : (
                <motion.div 
                  variants={itemVariants}
                  className="lg:col-span-3 bg-gray-900/65 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4fb0ff]/20 to-[#902bd1]/20 flex items-center justify-center mx-auto mb-6">
                    <FiLayers className="text-3xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No groups found</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    {groupSearchTerm ? 'Try adjusting your search terms' : 'Start by adding your first group'}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      resetGroupForm();
                      setShowGroupModal(true);
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] text-white rounded-xl hover:from-[#4fb0ff]/90 hover:to-[#00d0cb]/90 transition-all duration-300 flex items-center gap-2 font-medium mx-auto"
                  >
                    <FiPlus />
                    Add Group
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}

        {/* Player Modal */}
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
                      {editPlayerId ? 'Edit Player' : 'Add New Player'}
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
                          className={`w-full px-4 py-2.5 bg-gray-800/70 border ${errors.username ? 'border-red-500/50' : 'border-gray-600/50'} rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300`}
                          required
                        />
                        {errors.username && <p className="mt-2 text-sm text-red-400">{errors.username}</p>}
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 bg-gray-800/70 border ${errors.full_name ? 'border-red-500/50' : 'border-gray-600/50'} rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300`}
                          required
                        />
                        {errors.full_name && <p className="mt-2 text-sm text-red-400">{errors.full_name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 bg-gray-800/70 border ${errors.email ? 'border-red-500/50' : 'border-gray-600/50'} rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300`}
                          required
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password {!editPlayerId && '*'}
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handlePasswordChange}
                            className={`w-full px-4 py-2.5 bg-gray-800/70 border ${errors.password ? 'border-red-500/50' : 'border-gray-600/50'} rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300`}
                            required={!editPlayerId}
                            placeholder={editPlayerId ? "Leave blank to keep current" : ""}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                          </button>
                        </div>
                        {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
                        {!editPlayerId && formData.password && (
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
                          placeholder="+1234567890"
                        />
                      </div>

                      {/* Position */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
                        <select
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                          required
                        >
                          <option value="" className="bg-gray-800">Select position</option>
                          <option value="Midfielder" className="bg-gray-800">Midfielder</option>
                          <option value="Defender" className="bg-gray-800">Defender</option>
                          <option value="Forward" className="bg-gray-800">Forward</option>
                          <option value="Goalkeeper" className="bg-gray-800">Goalkeeper</option>
                        </select>
                      </div>

                      {/* Height */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
                        <input
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 bg-gray-800/70 border ${errors.height ? 'border-red-500/50' : 'border-gray-600/50'} rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300`}
                          min="100"
                          max="250"
                          placeholder="160-200"
                        />
                        {errors.height && <p className="mt-2 text-sm text-red-400">{errors.height}</p>}
                      </div>

                      {/* Weight */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 bg-gray-800/70 border ${errors.weight ? 'border-red-500/50' : 'border-gray-600/50'} rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300`}
                          min="30"
                          max="200"
                          placeholder="50-100"
                        />
                        {errors.weight && <p className="mt-2 text-sm text-red-400">{errors.weight}</p>}
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
                          <p className="text-gray-400 text-sm">No groups available. Create groups first.</p>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                      >
                        <option value="Active" className="bg-gray-800">Active</option>
                        <option value="Inactive" className="bg-gray-800">Inactive</option>
                        <option value="Injured" className="bg-gray-800">Injured</option>
                      </select>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300 resize-none"
                      />
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
                        className="px-5 py-2.5 bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] hover:from-[#00d0cb] hover:to-[#4fb0ff] text-white rounded-xl font-medium transition-all flex items-center gap-2"
                      >
                        <FiCheck />
                        {editPlayerId ? 'Save Changes' : 'Add Player'}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Group Modal */}
        <AnimatePresence>
          {showGroupModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
              onClick={() => setShowGroupModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5 md:p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] bg-clip-text text-transparent">
                      {editGroupId ? 'Edit Group' : 'Add New Group'}
                    </h2>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setShowGroupModal(false);
                        resetGroupForm();
                      }}
                      className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <FiX size={20} />
                    </motion.button>
                  </div>

                  <form onSubmit={handleGroupSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Group Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={groupFormData.name}
                        onChange={handleGroupFormChange}
                        className={`w-full px-4 py-2.5 bg-gray-800/70 border ${errors.name ? 'border-red-500/50' : 'border-gray-600/50'} rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300`}
                        required
                        placeholder="e.g., First Team"
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={groupFormData.description}
                        onChange={handleGroupFormChange}
                        rows="3"
                        className="w-full px-4 py-2.5 bg-gray-800/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d0cb]/50 focus:border-[#00d0cb]/50 outline-none transition-all duration-300 resize-none"
                        placeholder="Optional description for this group"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowGroupModal(false);
                          resetGroupForm();
                        }}
                        className="px-5 py-2.5 bg-gray-800/50 text-gray-300 rounded-xl font-medium hover:bg-gray-700/50 transition-all border border-gray-700/50"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] hover:from-[#00d0cb] hover:to-[#4fb0ff] text-white rounded-xl font-medium transition-all flex items-center gap-2"
                      >
                        <FiCheck />
                        {editGroupId ? 'Save Changes' : 'Add Group'}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Group Detail Modal */}
        <AnimatePresence>
          {showGroupDetailModal && selectedGroup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
              onClick={() => setShowGroupDetailModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-5 md:p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] bg-clip-text text-transparent">
                        {selectedGroup.name}
                      </h2>
                      {selectedGroup.description && (
                        <p className="text-gray-400 mt-1">{selectedGroup.description}</p>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowGroupDetailModal(false)}
                      className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <FiX size={20} />
                    </motion.button>
                  </div>

                  <div className="space-y-6">
                    {/* Assigned Players */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">Assigned Players ({selectedGroupPlayers.length})</h3>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-600/50 rounded-xl p-4 max-h-64 overflow-y-auto">
                        {selectedGroupPlayers.length > 0 ? (
                          <div className="space-y-2">
                            {selectedGroupPlayers.map((player) => (
                              <div
                                key={player.id}
                                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] flex items-center justify-center">
                                    <FiUser className="text-white" />
                                  </div>
                                  <div>
                                    <div className="text-white font-medium">{player.full_name}</div>
                                    <div className="text-xs text-gray-400">{player.email}</div>
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleRemovePlayerFromGroup(player.id)}
                                  className="p-2 rounded-lg bg-gradient-to-r from-red-900/20 to-red-800/20 text-red-400 hover:from-red-900/30 hover:to-red-800/30 transition-all"
                                  title="Remove from group"
                                >
                                  <FiUserMinus size={18} />
                                </motion.button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 text-center py-4">No players assigned to this group</p>
                        )}
                      </div>
                    </div>

                    {/* Available Players */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">Available Players ({availablePlayersForGroup.length})</h3>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-600/50 rounded-xl p-4 max-h-64 overflow-y-auto">
                        {availablePlayersForGroup.length > 0 ? (
                          <div className="space-y-2">
                            {availablePlayersForGroup.map((player) => (
                              <div
                                key={player.id}
                                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#902bd1] to-[#4fb0ff] flex items-center justify-center">
                                    <FiUser className="text-white" />
                                  </div>
                                  <div>
                                    <div className="text-white font-medium">{player.full_name}</div>
                                    <div className="text-xs text-gray-400">{player.email}</div>
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleAddPlayerToGroup(player.id)}
                                  className="p-2 rounded-lg bg-gradient-to-r from-[#4fb0ff]/20 to-[#00d0cb]/20 text-[#80a8ff] hover:from-[#4fb0ff]/30 hover:to-[#00d0cb]/30 transition-all"
                                  title="Add to group"
                                >
                                  <FiUserPlus size={18} />
                                </motion.button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 text-center py-4">All players are assigned to this group</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PlayerManagement;