const express = require("express");
const { isAuth } = require("../middlewares/auth");
const { isValidPassResetToken } = require("../middlewares/user");
const {
    userValidtor,
    validate,
    validatePassword,
    signInValidator,
} = require("../middlewares/validator");
const userController = require('../controllers/user')

const router = express.Router();

router.post("/create", userValidtor, validate, userController.createUser);
router.post("/sign-in", signInValidator, validate, userController.signIn);
router.post("/verify-email", userController.verifyEmail);
router.post("/resend-email-verification-token", userController.resendEmailVerificationToken);
router.post("/forget-password", userController.forgetPassword);
router.post(
    "/verify-pass-reset-token",
    isValidPassResetToken,
    userController.sendResetPasswordTokenStatus
);
router.post(
    "/reset-password",
    validatePassword,
    validate,
    isValidPassResetToken,
    userController.resetPassword
);
router.get("/is-auth", isAuth, (req, res) => {
    const { user } = req;
    res.json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            role: user.role,
        },
    });
});

module.exports = router;
