const express = require("express");
const router = express.Router();
const users = require("../controller/users");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router.get("/register", users.renderRegister);

router.post("/register", catchAsync(users.register));

router.get("/login", users.renderLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.login
);

router.get("/logout", users.logout);

module.exports = router;
