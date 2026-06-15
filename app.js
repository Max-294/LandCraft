const GRID_SIZE = 1000;
const BASE_TILE_SIZE = 56;
const DEFAULT_MIN_ZOOM = 0.4;
const MAX_ZOOM = 2.2;
const ZOOM_STEP = 0.1;
const MAX_VISIBLE_TILES_PER_SCREEN = 50;
const NPC_INITIAL_LANDS = 16;
const NPC_RESPAWN_MIN = 50;
const NPC_RESPAWN_MAX = 120;
const NPC_GROWTH_INTERVAL = 60 * 60 * 1000;
const PLAYER_CRITICAL_RATE = 0.04;
const BOSS_CRITICAL_RATE = 0.05;
const DODGE_RATE = 0.03;
const AUTO_ATTACK_INTERVAL = 520;
const CHEST_BEAST_ATTACK_INTERVAL = 80;
const CHEST_BEAST_REWARD_DAY = 7;
const CHEST_BEAST_TEST_MODE = true;
const CHEST_BEAST_PLAYER_HP_MULTIPLIER = 7;
const BATTLE_ITEM_SLOT_COUNT = 3;
const TRADE_SELL_MIN_DAYS = 2;
const TRADE_SELL_MAX_DAYS = 5;
const AUTH_STORAGE_KEY = "landCraftAccountsV1";
const AUDIO_PREF_STORAGE_KEY = "landCraftAudioPrefsV1";
const GAME_AUTOSAVE_INTERVAL = 10 * 1000;
const FIREBASE_CONFIG_MODULE = "./firebase-config.js";
const FIREBASE_SDK_VERSION = "10.12.5";
const BACKGROUND_MUSIC_SRC = "assets/audio/landcraft-medieval-loop.wav";
const TEST_ACCOUNT_USERNAME = "test";
const TEST_ACCOUNT_PASSWORD = "test123";
const STARTER_TERRAIN_CARD = "九層寶塔（稀有）";
const LEGACY_STARTER_TERRAIN_CARD = "寶塔地形卡";
const MAX_PLAYER_LEVEL = 50;

const landAchievementAmounts = [3, 15, 35, 80, 110, 165, 200, 290, 345, 500, 1000, 3450, 6975, 125000, 500000, 980000];
const moneyAchievementAmounts = [500, 5000, 20000, 100000, 850000, 2200000, 10000000];
const achievementThemes = [
  { max: 3, icon: "◆", title: "第一座地底營地", theme: "ember", reward: "你開始在岩漿邊站穩腳步。" },
  { max: 15, icon: "▣", title: "小型礦區領主", theme: "stone", reward: "你的領地已經能連成一片礦區。" },
  { max: 35, icon: "✦", title: "水晶探勘者", theme: "crystal", reward: "地底水晶開始照亮你的道路。" },
  { max: 80, icon: "⬟", title: "岩盤開拓隊長", theme: "magma", reward: "你的版圖穿過了更深的岩層。" },
  { max: 200, icon: "✹", title: "地底城建造者", theme: "ember", reward: "一座真正的地底城市正在成形。" },
  { max: 1000, icon: "❖", title: "千格國度", theme: "crystal", reward: "你的名字開始在地底世界流傳。" },
  { max: Infinity, icon: "★", title: "深淵霸主", theme: "royal", reward: "幾乎整個地底世界都看見了你的旗幟。" },
];
const moneyAchievementThemes = [
  { max: 500, icon: "$", title: "第一桶熔岩金", theme: "gold", reward: "你有足夠資源繼續挑戰下一片土地。" },
  { max: 20000, icon: "◇", title: "晶礦商人", theme: "crystal", reward: "黃色與粉色水晶帶來了穩定收入。" },
  { max: 850000, icon: "⬢", title: "地底財庫", theme: "gold", reward: "你的財富已經能支撐大型遠征。" },
  { max: Infinity, icon: "✺", title: "熔岩富豪", theme: "royal", reward: "你掌握了地底世界最閃亮的財寶。" },
];
const achievements = [
  ...landAchievementAmounts.map((amount) => createAchievement("land", amount)),
  ...moneyAchievementAmounts.map((amount) => createAchievement("money", amount)),
];
const chestRewardTypes = ["神獸寶箱", "晶鑽寶箱", "鐵門寶箱", "魔法寶箱"];
const bossBattleConfig = {
  green: {
    unlockLevel: 1,
    encounterChance: 1,
    hp: { baseMin: 160, baseMax: 520, perLevelMin: 52, perLevelMax: 95 },
    attack: { baseMin: 16, baseMax: 28, perLevelMin: 3.2, perLevelMax: 5.2 },
    exp: 35,
    chestDropChance: 0,
  },
  blue: {
    unlockLevel: 10,
    encounterChance: 0.35,
    hp: { baseMin: 1700, baseMax: 2600, perLevelMin: 88, perLevelMax: 142 },
    attack: { baseMin: 80, baseMax: 125, perLevelMin: 5.6, perLevelMax: 8.4 },
    exp: 140,
    chestDropChance: 0.18,
  },
  red: {
    unlockLevel: 20,
    encounterChance: 0.28,
    hp: { baseMin: 4100, baseMax: 6200, perLevelMin: 145, perLevelMax: 220 },
    attack: { baseMin: 155, baseMax: 230, perLevelMin: 8.6, perLevelMax: 12.2 },
    exp: 260,
    chestDropChance: 0.28,
  },
  rainbow: {
    unlockLevel: 30,
    encounterChance: 0.22,
    hp: { baseMin: 7600, baseMax: 10800, perLevelMin: 230, perLevelMax: 330 },
    attack: { baseMin: 260, baseMax: 380, perLevelMin: 13.8, perLevelMax: 19.4 },
    exp: 430,
    chestDropChance: 0.4,
  },
};
const levelMilestoneRewards = {
  5: { hp: 80, attack: 10, text: "最大生命與攻擊力明顯提升" },
  10: { hp: 140, attack: 18, text: "開始可能遭遇虎形魔王" },
  15: { hp: 170, attack: 24, text: "寶箱掉落判定更加穩定" },
  20: { hp: 240, attack: 34, text: "開始可能遭遇龍形魔王" },
  25: { hp: 290, attack: 42, text: "戰鬥能力大幅成長" },
  30: { hp: 380, attack: 58, text: "開始可能遭遇翼手龍魔王" },
  35: { hp: 450, attack: 72, text: "高階戰鬥耐久提升" },
  40: { hp: 540, attack: 88, text: "深層地底戰力提升" },
  45: { hp: 660, attack: 108, text: "接近滿級的開拓者力量" },
  50: { hp: 850, attack: 140, text: "達到等級上限，成為地底傳奇" },
};
const TRADE_BUY_ITEM_COUNT = 3;
const TRADE_BUY_TERRAIN_CARD_COUNT = 3;
const TRADE_ITEM_BUY_PRICE_RANGE = { min: 300, max: 1500 };
const TRADE_ITEM_SELL_PRICE = 300;
const TRADE_TERRAIN_BUY_PRICES = {
  稀有: 5000,
  極稀有: 50000,
  超稀有: 100000,
  最稀有: 500000,
};
const TRADE_TERRAIN_SELL_PRICES = {
  稀有: 1000,
  極稀有: 5000,
  超稀有: 10000,
  最稀有: 50000,
};
const magicChestDrops = [
  { name: "紅色藥水", chance: 15 },
  { name: "橘色藥水", chance: 12 },
  { name: "白色藥水", chance: 3 },
  { name: "天使的祝福", chance: 5 },
  { name: "白金之星", chance: 10 },
  { name: "地獄烈火", chance: 15 },
  { name: "堅固防盾", chance: 7 },
  { name: "反射之戟", chance: 13 },
  { name: "格擋之盾", chance: 20 },
];
const loginRewardConfigs = {
  daily: {
    label: "每日登入獎勵",
    title: "每日補給寶箱",
    itemCount: 3,
    terrainCardCount: 1,
    terrainRarityTable: [
      { rarity: "稀有", chance: 85 },
      { rarity: "極稀有", chance: 15 },
    ],
    description: "每天可領遊戲道具 3 個與地形卡 1 張，地形卡為稀有或極稀有。",
  },
  weekly: {
    label: "每週登入獎勵",
    title: "週日遠征寶箱",
    itemCount: 5,
    terrainCardCount: 2,
    terrainRarityTable: [
      { rarity: "稀有", chance: 70 },
      { rarity: "極稀有", chance: 25 },
      { rarity: "超稀有", chance: 5 },
    ],
    description: "每週日可領遊戲道具 5 個與地形卡 2 張，地形卡最高可到超稀有。",
  },
  monthly: {
    label: "每月登入獎勵",
    title: "月末深淵寶箱",
    itemCount: 7,
    terrainCardCount: 3,
    terrainRarityTable: [
      { rarity: "稀有", chance: 60 },
      { rarity: "極稀有", chance: 27 },
      { rarity: "超稀有", chance: 10 },
      { rarity: "最稀有", chance: 3 },
    ],
    description: "每個月最後一天可領遊戲道具 7 個與地形卡 3 張，地形卡最高可到最稀有。",
  },
};
const terrainCardDefinitions = [
  { name: "林中柵欄（稀有）", rarity: "稀有", featureType: "forestFence", icon: "forest-fence-card", description: "竹林背景中間立著一道古老柵欄。" },
  { name: "天堂寺（稀有）", rarity: "稀有", featureType: "heavenTemple", icon: "heaven-temple-card", description: "兩朵雲托起寺廟，屋頂奉茶上插著竹子。" },
  { name: "防護罩（稀有）", rarity: "稀有", featureType: "landShield", icon: "land-shield-card", description: "巨大防護罩籠罩土地，上面寫著 Land Craft。" },
  { name: STARTER_TERRAIN_CARD, rarity: "稀有", featureType: "pagoda", icon: "pagoda-card", description: "一座九層寶塔矗立在地底岩盤上。" },
  { name: "Land Craft之星（稀有）", rarity: "稀有", featureType: "landCraftStar", icon: "land-star-card", description: "明亮星星照亮土地，象徵 Land Craft 的祝福。" },
  { name: "傳送門徽章（稀有）", rarity: "稀有", featureType: "portalBadge", icon: "portal-badge-card", description: "一枚正在打開傳送門的徽章。" },
  { name: "花龍蛋（稀有）", rarity: "稀有", featureType: "flowerDragonEgg", icon: "flower-dragon-egg-card", description: "破裂龍蛋裡孵出身上有花紋的小龍。" },
  { name: "電競召喚卡牌（極稀有）", rarity: "極稀有", featureType: "esportsSummonCard", icon: "esports-summon-card", description: "寫著 Land Craft 的召喚卡片，會在土地上形成電競召喚場。" },
  { name: "金球防宮之門（極稀有）", rarity: "極稀有", featureType: "goldenGate", icon: "golden-gate-card", description: "一座鑲著金球的城堡大門。" },
  { name: "火精靈（極稀有）", rarity: "極稀有", featureType: "fireSpirit", icon: "fire-spirit-card", description: "火元素精靈盤踞在土地中央。" },
  { name: "地獄黑洞（超稀有）", rarity: "超稀有", featureType: "hellBlackHole", icon: "hell-black-hole-card", description: "綠、紅、藍混色黑洞裡映著地獄谷與紫色烏雲。" },
  { name: "星空落雨（超稀有）", rarity: "超稀有", featureType: "starRain", icon: "star-rain-card", description: "外太空背景降下流星雨。" },
  { name: "水之神召喚石（超稀有）", rarity: "超稀有", featureType: "waterGodStone", icon: "water-god-stone-card", description: "水池中央插著一把召喚之劍。" },
  { name: "水晶龍門盾（最稀有）", rarity: "最稀有", featureType: "crystalDragonShield", icon: "crystal-dragon-shield-card", description: "刻著龍門紋路的盾牌，中央鑲著藍色水晶。" },
];
const terrainCardAliases = {
  [LEGACY_STARTER_TERRAIN_CARD]: STARTER_TERRAIN_CARD,
  "天堂寺（稀有，Land Craft競賽冠軍獎勵）": "天堂寺（稀有）",
  "林中柵欄（一般）": "林中柵欄（稀有）",
  "防護罩（進階）": "防護罩（稀有）",
  "花龍蛋（進階）": "花龍蛋（稀有）",
};
const terrainCardPoolsByRarity = terrainCardDefinitions.reduce((pools, card) => {
  pools[card.rarity] = pools[card.rarity] || [];
  pools[card.rarity].push(card.name);
  return pools;
}, {});
const terrainCardChestRarityTables = {
  神獸寶箱: [
    { rarity: "稀有", chance: 78 },
    { rarity: "極稀有", chance: 16 },
    { rarity: "超稀有", chance: 5 },
    { rarity: "最稀有", chance: 1 },
  ],
  晶鑽寶箱: [
    { rarity: "稀有", chance: 70 },
    { rarity: "極稀有", chance: 20 },
    { rarity: "超稀有", chance: 8 },
    { rarity: "最稀有", chance: 2 },
  ],
  鐵門寶箱: [
    { rarity: "稀有", chance: 88 },
    { rarity: "極稀有", chance: 9 },
    { rarity: "超稀有", chance: 3 },
  ],
};
const tradeTerrainRarityTable = [
  { rarity: "稀有", chance: 60 },
  { rarity: "極稀有", chance: 20 },
  { rarity: "超稀有", chance: 15 },
  { rarity: "最稀有", chance: 5 },
];
const terrainCardInfoByName = Object.fromEntries(terrainCardDefinitions.map((card) => [card.name, card]));
const inventoryItemInfo = {
  神獸寶箱: { type: "chest", icon: "beast-chest", description: "雙擊打開，有機會取得強力祝福或反擊類道具。" },
  晶鑽寶箱: { type: "chest", icon: "crystal-chest", description: "雙擊打開，常見水晶系補血藥水與祝福。" },
  鐵門寶箱: { type: "chest", icon: "iron-chest", description: "雙擊打開，常見防禦與格擋類道具。" },
  魔法寶箱: { type: "chest", icon: "magic-chest", description: "雙擊打開，依魔法寶箱機率取得隨機道具。" },
  紅色藥水: { type: "item", icon: "red-potion", description: "補充血量 200。" },
  橘色藥水: { type: "item", icon: "orange-potion", description: "補充血量 500。" },
  白色藥水: { type: "item", icon: "white-potion", description: "補充血量 800。" },
  天使的祝福: { type: "item", icon: "angel-blessing", description: "補充血量全滿。" },
  白金之星: { type: "item", icon: "platinum-star", description: "5 回合內魔王不可發動攻擊。" },
  地獄烈火: { type: "item", icon: "hellfire", description: "3 回合內攻擊力加倍。" },
  堅固防盾: { type: "item", icon: "guard-shield", description: "3 回合內魔王攻擊無效。" },
  反射之戟: { type: "item", icon: "reflect-spear", description: "反射 3 次魔王攻擊，把傷害扣到魔王血量。" },
  格擋之盾: { type: "item", icon: "block-shield", description: "3 次魔王傷害減半。" },
  ...Object.fromEntries(
    terrainCardDefinitions.map((card) => [
      card.name,
      { type: "terrainCard", icon: card.icon, featureType: card.featureType, rarity: card.rarity, description: `雙擊後選擇自己的土地放置：${card.description}` },
    ]),
  ),
  [LEGACY_STARTER_TERRAIN_CARD]: { type: "terrainCard", icon: "pagoda-card", featureType: "pagoda", rarity: "稀有", description: "舊版寶塔地形卡，雙擊後可放置九層寶塔。" },
  "龍之刀（一般）": { type: "item", icon: "dragon-knife", description: "交易之場購買的一般武器。" },
  "飛轟大龍斬（稀有）": { type: "item", icon: "dragon-slash", description: "交易之場購買的稀有武器。" },
  "晶水藥瓶（稀有）": { type: "item", icon: "crystal-vial", description: "交易之場購買的稀有藥瓶。" },
};
const terrainFeatureInfo = {
  forestFence: { cardName: "林中柵欄（稀有）", name: "林中柵欄", description: "竹林中立著一道守護柵欄。" },
  heavenTemple: { cardName: "天堂寺（稀有）", name: "天堂寺", description: "雲上的寺廟讓土地變成天界地形。" },
  landShield: { cardName: "防護罩（稀有）", name: "防護罩", description: "寫著 Land Craft 的巨大防護罩。" },
  pagoda: { cardName: STARTER_TERRAIN_CARD, name: "九層寶塔", description: "古老九層寶塔讓土地變成特殊建築地形。" },
  landCraftStar: { cardName: "Land Craft之星（稀有）", name: "Land Craft之星", description: "星形祝福照亮地底岩盤。" },
  portalBadge: { cardName: "傳送門徽章（稀有）", name: "傳送門徽章", description: "徽章召喚出一座傳送門。" },
  flowerDragonEgg: { cardName: "花龍蛋（稀有）", name: "花龍蛋", description: "花紋幼龍從破裂龍蛋中孵化。" },
  esportsSummonCard: { cardName: "電競召喚卡牌（極稀有）", name: "電競召喚卡牌", description: "Land Craft 卡片形成電競召喚場。" },
  goldenGate: { cardName: "金球防宮之門（極稀有）", name: "金球防宮之門", description: "鑲著金球的城堡大門守住土地。" },
  fireSpirit: { cardName: "火精靈（極稀有）", name: "火精靈", description: "火元素精靈盤踞於土地中央。" },
  hellBlackHole: { cardName: "地獄黑洞（超稀有）", name: "地獄黑洞", description: "混色黑洞通往紫雲籠罩的地獄谷。" },
  starRain: { cardName: "星空落雨（超稀有）", name: "星空落雨", description: "外太空流星雨墜落在地底土地上。" },
  waterGodStone: { cardName: "水之神召喚石（超稀有）", name: "水之神召喚石", description: "水池中央的劍召喚水之神力。" },
  crystalDragonShield: { cardName: "水晶龍門盾（最稀有）", name: "水晶龍門盾", description: "藍色水晶盾牌成為土地的龍門守護。" },
};
const terrainFeatureArtSources = {
  forestFence: "assets/terrain-cards/forest-fence.png",
  heavenTemple: "assets/terrain-cards/heaven-temple.png",
  landShield: "assets/terrain-cards/land-shield.png",
  pagoda: "assets/terrain-cards/pagoda.png",
  landCraftStar: "assets/terrain-cards/land-star.png",
  portalBadge: "assets/terrain-cards/portal-badge.png",
  flowerDragonEgg: "assets/terrain-cards/flower-dragon-egg.png",
  esportsSummonCard: "assets/terrain-cards/esports-summon.png",
  goldenGate: "assets/terrain-cards/golden-gate.png",
  fireSpirit: "assets/terrain-cards/fire-spirit.png",
  hellBlackHole: "assets/terrain-cards/hell-black-hole.png",
  starRain: "assets/terrain-cards/star-rain.png",
  waterGodStone: "assets/terrain-cards/water-god-stone.png",
  crystalDragonShield: "assets/terrain-cards/crystal-dragon-shield.png",
};

