const express = require("express");
const router = express.Router();
const campgrounds = require("../controller/campgrounds");
const catchAsync = require("../utils/catchAsync");
const { storage } = require("../cloudinary");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

// for upload files
const multer = require("multer");
const upload = multer({ storage });

// get seed data
router.get("/", catchAsync(campgrounds.index));

// create
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateCampground,
  catchAsync(campgrounds.createCampground)
);

// search
router.get("/:id", catchAsync(campgrounds.showCampground));

// edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

// method override
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  upload.array("image"),
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

// delete
router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
