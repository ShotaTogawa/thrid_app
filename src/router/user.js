const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../controllers/auth");
const {
  updateProfile,
  currentUser,
  users,
  searchUsers,
  deleteUser
} = require("../controllers/user");

router.get('/user', authenticateToken, currentUser)
router.get('/users', authenticateToken, users)
router.get('/users/search', authenticateToken, searchUsers)
router.patch('/user/edit', authenticateToken, updateProfile)
router.delete('/user', authenticateToken, deleteUser)

module.exports = router;
