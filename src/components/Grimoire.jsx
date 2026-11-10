// Книга открытых рецептов
import React, { useContext } from 'react';
import { GameCtx } from '../context/GameContext';
import { allRecipes } from '../data/constants';

export default function Grimoire() {
    const { state } = useContext(GameCtx);

    return (
        <div>
            <h2>Гримуар</h2>
            <ul>
                {allRecipes.map(function(r, index) {
                    let isOpen = false;
                    for (let i = 0; i < state.openRec.length; i++) {
                        if (state.openRec[i] == r.name) {
                            isOpen = true;
                        }
                    }

                    if (isOpen == true) {
                        return <li key={index}>{r.ing1} + {r.ing2} = {r.name}</li>;
                    } else {
                        return <li key={index}>??? + ??? = ???</li>;
                    }
                })}
            </ul>
        </div>
    );
}