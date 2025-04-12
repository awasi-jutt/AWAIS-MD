const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "gitclone",
    desc: "Download a GitHub repository as a ZIP file.",
    category: "tools",
    react: "🕊️",
    use: "<github_link>",
    filename: __filename
}, 
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Where is the link?\nExample:\n.gitclone repolink");

        if (!q.includes("github.com")) return reply("Invalid GitHub link!");

        let match = q.match(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i);
        if (!match) return reply("Invalid GitHub link format!");

        let [, owner, repo] = match;
        repo = repo.replace(/.git$/, '');
        let zipUrl = `https://api.github.com/repos/${owner}/${repo}/zipball`;

        let response = await fetch(zipUrl, { method: "HEAD" });
        let filename = response.headers.get("content-disposition").match(/attachment; filename=(.*)/)[1];

        await conn.sendMessage(from, {
            document: { url: zipUrl },
            fileName: filename + ".zip",
            mimetype: "application/zip"
        }, { quoted: mek });

    } catch (error) {
        console.error("GitClone Error:", error);
        reply("An error occurred while downloading the repository.");
    }
});
