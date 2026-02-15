const connection = require("../db");
const { validationResult } = require("express-validator");

// ADD JOB
const addJob = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
      });
  }

  const { company, position, status } = req.body;
  const userId = req.user.id;

  const query = `
    INSERT INTO jobs (company, position, status, user_id)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(
    query,
    [company, position, status || "Applied", userId],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({ message: "Job added successfully" });
    }
  );
};

// GET MY JOBS
const getJobs = (req, res, next) => {
  const userId = req.user.id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const status = req.query.status;
  const search = req.query.search;

  let baseQuery = `FROM jobs WHERE user_id = ?`;
  let queryParams = [userId];

  if (status) {
    baseQuery += " AND status = ?";
    queryParams.push(status);
  }

  if (search) {
    baseQuery += " AND company LIKE ?";
    queryParams.push(`%${search}%`);
  }

  // Query 1: Get total count
  const countQuery = `SELECT COUNT(*) as total ${baseQuery}`;

  connection.query(countQuery, queryParams, (err, countResult) => {
    if (err) return next(err);

    const totalRecords = countResult[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // Query 2: Get paginated results
    const dataQuery = `SELECT * ${baseQuery} LIMIT ? OFFSET ?`;

    connection.query(
      dataQuery,
      [...queryParams, limit, offset],
      (err, results) => {
        if (err) return next(err);

        res.status(200).json({
          page,
          limit,
          totalRecords,
          totalPages,
          jobs: results
        });
      }
    );
  });
};




// UPDATE JOB
const updateJob = (req, res) => {
  const jobId = req.params.id;
  const { status } = req.body;
  const userId = req.user.id;

  const query = `
    UPDATE jobs
    SET status = ?
    WHERE id = ? AND user_id = ?
  `;

  connection.query(query, [status, jobId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to update job" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    res.status(200).json({ message: "Job updated successfully" });
  });
};

// DELETE JOB
const deleteJob = (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.id;

  const query = `
    DELETE FROM jobs
    WHERE id = ? AND user_id = ?
  `;

  connection.query(query, [jobId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete job" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found or unauthorized" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  });
};

module.exports = {
  addJob,
  getJobs,
  updateJob,
  deleteJob
};
