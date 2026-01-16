/**
 * Transforms user data from backend format to profile structure
 * Used after signup and login to ensure data is properly structured
 */
export const transformUserDataToProfile = (userData, signupData = {}) => {
  // Default profile structure
  const defaultProfile = {
    personalInfo: {
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      phone: '',
      profileImage: '',
      role: 'admin',
      status: 'active'
    },
    location: {
      country: '',
      state: '',
      city: '',
      address: '',
      postalCode: ''
    },
    academyInfo: {
      name: '',
      logo: '',
      founded: '',
      country: '',
      state: '',
      city: '',
      postalCode: '',
      address: '',
      achievements: '',
      ageGroups: [],
      tenues: {
        homeKit: '',
        awayKit: ''
      },
      staff: {
        technicalDirector: '',
        headCoach: '',
        fitnessCoach: '',
        medicalStaff: ''
      },
      facilities: {
        stadiumName: '',
        stadiumLocation: '',
        gym: false,
        cafeteria: false,
        dormitory: false
      },
      philosophy: '',
      contact: {
        phone: '',
        email: '',
        facebook: '',
        instagram: '',
        website: ''
      }
    },
    preferences: {
      timezone: 'Africa/Tunis',
      languages: ['en']
    }
  };

  // If userData already has the profile structure, merge with defaults
  if (userData && (userData.personalInfo || userData.academyInfo)) {
    return {
      ...defaultProfile,
      personalInfo: {
        ...defaultProfile.personalInfo,
        ...userData.personalInfo
      },
      location: {
        ...defaultProfile.location,
        ...userData.location
      },
      academyInfo: {
        ...defaultProfile.academyInfo,
        ...userData.academyInfo,
        tenues: {
          ...defaultProfile.academyInfo.tenues,
          ...userData.academyInfo?.tenues
        },
        staff: {
          ...defaultProfile.academyInfo.staff,
          ...userData.academyInfo?.staff
        },
        facilities: {
          ...defaultProfile.academyInfo.facilities,
          ...userData.academyInfo?.facilities
        },
        contact: {
          ...defaultProfile.academyInfo.contact,
          ...userData.academyInfo?.contact
        }
      },
      preferences: {
        ...defaultProfile.preferences,
        ...userData.preferences
      }
    };
  }

  // Transform from backend format to profile structure
  const transformed = {
    ...defaultProfile,
    personalInfo: {
      firstName: userData?.first_name || signupData?.firstName || '',
      lastName: userData?.last_name || signupData?.lastName || '',
      fullName: userData?.first_name && userData?.last_name 
        ? `${userData.first_name} ${userData.last_name}`
        : signupData?.firstName && signupData?.lastName
        ? `${signupData.firstName} ${signupData.lastName}`
        : userData?.username || '',
      email: userData?.email || signupData?.email || '',
      phone: userData?.phone || signupData?.phone || '',
      profileImage: userData?.profileImage || userData?.profile_image || '',
      role: userData?.role || signupData?.jobRole || 'admin',
      status: 'active'
    },
    academyInfo: {
      ...defaultProfile.academyInfo,
      // Map club/organization name to academyInfo.name
      name: userData?.club || signupData?.club || userData?.academyInfo?.name || '',
      // Map contact email if available
      contact: {
        ...defaultProfile.academyInfo.contact,
        email: userData?.email || signupData?.email || '',
        phone: userData?.phone || signupData?.phone || ''
      }
    }
  };

  // Preserve existing academyInfo if it exists
  if (userData?.academyInfo) {
    transformed.academyInfo = {
      ...transformed.academyInfo,
      ...userData.academyInfo,
      // Ensure name is set from club if academyInfo.name is empty
      name: userData.academyInfo.name || transformed.academyInfo.name || userData?.club || signupData?.club || ''
    };
  }

  return transformed;
};

