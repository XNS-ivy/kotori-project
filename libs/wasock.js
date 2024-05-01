const {
  default: kotoriSocket,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Listener } = require("./message.js");

async function kotoriSock() {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const kotori = kotoriSocket({
    printQRInTerminal: true,
    browser: ["Ituka-Kotori", "Chrome", "1.0.0"],
    auth: state,
    logger: pino({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
    syncFullHistory: false,
  });
  kotori.ev.on("creds.update", saveCreds);
  kotori.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") {
      console.log("is open");
    } else if (connection === "close") {
      console.log("Trying to reconnecting.");
      setTimeout(async () => {
        try {
          await kotoriSock();
        } catch (error) {
          console.error(error);
        }
      }, 3000);
    }
  });
  kotori.ev.on("messages.upsert", async (m) => {
    if (!m.messages) return;
    const theMessage = m.messages[0];
    await Listener(kotori, theMessage);
  });
}

module.exports = { kotoriSock };
