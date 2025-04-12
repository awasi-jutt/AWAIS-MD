const {
  cmd
} = require('../command');
const yts = require('yt-search');
const path = require('path');
const axios = require("axios");
const fs = require('fs');
//DON'T COPY WITHOUT CREDIT AWAISXD CODES

cmd({
  'pattern': "song",
  "alias" : ["song"], 
  'react': '🎵',
  'desc': "Download MP3 audio from YouTube by searching for song names.",
  'category': "music",
  'use': ".play <song name>",
  'filename': __filename
}, async (_0xbdeed3, _0x1a1f32, _0x3f48d8, {
  from: _0x1f7d88,
  args: _0x4a1b3c,
  reply: _0x14fab0
}) => {
  try {
    const _0x3cf9fb = _0x4a1b3c.join(" ");
    if (!_0x3cf9fb) {
      return _0x14fab0("*Please provide a song name to search for.*");
    }
    _0x14fab0("*_🎵AWAIS-MD MUSIC FOUND UPLOADING PLZ WAIT_*");
    const _0x3698b5 = await yts(_0x3cf9fb);
    if (!_0x3698b5.videos || _0x3698b5.videos.length === 0x0) {
      return _0x14fab0("❌ No results found for \"" + _0x3cf9fb + "\".");
    }
    const _0x1f216b = _0x3698b5.videos[0x0];
    const _0x3b2f99 = _0x1f216b.url;
    const _0xf8933d = "https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=" + encodeURIComponent(_0x3b2f99);
    const _0x5c5e2d = await axios.get(_0xf8933d);
    if (!_0x5c5e2d.data.success) {
      return _0x14fab0("❌ Failed to fetch audio for \"" + _0x3cf9fb + "\".");
    }
    const {
      download_url: _0xb4c50c
    } = _0x5c5e2d.data.result;
    await _0xbdeed3.sendMessage(_0x1f7d88, {
      'audio': {
        'url': _0xb4c50c
      },
      'mimetype': "audio/mp4",
      'ptt': false
    }, {
      'quoted': _0x1a1f32
    });
  } catch (_0x334732) {
    console.error(_0x334732);
    _0x14fab0("❌ An error occurred while processing your request.");
  }
});
cmd({
  'pattern': "video5",
  'react': '🎥',
  'desc': "Download MP4 video from YouTube by searching for video names.",
  'category': 'video',
  'use': ".video5 <video name>",
  'filename': __filename
}, async (_0xd5951b, _0x3f889b, _0x489734, {
  from: _0x49ed9f,
  args: _0x18c4ef,
  reply: _0x2951d1
}) => {
  try {
    const _0x318e14 = _0x18c4ef.join(" ");
    if (!_0x318e14) {
      return _0x2951d1("*Please provide a video name to search for.*");
    }
    _0x2951d1("*_📹 AWAIS-MD VIDEO FOUND UPLOADING PLZ WAIT_*");
    const _0x4c3b77 = await yts(_0x318e14);
    if (!_0x4c3b77.videos || _0x4c3b77.videos.length === 0x0) {
      return _0x2951d1("❌ No results found for \"" + _0x318e14 + "\".");
    }
    const _0x34bc2e = _0x4c3b77.videos[0x0];
    const _0x13d9a0 = _0x34bc2e.url;
    const _0x2d3aa0 = "https://api.giftedtech.web.id/api/download/dlmp4?apikey=gifted&url=" + encodeURIComponent(_0x13d9a0);
    const _0x3fd014 = await axios.get(_0x2d3aa0);
    if (!_0x3fd014.data.success) {
      return _0x2951d1("❌ Failed to fetch video for \"" + _0x318e14 + "\".");
    }
    const {
      download_url: _0x49d8b5
    } = _0x3fd014.data.result;
    await _0xd5951b.sendMessage(_0x49ed9f, {
      'video': {
        'url': _0x49d8b5
      },
      'mimetype': "video/mp4",
      'caption': _0x3fd014.data.result.title
    }, {
      'quoted': _0x3f889b
    });
  } catch (_0x3a4782) {
    console.error(_0x3a4782);
    _0x2951d1("❌ An error occurred while processing your request.");
  }
});
