// Готовые зелья пить
import React, { useContext } from 'react';
import { GameCtx } from '../context/GameContext';

export default function PotionsInventory() {
    const { state, drink } = useContext(GameCtx);

    return (
        <div>
            <h2>Витрина зелий</h2>
            {state.pots.length == 0 ? "Нет зелий" : ""}
            {state.pots.map(function(p, i) {
                return (
                    <div key={i} style={{ border: '1px solid black' }}>
                        {p} 
                        <button onClick={() => drink(p, i)}>Выпить</button>
                    </div>
                )
            })}
        </div>
    );
}