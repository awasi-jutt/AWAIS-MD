const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "script2",
    alias: ["sc2","repo2","info2"],
    desc: "bot repo",
    react: "🤖",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let repo =`
*╭──────────────●●►*
> *BOT OWNER:*
*|* *CREW AWAIS*

> *AWAIS MD REPO:*
*|* *https://github.com/awasi-jutt/AWAIS-MD*

> *SUPPORT CHANNEL:*
*|* *https://whatsapp.com/channel/0029Vb5HXV32975KoJwGe01l*
*╰──────────────●●►*

> *AWAIS XMD*
`
await conn.sendMessage(from, { text: repo ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 999,
    isForwarded: false,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363400799485163@newsletter',
      newsletterName: "•𝐀𝐖𝐀𝐈𝐒-𝗝𝐔𝐓𝐓⁶¹⁰",
      serverMessageId: 999
    },
externalAdReply: { 
title: 'AWAIS MD',
body: `${pushname}`,
mediaType: 1,
sourceUrl: "https://github.com/awasi-jutt/AWAIS-MD" ,
thumbnailUrl: "https://qu.ax/FfTXB.jpg" ,
renderLargerThumbnail: true,
showAdAttribution: true
}
}}, { quoted: mek})}catch(e){
console.log(e)
reply(`${e}`)
}
});
