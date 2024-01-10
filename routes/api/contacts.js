const express = require("express");
const router = express.Router();
const ctr = require("../../controllers/contacts");

router.get("/", ctr.getAllContacts);

router.get("/:contactId", ctr.getContactById);

router.post("/", ctr.addContact);

router.delete("/:contactId", ctr.removeContact);

router.put("/:contactId", ctr.updateContact);

router.patch("/:contactId/favorite", ctr.favoriteContact);

module.exports = router;
