import React, { createContext, useState, useEffect } from "react";
import { saveMyData, loadMyData } from "../utils/storage";
import { startGold, startLife, startMana, allRecipes } from "../data/constants";
import { getBoom, createBuyer } from "../utils/gameLogic";

export const GameCtx = createContext();

const bgMusic = new Audio("/background.mp3");
bgMusic.loop = true;

export function GameProvider({ children }) {
    let loaded = loadMyData();
    if (loaded == null) {
        loaded = {
            hp: startLife, maxHp: startLife,
            mp: startMana, maxMp: startMana,
            gold: startGold,
            lvl: 1, xp: 0,
            pantry: [], c1: null, c2: null,
            pots: [],
            openRec: [],
            cust: createBuyer(1),
            dead: false,
            msg: "",
            points: 0
        };
    }

    const [state, setState] = useState(loaded);
    const [volume, setVolume] = useState(0.3);

    useEffect(() => {
        saveMyData(state);
    }, [state]);

    useEffect(() => {
        bgMusic.volume = volume;

        let startAudio = function() {
            bgMusic.play().then(function() {
                window.removeEventListener("click", startAudio);
                window.removeEventListener("keydown", startAudio);
            }).catch(function() {
                // Игнорируем автоблокировку браузера
            });
        };

        startAudio();

        window.addEventListener("click", startAudio);
        window.addEventListener("keydown", startAudio);

        return function() {
            window.removeEventListener("click", startAudio);
            window.removeEventListener("keydown", startAudio);
        };
    }, []);

    useEffect(() => {
        bgMusic.volume = volume;
    }, [volume]);

    function changeVolume(e) {
        let newVol = parseFloat(e.target.value);
        setVolume(newVol);
    }

    function buy(item) {
        if (state.gold >= item.price) {
            let newP = [...state.pantry];
            newP.push(item.name);
            setState({ ...state, gold: state.gold - item.price, pantry: newP });
        }
    }

    function toCauldron(ingName, idx) {
        if (state.c1 == null) {
            let arr = [...state.pantry];
            arr.splice(idx, 1);
            setState({ ...state, c1: ingName, pantry: arr });
        } else if (state.c2 == null) {
            let arr = [...state.pantry];
            arr.splice(idx, 1);
            setState({ ...state, c2: ingName, pantry: arr });
        }
    }

    function fromCauldron(slotNum) {
        if (slotNum == 1 && state.c1 != null) {
            let arr = [...state.pantry];
            arr.push(state.c1);
            setState({ ...state, c1: null, pantry: arr });
        }
        if (slotNum == 2 && state.c2 != null) {
            let arr = [...state.pantry];
            arr.push(state.c2);
            setState({ ...state, c2: null, pantry: arr });
        }
    }

    function cook() {
        if (state.mp < 15) return;
        let newState = { ...state, mp: state.mp - 15, msg: "" };
        let ing1 = state.c1;
        let ing2 = state.c2;
        newState.c1 = null;
        newState.c2 = null;

        let ok = false;
        let res = "";
        for (let i = 0; i < allRecipes.length; i++) {
            if ((allRecipes[i].ing1 == ing1 && allRecipes[i].ing2 == ing2) || (allRecipes[i].ing1 == ing2 && allRecipes[i].ing2 == ing1)) {
                ok = true;
                res = allRecipes[i].name;
            }
        }

        if (ok == true) {
            newState.msg = "Сварено " + res;
            newState.pots.push(res);
            let found = false;
            for(let k=0; k<newState.openRec.length; k++){
                if(newState.openRec[k] == res) found = true;
            }
            if(found == false) newState.openRec.push(res);
        } else {
            let boom = getBoom();
            newState.msg = boom.text + " -" + boom.dmg + " HP";
            newState.hp = newState.hp - boom.dmg;
            if (newState.hp <= 0) {
                newState.hp = 0;
                newState.dead = true;
            }
        }
        setState(newState);
    }

    function sell() {
        let has = false;
        let idx = -1;
        for (let i = 0; i < state.pots.length; i++) {
            if (state.pots[i] == state.cust.need) {
                has = true;
                idx = i;
            }
        }
        if (has == true) {
            let p = [...state.pots];
            p.splice(idx, 1);
            
            let newXp = state.xp + 25;
            let newLvl = state.lvl;
            let pts = state.points;
            let needXp = newLvl * 50;
            
            if (newXp >= needXp) {
                newLvl = newLvl + 1;
                newXp = 0;
                if (newLvl % 5 != 0) {
                    pts = pts + 1;
                } else {
                    alert("Уровень мастера!");
                }
            }
            
            setState({ 
                ...state, 
                pots: p, 
                gold: state.gold + state.cust.money,
                xp: newXp,
                lvl: newLvl,
                points: pts,
                cust: createBuyer(newLvl)
            });
        }
    }

    function kick() {
        setState({ ...state, cust: createBuyer(state.lvl) });
    }

    function upHp() {
        setState({ ...state, maxHp: state.maxHp + 15, hp: state.maxHp + 15, points: state.points - 1 });
    }
    
    function upMp() {
        setState({ ...state, maxMp: state.maxMp + 15, mp: state.maxMp + 15, points: state.points - 1 });
    }

    function resOk() {
        setState({ 
            ...state, 
            dead: false, hp: startLife, maxHp: startLife, mp: startMana, maxMp: startMana, lvl: 1, xp: 0, points: 0 
        });
    }

    function drink(pName, index) {
        if(state.dead) return;
        let p = [...state.pots];
        p.splice(index, 1);
        let nHp = state.hp;
        let nMp = state.mp;
        
        if(pName == "Зелье лечения") nHp = nHp + 50;
        if(pName == "Зелье маны") nMp = nMp + 50;
        if(pName == "Зелье удачи") {
            nHp = nHp + 30;
            nMp = nMp + 30;
        }

        if(nHp > state.maxHp) nHp = state.maxHp;
        if(nMp > state.maxMp) nMp = state.maxMp;
        setState({...state, pots: p, hp: nHp, mp: nMp});
    }

    function resetAll() {
        let confirmReset = window.confirm("Вы уверены, что хотите начать игру заново? Весь прогресс будет сброшен!");
        if (confirmReset) {
            localStorage.removeItem("alhimik_game_save");
            setState({
                hp: startLife, maxHp: startLife,
                mp: startMana, maxMp: startMana,
                gold: startGold,
                lvl: 1, xp: 0,
                pantry: [], c1: null, c2: null,
                pots: [],
                openRec: [],
                cust: createBuyer(1),
                dead: false,
                msg: "",
                points: 0
            });
        }
    }

    return (
        <GameCtx.Provider value={{ 
            state, buy, toCauldron, fromCauldron, cook, sell, kick, upHp, upMp, resOk, drink, resetAll,
            volume, changeVolume 
        }}>
            {children}
        </GameCtx.Provider>
    );
}