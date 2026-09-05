const {
  signupUserService,
  loginUserService,
  getUserByTokenService,
  updateUserProfileService,
  logoutUserService
} = require('../services/authService');

/**
 * Extract token from authorization header or query
 */
const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return req.headers['x-auth-token'] || req.query.token;
};

/**
 * POST /api/auth/signup
 */
const signup = async (req, res) => {
  try {
    const { name, email, password, role, district, currentSkills, targetRole, companyName, industry, hiringRoles } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    const result = await signupUserService({
      name,
      email,
      password,
      role,
      district,
      currentSkills,
      targetRole,
      companyName,
      industry,
      hiringRoles
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token: result.token,
      data: result.user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Signup failed'
    });
  }
};

/**
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const result = await loginUserService(email, password);

    res.json({
      success: true,
      message: 'Login successful',
      token: result.token,
      data: result.user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || 'Invalid email or password'
    });
  }
};

/**
 * GET /api/auth/profile
 */
const getProfile = async (req, res) => {
  try {
    const token = extractToken(req);
    const user = await getUserByTokenService(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized or session expired'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
};

/**
 * PUT /api/auth/profile
 */
const updateProfile = async (req, res) => {
  try {
    const token = extractToken(req);
    const user = await getUserByTokenService(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized or session expired'
      });
    }

    const updatedUser = await updateUserProfileService(user._id || user.id, req.body);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update profile'
    });
  }
};

/**
 * POST /api/auth/logout
 */
const logout = (req, res) => {
  try {
    const token = extractToken(req);
    logoutUserService(token);

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message
    });
  }
};

module.exports = {
  signup,
  login,
  getProfile,
  updateProfile,
  logout
};