const authScreen = document.querySelector("#auth-screen");
const authForm = document.querySelector("#auth-form");
const authUsername = document.querySelector("#auth-username");
const authPassword = document.querySelector("#auth-password");
const authRegister = document.querySelector("#auth-register");
const authTestLogin = document.querySelector("#auth-test-login");
const authMessage = document.querySelector("#auth-message");
const introCinematic = document.querySelector("#intro-cinematic");
const jadeCupAd = document.querySelector("#jade-cup-ad");
const jadeCupClose = document.querySelector("#jade-cup-close");
const jadeCupRewards = document.querySelector("#jade-cup-rewards");
const currentAccountLabel = document.querySelector("#current-account-label");
const logoutButton = document.querySelector("#logout-button");
const musicToggle = document.querySelector("#music-toggle");
const sfxToggle = document.querySelector("#sfx-toggle");
const viewport = document.querySelector("#map-viewport");
const worldSize = document.querySelector("#world-size");
const canvas = document.querySelector("#world-canvas");
const ctx = canvas.getContext("2d");
const zoomLabel = document.querySelector("#zoom-label");
const zoomRange = document.querySelector("#zoom-range");
const zoomInButton = document.querySelector("#zoom-in");
const zoomOutButton = document.querySelector("#zoom-out");
const centerPlayerButton = document.querySelector("#center-player");
const playerCount = document.querySelector("#player-count");
const npcCount = document.querySelector("#npc-count");
const moneyCount = document.querySelector("#money-count");
const hpCount = document.querySelector("#hp-count");
const statusText = document.querySelector("#status-text");
const eventLabel = document.querySelector("#event-label");
const achievementList = document.querySelector("#achievement-list");
const confirmDialog = document.querySelector("#confirm-dialog");
const targetInfo = document.querySelector("#target-info");
const confirmBattleButton = document.querySelector("#confirm-battle");
const battleDialog = document.querySelector("#battle-dialog");
const battleTitle = document.querySelector("#battle-title");
const battleSubtitle = document.querySelector("#battle-subtitle");
const escapeBattleButton = document.querySelector("#escape-battle");
const battlePlayerHp = document.querySelector("#battle-player-hp");
const battlePlayerAttack = document.querySelector("#battle-player-attack");
const battleTurn = document.querySelector("#battle-turn");
const bossList = document.querySelector("#boss-list");
const bossFieldHud = document.querySelector("#boss-field-hud");
const attackButton = document.querySelector("#attack-button");
const battleItemPanel = document.querySelector("#battle-item-panel");
const battleItemSlots = document.querySelector("#battle-item-slots");
const battleItemSelect = document.querySelector("#battle-item-select");
const assignBattleItemButton = document.querySelector("#assign-battle-item");
const pauseBattleButton = document.querySelector("#pause-battle-button");
const battleItemMessage = document.querySelector("#battle-item-message");
const battleLog = document.querySelector("#battle-log");
const heroAvatar = document.querySelector("#hero-avatar");
const attackSlash = document.querySelector("#attack-slash");
const heroFieldHp = document.querySelector("#hero-field-hp");
const heroFieldHpBar = document.querySelector("#hero-field-hp-bar");
const damageFloatLayer = document.querySelector("#damage-float-layer");
const bossAttackEffect = document.querySelector("#boss-attack-effect");
const victoryDialog = document.querySelector("#victory-dialog");
const victoryMessage = document.querySelector("#victory-message");
const defeatDialog = document.querySelector("#defeat-dialog");
const defeatMessage = document.querySelector("#defeat-message");
const achievementDialog = document.querySelector("#achievement-dialog");
const achievementCard = document.querySelector("#achievement-card");
const achievementIcon = document.querySelector("#achievement-icon");
const achievementTitle = document.querySelector("#achievement-title");
const achievementMessage = document.querySelector("#achievement-message");
const achievementReward = document.querySelector("#achievement-reward");
const achievementClose = document.querySelector("#achievement-close");
const quickMenu = document.querySelector(".quick-menu");
const quickMenuToggle = document.querySelector("#quick-menu-toggle");
const quickMenuItems = document.querySelector("#quick-menu-items");
const featureDialog = document.querySelector("#feature-dialog");
const featureKicker = document.querySelector("#feature-kicker");
const featureTitle = document.querySelector("#feature-title");
const featureContent = document.querySelector("#feature-content");
const featureClose = document.querySelector("#feature-close");
const chestBeastButton = document.querySelector("#chest-beast-button");
const chestBeastDialog = document.querySelector("#chest-beast-dialog");
const chestBeastClose = document.querySelector("#chest-beast-close");
const chestAchievementCount = document.querySelector("#chest-achievement-count");
const chestHpRange = document.querySelector("#chest-hp-range");
const chestMonthStatus = document.querySelector("#chest-month-status");
const chestBeastHpBar = document.querySelector("#chest-beast-hp-bar");
const chestBeastHpLabel = document.querySelector("#chest-beast-hp-label");
const joinChestCampaign = document.querySelector("#join-chest-campaign");
const chestBeastLog = document.querySelector("#chest-beast-log");
const tradeButton = document.querySelector("#trade-button");
const tradeDialog = document.querySelector("#trade-dialog");
const tradeClose = document.querySelector("#trade-close");
const tradeMoney = document.querySelector("#trade-money");
const tradeProductGrid = document.querySelector("#trade-product-grid");
const tradeSellName = document.querySelector("#trade-sell-name");
const tradeListButton = document.querySelector("#trade-list-button");
const tradeListingsPanel = document.querySelector("#trade-listings");
const tradeLog = document.querySelector("#trade-log");

const terrainPalette = {
  magma: { base: "#40110d", mid: "#8f2517", high: "#ff7a24", accent: "#ffd36a", shadow: "#130908", crack: "#ffb238", glow: "rgba(255, 91, 31, 0.38)" },
  blackRock: { base: "#111014", mid: "#242127", high: "#514a50", accent: "#6d6267", shadow: "#050506", crack: "#39333a", glow: "rgba(255, 111, 49, 0.1)" },
  grayRock: { base: "#3b383a", mid: "#5f5a5b", high: "#9b9491", accent: "#c7beb8", shadow: "#201e20", crack: "#2a282a", glow: "rgba(255, 255, 255, 0.06)" },
  yellowCrystal: { base: "#332817", mid: "#7f5a1f", high: "#d8a72c", accent: "#ffe58a", shadow: "#17110b", crack: "#a87522", glow: "rgba(255, 216, 107, 0.32)" },
  pinkCrystal: { base: "#351826", mid: "#74345e", high: "#c55496", accent: "#ff9bd1", shadow: "#160912", crack: "#8c3a70", glow: "rgba(255, 127, 205, 0.28)" },
  advanced: { base: "#20143f", mid: "#4730a7", high: "#6b45ff", accent: "#ffeeff", shadow: "#0f0924", crack: "#9e80ff", glow: "rgba(155, 117, 255, 0.3)" },
};
const terrainLabels = {
  magma: "岩漿",
  blackRock: "黑色岩石",
  grayRock: "灰色岩石",
  yellowCrystal: "黃色水晶",
  pinkCrystal: "粉色水晶",
  advanced: "進階地形",
};

const bossColors = {
  green: { name: "熔岩岩石魔王", color: "#45d66d", glow: "rgba(69, 214, 109, 0.62)" },
  blue: { name: "虎型魔王", color: "#4aa3ff", glow: "rgba(255, 153, 57, 0.62)" },
  red: { name: "龍型魔王", color: "#ff4f45", glow: "rgba(255, 79, 69, 0.62)" },
  rainbow: { name: "翼魔王", color: "linear-gradient(135deg, #54e28d, #58a6ff, #ff73c5, #ffd65b)", glow: "rgba(255, 214, 91, 0.7)" },
  chestWolf: { name: "Daemon 魔狼", color: "#ff5b23", glow: "rgba(255, 91, 35, 0.82)" },
};

let zoom = 1;
let tileSize = BASE_TILE_SIZE;
let playerLands = new Set();
let npcLands = new Set();
let advancedLands = new Set();
let landFeatures = new Map();
let selectedTarget = null;
let placementMode = null;
let battle = null;
let money = 0;
let playerLevel = 1;
let playerExp = 0;
let npcAttackWins = 0;
let lastNpcGrowthAt = Date.now();
let animationFrame = 0;
let unlockedAchievements = new Set();
let achievementQueue = [];
let itemInventory = new Map();
let chestBeastBattle = null;
let lastChestRewardMonth = "";
let lastDailyRewardDate = "";
let tradeListings = [];
let currentTradeProducts = [];
let starterTerrainCardGranted = false;
let bossIdSequence = 0;
let currentAccount = null;
let currentNpcProfile = null;
let authProvider = createLocalAuthProvider();
let authProviderReady = null;
let npcGrowthTimer = null;
let autosaveTimer = null;
let introCinematicTimer = null;
let jadeCupAdTimer = null;
let audioContext = null;
let backgroundMusic = null;
let terrainFeatureArtImages = {};
let audioPrefs = loadAudioPrefs();

authProviderReady = initAuthSystem();
updateAudioControls();
bindAudioUnlock();
preloadTerrainFeatureArt();

function loadAudioPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(AUDIO_PREF_STORAGE_KEY) || "{}");
    return {
      music: saved.music !== false,
      sfx: saved.sfx !== false,
    };
  } catch (error) {
    return { music: true, sfx: true };
  }
}

function saveAudioPrefs() {
  localStorage.setItem(AUDIO_PREF_STORAGE_KEY, JSON.stringify(audioPrefs));
}

function updateAudioControls() {
  musicToggle.textContent = audioPrefs.music ? "音樂 ON" : "音樂 OFF";
  musicToggle.classList.toggle("active", audioPrefs.music);
  musicToggle.setAttribute("aria-pressed", String(audioPrefs.music));
  sfxToggle.textContent = audioPrefs.sfx ? "音效 ON" : "音效 OFF";
  sfxToggle.classList.toggle("active", audioPrefs.sfx);
  sfxToggle.setAttribute("aria-pressed", String(audioPrefs.sfx));
}

function toggleMusic() {
  audioPrefs.music = !audioPrefs.music;
  saveAudioPrefs();
  updateAudioControls();
  if (audioPrefs.music) {
    startBackgroundMusic();
  } else {
    stopBackgroundMusic();
  }
}

function toggleSfx() {
  audioPrefs.sfx = !audioPrefs.sfx;
  saveAudioPrefs();
  updateAudioControls();
  if (audioPrefs.sfx) playSfx("click");
}

function bindAudioUnlock() {
  window.addEventListener("pointerdown", unlockAudioOnce, { once: true, passive: true });
  window.addEventListener("touchstart", unlockAudioOnce, { once: true, passive: true });
  window.addEventListener("keydown", unlockAudioOnce, { once: true });
}

function unlockAudioOnce() {
  if (audioPrefs.music) startBackgroundMusic();
}

function preloadTerrainFeatureArt() {
  terrainFeatureArtImages = {};
  Object.entries(terrainFeatureArtSources).forEach(([featureType, src]) => {
    const image = new Image();
    image.onload = scheduleDraw;
    image.src = src;
    terrainFeatureArtImages[featureType] = image;
  });
}

function ensureAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function startBackgroundMusic() {
  if (!audioPrefs.music) return;
  if (!backgroundMusic) {
    backgroundMusic = new Audio(BACKGROUND_MUSIC_SRC);
    backgroundMusic.loop = true;
    backgroundMusic.preload = "auto";
    backgroundMusic.volume = 0.32;
  }

  backgroundMusic.volume = 0.32;
  const playPromise = backgroundMusic.play();
  if (playPromise?.catch) playPromise.catch(() => {});
}

function stopBackgroundMusic() {
  if (!backgroundMusic) return;
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

function playIntroCinematic() {
  if (!introCinematic) return;
  clearTimeout(introCinematicTimer);
  introCinematic.classList.remove("hidden", "active");
  introCinematic.setAttribute("aria-hidden", "false");
  void introCinematic.offsetWidth;
  introCinematic.classList.add("active");
  const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 900 : 3200;
  introCinematicTimer = setTimeout(hideIntroCinematic, duration);
}

function hideIntroCinematic() {
  if (!introCinematic) return;
  introCinematic.classList.remove("active");
  introCinematic.classList.add("hidden");
  introCinematic.setAttribute("aria-hidden", "true");
}

function scheduleJadeCupAd() {
  clearTimeout(jadeCupAdTimer);
  if (!shouldShowJadeCupAd()) return;
  const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 950 : 3300;
  jadeCupAdTimer = setTimeout(showJadeCupAd, delay);
}

function shouldShowJadeCupAd(date = new Date()) {
  const month = date.getMonth() + 1;
  return month >= 1 && month <= 10;
}

function showJadeCupAd() {
  if (!jadeCupAd || !jadeCupRewards || !currentAccount) return;
  jadeCupRewards.innerHTML = `
    <div class="jade-cup-list-header" aria-hidden="true">
      <span>獎勵</span>
      <span>名次</span>
      <span>玩家暱稱</span>
    </div>
    ${createJadeCupRows()
      .map(
        (reward) => `
        <div class="jade-cup-row">
          <span class="jade-reward-icon ${reward.iconClass}" aria-hidden="true"></span>
          <strong class="jade-reward-name">${reward.rewardName}</strong>
          <span class="jade-rank">${reward.rank}</span>
          <span class="jade-player-name">${reward.playerName}</span>
        </div>
      `,
      )
      .join("")}
  `;
  jadeCupAd.classList.remove("hidden");
  jadeCupAd.setAttribute("aria-hidden", "false");
}

function hideJadeCupAd() {
  clearTimeout(jadeCupAdTimer);
  if (!jadeCupAd) return;
  jadeCupAd.classList.add("hidden");
  jadeCupAd.setAttribute("aria-hidden", "true");
}

function createJadeCupRows() {
  const names = pickTournamentNames(3);
  return [
    { iconClass: "jade-trophy-icon", rewardName: "電競玉石盃（最稀有）", rank: "第一名", playerName: names[0] },
    { iconClass: "jade-wolf-icon", rewardName: "電競魔王（極稀有）", rank: "第二名", playerName: names[1] },
    { iconClass: "jade-player-icon", rewardName: "電競玩家（極稀有）", rank: "第三名", playerName: names[2] },
  ];
}

function pickTournamentNames(count) {
  const pool = ["熔岩小隊長", "黑曜星辰", "晶洞旅人", "地底阿澤", "玉石獵手", "火山小勇者", "深岩米娜", "赤焰拓荒者", "月晶騎士"];
  const names = [];
  while (names.length < count) {
    const name = pool[randomInt(0, pool.length - 1)];
    if (!names.includes(name)) names.push(name);
  }
  return names;
}

function playSfx(name) {
  if (!audioPrefs.sfx) return;
  const context = ensureAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const presets = {
    click: [{ frequency: 520, duration: 0.06, volume: 0.035, type: "sine" }],
    playerAttack: [
      { frequency: 320, endFrequency: 720, duration: 0.09, volume: 0.09, type: "triangle" },
      { frequency: 740, endFrequency: 1280, duration: 0.065, volume: 0.065, type: "square", startOffset: 0.025 },
      { frequency: 1480, duration: 0.035, volume: 0.04, type: "sine", startOffset: 0.07 },
    ],
    critical: [
      { frequency: 330, endFrequency: 990, duration: 0.18, volume: 0.14, type: "sawtooth" },
      { frequency: 1320, duration: 0.08, volume: 0.08, type: "triangle", startOffset: 0.06 },
    ],
    bossAttack: [
      { frequency: 132, endFrequency: 54, duration: 0.24, volume: 0.16, type: "sawtooth" },
      { frequency: 48, duration: 0.3, volume: 0.095, type: "sine" },
      { frequency: 210, endFrequency: 92, duration: 0.16, volume: 0.075, type: "square", startOffset: 0.05 },
    ],
    dodge: [{ frequency: 760, endFrequency: 1020, duration: 0.12, volume: 0.065, type: "sine" }],
    victory: [
      { frequency: 392, duration: 0.14, volume: 0.09, type: "triangle" },
      { frequency: 523.25, duration: 0.14, volume: 0.09, type: "triangle", startOffset: 0.13 },
      { frequency: 659.25, duration: 0.22, volume: 0.1, type: "triangle", startOffset: 0.26 },
    ],
    defeat: [
      { frequency: 196, endFrequency: 92, duration: 0.34, volume: 0.12, type: "sawtooth" },
      { frequency: 73.42, duration: 0.36, volume: 0.08, type: "triangle", startOffset: 0.08 },
    ],
    chest: [
      { frequency: 660, duration: 0.08, volume: 0.075, type: "triangle" },
      { frequency: 880, duration: 0.08, volume: 0.075, type: "triangle", startOffset: 0.09 },
      { frequency: 1174.66, duration: 0.15, volume: 0.08, type: "sine", startOffset: 0.18 },
    ],
    heal: [
      { frequency: 523.25, duration: 0.1, volume: 0.06, type: "sine" },
      { frequency: 783.99, duration: 0.16, volume: 0.055, type: "sine", startOffset: 0.09 },
    ],
  };

  (presets[name] || presets.click).forEach((preset) => {
    playTone({
      ...preset,
      startAt: now + (preset.startOffset || 0),
      attack: 0.006,
      release: Math.max(0.03, preset.duration * 0.46),
    });
  });
}

function playTone({ frequency, endFrequency, type = "sine", startAt, duration, volume, destination, attack = 0.01, release = 0.08 }) {
  const context = ensureAudioContext();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startAt + duration);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.linearRampToValueAtTime(volume, startAt + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration + release);
  oscillator.connect(gain);
  gain.connect(destination || context.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + release + 0.02);
}

function createAchievement(type, amount) {
  const theme = type === "land" ? pickAchievementTheme(achievementThemes, amount) : pickAchievementTheme(moneyAchievementThemes, amount);
  const formatted = amount.toLocaleString();

  if (type === "land") {
    return {
      id: `land-${amount}`,
      type,
      amount,
      icon: theme.icon,
      theme: theme.theme,
      title: `${theme.title}：${formatted} 塊土地`,
      label: `擁有 ${formatted} 塊土地`,
      message: `你已經擁有 ${formatted} 塊土地，地底世界又多了一片屬於你的領域。`,
      reward: theme.reward,
      isUnlocked: () => playerLands.size >= amount,
    };
  }

  return {
    id: `money-${amount}`,
    type,
    amount,
    icon: theme.icon,
    theme: theme.theme,
    title: `${theme.title}：$${formatted}`,
    label: `擁有 $${formatted}`,
    message: `你累積了 $${formatted}，打敗魔王後的戰利品正在變成真正的力量。`,
    reward: theme.reward,
    isUnlocked: () => money >= amount,
  };
}

function pickAchievementTheme(themes, amount) {
  return themes.find((theme) => amount <= theme.max);
}

async function initAuthSystem() {
  authProvider = await createAuthProvider();
  await ensureTestAccount();
  document.body.classList.add("auth-locked");
  authScreen.classList.remove("hidden");
  currentAccountLabel.textContent = "未登入";
  authUsername.value = "";
  authPassword.value = "";
  setAuthMessage(`測試帳號：test / test123｜${authProvider.label}`);
  authUsername.focus();
}

function initGame(account) {
  currentAccount = normalizeAccountRecord(account);
  applyGameState(account.gameState);
  closeOpenDialogs();
  renderAchievements();
  updateWorldSize();
  resizeCanvas();
  centerOnPlayerLand();
  updateHud();
  if (npcGrowthTimer) clearInterval(npcGrowthTimer);
  npcGrowthTimer = setInterval(tickNpcGrowth, 30 * 1000);
  startAutosaveTimer();
  document.body.classList.remove("auth-locked");
  authScreen.classList.add("hidden");
  statusText.textContent = `登入成功：${getPlayerNickname()}，你的對應 NPC「${currentNpcProfile.name}」已在地底世界中。`;
  startBackgroundMusic();
  playIntroCinematic();
  scheduleJadeCupAd();
  saveCurrentGame();
}

async function ensureTestAccount() {
  await authProvider.ensureTestAccount();
}

function createAccountRecord(username, password, displayName = username) {
  const npcProfile = createNpcProfile(username);
  return {
    username,
    password,
    displayName,
    nickname: displayName,
    createdAt: Date.now(),
    npcProfile,
    gameState: createNewGameState(npcProfile),
  };
}

function normalizeAccountRecord(account) {
  if (!account) return account;
  account.displayName = account.displayName || account.username || "玩家";
  account.nickname = sanitizeNickname(account.nickname || account.displayName || account.username || "玩家");
  return ensureAccountGameData(account, account.username, account.password, account.displayName);
}

function ensureAccountGameData(account, username = "player", password = "", displayName = username) {
  const safeAccount = account || {};
  safeAccount.username = normalizeUsername(safeAccount.username || username);
  safeAccount.password = safeAccount.password || password;
  safeAccount.displayName = safeAccount.displayName || displayName || safeAccount.username;
  safeAccount.nickname = sanitizeNickname(safeAccount.nickname || safeAccount.displayName || safeAccount.username);
  safeAccount.createdAt = Number(safeAccount.createdAt || Date.now());
  safeAccount.npcProfile = safeAccount.npcProfile || createNpcProfile(safeAccount.username);
  safeAccount.gameState = safeAccount.gameState || createNewGameState(safeAccount.npcProfile);
  safeAccount.gameState = normalizeLoadedGameState(safeAccount.gameState);
  safeAccount.gameState.npcProfile = safeAccount.gameState.npcProfile || safeAccount.npcProfile;
  return safeAccount;
}

function normalizeLoadedGameState(state) {
  if (!state) return state;
  return {
    ...state,
    landFeatures: normalizeEntryList(state.landFeatures, "key", "featureType"),
    itemInventory: normalizeEntryList(state.itemInventory, "name", "count"),
  };
}

function normalizeEntryList(entries, keyName, valueName) {
  if (!Array.isArray(entries)) return [];
  return entries
    .map((entry) => {
      if (Array.isArray(entry)) return entry;
      if (entry && typeof entry === "object") return [entry[keyName], entry[valueName]];
      return null;
    })
    .filter((entry) => Array.isArray(entry) && entry[0] !== undefined && entry[1] !== undefined);
}

function getPlayerNickname() {
  return sanitizeNickname(currentAccount?.nickname || currentAccount?.displayName || currentAccount?.username || "玩家");
}

function sanitizeNickname(value) {
  return String(value || "").trim().slice(0, 16) || "玩家";
}

function createNpcProfile(username) {
  const titlePool = ["黑曜石工會", "熔岩礦團", "深晶守衛", "玄武岩遠征隊", "赤焰工程隊"];
  const colorPool = ["#6fb6ff", "#8fd0ff", "#b59cff", "#62d6c8", "#ffb86b"];
  const seed = hashString(username);
  return {
    id: `npc-${seed.toString(16)}`,
    name: `${titlePool[seed % titlePool.length]} NPC`,
    color: colorPool[seed % colorPool.length],
    seed,
  };
}

function createNewGameState(npcProfile = createNpcProfile("guest")) {
  const start = { x: randomInt(0, GRID_SIZE - 1), y: randomInt(0, GRID_SIZE - 1) };
  const initialPlayerLands = [keyOf(start.x, start.y)];
  const originalPlayerLands = playerLands;
  playerLands = new Set(initialPlayerLands);
  const initialNpcLands = [...createLandCluster(NPC_INITIAL_LANDS, start)];
  playerLands = originalPlayerLands;

  return {
    version: 1,
    npcProfile,
    playerLands: initialPlayerLands,
    npcLands: initialNpcLands,
    advancedLands: [],
    landFeatures: [],
    money: 0,
    playerLevel: 1,
    playerExp: 0,
    npcAttackWins: 0,
    lastNpcGrowthAt: Date.now(),
    unlockedAchievements: [],
    itemInventory: [[STARTER_TERRAIN_CARD, 1]],
    lastChestRewardMonth: "",
    lastDailyRewardDate: "",
    tradeListings: [],
    starterTerrainCardGranted: true,
  };
}

