const dotenv = require('dotenv');
dotenv.config(); 

const telegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('TELEGRAM_BOT_TOKEN is not set in .env file');
  process.exit(1);
}

const bot = new telegramBot(token, { polling: true });

const words = ['hello', 'goodbye', 'try again', 'hi', 'really good'];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'Hello, write the command /word to get a random word'
  );
});

bot.onText(/\/word/, (msg) => {
  const chatId = msg.chat.id;
  const randomWord = words[Math.floor(Math.random() * words.length)];
  bot.sendMessage(chatId, randomWord);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (!msg.text.startsWith('/')) {
    console.log(1);
    bot.sendMessage(
      chatId,
      "I didn't understand your command. Type /word to get a random word"
    );
  }
});
