const config = require("../database/config.json");
const botmenu = require("../database/botMenu.json");
const project = require("../package.json");

async function Listener(kotori, theMessage) {
  if (!theMessage.message) return;
  const isGroup = theMessage.key.participant === undefined ? false : true;
  const phoneNumber =
    theMessage.key.participant === undefined
      ? theMessage.key.remoteJid
      : theMessage.key.participant;
  const name = theMessage.pushName || "Undentified";
  const targetReply = theMessage.key.remoteJid;
  const isType = typeMessage(theMessage);

  // only who is use command
  function display() {
    if (isType.textMsg === undefined || isType.textMsg === "") return; // return if text is undefined or empty

    const [query, ...args] = isType.textMsg.substring(1).split(" ");
    const argumen = args.join(" ").trim();
    if (isType.textMsg.startsWith(config.prefix)) {
      console.log(
        `\t\t| [Got Message]
        \t| From Group : ${isGroup}
        \t| Phone Number : ${phoneNumber}
        \t| Name : ${name}
        \t| Type Message : ${isType.object}
        \t| Text : ${isType.textMsg}
        `
      );
    }
  }
  // console.log(theMessage);
  // typeMessage(theMessage);
  display();
  await reply(kotori, targetReply, isType, theMessage);
}
function typeMessage(theMessage) {
  // const testObject = Object.keys(theMessage.message);
  const objectType = Object.keys(theMessage.message)[0];

  const text =
    objectType === "conversation"
      ? theMessage.message.conversation
      : objectType === "extendedTextMessage"
      ? theMessage.message.extendedTextMessage.text
      : objectType === "imageMessage"
      ? theMessage.message.imageMessage.caption
      : undefined;

  // console.log(testObject);
  // console.log(objectType);
  return {
    object: objectType,
    textMsg: text,
  };
}
// reply function --

async function reply(kotori, person, isType, theMessage) {
  if (isType.textMsg === undefined || isType.textMsg === "") return; // return if text is undefined or empty

  const [query, ...args] = isType.textMsg.substring(1).split(" ");
  const argumen = args.join(" ").trim();

  if (isType.object != "imageMessage") {
    if (isType.textMsg.startsWith(config.prefix)) {
      // console.log("Mendapat Query : ",query);
      if (query && argumen === "") {
        switch (query) {
          case botmenu.menu.menu:
            kotori.sendMessage(
              person,
              {
                text: `hi nama aku ${config.botName} bot buatan ${config.owner}`,
              },
              { quoted: theMessage }
            );
            break;
          case botmenu.menu.sc:
            kotori.sendMessage(
              person,
              {
                text: `mau mencari sourcecode buatan pacar aku? :3 ${project.repository.url}`,
              },
              { quoted: theMessage }
            );
            break;
          default:
            break;
        }
      }
    } else {
      return null;
    }
  }
}
module.exports = { Listener };
