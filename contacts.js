const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  const delContacts = contacts.filter((contact) => contact.id === contactId);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return delContacts;
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();
  contacts.push(newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