function applyGameState(state) {
  const safeState = state || createNewGameState();
  currentNpcProfile = safeState.npcProfile || currentAccount?.npcProfile || createNpcProfile(currentAccount?.username || "guest");
  playerLands = new Set(safeState.playerLands || []);
  npcLands = new Set(safeState.npcLands || []);
  advancedLands = new Set(safeState.advancedLands || []);
  landFeatures = new Map(safeState.landFeatures || []);
  money = Number(safeState.money || 0);
  playerLevel = clamp(Number(safeState.playerLevel || 1), 1, MAX_PLAYER_LEVEL);
  playerExp = Math.max(0, Number(safeState.playerExp || 0));
  npcAttackWins = Number(safeState.npcAttackWins || 0);
  lastNpcGrowthAt = Number(safeState.lastNpcGrowthAt || Date.now());
  unlockedAchievements = new Set(safeState.unlockedAchievements || []);
  itemInventory = normalizeInventoryEntries(safeState.itemInventory || []);
  lastChestRewardMonth = safeState.lastChestRewardMonth || "";
  lastDailyRewardDate = safeState.lastDailyRewardDate || "";
  tradeListings = Array.isArray(safeState.tradeListings) ? safeState.tradeListings : [];
  starterTerrainCardGranted = safeState.starterTerrainCardGranted === true;
  battle = null;
  selectedTarget = null;
  placementMode = null;
  chestBeastBattle = null;

  if (!starterTerrainCardGranted) {
    itemInventory.set(STARTER_TERRAIN_CARD, (itemInventory.get(STARTER_TERRAIN_CARD) || 0) + 1);
    starterTerrainCardGranted = true;
  }

  if (playerLands.size === 0) {
    const freshState = createNewGameState(currentNpcProfile);
    playerLands = new Set(freshState.playerLands);
    npcLands = new Set(freshState.npcLands);
  }

  landFeatures = new Map([...landFeatures].filter(([key]) => playerLands.has(key)));

  if (npcLands.size === 0) {
    npcLands = createLandCluster(NPC_INITIAL_LANDS, cellFromKey([...playerLands][0]));
  }
}

function serializeGameState() {
  return {
    version: 1,
    npcProfile: currentNpcProfile,
    playerLands: [...playerLands],
    npcLands: [...npcLands],
    advancedLands: [...advancedLands],
    landFeatures: [...landFeatures.entries()],
    money,
    playerLevel,
    playerExp,
    npcAttackWins,
    lastNpcGrowthAt,
    unlockedAchievements: [...unlockedAchievements],
    itemInventory: [...itemInventory.entries()],
    lastChestRewardMonth,
    lastDailyRewardDate,
    tradeListings,
    starterTerrainCardGranted,
  };
}

function prepareGameStateForFirestore(state) {
  return {
    ...state,
    landFeatures: (state.landFeatures || []).map(([key, featureType]) => ({ key, featureType })),
    itemInventory: (state.itemInventory || []).map(([name, count]) => ({ name, count })),
  };
}

function normalizeInventoryEntries(entries) {
  const normalized = new Map();
  entries.forEach(([name, count]) => {
    const nextName = terrainCardAliases[name] || name;
    normalized.set(nextName, (normalized.get(nextName) || 0) + Number(count || 0));
  });
  return normalized;
}

async function createAuthProvider() {
  const firebaseConfig = await loadFirebaseConfig();
  if (!firebaseConfig?.enabled) return createLocalAuthProvider();

  try {
    return await createFirebaseAuthProvider(firebaseConfig);
  } catch (error) {
    console.warn("Firebase sync is unavailable. Falling back to local account storage.", error);
    return createLocalAuthProvider("本機儲存模式（Firebase 尚未連線）");
  }
}

async function loadFirebaseConfig() {
  if (window.LAND_CRAFT_FIREBASE_CONFIG) return window.LAND_CRAFT_FIREBASE_CONFIG;

  try {
    const configModule = await import(FIREBASE_CONFIG_MODULE);
    return configModule.firebaseConfig || configModule.default || null;
  } catch (error) {
    return null;
  }
}

function createLocalAuthProvider(label = "本機儲存模式") {
  return {
    kind: "local",
    label,
    async ensureTestAccount() {
      const accounts = loadAccounts();
      const existingAccount = accounts[TEST_ACCOUNT_USERNAME];
      accounts[TEST_ACCOUNT_USERNAME] = existingAccount
        ? ensureAccountGameData(existingAccount, TEST_ACCOUNT_USERNAME, TEST_ACCOUNT_PASSWORD, "測試玩家")
        : createAccountRecord(TEST_ACCOUNT_USERNAME, TEST_ACCOUNT_PASSWORD, "測試玩家");
      saveAccounts(accounts);
    },
    async login(username, password) {
      const accounts = loadAccounts();
      const account = accounts[username];
      if (!account || account.password !== password) return null;
      return account;
    },
    async register(username, password) {
      const accounts = loadAccounts();
      if (accounts[username]) return { error: "exists" };
      const account = createAccountRecord(username, password);
      accounts[username] = account;
      saveAccounts(accounts);
      return { account };
    },
    async saveAccount(account) {
      const accounts = loadAccounts();
      accounts[account.username] = account;
      saveAccounts(accounts);
    },
  };
}

