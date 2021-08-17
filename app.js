require('dotenv').config();
const { Telegraf } = require('telegraf');
const api = require('covid19-api');

const bot = new Telegraf(process.env.Bot_Token);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}!`));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('text', async (ctx) => {
  let data = {};
  data = await api.getReportsByCountries('russia');

  const formatData = `
Страна: ${data[0][0].country}
Случаи: ${data[0][0].cases}
Смертей: ${data[0][0].deaths}
Вылечились: ${data[0][0].recovered}
  `;
  ctx.reply(formatData);
});
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

console.log('Бот готов');
