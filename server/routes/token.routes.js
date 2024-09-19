const router = require("express").Router();
const verifyRefreshToken = require("../middleware/verifyRefreshToken");
const TokenController = require("../controllers/tokenController");

router.get("/refresh", verifyRefreshToken, TokenController.refresh);

module.exports = router;
