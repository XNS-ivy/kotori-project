const {
  default: makeWASocket,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const pino = require("pino");

async function kotoriSock() {
  const auth = await useMultiFileAuthState("session");
  const kotori = makeWASocket({ 
    printQRInTerminal: true,
    browser: ["itsuka-kotori","Firefox","1.0.0"],
    auth: auth.state,
    logger: pino({level: "silent"}),
   });
   kotori.ev.on("creds.update",auth.saveCreds);
   kotori.ev.on("connection.update", ({connection}) =>{
    if (connection === "open") {
      console.log("is open");
    } else if(connection === "close"){
      kotoriSock();
    }
   })
}

module.exports = { kotoriSock };
