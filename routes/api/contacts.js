const express = require("express");
const router = express.Router();
const ctr = require("../../controllers/contacts");
const {
  fullUserSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

const { validateBody, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctr.getAllContacts);

router.get("/:contactId", authenticate, ctr.getContactById);

router.post("/", authenticate, validateBody(fullUserSchema), ctr.addContact);

router.delete("/:contactId", authenticate, ctr.removeContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(fullUserSchema),
  ctr.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(updateFavoriteSchema),
  ctr.favoriteContact
);

module.exports = router;
