import createUser from "../controllers/users/createUser.js";
import getSingleUser from "../controllers/users/getSingleUser.js";
import loginUser from "../controllers/users/loginUser.js";
import authenticateUser from "../middleware.js";
import express from "express";

const router = express.Router();

router.post("/auth/register", createUser);
router.post("/auth/login", loginUser);
router.get("/users/:userId", authenticateUser, getSingleUser);

export default router;



