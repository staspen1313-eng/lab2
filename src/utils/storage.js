// Работа с памятью
export function saveMyData(data) {
    let str = JSON.stringify(data);
    localStorage.setItem("alhimik_game_save", str);
}

export function loadMyData() {
    let saved = localStorage.getItem("alhimik_game_save");
    if (saved != null) {
        return JSON.parse(saved);
    } else {
        return null;
    }
}