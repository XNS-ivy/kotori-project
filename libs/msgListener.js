async function Listener(theMessage) {
  const isGroup = theMessage.key.participant === undefined ? false : true;
  const phoneNumber =
    theMessage.key.participant === undefined
      ? theMessage.key.remoteJid
      : theMessage.key.participant;
  const name = theMessage.pushName;
  const isType = typeMessage(theMessage);

  console.log(
    `\t| [Got Message]
  \t| From Group : ${isGroup}
  \t| Phone Number : ${phoneNumber}
  \t| Name : ${name}
  \t| Type Message : ${isType.object}
  \t| Text : ${isType.textMsg}
  `
  );
  // console.log(theMessage);
  // typeMessage(theMessage);
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
  }
}

module.exports = { Listener };
