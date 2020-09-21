//import { CommandsContextConsumer, Commands, saveCommands, Command } from '../State';
//const State = require('../State.tsx');
const Discord = require('discord.js');
const { token } = require('./config.json');
const bot = new Discord.Client();
const ytdl = require("ytdl-core");
const command = require('./commands')
var ffmpeg = require('ffmpeg');

bot.login(token); // Enter token in config.json

var prefixs = ["created command", "deleted", "clear_ALL", "list_commands", "voice_play"];
var responses = ["", "", "", "", ""];

//export { bot, token };



bot.on('message', message => {

    if (message.author == 697770104062083192 || message.author == 748707106802106428) { return }

   
        
    

    if (message.content.toLowerCase().includes(prefixs[0])) {
        //create new command by adding prefix and response
        var args = message.content.split(' ');
        var pos = prefixs.length;
        var response = args[4];
        prefixs[pos] = args[2].toLowerCase();
        if (args.length > 4) {
            for (i = 5; i < args.length; i++) {
                response += (" " + args[i]);
            }
        }
        responses[pos] = response;
    } else if (message.content.toLowerCase().includes(prefixs[1])) {
        //delete a command using the index given
        var args = message.content.toLowerCase().split(' ');
        prefixs.splice(args[1], 1);
        responses.splice(args[1], 1);

        responses[responses.length] = args[4];
    } else if (message.content.includes(prefixs[2])) {
        // set lists to initial state
        prefixs = ["created command", "deleted", "clear_ALL", "list_commands", "voice_play"];
        responses = ["", "", "", "", ""];

    } else if (message.content.includes(prefixs[3])) {
        //display all commands 
        for (i = 4; i < prefixs.length; i++) {
            message.channel.send(prefixs[i] + " : " + responses[i]);
        }

    } else if (message.content.includes(prefixs[4])) {
        command(bot, prefixs[4], (message) => {
            var args = message.content.split(' ');
            const stream = ytdl(args[1]);
            //let VC = message.member.voice.channel;
            
            const VC = bot.channels.cache.get(args[2]);
            //console.log(VC);
            if (!VC) {
                return message.reply("Not in voice channel")
            }

            VC.join()
                .then(connection => {
                    const dispatcher = connection.play(stream);
                    dispatcher.on("end", end => { VC.leave() });
                })
                .catch(console.error);

            setTimeout(function () {
                VC.leave()
            }, 10000)

        })

    } else {
        for (i = 0; i < prefixs.length; i++) {
            // send response friom given prefix
            if (message.content.toLowerCase().includes(prefixs[i])) {
                message.channel.send(responses[i]); //, { tts: true }
            }

        }
    }

});

//export{ bot, token }