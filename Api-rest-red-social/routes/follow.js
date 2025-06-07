const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow");
const { auth } = require("../middlewares/auth");


// definir rutas
router.post("/seguir", auth, FollowController.seguir);
router.delete("/unfollow/:id", auth, FollowController.unfollow);

module.exports = router;