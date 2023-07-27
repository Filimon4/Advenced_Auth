import Router from "express";
import {body} from "express-validator";
import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";

const router = Router();

// Registration root
router.post("/registration",[
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 32})
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
