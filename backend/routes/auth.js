const express = require("express");

// we need to import the controller so we can access the functions
const AuthController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", AuthController.createUser);

router.post("/login", AuthController.userLogin);

module.exports = router;