async function createFirebaseAuthProvider(firebaseConfig) {
  const [{ initializeApp }, authModule, firestoreModule] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-firestore.js`),
  ]);
  const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = authModule;
  const { getFirestore, doc, getDoc, setDoc, serverTimestamp } = firestoreModule;
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const usernameToEmail = (username) => (username.includes("@") ? username : `${username}@landcraft.local`);
  const userDocRef = (uid) => doc(db, "users", uid);
  const toFirestoreAccount = (account) => {
    const { password, ...safeAccount } = account;
    return {
      ...safeAccount,
      gameState: prepareGameStateForFirestore(safeAccount.gameState || {}),
      updatedAt: serverTimestamp(),
    };
  };
  const loadOrCreateAccount = async (user, username, displayName = username) => {
    const ref = userDocRef(user.uid);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      return ensureAccountGameData({ ...snapshot.data(), firebaseUid: user.uid }, username, "", displayName);
    }

    const account = createAccountRecord(username, "", displayName);
    account.firebaseUid = user.uid;
    await setDoc(ref, toFirestoreAccount(account), { merge: true });
    return account;
  };

  return {
    kind: "firebase",
    label: "Firebase 雲端同步模式",
    async ensureTestAccount() {
      return true;
    },
    async login(username, password) {
      try {
        const credential = await signInWithEmailAndPassword(auth, usernameToEmail(username), password);
        return loadOrCreateAccount(credential.user, username, username === TEST_ACCOUNT_USERNAME ? "測試玩家" : username);
      } catch (error) {
        if (username !== TEST_ACCOUNT_USERNAME || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") return null;
        try {
          const credential = await createUserWithEmailAndPassword(auth, usernameToEmail(username), password);
          return loadOrCreateAccount(credential.user, username, "測試玩家");
        } catch (createError) {
          console.warn("Unable to create Firebase test account.", createError);
          return null;
        }
      }
    },
    async register(username, password) {
      try {
        const credential = await createUserWithEmailAndPassword(auth, usernameToEmail(username), password);
        const account = await loadOrCreateAccount(credential.user, username);
        return { account };
      } catch (error) {
        return { error: error.code === "auth/email-already-in-use" ? "exists" : "firebase", detail: error };
      }
    },
    async saveAccount(account) {
      const user = auth.currentUser;
      if (!user) return;
      const accountToSave = ensureAccountGameData({ ...account, firebaseUid: user.uid }, account.username, "", account.displayName);
      await setDoc(userDocRef(user.uid), toFirestoreAccount(accountToSave), { merge: true });
    },
    async logout() {
      await signOut(auth);
    },
  };
}

async function ensureAuthProviderReady() {
  if (authProviderReady) await authProviderReady;
}

async function loginAccount(username, password) {
  await ensureAuthProviderReady();
  const normalized = normalizeUsername(username);
  const account = await authProvider.login(normalized, password);

  if (!account) {
    setAuthMessage("帳號或密碼錯誤。", "error");
    return false;
  }

  initGame(account);
  setAuthMessage("登入成功。", "success");
  return true;
}

async function registerAccount(username, password) {
  await ensureAuthProviderReady();
  const normalized = normalizeUsername(username);
  if (!normalized) {
    setAuthMessage("請輸入帳號。", "error");
    return false;
  }

  if (password.length < 4) {
    setAuthMessage("密碼至少需要 4 個字元。", "error");
    return false;
  }

  const result = await authProvider.register(normalized, password);
  if (result.error === "exists") {
    setAuthMessage("這個帳號已經存在，請直接登入。", "error");
    return false;
  }

  if (result.error) {
    setAuthMessage("雲端帳號建立失敗，請稍後再試。", "error");
    console.warn("Unable to register Firebase account.", result.detail);
    return false;
  }

  initGame(result.account);
  setAuthMessage("新增帳號成功。", "success");
  return true;
}

async function logoutAccount() {
  await saveCurrentGame();
  if (authProvider.logout) await authProvider.logout();
  currentAccount = null;
  currentNpcProfile = null;
  if (npcGrowthTimer) {
    clearInterval(npcGrowthTimer);
    npcGrowthTimer = null;
  }
  stopAutosaveTimer();
  closeOpenDialogs();
  hideIntroCinematic();
  hideJadeCupAd();
  document.body.classList.add("auth-locked");
  authScreen.classList.remove("hidden");
  currentAccountLabel.textContent = "未登入";
  authPassword.value = "";
  setAuthMessage("已登出，請重新登入。");
  authUsername.focus();
}

async function saveCurrentGame() {
  if (!currentAccount) return;
  await ensureAuthProviderReady();
  const account = ensureAccountGameData(currentAccount, currentAccount.username, currentAccount.password, currentAccount.displayName);
  account.displayName = currentAccount.displayName;
  account.nickname = currentAccount.nickname;
  account.gameState = serializeGameState();
  account.npcProfile = currentNpcProfile;
  currentAccount = account;
  await authProvider.saveAccount(account);
}

function startAutosaveTimer() {
  if (autosaveTimer) clearInterval(autosaveTimer);
  autosaveTimer = setInterval(saveCurrentGame, GAME_AUTOSAVE_INTERVAL);
}

function stopAutosaveTimer() {
  if (!autosaveTimer) return;
  clearInterval(autosaveTimer);
  autosaveTimer = null;
}

function loadAccounts() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    const accounts = raw ? JSON.parse(raw) : {};
    Object.keys(accounts).forEach((key) => {
      accounts[key] = normalizeAccountRecord(accounts[key]);
    });
    return accounts;
  } catch (error) {
    console.warn("Unable to read Land Craft accounts.", error);
    return {};
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(accounts));
}

function normalizeUsername(username) {
  return String(username || "").trim().toLowerCase();
}

function setAuthMessage(text, type = "") {
  authMessage.textContent = text;
  authMessage.className = `auth-message${type ? ` ${type}` : ""}`;
}

function centerOnPlayerLand() {
  const firstKey = [...playerLands][0];
  if (firstKey) centerOnCell(cellFromKey(firstKey));
}

function closeOpenDialogs() {
  [confirmDialog, battleDialog, victoryDialog, defeatDialog, achievementDialog, featureDialog, chestBeastDialog, tradeDialog].forEach((dialog) => {
    if (dialog.open) dialog.close();
  });
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function keyOf(x, y) {
  return `${x},${y}`;
}

function cellFromKey(key) {
  const [x, y] = key.split(",").map(Number);
  return { x, y };
}

function createLandCluster(total, avoidCell = null) {
  const lands = new Set();
  let startX = randomInt(12, GRID_SIZE - 18);
  let startY = randomInt(12, GRID_SIZE - 18);

  if (avoidCell && Math.abs(startX - avoidCell.x) < 20 && Math.abs(startY - avoidCell.y) < 20) {
    startX = clamp(startX + 40, 12, GRID_SIZE - 18);
    startY = clamp(startY + 40, 12, GRID_SIZE - 18);
  }

  const queue = [{ x: startX, y: startY }];
  while (lands.size < total && queue.length) {
    const cell = queue.shift();
    const key = keyOf(cell.x, cell.y);
    if (lands.has(key) || playerLands.has(key)) continue;

    lands.add(key);
    shuffle(getNeighbors(cell.x, cell.y)).forEach((neighbor) => queue.push(neighbor));
  }

  return lands;
}

function shuffle(items) {
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function hashCell(x, y) {
  let value = x * 374761393 + y * 668265263;
  value = (value ^ (value >> 13)) * 1274126177;
  return (value ^ (value >> 16)) >>> 0;
}

function getTerrain(x, y) {
  const key = keyOf(x, y);
  if (advancedLands.has(key)) return "advanced";

  const value = hashCell(x, y) % 100;
  if (value < 14) return "magma";
  if (value < 44) return "blackRock";
  if (value < 74) return "grayRock";
  if (value < 87) return "yellowCrystal";
  return "pinkCrystal";
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, viewport.clientWidth);
  const height = Math.max(1, viewport.clientHeight);

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  if (zoom < getMinZoom()) {
    setZoom(getMinZoom());
    return;
  }

  updateWorldSize();
  scheduleDraw();
}

function updateWorldSize() {
  const minZoom = getMinZoom();
  tileSize = BASE_TILE_SIZE * zoom;
  const pixelSize = GRID_SIZE * tileSize;
  worldSize.style.width = `${pixelSize}px`;
  worldSize.style.height = `${pixelSize}px`;
  zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
  zoomRange.min = String(Math.round(minZoom * 100));
  zoomRange.value = String(Math.round(zoom * 100));
}

function getMinZoom() {
  const longestViewportSide = Math.max(viewport.clientWidth || 1, viewport.clientHeight || 1);
  const minTileSize = longestViewportSide / MAX_VISIBLE_TILES_PER_SCREEN;
  return Math.min(MAX_ZOOM, Math.max(DEFAULT_MIN_ZOOM, minTileSize / BASE_TILE_SIZE));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function setZoom(nextZoom, anchor = null) {
  const oldZoom = zoom;
  const oldTileSize = tileSize;
  zoom = clamp(Math.round(nextZoom * 10) / 10, getMinZoom(), MAX_ZOOM);
  if (zoom === oldZoom) return;

  const anchorX = anchor ? viewport.scrollLeft + anchor.x : viewport.scrollLeft + viewport.clientWidth / 2;
  const anchorY = anchor ? viewport.scrollTop + anchor.y : viewport.scrollTop + viewport.clientHeight / 2;
  const worldX = anchorX / oldTileSize;
  const worldY = anchorY / oldTileSize;

  updateWorldSize();
  viewport.scrollLeft = worldX * tileSize - (anchor ? anchor.x : viewport.clientWidth / 2);
  viewport.scrollTop = worldY * tileSize - (anchor ? anchor.y : viewport.clientHeight / 2);
  scheduleDraw();
}

function centerOnCell(cell) {
  viewport.scrollLeft = cell.x * tileSize - viewport.clientWidth / 2 + tileSize / 2;
  viewport.scrollTop = cell.y * tileSize - viewport.clientHeight / 2 + tileSize / 2;
  scheduleDraw();
}

function scheduleDraw() {
  if (animationFrame) return;
  animationFrame = requestAnimationFrame(drawWorld);
}

function drawWorld() {
  animationFrame = 0;
  const width = viewport.clientWidth;
  const height = viewport.clientHeight;
  const scrollLeft = viewport.scrollLeft;
  const scrollTop = viewport.scrollTop;
  const startX = clamp(Math.floor(scrollLeft / tileSize) - 1, 0, GRID_SIZE - 1);
  const startY = clamp(Math.floor(scrollTop / tileSize) - 1, 0, GRID_SIZE - 1);
  const endX = clamp(Math.ceil((scrollLeft + width) / tileSize) + 1, 0, GRID_SIZE);
  const endY = clamp(Math.ceil((scrollTop + height) / tileSize) + 1, 0, GRID_SIZE);

  ctx.clearRect(0, 0, width, height);
  drawCavernBackdrop(width, height, scrollLeft, scrollTop);

  for (let y = startY; y < endY; y += 1) {
    for (let x = startX; x < endX; x += 1) {
      drawTile(x, y, x * tileSize - scrollLeft, y * tileSize - scrollTop);
    }
  }

  playerLands.forEach((key) => drawClaimedLand(cellFromKey(key), "player"));
  npcLands.forEach((key) => drawClaimedLand(cellFromKey(key), "npc"));
  if (selectedTarget) drawClaimedLand(selectedTarget, "target");
}

function drawCavernBackdrop(width, height, scrollLeft, scrollTop) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#1b1115");
  gradient.addColorStop(0.42, "#0e0b0d");
  gradient.addColorStop(1, "#26120c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.2;
  for (let i = 0; i < 12; i += 1) {
    const x = wrap(i * 311 - scrollLeft * 0.045, width + 260) - 90;
    const y = wrap(i * 173 - scrollTop * 0.035, height + 220) - 70;
    const lava = ctx.createRadialGradient(x, y, 8, x, y, 130);
    lava.addColorStop(0, "rgba(255, 126, 38, 0.58)");
    lava.addColorStop(0.35, "rgba(151, 42, 22, 0.24)");
    lava.addColorStop(1, "rgba(151, 42, 22, 0)");
    ctx.fillStyle = lava;
    ctx.beginPath();
    ctx.ellipse(x, y, 110, 38, -0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawTile(gridX, gridY, screenX, screenY) {
  const terrainType = getTerrain(gridX, gridY);
  const terrain = terrainPalette[terrainType];
  const detailSeed = hashCell(gridX, gridY);
  const gap = Math.max(2, tileSize * 0.035);
  const depth = Math.max(4, tileSize * 0.13);
  const x = screenX + gap;
  const y = screenY + gap;
  const size = tileSize - gap * 2;
  const topSize = Math.max(8, size - depth * 0.22);
  const topY = y;
  const bottomY = topY + topSize;
  const radius = Math.max(3, tileSize * 0.08);

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.42)";
  ctx.shadowBlur = Math.max(2, tileSize * 0.05);
  ctx.shadowOffsetY = Math.max(2, tileSize * 0.04);
  ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
  ctx.beginPath();
  ctx.roundRect(x + depth * 0.18, topY + depth * 0.34, topSize, topSize, radius);
  ctx.fill();
  ctx.restore();

  ctx.save();
  drawTileSideFaces(x, topY, topSize, depth, terrain);

  ctx.save();
  ctx.beginPath();
  roundedRectPath(x, topY, topSize, topSize, radius);
  ctx.clip();

  const rockGradient = ctx.createLinearGradient(x, topY, x + topSize, bottomY);
  rockGradient.addColorStop(0, terrain.high);
  rockGradient.addColorStop(0.18, terrain.mid);
  rockGradient.addColorStop(0.68, terrain.base);
  rockGradient.addColorStop(1, terrain.shadow);
  ctx.fillStyle = rockGradient;
  ctx.fillRect(x, topY, topSize, topSize);

  drawTileStoneGrain(x, topY, topSize, detailSeed, terrain);
  drawTileTexture(x, topY, topSize, detailSeed, terrain);

  if (terrainType === "magma") {
    drawMagmaTile(x, topY, topSize, detailSeed, terrain);
  } else if (terrainType.includes("Crystal") || terrainType === "advanced") {
    drawCrystalTile(x, topY, topSize, detailSeed, terrain);
  } else {
    drawRockTile(x, topY, topSize, detailSeed, terrain);
  }

  const bevel = ctx.createLinearGradient(x, topY, x + topSize, bottomY);
  bevel.addColorStop(0, "rgba(255, 255, 255, 0.2)");
  bevel.addColorStop(0.2, "rgba(255, 255, 255, 0.04)");
  bevel.addColorStop(0.72, "rgba(0, 0, 0, 0.04)");
  bevel.addColorStop(1, "rgba(0, 0, 0, 0.4)");
  ctx.fillStyle = bevel;
  ctx.fillRect(x, topY, topSize, topSize);
  ctx.restore();

  drawTileBevel(x, topY, topSize, radius, terrain);
  ctx.restore();
}

function drawTileSideFaces(x, y, size, depth, terrain) {
  const right = ctx.createLinearGradient(x + size, y, x + size + depth * 0.22, y + size + depth);
  right.addColorStop(0, terrain.mid);
  right.addColorStop(0.36, terrain.base);
  right.addColorStop(1, terrain.shadow);
  ctx.fillStyle = right;
  ctx.beginPath();
  ctx.moveTo(x + size, y + depth * 0.08);
  ctx.lineTo(x + size + depth * 0.22, y + depth * 0.34);
  ctx.lineTo(x + size + depth * 0.22, y + size + depth);
  ctx.lineTo(x + size, y + size);
  ctx.closePath();
  ctx.fill();

  const front = ctx.createLinearGradient(x, y + size, x + size, y + size + depth);
  front.addColorStop(0, terrain.base);
  front.addColorStop(0.55, terrain.shadow);
  front.addColorStop(1, "#070506");
  ctx.fillStyle = front;
  ctx.beginPath();
  ctx.moveTo(x + depth * 0.08, y + size);
  ctx.lineTo(x + size, y + size);
  ctx.lineTo(x + size + depth * 0.22, y + size + depth);
  ctx.lineTo(x + depth * 0.3, y + size + depth);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(0, 0, 0, 0.34)";
  ctx.lineWidth = Math.max(1, tileSize * 0.015);
  ctx.beginPath();
  ctx.moveTo(x + depth * 0.22, y + size + depth);
  ctx.lineTo(x + size + depth * 0.22, y + size + depth);
  ctx.lineTo(x + size + depth * 0.22, y + depth * 0.38);
  ctx.stroke();
}

function drawTileBevel(x, y, size, radius, terrain) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 232, 177, 0.18)";
  ctx.lineWidth = Math.max(1, tileSize * 0.018);
  ctx.beginPath();
  roundedRectPath(x + 0.5, y + 0.5, size - 1, size - 1, radius);
  ctx.stroke();

  ctx.strokeStyle = "rgba(0, 0, 0, 0.46)";
  ctx.lineWidth = Math.max(1, tileSize * 0.025);
  ctx.beginPath();
  ctx.moveTo(x + size - radius * 0.2, y + 1);
  ctx.lineTo(x + size - 1, y + size - radius * 0.2);
  ctx.lineTo(x + radius * 0.2, y + size - 1);
  ctx.stroke();

  ctx.strokeStyle = terrain.glow;
  ctx.globalAlpha = 0.22;
  ctx.lineWidth = Math.max(1, tileSize * 0.012);
  ctx.beginPath();
  ctx.moveTo(x + radius, y + 1.5);
  ctx.lineTo(x + size - radius, y + 1.5);
  ctx.stroke();
  ctx.restore();
}

function drawTileStoneGrain(x, y, size, seed, terrain) {
  ctx.save();
  for (let i = 0; i < 6; i += 1) {
    const px = x + normalizedSeed(seed, i + 60) * size;
    const py = y + normalizedSeed(seed, i + 75) * size;
    const rx = size * (0.1 + normalizedSeed(seed, i + 90) * 0.14);
    const ry = size * (0.025 + normalizedSeed(seed, i + 105) * 0.045);
    ctx.globalAlpha = 0.08 + normalizedSeed(seed, i + 120) * 0.08;
    ctx.fillStyle = normalizedSeed(seed, i + 135) > 0.45 ? terrain.high : terrain.shadow;
    ctx.beginPath();
    ctx.ellipse(px, py, rx, ry, normalizedSeed(seed, i + 150) * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawCrystal(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size * 0.65, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size * 0.65, y);
  ctx.closePath();
  ctx.fill();
}

function drawCrystalShard(x, y, size, colorA, colorB, angle = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const gradient = ctx.createLinearGradient(-size * 0.5, -size, size * 0.5, size);
  gradient.addColorStop(0, "#fff9df");
  gradient.addColorStop(0.28, colorA);
  gradient.addColorStop(1, colorB);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.45, -size * 0.12);
  ctx.lineTo(size * 0.24, size * 0.76);
  ctx.lineTo(-size * 0.3, size * 0.82);
  ctx.lineTo(-size * 0.48, -size * 0.08);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.48)";
  ctx.lineWidth = Math.max(1, size * 0.08);
  ctx.beginPath();
  ctx.moveTo(-size * 0.08, -size * 0.78);
  ctx.lineTo(size * 0.08, size * 0.5);
  ctx.stroke();
  ctx.restore();
}

function drawTileTexture(x, y, size, seed, terrain) {
  ctx.save();
  for (let i = 0; i < 5; i += 1) {
    const px = x + normalizedSeed(seed, i) * size;
    const py = y + normalizedSeed(seed, i + 9) * size;
    const rx = size * (0.08 + normalizedSeed(seed, i + 18) * 0.09);
    const ry = size * (0.025 + normalizedSeed(seed, i + 27) * 0.04);
    ctx.globalAlpha = 0.08 + normalizedSeed(seed, i + 36) * 0.1;
    ctx.fillStyle = terrain.accent;
    ctx.beginPath();
    ctx.ellipse(px, py, rx, ry, normalizedSeed(seed, i + 45) * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawRockTile(x, y, size, seed, terrain) {
  drawCracks(x, y, size, seed, terrain.crack, tileSize >= 42 ? 5 : 3, 0.42);
}

function drawMagmaTile(x, y, size, seed, terrain) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 4; i += 1) {
    const lx = x + size * (0.16 + normalizedSeed(seed, i) * 0.68);
    const ly = y + size * (0.16 + normalizedSeed(seed, i + 7) * 0.68);
    const lava = ctx.createRadialGradient(lx, ly, size * 0.01, lx, ly, size * (0.16 + normalizedSeed(seed, i + 13) * 0.16));
    lava.addColorStop(0, "rgba(255, 233, 128, 0.95)");
    lava.addColorStop(0.28, "rgba(255, 105, 28, 0.66)");
    lava.addColorStop(1, "rgba(255, 72, 22, 0)");
    ctx.fillStyle = lava;
    ctx.beginPath();
    ctx.ellipse(lx, ly, size * 0.24, size * 0.11, normalizedSeed(seed, i + 19) * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
  drawCracks(x, y, size, seed, "#ffd36a", tileSize >= 42 ? 7 : 4, 0.9, true);
}

function drawCrystalTile(x, y, size, seed, terrain) {
  ctx.save();
  ctx.fillStyle = terrain.glow;
  ctx.beginPath();
  ctx.ellipse(x + size * 0.52, y + size * 0.62, size * 0.36, size * 0.22, -0.2, 0, Math.PI * 2);
  ctx.fill();

  const count = tileSize >= 44 ? 5 : 2;
  for (let i = 0; i < count; i += 1) {
    const cx = x + size * (0.26 + normalizedSeed(seed, i) * 0.48);
    const cy = y + size * (0.4 + normalizedSeed(seed, i + 10) * 0.36);
    const crystalSize = size * (0.12 + normalizedSeed(seed, i + 20) * 0.1);
    drawCrystalShard(cx, cy, crystalSize, i % 2 ? terrain.high : terrain.accent, terrain.mid, (normalizedSeed(seed, i + 30) - 0.5) * 0.7);
  }
  ctx.restore();
  drawCracks(x, y, size, seed, terrain.crack, 3, 0.3);
}

function drawCracks(x, y, size, seed, color, count, alpha, glow = false) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, size * (glow ? 0.032 : 0.022));
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = alpha;
  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = Math.max(4, size * 0.08);
  }
  for (let i = 0; i < count; i += 1) {
    const sx = x + size * normalizedSeed(seed, i + 3);
    const sy = y + size * normalizedSeed(seed, i + 12);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    for (let j = 1; j <= 3; j += 1) {
      ctx.lineTo(
        sx + size * (normalizedSeed(seed, i * 7 + j) - 0.5) * 0.5,
        sy + size * (normalizedSeed(seed, i * 9 + j + 11) - 0.5) * 0.5,
      );
    }
    ctx.stroke();
  }
  ctx.restore();
}

function roundedRectPath(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function normalizedSeed(seed, offset) {
  return ((hashNumber(seed + offset * 374761393) >>> 0) % 1000) / 1000;
}

function hashNumber(value) {
  let hash = value | 0;
  hash ^= hash << 13;
  hash ^= hash >>> 17;
  hash ^= hash << 5;
  return hash | 0;
}

function wrap(value, max) {
  return ((value % max) + max) % max;
}

function drawClaimedLand(cell, owner) {
  const x = cell.x * tileSize - viewport.scrollLeft;
  const y = cell.y * tileSize - viewport.scrollTop;
  if (x + tileSize < 0 || y + tileSize < 0 || x > viewport.clientWidth || y > viewport.clientHeight) return;

  ctx.save();
  drawClaimBase(x, y, owner);

  if (owner === "player") {
    const featureType = landFeatures.get(keyOf(cell.x, cell.y));
    if (featureType) {
      drawLandFeature(x, y, featureType);
    } else {
      drawPlayerClaim(x, y);
    }
  } else if (owner === "npc") {
    drawNpcClaim(x, y);
  } else {
    drawTargetClaim(x, y);
  }

  ctx.restore();
}

function drawLandFeature(x, y, featureType) {
  drawSpecialTerrainFeature(x, y, featureType);
}

function drawSpecialTerrainFeature(x, y, featureType) {
  const cx = x + tileSize * 0.5;
  const cy = y + tileSize * 0.5;
  const unit = tileSize;
  const palette = getTerrainFeaturePalette(featureType);
  const artImage = terrainFeatureArtImages[featureType];

  ctx.save();
  drawFeatureIslandBase(x, y, palette);
  drawFeatureFlag(x, y, palette);

  ctx.shadowColor = "rgba(0, 0, 0, 0.56)";
  ctx.shadowBlur = Math.max(5, unit * 0.12);
  ctx.shadowOffsetY = Math.max(2, unit * 0.05);
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.ellipse(cx, y + unit * 0.74, unit * 0.22, unit * 0.075, 0, 0, Math.PI * 2);
  ctx.fill();

  if (artImage?.complete && artImage.naturalWidth > 0) {
    const artSize = unit * 0.78;
    ctx.shadowColor = palette.glow;
    ctx.shadowBlur = Math.max(6, unit * 0.16);
    ctx.shadowOffsetY = 0;
    ctx.drawImage(artImage, cx - artSize * 0.5, y + unit * 0.12, artSize, artSize);
  } else {
    ctx.shadowColor = palette.glow;
    ctx.shadowBlur = Math.max(4, unit * 0.11);
    drawFallbackFeatureMark(cx, cy, unit, featureType);
  }

  ctx.restore();
}

function drawFeatureIslandBase(x, y, palette) {
  const unit = tileSize;
  const pad = unit * 0.09;
  const topY = y + unit * 0.16;
  const topH = unit * 0.66;
  const sideDepth = unit * 0.16;
  const radius = Math.max(4, unit * 0.12);
  const topGradient = ctx.createLinearGradient(x, topY, x + unit, topY + topH);
  topGradient.addColorStop(0, palette.groundA || palette.bgA);
  topGradient.addColorStop(1, palette.groundB || palette.bgB);

  ctx.fillStyle = palette.side || "rgba(54, 38, 24, 0.9)";
  ctx.beginPath();
  roundedRectPath(x + pad, topY + sideDepth * 0.42, unit - pad * 2, topH, radius);
  ctx.fill();

  ctx.fillStyle = topGradient;
  ctx.beginPath();
  roundedRectPath(x + pad, topY, unit - pad * 2, topH, radius);
  ctx.fill();

  ctx.strokeStyle = palette.edge;
  ctx.lineWidth = Math.max(1.4, unit * 0.035);
  ctx.stroke();

  ctx.fillStyle = palette.detail || "rgba(255, 255, 255, 0.16)";
  for (let i = 0; i < 3; i += 1) {
    const ox = x + unit * (0.26 + i * 0.2);
    const oy = y + unit * (0.32 + (i % 2) * 0.18);
    ctx.beginPath();
    ctx.ellipse(ox, oy, unit * 0.055, unit * 0.025, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFeatureFlag(x, y, palette) {
  const unit = tileSize;
  const poleX = x + unit * 0.22;
  const poleTop = y + unit * 0.22;
  const poleBottom = y + unit * 0.58;
  if (unit < 36) return;

  ctx.save();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#2c241b";
  ctx.lineWidth = Math.max(1.5, unit * 0.028);
  ctx.beginPath();
  ctx.moveTo(poleX, poleTop);
  ctx.lineTo(poleX, poleBottom);
  ctx.stroke();

  ctx.fillStyle = palette.flag || "#4aa3ff";
  ctx.beginPath();
  ctx.moveTo(poleX, poleTop);
  ctx.lineTo(poleX + unit * 0.2, poleTop + unit * 0.035);
  ctx.lineTo(poleX + unit * 0.2, poleTop + unit * 0.15);
  ctx.lineTo(poleX, poleTop + unit * 0.12);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#f5f8ff";
  ctx.beginPath();
  ctx.arc(poleX + unit * 0.07, poleTop + unit * 0.07, Math.max(1.5, unit * 0.025), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawFallbackFeatureMark(cx, cy, unit, featureType) {
  switch (featureType) {
    case "forestFence":
      drawBambooForestFence(cx, cy, unit);
      break;
    case "heavenTemple":
      drawCloudTemple(cx, cy, unit);
      break;
    case "landShield":
      drawLandCraftShield(cx, cy, unit);
      break;
    case "landCraftStar":
      drawFeatureStar(cx, cy, unit);
      break;
    case "portalBadge":
      drawPortalBadge(cx, cy, unit);
      break;
    case "flowerDragonEgg":
      drawFlowerDragonEgg(cx, cy, unit);
      break;
    case "esportsSummonCard":
      drawEsportsSummonCard(cx, cy, unit);
      break;
    case "goldenGate":
      drawGoldenGate(cx, cy, unit);
      break;
    case "fireSpirit":
      drawFireSpirit(cx, cy, unit);
      break;
    case "hellBlackHole":
      drawHellBlackHole(cx, cy, unit);
      break;
    case "starRain":
      drawStarRain(cx, cy, unit);
      break;
    case "waterGodStone":
      drawWaterGodStone(cx, cy, unit);
      break;
    case "crystalDragonShield":
      drawCrystalDragonShield(cx, cy, unit);
      break;
    case "pagoda":
      drawPagodaFeature(cx - unit * 0.5, cy - unit * 0.5);
      break;
    default:
      drawFeatureStar(cx, cy, unit);
  }
}

function getTerrainFeaturePalette(featureType) {
  const palettes = {
    forestFence: { bgA: "#143525", bgB: "#4d7a3d", groundA: "#8bd753", groundB: "#4f9c35", side: "#4c7a2f", detail: "rgba(20, 80, 28, 0.28)", edge: "#9cf29d", flag: "#4aa3ff", glow: "rgba(120, 255, 134, 0.42)" },
    heavenTemple: { bgA: "#d6f5ff", bgB: "#7aa7ff", groundA: "#f1e2a8", groundB: "#c8ad6f", side: "#81623a", detail: "rgba(255, 255, 255, 0.22)", edge: "#fff3b8", flag: "#4aa3ff", glow: "rgba(255, 246, 190, 0.56)" },
    landShield: { bgA: "#10233d", bgB: "#1aa4c7", groundA: "#77ca55", groundB: "#3f8533", side: "#385f2c", detail: "rgba(40, 120, 55, 0.24)", edge: "#8fe8ff", flag: "#4aa3ff", glow: "rgba(88, 207, 255, 0.48)" },
    landCraftStar: { bgA: "#211540", bgB: "#7847b6", groundA: "#9ed959", groundB: "#5d9839", side: "#47642f", detail: "rgba(255, 225, 110, 0.22)", edge: "#ffe487", flag: "#4aa3ff", glow: "rgba(255, 229, 111, 0.54)" },
    portalBadge: { bgA: "#14213d", bgB: "#5535a7", groundA: "#86d95b", groundB: "#4d9135", side: "#3d642d", detail: "rgba(120, 170, 255, 0.2)", edge: "#88d9ff", flag: "#4aa3ff", glow: "rgba(120, 170, 255, 0.52)" },
    flowerDragonEgg: { bgA: "#2b1b30", bgB: "#91567b", groundA: "#f3c1dd", groundB: "#c77fac", side: "#855377", detail: "rgba(255, 255, 255, 0.24)", edge: "#ffb5df", flag: "#4aa3ff", glow: "rgba(255, 135, 206, 0.46)" },
    esportsSummonCard: { bgA: "#141823", bgB: "#274570", groundA: "#d9c28b", groundB: "#ad8c55", side: "#715637", detail: "rgba(110, 200, 255, 0.22)", edge: "#b6e7ff", flag: "#4aa3ff", glow: "rgba(112, 194, 255, 0.48)" },
    goldenGate: { bgA: "#2d1f12", bgB: "#9d6e26", groundA: "#dcc072", groundB: "#a77c38", side: "#704f28", detail: "rgba(255, 226, 138, 0.26)", edge: "#ffd26a", flag: "#4aa3ff", glow: "rgba(255, 196, 79, 0.5)" },
    fireSpirit: { bgA: "#2e0b08", bgB: "#b53315", groundA: "#c8612c", groundB: "#7b2c1d", side: "#4c1b14", detail: "rgba(255, 191, 70, 0.26)", edge: "#ff9956", flag: "#4aa3ff", glow: "rgba(255, 83, 35, 0.58)" },
    hellBlackHole: { bgA: "#06060b", bgB: "#321246", groundA: "#5f3a8f", groundB: "#331a55", side: "#221039", detail: "rgba(210, 108, 255, 0.24)", edge: "#d06cff", flag: "#4aa3ff", glow: "rgba(180, 70, 255, 0.58)" },
    starRain: { bgA: "#081225", bgB: "#263b88", groundA: "#7562b7", groundB: "#43346f", side: "#2d254b", detail: "rgba(255, 236, 130, 0.22)", edge: "#b9cfff", flag: "#4aa3ff", glow: "rgba(140, 174, 255, 0.5)" },
    waterGodStone: { bgA: "#09263d", bgB: "#2d93b8", groundA: "#6ec7df", groundB: "#357d9b", side: "#27546c", detail: "rgba(190, 246, 255, 0.24)", edge: "#9eeaff", flag: "#4aa3ff", glow: "rgba(99, 217, 255, 0.52)" },
    crystalDragonShield: { bgA: "#102233", bgB: "#1e5e9c", groundA: "#a9515b", groundB: "#733037", side: "#451f25", detail: "rgba(139, 220, 255, 0.22)", edge: "#ff6b78", flag: "#4aa3ff", glow: "rgba(71, 186, 255, 0.58)" },
  };
  return palettes[featureType] || { bgA: "#1f2a22", bgB: "#3f5c3e", edge: "#8ce2a8", glow: "rgba(140, 226, 168, 0.42)" };
}

function drawBambooForestFence(cx, cy, unit) {
  ctx.strokeStyle = "#b98a48";
  ctx.lineWidth = Math.max(2, unit * 0.06);
  [-0.22, 0, 0.22].forEach((offset) => {
    ctx.beginPath();
    ctx.moveTo(cx + unit * offset, cy - unit * 0.24);
    ctx.lineTo(cx + unit * offset, cy + unit * 0.24);
    ctx.stroke();
  });
  ctx.strokeStyle = "#e2c06d";
  [-0.1, 0.1].forEach((offset) => {
    ctx.beginPath();
    ctx.moveTo(cx - unit * 0.3, cy + unit * offset);
    ctx.lineTo(cx + unit * 0.3, cy + unit * offset);
    ctx.stroke();
  });
}

function drawCloudTemple(cx, cy, unit) {
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  [-0.16, 0.16].forEach((offset) => {
    ctx.beginPath();
    ctx.ellipse(cx + unit * offset, cy + unit * 0.16, unit * 0.18, unit * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  drawPagodaLevel(cx, cy + unit * 0.14, unit * 0.42, unit * 0.16, "#9a422b", "#ffd37e");
  ctx.strokeStyle = "#86d27c";
  ctx.lineWidth = Math.max(1, unit * 0.025);
  ctx.beginPath();
  ctx.moveTo(cx, cy - unit * 0.17);
  ctx.lineTo(cx + unit * 0.12, cy - unit * 0.28);
  ctx.stroke();
}

function drawLandCraftShield(cx, cy, unit) {
  ctx.fillStyle = "rgba(70, 200, 255, 0.34)";
  ctx.beginPath();
  ctx.ellipse(cx, cy, unit * 0.34, unit * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#a9f1ff";
  ctx.lineWidth = Math.max(2, unit * 0.04);
  ctx.stroke();
  if (tileSize >= 46) {
    ctx.fillStyle = "#ffffff";
    ctx.font = `900 ${Math.max(7, unit * 0.1)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("LC", cx, cy + unit * 0.03);
  }
}

function drawFeatureStar(cx, cy, unit) {
  drawStarShape(cx, cy, unit * 0.28, unit * 0.12, 5, "#ffe46e");
}

