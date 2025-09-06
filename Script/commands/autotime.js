const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
    name: 'autosent',
    version: '10.0.1',
    hasPermssion: 0,
    credits: 'Shahadat Islam',
    description: 'Automatically sends messages at scheduled times (BD Time)',
    commandCategory: 'group messenger',
    usages: '[]',
    cooldowns: 3
};

const messages = [
    { time: '12:00 AM', message: '𝐆𝐨𝐨𝐝 𝐍𝐢𝐠𝐡𝐭! 🌑 𝐒𝐥𝐞𝐞𝐩 𝐰𝐞𝐥𝐥 𝐚𝐧𝐝 𝐡𝐚𝐯𝐰 𝐬𝐰𝐞𝐞𝐭 𝐝𝐫𝐞𝐚𝐦𝐬.', special: null },
    { time: '9:00 AM', message: '𝐆𝐨𝐨𝐝 𝐌𝐨𝐫𝐧𝐢𝐧𝐠! 🤍 𝐇𝐨𝐩𝐞 𝐲𝐨𝐮 𝐡𝐚𝐯𝐞 𝐠𝐫𝐞𝐚𝐭 𝐝𝐚𝐲 𝐚𝐡𝐞𝐚𝐝!', special: null },
    { time: '10:00 AM', message: 'এখন সময় সকাল 10:00 AM ⏳\nকিরে ভন্ড, তুই আজ কলেজ যাস নাই? 😜📚🙄', special: null },
    { time: '11:00 AM', message: 'এখন সময় সকাল 11:00 AM ⏳\nনাটক কম কর পিও~ বস এখন বিজি আছে!🙄📱💼', special: null },
    { time: '12:00 PM', message: '𝐆𝐨𝐨𝐝 𝐀𝐟𝐭𝐞𝐫𝐧𝐨𝐨𝐧! 🕊️ 𝐇𝐨𝐛𝐞 𝐲𝐨𝐮'𝐫𝐞 𝐡𝐚𝐯𝐢𝐧𝐠 𝐚 𝐠𝐨𝐨𝐝 𝐝𝐚𝐲.', special: null },
    { time: '6:00 PM', message: '𝐆𝐨𝐨𝐝 𝐄𝐯𝐞𝐧𝐢𝐧𝐠! ✨ 𝐓𝐡𝐞 𝐝𝐚𝐲 𝐢𝐬 𝐰𝐢𝐧𝐝𝐢𝐧𝐠 𝐝𝐨𝐰𝐧. 𝐇𝐚𝐯𝐞 𝐚 𝐠𝐫𝐞𝐚𝐭 𝐞𝐯𝐞𝐧𝐢𝐧𝐠 .', special: null },
];

module.exports.onLoad = ({ api }) => {
    console.log(chalk.bold.hex("#00c300")("============ AUTOSENT COMMAND LOADED (BD TIME) ============"));

    messages.forEach(({ time, message }) => {
        const [hour, minute, period] = time.split(/[: ]/);
        let hour24 = parseInt(hour, 10);
        if (period === 'PM' && hour !== '12') {
            hour24 += 12;
        } else if (period === 'AM' && hour === '12') {
            hour24 = 0;
        }

        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Asia/Dhaka';
        rule.hour = hour24;
        rule.minute = parseInt(minute, 10);

        schedule.scheduleJob(rule, () => {
            if (!global.data?.allThreadID) return;
            global.data.allThreadID.forEach(threadID => {
                api.sendMessage(message, threadID, (error) => {
                    if (error) {
                        console.error(`Failed to send message to ${threadID}:`, error);
                    }
                });
            });
        });

        console.log(chalk.hex("#00FFFF")(`Scheduled (BDT): ${time} => ${message}`));
    });
};

module.exports.run = () => {
    // Main logic is in onLoad
};
