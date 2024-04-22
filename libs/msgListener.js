async function Listener(theMessage) {
  const isGroup = theMessage.key.participant === undefined ? false : true;
  const phoneNumber = theMessage.key.participant === undefined ? theMessage.key.remoteJid : theMessage.key.participant;
  const name = theMessage.pushName;

  console.log(
   `\t| [Got Message]
    \t| From Group : ${isGroup}
    \t| Phone Number : ${phoneNumber}
    \t| Name : ${name}
    \t| Type Message : ${typeMessage(theMessage)}
    `
  );
}
function typeMessage(theMessage) {
  const type = theMessage.message.conversation ? true : false;
}
module.exports = { Listener };
