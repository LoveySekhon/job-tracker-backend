const { body } = require("express-validator");

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  addJob,
  getJobs,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

// All routes here are protected
router.post(
  "/",
  verifyToken,
  [
    body("company").notEmpty().withMessage("Company name is required"),
    body("position").notEmpty().withMessage("Position is required"),
    body("status")
      .optional()
      .isIn(["Applied", "Interview", "Offer", "Rejected"])
      .withMessage("Invalid job status")
  ],
  addJob
);

router.get("/", verifyToken, getJobs);
router.put("/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);

module.exports = router;
