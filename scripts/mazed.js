var Mazed = Mazed || {};                                                                    

var aw = window.innerWidth/2, ah = window.innerHeight/2;

Mazed = {
    game: new Phaser.Game(aw, ah, Phaser.AUTO),
    width: aw,
    height: ah,
    gameTime: 0,

    mapS: [[3, 3], [3, 3], [3, 3]],

    nM: Math.floor((ah - 120) / 32) - (Math.floor((ah - 120) / 32) % 2 + 1),
    shootAngle: null,
    snM: Math.floor((ah - 120) / 32) - (Math.floor((ah - 120) / 32) % 2 + 1),
    sNen: 1,
    maxEn: 5,

    randomMode: false,
    type: 0,

    gtemp: null,
    player: null,
    enemies: null,
    map: null,
    mapG: null,
    hud: null,
    control: null,
    saveCpu: null,
    level: 1,
    score: 0,
    time: 0,
    timer: null,
    vol: 0,
    music: null,
    effects: [null, null, null, null, null, null, null, null],
    effV : 0,
    i: 0,
    helptext: null,
    explaintext: null,
    
    fazeColor: [0xD3DBD8, 0xD7D4DB, 0xFFFEF6],

    cursors: null,
    Pshaking: false,
    shaking: false,
    shake: 2,
    shakeTimer: null,
    shakeX: 0,
    shakeY: 0,
    
    r100: 0,
    s100: 0,
    nd100: 0,
    d100: 0,
};

Mazed.Intro = [
    "WHERE YA GOING?",
    "ARE YOU LOST?",
    "ANOTHER DAY...",
    "I AM GO BACK HOME, U?",
    "GO!",
    "GET THE HORSE, FLY!",
    "DO YOU WANT A SWEET?",
    "I AM LOSING MY MIND!"
];

Mazed.EndLevel = [
    "HAVE YOU FIND YOUR WAY?",
    "WHAT IS LIFE?",
    "HAVE YOU DONE SOMETHING?",
    "THE FUTURE... WHAT IS THERE?",
    "ANOTHER NIGHT...",
    "STILL LOST?",
    "GO... ? WHAT?",
    "FALLING… BUT NOT APART YET",
    "THAT AGAIN?",
    "YOU CAN FLY!",
    "YOU CAN DO ANYTHING!"
];

Mazed.Death = [
    "FALLING…. BUT APART!",
    ":(",
    "DED",
    "IT IS LIKE A NIGHTMARE…",
    "YOU MAY DESERVE THAT...",
    "IS THIS INJUSTICE? YE?",
    "O_O",
    "YOU ARE NOT THAT GOOD, ARE YA?",
    "END OF ENDS IS NOT THE END",
    "SHAKE SHAKE SHAKE... OPS...",
    "4HEAD"
];

Mazed.Killing = [
    "THEY DO NOT DESERVE THAT...",
    "YOU MONSTER!!!",
    "PEW PEW PEW! BOOOOM!",
    "YOU MUST HATE THOSE THINGS.",
    "DIVERSITY? NO?"
];

Mazed.Random = [
    "HEY, HOW IS IT GOING?",
    "MUCH PROGRESS, MANY SUCCESS",
    "HAVING FUN? LOST!",
    "LOSING MY...",
    "I AM BORED… WHY YOU SUCK?",
    "GO LEFT! NO! RIGHT! OPS, LEFT!",
    "I DO NOT KNOW!"
];
