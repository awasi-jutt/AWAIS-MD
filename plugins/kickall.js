

const config = require('../config');
const { cmd, commands } = require('../command');

let stopKickall = false; // Variable to stop the execution of the kickall command

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cmd({
    pattern: "kickall",
    desc: "Kicks all non-admin members from the group.",
    react: "🧨",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isCmd,
    command,
    isGroup,
    sender,
    isAdmins,
    isOwner,
    groupMetadata,
    groupAdmins,
    isBotAdmins,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(`*_📛This command can only be used in groups._*`);

        // Check if the user is an admin
        if (!isAdmins) return reply(`*_📛Only group admins can use this command._*`);

        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply(`*_📛I need admin privileges to remove group members._*`);

        stopKickall = false; // Reset the stop flag

        // Send warning message before execution
        reply(`⚠️ *Warning!* All non-admin members will be removed in *5 seconds*.\nTo cancel this operation, type *restart*.`);
        
        // Countdown before execution with a chance to cancel
        for (let i = 5; i > 0; i--) {
            if (stopKickall) {
                return reply(`✅ *Operation canceled.* No members were removed.`);
            }
            await delay(1000); // Wait for 1 second
        }

        // Filter out non-admin members
        const allParticipants = groupMetadata.participants;
        const nonAdminParticipants = allParticipants.filter(member => 
            !groupAdmins.includes(member.id) && member.id !== conn.user.jid
        );

        if (nonAdminParticipants.length === 0) {
            return reply(`✅ There are no non-admin members to remove.`);
        }

        // Remove non-admin members
        for (let participant of nonAdminParticipants) {
            if (stopKickall) {
                return reply(`✅ *Operation canceled.* Some members may not have been removed.`);
            }
            await conn.groupParticipantsUpdate(from, [participant.id], "remove")
                .catch(err => console.error(`⚠️ Failed to remove ${participant.id}:`, err));
        }

        // Send success confirmation
        reply(`✅ *Success!* All non-admin members have been removed from the group.`);
    } catch (e) {
        console.error('Error while executing kickall:', e);
        reply('❌ An error occurred while executing the command.');
    }
});

// Command to stop kickall execution
cmd({
    pattern: "restart",
    desc: "Stops the kickall command.",
    react: "✅",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    stopKickall = true; // Set the stop flag to true
    reply(`_*Restarting*_`);
});
