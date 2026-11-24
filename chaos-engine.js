(function (root) {
'use strict';
// ===== 以下直接取自 index1.html（原樣搬移）：牌資料 =====
// --- 卡牌定義 ---
const CARD_DEFS = [
    { v: 13, n: '地獄領主', id: 'HELL_LORD', suit: 'heart' },
    { v: 13, n: '克蘇魯', id: 'CTHULHU', suit: 'spade' },
    { v: 12, n: '外星人', id: 'ALIEN', suit: 'heart' },
    { v: 12, n: '南瓜王', id: 'PUMPKIN_KING', suit: 'spade' },
    { v: 11, n: '魔龍', id: 'DRAGON', suit: 'spade' },
    { v: 11, n: '海怪', id: 'SEA_MONSTER', suit: 'heart' },
    { v: 10, n: '吸血鬼', id: 'VAMPIRE', suit: 'heart' },
    { v: 10, n: '狼人', id: 'WEREWOLF', suit: 'spade' },
    { v: 8, n: '巨魔', id: 'TROLL', suit: 'spade' },
    { v: 9, n: '夢魘', id: 'NIGHTMARE', suit: 'heart' },
    { v: 8, n: '死靈法師', id: 'NECROMANCER', suit: 'heart' },
    { v: 9, n: '沙蟲', id: 'SANDWORM', suit: 'spade' },
    { v: 7, n: '無頭騎士', id: 'HEADLESS', suit: 'heart' },
    { v: 7, n: '奇美拉', id: 'CHIMERA', suit: 'spade' },
    { v: 6, n: '魅魔', id: 'SUCCUBUS', suit: 'heart' },
    { v: 6, n: '美杜莎', id: 'MEDUSA', suit: 'spade' },
    { v: 5, n: '女巫', id: 'WITCH', suit: 'heart' },
    { v: 5, n: '石像鬼', id: 'GARGOYLE', suit: 'spade' },
    { v: 4, n: '科學怪人', id: 'FRANKENSTEIN', suit: 'heart' },
    { v: 4, n: '牛頭人', id: 'MINOTAUR', suit: 'spade' },
    { v: 3, n: '木乃伊', id: 'MUMMY', suit: 'heart' },
    { v: 3, n: '幽靈', id: 'GHOST', suit: 'spade' },
    { v: 2, n: '喪屍', id: 'ZOMBIE' },
    { v: 1, n: '骷髏', id: 'SKELETON' }
];
const SUITS = ['spade', 'club', 'heart', 'diamond'];
const SUIT_SYMBOLS = { spade: '♠', club: '♣', heart: '♥', diamond: '♦' };
const SPECIALS = { 
    MOON: { n: '月亮', v: 0, id: 'MOON' }, 
    PUMPKIN: { n: '南瓜', v: 0, id: 'PUMPKIN' },
    BLOOD: { n: '鮮血', v: 0, id: 'BLOOD' },
    RED_JOKER: { n: '紅小丑', v: 0, id: 'RED_JOKER' },
    BLUE_JOKER: { n: '藍小丑', v: 0, id: 'BLUE_JOKER' }
};

const CARD_GUIDE = [
    { id: 'RED_JOKER', n: '紅小丑', victory: '打出前，自己面前區有藍小丑。', effect: '選擇任何玩家面前區任意一張紅色牌，發動其效果。' },
    { id: 'BLUE_JOKER', n: '藍小丑', victory: '打出前，自己面前區有紅小丑。', effect: '選擇任何玩家面前區任意一張藍色牌，發動其效果。' },
    { id: 'CTHULHU', n: '克蘇魯', victory: '如果牌庫抽完且無人達成勝利條件，則持有克蘇魯的玩家獲勝。', effect: '所有玩家棄掉面前數值最大的一張牌（同數值只棄 1 張，可選擇哪一張）。' },
    { id: 'HELL_LORD', n: '地獄領主', victory: '打出時，猜中兩位玩家手牌。', effect: '猜兩位玩家手牌，猜中後放置於自己面前。' },
    { id: 'PUMPKIN_KING', n: '南瓜王', victory: '南瓜牌出現過後，同時打出骷髏／無頭騎士+南瓜王。', effect: '抽到必須打出，不能放入暗牌。可與骷髏／無頭騎士一起打出。' },
    { id: 'ALIEN', n: '外星人', victory: '打出前，除你以外，其他玩家都在叫糊狀態。', effect: '最終結算時，手持此牌，面前區每張牌點數加２。' },
    { id: 'DRAGON', n: '魔龍', victory: '打出前，自己面前區的牌點數總和大於或等於３０。', effect: '查看所有人手牌，並重新派發。' },
    { id: 'SEA_MONSTER', n: '海怪', victory: '打出前，自己面前區至少有１對數字相同的牌（１號２號不算）。', effect: '查看牌堆頂的１張牌再決定是否交換。' },
    { id: 'VAMPIRE', n: '吸血鬼', victory: '達成條件成功從暗牌中召喚。', effect: '鮮血牌出現後且面前區點數為 0 時可從暗牌堆拿出。' },
    { id: 'WEREWOLF', n: '狼人', victory: '月亮牌出現時手握此牌。', effect: '棄掉面前區數值最大的牌，包括狼人自己。' },
    { id: 'SANDWORM', n: '沙蟲', victory: '打出前，自己面前區至少有２張藍色牌，而且你是場上面前區最多藍色牌的玩家（平手不算）。', effect: '從別人面前選一張牌放到自己面前。' },
    { id: 'NIGHTMARE', n: '夢魘', victory: '打出前，自己面前區至少有２張紅色牌，而且你是場上面前區最多紅色牌的玩家（平手不算）。', effect: '查看暗牌及備用牌的卡。' },
    { id: 'NECROMANCER', n: '死靈法師', victory: '打出前，自己面前區至少有３張數值２以下的牌。', effect: '從棄牌區選一張放到自己面前。' },
    { id: 'TROLL', n: '巨魔', victory: '打出前，自己面前區至少有２張１０或以上的牌。', effect: '比手牌大，手牌較小的放在面前較大者面前。' },
    { id: 'HEADLESS', n: '無頭騎士', victory: '南瓜牌打出後，手上同時有骷髏和南瓜王。', effect: '所有玩家棄掉面前數值最小的一張牌。' },
    { id: 'CHIMERA', n: '奇美拉', victory: '打出前，自己面前區至少有５款不同妖怪。', effect: '令目標棄掉手牌於目標自己面前。' },
    { id: 'SUCCUBUS', n: '魅魔', victory: '被選擇的玩家勝利才能勝利，自己無法勝利。', effect: '秘密選擇一位玩家，該玩家勝利才能勝利。' },
    { id: 'MEDUSA', n: '美杜莎', victory: '打出前，所有玩家面前牌數目一樣，且每人至少１張。', effect: '所有玩家把６或以上的牌放於各自面前。' },
    { id: 'WITCH', n: '女巫', victory: '打出前，自己面前區至少有２張牌，而且你是場上面前區牌最少的玩家（平手不算）。', effect: '所有玩家把５或以下的牌放於各自面前。' },
    { id: 'GARGOYLE', n: '石像鬼', victory: '打出前，自己面前區至少有３張牌，而且你是場上面前區牌最多的玩家（平手不算）。', effect: '此回合免疫效果。' },
    { id: 'FRANKENSTEIN', n: '科學怪人', victory: '打出前，自己面前區至少有３張７-１０號的牌。', effect: '回合結束時可棄掉面前的科學怪人，額外獲得一回合。' },
    { id: 'MINOTAUR', n: '牛頭人', victory: '打出前，自己面前區至少有３張３-６號的牌。', effect: '查看別人手牌並選擇是否交換，額外獲得一回合。' },
    { id: 'MUMMY', n: '木乃伊', victory: '打出前，自己面前區的牌至少有三張順序遞增的牌。', effect: '比手牌小，手牌較大的放在面前較小者面前。' },
    { id: 'GHOST', n: '幽靈', victory: '打出前，自己面前區的牌至少有三張順序遞減的牌。', effect: '最終結算比點前，手拿幽靈可以移動一位玩家面前的一張牌。' },
    { id: 'ZOMBIE', n: '喪屍', victory: '打出前，自己面前區至少有兩張數字２／兩張數字１的牌。', effect: '選擇一位玩家棄掉面前一張牌。' },
    { id: 'SKELETON', n: '骷髏', victory: '南瓜牌打出後，手上同時有骷髏和南瓜王。', effect: '選擇一位玩家，猜其手牌兩個數值；猜中即可將該牌放到自己面前。' },
    { id: 'MOON', n: '月亮', victory: '無。', effect: '抽到時直接棄掉，抽牌補回。狼人的勝利條件之一。' },
    { id: 'PUMPKIN', n: '南瓜', victory: '無。', effect: '抽到時直接棄掉，抽牌補回。南瓜王的勝利條件之一。' },
    { id: 'BLOOD', n: '鮮血', victory: '無。', effect: '抽到時直接棄掉，抽牌補回。召喚吸血鬼的條件之一。' }
];


// ===== 取自 index1.html：判斷輔助 =====
function isJokerCard(card) { return card.id === 'RED_JOKER' || card.id === 'BLUE_JOKER'; }
function isRedCard(card) { return card.suit === 'heart' || card.suit === 'diamond' || card.id === 'RED_JOKER'; }
function isBlueCard(card) { return card.suit === 'club' || card.suit === 'spade' || card.id === 'BLUE_JOKER'; }
function targetableHandCards(player) { return player.hand.filter(card => !isJokerCard(card)); }
// 骷髏／地獄領主的目標：有手牌且未免疫（對方只有小丑時仍可選，但效果不觸發）
function getGuessTargets(p) {
    return state.players.filter(player =>
        player.id !== p.id && player.hand.length > 0 && !player.immune);
}
function getHellLordTargets(p) { return getGuessTargets(p); }
function isDark() { return !!(state && state.match && state.match.darkMode); }
// 尚未公開的牌（扣除棄牌、所有面前牌及該玩家自己的手牌），供骷髏／地獄領主猜牌參考
function unplayedCards(s, player) {
    const remaining = new Map();
    CARD_DEFS.forEach(def => {
        const count = (def.id === 'ZOMBIE' || def.id === 'SKELETON') ? 4 : 1;
        remaining.set(`${def.n}|${def.v}`, { name: def.n, value: def.v, count });
    });
    [SPECIALS.RED_JOKER, SPECIALS.BLUE_JOKER].forEach(c => remaining.set(`${c.n}|${c.v}`, { name: c.n, value: c.v, count: 1 }));
    [...s.discard, ...s.players.flatMap(o => o.front), ...player.hand].forEach(c => {
        const o = remaining.get(`${c.n}|${c.v}`);
        if (o) o.count--;
    });
    return [...remaining.values()].filter(o => o.count > 0);
}
function hasDescendingTriple(cards) {
    for (let first = 0; first < cards.length - 2; first++) {
        if (cards[first].v > cards[first + 1].v &&
            cards[first + 1].v > cards[first + 2].v) return true;
    }
    return false;
}

function hasAscendingTriple(cards) {
    for (let first = 0; first < cards.length - 2; first++) {
        if (cards[first].v < cards[first + 1].v &&
            cards[first + 1].v < cards[first + 2].v) return true;
    }
    return false;
}
function canWinWithGargoyle(p, frontCount) {
    return frontCount >= 3 &&
        state.players.every(other => other.id === p.id || other.front.length < frontCount);
}

function canWinWithFewestFrontCards(p, frontCount) {
    return frontCount >= 2 &&
        state.players.every(other => other.id === p.id || other.front.length > frontCount);
}

function canWinWithMostColorCards(p, front, colorCheck) {
    const colorCount = front.filter(colorCheck).length;
    return colorCount >= 2 &&
        state.players.every(other => other.id === p.id ||
            colorCount > other.front.filter(colorCheck).length);
}

function canWinWithEqualFrontCounts(p, frontCount) {
    return frontCount >= 1 &&
        state.players.every(other => other.id === p.id || other.front.length === frontCount);
}

function hasPairExcludingLowValues(cards) {
    const counts = {};
    cards.forEach(card => {
        if (card.v > 2) counts[card.v] = (counts[card.v] || 0) + 1;
    });
    return Object.values(counts).some(count => count >= 2);
}

function getZombieDiscardOptions(target, actorId, sourceCardUid) {
    return target.front
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => target.id !== actorId || card.uid !== sourceCardUid);
}
function getJokerEffectTargets(joker) {
    const matchesColor = joker.id === 'RED_JOKER' ? isRedCard : isBlueCard;
    return state.players.flatMap(player => player.front
        .map((card, index) => ({ player, card, index }))
        .filter(({ card }) => !isJokerCard(card) && matchesColor(card)));
}

// 狼人勝利：【月亮】打出（被抽到棄掉）時，手握【狼人】的玩家獲勝
function checkWerewolfWin(card) {
    if (card.id !== 'MOON' || state.gameOver) return;
    const holder = state.players.find(x => x.hand.some(c => c.id === 'WEREWOLF'));
    if (holder) declareWinner(holder, `${holder.name} 在【月亮】出現時手握【狼人】，獲得勝利！`);
}
// ===== 取自 index1.html：抽牌邏輯 =====
function drawCardLogic(player, isActiveTurn) {
    if (state.deck.length === 0) return null;
    let card = state.deck.pop();
    
    if (card.id === 'PUMPKIN' || card.id === 'MOON' || card.id === 'BLOOD') {
        const typeCls = card.id === 'BLOOD' ? 'blood' : 'win';
        
        if (isActiveTurn) {
            putToDiscard(card, `${player.name} 抽到道具牌【${card.n}】，直接棄掉`);
            if (state.gameOver) return { card: null, isItem: true };
            log(`🔔 ${player.name} 獲得額外一回合。`, typeCls);
            state.extraTurn = true; 
            return { card: null, isItem: true };
        } else {
            putToDiscard(card, `${player.name} 因效果抽到道具牌【${card.n}】，直接棄掉`);
            return { card: null, isItem: true };
        }
    }
    return { card, isItem: false };
}

// forceDraw：強制補牌。牌庫空時改抽備用牌；備用牌也空則抽不到。
// 抽到道具牌會棄掉並繼續抽，直到拿到怪物牌或兩邊都空。
function forceDraw(player, isActiveTurn = false) {
    // 先從主牌庫抽
    while (state.deck.length > 0) {
        const res = drawCardLogic(player, isActiveTurn);
        if (!res || state.gameOver) return null;
        if (!res.isItem && res.card) return res.card;
    }
    // 主牌庫空 → 被強制棄牌（失去手牌）的玩家，每人依序改抽 1 張備用牌補回；備用牌也空則抽不到
    while (state.reserves.length > 0) {
        const card = state.reserves.pop();
        if (card.id === 'PUMPKIN' || card.id === 'MOON' || card.id === 'BLOOD') {
            putToDiscard(card, `${player.name} 從備用牌抽到道具牌【${card.n}】，直接棄掉`);
            continue; // 道具牌棄掉繼續抽
        }
        log(`📦 ${player.name} 牌庫已空，從備用牌抽了 1 張牌補回（備用牌剩 ${state.reserves.length} 張）。`, 'sys');
        return card;
    }
    log(`📦 ${player.name} 牌庫與備用牌皆空，無法補抽。`, 'sys');
    return null;
}

// ===== 取自 index1.html：叫糊判定、打出後叫糊、有貢獻的面前牌 =====
function getTenpaiInfo(p, includeAlien = true) {
    const front = p.front;
    // 排除棄牌堆、所有玩家（包含自己）面前區已出現的牌
    const visibleTitles = new Set(state.discard.map(c => c.n));
    state.players.forEach(pl => {
        pl.front.forEach(c => visibleTitles.add(c.n));
    });

    const tenpaiList = [];

    const checkWin = (cardTitle, cardValue) => {
        switch(cardTitle) {
            case '克蘇魯': return false; 
            case '魔龍': return front.reduce((sum, c) => sum + (c.v || 0), 0) >= 30;
            case '骷髏':
                return state.discard.some(c => c.id === 'PUMPKIN') &&
                    p.hand.some(c => c.id === 'PUMPKIN_KING');
            case '海怪': return hasPairExcludingLowValues(front);
            case '巨魔': return front.filter(c => c.v >= 10).length >= 2;
            case '死靈法師': return front.filter(c => c.v <= 2).length >= 3;
            case '無頭騎士':
                return state.discard.some(c => c.id === 'PUMPKIN') &&
                    p.hand.some(c => c.id === 'PUMPKIN_KING');
            case '奇美拉': return new Set(front.map(c => c.n)).size >= 5;
            case '魅魔': return false;
            case '沙蟲': return canWinWithMostColorCards(p, front, isBlueCard);
            case '美杜莎': return canWinWithEqualFrontCounts(p, front.length);
            case '女巫': return canWinWithFewestFrontCards(p, front.length);
            case '石像鬼': {
                return canWinWithGargoyle(p, front.length);
            }
            case '科學怪人': return front.filter(c => c.v >= 7 && c.v <= 10).length >= 3;
            case '牛頭人': return front.filter(c => c.v >= 3 && c.v <= 6).length >= 3;
            case '木乃伊': return hasAscendingTriple(front);
            case '幽靈': return hasDescendingTriple(front);
            case '夢魘': return canWinWithMostColorCards(p, front, isRedCard);
            case '喪屍': {
                const count1 = front.filter(c => c.v === 1).length;
                const count2 = front.filter(c => c.v === 2).length;
                return count1 >= 2 || count2 >= 2;
            }
            default: return false;
        }
    };

    CARD_DEFS.forEach(def => {
        if (def.id === 'ZOMBIE') return;
        if (!includeAlien && def.id === 'ALIEN') return;
        if (visibleTitles.has(def.n)) return; 
        if (checkWin(def.n, def.v)) tenpaiList.push(def.n);
    });

    const visibleZombies = state.discard.filter(c => c.id === 'ZOMBIE').length +
        state.players.reduce((count, player) =>
            count + player.front.filter(c => c.id === 'ZOMBIE').length, 0);
    if (visibleZombies < 4 && checkWin('喪屍', 2)) {
        tenpaiList.push('喪屍');
    }

    // 小丑只要還沒出現在任何人面前區／棄牌區，就算還有機會（不洩漏它在暗牌、手牌或牌庫）
    const jokerSeen = id => state.discard.some(c => c.id === id) ||
        state.players.some(pl => pl.front.some(c => c.id === id));
    if (!jokerSeen('RED_JOKER') && front.some(c => c.id === 'BLUE_JOKER')) tenpaiList.push('紅小丑');
    if (!jokerSeen('BLUE_JOKER') && front.some(c => c.id === 'RED_JOKER')) tenpaiList.push('藍小丑');

    if (!visibleTitles.has('吸血鬼')) {
        const hasBlood = state.discard.some(c => c.id === 'BLOOD');
        const frontValue = p.front.reduce((sum, c) => sum + (c.v || 0), 0);
        if (hasBlood && frontValue === 0) tenpaiList.push('吸血鬼');
    }

    // 外星人叫糊：其他玩家都叫糊，而且自己沒有別的叫糊（只有「唯一沒叫糊」的那位玩家才會顯示叫外星人）
    if (includeAlien && !visibleTitles.has('外星人') && tenpaiList.filter(n => n !== '美杜莎').length === 0 && areOtherPlayersTenpai(p, true)) {
        tenpaiList.push('外星人');
    }

    return tenpaiList;
}

function areOtherPlayersTenpai(p, excludeMedusa = false) {
    return state.players.filter(other => other.id !== p.id)
        .every(other => {
            const list = getTenpaiInfo(other, false);
            if (excludeMedusa) {
                return list.filter(n => n !== '美杜莎').length > 0;
            }
            return list.length > 0;
        });
}

// 模擬打出某張牌後的叫糊列表（僅看面前區組成，不模擬複雜效果）
function getTenpaiAfterPlaying(p, cardToPlay) {
    p.front.push(cardToPlay);
    try {
        return getTenpaiInfo(p);
    } finally {
        p.front.pop();
    }
}

// 找出面前區中「對目前叫糊條件有貢獻」的牌（用於亮綠）
function getContributingFrontUids(front, tenpaiNames) {
    const uids = new Set();
    if (!tenpaiNames || tenpaiNames.length === 0 || front.length === 0) return uids;

    const has = (name) => tenpaiNames.includes(name);

    // 木乃伊：嚴格遞增的連續三張
    if (has('木乃伊')) {
        for (let i = 0; i < front.length - 2; i++) {
            if (front[i].v < front[i+1].v && front[i+1].v < front[i+2].v) {
                uids.add(front[i].uid); uids.add(front[i+1].uid); uids.add(front[i+2].uid);
            }
        }
    }
    // 幽靈：嚴格遞減的連續三張
    if (has('幽靈')) {
        for (let i = 0; i < front.length - 2; i++) {
            if (front[i].v > front[i+1].v && front[i+1].v > front[i+2].v) {
                uids.add(front[i].uid); uids.add(front[i+1].uid); uids.add(front[i+2].uid);
            }
        }
    }
    // 夢魘：紅色牌
    if (has('夢魘')) {
        front.forEach(c => { if (isRedCard(c)) uids.add(c.uid); });
    }
    // 沙蟲：藍色牌
    if (has('沙蟲')) {
        front.forEach(c => { if (isBlueCard(c)) uids.add(c.uid); });
    }
    // 巨魔：≥10
    if (has('巨魔')) {
        front.forEach(c => { if ((c.v || 0) >= 10) uids.add(c.uid); });
    }
    // 科學怪人：7–10
    if (has('科學怪人')) {
        front.forEach(c => { if ((c.v || 0) >= 7 && (c.v || 0) <= 10) uids.add(c.uid); });
    }
    // 牛頭人：3–6
    if (has('牛頭人')) {
        front.forEach(c => { if ((c.v || 0) >= 3 && (c.v || 0) <= 6) uids.add(c.uid); });
    }
    // 死靈法師：≤2
    if (has('死靈法師')) {
        front.forEach(c => { if ((c.v || 0) <= 2) uids.add(c.uid); });
    }
    // 喪屍：1 或 2
    if (has('喪屍')) {
        front.forEach(c => { if (c.v === 1 || c.v === 2) uids.add(c.uid); });
    }
    // 奇美拉：所有不同名稱的牌都算貢獻
    if (has('奇美拉')) {
        front.forEach(c => uids.add(c.uid));
    }
    // 石像鬼 / 女巫 / 美杜莎：主要看「數量」，全部亮
    if (has('石像鬼') || has('女巫') || has('美杜莎')) {
        front.forEach(c => uids.add(c.uid));
    }
    // 魔龍：總點數，全部亮
    if (has('魔龍')) {
        front.forEach(c => uids.add(c.uid));
    }
    // 海怪：成對的（排除 1、2）
    if (has('海怪')) {
        const counts = {};
        front.forEach(c => {
            if ((c.v || 0) > 2) counts[c.v] = (counts[c.v] || 0) + 1;
        });
        const pairVals = Object.keys(counts).filter(v => counts[v] >= 2).map(Number);
        front.forEach(c => { if (pairVals.includes(c.v)) uids.add(c.uid); });
    }
    // 紅/藍小丑
    if (has('紅小丑') || has('藍小丑')) {
        front.forEach(c => {
            if (c.id === 'RED_JOKER' || c.id === 'BLUE_JOKER') uids.add(c.uid);
        });
    }

    return uids;
}

// ===== 取自 index1.html：AI 輔助（僅把『名字是你』改為『非 AI 座位』）=====
function getPlayerTotalScore(player) {
    return player.front.reduce((sum, card) => sum + (card.v || 0), 0);
}

function getAIStrategicTarget(p, targets) {
    // 魅魔綁定者：能選別人就不對自己綁定的玩家出手（要協助他獲勝）
    if (p && p.bindTo != null) { const others = targets.filter(t => t.id !== p.bindTo); if (others.length > 0) targets = others; }
    return targets.slice().sort((a, b) => {
        const wins = state.match ? state.match.wins : [];
        const winsDifference = (wins[b.id] || 0) - (wins[a.id] || 0);
        const aTenpai = !isDark() && getTenpaiInfo(a).length > 0 ? 1 : 0;
        const bTenpai = !isDark() && getTenpaiInfo(b).length > 0 ? 1 : 0;
        return winsDifference ||
            bTenpai - aTenpai ||
            getPlayerTotalScore(b) - getPlayerTotalScore(a) ||
            (!isDark() ? getTenpaiInfo(b).length - getTenpaiInfo(a).length : 0);
    })[0];
}

function getAIThreatReduction(player, cardIndex) {
    if (isDark()) return 0;
    const tenpaiBefore = getTenpaiInfo(player);
    const removed = player.front.splice(cardIndex, 1)[0];
    state.discard.push(removed);
    let tenpaiAfter;
    try {
        tenpaiAfter = getTenpaiInfo(player);
    } finally {
        state.discard.pop();
        player.front.splice(cardIndex, 0, removed);
    }
    return tenpaiBefore.length - tenpaiAfter.length;
}

function getAIStrategicFrontCard(target) {
    return target.front
        .map((card, index) => ({
            card,
            index,
            threatReduction: getAIThreatReduction(target, index)
        }))
        .sort((a, b) =>
            b.threatReduction - a.threatReduction || (b.card.v || 0) - (a.card.v || 0))[0];
}

function getAIAttackCardIndex(p, hold) {
    const hasCalledOpponent = !isDark() && state.players.some(player =>
        player.id !== p.id && getTenpaiInfo(player).length > 0);
    const attackCardIds = hasCalledOpponent
        ? ['ZOMBIE', 'SANDWORM', 'CTHULHU', 'HEADLESS', 'RED_JOKER', 'BLUE_JOKER']
        : ['ZOMBIE', 'SANDWORM'];

    return p.hand.findIndex(card => {
        if (hold && hold.has(card.id)) return false;
        if (!attackCardIds.includes(card.id)) return false;
        if (card.id === 'ZOMBIE') {
            return state.players.some(target =>
                target.id !== p.id && !target.immune &&
                getZombieDiscardOptions(target, p.id, card.uid).length > 0);
        }
        if (card.id === 'SANDWORM') {
            return state.players.some(target =>
                target.id !== p.id && !target.immune && target.front.length > 0);
        }
        if (card.id === 'RED_JOKER' || card.id === 'BLUE_JOKER') {
            return getJokerEffectTargets(card).some(({ card: targetCard }) =>
                ['ZOMBIE', 'SANDWORM', 'CTHULHU', 'HEADLESS'].includes(targetCard.id));
        }
        return state.players.some(target =>
            target.id !== p.id && !target.immune && target.front.length > 0);
    });
}

function shouldAISwapHandCards(p, target) {
    const ownCard = targetableHandCards(p)[0];
    const targetCard = targetableHandCards(target)[0];
    if (!ownCard || !targetCard) return false;

    const nightmareActive = state.players.some(player =>
        player.hand.some(card => card.id === 'NIGHTMARE') ||
        player.front.some(card => card.id === 'NIGHTMARE'));
    return nightmareActive
        ? targetCard.v < ownCard.v
        : targetCard.v > ownCard.v;
}

// ===== 取自 index1.html：比大小、奇美拉 =====
function executeCompare(p, target, card) {
    const isTroll = card.id === 'TROLL';
    const myCard = targetableHandCards(p)[0];
    const opponentCard = targetableHandCards(target)[0];
    log(`➔ ${p.name} 與 ${target.name} 比手牌${isTroll ? '大' : '小'}。`, 'target');
    const myVal = myCard ? (myCard.v || 0) : null, oppVal = opponentCard ? (opponentCard.v || 0) : null;
    // 平手、或任一方手持小丑：一律同一句話，不洩漏誰拿小丑
    if (!myCard || !opponentCard || myVal === oppVal) { log(`➔ 沒有分出勝負，無事發生。`, 'target'); return; }
    const pLoses = isTroll ? myVal < oppVal : myVal > oppVal;
    const loser = pLoses ? p : target, winner = pLoses ? target : p;
    const lost = pLoses ? myCard : opponentCard;
    log(`➔ ${p.name} (手牌 ${myVal}) 與 ${target.name} (手牌 ${oppVal})：${loser.name} 較${isTroll ? '小' : '大'}，將手牌 ${lost.n} 放在 ${winner.name} 面前。`, 'target');
    loser.hand.splice(loser.hand.indexOf(lost), 1);
    winner.front.push(lost);
    const drawn = forceDraw(loser, false);
    if (drawn) loser.hand.push(drawn);
    log(`➔ ${loser.name} 失去手牌，補抽 1 張牌。`, 'sys');
}
function executeChimeraEffect(target) {
    if (target.immune) {
        log(`　- ${target.name} 獲得【石像鬼】免疫，不受影響。`, 'immune');
        return;
    }
    
    const handCards = targetableHandCards(target);
    if (handCards.length > 0) {
        target.hand = target.hand.filter(isJokerCard);
        target.front.push(...handCards);
        log(`➔ ${target.name} 將手牌 [${handCards.map(c=>c.n).join(', ')}] 放到了面前區。`, 'chimera');
    } else log(`➔ 【奇美拉】對 ${target.name} 沒有產生效果。`, 'chimera'); // 手牌是小丑時不點明

    if (target.hand.length === 0) {
        const drawn = forceDraw(target, false);
        if (drawn) {
            target.hand.push(drawn);
            log(`➔ ${target.name} 從牌庫重抽了 1 張牌。`, 'chimera');
        }
    }
}

// ===== 取自 index1.html：勝利條件 =====
function checkVictoryCondition(p, card) {
    const front = p.front; 
    const prevFront = front.filter(c => c.uid !== card.uid); 
    
    switch(card.id) {
        case 'DRAGON': return prevFront.reduce((sum, c) => sum + (c.v || 0), 0) >= 30;
        case 'SEA_MONSTER': return hasPairExcludingLowValues(prevFront);
        case 'HELL_LORD': return false;
        case 'ALIEN':
            return areOtherPlayersTenpai(p, true);
        case 'WEREWOLF': return false;
        case 'TROLL': return prevFront.filter(c => c.v >= 10).length >= 2;
        case 'NECROMANCER': return prevFront.filter(c => c.v <= 2).length >= 3;
        case 'HEADLESS': return false;
        case 'CHIMERA': {
            const uniqueNames = new Set(prevFront.map(c => c.n));
            return uniqueNames.size >= 5;
        }
        case 'SANDWORM': return canWinWithMostColorCards(p, prevFront, isBlueCard);
        case 'RED_JOKER': return prevFront.some(c => c.id === 'BLUE_JOKER');
        case 'BLUE_JOKER': return prevFront.some(c => c.id === 'RED_JOKER');
        case 'NIGHTMARE': return canWinWithMostColorCards(p, prevFront, isRedCard);
        case 'MEDUSA':
            return canWinWithEqualFrontCounts(p, prevFront.length);
        case 'WITCH': {
            return canWinWithFewestFrontCards(p, prevFront.length);
        }
        case 'GARGOYLE': return canWinWithGargoyle(p, prevFront.length);
        case 'FRANKENSTEIN': return prevFront.filter(c => c.v >= 7 && c.v <= 10).length >= 3;
        case 'MINOTAUR': return prevFront.filter(c => c.v >= 3 && c.v <= 6).length >= 3;
        case 'MUMMY':
            return hasAscendingTriple(prevFront);
        case 'GHOST': return hasDescendingTriple(prevFront);
        case 'ZOMBIE': {
            const count1 = prevFront.filter(c => c.v === 1).length;
            const count2 = prevFront.filter(c => c.v === 2).length;
            return count1 >= 2 || count2 >= 2;
        }
        default: return false;
    }
}

// ===================== 群魔 Chaos 規則引擎（核心 v1）=====================
// 純規則、不碰 DOM。state 為可序列化的純資料（之後可直接寫進 Firebase）。
// 對外介面：newGame(specs) / act(state, playerId, action) / aiStep(state) / setSeed(n)
// 尚未移植的牌效果會記錄在 state.unported，方便逐批補上。
let state = null;
let rand = Math.random;
let uidSeq = 0;
function setSeed(seed) {
    let a = seed >>> 0;
    rand = function () {
        a |= 0; a = a + 0x6D2B79F5 | 0;
        let t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function log(msg, type = '') { state.log.push({ msg, type }); if (state.log.length > 300) state.log.shift(); }
function logSys(msg) { log(msg, 'sys'); }
function putToDiscard(cards, sourceText) {
    if (!Array.isArray(cards)) cards = [cards];
    if (cards.length === 0) return;
    cards.forEach(c => state.discard.push(c));
    log(`🗑️ ${sourceText} ➔ ${cards.map(c => `【${c.n}】`).join('、')} 進入棄牌堆 (目前共 ${state.discard.length} 張)`, 'discard');
    cards.forEach(checkWerewolfWin); // 月亮一進棄牌堆，手握狼人者立即勝利（不必等到他的回合）
}
const cur = () => state.players[state.currentTurn];
const ok = () => ({ ok: true });
const err = (e) => ({ ok: false, error: e });

// ---------- 開局 ----------
// opts.darkMode：新比賽的模式（true＝暗牌，false＝全明牌）；opts.match：沿用上一局的比賽（勝場、局數、模式）；opts.target：幾勝制（預設 2）
function newGame(specs, opts) {
    opts = opts || {};
    uidSeq = 0;
    const prev = opts.match;
    const match = prev
        ? { wins: prev.wins.slice(), round: prev.round + 1, target: prev.target, darkMode: prev.darkMode, finished: false, champions: [] }
        : { wins: specs.map(() => 0), round: 1, target: opts.target || 2, darkMode: opts.darkMode !== false, finished: false, champions: [] };
    state = {
        match,
        players: [], deck: [], discard: [], centerCards: [], centerTouched: [[], [], []], reserves: [],
        currentTurn: 0, turnNo: 0, gameOver: false, winners: [], extraTurn: false, reserveDrawOk: false,
        phase: 'DRAW', prompt: null, pendingSlot: null, skipFrankensteinOnce: false,
        initialDeckSize: 0, log: [], unported: []
    };
    let deck = [];
    CARD_DEFS.forEach(def => {
        const count = (def.id === 'ZOMBIE' || def.id === 'SKELETON') ? 4 : 1;
        for (let i = 0; i < count; i++) {
            const suit = (def.id === 'ZOMBIE' || def.id === 'SKELETON') ? SUITS[i] : def.suit;
            deck.push({ ...def, suit: suit || null, uid: 'c' + (uidSeq++) });
        }
    });
    const vampire = deck.find(c => c.id === 'VAMPIRE'); deck = deck.filter(c => c.id !== 'VAMPIRE');
    const werewolf = deck.find(c => c.id === 'WEREWOLF'); deck = deck.filter(c => c.id !== 'WEREWOLF');
    const moon = { ...SPECIALS.MOON, uid: 'moon' };
    const pumpkin = { ...SPECIALS.PUMPKIN, uid: 'pumpkin' };
    const blood = { ...SPECIALS.BLOOD, uid: 'blood' };
    shuffle(deck);
    state.centerCards = [vampire, { ...SPECIALS.RED_JOKER, uid: 'red-joker' }, { ...SPECIALS.BLUE_JOKER, uid: 'blue-joker' }];
    state.reserves = Array.from({ length: Math.max(0, specs.length - 1) }, () => deck.pop()); // 備用牌數 = 玩家數 - 1
    const n = deck.length, base = Math.floor(n / 3), rem = n % 3;
    // 除不盡時餘數優先加到最後 1/3（bot），其次中間 1/3（mid）：餘1 → base,base,base+1；餘2 → base,base+1,base+1
    const midLen = base + (rem === 2 ? 1 : 0);
    const top = deck.slice(0, base), mid = deck.slice(base, base + midLen), bot = deck.slice(base + midLen);
    top.push(werewolf); shuffle(top);
    mid.push(pumpkin); shuffle(mid);
    bot.push(moon, blood); shuffle(bot);
    state.deck = [...bot, ...mid, ...top];
    state.initialDeckSize = state.deck.length;
    specs.forEach((sp, i) => {
        const p = { id: i, name: sp.name, isAI: !!sp.isAI, uid: sp.uid || null, hand: [], front: [], immune: false,
                    knownCenter: [], knownReserves: [], bindTo: null };
        const k = state.deck.findIndex(c => c.id !== 'PUMPKIN' && c.id !== 'MOON' && c.id !== 'BLOOD');
        if (k !== -1) p.hand.push(state.deck.splice(k, 1)[0]);
        state.players.push(p);
    });
    logSys('🎮 遊戲開始！');
    beginTurn();
    return state;
}

// ---------- 回合流程 ----------
function beginTurn() {
    if (state.gameOver) return;
    state.turnNo++;
    if (state.deck.length === 0 && !(state.reserveDrawOk && state.reserves.length > 0)) { settleDeckEmpty(); return; }
    const p = cur();
    if (p.immune) { p.immune = false; log(`🛡️ ${p.name} 的【石像鬼】免疫效果結束。`, 'sys'); }
    state.phase = 'DRAW';
}
function endTurn() {
    if (state.gameOver) return;
    const p = cur();
    const hasF = !state.skipFrankensteinOnce && p.front.some(c => c.id === 'FRANKENSTEIN');
    state.skipFrankensteinOnce = false;
    if (hasF) { state.prompt = { type: 'frankenstein', playerId: p.id }; state.phase = 'PROMPT'; return; }
    advanceTurn();
}
function advanceTurn() {
    if (!state.extraTurn) { state.currentTurn = (state.currentTurn + 1) % state.players.length; state.reserveDrawOk = false; }
    else { log(`✨ ${cur().name} 獲得額外回合！`, 'win'); state.extraTurn = false; state.reserveDrawOk = true; } // 額外回合：牌庫為 0 時可抽 1 張備用牌補回
    beginTurn();
}
// 小局結束：累計勝場，先達 target 勝者贏得整場比賽
function finishSmallRound() {
    const m = state.match;
    state.winners.forEach(id => { m.wins[id] = (m.wins[id] || 0) + 1; });
    const champs = state.players.filter(p => (m.wins[p.id] || 0) >= m.target);
    if (champs.length > 0) {
        m.finished = true; m.champions = champs.map(p => p.id);
        log(`🏆 比賽結束！${champs.map(p => p.name).join('、')} 最先取得 ${m.target} 小局勝利！`, 'win');
    }
}
function declareWinner(winner, reasonText) {
    if (state.gameOver) return;
    state.gameOver = true; state.phase = 'OVER'; state.prompt = null;
    state.players.forEach(pl => { if (pl.bindTo != null) log(`💖 ${pl.name} 的【魅魔】綁定的是【${state.players[pl.bindTo].name}】。`, 'succubus'); });
    if (winner.bindTo != null) {
        log(`💔 ${winner.name} 持有【魅魔】並已綁定其他玩家，自己觸發勝利條件無效 → 判定無人勝利！`, 'succubus');
        log(`🏆 遊戲結束：無人勝利（${winner.name} 已綁定【魅魔】，原本觸發的勝利無效：${reasonText.replace(/，?獲得勝利！?$/, '')}）`, 'win');
        state.winners = []; finishSmallRound(); return;
    }
    log(`🏆 ${reasonText}`, 'win');
    state.winners = [winner.id];
    state.players.forEach(p => {
        if (p.id !== winner.id && p.bindTo === winner.id) {
            log(`💖 ${p.name} 的【魅魔】綁定了【${winner.name}】，觸發共同勝利！`, 'succubus');
            state.winners.push(p.id);
        }
    });
    finishSmallRound();
}
function settleDeckEmpty() {
    const cth = state.players.find(p => p.hand.some(c => c.id === 'CTHULHU'));
    if (cth) { declareWinner(cth, `牌庫抽完！${cth.name} 持有【克蘇魯】，獲得勝利！`); return; }
    const ghost = state.players.find(p => p.hand.some(c => c.id === 'GHOST'));
    if (ghost) {
        log(`👻 牌庫抽完！${ghost.name} 持有【幽靈】，可以移動面前區的一張牌！`, 'sys');
        if (!ghost.isAI) { openPrompt({ type: 'ghostSettle', playerId: ghost.id }); return; }
        const mv = aiBestGhostMove(ghost);
        if (mv) {
            const moved = mv.target.front.splice(mv.index, 1)[0];
            ghost.front.push(moved);
            log(`👻 ${ghost.name} 的【幽靈】將【${mv.target.name}】面前的【${moved.n} (${moved.v})】移動到了自己面前。`, 'sys');
        } else log(`👻 ${ghost.name} 的【幽靈】放棄了移動。`, 'sys');
    }
    finishSettlement();
}
// ---- AI：最終結算前的【幽靈】移牌（挑最能逆轉賽果的一張，或不移動）----
// 他人手牌：全明牌模式看得到；暗牌模式只能用「尚未出現的牌」的平均點數估計
function aiSettleTotals(viewer) {
    const unseen = isDark() ? aiUnseenValues(viewer) : [];
    const wsum = unseen.reduce((a, o) => a + o.weight, 0);
    const mean = wsum ? unseen.reduce((a, o) => a + o.value * o.weight, 0) / wsum : 0;
    return state.players.map(pl => {
        const front = pl.front.reduce((a, c) => a + (c.v || 0), 0);
        const known = pl.id === viewer.id || !isDark();
        const alien = known && pl.hand.some(c => c.id === 'ALIEN') ? pl.front.length * 2 : 0;
        const hand = known ? pl.hand.reduce((a, c) => a + (c.v || 0), 0) : pl.hand.length * mean;
        return front + alien + hand;
    });
}
function aiBestGhostMove(p) {
    // 沒綁定魅魔：要自己點數最高；已綁定：要綁定對象點數最高（自己贏會變成無人勝利）
    const goal = p.bindTo != null ? p.bindTo : p.id;
    const evaluate = () => {
        const t = aiSettleTotals(p);
        let best = -Infinity, w = -1;                       // 同分由座位在前者勝（與 finishSettlement 相同）
        t.forEach((v, i) => { if (v > best) { best = v; w = i; } });
        const rival = Math.max(...t.filter((_, i) => i !== goal));
        return (w === goal ? 1000 : 0) + (t[goal] - rival);
    };
    let bestMove = null, bestScore = evaluate();             // 不移動也是一種選擇
    state.players.forEach(t => {
        for (let i = 0; i < t.front.length; i++) {
            const moved = t.front.splice(i, 1)[0]; p.front.push(moved);
            const sc = evaluate();
            p.front.pop(); t.front.splice(i, 0, moved);
            if (sc > bestScore) { bestScore = sc; bestMove = { target: t, index: i }; }
        }
    });
    return bestMove;
}
function finishSettlement() {
    let best = -1, winner = null; const texts = [];
    const rows = []; // 給介面「最終比點動畫」用的結構化資料
    const slim = c => ({ id: c.id, n: c.n, v: c.v || 0, suit: c.suit, uid: c.uid });
    state.players.forEach(p => {
        const baseFront = p.front.reduce((s, c) => s + (c.v || 0), 0);
        const alien = p.hand.some(c => c.id === 'ALIEN') ? p.front.length * 2 : 0;
        const hand = p.hand.reduce((s, c) => s + (c.v || 0), 0);
        const total = baseFront + alien + hand;
        rows.push({ id: p.id, name: p.name, fronts: p.front.map(slim), alien, hand: p.hand.map(slim), total });
        texts.push(`${p.name}：面前 ${baseFront}${alien ? ` + 外星人加成 ${alien}` : ''} + 手牌 ${hand} = ${total} 點`);
        if (total > best) { best = total; winner = p; }
    });
    log('🏆 結算全場總點數 (面前+手牌)：', 'win'); log(`📊 ${texts.join(' | ')}`, 'sys');
    if (winner) declareWinner(winner, `${winner.name} 總點數是 ${best}，獲得勝利！`);
    state.settlement = { rows, winnerIds: (state.winners || []).slice() };
}

// ---------- 玩家動作 ----------
function act(s, pid, a) {
    state = s;
    if (s.gameOver) return err('遊戲已結束');
    if (s.prompt) {
        if (a.type !== 'answer' || s.prompt.playerId !== pid) return err('等待其他玩家回應');
        return answerPrompt(a);
    }
    if (s.currentTurn !== pid) return err('未輪到你');
    switch (a.type) {
        case 'draw': return doDraw();
        case 'take': return doTake(a.slot);
        case 'return': return doReturn(a.handIndex);
        case 'play': return doPlay(a.handIndex, a.companionIndex);
    }
    return err('未知動作');
}
// 額外回合＋牌庫為 0：抽 1 張備用牌補回（之後打出一張牌，才進入最終結算）
function drawReserveForExtraTurn(p) {
    while (state.reserves.length > 0) {
        const card = state.reserves.pop();
        if (card.id === 'PUMPKIN' || card.id === 'MOON' || card.id === 'BLOOD') { putToDiscard(card, `${p.name} 從備用牌抽到道具牌【${card.n}】，直接棄掉`); if (state.gameOver) return ok(); continue; }
        state.reserveDrawOk = false;
        p.hand.push(card);
        log(`📦 ${p.name} 獲得額外回合且牌庫已空，從備用牌抽了 1 張牌補回（備用牌剩 ${state.reserves.length} 張）。`, 'sys');
        state.phase = 'PLAY';
        return ok();
    }
    settleDeckEmpty(); return ok();
}
function doDraw() {
    if (state.phase !== 'DRAW') return err('現在不能抽牌');
    const p = cur();
    if (state.deck.length === 0 && state.reserveDrawOk && state.reserves.length > 0) { logSys(`${p.name} 進行抽牌。`); return drawReserveForExtraTurn(p); }
    logSys(`${p.name} 進行抽牌。`);
    const res = drawCardLogic(p, true);
    if (state.gameOver) return ok();
    if (!res) { if (state.deck.length === 0) settleDeckEmpty(); return ok(); }
    if (res.isItem) {
        state.extraTurn = false; // 道具牌：同一玩家重新抽牌（沿用原版行為）
        if (state.deck.length === 0) {
            if (state.reserves.length > 0) { state.reserveDrawOk = true; state.phase = 'DRAW'; return ok(); } // 額外抽牌：牌庫空時改抽備用牌
            settleDeckEmpty(); return ok();
        }
        state.phase = 'DRAW'; return ok();
    }
    p.hand.push(res.card);
    log(`${p.name} 抽了一張牌。`, 'sys');
    state.phase = 'PLAY';
    return ok();
}
function doTake(slot) {
    if (state.phase !== 'DRAW') return err('現在不能拿暗牌');
    const p = cur();
    if (p.hand.some(c => c.id === 'PUMPKIN_KING')) return err('手上有南瓜王，不能拿暗牌');
    const taken = state.centerCards[slot];
    if (!taken) return err('該暗牌位置是空的');
    state.centerTouched[slot].push(p.id); // 記錄誰動過這張暗牌（牌面不公開）
    const canSummon = state.discard.some(c => c.id === 'BLOOD') && p.front.reduce((s, c) => s + (c.v || 0), 0) === 0;
    if (taken.id === 'VAMPIRE') {
        if (canSummon) {
            state.centerCards[slot] = null; p.front.push(taken);
            declareWinner(p, `${p.name} 在【鮮血】出現後，且面前無牌，成功從暗牌召喚出【吸血鬼】，獲得勝利！`); return ok();
        }
        // 召喚失敗：吸血鬼留在原位（不進手牌），回合直接結束；AI 的失敗不公開牌名
        logSys(`${p.name} 將一張牌放回暗牌區第 ${slot + 1} 張，回合結束。`);
        endTurn(); return ok();
    }
    state.pendingSlot = slot; p.hand.push(taken); state.centerCards[slot] = null;
    logSys(`${p.name} 從暗牌區第 ${slot + 1} 張拿了一張牌，請選擇一張手牌放回。`);
    state.phase = 'RETURN';
    return ok();
}
function doReturn(handIndex) {
    if (state.phase !== 'RETURN') return err('現在不能放回暗牌');
    const p = cur(), card = p.hand[handIndex];
    if (!card) return err('沒有這張手牌');
    if (card.id === 'PUMPKIN_KING') return err('南瓜王不能放回暗牌');
    p.hand.splice(handIndex, 1);
    state.centerCards[state.pendingSlot] = card;
    p.knownCenter[state.pendingSlot] = card.uid;
    logSys(`${p.name} 將一張牌放回暗牌區第 ${state.pendingSlot + 1} 張，回合結束。`);
    state.pendingSlot = null;
    endTurn(); return ok();
}
function doPlay(index, companionIndex) {
    const p = cur();
    // 一般在 PLAY 階段出牌；手牌已有 2 張以上時（AI 沿用原版行為）也可在 DRAW 階段直接出牌
    if (!(state.phase === 'PLAY' || (state.phase === 'DRAW' && p.hand.length >= 2))) return err('現在不能出牌');
    const card = p.hand[index];
    if (!card) return err('沒有這張手牌');
    const pk = p.hand.find(c => c.id === 'PUMPKIN_KING');
    const pair = companionIndex !== undefined && companionIndex >= 0;
    if (pk && !pair && card.id !== 'PUMPKIN_KING' && card.id !== 'SKELETON' && card.id !== 'HEADLESS') return err('手上有南瓜王，必須優先打出南瓜王相關牌');
    if (pair) {
        const companion = p.hand[companionIndex];
        if (!pk || !companion || (companion.id !== 'SKELETON' && companion.id !== 'HEADLESS')) return err('南瓜王只能與骷髏／無頭騎士一起打出');
        p.hand = p.hand.filter(c => c.uid !== pk.uid && c.uid !== companion.uid);
        p.front.push(pk, companion);
        if (state.discard.some(c => c.id === 'PUMPKIN')) {
            declareWinner(p, `${p.name} 在【南瓜】出現後，同時打出【南瓜王】與【${companion.n}】，觸發勝利！`); return ok();
        }
        log(`🎃 ${p.name} 同時打出【南瓜王】與【${companion.n}】（尚未出現南瓜，不觸發勝利），執行【${companion.n}】效果並補抽 1 張。`, 'sys');
        const drawn = forceDraw(p, false);
        if (drawn) { p.hand.push(drawn); logSys(`➔ ${p.name} 因同時打出南瓜王組合，從牌庫補抽了一張牌。`); }
        if (!resolveEffect(p, companion)) endTurn();
        return ok();
    }
    const wins = checkVictoryCondition(p, card);
    p.hand.splice(index, 1);
    p.front.push(card);
    log(`▶️ ${p.name} 打出了 ${card.n} (${card.v})，置於面前區。`);
    if (wins) { const gd = CARD_GUIDE.find(g => g.id === card.id); declareWinner(p, `${p.name} 觸發【${card.n}】的勝利條件${gd && gd.victory ? '（' + gd.victory.replace(/。$/, '') + '）' : ''}，獲得勝利！`); return ok(); }
    if (!resolveEffect(p, card)) endTurn();
    return ok();
}

// ---------- 效果（逐批移植中）----------
// 效果函式回傳 true = 已開啟 prompt（等待某位玩家回應），呼叫端不可自行 endTurn；
// 玩家回應後由 PROMPTS 內對應的處理函式接手，完成才結束回合。
// 非 AI 座位（真人）有選擇時開 prompt；AI 座位直接沿用原版的自動決策。
const NO_EFFECT = ['PUMPKIN_KING', 'ALIEN', 'FRANKENSTEIN', 'GHOST'];
function openPrompt(pr) { state.prompt = pr; state.phase = 'PROMPT'; return true; }
function discardFront(pl, idx, text) { putToDiscard(pl.front.splice(idx, 1)[0], text); }

// 克蘇魯／無頭騎士：每位玩家棄掉面前極端值的牌（同值只棄 1 張，真人可選）。從第 from 位玩家開始，遇到真人需選擇就暫停。
function extremeDiscard(src, mode, from) {
    for (let i = from; i < state.players.length; i++) {
        const pl = state.players[i];
        if (pl.immune) { log(`　- ${pl.name} 獲得【石像鬼】免疫，不受影響。`, 'immune'); continue; }
        const cands = pl.front.map((c, index) => ({ card: c, index })).filter(({ card }) => card.uid !== src.uid);
        if (cands.length === 0) { log(`　- ${pl.name} 面前沒有可棄的牌。`, 'sys'); continue; }
        const vals = cands.map(x => x.card.v || 0);
        const ev = mode === 'max' ? Math.max(...vals) : Math.min(...vals);
        const ext = cands.filter(x => (x.card.v || 0) === ev);
        if (ext.length === 1) { discardFront(pl, ext[0].index, `${pl.name} 因【${src.n}】效果棄掉`); continue; }
        if (pl.isAI) {
            const sel = ext.map(o => ({ ...o, threat: getAIThreatReduction(pl, o.index) })).sort((x, y) => y.threat - x.threat || rand() - 0.5)[0];
            discardFront(pl, sel.index, `${pl.name} 因【${src.n}】效果棄掉`); continue;
        }
        return openPrompt({ type: 'extremeDiscard', playerId: pl.id, mode, sourceUid: src.uid, sourceName: src.n, nextIndex: i + 1, options: ext.map(x => x.index) });
    }
    return false;
}
function handToFront(card) { // 美杜莎／女巫
    const threshold = card.id === 'MEDUSA' ? 6 : 5, sign = card.id === 'MEDUSA' ? '≥' : '≤';
    log(`➔ 所有玩家將手牌中 ${sign}${threshold} 的牌放到自己面前：`, 'target');
    state.players.forEach(pl => {
        if (pl.immune) { log(`　- ${pl.name} 獲得【石像鬼】免疫，不受影響。`, 'immune'); return; }
        const mv = targetableHandCards(pl).filter(c => card.id === 'MEDUSA' ? c.v >= threshold : c.v <= threshold);
        if (mv.length > 0) {
            pl.front.push(...mv); pl.hand = pl.hand.filter(c => !mv.includes(c));
            log(`　- ${pl.name} 將手牌 [${mv.map(c => c.n).join(', ')}] 放到了面前區。`, 'sys');
        }
    });
    state.players.forEach(pl => {
        if (pl.hand.length === 0 && state.deck.length > 0) {
            const drawn = forceDraw(pl, false);
            if (drawn) { pl.hand.push(drawn); log(`　- ${pl.name} 抽了 1 張牌補回手牌。`, 'sys'); }
        }
    });
    return false;
}
function compareEffect(p, card) { // 巨魔／木乃伊
    const targets = state.players.filter(x => x.id !== p.id && x.hand.length > 0 && !x.immune); // 手牌是小丑也可被選，才不會洩漏
    if (targets.length === 0 || p.hand.length === 0) { log('➔ 沒有可比較的目標（可能免疫）。', 'sys'); return false; }
    if (p.isAI) { executeCompare(p, aiPickCompareTarget(p, targets, card), card); return false; }
    return openPrompt({ type: 'compareTarget', playerId: p.id, cardId: card.id, targets: targets.map(t => t.id) });
}
const EFFECTS = {
    NIGHTMARE(p) {
        p.knownCenter = state.centerCards.map(c => c ? c.uid : null);
        p.knownReserves = state.reserves.map(c => c ? c.uid : null);
        log(`🌑 ${p.name} 打出了【夢魘】，查看了當下的暗牌區與備用牌；之後暗牌若被換走，夢魘不會知道新牌。`, 'nightmare');
        return false;
    },
    CTHULHU(p, card) { log('➔ 所有玩家必須棄掉面前數值最大的牌（同數值只棄 1 張，可選擇）：', 'target'); return extremeDiscard(card, 'max', 0); },
    HEADLESS(p, card) { log('➔ 所有玩家必須棄掉面前數值最小的牌（同數值只棄 1 張，可選擇）：', 'target'); return extremeDiscard(card, 'min', 0); },
    DRAGON() {
        const by = state.players.map(pl => targetableHandCards(pl));
        const shuffled = shuffle(by.flat()); let k = 0;
        state.players.forEach((pl, i) => {
            const n = by[i].length; const nc = shuffled.slice(k, k + n); k += n;
            pl.hand = pl.hand.filter(isJokerCard).concat(nc);
        });
        log('➔ 所有非小丑手牌已重新洗牌派發，小丑不受影響。', 'target'); return false;
    },
    WEREWOLF(p) {
        let di = 0;
        p.front.forEach((fc, i) => { if ((fc.v || 0) >= (p.front[di].v || 0)) di = i; });
        discardFront(p, di, `${p.name} 因【狼人】效果棄掉面前數值最大的牌`); return false;
    },
    MEDUSA(p, card) { return handToFront(card); },
    WITCH(p, card) { return handToFront(card); },
    GARGOYLE(p) { p.immune = true; log(`➔ ${p.name} 獲得免疫效果，持續到下個自己的回合開始前。`, 'immune'); return false; },
    TROLL: compareEffect,
    MUMMY: compareEffect,
    ZOMBIE(p, card) {
        const valid = state.players.filter(x => getZombieDiscardOptions(x, p.id, card.uid).length > 0 && !x.immune);
        if (valid.length === 0) { log(`🧟 ${p.name} 的【喪屍】找不到可棄牌的目標。`, 'sys'); return false; }
        if (!p.isAI) return openPrompt({ type: 'zombieTarget', playerId: p.id, sourceUid: card.uid, targets: valid.map(t => t.id) });
        const opps = valid.filter(t => t.id !== p.id);
        const target = getAIStrategicTarget(p, opps.length > 0 ? opps : valid);
        const sel = getZombieDiscardOptions(target, p.id, card.uid)
            .map(o => ({ ...o, threatReduction: getAIThreatReduction(target, o.index) }))
            .sort((x, y) => y.threatReduction - x.threatReduction || (y.card.v || 0) - (x.card.v || 0))[0];
        discardFront(target, sel.index, `${target.name} 因【喪屍】效果被迫棄掉面前的牌`); return false;
    },
    SANDWORM(p) {
        const opps = state.players.filter(x => x.id !== p.id && x.front.length > 0 && !x.immune);
        if (opps.length === 0) { log(`🃏 ${p.name} 的【沙蟲】想奪取別人的牌，但沒有目標。`, 'sys'); return false; }
        if (!p.isAI) return openPrompt({ type: 'sandwormPick', playerId: p.id, targets: opps.map(t => t.id) });
        const opp = getAIStrategicTarget(p, opps), sel = getAIStrategicFrontCard(opp);
        const stolen = opp.front.splice(sel.index, 1)[0]; p.front.push(stolen);
        log(`🃏 ${p.name} 的【沙蟲】從【${opp.name}】面前奪取了【${stolen.n} (${stolen.v})】放入自己面前。`, 'joker');
        if (stolen.id === 'MINOTAUR') { // AI 奪得牛頭人：一律棄掉換額外回合
            const i = p.front.findIndex(c => c.uid === stolen.uid);
            if (i !== -1) { discardFront(p, i, `${p.name} 因【沙蟲】奪得【牛頭人】後選擇棄掉`); state.extraTurn = true; log(`🐂 ${p.name} 選擇棄掉奪得的【牛頭人】，獲得額外回合。`, 'target'); }
        }
        return false;
    },
    NECROMANCER(p) {
        if (state.discard.length === 0) { log(`🧙 ${p.name} 的【死靈法師】想從棄牌堆拿牌，但棄牌堆是空的。`, 'sys'); return false; }
        if (!p.isAI) return openPrompt({ type: 'necroPick', playerId: p.id });
        let best = 0;
        for (let i = 1; i < state.discard.length; i++) if ((state.discard[i].v || 0) > (state.discard[best].v || 0)) best = i;
        const picked = state.discard.splice(best, 1)[0]; p.front.push(picked);
        log(`🧙 ${p.name} 的【死靈法師】從棄牌堆復活了【${picked.n} (${picked.v})】放入自己面前。`, 'effect'); return false;
    },
    SKELETON(p) {
        const targets = getGuessTargets(p);
        if (targets.length === 0) { log(`💀 ${p.name} 的【骷髏】沒有可猜測的目標（無手牌或已免疫）。`, 'sys'); return false; }
        if (!p.isAI) return openPrompt({ type: 'skeletonGuess', playerId: p.id, targets: targets.map(t => t.id) });
        const g1 = aiPickGuess(p), g2 = aiPickGuess(p, [g1]);
        skeletonGuess(p, getAIStrategicTarget(p, targets), [g1, g2]); return false;
    },
    HELL_LORD(p, card, ctx) {
        const canWin = !(ctx && ctx.copy);
        const targets = getHellLordTargets(p);
        if (targets.length < 2) { log(`😈 ${p.name} 的【地獄領主】沒有兩位可猜測的玩家，效果無法完成。`, 'sys'); return false; }
        if (!p.isAI) return openPrompt({ type: 'hellLord', playerId: p.id, canWin, targets: targets.map(t => t.id) });
        const vals = targets.slice(0, 2).map(t => aiPickGuess(p));
        if (p.bindTo != null && canWin) vals[1] = 0; // 已綁定魅魔：兩次都猜中會變成無人勝利 → 故意讓第二次落空（0 不可能猜中）
        finishHellLordGuesses(p, targets.slice(0, 2).map((t, i) => ({ targetId: t.id, value: vals[i] })), canWin); return false;
    },
    SEA_MONSTER(p) {
        while (state.deck.length > 0 && ['MOON', 'PUMPKIN', 'BLOOD'].includes(state.deck[state.deck.length - 1].id) && !state.gameOver) { // 道具牌不可被換進手牌：視為抽出直接棄掉
            const it = state.deck.pop(); putToDiscard(it, `${p.name} 的【海怪】翻出道具牌【${it.n}】，直接棄掉`);
        }
        if (state.gameOver) return false;
        if (state.deck.length === 0) { log(`🌊 ${p.name} 的【海怪】查看牌堆頂，但牌堆已空，效果不發動。`, 'sys'); return false; }
        const top = state.deck[state.deck.length - 1];
        if (!p.isAI) {
            if (p.hand.length === 0) { log(`🌊 ${p.name} 發動【海怪】效果，查看了牌堆頂。`, 'effect'); return false; }
            return openPrompt({ type: 'seaMonster', playerId: p.id, topUid: top.uid });
        }
        if (p.hand.length > 0 && rand() < 0.5) {
            const hi = Math.floor(rand() * p.hand.length), returned = p.hand[hi];
            p.hand[hi] = state.deck.pop(); state.deck.push(returned);
        }
        log(`🌊 ${p.name} 發動【海怪】效果，查看了牌堆頂。`, 'effect');
        return false;
    },
    CHIMERA(p) {
        const targets = state.players.filter(x => !x.immune);
        if (targets.length === 0) { log(`🦁 ${p.name} 的【奇美拉】找不到目標（全員免疫）。`, 'sys'); return false; }
        if (!p.isAI) return openPrompt({ type: 'chimeraTarget', playerId: p.id, targets: targets.map(t => t.id) });
        const opps = targets.filter(t => t.id !== p.id);
        const t = getAIStrategicTarget(p, opps.length > 0 ? opps : targets);
        log(`🦁 ${p.name} 的【奇美拉】選擇了【${t.name}】。`, 'chimera'); executeChimeraEffect(t); return false;
    },
    SUCCUBUS(p) {
        // 可選自己（＝不綁定，自己可正常獲勝）；其他人需未免疫
        const targets = state.players.filter(x => x.id === p.id || !x.immune);
        if (!p.isAI) return openPrompt({ type: 'succubusTarget', playerId: p.id, targets: targets.map(t => t.id) });
        const t = aiSuccubusTarget(p, targets); p.bindTo = t.id === p.id ? null : t.id;
        log(`💖 ${p.name} 的【魅魔】秘密選擇了一位玩家（只有魅魔使用者知道）。`, 'succubus'); return false;
    },
    MINOTAUR(p) {
        const targets = state.players.filter(x => x.id !== p.id && x.hand.length > 0 && !x.immune); // 手牌是小丑也可被選（只是無法交換）
        if (!p.isAI) {
            if (targets.length === 0) { log(`🐂 ${p.name} 打出【牛頭人】，但沒有其他玩家可選（無手牌或已免疫）。`, 'sys'); log(`➔ ${p.name} 獲得額外回合！`, 'target'); state.extraTurn = true; return false; }
            return openPrompt({ type: 'minotaurTarget', playerId: p.id, targets: targets.map(t => t.id) });
        }
        if (targets.length > 0 && targetableHandCards(p).length > 0) {
            const t = getAIStrategicTarget(p, targets);
            log(`🐂 ${p.name} 的【牛頭人】查看了【${t.name}】的手牌。`, 'target');
            if (shouldAISwapHandCards(p, t)) minotaurSwap(p, t); else log(`🚫 ${p.name} 決定不與【${t.name}】交換手牌。`, 'sys');
        }
        log(`➔ ${p.name} 獲得額外回合！`, 'target'); state.extraTurn = true; return false;
    },
    RED_JOKER: jokerEffect,
    BLUE_JOKER: jokerEffect
};
// 骷髏：猜兩個數值，任一猜中其非小丑手牌即成功；對方只有小丑則不觸發
// AI 猜牌：只猜「尚未出現」的牌點數（不猜 0：手牌不可能是小丑以外的 0）
function aiPickGuess(p, exclude) {
    const pool = [];
    unplayedCards(state, p).forEach(o => { if (o.value >= 1 && !(exclude || []).includes(o.value)) for (let i = 0; i < o.count; i++) pool.push(o.value); });
    return pool.length ? pool[Math.floor(rand() * pool.length)] : 0;
}
function skeletonGuess(p, target, guesses) {
    const tcs = targetableHandCards(target);
    log(`💀 ${p.name} 的【骷髏】猜測【${target.name}】的手牌數值是 ${guesses.join('、')}。`, 'skeleton');
    const hit = tcs.find(c => guesses.includes(c.v));
    if (hit) {
        log(`✅ 猜測成功！${p.name} 將【${target.name}】的【${hit.n}】搶到了自己面前。`, 'skeleton');
        p.front.push(target.hand.splice(target.hand.indexOf(hit), 1)[0]);
        const drawn = forceDraw(target, false);
        if (drawn) { target.hand.push(drawn); log(`➔ ${target.name} 被猜中手牌，從牌庫抽了 1 張牌補回手牌。`, 'skeleton'); }
    } else log(`❌ 猜測失敗！【${target.name}】的手牌沒有 ${guesses.join(' 或 ')}。`, 'skeleton');
}
function hellLordGuess(p, target, guessVal) {
    const tc = targetableHandCards(target)[0];
    log(`😈 ${p.name} 的【地獄領主】猜測【${target.name}】的手牌是 ${guessVal}。`, 'skeleton');
    if (!tc || tc.v !== guessVal) { log(`❌ 猜測失敗！【${target.name}】的手牌不是 ${guessVal}。`, 'skeleton'); return false; }
    log(`✅ 猜測成功！${p.name} 將【${target.name}】的【${tc.n}】放到自己面前。`, 'skeleton');
    target.hand.splice(target.hand.indexOf(tc), 1); p.front.push(tc);
    const drawn = forceDraw(target, false);
    if (drawn) { target.hand.push(drawn); log(`➔ ${target.name} 被猜中手牌，從牌庫抽了 1 張牌補回手牌。`, 'skeleton'); }
    return true;
}
function finishHellLordGuesses(p, guesses, canWin) {
    const targets = getHellLordTargets(p);
    if (targets.length < 2) { log(`😈 ${p.name} 的【地獄領主】沒有兩位可猜測的玩家，效果無法完成。`, 'sys'); return; }
    const correct = guesses.reduce((n, g) => { const t = targets.find(x => x.id === g.targetId); return n + (t && hellLordGuess(p, t, g.value) ? 1 : 0); }, 0);
    if (canWin && correct === 2) declareWinner(p, `${p.name} 打出【地獄領主】並成功猜中兩位玩家的手牌，獲得勝利！`);
    else if (!canWin && correct === 2) log('😈 兩次猜牌均成功；小丑複製的【地獄領主】效果不會觸發其勝利條件。', 'sys');
}
function minotaurSwap(p, target) {
    const mine = targetableHandCards(p)[0], theirs = targetableHandCards(target)[0];
    p.hand[p.hand.indexOf(mine)] = theirs; target.hand[target.hand.indexOf(theirs)] = mine;
    log(`🔄 ${p.name} 與【${target.name}】交換手牌！交換了 ${mine.n} 與 ${theirs.n}。`, 'effect');
}
// 小丑：選一張同色牌，複製其效果（uid 沿用小丑，使「排除自己」之類規則與原版一致）
function jokerEffect(p, joker) {
    const targets = getJokerEffectTargets(joker);
    if (targets.length === 0) { log(`🃏 ${p.name} 的【${joker.n}】沒有可發動的同色牌效果。`, 'sys'); return false; }
    if (!p.isAI) return openPrompt({ type: 'jokerPick', playerId: p.id, jokerUid: joker.uid, options: targets.map(t => ({ playerId: t.player.id, index: t.index })) });
    const attack = targets.filter(({ card }) => ['ZOMBIE', 'SANDWORM', 'CTHULHU', 'HEADLESS'].includes(card.id));
    return activateCopy(p, (attack[0] || targets[0]).card, joker);
}
function activateCopy(p, selectedCard, joker) {
    const card = { ...selectedCard, uid: joker.uid };
    log(`🃏【${joker.n}】發動了【${selectedCard.n}】的效果。`, 'effect');
    switch (card.id) {
        case 'PUMPKIN_KING': log('🎃【南瓜王】的勝利需要與【骷髏】或【無頭騎士】同時打出；小丑複製效果不能代替配對打出。', 'sys'); return false;
        case 'VAMPIRE': log('🧛【吸血鬼】沒有可在面前區發動的效果。', 'sys'); return false;
        case 'FRANKENSTEIN':
            if (!p.isAI) return openPrompt({ type: 'frankensteinCopy', playerId: p.id });
            state.extraTurn = true; state.skipFrankensteinOnce = true;
            log(`⚡ ${p.name} 複製【科學怪人】效果，獲得額外回合。`, 'target'); return false;
        case 'GHOST': {
            const targets = state.players.filter(x => x.front.length > 0);
            if (targets.length === 0) { log('👻【幽靈】效果沒有可移動的牌。', 'sys'); return false; }
            if (!p.isAI) return openPrompt({ type: 'ghostMove', playerId: p.id });
            const opps = targets.filter(x => x.id !== p.id);
            const t = getAIStrategicTarget(p, opps.length > 0 ? opps : targets), sel = getAIStrategicFrontCard(t);
            const moved = t.front.splice(sel.index, 1)[0]; p.front.push(moved);
            log(`👻 ${p.name} 透過【${joker.n}】發動【幽靈】效果，移動了【${moved.n}】。`, 'sys'); return false;
        }
        default: { const fn = EFFECTS[card.id]; return fn ? !!fn(p, card, { copy: true, joker }) : false; }
    }
}
function resolveEffect(p, card) {
    if (state.gameOver) return false;
    log(`✨ 觸發【${card.n}】效果：`, 'effect');
    const fn = EFFECTS[card.id];
    if (fn) return !!fn(p, card);
    if (!NO_EFFECT.includes(card.id)) state.unported.push(card.id);
    return false;
}

// 玩家對 prompt 的回應。處理函式回傳 {error}＝答案不合法（prompt 保留）；{next:true}＝開了下一個 prompt；其餘＝效果完成。
const PROMPTS = {
    extremeDiscard(a, pr) {
        if (!pr.options.includes(a.index)) return { error: '選擇無效' };
        const pl = state.players[pr.playerId];
        discardFront(pl, a.index, `${pl.name} 因【${pr.sourceName}】效果棄掉`);
        return extremeDiscard({ uid: pr.sourceUid, n: pr.sourceName }, pr.mode, pr.nextIndex) ? { next: true } : {};
    },
    compareTarget(a, pr, p) {
        if (!pr.targets.includes(a.targetId)) return { error: '目標無效' };
        const t = state.players[a.targetId];
        log(`🎯 ${p.name} 選擇了【${t.name}】進行比大小。`, 'target');
        executeCompare(p, t, { id: pr.cardId }); return {};
    },
    zombieTarget(a, pr, p) {
        if (!pr.targets.includes(a.targetId)) return { error: '目標無效' };
        const t = state.players[a.targetId], opts = getZombieDiscardOptions(t, p.id, pr.sourceUid);
        if (opts.length === 1) { discardFront(t, opts[0].index, `${t.name} 因【喪屍】效果被迫棄掉面前的牌`); return {}; }
        openPrompt({ type: 'zombieCard', playerId: p.id, targetId: t.id, sourceUid: pr.sourceUid, options: opts.map(o => o.index) });
        return { next: true };
    },
    zombieCard(a, pr, p) {
        const t = state.players[pr.targetId];
        if (!pr.options.includes(a.index) || t.immune || !getZombieDiscardOptions(t, p.id, pr.sourceUid).some(o => o.index === a.index)) return { error: '選擇無效' };
        discardFront(t, a.index, `${t.name} 因【喪屍】效果被迫棄掉面前的牌`); return {};
    },
    sandwormPick(a, pr, p) {
        const t = state.players[a.targetId];
        if (!t || !pr.targets.includes(t.id) || !t.front[a.index]) return { error: '選擇無效' };
        const stolen = t.front.splice(a.index, 1)[0]; p.front.push(stolen);
        log(`🃏 ${p.name} 的【沙蟲】從【${t.name}】面前奪取了【${stolen.n} (${stolen.v})】放入自己面前。`, 'joker');
        if (stolen.id === 'MINOTAUR') { openPrompt({ type: 'stolenMinotaur', playerId: p.id, cardUid: stolen.uid }); return { next: true }; }
        return {};
    },
    stolenMinotaur(a, pr, p) {
        if (typeof a.discard !== 'boolean') return { error: '請選擇是否棄掉牛頭人' };
        if (a.discard) {
            const i = p.front.findIndex(c => c.uid === pr.cardUid && c.id === 'MINOTAUR');
            if (i !== -1) { discardFront(p, i, `${p.name} 因【沙蟲】奪得【牛頭人】後選擇棄掉`); state.extraTurn = true; log(`🐂 ${p.name} 棄掉奪得的【牛頭人】，獲得額外回合。`, 'target'); }
        } else log(`🐂 ${p.name} 選擇保留奪得的【牛頭人】。`, 'sys');
        return {};
    },
    necroPick(a, pr, p) {
        const picked = state.discard[a.index];
        if (!picked) return { error: '選擇無效' };
        state.discard.splice(a.index, 1); p.front.push(picked);
        log(`🧙 ${p.name} 的【死靈法師】從棄牌堆復活了【${picked.n} (${picked.v})】放入自己面前。`, 'effect'); return {};
    },
    skeletonGuess(a, pr, p) {
        const gs = a.guesses;
        if (!pr.targets.includes(a.targetId) || !Array.isArray(gs) || gs.length !== 2 || !gs.every(v => Number.isInteger(v) && v >= 0 && v <= 13)) return { error: '請選擇目標並猜兩個 0 至 13 的整數' };
        skeletonGuess(p, state.players[a.targetId], gs); return {};
    },
    hellLord(a, pr, p) {
        const g = a.guesses;
        if (!Array.isArray(g) || g.length !== 2 || g[0].targetId === g[1].targetId ||
            !g.every(x => pr.targets.includes(x.targetId) && Number.isInteger(x.value) && x.value >= 0 && x.value <= 13)) return { error: '請選兩位不同玩家並猜 0 至 13 的整數' };
        finishHellLordGuesses(p, g, pr.canWin); return {};
    },
    seaMonster(a, pr, p) {
        const top = state.deck[state.deck.length - 1];
        if (!Number.isInteger(a.handIndex) || a.handIndex < -1 || a.handIndex >= p.hand.length || !top || top.uid !== pr.topUid) return { error: '選擇無效' };
        if (a.handIndex >= 0) {
            const returned = p.hand[a.handIndex]; p.hand[a.handIndex] = state.deck.pop(); state.deck.push(returned);
        }
        log(`🌊 ${p.name} 發動【海怪】效果，查看了牌堆頂。`, 'effect');
        return {};
    },
    chimeraTarget(a, pr, p) {
        if (!pr.targets.includes(a.targetId)) return { error: '目標無效' };
        const t = state.players[a.targetId];
        log(`🦁 ${p.name} 的【奇美拉】選擇了【${t.name}】。`, 'chimera'); executeChimeraEffect(t); return {};
    },
    succubusTarget(a, pr, p) {
        if (!pr.targets.includes(a.targetId)) return { error: '目標無效' };
        p.bindTo = a.targetId === p.id ? null : a.targetId; // 選自己＝不綁定
        log(`💖 ${p.name} 的【魅魔】秘密選擇了一位玩家（只有魅魔使用者知道）。`, 'succubus'); return {};
    },
    minotaurTarget(a, pr, p) {
        const t = state.players[a.targetId];
        if (!pr.targets.includes(a.targetId) || t.hand.length === 0) return { error: '目標無效' };
        log(`🐂 ${p.name} 查看了【${t.name}】的手牌。`, 'target'); // 不點明是否為小丑
        openPrompt({ type: 'minotaurSwap', playerId: p.id, targetId: t.id, canSwap: targetableHandCards(p).length > 0 && targetableHandCards(t).length > 0 });
        return { next: true };
    },
    minotaurSwap(a, pr, p) {
        if (typeof a.swap !== 'boolean') return { error: '請選擇是否交換' };
        const t = state.players[pr.targetId];
        if (a.swap && pr.canSwap && targetableHandCards(p)[0] && targetableHandCards(t)[0]) minotaurSwap(p, t);
        else log(`🚫 ${p.name} 決定不與【${t.name}】交換手牌。`, 'sys');
        log(`➔ ${p.name} 獲得額外回合！`, 'target'); state.extraTurn = true; return {};
    },
    jokerPick(a, pr, p) {
        if (!pr.options.some(o => o.playerId === a.targetId && o.index === a.index)) return { error: '選擇無效' };
        const joker = p.front.find(c => c.uid === pr.jokerUid), copied = state.players[a.targetId].front[a.index];
        if (!joker || !copied || isJokerCard(copied) || !getJokerEffectTargets(joker).some(o => o.player.id === a.targetId && o.card.uid === copied.uid)) return { error: '選擇無效' };
        return activateCopy(p, copied, joker) ? { next: true } : {};
    },
    frankensteinCopy(a, pr, p) {
        if (typeof a.take !== 'boolean') return { error: '請選擇是否發動' };
        state.extraTurn = a.take; state.skipFrankensteinOnce = a.take; return {};
    },
    ghostMove(a, pr, p) {
        const t = state.players[a.targetId];
        if (!t || !Number.isInteger(a.index) || !t.front[a.index]) return { error: '選擇無效' };
        const moved = t.front.splice(a.index, 1)[0]; p.front.push(moved);
        log(`👻 ${p.name} 透過小丑發動【幽靈】效果，將【${t.name}】面前的【${moved.n}】移動到自己面前。`, 'sys'); return {};
    },
    ghostSettle(a, pr, p) {
        if (a.skip === true) log(`👻 ${p.name} 的【幽靈】放棄了移動。`, 'sys');
        else {
            const t = state.players[a.targetId];
            if (!t || !Number.isInteger(a.index) || !t.front[a.index]) return { error: '選擇無效' };
            const moved = t.front.splice(a.index, 1)[0]; p.front.push(moved);
            log(`👻 ${p.name} 的【幽靈】將【${t.name}】面前的【${moved.n} (${moved.v})】移動到了自己面前。`, 'sys');
        }
        finishSettlement(); return {};
    }
};
function answerPrompt(a) {
    const pr = state.prompt, p = state.players[pr.playerId];
    if (pr.type === 'frankenstein') {
        if (typeof a.discard !== 'boolean') return err('請選擇是否棄掉科學怪人');
        state.prompt = null;
        if (a.discard) {
            const i = p.front.findIndex(c => c.id === 'FRANKENSTEIN');
            if (i !== -1) { putToDiscard(p.front.splice(i, 1)[0], `${p.name} 棄掉面前的【科學怪人】`); state.extraTurn = true; }
        }
        advanceTurn(); return ok();
    }
    const h = PROMPTS[pr.type];
    if (!h) return err('未知的 prompt');
    state.prompt = null;
    const r = h(a, pr, p) || {};
    if (r.error) { state.prompt = pr; return err(r.error); }
    if (!r.next) endTurn();
    return ok();
}

// ---------- 叫糊提示（邏輯取自 index_1.html 的 updateUI，改為純資料輸出）----------
// 回傳：tenpai＝正在等的牌名；contrib＝面前區對叫糊有貢獻的牌 uid；cards＝每張手牌的 {canWin, enables, after}
function tenpaiView(s, p) {
    state = s;
    const tenpai = getTenpaiInfo(p);
    return { tenpai, contrib: Array.from(getContributingFrontUids(p.front, tenpai)) };
}
function handHints(s, p) {
    state = s;
    const view = tenpaiView(s, p), tenpai = view.tenpai, cur = new Set(tenpai);
    const holdsPK = p.hand.some(c => c.id === 'PUMPKIN_KING');
    const hasPair = holdsPK && p.hand.some(c => c.id === 'SKELETON' || c.id === 'HEADLESS');
    const pairIds = ['PUMPKIN_KING', 'SKELETON', 'HEADLESS'];
    view.cards = p.hand.map(card => {
        const canPlayPK = !holdsPK || pairIds.includes(card.id);
        const pairedWin = hasPair && pairIds.includes(card.id) && state.discard.some(d => d.id === 'PUMPKIN');
        const canWin = canPlayPK && (checkVictoryCondition(p, card) || pairedWin);
        let after = [], enables = false;
        if (!canWin && canPlayPK) {
            const full = getTenpaiAfterPlaying(p, card);
            // 只列「額外」叫糊：原本已在叫的牌不重複顯示（例：已叫喪屍 → 不列喪屍）
            after = full.filter(n => !cur.has(n));
            enables = after.length > 0;
        }
        return { uid: card.uid, canWin, enables, after: enables ? after : [] };
    });
    return view;
}
// 模擬把 card 放到玩家面前後，是否會出現「原本沒有的」叫糊（供效果選牌綠框）
function tenpaiIfAddFront(s, p, card) {
    state = s;
    const before = new Set(getTenpaiInfo(p));
    p.front.push(card);
    try {
        return getTenpaiInfo(p).filter(n => !before.has(n));
    } finally {
        p.front.pop();
    }
}

// ---------- 簡易 AI（沿用原版 aiTurn 的決策骨架；進階策略待移植）----------

// ===== AI 強化：比大小勝率評估、小丑優先、手牌去向對對手的增益／減益 =====
// 對 p 而言尚未公開的怪物牌點數分佈（排除小丑）
function aiUnseenValues(p) {
    return unplayedCards(state, p).filter(o => o.value > 0).map(o => ({ value: o.value, weight: o.count }));
}
// 對手手牌點數分佈：全明牌模式直接看牌；暗牌模式用未公開牌估計
function aiOppDist(p, opp) {
    if (!isDark()) { const c = targetableHandCards(opp)[0]; return c ? [{ value: c.v || 0, weight: 1 }] : []; }
    return aiUnseenValues(p);
}
function aiCompareOutlook(myVal, p, opp, cardId) {
    let win = 0, lose = 0, tot = 0;
    aiOppDist(p, opp).forEach(({ value, weight }) => {
        tot += weight;
        const iWin = cardId === 'TROLL' ? myVal > value : myVal < value;
        const iLose = cardId === 'TROLL' ? myVal < value : myVal > value;
        if (iWin) win += weight; else if (iLose) lose += weight;
    });
    return tot ? { win: win / tot, lose: lose / tot } : { win: 0, lose: 0 };
}
// 比大小效果觸發時（打出的牌已離手）：選勝率減敗率最高的目標，同分再看戰略
function aiPickCompareTarget(p, targets, card) {
    const mine = targetableHandCards(p)[0];
    if (!mine) return getAIStrategicTarget(p, targets);
    const scored = targets.map(t => { const o = aiCompareOutlook(mine.v || 0, p, t, card.id); return { t, s: o.win - o.lose }; });
    const best = Math.max(...scored.map(x => x.s));
    return getAIStrategicTarget(p, scored.filter(x => x.s === best).map(x => x.t));
}
// 打出巨魔／木乃伊「之前」評估：剩餘手牌對最佳目標的勝率減敗率（-1～1）；無法比則 null
function aiCompareScore(p, played) {
    const mine = p.hand.filter(c => !isJokerCard(c) && c.uid !== played.uid)[0];
    const targets = state.players.filter(x => x.id !== p.id && targetableHandCards(x).length > 0 && !x.immune);
    if (!mine || targets.length === 0) return null;
    return Math.max(...targets.map(t => { const o = aiCompareOutlook(mine.v || 0, p, t, played.id); return o.win - o.lose; }));
}
// 正值＝打出此牌對對手較有利；負值＝對對手不利
function aiOppBenefit(p, card) {
    const opps = state.players.filter(o => o.id !== p.id && !o.immune);
    const edge = (pl, mode) => { const vs = pl.front.map(c => c.v || 0); return vs.length ? (mode === 'max' ? Math.max(...vs) : Math.min(...vs)) : 0; };
    switch (card.id) {
        case 'CTHULHU': case 'HEADLESS': {
            const mode = card.id === 'CTHULHU' ? 'max' : 'min';
            return edge(p, mode) - opps.reduce((sum, o) => sum + edge(o, mode), 0); // 自己的損失＝對手的利益
        }
        case 'MEDUSA': case 'WITCH': // 全員補牌：已叫糊的對手可能更接近勝利
            return opps.filter(o => getTenpaiInfo(o).length > 0).length * 6;
        default: return 0;
    }
}
// 魅魔綁定：選「最可能勝利」的對手（叫糊多、面前區強、手握狼人且月亮未出）
function aiSuccubusTarget(p, targets) {
    let best = targets[0], bs = -Infinity;
    targets.forEach(t => {
        let sc = getTenpaiInfo(t).length * 30 + t.front.length * 3 + t.front.reduce((a, c) => a + (c.v || 0), 0) * 0.15 + rand();
        if (t.id === p.id) sc += 12; // 選自己＝不綁定、自己照常爭勝：自己叫糊或面前強時比押別人更划算
        if (t.hand.some(c => c.id === 'WEREWOLF') && aiMoonPending()) sc += 25;
        if (t.hand.some(c => c.id === 'CTHULHU')) sc += 8;
        if (sc > bs) { bs = sc; best = t; }
    });
    return best;
}
function aiPlayScore(p, c) {
    if (checkVictoryCondition(p, c)) return p.bindTo != null ? -500 : 1000; // 已綁定魅魔：自己勝利無效，避免打出

    const tw = p.bindTo != null ? -5 : 20; // 已綁定魅魔：自己叫糊沒有好處，反而增加誤勝風險
    let s = (getTenpaiAfterPlaying(p, c).length - getTenpaiInfo(p).length) * tw + (c.v || 0) * 0.3;
    if (p.bindTo != null && ((c.id === 'WEREWOLF' && aiMoonPending()) || c.id === 'CTHULHU')) s += 40; // 已綁定：盡快脫手會讓自己「手握即勝」的牌
    if (c.id === 'TROLL' || c.id === 'MUMMY') { const cs = aiCompareScore(p, c); s += cs === null ? -4 : cs * 15; }
    return s - aiOppBenefit(p, c);
}
// 月亮牌還沒出現（不在棄牌堆、仍在牌庫）
function aiMoonPending() { return !state.discard.some(c => c.id === 'MOON') && state.deck.some(c => c.id === 'MOON'); }
// 南瓜已出現，但南瓜王還沒打出（不在棄牌堆、不在任何人面前）
function aiPumpkinComboPending() {
    return state.discard.some(c => c.id === 'PUMPKIN') && !state.discard.some(c => c.id === 'PUMPKIN_KING') &&
        !state.players.some(pl => pl.front.some(c => c.id === 'PUMPKIN_KING'));
}
// AI 這回合傾向保留的牌（「一定程度」：有機率仍照常打出）
function aiHoldIds(p) {
    const hold = new Set();
    const has = id => p.hand.some(c => c.id === id);
    if (p.bindTo == null && has('WEREWOLF') && aiMoonPending()) {   // 狼人：手握到月亮出現即勝利；越接近最後 1/3 越傾向保留
        const deep = state.deck.length <= Math.ceil(state.initialDeckSize / 3);
        if (rand() < (deep ? 0.9 : 0.65)) hold.add('WEREWOLF');
    }
    if (p.bindTo == null && !has('PUMPKIN_KING') && aiPumpkinComboPending() && rand() < 0.85) { hold.add('SKELETON'); hold.add('HEADLESS'); }
    return hold;
}
function aiBestPlayIndex(p, hold) {
    let best = 0, bs = -Infinity;
    p.hand.forEach((c, i) => {
        let sc = aiPlayScore(p, c) + rand() * 0.5;
        if (hold && hold.has(c.id)) sc -= (c.id === 'WEREWOLF' ? 60 : 45);
        if (sc > bs) { bs = sc; best = i; }
    });
    return best;
}
// 面前區有一種小丑時，需要的是另一種小丑（尚未出現在任何人面前）
function aiWantedJoker(p) {
    const inFront = id => state.players.some(pl => pl.front.some(c => c.id === id));
    if (p.front.some(c => c.id === 'BLUE_JOKER') && !inFront('RED_JOKER')) return 'RED_JOKER';
    if (p.front.some(c => c.id === 'RED_JOKER') && !inFront('BLUE_JOKER')) return 'BLUE_JOKER';
    return null;
}
// 拿一還一要放回暗牌區的牌：留住對自己有用的，並避免把能讓對手勝出／叫糊的牌放進暗牌區
function aiReturnIndex(p) {
    const want = aiWantedJoker(p), opps = state.players.filter(o => o.id !== p.id);
    let best = -1, bs = Infinity;
    p.hand.forEach((c, i) => {
        if (c.id === 'PUMPKIN_KING') return;
        let keep = (getTenpaiAfterPlaying(p, c).length - getTenpaiInfo(p).length) * (p.bindTo != null ? -5 : 20) + (c.v || 0) * 0.3;
        if (p.bindTo != null && ((c.id === 'WEREWOLF' && aiMoonPending()) || c.id === 'CTHULHU')) keep -= 300; // 已綁定：不留會讓自己誤勝的牌
        if (p.bindTo == null && checkVictoryCondition(p, c)) keep += 1000;
        if (p.bindTo == null && aiMoonPending() && c.id === 'WEREWOLF') keep += 300;      // 月亮還沒出現：不把狼人放回暗牌
        if (p.bindTo == null && aiPumpkinComboPending() && (c.id === 'SKELETON' || c.id === 'HEADLESS')) keep += 150;
        if (want && c.id === want) keep += 500;
        let risk = 0;
        opps.forEach(o => {
            if (checkVictoryCondition(o, c)) risk += 200;
            risk += Math.max(0, getTenpaiAfterPlaying(o, c).length - getTenpaiInfo(o).length) * 10;
        });
        const sc = keep + risk + rand() * 0.5;
        if (sc < bs) { bs = sc; best = i; }
    });
    return best === -1 ? 0 : best;
}
function aiStep(s) {
    state = s;
    if (s.gameOver) return err('遊戲已結束');
    if (s.prompt) {
        const pr = s.prompt;
        if (pr.type === 'frankenstein') return act(s, pr.playerId, { type: 'answer', discard: rand() > 0.5 });
        return err('AI 不會回應此 prompt');
    }
    const p = cur(), pid = p.id;
    const hasPK = p.hand.some(c => c.id === 'PUMPKIN_KING');
    if (s.phase === 'RETURN') {
        return act(s, pid, { type: 'return', handIndex: aiReturnIndex(p) });
    }
    if (s.phase === 'DRAW') {
        const slots = s.centerCards.map((c, i) => c ? i : -1).filter(i => i !== -1);
        if (p.hand.length === 1 && !hasPK && slots.length > 0) {
            let slot = -1;
            if (p.bindTo == null && getTenpaiInfo(p).includes('吸血鬼')) { // 叫糊吸血鬼：一定優先拿暗牌，試圖抽出吸血鬼（已知的就直接拿，否則在沒被排除的位置中試）
                const known = i => p.knownCenter[i] === s.centerCards[i].uid;
                const hit = slots.find(i => known(i) && s.centerCards[i].id === 'VAMPIRE');
                const cand = slots.filter(i => !(known(i) && s.centerCards[i].id !== 'VAMPIRE'));
                slot = hit !== undefined ? hit : (cand.length ? cand[Math.floor(rand() * cand.length)] : -1);
                if (slot !== -1) return act(s, pid, { type: 'take', slot });
            }
            const want = aiWantedJoker(p);
            if (want && !p.hand.some(c => c.id === want)) { // 面前有小丑：優先拿暗牌的另一種小丑
                const known = slots.filter(i => p.knownCenter[i] === s.centerCards[i].uid);
                const hit = known.find(i => s.centerCards[i].id === want);
                if (hit !== undefined) slot = hit;
                else { const unk = slots.filter(i => !known.includes(i)); if (unk.length && rand() < 0.7) slot = unk[Math.floor(rand() * unk.length)]; }
            }
            if (slot === -1 && rand() < 0.25) slot = slots[Math.floor(rand() * slots.length)];
            if (slot !== -1) return act(s, pid, { type: 'take', slot });
        }
        if (p.hand.length < 2 && (s.deck.length > 0 || (s.reserveDrawOk && s.reserves.length > 0))) return act(s, pid, { type: 'draw' });
    }
    if (p.hand.length === 0) { endTurn(); return ok(); }
    if (hasPK) {
        const pkIdx = p.hand.findIndex(c => c.id === 'PUMPKIN_KING');
        const sk = p.hand.findIndex(c => c.id === 'SKELETON'), hl = p.hand.findIndex(c => c.id === 'HEADLESS');
        const comp = sk >= 0 ? sk : hl;
        const boundNoWin = p.bindTo != null && s.discard.some(c => c.id === 'PUMPKIN'); // 已綁定魅魔：配對打出會變成無人勝利
        if (comp >= 0 && !boundNoWin && (s.discard.some(c => c.id === 'PUMPKIN') || rand() < 0.7))
            return act(s, pid, { type: 'play', handIndex: pkIdx, companionIndex: comp });
        return act(s, pid, { type: 'play', handIndex: pkIdx });
    }
    const win = p.bindTo != null ? -1 : p.hand.findIndex(c => checkVictoryCondition(p, c));
    const hold = aiHoldIds(p);
    const attack = getAIAttackCardIndex(p, hold);
    return act(s, pid, { type: 'play', handIndex: win !== -1 ? win : (attack !== -1 ? attack : aiBestPlayIndex(p, hold)) });
}

// 開始下一小局：沿用上一局的玩家、勝場與模式（比賽已結束則不可）
function nextRound(s) {
    if (s.match.finished) return null;
    return newGame(s.players.map(p => ({ name: p.name, isAI: p.isAI, uid: p.uid })), { match: s.match });
}
const api = { CARD_DEFS, CARD_GUIDE, SUITS, SUIT_SYMBOLS, SPECIALS, newGame, nextRound, act, aiStep, setSeed, tenpaiView, handHints,
  unplayedCards, tenpaiIfAddFront,
  getGuessTargets: (s, p) => { state = s; return getGuessTargets(p); },
  getTenpaiInfo: (s, p) => { state = s; return getTenpaiInfo(p); },
  checkVictoryCondition: (s, p, c) => { state = s; return checkVictoryCondition(p, c); } };
if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.ChaosEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
