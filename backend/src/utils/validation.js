const VALID_STATUSES = ["To Do", "In Progress", "In Review", "Done"];
const VALID_PRIORITIES = ["Low", "Medium", "High"];
const VALID_TEAMS = ["frontend", "backend"];

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const isValidStatus = (status) => VALID_STATUSES.includes(status);

const isValidPriority = (priority) => VALID_PRIORITIES.includes(priority);

const isValidTeamId = (teamId) => VALID_TEAMS.includes(teamId);

module.exports = {
  VALID_STATUSES,
  VALID_PRIORITIES,
  VALID_TEAMS,
  isNonEmptyString,
  isValidStatus,
  isValidPriority,
  isValidTeamId,
};
