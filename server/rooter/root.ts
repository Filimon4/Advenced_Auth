import Router from "express";
import {body} from "express-validator";
import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

// Registration root
router.post(
    "/registration",
    [body('username').isString(),body("email").isEmail(), body("password").isLength({min: 3, max: 32})],
    authController.registration,
);

// login root
router.post("/login", authController.login);

// logout root
router.post("/logout", authController.logout);
// activate link
router.get("/activate/:link", authController.activation);
// get users root
router.get("/refresh", authController.refresh);
// test root with users
router.get("/users", authMiddleware, userController.getUsers);

export default router;
