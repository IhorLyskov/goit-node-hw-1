const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath, { encoding: "utf8" });
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.filter((contact) => contact.id === contactId);
  if (contact.length) {
    return contact[0];
  } else {
    return null;
  }
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  if (updatedContacts.length !== contacts.length) {
    await writeContacts(updatedContacts);
    return true;
  } else {
    return false;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = nanoid();
  const contact = { id, name, email, phone };

  contacts.push(contact);

  await writeContacts(contacts);
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
