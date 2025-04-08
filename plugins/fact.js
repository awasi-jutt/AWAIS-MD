

const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "fact",
    desc: "🧠 Get a random fun fact",
    react: "😝",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://uselessfacts.jsph.pl/random.json?language=en';  // API for random facts
        const response = await axios.get(url);
        const fact = response.data.text;

        const funFact = `
🤣 *•𝐀𝐖𝐀𝐈𝐒-𝗝𝐔𝐓𝐓⁶¹⁰ RANDOM FACT* 🤣

${fact}

Isn't that interesting ? 😄
`;

        return reply(funFact);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching a fun fact. Please try again later🤕.");
    }
});

cmd({
    pattern: "joke",
    desc: "😂 Get a random joke",
    react: "🤣",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://official-joke-api.appspot.com/random_joke';  // API for random jokes
        const response = await axios.get(url);
        const joke = response.data;
        const jokeMessage = `
*😂Here's a random joke for you😂.*

*${joke.setup}*
${joke.punchline} 😄

> *POWERED BY AWAIS TECH*
`;
        return reply(jokeMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ Couldn't fetch a joke right now. Please try again later.");
    }
});
cmd({
    pattern: "minutor",
    desc: "Start a countdown timer for a specified duration.",
    react: "⏳",
    category: "utility",
    use: ".minutor <time><s|m|h>",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        // Validate input
        if (!args[0]) {
            return reply("❌ Please provide a valid duration.\nExamples: `.minutor 10s`, `.minutor 5m`, `.minutor 1h`");
        }

        // Extract time value and unit
        const input = args[0];
        const timeValue = parseInt(input.slice(0, -1)); // Extract number
        const timeUnit = input.slice(-1).toLowerCase(); // Extract unit (s, m, h)

        if (isNaN(timeValue) || timeValue <= 0 || !["s", "m", "h"].includes(timeUnit)) {
            return reply("❌ Invalid format. Use `<number><s|m|h>`.\nExamples: `.minutor 10s`, `.minutor 5m`, `.minutor 1h`");
        }

        // Convert time to milliseconds
        let duration;
        switch (timeUnit) {
            case "s": // Seconds
                duration = timeValue * 1000;
                break;
            case "m": // Minutes
                duration = timeValue * 60 * 1000;
                break;
            case "h": // Hours
                duration = timeValue * 60 * 60 * 1000;
                break;
            default:
                return reply("❌ Unsupported time unit. Use `s` for seconds, `m` for minutes, or `h` for hours.");
        }

        // Notify user that the countdown has started
        reply(`⏳ Countdown started for ${timeValue}${timeUnit}. I'll notify you when the time is up!`);

        // Wait for the specified duration
        await new Promise(resolve => setTimeout(resolve, duration));

        // Send message after the time is up
        reply(`⏰ Time's up! ${timeValue}${timeUnit} have passed.\n\n> POWERED BY ALI🧞‍♂️.`);
    } catch (error) {
        console.error("Error in minutor command:", error);
        reply("❌ An error occurred while starting the timer. Please try again.");
    }
});
