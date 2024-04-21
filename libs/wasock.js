const {
  default: makeWASocket,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Listener } = require("./msgListener.js");

async function kotoriSock() {
  const auth = await useMultiFileAuthState("session");
  const kotori = makeWASocket({
    printQRInTerminal: true,
    browser: ["itsuka-kotori", "Firefox", "1.0.0"],
    auth: auth.state,
    logger: pino({ level: "silent" }),
  });
  kotori.ev.on("creds.update", auth.saveCreds);
  kotori.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") {
      console.log("is open");
    } else if (connection === "close") {
      kotoriSock();
    }
  });
  kotori.ev.on("messages.upsert", async (m) => {
    if (!m.messages) return;
    const theMessage = m.messages[0];
    await Listener(theMessage);
  });
}

module.exports = { kotoriSock };
