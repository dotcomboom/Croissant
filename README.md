# Croissant

Croissant is a multifunctional Discord bot based on boopie.

## Commands
Items marked with a [B] are original or modified Boopie commands.

**🤘 Meta**
- [B] help - Helps you
- stats - Bot stats

**ℹ️ Information**
- user - User information, replaces [B] avatar
- guild - Guild information
- verbosity - See who has been participating in the channel lately

**🎉 Fun**
- [B] 8ball - Answers yes/no questions
- cowsay - A cow says whatever you want it to
- figlet - Make ascii art using figlet fonts
- swipe - Now you see it, now you don't.
- engrish - Google Translate parties from the comfort of Discord.

**🗺️ External**
- neo - Get stats for neocities users
- yt - Search youtube
- gopher - Access resources from gopherspace

**📛 Selfroles**
- role - Selfroles (any role in the guild that starts with + is a selfrole and can be obtained by any user)

**🛠️ Management**
- purge - Delete up to 100 messages in one fell swoop, requires the Manage Messages permission
- emote - Add custom emoji with either an upload, URL, or one from DiscordEmoji.com, requires the Manage Emoji permission

## Adding to your server

[👉 👉 👉 here](https://discordapp.com/oauth2/authorize?client_id=441444584988606464&scope=bot&permissions=1342565456)

## Keeping the bot awake
I use Uptime Robot to keep the bot awake, checking [https://croissant-bot.glitch.me](https://croissant-bot.glitch.me). If this fails, you can go to that URL to bring it back up.

## .env variables

TOKEN: Your Discord app token

prefix: Your desired prefix. I use 'c!'

game: What the bot is "playing". I use 'c!help' so people know the prefix right away.

ytkey: API key for the [YouTube Data API v3](https://console.developers.google.com/apis/library/youtube.googleapis.com/?q=youtube). (required for the yt command)