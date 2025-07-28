const config = require('../config')
const { cmd, commands } = require('../command');

cmd({
    pattern: "msg",
    desc: "Send a message multiple times (Owner Only)",
    category: "utility",
    react: "🔁",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator, q }) => {
    // Owner-only restriction
    if (!isCreator) return reply('🚫 *Owner only command!*');

    try {
        // Check format: .msg text,count
        if (!q.includes(',')) {
            return reply("❌ *Format:* .msg text,count\n*Example:* .msg Hello,5");
        }

        const [message, countStr] = q.split(',');
        const count = parseInt(countStr.trim());

        // Hard limit: 1-100 messages
        if (isNaN(count) || count < 1 || count > 100) {
            return reply("❌ *Max 100 messages at once!*");
        }

        // Silent execution (no confirmations)
        for (let i = 0; i < count; i++) {
            await conn.sendMessage(from, { text: message }, { quoted: null });
            if (i < count - 1) await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("Error in msg command:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

