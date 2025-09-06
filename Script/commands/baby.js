const axios = require("axios");

const simsim = "https://simsimi.cyberbot.top";

module.exports.config = {
  name: "baby",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "ULLASH",
  description: "Cute AI Baby Chatbot | Talk, Teach & Chat with Emotion ☢️",
  commandCategory: "simsim",
  usages: "[message/query]",
  cooldowns: 0,
  prefix: false
};

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const uid = event.senderID;
    const senderName = await Users.getNameUser(uid);
    const query = args.join(" ").toLowerCase();
    
    if (!query) {
      const ran = ["Bolo baby", "hum"];
      const r = ran[Math.floor(Math.random() * ran.length)];
      return api.sendMessage(r, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "simsimi"
          });
        }
      });
    }

    if (["remove", "rm"].includes(args[0])) {
      const parts = query.replace(/^(remove|rm)\s*/, "").split(" - ");
      if (parts.length < 2)
        return api.sendMessage(" | Use: remove [Question] - [Reply]", event.threadID, event.messageID);
      const [ask, ans] = parts;
      const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    if (args[0] === "list") {
      const res = await axios.get(`${simsim}/list`);
      if (res.data.code === 200) {
        return api.sendMessage(
          `♾ Total Questions Learned: ${res.data.totalQuestions}\n★ Total Replies Stored: ${res.data.totalReplies}\n☠︎︎ Developer: ${res.data.author}`,
          event.threadID,
          event.messageID
        );
      } else {
        return api.sendMessage(`Error: ${res.data.message || "Failed to fetch list"}`, event.threadID, event.messageID);
      }
    }

    if (args[0] === "edit") {
      const parts = query.replace("edit ", "").split(" - ");
      if (parts.length < 3)
        return api.sendMessage(" | Use: edit [Question] - [OldReply] - [NewReply]", event.threadID, event.messageID);
      const [ask, oldReply, newReply] = parts;
      const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldReply)}&new=${encodeURIComponent(newReply)}`);
      return api.sendMessage(res.data.message, event.threadID, event.messageID);
    }

    if (args[0] === "teach") {
      const parts = query.replace("teach ", "").split(" - ");
      if (parts.length < 2)
        return api.sendMessage(" | Use: teach [Question] - [Reply]", event.threadID, event.messageID);
      const [ask, ans] = parts;
      const res = await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}`);
      return api.sendMessage(`${res.data.message || "Reply added successfully!"}`, event.threadID, event.messageID);
    }

    const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
    const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
    
    for (const reply of responses) {
      await new Promise((resolve) => {
        api.sendMessage(reply, event.threadID, (err, info) => {
          if (!err) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: "simsimi"
            });
          }
          resolve();
        }, event.messageID);
      });
    }
  } catch (err) {
    console.error(err);
    return api.sendMessage(`| Error in baby command: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event, Users, handleReply }) {
  try {
    const senderName = await Users.getNameUser(event.senderID);
    const replyText = event.body ? event.body.toLowerCase() : "";
    if (!replyText) return;

    const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(replyText)}&senderName=${encodeURIComponent(senderName)}`);
    const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
    
    for (const reply of responses) {
      await new Promise((resolve) => {
        api.sendMessage(reply, event.threadID, (err, info) => {
          if (!err) {
            global.client.handleReply.push({
              name: module.exports.config.name,
              messageID: info.messageID,
              author: event.senderID,
              type: "simsimi"
            });
          }
          resolve();
        }, event.messageID);
      }
      );
    }
  } catch (err) {
    console.error(err);
    return api.sendMessage(` | Error in handleReply: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  try {
    const raw = event.body ? event.body.toLowerCase().trim() : "";
    if (!raw) return;

    const senderName = await Users.getNameUser(event.senderID);
    const senderID = event.senderID;

    if (
      raw === "baby" || raw === "bot" || raw === "bby" ||
      raw === "jannu" || raw === "xan" || raw === "Sara" || raw === "Sarabbz" || raw === "বেবি"
    ) {
      const greetings = [
        "বেশি bot Bot করলে leave নিবো কিন্তু😒😒",
        "-🫵তোমারে প্রচুর ভাল্লাগে-😽-সময় মতো প্রপোজ করমু বুঝছো-🔨😼-ছিট খালি রাইখো- 🥱🐸🥵",
        "আমি আবাল দের সাথে কথা বলি না,ok😒",
        "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈",
        "-বালিকা━👸-𝐃𝐨 𝐲𝐨𝐮-🫵-বিয়া-𝐦𝐞-😽-আমি তোমাকে-😻-আম্মু হইতে সাহায্য করব-🙈🥱",
        "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑",
        "হ্যা বলো😒, তোমার জন্য কি করতে পারি😐😑?",
        "এতো ডাকছিস কেন?গালি শুনবি নাকি? 🤬",
        "I love you janu🥰",
        "আরে Bolo আমার জান ,কেমন আছো?😚",
       	"𝘼𝙨𝙨𝙖𝙡𝙖𝙢𝙪𝙖𝙡𝙖𝙞𝙠𝙪𝙢♥", 
        "বলেন sir__😌", 
        "𝗹𝗲𝗺𝗼𝗻 𝗷𝘂𝘀𝘀🍹",
        "𝗔𝗶 𝗻𝗲 𝗹𝗲𝗺𝗼𝗻 𝗷𝘂𝘀𝘀 🍋🍹 𝗱𝗮𝗸𝘁𝗲 𝗱𝗮𝘁𝗲 𝘁𝗼 𝗵𝗮𝗽𝗮𝘆 𝗴𝗮𝘀𝗼𝘀",
        "𝐆𝐚𝐣𝐚 𝐤𝐡𝐚 𝐦𝐚𝐧𝐮𝐬𝐡 𝐡𝐨 🍁🤡",
        "𝙇𝙚𝙢𝙤𝙣 𝙩𝙪𝙨 🍋", 
        "মুড়ি খাও 🫥", 
        ".__𝗮𝗺𝗶 𝗮𝗺𝗺𝘂𝗿 𝗸𝗮𝗰𝗵𝗲 𝗷𝗮𝗯𝗼 𝗮𝗺𝗸 𝗰𝗵𝗲𝗿𝗲 𝗱𝗮𝘄.!!🥺.....😗", 
        "লুঙ্গি টা ধর মুতে আসি🙊🙉",
        "──‎ HuM..? 👉👈", 
        "আম গাছে আম নাই ঢিল কেন মারো, তোমার সাথে প্রেম নাই বেবি কেন ডাকো 😒🐸",
        "কি হলো, মিস টিস করচ্ছো নাকি 🤣",
        "𝘽𝙤𝙡𝙤 𝙗𝙖𝙗𝙮 🥹", 
        "৮১ , ৮২ , ৮৩ আমি তোমাকে ভালবাসি",
        "আমাকে ডাকলে ,আমি কিন্তু 𝐊𝐢𝐬𝐬 করে দিব 😘" 
      ];
      const randomReply = greetings[Math.floor(Math.random() * greetings.length)];
      const mention = {
        body: `@${senderName} ${randomReply}`,
        mentions: [{
          tag: `@${senderName}`,
          id: senderID
        }]
      };

      return api.sendMessage(mention, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "simsimi"
          });
        }
      }, event.messageID);
    }

    if (
      raw.startsWith("baby ") || raw.startsWith("bot ") || raw.startsWith("bby ") ||
      raw.startsWith("jannu ") || raw.startsWith("xan ") ||
      raw.startsWith("বেপি ") || raw.startsWith("বট ") || raw.startsWith("বেবি ")
    ) {
      const query = raw
        .replace(/^baby\s+|^bot\s+|^bby\s+|^jan\s+|^xan\s+|^জান\s+|^বট\s+|^বেবি\s+/i, "")
        .trim();
      if (!query) return;

      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
      const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
      
      for (const reply of responses) {
        await new Promise((resolve) => {
          api.sendMessage(reply, event.threadID, (err, info) => {
            if (!err) {
              global.client.handleReply.push({
                name: module.exports.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "simsimi"
              });
            }
            resolve();
          }, event.messageID);
        });
      }
    }
  } catch (err) {
    console.error(err);
    return api.sendMessage(`| Error in handleEvent: ${err.message}`, event.threadID, event.messageID);
  }
};
