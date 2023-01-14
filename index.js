const { mainModule } = require("process");
const {
  addContact,
  removeContact,
  getContactById,
  listContacts,
} = require("./contacts");

const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": {
      const contacts = await listContacts();
      console.table(contacts);
      break;
    }
    case "get": {
      const contact = await getContactById(id);
      if (contact) {
        console.log(contact);
      } else {
        console.log(`contact with id = ${id} not found`);
      }
      break;
    }
    case "add": {
      await addContact(name, email, phone);
      console.log("contact added");
      break;
    }
    case "remove":
      const result = await removeContact(id);
      if (result) {
        console.log(`contact with id = ${id} removed`);
      } else {
        console.log(`contact with id = ${id} not found`);
      }

      break;

    default:
      throw new Error(`unknown action, got: ${action}`);
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();
invokeAction(argv);
