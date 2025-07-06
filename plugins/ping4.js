const {cmd , commands} = require('../command')

cmd({
    pattern: "pong2",
    desc: "Check bot online or no.",
    category: "main",
    react: "🚀",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*pong...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*ᴀᴡᴀɪs ᴍᴅ ꜱᴘᴇᴇᴅ : ${ping}ms*`,
                                      contextInfo: {
                mentionedJid: ['923182832887@s.whatsapp.net'], // specify mentioned JID(s) if any
                groupMentions: [],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363369260614615@newsletter',
                    newsletterName: "ᴀᴡᴀɪs ᴍᴅ",
                    serverMessageId: 999
                },
                externalAdReply: {
                    title: 'AWAIS MD',
                    body: '𓆩𝑨𝑾𝑨𝑰𝑺𝑿𝑫𓆪',
                    mediaType: 1,
                    sourceUrl: "https://github.com/Awais-star-a11y",
                    thumbnailUrl: 'https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/IMG-20250409-WA0093.jpg', // This should match the image URL provided above
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
     }, {quoted: mek});
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
