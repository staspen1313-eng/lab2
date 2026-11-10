// Компонент котла для варки зелий
import React, { useContext } from 'react';
import { GameCtx } from '../context/GameContext';

export default function Cauldron() {
    const { state, cook, fromCauldron } = useContext(GameCtx);
    let isReady = state.c1 !== null && state.c2 !== null && state.mp >= 15;

    return (
        <div>
            <h2>Котел</h2>
            <div className="cauldron-slots">
                <div className="slot" onClick={() => fromCauldron(1)}>
                    <small>Слот 1:</small>
                    <b>{state.c1 ? state.c1 : "Пусто"}</b>
                </div>
                <div className="slot" onClick={() => fromCauldron(2)}>
                    <small>Слот 2:</small>
                    <b>{state.c2 ? state.c2 : "Пусто"}</b>
                </div>
            </div>

            <button 
                className={isReady ? "btn-primary" : ""} 
                onClick={cook}
                disabled={!isReady}
                style={{
                    padding: '10px 16px',
                    width: '100%',
                    background: isReady ? '' : '#4b5563',
                    borderColor: isReady ? '' : '#6b7280',
                    color: isReady ? '' : '#9ca3af',
                    cursor: isReady ? 'pointer' : 'not-allowed'
                }}
            >
                {state.mp < 15 ? 'Мало MP' : 'Синтез (15 MP)'}
            </button>

            {state.msg ? (
                <div style={{ marginTop: '12px', fontWeight: 'bold', color: state.msg.includes('Сварено') ? '#4ade80' : '#ef4444' }}>
                    {state.msg}
                </div>
            ) : null}
        </div>
    );
}