function drawPortalBadge(cx, cy, unit) {
  ctx.strokeStyle = "#7de4ff";
  ctx.lineWidth = Math.max(2, unit * 0.045);
  ctx.beginPath();
  ctx.ellipse(cx, cy, unit * 0.22, unit * 0.31, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(97, 73, 255, 0.42)";
  ctx.fill();
}

function drawFlowerDragonEgg(cx, cy, unit) {
  ctx.fillStyle = "#ffe0ee";
  ctx.beginPath();
  ctx.ellipse(cx, cy + unit * 0.04, unit * 0.2, unit * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#ff79be";
  ctx.lineWidth = Math.max(1, unit * 0.025);
  ctx.stroke();
  ctx.fillStyle = "#78e099";
  ctx.beginPath();
  ctx.arc(cx + unit * 0.08, cy - unit * 0.03, unit * 0.08, 0, Math.PI * 2);
  ctx.fill();
}

function drawEsportsSummonCard(cx, cy, unit) {
  ctx.fillStyle = "#dfeaff";
  ctx.fillRect(cx - unit * 0.2, cy - unit * 0.28, unit * 0.4, unit * 0.56);
  ctx.strokeStyle = "#6fc8ff";
  ctx.lineWidth = Math.max(2, unit * 0.035);
  ctx.strokeRect(cx - unit * 0.2, cy - unit * 0.28, unit * 0.4, unit * 0.56);
  ctx.fillStyle = "#182b4d";
  ctx.font = `900 ${Math.max(7, unit * 0.1)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("LC", cx, cy + unit * 0.02);
}

function drawGoldenGate(cx, cy, unit) {
  ctx.fillStyle = "#513015";
  ctx.fillRect(cx - unit * 0.28, cy - unit * 0.18, unit * 0.56, unit * 0.42);
  ctx.fillStyle = "#d9a443";
  ctx.fillRect(cx - unit * 0.32, cy - unit * 0.25, unit * 0.64, unit * 0.1);
  ctx.fillStyle = "#ffe08a";
  [-0.22, 0.22].forEach((offset) => {
    ctx.beginPath();
    ctx.arc(cx + unit * offset, cy - unit * 0.02, unit * 0.05, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawFireSpirit(cx, cy, unit) {
  ctx.fillStyle = "#ffcf5f";
  ctx.beginPath();
  ctx.moveTo(cx, cy - unit * 0.32);
  ctx.bezierCurveTo(cx + unit * 0.26, cy - unit * 0.06, cx + unit * 0.14, cy + unit * 0.24, cx, cy + unit * 0.3);
  ctx.bezierCurveTo(cx - unit * 0.24, cy + unit * 0.1, cx - unit * 0.12, cy - unit * 0.08, cx, cy - unit * 0.32);
  ctx.fill();
}

function drawHellBlackHole(cx, cy, unit) {
  ["#54e28d", "#ff4f45", "#58a6ff", "#15111b"].forEach((color, index) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2, unit * (0.05 - index * 0.006));
    ctx.beginPath();
    ctx.ellipse(cx, cy, unit * (0.26 - index * 0.035), unit * (0.16 + index * 0.025), index * 0.6, 0, Math.PI * 2);
    ctx.stroke();
  });
}

function drawStarRain(cx, cy, unit) {
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 6; i += 1) {
    ctx.fillRect(cx - unit * 0.32 + unit * i * 0.12, cy - unit * 0.26 + unit * (i % 2) * 0.1, unit * 0.03, unit * 0.03);
  }
  ctx.strokeStyle = "#ffe87a";
  ctx.lineWidth = Math.max(1, unit * 0.025);
  [-0.15, 0.05, 0.22].forEach((offset) => {
    ctx.beginPath();
    ctx.moveTo(cx + unit * offset, cy - unit * 0.22);
    ctx.lineTo(cx + unit * (offset - 0.18), cy + unit * 0.16);
    ctx.stroke();
  });
}

function drawWaterGodStone(cx, cy, unit) {
  ctx.fillStyle = "rgba(109, 220, 255, 0.54)";
  ctx.beginPath();
  ctx.ellipse(cx, cy + unit * 0.14, unit * 0.28, unit * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#d8f6ff";
  ctx.fillRect(cx - unit * 0.025, cy - unit * 0.27, unit * 0.05, unit * 0.36);
  ctx.fillStyle = "#8bdcff";
  ctx.beginPath();
  ctx.moveTo(cx, cy - unit * 0.37);
  ctx.lineTo(cx - unit * 0.09, cy - unit * 0.24);
  ctx.lineTo(cx + unit * 0.09, cy - unit * 0.24);
  ctx.closePath();
  ctx.fill();
}

function drawCrystalDragonShield(cx, cy, unit) {
  ctx.fillStyle = "#6a8199";
  ctx.beginPath();
  ctx.moveTo(cx, cy - unit * 0.31);
  ctx.lineTo(cx + unit * 0.25, cy - unit * 0.15);
  ctx.lineTo(cx + unit * 0.18, cy + unit * 0.25);
  ctx.lineTo(cx, cy + unit * 0.34);
  ctx.lineTo(cx - unit * 0.18, cy + unit * 0.25);
  ctx.lineTo(cx - unit * 0.25, cy - unit * 0.15);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#36c6ff";
  drawDiamond(cx, cy, unit * 0.09, unit * 0.16);
}

function drawStarShape(cx, cy, outerRadius, innerRadius, points, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = -Math.PI / 2 + (i * Math.PI) / points;
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

function drawDiamond(cx, cy, width, height) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - height);
  ctx.lineTo(cx + width, cy);
  ctx.lineTo(cx, cy + height);
  ctx.lineTo(cx - width, cy);
  ctx.closePath();
  ctx.fill();
}

function drawPagodaFeature(x, y) {
  const cx = x + tileSize * 0.5;
  const baseY = y + tileSize * 0.82;
  const unit = tileSize;

  ctx.save();
  ctx.shadowColor = "rgba(255, 188, 82, 0.48)";
  ctx.shadowBlur = Math.max(6, unit * 0.12);

  ctx.fillStyle = "rgba(24, 10, 6, 0.62)";
  ctx.beginPath();
  ctx.ellipse(cx, baseY, unit * 0.28, unit * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();

  drawPagodaLevel(cx, baseY - unit * 0.02, unit * 0.38, unit * 0.16, "#7d2f1f", "#d6a25a");
  drawPagodaLevel(cx, baseY - unit * 0.19, unit * 0.31, unit * 0.14, "#8f3a24", "#f0bd72");
  drawPagodaLevel(cx, baseY - unit * 0.34, unit * 0.24, unit * 0.12, "#a64528", "#ffd28a");

  ctx.fillStyle = "#f7d78b";
  ctx.beginPath();
  ctx.moveTo(cx - unit * 0.08, baseY - unit * 0.48);
  ctx.lineTo(cx, baseY - unit * 0.62);
  ctx.lineTo(cx + unit * 0.08, baseY - unit * 0.48);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 226, 154, 0.78)";
  ctx.lineWidth = Math.max(1, unit * 0.018);
  ctx.beginPath();
  ctx.moveTo(cx, baseY - unit * 0.62);
  ctx.lineTo(cx, baseY - unit * 0.72);
  ctx.stroke();

  ctx.fillStyle = "#fff1b8";
  ctx.beginPath();
  ctx.arc(cx, baseY - unit * 0.73, Math.max(2, unit * 0.035), 0, Math.PI * 2);
  ctx.fill();

  if (tileSize >= 30) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#1a0f0b";
    ctx.fillRect(cx - unit * 0.035, baseY - unit * 0.12, unit * 0.07, unit * 0.1);
  }

  ctx.restore();
}

function drawPagodaLevel(cx, bottomY, width, height, wallColor, roofColor) {
  const roofHeight = height * 0.45;
  const wallHeight = height * 0.82;

  ctx.fillStyle = wallColor;
  ctx.fillRect(cx - width * 0.31, bottomY - wallHeight, width * 0.62, wallHeight);

  ctx.fillStyle = roofColor;
  ctx.beginPath();
  ctx.moveTo(cx - width * 0.62, bottomY - wallHeight);
  ctx.lineTo(cx, bottomY - wallHeight - roofHeight);
  ctx.lineTo(cx + width * 0.62, bottomY - wallHeight);
  ctx.lineTo(cx + width * 0.46, bottomY - wallHeight + roofHeight * 0.24);
  ctx.lineTo(cx - width * 0.46, bottomY - wallHeight + roofHeight * 0.24);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(60, 22, 12, 0.78)";
  ctx.lineWidth = Math.max(1, tileSize * 0.012);
  ctx.stroke();
}

function drawClaimBase(x, y, owner) {
  const colors = {
    player: { edge: "#54e28d", fill: "rgba(84, 226, 141, 0.18)", glow: "rgba(84, 226, 141, 0.28)" },
    npc: { edge: "#6fb6ff", fill: "rgba(111, 182, 255, 0.16)", glow: "rgba(111, 182, 255, 0.24)" },
    target: { edge: "#ffc44f", fill: "rgba(255, 196, 79, 0.16)", glow: "rgba(255, 196, 79, 0.3)" },
  }[owner];
  const pad = Math.max(2, tileSize * 0.07);

  ctx.fillStyle = colors.glow;
  ctx.fillRect(x + pad, y + pad, tileSize - pad * 2, tileSize - pad * 2);
  ctx.strokeStyle = colors.edge;
  ctx.lineWidth = Math.max(2, tileSize * 0.055);
  ctx.strokeRect(x + pad, y + pad, tileSize - pad * 2, tileSize - pad * 2);

  ctx.fillStyle = colors.fill;
  ctx.beginPath();
  ctx.moveTo(x + tileSize * 0.18, y + tileSize * 0.72);
  ctx.lineTo(x + tileSize * 0.5, y + tileSize * 0.54);
  ctx.lineTo(x + tileSize * 0.82, y + tileSize * 0.72);
  ctx.lineTo(x + tileSize * 0.5, y + tileSize * 0.9);
  ctx.closePath();
  ctx.fill();
}

function drawPlayerClaim(x, y) {
  const cx = x + tileSize * 0.5;
  const baseY = y + tileSize * 0.74;
  const poleTop = y + tileSize * 0.24;

  ctx.fillStyle = "#2a1b12";
  ctx.beginPath();
  ctx.ellipse(cx, baseY, tileSize * 0.26, tileSize * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#73502a";
  ctx.fillRect(cx - tileSize * 0.035, poleTop, tileSize * 0.07, baseY - poleTop);

  ctx.fillStyle = "#54e28d";
  ctx.beginPath();
  ctx.moveTo(cx + tileSize * 0.02, poleTop);
  ctx.lineTo(cx + tileSize * 0.36, poleTop + tileSize * 0.1);
  ctx.lineTo(cx + tileSize * 0.02, poleTop + tileSize * 0.24);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffe58a";
  drawCrystal(cx - tileSize * 0.16, baseY - tileSize * 0.08, Math.max(3, tileSize * 0.1));
  drawCrystal(cx + tileSize * 0.16, baseY - tileSize * 0.06, Math.max(3, tileSize * 0.08));

  if (tileSize >= 18) {
    ctx.fillStyle = "#fff7df";
    ctx.font = `900 ${Math.max(9, tileSize * 0.18)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("我", cx, y + tileSize * 0.45);
  }
}

function drawNpcClaim(x, y) {
  const cx = x + tileSize * 0.5;
  const baseY = y + tileSize * 0.76;
  const towerW = tileSize * 0.34;
  const towerH = tileSize * 0.42;

  ctx.fillStyle = "#1d2f4c";
  ctx.beginPath();
  ctx.ellipse(cx, baseY, tileSize * 0.28, tileSize * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#3e79b8";
  ctx.fillRect(cx - towerW / 2, baseY - towerH, towerW, towerH);

  ctx.fillStyle = "#6fb6ff";
  ctx.beginPath();
  ctx.moveTo(cx - towerW * 0.7, baseY - towerH);
  ctx.lineTo(cx, baseY - towerH - tileSize * 0.18);
  ctx.lineTo(cx + towerW * 0.7, baseY - towerH);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#dff6ff";
  ctx.fillRect(cx - towerW * 0.18, baseY - towerH * 0.68, towerW * 0.36, towerH * 0.22);
  ctx.fillStyle = "#163557";
  ctx.fillRect(cx - towerW * 0.12, baseY - towerH * 0.24, towerW * 0.24, towerH * 0.24);

  if (tileSize >= 20) {
    ctx.fillStyle = "#fff7df";
    ctx.font = `800 ${Math.max(8, tileSize * 0.15)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("NPC", cx, y + tileSize * 0.92);
  }
}

function drawTargetClaim(x, y) {
  const cx = x + tileSize * 0.5;
  const cy = y + tileSize * 0.5;
  const r = tileSize * 0.24;

  ctx.strokeStyle = "#ffc44f";
  ctx.lineWidth = Math.max(2, tileSize * 0.06);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#fff0a6";
  ctx.beginPath();
  ctx.moveTo(cx - r, cy + r);
  ctx.lineTo(cx + r, cy - r);
  ctx.moveTo(cx - r, cy - r);
  ctx.lineTo(cx + r, cy + r);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 196, 79, 0.22)";
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
  ctx.fill();
}

function getNeighbors(x, y) {
  return [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ].filter((cell) => cell.x >= 0 && cell.y >= 0 && cell.x < GRID_SIZE && cell.y < GRID_SIZE);
}

function isAdjacentToPlayer(cell) {
  return getNeighbors(cell.x, cell.y).some((neighbor) => playerLands.has(keyOf(neighbor.x, neighbor.y)));
}

function handleMapClick(event) {
  if (!currentAccount) return;

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((viewport.scrollLeft + event.clientX - rect.left) / tileSize);
  const y = Math.floor((viewport.scrollTop + event.clientY - rect.top) / tileSize);
  const key = keyOf(x, y);

  if (placementMode) {
    placeTerrainCardOnLand(key, { x, y });
    return;
  }

  if (playerLands.has(key)) {
    const featureType = landFeatures.get(key);
    if (featureType) {
      const feature = terrainFeatureInfo[featureType];
      statusText.textContent = `這是你的土地，上面已建造${feature?.name || "特殊建築"}。`;
    } else {
      statusText.textContent = "這是你的土地。請選擇旁邊尚未佔領的土地。";
    }
    return;
  }

  if (!isAdjacentToPlayer({ x, y })) {
    statusText.textContent = "只能挑戰與你領地相鄰的土地。";
    return;
  }

  selectedTarget = { x, y, isNpc: npcLands.has(key), terrain: getTerrain(x, y) };
  const terrainName = getTerrainName(selectedTarget.terrain);
  targetInfo.textContent = selectedTarget.isNpc
    ? `這是 NPC 的${terrainName}土地。打敗魔王後可以佔領，活動期間每攻下五塊 NPC 土地會獲得進階地形。`
    : `這是一般${terrainName}土地。確認後會進入${terrainName}戰場，打敗魔王就能佔領。`;
  confirmDialog.showModal();
  scheduleDraw();
}

function placeTerrainCardOnLand(key, cell) {
  if (!placementMode) return;

  if (!playerLands.has(key)) {
    statusText.textContent = `${placementMode.cardName}只能放在自己的土地上，請重新選擇。`;
    return;
  }

  if (landFeatures.has(key)) {
    const currentFeature = terrainFeatureInfo[landFeatures.get(key)];
    statusText.textContent = `這塊土地已經有${currentFeature?.name || "特殊建築"}，請選擇另一塊土地。`;
    return;
  }

  if (!removeInventoryItem(placementMode.cardName)) {
    statusText.textContent = `背包裡已經沒有${placementMode.cardName}。`;
    placementMode = null;
    return;
  }

  const featureType = placementMode.featureType;
  const feature = terrainFeatureInfo[featureType];
  landFeatures.set(key, featureType);
  placementMode = null;
  selectedTarget = null;
  statusText.textContent = `已在 (${cell.x}, ${cell.y}) 建造${feature?.name || "特殊建築"}。`;
  saveCurrentGame();
  updateHud();
  scheduleDraw();
}

function startBattle() {
  if (!selectedTarget) return;
  battle = {
    target: selectedTarget,
    playerHp: getPlayerMaxHp(),
    playerAttackRange: getPlayerAttackRange(),
    turn: 0,
    attacksSinceBoss: 0,
    bosses: createBosses(),
    itemSlots: [],
    effects: {},
    attackTimer: null,
    isAutoRunning: false,
    isPaused: false,
  };
  battleLog.replaceChildren();
  applyBattleTerrain(selectedTarget.terrain);
  addBattleLog(`你進入${getTerrainName(selectedTarget.terrain)}戰場。`);
  confirmDialog.close();
  battleDialog.showModal();
  renderBattle();
}

function getTerrainName(terrain) {
  return terrainLabels[terrain] || "未知地形";
}

function applyBattleTerrain(terrain) {
  const terrainName = getTerrainName(terrain);
  battleDialog.dataset.terrain = terrain;
  battleTitle.textContent = `${terrainName}戰場`;
  battleSubtitle.textContent = `這片土地屬於${terrainName}地形，打敗所有魔王就能佔領。`;
}

function applyChestBeastBattleTerrain() {
  battleDialog.dataset.terrain = "chestBeast";
  battleTitle.textContent = "Daemon 魔狼戰役";
  battleSubtitle.textContent = "寶箱守護者擁有高血量與強力撕咬，擊敗牠才能取得本月寶箱。";
}

function getPlayerMaxHp() {
  const level = getPlayerLevel();
  const base = 180 + (level - 1) * 42;
  const landBonus = Math.min(900, Math.max(0, playerLands.size - 1) * 18);
  return base + landBonus + getLevelMilestoneBonus("hp");
}

function getPlayerAttackRange() {
  const level = getPlayerLevel();
  const milestoneAttack = getLevelMilestoneBonus("attack");
  const landBonus = Math.min(70, Math.floor(playerLands.size / 12) * 3);
  const min = 24 + (level - 1) * 5 + milestoneAttack + landBonus;
  const max = 42 + (level - 1) * 8 + milestoneAttack + landBonus;
  return { min, max };
}

function createBosses() {
  const level = getPlayerLevel();
  const bosses = [];
  bosses.push(createBoss("green"));

  ["blue", "red", "rainbow"].forEach((type) => {
    const config = bossBattleConfig[type];
    if (level >= config.unlockLevel && Math.random() < config.encounterChance) {
      bosses.push(createBoss(type));
    }
  });

  return bosses;
}

function createBoss(type) {
  const config = bossBattleConfig[type];
  const level = getPlayerLevel();
  const levelOffset = Math.max(0, level - config.unlockLevel);
  const hpMin = Math.round(config.hp.baseMin + levelOffset * config.hp.perLevelMin);
  const hpMax = Math.round(config.hp.baseMax + levelOffset * config.hp.perLevelMax);
  const attackMin = Math.round(config.attack.baseMin + levelOffset * config.attack.perLevelMin);
  const attackMax = Math.round(config.attack.baseMax + levelOffset * config.attack.perLevelMax);
  const hp = randomInt(hpMin, hpMax);

  bossIdSequence += 1;
  return {
    id: `boss-${bossIdSequence}`,
    type,
    hp,
    maxHp: hp,
    attackRange: { min: attackMin, max: attackMax },
    exp: config.exp + Math.max(0, level - config.unlockLevel) * 8,
    chestDropChance: config.chestDropChance,
  };
}

function renderBattle() {
  if (!battle) return;
  const playerMaxHp = battle.playerMaxHp || getPlayerMaxHp();
  const playerHp = Math.max(0, battle.playerHp);
  if (battle.mode === "chestBeast" && chestBeastBattle && battle.bosses[0]) {
    chestBeastBattle.hp = Math.max(0, battle.bosses[0].hp);
    chestBeastBattle.maxHp = battle.bosses[0].maxHp;
  }
  battlePlayerHp.textContent = `${playerHp.toLocaleString()} / ${playerMaxHp.toLocaleString()}`;
  heroFieldHp.textContent = `${playerHp.toLocaleString()} / ${playerMaxHp.toLocaleString()}`;
  heroFieldHpBar.style.setProperty("--hp-ratio", getHpRatio(playerHp, playerMaxHp));
  heroAvatar.classList.toggle("hero-defeated", battle.playerHp <= 0);
  battlePlayerAttack.textContent = `${battle.playerAttackRange.min}～${battle.playerAttackRange.max}`;
  battleTurn.textContent = battle.turn;
  attackButton.disabled = battle.isAutoRunning || battle.playerHp <= 0 || battle.bosses.every((boss) => boss.hp <= 0);
  attackButton.textContent = battle.mode === "chestBeast" && battle.isPaused ? "繼續攻擊" : battle.isAutoRunning ? "自動攻擊中" : "開始攻擊";
  renderBattleItemPanel();

  bossFieldHud.replaceChildren(
    ...battle.bosses.map((boss) => {
      const info = bossColors[boss.type];
      const item = document.createElement("article");
      item.className = `boss-hp-chip${boss.hp <= 0 ? " defeated" : ""}`;
      item.innerHTML = `
        <div>
          <strong>${info.name}</strong>
          <span>${Math.max(0, boss.hp).toLocaleString()} / ${boss.maxHp.toLocaleString()}</span>
        </div>
        <div class="field-hp-bar"><span style="--hp-ratio: ${getHpRatio(boss.hp, boss.maxHp)}"></span></div>
      `;
      return item;
    }),
  );

  bossList.replaceChildren(
    ...battle.bosses.map((boss) => {
      const info = bossColors[boss.type];
      const card = document.createElement("article");
      card.className = `boss-card${boss.hp <= 0 ? " defeated" : ""}`;
      card.dataset.bossId = boss.id;
      card.style.setProperty("--boss-color", info.color);
      card.style.setProperty("--boss-glow", info.glow);
      card.innerHTML = `
        <div class="boss-avatar ${boss.type}" aria-hidden="true">
          <span class="boss-horn left"></span>
          <span class="boss-horn right"></span>
          <span class="boss-head">
            <span class="boss-eye left"></span>
            <span class="boss-eye right"></span>
            <span class="boss-mouth"></span>
          </span>
          <span class="boss-body"></span>
          <span class="boss-claw left"></span>
          <span class="boss-claw right"></span>
        </div>
      `;
      return card;
    }),
  );
}

function createEmptyBattleEffects() {
  return {
    bossStunTurns: 0,
    attackBoostTurns: 0,
    guardTurns: 0,
    reflectTurns: 0,
    blockTurns: 0,
  };
}

function renderBattleItemPanel() {
  const isChestBeastBattle = battle?.mode === "chestBeast";
  battleItemPanel.classList.toggle("hidden", !isChestBeastBattle);
  if (!isChestBeastBattle) return;

  const slots = battle.itemSlots || Array(BATTLE_ITEM_SLOT_COUNT).fill(null);
  battleItemSlots.replaceChildren(
    ...slots.map((itemName, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `battle-item-slot${itemName ? "" : " empty"}`;
      button.dataset.slotIndex = String(index);
      button.disabled = !itemName || battle.isAutoRunning || battle.playerHp <= 0;

      if (!itemName) {
        button.innerHTML = `<span>空格</span><small>${index + 1}</small>`;
        return button;
      }

      const info = getInventoryItemInfo(itemName);
      const count = itemInventory.get(itemName) || 0;
      button.innerHTML = `
        <span class="inventory-icon ${info.icon}" aria-hidden="true"></span>
        <strong>${escapeHtml(itemName)}</strong>
        <small>${count > 0 ? `剩餘 ${count}` : "背包已無此道具"}</small>
      `;
      return button;
    }),
  );

  const usableItems = getBattleUsableInventoryEntries();
  const selectedValue = battleItemSelect.value;
  battleItemSelect.replaceChildren(
    ...usableItems.map(([name, count]) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = `${name}（${count}）`;
      return option;
    }),
  );
  if (usableItems.some(([name]) => name === selectedValue)) battleItemSelect.value = selectedValue;
  assignBattleItemButton.disabled = battle.isAutoRunning || usableItems.length === 0 || !slots.some((item) => !item);
  pauseBattleButton.disabled = battle.playerHp <= 0 || battle.bosses.every((boss) => boss.hp <= 0);
  pauseBattleButton.textContent = battle.isAutoRunning ? "暫停攻擊" : battle.isPaused ? "已暫停" : "暫停攻擊";
}

function getBattleUsableInventoryEntries() {
  const reservedCounts = (battle?.itemSlots || []).reduce((counts, itemName) => {
    if (!itemName) return counts;
    counts.set(itemName, (counts.get(itemName) || 0) + 1);
    return counts;
  }, new Map());

  return getInventoryEntries()
    .map(([name, count]) => [name, count - (reservedCounts.get(name) || 0)])
    .filter(([name, availableCount]) => getBattleItemEffect(name) && availableCount > 0);
}

function assignBattleItemToSlot() {
  if (!battle || battle.mode !== "chestBeast" || battle.isAutoRunning) return;
  const itemName = battleItemSelect.value;
  if (!itemName || !getBattleItemEffect(itemName)) {
    setBattleItemMessage("請先選擇可在戰鬥使用的道具。");
    return;
  }
  const assignedCount = battle.itemSlots.filter((item) => item === itemName).length;
  const availableCount = (itemInventory.get(itemName) || 0) - assignedCount;
  if (availableCount <= 0) {
    setBattleItemMessage(`${itemName} 已經全部放入道具格，不能再選。`);
    renderBattle();
    return;
  }

  const emptyIndex = battle.itemSlots.findIndex((item) => !item);
  if (emptyIndex < 0) {
    setBattleItemMessage("三個道具格都已放滿。");
    return;
  }

  battle.itemSlots[emptyIndex] = itemName;
  setBattleItemMessage(`已把 ${itemName} 放入第 ${emptyIndex + 1} 格。使用時才會消耗背包數量。`);
  renderBattle();
}

function pauseChestBeastBattle() {
  if (!battle || battle.mode !== "chestBeast" || battle.playerHp <= 0) return;
  if (!battle.isAutoRunning) {
    setBattleItemMessage("目前已暫停，使用道具後可按「繼續攻擊」。");
    battle.isPaused = true;
    renderBattle();
    return;
  }

  clearInterval(battle.attackTimer);
  battle.attackTimer = null;
  battle.isAutoRunning = false;
  battle.isPaused = true;
  attackButton.disabled = false;
  setBattleItemMessage("已暫停自動攻擊，現在可以使用道具。");
  addBattleLog(`${getPlayerNickname()}暫停攻擊，準備使用道具。`);
  renderBattle();
}

function useBattleItemSlot(index) {
  if (!battle || battle.mode !== "chestBeast") return;
  if (battle.isAutoRunning) {
    setBattleItemMessage("請先按「暫停攻擊」再使用道具。");
    return;
  }

  const itemName = battle.itemSlots[index];
  if (!itemName) return;
  if (!removeInventoryItem(itemName)) {
    battle.itemSlots[index] = null;
    setBattleItemMessage(`${itemName} 已不在背包中，已清空此格。`);
    renderBattle();
    return;
  }

  const message = applyBattleItemEffect(itemName);
  battle.itemSlots[index] = null;
  setBattleItemMessage(message);
  addBattleLog(message, "player-critical");
  updateHud();
  renderBattle();
}

function getBattleItemEffect(itemName) {
  const effects = {
    紅色藥水: { type: "heal", value: 200 },
    橘色藥水: { type: "heal", value: 500 },
    白色藥水: { type: "heal", value: 800 },
    天使的祝福: { type: "fullHeal" },
    白金之星: { type: "bossStun", turns: 5 },
    地獄烈火: { type: "attackBoost", turns: 3 },
    堅固防盾: { type: "guard", turns: 3 },
    反射之戟: { type: "reflect", turns: 3 },
    格擋之盾: { type: "block", turns: 3 },
  };
  return effects[itemName] || null;
}

function applyBattleItemEffect(itemName) {
  const effect = getBattleItemEffect(itemName);
  const maxHp = battle.playerMaxHp || getPlayerMaxHp();

  if (!effect) return `${itemName} 目前不能在魔狼戰役中使用。`;
  if (effect.type === "heal") {
    playSfx("heal");
    const before = battle.playerHp;
    battle.playerHp = Math.min(maxHp, battle.playerHp + effect.value);
    return `${getPlayerNickname()}使用 ${itemName}，恢復 ${(battle.playerHp - before).toLocaleString()} 點血量。`;
  }
  if (effect.type === "fullHeal") {
    playSfx("heal");
    battle.playerHp = maxHp;
    return `${getPlayerNickname()}使用 ${itemName}，血量恢復全滿。`;
  }
  if (effect.type === "bossStun") {
    playSfx("critical");
    battle.effects.bossStunTurns += effect.turns;
    return `${getPlayerNickname()}使用 ${itemName}，Daemon 魔狼接下來 ${effect.turns} 次反擊無法攻擊。`;
  }
  if (effect.type === "attackBoost") {
    playSfx("critical");
    battle.effects.attackBoostTurns += effect.turns;
    return `${getPlayerNickname()}使用 ${itemName}，接下來 ${effect.turns} 次攻擊力加倍。`;
  }
  if (effect.type === "guard") {
    playSfx("dodge");
    battle.effects.guardTurns += effect.turns;
    return `${getPlayerNickname()}使用 ${itemName}，接下來 ${effect.turns} 次魔狼傷害無效。`;
  }
  if (effect.type === "reflect") {
    playSfx("critical");
    battle.effects.reflectTurns += effect.turns;
    return `${getPlayerNickname()}使用 ${itemName}，接下來 ${effect.turns} 次反射魔狼攻擊。`;
  }
  if (effect.type === "block") {
    playSfx("dodge");
    battle.effects.blockTurns += effect.turns;
    return `${getPlayerNickname()}使用 ${itemName}，接下來 ${effect.turns} 次魔狼傷害減半。`;
  }

  return `${itemName} 已使用。`;
}

function setBattleItemMessage(text) {
  battleItemMessage.textContent = text;
}

function getHpRatio(current, max) {
  if (max <= 0) return 0;
  return clamp(Math.max(0, current) / max, 0, 1).toFixed(4);
}

function startAutoAttack() {
  if (!battle) return;
  if (battle.isAutoRunning || battle.playerHp <= 0 || battle.bosses.every((boss) => boss.hp <= 0)) return;

  startBackgroundMusic();
  const wasPaused = battle.isPaused;
  battle.isAutoRunning = true;
  battle.isPaused = false;
  attackButton.disabled = true;
  attackButton.textContent = "自動攻擊中";
  addBattleLog(`${getPlayerNickname()}${wasPaused ? "繼續" : "開始"}連續攻擊。`);
  runAutoAttackStep();
  battle.attackTimer = setInterval(runAutoAttackStep, AUTO_ATTACK_INTERVAL);
}

function runAutoAttackStep() {
  if (!battle || battle.playerHp <= 0) {
    stopAutoAttack();
    return;
  }

  const boss = battle.bosses.find((item) => item.hp > 0);
  if (!boss) {
    stopAutoAttack();
    return;
  }

  battle.turn += 1;
  battle.attacksSinceBoss += 1;
  const bossDodged = Math.random() < DODGE_RATE;
  const isPlayerCritical = !bossDodged && Math.random() < PLAYER_CRITICAL_RATE;
  const boosted = battle.effects?.attackBoostTurns > 0;
  const baseDamage = isPlayerCritical ? Math.ceil(boss.maxHp * 0.2) : randomInt(battle.playerAttackRange.min, battle.playerAttackRange.max);
  const damage = bossDodged ? 0 : boosted ? baseDamage * 2 : baseDamage;
  if (!bossDodged && boosted) battle.effects.attackBoostTurns -= 1;
  if (!bossDodged) boss.hp = Math.max(0, boss.hp - damage);
  if (bossDodged) {
    addBattleLog(`${bossColors[boss.type].name} 閃躲成功，避開了 ${getPlayerNickname()} 的攻擊。`, "dodge");
  } else {
    addBattleLog(
      isPlayerCritical ? `${getPlayerNickname()}打出致命一擊！削掉 ${damage} 點魔王血量。` : `${getPlayerNickname()}揮出水晶鎬，造成 ${damage} 點傷害。`,
      isPlayerCritical ? "player-critical" : "",
    );
    if (boosted) addBattleLog(`地獄烈火發動，本次傷害加倍。剩餘 ${battle.effects.attackBoostTurns} 次。`, "player-critical");
  }

  if (battle.bosses.every((item) => item.hp <= 0)) {
    stopAutoAttack();
    renderBattle();
    animateHeroAttack(boss.type, isPlayerCritical, boss.id, bossDodged, damage);
    setTimeout(() => {
      if (battle) winBattle();
    }, 820);
    return;
  }

  if (battle.attacksSinceBoss >= 2) {
    battle.attacksSinceBoss = 0;
    const bossAttack = bossCounterAttack();

    if (battle.playerHp <= 0) {
      stopAutoAttack();
      if (battle.mode === "chestBeast") {
        addBattleLog("你被 Daemon 魔狼擊倒，這次沒能奪下寶箱。", "critical");
        statusText.textContent = "Daemon 魔狼戰役失敗。";
      } else {
        addBattleLog("你戰敗了，這塊土地還不能佔領。");
        statusText.textContent = "戰敗了。可以再選相鄰土地重新挑戰。";
      }
    }

    renderBattle();
    animateHeroAttack(boss.type, isPlayerCritical, boss.id, bossDodged, damage);
    if (bossAttack) setTimeout(() => animateBossAttack(bossAttack.attacker, bossAttack.isCritical, bossAttack.dodged, bossAttack.damage), 220);
    if (battle.playerHp <= 0) {
      setTimeout(() => {
        if (battle?.playerHp <= 0) loseBattle();
      }, 920);
    }
    return;
  }

  renderBattle();
  animateHeroAttack(boss.type, isPlayerCritical, boss.id, bossDodged, damage);
}

function stopAutoAttack() {
  if (!battle) return;
  clearInterval(battle.attackTimer);
  battle.attackTimer = null;
  battle.isAutoRunning = false;
  renderBattle();
}

function animateHeroAttack(bossType, isCritical = false, targetBossId = "", targetDodged = false, damage = 0) {
  const bossCard = targetBossId ? bossList.querySelector(`[data-boss-id="${targetBossId}"]`) : null;
  playSfx(targetDodged ? "dodge" : isCritical ? "critical" : "playerAttack");
  heroAvatar.classList.remove("hero-attacking");
  bossCard?.classList.remove("boss-hit", "boss-player-critical-hit", "boss-dodge");
  attackSlash.className = `attack-slash ${bossType}${isCritical ? " player-critical" : ""}`;
  if (isCritical) {
    bossAttackEffect.className = "boss-attack-effect active player-critical";
    bossAttackEffect.querySelector("strong").textContent = `${getPlayerNickname()}致命一擊`;
  } else if (targetDodged) {
    bossAttackEffect.className = "boss-attack-effect active dodge";
    bossAttackEffect.querySelector("strong").textContent = "魔王閃躲";
  }
  void heroAvatar.offsetWidth;
  heroAvatar.classList.add("hero-attacking");
  attackSlash.classList.add("active");
  bossCard?.classList.add(targetDodged ? "boss-dodge" : isCritical ? "boss-player-critical-hit" : "boss-hit");
  if (targetDodged) {
    showFloatingText("閃躲", "boss", "dodge", bossCard);
  } else {
    showFloatingText(`-${damage}`, "boss", isCritical ? "player-critical" : "damage", bossCard);
  }
  setTimeout(() => {
    heroAvatar.classList.remove("hero-attacking");
    attackSlash.classList.remove("active");
    bossCard?.classList.remove("boss-hit", "boss-player-critical-hit", "boss-dodge");
    if (isCritical || targetDodged) bossAttackEffect.className = "boss-attack-effect";
  }, isCritical ? 620 : targetDodged ? 460 : 360);
}

function bossCounterAttack() {
  const aliveBosses = battle.bosses.filter((boss) => boss.hp > 0);
  if (aliveBosses.length === 0) return null;

  const attacker = aliveBosses[randomInt(0, aliveBosses.length - 1)];
  if (battle.effects?.bossStunTurns > 0) {
    battle.effects.bossStunTurns -= 1;
    addBattleLog(`${bossColors[attacker.type].name} 被白金之星壓制，無法發動反擊。剩餘 ${battle.effects.bossStunTurns} 次。`, "dodge");
    return { attacker, isCritical: false, dodged: true, damage: 0 };
  }

  const playerDodged = Math.random() < DODGE_RATE;
  if (playerDodged) {
    addBattleLog(`${getPlayerNickname()}閃躲成功，避開了 ${bossColors[attacker.type].name} 的攻擊。`, "dodge");
    return { attacker, isCritical: false, dodged: true, damage: 0 };
  }

  const isCritical = Math.random() < BOSS_CRITICAL_RATE;
  let damage = isCritical ? Math.ceil(attacker.attackRange.max * 1.65) : randomInt(attacker.attackRange.min, attacker.attackRange.max);
  if (battle.effects?.guardTurns > 0) {
    battle.effects.guardTurns -= 1;
    damage = 0;
    addBattleLog(`堅固防盾擋下 ${bossColors[attacker.type].name} 的攻擊。剩餘 ${battle.effects.guardTurns} 次。`, "dodge");
  } else if (battle.effects?.blockTurns > 0) {
    battle.effects.blockTurns -= 1;
    damage = Math.ceil(damage / 2);
    addBattleLog(`格擋之盾讓本次傷害減半。剩餘 ${battle.effects.blockTurns} 次。`, "dodge");
  }

  if (battle.effects?.reflectTurns > 0) {
    battle.effects.reflectTurns -= 1;
    attacker.hp = Math.max(0, attacker.hp - damage);
    addBattleLog(`反射之戟把 ${damage.toLocaleString()} 點傷害反射給 ${bossColors[attacker.type].name}。剩餘 ${battle.effects.reflectTurns} 次。`, "player-critical");
    return { attacker, isCritical, dodged: false, damage: 0 };
  }

  battle.playerHp = Math.max(0, battle.playerHp - damage);
  addBattleLog(
    isCritical
      ? `致命一擊！${bossColors[attacker.type].name} 重擊 ${getPlayerNickname()}，消耗 ${damage} 點血量。`
      : `${bossColors[attacker.type].name} 攻擊你，造成 ${damage} 點傷害。`,
    isCritical ? "critical" : "boss",
  );
  return { attacker, isCritical, dodged: false, damage };
}

function animateBossAttack(attacker, isCritical, playerDodged = false, damage = 0) {
  const bossCard = bossList.querySelector(`[data-boss-id="${attacker.id}"]`);
  playSfx(playerDodged ? "dodge" : isCritical ? "critical" : "bossAttack");
  const effectClass = playerDodged ? "active dodge" : isCritical ? "active critical" : "active";
  bossCard?.classList.remove("boss-attacking", "boss-critical");
  heroAvatar.classList.remove("hero-hit", "hero-critical-hit", "hero-dodge");
  bossAttackEffect.className = `boss-attack-effect ${effectClass}`;
  bossAttackEffect.querySelector("strong").textContent = playerDodged ? `${getPlayerNickname()}閃躲` : isCritical ? "致命一擊" : "魔王反擊";
  void bossAttackEffect.offsetWidth;
  bossCard?.classList.add("boss-attacking", isCritical ? "boss-critical" : "boss-attacking-normal");
  heroAvatar.classList.add(playerDodged ? "hero-dodge" : isCritical ? "hero-critical-hit" : "hero-hit");
  showFloatingText(playerDodged ? "閃躲" : `-${damage}`, "hero", playerDodged ? "dodge" : isCritical ? "critical" : "damage");
  setTimeout(() => {
    bossCard?.classList.remove("boss-attacking", "boss-critical", "boss-attacking-normal");
    heroAvatar.classList.remove("hero-hit", "hero-critical-hit", "hero-dodge");
    bossAttackEffect.className = "boss-attack-effect";
  }, isCritical ? 620 : playerDodged ? 460 : 440);
}

function showFloatingText(text, target, type = "damage", targetElement = null) {
  const item = document.createElement("span");
  item.className = `damage-float ${target} ${type}`;
  item.textContent = text;

  if (targetElement) {
    const fieldRect = damageFloatLayer.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    item.style.left = `${targetRect.left + targetRect.width * 0.5 - fieldRect.left}px`;
    item.style.top = `${targetRect.top + targetRect.height * 0.28 - fieldRect.top}px`;
  }

  damageFloatLayer.append(item);
  setTimeout(() => item.remove(), 900);
}

function winBattle() {
  if (battle?.mode === "chestBeast") {
    finishChestBeastCampaign();
    return;
  }

  playSfx("victory");
  const key = keyOf(battle.target.x, battle.target.y);
  const defeatedBosses = battle.bosses.map((boss) => ({ ...boss }));
  playerLands.add(key);
  npcLands.delete(key);
  money += getReward(battle.target);
  const expResult = grantBattleExp(battle.target, defeatedBosses);
  const chestDrops = grantBossChestDrops(defeatedBosses);

  if (isEventActive() && battle.target.isNpc) {
    npcAttackWins += 1;
    if (npcAttackWins % 5 === 0) {
      advancedLands.add(key);
      addBattleLog("年度活動獎勵：獲得一個進階地形。");
    }
  }

  if (npcLands.size === 0) {
    npcLands = createLandCluster(randomInt(NPC_RESPAWN_MIN, NPC_RESPAWN_MAX), battle.target);
    addBattleLog("NPC 土地被佔領完，已在地底世界另一處重生。");
  }

  addBattleLog("勝利！你獲得了這塊土地。");
  const levelText = expResult.leveledLevels.length
    ? `升到 Lv.${playerLevel}！${expResult.milestoneTexts.length ? ` ${expResult.milestoneTexts.join("、")}。` : ""}`
    : `獲得 ${expResult.gained.toLocaleString()} EXP。`;
  const dropText = chestDrops.length ? ` 掉落寶箱：${chestDrops.join("、")}，已放入背包。` : "";
  statusText.textContent = `成功佔領土地，目前擁有 ${playerLands.size} 塊。${dropText}`;
  victoryMessage.textContent = `你打敗魔王並佔領 1 塊土地，目前擁有 ${playerLands.size} 塊土地。${levelText}${dropText}`;
  selectedTarget = null;
  updateHud();
  battleDialog.close();
  victoryDialog.showModal();
  renderAchievements();
  battle = null;
  scheduleDraw();
}

function loseBattle() {
  if (!battle) return;
  playSfx("defeat");
  if (battle.attackTimer) clearInterval(battle.attackTimer);
  if (battle.mode === "chestBeast") {
    defeatMessage.textContent = "你已被 Daemon 魔狼擊敗，本月寶箱還被牠守著。";
    statusText.textContent = "Daemon 魔狼戰役失敗，可以整理裝備後再挑戰。";
    if (chestBeastBattle) chestBeastBattle.isRunning = false;
    updateChestBeastPanel();
  } else {
    defeatMessage.textContent = "你已被魔王擊敗，沒辦法佔領這塊土地。";
    statusText.textContent = "你已被魔王擊敗，沒辦法佔領土地。";
  }
  battleDialog.close();
  defeatDialog.showModal();
  battle = null;
  selectedTarget = null;
  updateHud();
  scheduleDraw();
}

function getPlayerLevel() {
  return clamp(Number(playerLevel || 1), 1, MAX_PLAYER_LEVEL);
}

function getExpForLevel(level) {
  if (level >= MAX_PLAYER_LEVEL) return Infinity;
  return Math.round(120 + level * 70 + Math.pow(level, 1.72) * 24);
}

function getExpProgressRatio() {
  if (playerLevel >= MAX_PLAYER_LEVEL) return 1;
  return clamp(playerExp / getExpForLevel(playerLevel), 0, 1);
}

function getLevelMilestoneBonus(kind) {
  return Object.entries(levelMilestoneRewards).reduce((total, [level, reward]) => {
    if (playerLevel >= Number(level)) return total + reward[kind];
    return total;
  }, 0);
}

function getLandExpReward(target) {
  const terrainExp = {
    magma: 45,
    blackRock: 28,
    grayRock: 24,
    yellowCrystal: 58,
    pinkCrystal: 64,
    advanced: 120,
  };
  return terrainExp[target.terrain] + (target.isNpc ? 45 : 0);
}

function grantBattleExp(target, defeatedBosses) {
  const gained = getLandExpReward(target) + defeatedBosses.reduce((total, boss) => total + (boss.exp || 0), 0);
  const leveledLevels = [];
  const milestoneTexts = [];

  if (playerLevel >= MAX_PLAYER_LEVEL) {
    playerExp = 0;
    return { gained: 0, leveledLevels, milestoneTexts };
  }

  playerExp += gained;

  while (playerLevel < MAX_PLAYER_LEVEL && playerExp >= getExpForLevel(playerLevel)) {
    playerExp -= getExpForLevel(playerLevel);
    playerLevel += 1;
    leveledLevels.push(playerLevel);
    const milestone = levelMilestoneRewards[playerLevel];
    if (milestone) milestoneTexts.push(`Lv.${playerLevel} ${milestone.text}`);
    addBattleLog(`等級提升！${getPlayerNickname()} 升到 Lv.${playerLevel}。${milestone ? milestone.text : "能力小幅提升。"}`, "player-critical");
  }

  if (playerLevel >= MAX_PLAYER_LEVEL) playerExp = 0;
  if (!leveledLevels.length) addBattleLog(`獲得 ${gained.toLocaleString()} EXP。`);
  return { gained, leveledLevels, milestoneTexts };
}

function grantBossChestDrops(defeatedBosses) {
  const drops = [];
  defeatedBosses.forEach((boss) => {
    if (boss.type === "green" || !boss.chestDropChance) return;
    if (Math.random() > boss.chestDropChance) return;

    const reward = getBossChestReward(boss.type);
    addInventoryItem(reward);
    drops.push(reward);
    addBattleLog(`${bossColors[boss.type].name} 掉落 ${reward}，已自動放進背包。`, "player-critical");
  });
  return drops;
}

function getBossChestReward(type) {
  const pools = {
    blue: ["晶鑽寶箱", "鐵門寶箱", "魔法寶箱"],
    red: ["神獸寶箱", "晶鑽寶箱", "魔法寶箱"],
    rainbow: ["神獸寶箱", "魔法寶箱", "晶鑽寶箱"],
  };
  const pool = pools[type] || chestRewardTypes;
  return pool[randomInt(0, pool.length - 1)];
}

function getReward(target) {
  const terrainReward = {
    magma: 55,
    blackRock: 35,
    grayRock: 30,
    yellowCrystal: 95,
    pinkCrystal: 105,
    advanced: 180,
  };
  return terrainReward[target.terrain] + (target.isNpc ? 60 : 0);
}

function addBattleLog(text, type = "") {
  const item = document.createElement("li");
  if (type) item.className = type;
  item.textContent = text;
  battleLog.prepend(item);
}

function closeBattle() {
  if (battle?.attackTimer) {
    clearInterval(battle.attackTimer);
  }
  if (battle?.mode === "chestBeast" && chestBeastBattle) {
    chestBeastBattle.isRunning = false;
    updateChestBeastPanel();
  }
  battleDialog.close();
  battle = null;
  selectedTarget = null;
  updateHud();
  scheduleDraw();
}

function renderAchievements() {
  const newlyUnlocked = syncUnlockedAchievements();

  achievementList.replaceChildren(
    ...achievements.map((achievement) => {
      const unlocked = isAchievementUnlocked(achievement);

      const item = document.createElement("li");
      item.className = unlocked ? `unlocked ${achievement.theme}` : "";
      item.textContent = `${unlocked ? "已達成" : "未達成"}｜${achievement.label}`;
      return item;
    }),
  );

  if (newlyUnlocked.length > 0) {
    queueAchievementCelebrations(newlyUnlocked);
  }
}

function syncUnlockedAchievements() {
  const newlyUnlocked = [];

  for (const achievement of achievements) {
    if (achievement.isUnlocked() && !unlockedAchievements.has(achievement.id)) {
      unlockedAchievements.add(achievement.id);
      newlyUnlocked.push(achievement);
    }
  }

  if (newlyUnlocked.length > 0) saveCurrentGame();
  return newlyUnlocked;
}

function isAchievementUnlocked(achievement) {
  return unlockedAchievements.has(achievement.id);
}

function queueAchievementCelebrations(items) {
  achievementQueue.push(...items);
  showNextAchievementCelebration();
}

function showNextAchievementCelebration() {
  if (victoryDialog.open || achievementDialog.open || achievementQueue.length === 0) return;

  const achievement = achievementQueue.shift();
  achievementCard.className = `achievement-card ${achievement.theme}`;
  achievementIcon.textContent = achievement.icon;
  achievementTitle.textContent = achievement.title;
  achievementMessage.textContent = achievement.message;
  achievementReward.textContent = achievement.reward;
  statusText.textContent = `成就達成：${achievement.label}`;
  achievementDialog.showModal();
}

function updateHud() {
  playerCount.textContent = `Lv.${playerLevel}｜${playerLands.size}`;
  npcCount.textContent = npcLands.size;
  moneyCount.textContent = `$${money.toLocaleString()}`;
  hpCount.textContent = getPlayerMaxHp().toLocaleString();
  currentAccountLabel.textContent = currentAccount ? `${getPlayerNickname()}｜${currentNpcProfile?.name || "NPC"}` : "未登入";
  updateEventLabel();
  saveCurrentGame();
}

function updateEventLabel() {
  eventLabel.textContent = isEventActive()
    ? "年度活動進行中：NPC 每小時增加 2 塊地，攻下 5 塊 NPC 土地獲得進階地形。"
    : "目前非年度活動期間：NPC 每小時增加 1 塊地。";
}

function toggleQuickMenu(forceOpen = null) {
  const shouldOpen = forceOpen ?? !quickMenu.classList.contains("open");
  quickMenu.classList.toggle("open", shouldOpen);
  quickMenuToggle.setAttribute("aria-expanded", String(shouldOpen));
  quickMenuToggle.setAttribute("aria-label", shouldOpen ? "收合左側功能選單" : "展開左側功能選單");
  quickMenuItems.setAttribute("aria-hidden", String(!shouldOpen));
}

function openFeaturePanel(panel) {
  renderFeaturePanel(panel);
  if (!featureDialog.open) featureDialog.showModal();
}

function renderFeaturePanel(panel) {
  const panelData = getFeaturePanelData(panel);
  featureDialog.dataset.panel = panel;
  featureKicker.textContent = panelData.kicker;
  featureTitle.textContent = panelData.title;
  featureContent.innerHTML = panelData.html;
}

function updatePlayerNickname(nickname) {
  if (!currentAccount) return false;
  const nextNickname = sanitizeNickname(nickname);
  currentAccount.nickname = nextNickname;
  currentAccount.displayName = nextNickname;
  saveCurrentGame();
  updateHud();
  if (featureDialog.open && featureDialog.dataset.panel === "character") {
    renderFeaturePanel("character");
    const message = featureContent.querySelector("#nickname-message");
    message.textContent = `暱稱已更新為「${nextNickname}」。`;
  }
  statusText.textContent = `暱稱已更新為「${nextNickname}」。`;
  return true;
}

function getFeaturePanelData(panel) {
  if (panel === "bag") {
    const inventoryEntries = getInventoryEntries();
    const slotCount = Math.max(24, Math.ceil(inventoryEntries.length / 6) * 6);
    const inventoryCards = Array.from({ length: slotCount }, (_, index) => {
      const entry = inventoryEntries[index];
      const slotPosition = getInventorySlotPosition(index);
      return entry ? createInventorySlot(entry[0], entry[1], slotPosition) : createEmptyInventorySlot(index, slotPosition);
    }).join("");
    return {
      kicker: "背包",
      title: `道具背包（${inventoryEntries.length} / ${slotCount}）`,
      html: `
        <section class="inventory-board">
          <div class="inventory-board-header">
            <strong>地底收納箱</strong>
            <span>游標移到道具上查看名稱與功能；寶箱可雙擊開啟，地形卡可雙擊放置。</span>
          </div>
          <div class="inventory-grid" aria-label="背包道具格">
            ${inventoryCards}
          </div>
          ${inventoryEntries.length ? "" : `<div class="inventory-empty"><strong>背包尚空</strong><span>挑戰寶箱魔獸取得獎勵</span></div>`}
        </section>
        <div id="chest-open-result" class="chest-open-result" aria-live="polite"></div>
      `,
    };
  }

  if (panel === "daily") {
    const dateKey = getDailyRewardDateKey();
    const claimed = lastDailyRewardDate === dateKey;
    const rewardType = getLoginRewardType();
    const rewardConfig = loginRewardConfigs[rewardType];
    const itemPreview = magicChestDrops
      .map((drop) => {
        const info = getInventoryItemInfo(drop.name);
        return `
          <li>
            <span class="inventory-icon daily-pool-icon ${info.icon}" aria-hidden="true"></span>
            <span>${escapeHtml(drop.name)}</span>
            <strong>${drop.chance}%</strong>
          </li>
        `;
      })
      .join("");
    const terrainPreview = rewardConfig.terrainRarityTable
      .map((drop) => `<li class="daily-rarity-row"><span>${escapeHtml(drop.rarity)}地形卡</span><strong>${drop.chance}%</strong></li>`)
      .join("");

    return {
      kicker: "登入獎勵",
      title: rewardConfig.title,
      html: `
        <section class="daily-reward-panel ${claimed ? "claimed" : ""}">
          <div class="daily-reward-stage">
            <button id="daily-reward-button" class="daily-gift-box ${rewardType} ${claimed ? "opened" : ""}" type="button" ${claimed ? "disabled" : ""} aria-label="${claimed ? "今日已領取登入獎勵" : "領取登入獎勵"}">
              <span class="daily-gift-lid"></span>
              <span class="daily-gift-body"></span>
              <span class="daily-gift-glow"></span>
            </button>
            <div class="daily-reward-copy">
              <strong>${claimed ? "今日已領取" : rewardConfig.label}</strong>
              <p>${claimed ? "明天再回來領取新的登入補給。" : rewardConfig.description}</p>
              <div class="daily-reward-summary">
                <span>遊戲道具 × ${rewardConfig.itemCount}</span>
                <span>地形卡 × ${rewardConfig.terrainCardCount}</span>
              </div>
            </div>
          </div>
          <div class="daily-reward-pool">
            <div>
              <strong>遊戲道具池</strong>
              <span>${dateKey}</span>
            </div>
            <ul>${itemPreview}</ul>
          </div>
          <div class="daily-reward-pool terrain-rarity-pool">
            <div>
              <strong>地形卡稀有度</strong>
              <span>${rewardConfig.terrainCardCount} 張</span>
            </div>
            <ul>${terrainPreview}</ul>
          </div>
          <div id="daily-reward-result" class="daily-reward-result" aria-live="polite"></div>
        </section>
      `,
    };
  }

  if (panel === "achievements") {
    syncUnlockedAchievements();
    const unlockedCount = getUnlockedAchievementCount();
    const completionRate = Math.round((unlockedCount / achievements.length) * 100);
    const achievementCards = achievements
      .map((achievement) => {
        const unlocked = isAchievementUnlocked(achievement);
        return `
          <article class="achievement-tile ${unlocked ? `unlocked ${achievement.theme}` : "locked"}">
            <div class="achievement-tile-icon">${achievement.icon}</div>
            <div>
              <strong>${achievement.label}</strong>
              <span>${unlocked ? "已完成" : "尚未完成"}</span>
            </div>
          </article>
        `;
      })
      .join("");

    return {
      kicker: "成就",
      title: "成就圖鑑",
      html: `
        <section class="achievement-progress-panel">
          <div>
            <strong>${completionRate}%</strong>
            <span>完成率</span>
          </div>
          <div class="achievement-progress-track" aria-label="成就完成率">
            <span style="width: ${completionRate}%"></span>
          </div>
          <p>已完成 ${unlockedCount} / ${achievements.length} 個成就</p>
        </section>
        <div class="achievement-gallery">
          ${achievementCards}
        </div>
      `,
    };
  }

  return {
    kicker: "人物介面",
    title: getPlayerNickname(),
    html: `
      <section class="character-panel">
        <div class="character-showcase">
          <div class="character-portrait" aria-hidden="true"></div>
          <div class="character-summary">
            <span>地底開拓者</span>
            <strong>${escapeHtml(getPlayerNickname())}</strong>
            <p>對應 NPC：${escapeHtml(currentNpcProfile?.name || "NPC")}</p>
          </div>
        </div>
        <section class="level-progress-panel">
          <div>
            <span>目前等級</span>
            <strong>Lv.${playerLevel}</strong>
            <em>${playerLevel >= MAX_PLAYER_LEVEL ? "已達等級上限" : `${playerExp.toLocaleString()} / ${getExpForLevel(playerLevel).toLocaleString()} EXP`}</em>
          </div>
          <div class="level-progress-track" aria-label="玩家經驗值進度">
            <span style="width: ${Math.round(getExpProgressRatio() * 100)}%"></span>
          </div>
          <p>${getNextLevelMilestoneText()}</p>
        </section>
        <form class="nickname-form" id="nickname-form">
          <label for="nickname-input">玩家暱稱</label>
          <div>
            <input id="nickname-input" name="nickname" type="text" maxlength="16" value="${escapeHtml(getPlayerNickname())}" autocomplete="off" />
            <button type="submit">儲存暱稱</button>
          </div>
          <p id="nickname-message" aria-live="polite">修改後會取代遊戲中對你的稱呼。</p>
        </form>
        <ul class="feature-stat-list">
          <li><span>玩家等級</span><strong>Lv.${playerLevel}</strong><em>最高 Lv.${MAX_PLAYER_LEVEL}</em></li>
          <li><span>玩家土地</span><strong>${playerLands.size.toLocaleString()}</strong><em>已佔領土地</em></li>
          <li><span>最大生命值</span><strong>${getPlayerMaxHp().toLocaleString()}</strong><em>戰鬥耐久</em></li>
          <li><span>攻擊區間</span><strong>${getPlayerAttackRange().min}～${getPlayerAttackRange().max}</strong><em>水晶鎬傷害</em></li>
          <li><span>魔王遭遇</span><strong>${getUnlockedBossNames()}</strong><em>依等級隨機出現</em></li>
          <li><span>金錢</span><strong>$${money.toLocaleString()}</strong><em>交易資金</em></li>
        </ul>
      </section>
    `,
  };
}

function getNextLevelMilestoneText() {
  if (playerLevel >= MAX_PLAYER_LEVEL) return "你已達到 Lv.50，等級成長已完成。";
  const nextMilestone = Object.keys(levelMilestoneRewards)
    .map(Number)
    .find((level) => level > playerLevel);
  if (!nextMilestone) return "下一級會提升生命值與攻擊力。";
  return `下一個明顯提升：Lv.${nextMilestone}，${levelMilestoneRewards[nextMilestone].text}。`;
}

function getUnlockedBossNames() {
  const names = ["岩石"];
  if (playerLevel >= 10) names.push("虎形");
  if (playerLevel >= 20) names.push("龍形");
  if (playerLevel >= 30) names.push("翼手龍");
  return names.join("／");
}

function getInventoryEntries() {
  return [...itemInventory.entries()].sort((a, b) => a[0].localeCompare(b[0], "zh-Hant"));
}

function getInventorySlotPosition(index) {
  return `slot-col-${(index % 6) + 1} slot-row-${Math.floor(index / 6) + 1}`;
}

function createInventorySlot(name, count, slotPosition = "") {
  const info = getInventoryItemInfo(name);
  const isChest = info.type === "chest";
  const isTerrainCard = info.type === "terrainCard";
  const actionHint = isChest ? "雙擊開啟寶箱" : isTerrainCard ? "雙擊選擇土地放置" : "道具";

  return `
    <button
      class="inventory-icon-slot ${slotPosition} ${isChest ? "chest-slot" : ""} ${isTerrainCard ? "terrain-card-slot" : ""}"
      type="button"
      data-item-name="${escapeHtml(name)}"
      aria-label="${escapeHtml(`${name}，持有 ${count}`)}"
    >
      <span class="inventory-icon ${info.icon}" aria-hidden="true"></span>
      <span class="inventory-count">${count}</span>
      <span class="inventory-tooltip" role="tooltip">
        <strong>${escapeHtml(name)}</strong>
        <em>${escapeHtml(info.description)}</em>
        <small>${actionHint}</small>
      </span>
    </button>
  `;
}

function createEmptyInventorySlot(index, slotPosition = "") {
  return `<span class="inventory-icon-slot ${slotPosition} empty-slot" aria-label="空背包格 ${index + 1}"></span>`;
}

function getInventoryItemInfo(name) {
  return inventoryItemInfo[name] || { type: "item", icon: "unknown-item", description: "尚未鑑定功能的地底物品。" };
}

function addInventoryItem(name, count = 1) {
  itemInventory.set(name, (itemInventory.get(name) || 0) + count);
  saveCurrentGame();
}

function removeInventoryItem(name, count = 1) {
  const current = itemInventory.get(name) || 0;
  if (current < count) return false;

  const next = current - count;
  if (next <= 0) {
    itemInventory.delete(name);
  } else {
    itemInventory.set(name, next);
  }
  saveCurrentGame();
  return true;
}

function useInventoryItem(name) {
  const info = getInventoryItemInfo(name);

  if (info.type === "chest") {
    openInventoryChest(name);
    return;
  }

  if (info.type === "terrainCard") {
    startTerrainCardPlacement(name, info);
  }
}

function startTerrainCardPlacement(cardName, info) {
  if ((itemInventory.get(cardName) || 0) <= 0) return;

  placementMode = {
    cardName,
    featureType: info.featureType,
  };

  featureDialog.close();
  statusText.textContent = `正在使用${cardName}：請點選一塊自己的土地來建造${terrainFeatureInfo[info.featureType]?.name || "特殊建築"}。`;
  scheduleDraw();
}

function openInventoryChest(chestName) {
  const info = getInventoryItemInfo(chestName);
  if (info.type !== "chest" || !removeInventoryItem(chestName)) return;

  playSfx("chest");
  const rewards = rollChestRewards(chestName);
  rewards.forEach((rewardName) => addInventoryItem(rewardName));
  renderFeaturePanel("bag");
  showChestOpenResult(chestName, rewards);
  statusText.textContent = `打開 ${chestName}，獲得 ${rewards.join("、")}。`;
  saveCurrentGame();
}

function rollChestRewards(chestName) {
  const rewardCount = randomInt(2, 4);
  return Array.from({ length: rewardCount }, () => rollChestReward(chestName));
}

function rollChestReward(chestName) {
  if (chestName === "魔法寶箱") return rollMagicChestItem();

  const table = terrainCardChestRarityTables[chestName] || terrainCardChestRarityTables["晶鑽寶箱"];
  const rarity = rollWeightedEntry(table).rarity;
  const pool = terrainCardPoolsByRarity[rarity] || terrainCardPoolsByRarity["稀有"];
  return pool[randomInt(0, pool.length - 1)];
}

function rollWeightedEntry(table) {
  const total = table.reduce((sum, item) => sum + item.chance, 0);
  let roll = Math.random() * total;
  for (const item of table) {
    roll -= item.chance;
    if (roll <= 0) return item;
  }
  return table[table.length - 1];
}

function showChestOpenResult(chestName, rewards) {
  const result = document.querySelector("#chest-open-result");
  if (!result) return;

  const chestInfo = getInventoryItemInfo(chestName);
  const rewardItems = rewards
    .map((rewardName) => {
      const rewardInfo = getInventoryItemInfo(rewardName);
      return `
        <div class="reward-pop">
          <span class="inventory-icon ${rewardInfo.icon}" aria-hidden="true"></span>
          <strong>${escapeHtml(rewardName)}</strong>
          <small>${escapeHtml(rewardInfo.description)}</small>
        </div>
      `;
    })
    .join("");

  result.innerHTML = `
    <div class="chest-open-stage">
      <span class="inventory-icon ${chestInfo.icon} opening-chest" aria-hidden="true"></span>
      <span class="chest-open-flare" aria-hidden="true"></span>
      <div class="reward-pop-list" aria-label="寶箱獎勵">
        ${rewardItems}
      </div>
    </div>
  `;
  result.classList.remove("show");
  void result.offsetWidth;
  result.classList.add("show");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function openTradePanel() {
  settleTradeListings();
  currentTradeProducts = createTradeProducts();
  renderTradePanel();
  addTradeLog("交易之場已刷新：本次出現 3 項遊戲道具與 3 張地形卡。");
  tradeDialog.showModal();
}

function renderTradePanel() {
  tradeMoney.textContent = `$${money.toLocaleString()}`;
  renderTradeProducts();
  renderTradeSellOptions();
  renderTradeListings();
}

function createTradeProducts() {
  const itemProducts = shuffle([...magicChestDrops])
    .slice(0, TRADE_BUY_ITEM_COUNT)
    .map((drop, index) => ({
      id: `trade-item-${index}-${drop.name}`,
      name: drop.name,
      price: randomInt(TRADE_ITEM_BUY_PRICE_RANGE.min, TRADE_ITEM_BUY_PRICE_RANGE.max),
      category: "遊戲道具",
      meta: "隨機道具商品",
    }));
  const terrainProducts = Array.from({ length: TRADE_BUY_TERRAIN_CARD_COUNT }, (_, index) => {
    const cardName = rollTradeTerrainCard();
    const card = terrainCardInfoByName[cardName];
    return {
      id: `trade-terrain-${index}-${cardName}`,
      name: cardName,
      price: TRADE_TERRAIN_BUY_PRICES[card?.rarity] || TRADE_TERRAIN_BUY_PRICES["稀有"],
      category: "地形卡",
      meta: `${card?.rarity || "稀有"}地形卡`,
    };
  });

  return [...itemProducts, ...terrainProducts];
}

function rollTradeTerrainCard() {
  const rarity = rollWeightedEntry(tradeTerrainRarityTable).rarity;
  const pool = terrainCardPoolsByRarity[rarity] || terrainCardPoolsByRarity["稀有"];
  return pool[randomInt(0, pool.length - 1)];
}

function renderTradeProducts() {
  tradeProductGrid.replaceChildren(
    ...currentTradeProducts.map((product) => {
      const info = getInventoryItemInfo(product.name);
      const card = document.createElement("article");
      card.className = `trade-product-card ${info.type === "terrainCard" ? "terrain-product" : "item-product"}`;
      card.innerHTML = `
        <div class="trade-product-art">
          <span class="inventory-icon trade-item-icon ${info.icon}" aria-hidden="true"></span>
        </div>
        <div>
          <strong>${product.name}</strong>
          <span>${product.category}｜${product.meta}</span>
        </div>
        <button class="trade-buy-button" type="button" data-product-id="${product.id}">$ ${product.price.toLocaleString()}</button>
      `;
      return card;
    }),
  );
}

function buyTradeProduct(productId) {
  const product = currentTradeProducts.find((item) => item.id === productId);
  if (!product) return;

  if (money < product.price) {
    addTradeLog(`金錢不足，無法購買 ${product.name}。`);
    renderTradePanel();
    return;
  }

  money -= product.price;
  addInventoryItem(product.name);
  addTradeLog(`購買成功：${product.name}，花費 $${product.price.toLocaleString()}。`);
  statusText.textContent = `已從交易之場購買 ${product.name}。`;
  updateHud();
  renderAchievements();
  renderTradePanel();
}

function renderTradeSellOptions() {
  const entries = getInventoryEntries();
  tradeSellName.replaceChildren();

  if (entries.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "背包沒有可出售道具";
    tradeSellName.append(option);
    tradeSellName.disabled = true;
    tradeListButton.disabled = true;
    return;
  }

  tradeSellName.disabled = false;
  tradeListButton.disabled = false;
  tradeSellName.append(
    ...entries.map(([name, count]) => {
      const option = document.createElement("option");
      const price = getTradeSellPrice(name);
      option.value = name;
      option.textContent = `${name}（持有 ${count}｜收購 $${price.toLocaleString()}）`;
      return option;
    }),
  );
}

function listTradeItem() {
  const name = tradeSellName.value;
  const price = getTradeSellPrice(name);

  if (!name) {
    addTradeLog("請先選擇背包裡要上架的道具。");
    return;
  }

  if (!itemInventory.has(name)) {
    addTradeLog("背包裡已經沒有這個道具，請重新選擇。");
    renderTradePanel();
    return;
  }

  if (!price) {
    addTradeLog("上架失敗，這個物品目前沒有交易之場收購價格。");
    return;
  }

  if (!removeInventoryItem(name)) {
    addTradeLog("上架失敗，背包數量不足。");
    renderTradePanel();
    return;
  }

  money += price;
  addTradeLog(`${name} 已用固定收購價 $${price.toLocaleString()} 賣出。`);
  statusText.textContent = `交易之場售出 ${name}，獲得 $${price.toLocaleString()}。`;
  updateHud();
  renderAchievements();
  saveCurrentGame();
  renderTradePanel();
}

function getTradeSellPrice(name) {
  const info = getInventoryItemInfo(name);
  if (info.type === "terrainCard") {
    return TRADE_TERRAIN_SELL_PRICES[info.rarity] || TRADE_TERRAIN_SELL_PRICES["稀有"];
  }
  return TRADE_ITEM_SELL_PRICE;
}

function settleTradeListings(now = Date.now()) {
  const soldListings = tradeListings.filter((listing) => !listing.claimed && listing.soldAt <= now);
  if (soldListings.length === 0) return;

  const totalIncome = soldListings.reduce((total, listing) => total + listing.price, 0);
  for (const listing of soldListings) {
    listing.claimed = true;
  }
  money += totalIncome;
  addTradeLog(`上架商品已賣出，獲得 $${totalIncome.toLocaleString()}。`);
  statusText.textContent = `交易之場售出商品，獲得 $${totalIncome.toLocaleString()}。`;
  updateHud();
  renderAchievements();
}

function renderTradeListings() {
  const activeListings = tradeListings.filter((listing) => !listing.claimed);

  if (activeListings.length === 0) {
    tradeListingsPanel.innerHTML = `<div class="trade-empty">目前沒有上架中的商品。</div>`;
    return;
  }

  tradeListingsPanel.replaceChildren(
    ...activeListings.map((listing) => {
      const item = document.createElement("article");
      const soldText = listing.soldAt <= Date.now() ? "已賣出，重新進入交易之場即可領取" : formatRemainingTime(listing.soldAt - Date.now());
      const info = getInventoryItemInfo(listing.name);
      item.className = "trade-listing";
      item.innerHTML = `
        <span class="inventory-icon trade-listing-icon ${info.icon}" aria-hidden="true"></span>
        <div>
          <strong>${escapeHtml(listing.name)}</strong>
          <span>上架價 $${listing.price.toLocaleString()}｜${soldText}</span>
        </div>
        <em>$${listing.price.toLocaleString()}</em>
      `;
      return item;
    }),
  );
}

function formatRemainingTime(ms) {
  const totalHours = Math.max(1, Math.ceil(ms / (60 * 60 * 1000)));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  if (days <= 0) return `${hours} 小時後賣出`;
  if (hours === 0) return `${days} 天後賣出`;
  return `${days} 天 ${hours} 小時後賣出`;
}

function addTradeLog(text) {
  const item = document.createElement("li");
  item.textContent = text;
  tradeLog.prepend(item);
}

function openChestBeastPanel() {
  updateChestBeastPanel();
  chestBeastLog.replaceChildren();
  addChestBeastLog("寶箱魔獸正在守護本月獎勵。");
  chestBeastDialog.showModal();
}

function updateChestBeastPanel() {
  const unlockedCount = getUnlockedAchievementCount();
  const range = getChestBeastHpRange();
  const monthKey = getChestRewardMonthKey();
  chestAchievementCount.textContent = `${unlockedCount} / ${achievements.length}`;
  chestHpRange.textContent = `${range.min.toLocaleString()}～${range.max.toLocaleString()}`;
  chestMonthStatus.textContent = CHEST_BEAST_TEST_MODE ? "測試開放中，正式難度" : isChestRewardDay() ? "本日可挑戰" : "非 7 日未開放";
  joinChestCampaign.disabled = chestBeastBattle?.isRunning || (!CHEST_BEAST_TEST_MODE && (!isChestRewardDay() || lastChestRewardMonth === monthKey));
  joinChestCampaign.textContent = chestBeastBattle?.isRunning ? "戰役進行中" : "參加戰役";

  if (!CHEST_BEAST_TEST_MODE && lastChestRewardMonth === monthKey) {
    chestMonthStatus.textContent = "本月已領取";
  }

  if (!chestBeastBattle) {
    chestBeastHpBar.style.width = "0%";
    chestBeastHpLabel.textContent = "尚未開始戰役";
  } else {
    const hpPercent = Math.max(0, (chestBeastBattle.hp / chestBeastBattle.maxHp) * 100);
    chestBeastHpBar.style.width = `${hpPercent}%`;
    chestBeastHpLabel.textContent = `${Math.max(0, chestBeastBattle.hp).toLocaleString()} / ${chestBeastBattle.maxHp.toLocaleString()}`;
  }
}

function getUnlockedAchievementCount() {
  syncUnlockedAchievements();
  return unlockedAchievements.size;
}

function getChestBeastHpRange() {
  const unlockedCount = getUnlockedAchievementCount();
  return unlockedCount <= 10 ? { min: 70000, max: 110000 } : { min: 135000, max: 210000 };
}

function isChestRewardDay(date = new Date()) {
  return date.getDate() === CHEST_BEAST_REWARD_DAY;
}

function getChestRewardMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

function startChestBeastCampaign() {
  if (chestBeastBattle?.isRunning || battle?.mode === "chestBeast") return;
  if (!CHEST_BEAST_TEST_MODE && !isChestRewardDay()) {
    addChestBeastLog("寶箱魔獸只在每月 7 日開放挑戰。");
    updateChestBeastPanel();
    return;
  }
  if (!CHEST_BEAST_TEST_MODE && lastChestRewardMonth === getChestRewardMonthKey()) {
    addChestBeastLog("本月獎勵已領取，請等待下個月 7 日。");
    updateChestBeastPanel();
    return;
  }

  const hpRange = getChestBeastHpRange();
  const boss = createChestBeastBoss(hpRange);
  const playerMaxHp = getChestBeastPlayerMaxHp();
  battle = {
    mode: "chestBeast",
    target: { x: -1, y: -1, terrain: "magma", isNpc: false },
    playerHp: playerMaxHp,
    playerMaxHp,
    playerAttackRange: getChestBeastPlayerAttackRange(),
    turn: 0,
    attacksSinceBoss: 0,
    bosses: [boss],
    itemSlots: Array(BATTLE_ITEM_SLOT_COUNT).fill(null),
    effects: createEmptyBattleEffects(),
    attackTimer: null,
    isAutoRunning: false,
    isPaused: false,
  };
  chestBeastBattle = { hp: boss.hp, maxHp: boss.maxHp, isRunning: true };
  chestBeastLog.replaceChildren();
  addChestBeastLog(`戰役開始，Daemon 魔狼血量 ${boss.maxHp.toLocaleString()}。`);
  updateChestBeastPanel();
  battleLog.replaceChildren();
  applyChestBeastBattleTerrain();
  addBattleLog(CHEST_BEAST_TEST_MODE ? "你進入 Daemon 魔狼測試戰役，目前使用正式難度。" : "你進入 Daemon 魔狼戰役，牠的撕咬比一般魔王更強。");
  addBattleLog(`戰役攻擊力為 ${battle.playerAttackRange.min.toLocaleString()}～${battle.playerAttackRange.max.toLocaleString()}。`);
  chestBeastDialog.close();
  battleDialog.showModal();
  renderBattle();
}

function createChestBeastBoss(hpRange) {
  const level = getPlayerLevel();
  const achievementFactor = getUnlockedAchievementCount();
  const hp = randomInt(hpRange.min, hpRange.max) + level * 720 + achievementFactor * 520;
  bossIdSequence += 1;
  return {
    id: `chest-wolf-${bossIdSequence}`,
    type: "chestWolf",
    hp,
    maxHp: hp,
    attackRange: {
      min: 280 + level * 14 + achievementFactor * 6,
      max: 460 + level * 22 + achievementFactor * 10,
    },
    exp: 0,
    chestDropChance: 0,
  };
}

function getChestBeastPlayerMaxHp() {
  return Math.round(getPlayerMaxHp() * CHEST_BEAST_PLAYER_HP_MULTIPLIER + getPlayerLevel() * 180 + getUnlockedAchievementCount() * 65);
}

function getChestBeastPlayerAttackRange() {
  const attackRange = getPlayerAttackRange();
  return {
    min: Math.max(640, attackRange.min * 18),
    max: Math.max(980, attackRange.max * 24),
  };
}

function finishChestBeastCampaign() {
  if (!battle && !chestBeastBattle) return;

  playSfx("victory");
  const chestReward = chestRewardTypes[randomInt(0, chestRewardTypes.length - 1)];
  addInventoryItem(chestReward);
  lastChestRewardMonth = getChestRewardMonthKey();
  if (chestBeastBattle) {
    chestBeastBattle.isRunning = false;
    chestBeastBattle.hp = 0;
  }
  addBattleLog(`勝利！獲得 ${chestReward}，已放入背包。`, "player-critical");
  addChestBeastLog(`勝利！擊敗 Daemon 魔狼，獲得 ${chestReward}，已放入背包。`);

  statusText.textContent = `Daemon 魔狼戰役勝利，獲得 ${chestReward}。`;
  victoryMessage.textContent = `你擊敗守護寶箱的 Daemon 魔狼，獲得 ${chestReward}。寶箱已自動放進背包。`;
  battleDialog.close();
  victoryDialog.showModal();
  battle = null;
  selectedTarget = null;
  updateChestBeastPanel();
  updateHud();
  saveCurrentGame();
}

function rollMagicChestItem() {
  const roll = randomInt(1, 100);
  let cursor = 0;

  for (const drop of magicChestDrops) {
    cursor += drop.chance;
    if (roll <= cursor) return drop.name;
  }

  return magicChestDrops[magicChestDrops.length - 1].name;
}

function getDailyRewardDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isLastDayOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() === date.getDate();
}

function isWeeklyRewardDay(date = new Date()) {
  return date.getDay() === 0;
}

function getLoginRewardType(date = new Date()) {
  if (isLastDayOfMonth(date)) return "monthly";
  if (isWeeklyRewardDay(date)) return "weekly";
  return "daily";
}

function claimDailyReward() {
  const dateKey = getDailyRewardDateKey();
  if (lastDailyRewardDate === dateKey) return;

  const rewardType = getLoginRewardType();
  const rewards = rollLoginRewards(rewardType);
  lastDailyRewardDate = dateKey;
  rewards.forEach((rewardName) => addInventoryItem(rewardName));
  renderFeaturePanel("daily");
  showDailyRewardResult(rewards);
  statusText.textContent = `${loginRewardConfigs[rewardType].label}：獲得 ${rewards.join("、")}。`;
  updateHud();
}

function rollLoginRewards(rewardType) {
  const config = loginRewardConfigs[rewardType] || loginRewardConfigs.daily;
  return [
    ...Array.from({ length: config.itemCount }, rollMagicChestItem),
    ...Array.from({ length: config.terrainCardCount }, () => rollLoginRewardTerrainCard(config.terrainRarityTable)),
  ];
}

function rollLoginRewardTerrainCard(rarityTable) {
  const rarity = rollWeightedEntry(rarityTable).rarity;
  const pool = terrainCardPoolsByRarity[rarity] || terrainCardPoolsByRarity["稀有"];
  return pool[randomInt(0, pool.length - 1)];
}

function showDailyRewardResult(rewards) {
  const result = featureContent.querySelector("#daily-reward-result");
  if (!result) return;
  const rewardItems = rewards
    .map((rewardName) => {
      const info = getInventoryItemInfo(rewardName);
      return `
        <article class="daily-reward-card">
          <span class="inventory-icon ${info.icon}" aria-hidden="true"></span>
          <div>
            <strong>${escapeHtml(rewardName)}</strong>
            <small>${escapeHtml(info.description)}</small>
          </div>
        </article>
      `;
    })
    .join("");
  result.classList.add("show");
  result.innerHTML = `
    <div>
      <strong>登入獎勵已放入背包</strong>
      <small>本次獲得 ${rewards.length} 個獎勵。</small>
    </div>
    <div class="daily-reward-result-grid">${rewardItems}</div>
  `;
}

function addChestBeastLog(text) {
  const item = document.createElement("li");
  item.textContent = text;
  chestBeastLog.prepend(item);
}

function closeChestBeastPanel() {
  if (chestBeastBattle?.timer) {
    clearInterval(chestBeastBattle.timer);
  }
  if (chestBeastBattle) {
    chestBeastBattle.isRunning = false;
  }
  chestBeastDialog.close();
}

function isEventActive(date = new Date()) {
  const year = date.getFullYear();
  const start = new Date(year, 6, 15, 12, 0, 0);
  const end = new Date(year, 6, 22, 15, 30, 0);
  return date >= start && date <= end;
}

function tickNpcGrowth() {
  const now = Date.now();
  const elapsedHours = Math.floor((now - lastNpcGrowthAt) / NPC_GROWTH_INTERVAL);
  if (elapsedHours <= 0) return;

  const growthPerHour = isEventActive() ? 2 : 1;
  for (let i = 0; i < elapsedHours * growthPerHour; i += 1) growNpcLand();
  lastNpcGrowthAt += elapsedHours * NPC_GROWTH_INTERVAL;
  updateHud();
  scheduleDraw();
}

function growNpcLand() {
  if (npcLands.size === 0) {
    npcLands = createLandCluster(randomInt(NPC_RESPAWN_MIN, NPC_RESPAWN_MAX));
    return;
  }

  const candidates = [...npcLands].flatMap((key) => {
    const cell = cellFromKey(key);
    return getNeighbors(cell.x, cell.y);
  });
  const edge = shuffle(candidates).find((cell) => {
    const key = keyOf(cell.x, cell.y);
    return !npcLands.has(key) && !playerLands.has(key);
  });

  if (edge) npcLands.add(keyOf(edge.x, edge.y));
}

viewport.addEventListener("scroll", scheduleDraw, { passive: true });
canvas.addEventListener("click", handleMapClick);
authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setAuthMessage("登入中，正在讀取帳號資料...");
  await loginAccount(authUsername.value, authPassword.value);
});
authRegister.addEventListener("click", async () => {
  setAuthMessage("建立帳號中...");
  await registerAccount(authUsername.value, authPassword.value);
});
authTestLogin.addEventListener("click", async () => {
  authUsername.value = TEST_ACCOUNT_USERNAME;
  authPassword.value = TEST_ACCOUNT_PASSWORD;
  setAuthMessage("登入測試帳號中...");
  await loginAccount(TEST_ACCOUNT_USERNAME, TEST_ACCOUNT_PASSWORD);
});
logoutButton.addEventListener("click", () => {
  void logoutAccount();
});
musicToggle.addEventListener("click", toggleMusic);
sfxToggle.addEventListener("click", toggleSfx);
jadeCupClose?.addEventListener("click", () => {
  playSfx("click");
  hideJadeCupAd();
});

viewport.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    const rect = viewport.getBoundingClientRect();
    setZoom(zoom + direction, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  },
  { passive: false },
);

zoomRange.addEventListener("input", () => {
  if (currentAccount) setZoom(Number(zoomRange.value) / 100);
});
zoomInButton.addEventListener("click", () => {
  if (currentAccount) setZoom(zoom + ZOOM_STEP);
});
zoomOutButton.addEventListener("click", () => {
  if (currentAccount) setZoom(zoom - ZOOM_STEP);
});
centerPlayerButton.addEventListener("click", () => {
  if (currentAccount) centerOnPlayerLand();
});

confirmBattleButton.addEventListener("click", (event) => {
  event.preventDefault();
  startBattle();
});

confirmDialog.addEventListener("close", () => {
  if (confirmDialog.returnValue === "cancel") {
    selectedTarget = null;
    scheduleDraw();
  }
});

attackButton.addEventListener("click", startAutoAttack);
pauseBattleButton.addEventListener("click", pauseChestBeastBattle);
assignBattleItemButton.addEventListener("click", assignBattleItemToSlot);
battleItemSlots.addEventListener("click", (event) => {
  const slot = event.target.closest(".battle-item-slot[data-slot-index]");
  if (!slot) return;
  useBattleItemSlot(Number(slot.dataset.slotIndex));
});
escapeBattleButton.addEventListener("click", closeBattle);
achievementClose.addEventListener("click", () => achievementDialog.close());
achievementDialog.addEventListener("close", showNextAchievementCelebration);
victoryDialog.addEventListener("close", showNextAchievementCelebration);
defeatDialog.addEventListener("close", () => {
  selectedTarget = null;
  scheduleDraw();
});
quickMenuToggle.addEventListener("click", () => toggleQuickMenu());
quickMenuItems.addEventListener("click", (event) => {
  const item = event.target.closest(".quick-menu-item");
  if (!item) return;
  if (item.dataset.action === "chest" || item.dataset.action === "trade") {
    return;
  }
  openFeaturePanel(item.dataset.panel);
});
featureClose.addEventListener("click", () => featureDialog.close());
featureContent.addEventListener("dblclick", (event) => {
  if (!(event.target instanceof Element)) return;
  const slot = event.target.closest(".inventory-icon-slot[data-item-name]");
  if (!slot) return;
  useInventoryItem(slot.dataset.itemName);
});
featureContent.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || form.id !== "nickname-form") return;
  event.preventDefault();
  updatePlayerNickname(new FormData(form).get("nickname"));
});
featureContent.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("#daily-reward-button");
  if (!button) return;
  claimDailyReward();
});
tradeButton.addEventListener("click", openTradePanel);
tradeClose.addEventListener("click", () => tradeDialog.close());
tradeListButton.addEventListener("click", listTradeItem);
tradeProductGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".trade-buy-button");
  if (!button) return;
  buyTradeProduct(button.dataset.productId);
});
chestBeastButton.addEventListener("click", openChestBeastPanel);
chestBeastClose.addEventListener("click", closeChestBeastPanel);
joinChestCampaign.addEventListener("click", startChestBeastCampaign);
window.addEventListener("resize", resizeCanvas);
window.addEventListener("beforeunload", saveCurrentGame);
window.addEventListener("pagehide", saveCurrentGame);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") saveCurrentGame();
});
