import Router from "express";
import {check} from "express-validator";
import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";

const router = Router();

// Registration root
router.post("/registration",[
    check("username", "The username must be provided").isEmpty(),
    check("password", "The password must be longer than 4 and shorter than 10").isLength({min: 4, max: 10})
] ,authController.registration);

// login root
router.post("/login", authController.login);

// logout root
router.post("/logout", authController.logout)
// activate link
router.get('/activate/:link', authController.activation)
// get users root
router.get("/refresh", authController.refresh)
// test root with users
router.get('/users', userController.getUsers)

export default router;
