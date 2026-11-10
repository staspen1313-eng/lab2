// Математика и генерация
export function getBoom() {
    let r = Math.random();
    if (r < 0.6) {
        return { text: "Обычный взрыв", dmg: 25 };
    } else if (r < 0.9) {
        return { text: "Тяжелый взрыв!", dmg: 50 };
    } else {
        return { text: "КАТАСТРОФА!!!", dmg: 75 };
    }
}

export function createBuyer(lvl) {
    let namesArr = ["Олаф", "Гендальф", "Аня", "Влад", "Рыцарь", "Мерлин"];
    let pots = ["Зелье лечения", "Зелье маны", "Зелье силы", "Зелье удачи"];
    let n = namesArr[Math.floor(Math.random() * namesArr.length)];
    let p = pots[Math.floor(Math.random() * pots.length)];
    let basePrice = 17;
    if (p === "Зелье маны") basePrice = 26;
    if (p === "Зелье силы") basePrice = 40;
    if (p === "Зелье удачи") basePrice = 63;

    let master = Math.floor(lvl / 5);
    let finalP = basePrice + (basePrice * (master * 0.05));
    
    return { name: n, need: p, money: Math.floor(finalP) };
}