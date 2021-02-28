const express = require("express");
const {
  userById,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/user.js");
const { requireSignin } = require("../controllers/authentication.js");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);

//any route containing :userId will execute userById
router.param("userId", userById);

module.exports = router;
