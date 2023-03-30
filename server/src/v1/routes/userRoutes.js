const createUser = require("../controllers/users/createUser");
const getSingleUser = require("../controllers/users/getSingleUser");
const loginUser = require("../controllers/users/loginUser");
const authenticateUser = require("../middleware");

const router = require("express").Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/user/:userId", authenticateUser, getSingleUser);

module.exports = router;


