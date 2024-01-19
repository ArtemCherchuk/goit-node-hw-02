const express = require("express");
const router = express.Router();

const ctr = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const validateBody = require("../../middlewares/validateBody");
const { authenticate } = require("../../middlewares");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctr.registerUser
);

router.post("/login", validateBody(schemas.loginSchema), ctr.loginUser);

router.get("/current", authenticate, ctr.userCurrent);

router.post("/logout", authenticate, ctr.userLogOut);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctr.updateSubscription
);

module.exports = router;
