const router = require("express").Router();
const AuthController = require("../controllers/authController");

router.post("/registration", AuthController.registration);

router.post("/authorization", AuthController.authorization);

router.delete("/logout", AuthController.logout);

module.exports = router;
