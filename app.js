require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const api = require('covid19-api');
const ListCountries = require('./listCountries');

const bot = new Telegraf(process.env.Bot_Token);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}!
Введите название страны. Посмотреть весь список стран можно командой /help`,
Markup.keyboard([
  ['Russia', 'Poland', 'Germany', 'Belarus'],
  ['Kazakhstan', 'Japan', 'Turkey', 'China'],
])
  .resize()));

bot.help((ctx) => ctx.reply(ListCountries));
bot.on('text', async (ctx) => {
  let data = {};
  try {
    data = await api.getReportsByCountries(ctx.message.text);
    
    const DataFormat = `
    Страна: ${data[0][0].country}
    Флаг: ${data[0][0].flag}
    Всего заражений: ${data[0][0].cases}
    Всего смертей: ${data[0][0].deaths}
    Всего вылечилось: ${data[0][0].recovered}
    `;
    ctx.reply(DataFormat);
  } catch {
    console.log('Ошибка');
    ctx.reply('Ошибка ввода. Полный список стран можно посмотреть /help');
  }
});
bot.launch();
console.log('Бот готов');

// bot.command('hipster', Telegraf.reply('λ'));
// bot.hears('us', async (ctx) => {
  //   let data = {};
//   try {
  //     data = await api.getCountriesWhereCoronavirusHasSpread(ctx.message.text);

//     const DataFormat = `
// Страна: ${data[0][0].Country}
// Всего заражений: ${data[0][0].Cases}
// Смерти: ${data[0][0].Deaths}
// Регион: ${data[0][0].Region}

// `;
//     ctx.reply(DataFormat);
//   } catch {
//     console.log('Ошибка');
//     ctx.reply('Ошибка ввода. Полный список стран можно посмотреть /help');
//   }
// });
