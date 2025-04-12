const { cmd } = require('../command');
const crypto = require('crypto');
const webp = require('node-webpmux');
const axios = require('axios')
const fs = require('fs-extra');
const { exec } = require('child_process')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const Config = require('../config')


cmd(
    {
        pattern: 'sticker',
        alias: ['s', 'stickergif'],
        desc: 'Create a sticker from an image, video, or URL.',
        category: 'sticker',
        use: '<reply media or URL>',
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from }) => {
        if (!mek.quoted) return reply(`*Reply To any Image or video Sir.*`);
        let mime = mek.quoted.mtype
        pack = Config.PACKNAME
        author = Config.AUTHOR
       if (mime =="imageMessage" || mime =="stickerMessage") {
            let media = await mek.quoted.download();
            //mek.reply("*Processing Your request*");
            let sticker = new Sticker(media, {
                pack: pack, // The pack name
                author: author, // The author name
                type: StickerTypes.FULL ,
                categories: ["🤩", "🎉"], // The sticker category
                id: "12345", // The sticker id
                quality: 75, // The quality of the output file
            });
            const buffer = await sticker.toBuffer();
            return conn.sendMessage(mek.chat, {sticker: buffer}, {quoted: mek });
        }else return reply("*Uhh,Please reply to any image*");

    }
);
