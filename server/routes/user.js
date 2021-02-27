const express = require("express");
const { userById, allUsers } = require("../controllers/user.js");

const router = express.Router();

router.get("/users", allUsers);

//any route containing :userId will execute userById
router.param("userId", userById);

module.exports = router;
