const axios = require("axios");
const { cmd } = require("../command");

// Global variable to store the temporary email address
let tempMail = null;

/**
 * Command: .tempmail
 * Description: Generates a temporary email address using the GetNada API.
 * Usage: .tempmail
 */
cmd({
    pattern: "tempmail",
    desc: "Generate a temporary email address.",
    category: "fun",
    react: "📧",
    filename: __filename,
    use: ".tempmail"
}, async (conn, mek, m, { reply }) => {
    try {
        // Fetch the list of available domains from the GetNada API
        const domainResponse = await axios.get("https://getnada.com/api/v1/domains");
        const domains = domainResponse.data.domains; // Example: ["getnada.com", "abyssmail.com", ...]
        if (!domains || domains.length === 0) {
            return reply("❌ Failed to retrieve available domains.");
        }
        // Choose a random domain from the list
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        // Generate a random string for the local-part of the email address
        const localPart = Math.random().toString(36).substring(2, 12);
        // Compose the temporary email address
        tempMail = `${localPart}@${randomDomain}`;
        return reply(`✅ Your temporary email address is:\n\n*${tempMail}*`);
    } catch (error) {
        console.error("Error in tempmail command:", error);
        return reply(`❌ An error occurred: ${error.message}`);
    }
});

/**
 * Command: .checkmail
 * Description: Checks the messages received for the temporary email address.
 * Usage: .checkmail
 */
cmd({
    pattern: "checkmail",
    desc: "Check messages for your temporary email address.",
    category: "fun",
    react: "📬",
    filename: __filename,
    use: ".checkmail"
}, async (conn, mek, m, { reply }) => {
    try {
        if (!tempMail) {
            return reply("❌ No temporary email address is set. Use .tempmail to generate one.");
        }
        // Construct the API URL to retrieve messages using GetNada
        const apiUrl = `https://getnada.com/api/v1/inboxes/${tempMail}`;
        const response = await axios.get(apiUrl);
        const messages = response.data.msgs; // The API returns an array of messages in the "msgs" property
        if (!messages || messages.length === 0) {
            return reply(`📭 No messages have been received for *${tempMail}* yet.`);
        }
        let messageList = `📬 Messages for *${tempMail}*:\n`;
        messages.forEach((msg) => {
            // Display basic info for each message: ID, from, subject, and date
            messageList += `• ID: ${msg.uid} | From: ${msg.f} | Subject: ${msg.s} | Date: ${msg.d}\n`;
        });
        return reply(messageList);
    } catch (error) {
        console.error("Error in checkmail command:", error);
        return reply(`❌ An error occurred: ${error.message}`);
    }
});

/**
 * Command: .delmail
 * Description: Deletes the temporary email address and clears its messages.
 * Usage: .delmail
 */
cmd({
    pattern: "delmail",
    desc: "Delete the temporary email address and its messages.",
    category: "fun",
    react: "🗑️",
    filename: __filename,
    use: ".delmail"
}, async (conn, mek, m, { reply }) => {
    try {
        if (!tempMail) {
            return reply("❌ No temporary email address is set.");
        }
        // Reset the temporary email address (the API auto-deletes messages after a period)
        tempMail = null;
        return reply("✅ The temporary email address and its messages have been cleared.");
    } catch (error) {
        console.error("Error in delmail command:", error);
        return reply(`❌ An error occurred: ${error.message}`);
    }
});
