const TelegramApi = require('node-telegram-bot-api');
const token = '5869805416:AAEeqaiPPunq-rt4of8-T57SY7rHDsh_8WM';
const bot = new TelegramApi(token, {polling: true}); 
const axios = require('axios');
CHAT_ID = "-785368621";
const uri_api = `https://api.telegram.org/bot${ token }/sendMessage`;

let powerStatus = false;

let chatId;

var ping = require('ping');

var host1 = ['176.38.76.32'];
var host2 = ['89.209.44.201'];

const result = async () => {
    let host;
    const rnd = Math.random();
    if (rnd < 0.5) {
        host = host1;
    } else {
        host = host2;
    }
    let res;
    let inputStatus;
    
    res = await ping.promise.probe(host);
    inputStatus = res.alive;
    console.log(inputStatus);
    if (inputStatus) {
        console.log('Свет есть');
    } else {
        console.log('Света нет');
    }

    setInterval(() => {
        const rnd1 = Math.random();
        if (rnd1 < 0.5) {
            host = host1;
        } else {
            host = host2;
        }
        res = ping.promise.probe(host);
        res.then(value => {
                console.log('value.alive', value.alive);
                console.log('inputStatus', inputStatus);
                if (value.alive !== inputStatus && inputStatus === false) {
                    bot.sendMessage(chatId, `Свет выключили ${new Date()}`);
                    console.log(`Свет выключили ${new Date()}`);
                    inputStatus = value.alive;
                }
                if (value.alive !== inputStatus && inputStatus === true) {
                    bot.sendMessage(chatId, `Свет включили ${new Date()}`);
                    console.log(`Свет включили ${new Date()}`);
                    inputStatus = value.alive;
                    console.log(value.alive);
                }
                inputStatus = value.alive;
            }, reason => {
            console.log(reason);
          });
    }, 2000);
}
result();

/*
setInterval(() => {
    if (chatId) {
        const rnd = Math.random();
        if (rnd < 0.5) {
            inputStatus = true;
        } else {
            inputStatus = false;
        }
        if (powerStatus === false && inputStatus === true) {
            bot.sendMessage(chatId, `Свет включили ${new Date()}`);
            powerStatus = true;
        }
        if (powerStatus === true && inputStatus === false) {
            bot.sendMessage(chatId, `Свет выключили ${new Date()}`);
            powerStatus = false;
        }
    }
    
}, 1000);
*/

const sayHi = async (chatId) => {
    await bot.sendMessage(chatId, 'Вітаю, коли світло зникне я вас повідомлю');
};

const chat = [];
let marker = false;

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начать'},
        {command: '/contacts', description: 'Контакты нашего консультанта'},
        {command: '/record', description: 'Запись на консультацию'},
        {command: '/again', description: 'Начать заново'}
    ])

//save Name answer
let FIO;     
    
//bot react when writing
    bot.on('message', async msg => {
        const text = msg.text;
        chatId = msg.chat.id;
    
//Itaration ONE
        if(text === '/start') {
            marker = false;
            await bot.sendMessage(chatId, 'Добро пожаловать');
            return bot.sendMessage(chatId, 'Введите пожалуйста свое имя фамилию и отчество');
        }
})
};

start();

/*
const sendAlert = async (powerStatus) => {
    if (powerStatus) {
        // await bot.sendMessage(chatId, `Світло з'явилося пора додому`);
        console.log("Світло з'явилося пора додому")
    } else if (powerStatus === false) {
        console.log('Світло зникло')
    }
};
sendAlert(powerStatus);*/