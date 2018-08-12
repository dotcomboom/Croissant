# croissant

Croissant is a multifunctional Discord bot based on boopie.

## commands
Items marked with a [B] are original or modified Boopie commands.
- [B] 8ball - Answers yes/no questions
- [B] help - Helps you
- [B] ping - Send how long it took to recieve the ping
- cowsay - A cow says whatever you want it to
- figlet - Make ascii art using figlet fonts
- neo - Get stats for neocities users
- yt - Search youtube
- face - Random ascii face
- stats - Bot stats
- role - Selfroles (any role in the guild that starts with + is a selfrole and can be obtained by any user)
- user - User information, replaces [B] avatar
- verbosity - See who has been participating lately
- purge - Delete up to 100 messages in one fell swoop, requires the Manage Messages permission
- emote - Add custom emoji with either a URL or from DiscordEmoji.com

## Adding to your server

[👉 👉 👉 here](https://discordapp.com/oauth2/authorize?client_id=441444584988606464&scope=bot&permissions=1342565456)

## If the bot falls asleep
While I'm trying to keep it up as much as possible, the trick used doesn't seem to be working all the time. In the event, go to [https://croissant-bot.glitch.me](https://croissant-bot.glitch.me). If you're using your remix replace croissant-bot with your project name.

## env variables

TOKEN: your discord app token

prefix: your desired prefix. I use 'c!'

ownerID: your username. currently unused as far as I can tell.

game: what the bot is "playing". I use 'c!help' so people know the prefix right away.

projectname: the project name on glitch. this is important so the bot can stay awake.

ytkey: API key for the [YouTube Data API v3](https://console.developers.google.com/apis/library/youtube.googleapis.com/?q=youtube). (required for the yt command)