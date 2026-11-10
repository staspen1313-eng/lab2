// Магазин и комора
import React, { useContext } from 'react';
import { GameCtx } from '../context/GameContext';
import { shopItems } from '../data/constants';

export default function MarketPantry() {
    const { state, buy, toCauldron } = useContext(GameCtx);

    return (
        <div>
            <h2>Рынок</h2>
            {shopItems.map(function(item, index) {
                return (
                    <div key={index}>
                        {item.name} - {item.price} м. 
                        <button onClick={function(){ buy(item) }}>Купить</button>
                    </div>
                )
            })}
            
            <h2>Моя комора</h2>
            {state.pantry.map(function(ing, index) {
                return (
                    <button key={index} onClick={() => toCauldron(ing, index)}>
                        {ing}
                    </button>
                )
            })}
        </div>
    );
}