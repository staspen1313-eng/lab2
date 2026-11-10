// Хранит статические данные
export let startGold = 50;
export let startLife = 100;
export let startMana = 100;

export let shopItems = [
    { id: 1, name: "Красный корень", price: 5 },
    { id: 2, name: "Лунный гриб", price: 8 },
    { id: 3, name: "Кость жабы", price: 12 },
    { id: 4, name: "Слеза дракона", price: 20 },
    { id: 5, name: "Пыльца эльфов", price: 15 },
    { id: 6, name: "Перо феникса", price: 30 }
];

export let allRecipes = [
    { name: "Зелье лечения", ing1: "Красный корень", ing2: "Лунный гриб" },
    { name: "Зелье маны", ing1: "Лунный гриб", ing2: "Кость жабы" },
    { name: "Зелье силы", ing1: "Красный корень", ing2: "Слеза дракона" },
    { name: "Зелье удачи", ing1: "Пыльца эльфов", ing2: "Перо феникса" }
];