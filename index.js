const argv = require('yargs').argv;
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(console.table);
      break;

    case 'get':
      if (id) {
        getContactById(id).then(console.log).catch(console.error);
      } else {
        console.log('Invalid id.');
      }
      break;

    case 'add':
      if (name && email && phone) {
        addContact(name, email, phone)
          .then((newContact) => console.log('New contact added:', newContact))
          .catch(console.error);
      } else {
        console.log('Please provide --name, --email, and --phone arguments.');
      }
      break;

    case 'remove':
      if (id) {
        removeContact(id)
          .then((removedContact) => console.log('Removed contact:', removedContact))
          .catch(console.error);
      } else {
        console.log('Invalid id.');
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
