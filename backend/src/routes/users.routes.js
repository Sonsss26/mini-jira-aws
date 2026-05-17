const express = require("express");
const { getEmployeesByTeam, seedUsers } = require("../controllers/users.controller");

const router = express.Router();

router.get("/team/:teamId", getEmployeesByTeam);
router.post("/seed", seedUsers);

module.exports = router;
