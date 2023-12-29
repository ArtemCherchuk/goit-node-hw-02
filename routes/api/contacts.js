const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
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
    const id = req.params.contactId;
    if (!id) {
      throw res.json({ status: 404, message: "Not found" });
    }
    const result = await contacts.getContactById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    const { name, email, phone } = req.body;
    if (error) {
      throw res.json({ status: 400, message: "missing required name field" });
    }
    const result = await contacts.addContact({ name, email, phone });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!contactId) {
      throw res.json({ status: 404, message: "Not found" });
    }
    const result = await contacts.removeContact(contactId);
    res.status(200).json({ message: "contact deleted", data: result.id });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    const { contactId } = req.params;
    if (error) {
      throw res.json({ status: 400, message: "missing required name field" });
    }

    const result = await contacts.updateContact(contactId, req.body);
    if (!contactId) {
      throw res.json({ status: 404, message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
