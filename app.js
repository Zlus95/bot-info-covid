require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const api = require('covid19-api');
const ListCountries = require('./listCountries');

const bot = new Telegraf(process.env.Bot_Token);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}!
Введите название страны. Посмотреть весь список стран можно командой /help`,
// Markup.keyboard([
//   ['Poland', 'Russia'],
// ])
//   .resize()
//   .extra()
));

bot.help((ctx) => ctx.reply(ListCountries));

bot.on('text', async (ctx) => {
  let data = {};
  try {
    data = await api.getReportsByCountries(ctx.message.text);

    const formatData = `
Страна: ${data[0][0].country}
Случаи: ${data[0][0].cases}
Смертей: ${data[0][0].deaths}
Вылечились: ${data[0][0].recovered}
    `;
    ctx.reply(formatData);
  } catch {
    console.log('Ошибка');
    ctx.reply('Ошибка ввода. Полный список стран можно посмотреть /help');
  }
});
bot.launch();

console.log('Бот готов');
