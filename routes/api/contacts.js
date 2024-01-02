const express = require("express");
const contacts = require("../../models/contacts");
const JoiUser = require("joi");
const httpError = require("../../helpers");

const router = express.Router();

const fullUserSchema = JoiUser.object({
  name: JoiUser.string().required(),
  email: JoiUser.string().required(),
  phone: JoiUser.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw httpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = fullUserSchema.validate(req.body);
    if (error) {
      throw httpError(400, "missing required name field");
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact({ name, email, phone });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw httpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = fullUserSchema.validate(req.body);
    if (error) {
      throw httpError(400, "missing required name field");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw httpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
