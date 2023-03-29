const createUser = require("../controllers/users/createUser");
const loginUser = require("../controllers/users/loginUser");

const router = require("express").Router();

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;


