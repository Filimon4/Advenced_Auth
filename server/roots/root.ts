import Router from "express";
import {check} from "express-validator";
import authController from "../controllers/authController.js";

const router = Router();

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

router.post("/login", authController.login);

export default router;
