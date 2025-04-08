

const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');



cmd({
  pattern: 'version',
  react: '✔️',
  desc: 'Check the bot\'s version',
  category: 'info',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    const packageName = require('../package.json');
    const currentVersion = packageName.version;

    const apiUrl = 'https://raw.githubusercontent.com/Kgtech-cmr/KERM-MD-V1/master/package.json';
    const response = await axios.get(apiUrl);
    const data = response.data;
    const latestVersion = data.version;

    let message = '';
    if (currentVersion === latestVersion) {
      message = `*ᴀʟɪ ᴍᴅ ʙᴏᴛ ɪs ᴜᴘ-ᴛᴏ-ᴅᴀᴛᴇ! 😊*\n *ᴄᴜʀʀᴇɴᴛ ᴠᴇʀsɪᴏɴ ɪs:* ${currentVersion}`;
    } else {
      message = `*ᴀʟɪ ᴍᴅ ʙᴏᴛ ɪs ᴏᴜᴛᴅᴀᴛᴇᴅ! 😵*\n\n  *ᴄᴜʀʀᴇɴᴛ ᴠᴇʀsɪᴏɴ ɪs:* ${currentVersion} \n *ʟᴀᴛᴇsᴛ ᴠᴇʀsɪᴏɴ:* ${latestVersion}`;
    }

   // await reply(message);
    
 // } catch (error) {
  //  console.error('Error fetching version:', error);
   // await reply('Error fetching version. Please try again later.');
//  }
//});
       // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/Z6Mf1mWt/shaban-md.jpg` },  // Image URL
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363400799485163@newsletter',
                    newsletterName: '•𝐀𝐖𝐀𝐈𝐒 𝗝𝐔𝐓𝐓⁶¹⁰ 🍁',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in awais checking Version:", e);
        reply(`An error Occured Fetching Version 😕`);
    }
});
