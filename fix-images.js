const fs = require('fs');

// 读取游戏数据文件
let content = fs.readFileSync('src/lib/gameData.ts', 'utf8');

// 定义图片名称映射（从错误的名称到正确的文件名）
const imageMappings = {
  '/images/911-cannibal.png': '/images/amandas-movie-night.png',
  '/images/baldis-basics-education-and-learning.png': '/images/baldis-fun-new-school-plus-ultimate-edition.png',
  '/images/five-nights-at-freddys.png': '/images/five-nights-at-freddys-pizzeria-simulator.png',
  '/images/granny-house-escape.png': '/images/granny-house-escape.png',
  '/images/granny-prison-escape.png': '/images/Granny-Prison-Escape.png',
  '/images/granny-returns.png': '/images/granny-returns-haunted-house.png',
  '/images/granny-vs-baldi.png': '/images/granny-vs-baldi-and-grandpa.png',
  '/images/grannys-cellar.png': '/images/grannys-cellar.png',
  '/images/horror-hospital-escape.png': '/images/horror-hospital-escape.png',
  '/images/horror-tale-3-the-witch.png': '/images/horror-tale-3-the-witch.png',
  '/images/icescape-2.png': '/images/icescape-2.png',
  '/images/icescape-3.png': '/images/icescape-3.png',
  '/images/icescape.png': '/images/icescape.png',
  '/images/lakeview-cabin.png': '/images/Lakeview-Cabin.png',
  '/images/midnight-mansion.png': '/images/Midnight-Mansion.png',
  '/images/one-night-at-flumptys-2.png': '/images/one-night-at-flumptys-2.png',
  '/images/phantom-reverse-2.png': '/images/Phantom-Reverse-2-Adrift.png',
  '/images/phantom-reverse.png': '/images/phantom-reverse.png',
  '/images/piggy-escape.png': '/images/piggy-escape-from-the-pig.png',
  '/images/riddle-school.png': '/images/riddle-school.png',
  '/images/riddle-school-re-riddled.png': '/images/riddle-school-re-riddled.png',
  '/images/scare-dare.png': '/images/Scare-Dare-The-Abandoned-House.png',
  '/images/schools-out.png': '/images/School\'s-Out-The-Great-Escape.png',
  '/images/soul-void.png': '/images/Soul-Void.png',
  '/images/soul-void-redux.png': '/images/soul-void-redux.png',
  '/images/sprunki-fall-edition.png': '/images/Sprunki-Fall-Edition.png',
  '/images/sprunki-infected.png': '/images/sprunki-infected.png',
  '/images/sprunki-jump.png': '/images/sprunki-jump.png',
  '/images/sprunki-phase-9.png': '/images/Sprunki-Phase-9.png',
  '/images/sprunki-swap.png': '/images/sprunki-swap.png',
  '/images/stray-souls.png': '/images/Stray-Souls-Dollhouse-Story.png',
  '/images/subway-horror-chapter-2.png': '/images/subway-horror-chapter-2.png',
  '/images/super-dark-deception.png': '/images/super-dark-deception.png',
  '/images/tails-nightmare.png': '/images/tails-nightmare.png',
  '/images/the-14th-axe-wound.png': '/images/The-14th-Axe-Wound.png',
  '/images/the-conjuring-mystery.png': '/images/the-conjuring-mystery.png',
  '/images/the-house-of-evil-granny.png': '/images/the-house-of-evil-granny.png',
  '/images/the-last-sand-2.png': '/images/the-last-sand-2.png',
  '/images/the-midnight-game.png': '/images/the-midnight-game.png',
  '/images/the-penjikent-creature.png': '/images/The-Penjikent-Creature.png',
  '/images/the-road-home-granny-escape.png': '/images/the-road-home-granny-escape.png',
  '/images/the-second-sight.png': '/images/The-Second-Sight-Dead-Reckoning.png',
  '/images/the-sluaghs-sacrifice.png': '/images/the-sluaghs-sacrifice.png',
  '/images/the-uncle-who-works-for-nintendo.png': '/images/the-uncle-who-works-for-nintendo.png',
  '/images/the-wind.png': '/images/the-wind.png',
  '/images/the-women-wrestling-championship.png': '/images/the-women-wrestling-championship.png',
  '/images/time-is-solid-here.png': '/images/Time-is-Solid-Here.png',
  '/images/town-of-fears.png': '/images/town-of-fears.png',
  '/images/trollface-quest-horror-3.png': '/images/trollface-quest-horror-3.png',
  '/images/twiligh-watcher.png': '/images/Twiligh-Watcher.png',
  '/images/undertale-yellow.png': '/images/undertale-yellow.png',
  '/images/undying-the-beast.png': '/images/undying-the-beast.png',
  '/images/upstream.png': '/images/upstream.png',
  '/images/urbex.png': '/images/Urbex.png',
  '/images/vampire-survivors.png': '/images/Vampire-Survivors.png',
  '/images/vessels.png': '/images/vessels.png',
  '/images/victors-nightmares.png': '/images/Victor\'s-Nightmares.png',
  '/images/wacky-nursery-2.png': '/images/wacky-nursery-2.png',
  '/images/what-remains-of-gone-home.png': '/images/what-remains-of-gone-home.png',
  '/images/when-it-rains-red.png': '/images/when-it-rains-red.png',
  '/images/yokais-curse.png': '/images/yokais-curse.png',
  '/images/you-left-me.png': '/images/you-left-me.png',
  '/images/yume-nikki.png': '/images/Yume-Nikki.png',
  '/images/zombie-invasion.png': '/images/zombie-invasion.png',
  '/images/zombie-rising.png': '/images/Zombie-Rising.png',
  '/images/zombies-surrounded.png': '/images/zombies-surrounded.png'
};

// 应用映射
for (const [wrongPath, correctPath] of Object.entries(imageMappings)) {
  content = content.replace(new RegExp(wrongPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), correctPath);
}

// 写回文件
fs.writeFileSync('src/lib/gameData.ts', content);

console.log('图片路径修复完成！');
