const config = require('../config');
const { cmd } = require('../command');

// Presence Control (Online/Offline)

cmd({
  on: "body"
}, async (conn, mek, m, { from }) => {
  try {
    // If ALWAYS_ONLINE=true → Bot stays online 24/7
    // If ALWAYS_ONLINE=false → Bot shows default WhatsApp behavior (no forced online/offline)
    if (config.ALWAYS_ONLINE === "true") {
      await conn.sendPresenceUpdate("available", from);
    }
    // If false, do nothing (let WhatsApp handle presence naturally)
  } catch (e) {
    console.error("[Presence Error]", e);
  }
});
