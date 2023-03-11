const {isAuth, isAdmin} = require("../middlewares/auth");
const router = require('express').Router()
const adminController = require("../controllers/admin")

router.get("/app-info",isAuth,isAdmin,adminController.getAppInfo)
router.get("/most-rated",isAuth,isAdmin,adminController.getMostRated)