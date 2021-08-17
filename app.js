require('dotenv').config();
const { Telegraf } = require('telegraf');
const api = require('covid19-api');

const bot = new Telegraf(process.env.Bot_Token);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}!`));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('text', (ctx) => {
  let data = {};
  data = api.getReportsByCountries('russia');
});
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
