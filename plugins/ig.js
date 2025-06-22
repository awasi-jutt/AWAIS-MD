const {
  fetchJson
} = require("../lib/functions");
const {
  downloadTiktok
} = require('@mrnima/tiktok-downloader');
const {
  facebook
} = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const {
  igdl
} = require("ruhend-scraper");
const axios = require('axios');
const fs = require('fs');
const path = require("path");
const {
  cmd,
  commands
} = require("../command");

cmd({
  'pattern': 'ig',
  'alias': ["insta"],
  'desc': "To download instagram videos.",
  'react': '🎥',
  'category': "download",
  'filename': __filename
}, async (_0x386562, _0x1b4817, _0x2d5654, {
  from: _0x2b1245,
  quoted: _0x35994d,
  body: _0x3ef60e,
  isCmd: _0x445688,
  command: _0x28d49a,
  args: _0x353941,
  q: _0x133e89,
  isGroup: _0xae87fe,
  sender: _0x2dff22,
  senderNumber: _0x37d5bb,
  botNumber2: _0x49a8d8,
  botNumber: _0x2ef999,
  pushname: _0x535d59,
  isMe: _0x231e91,
  isOwner: _0x299df6,
  groupMetadata: _0x162e52,
  groupName: _0x647ac4,
  participants: _0x5409f2,
  groupAdmins: _0x36386c,
  isBotAdmins: _0x2ec1e7,
  isAdmins: _0x318dfb,
  reply: _0x1bd856
}) => {
  try {
    if (!_0x133e89) {
      return _0x2d5654.reply("Please Give Me a vaild Link...");
    }
    _0x2d5654.react('⬇️');
    let _0x46b060 = await igdl(_0x133e89);
    let _0x2ec7e8 = await _0x46b060.data;
    for (let _0x2c5a94 = 0x0; _0x2c5a94 < 0x14; _0x2c5a94++) {
      let _0x226a29 = _0x2ec7e8[_0x2c5a94];
      let _0x3d32a8 = _0x226a29.url;
      _0x2d5654.react('⬆️');
      await _0x386562.sendMessage(_0x2b1245, {
        'video': {
          'url': _0x3d32a8
        },
        'mimetype': "video/mp4",
        'caption': "*©CREATED BY AWAIS XD*"
      }, {
        'quoted': _0x1b4817
      });
      _0x2d5654.react('✅');
    }
  } catch (_0x169bd8) {
    console.log(_0x169bd8);
  }
});
