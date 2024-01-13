const express = require("express");
const router = express.Router();
const ctr = require("../../controllers/contacts");
const {
  fullUserSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

const validateBody = require("../../middlewares");

router.get("/", ctr.getAllContacts);

router.get("/:contactId", ctr.getContactById);

router.post("/", validateBody(fullUserSchema), ctr.addContact);

router.delete("/:contactId", ctr.removeContact);

router.put("/:contactId", validateBody(fullUserSchema), ctr.updateContact);

router.patch(
  "/:contactId/favorite",
  validateBody(updateFavoriteSchema),
  ctr.favoriteContact
);

module.exports = router;
