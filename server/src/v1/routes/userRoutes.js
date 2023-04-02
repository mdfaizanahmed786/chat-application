const createUser = require("../controllers/users/createUser");
const getSingleUser = require("../controllers/users/getSingleUser");
const loginUser = require("../controllers/users/loginUser");
const authenticateUser = require("../middleware");

const router = require("express").Router();

router.post("/auth/register", createUser);
router.post("/auth/login", loginUser);
router.get("/users/:userId", authenticateUser, getSingleUser);

module.exports = router;


