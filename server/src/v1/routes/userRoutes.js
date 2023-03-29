const createUser = require("../controllers/users/createUser");

const router = require("express").Router();

router.post("/register", createUser);

module.exports = router;


