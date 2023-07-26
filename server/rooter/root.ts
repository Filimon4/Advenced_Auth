import Router from "express";
import {check} from "express-validator";
import authController from "../controllers/authController.js";

const router = Router();

// Registration root
router.post(
    "/registration",
    [
        check("username", "The username must be provided").notEmpty(),
        check(
            "password",
            "The password must be longer than 4 and shorter than 10 letters",
        ).isLength({min: 4, max: 10}),
    ],
    authController.registration,
);

// login root
router.post("/login", authController.login);

// logout root
router.post("/logout")
// activate link
router.get('/activate/:link')
// get users root
router.get("/refresh")
// test root with users
router.get('/users')

export default router;
