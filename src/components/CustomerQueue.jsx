// Очередь покупателей зелий
import React, { useContext } from 'react';
import { GameCtx } from '../context/GameContext';

export default function CustomerQueue() {
    const { state, sell, kick } = useContext(GameCtx);

    if(state.dead == true) {
        return (
            <div>
                <h2>Покупатели</h2>
                <div style={{ color: '#ef4444', textAlign: 'center', padding: '10px' }}>
                    Лавка закрыта из-за смерти алхимика!
                </div>
            </div>
        );
    }

    let hasPotion = false;
    for (let i = 0; i < state.pots.length; i++) {
        if (state.pots[i] == state.cust.need) {
            hasPotion = true;
            break;
        }
    }

    return (
        <div>
            <h2>Очередь в лавке</h2>
            <div style={{ 
                background: '#1e182a', 
                border: '1px solid #4a3b69', 
                borderRadius: '8px', 
                padding: '14px', 
                color: '#e0d6eb' 
            }}>
                <div style={{ marginBottom: '8px', fontSize: '1.05rem' }}>
                    👤 <b>Покупатель:</b> <span style={{ color: '#fff', fontWeight: 'bold' }}>{state.cust.name}</span>
                </div>
                
                <div style={{ marginBottom: '8px', fontSize: '1.05rem' }}>
                    🧪 <b>Ищет:</b> <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>{state.cust.need}</span>
                </div>
                
                <div style={{ marginBottom: '14px', fontSize: '1.05rem' }}>
                    💰 <b>Предлагает:</b> <span style={{ color: '#facc15', fontWeight: 'bold' }}>{state.cust.money} монет</span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        className={hasPotion ? "btn-success" : ""} 
                        onClick={sell} 
                        disabled={!hasPotion}
                        style={{ 
                            flex: 1, 
                            padding: '10px',
                            background: hasPotion ? '' : '#4b5563',
                            borderColor: hasPotion ? '' : '#6b7280',
                            color: hasPotion ? '' : '#9ca3af',
                            cursor: hasPotion ? 'pointer' : 'not-allowed'
                        }}
                    >
                        {hasPotion ? 'Продать' : 'Нет зелья'}
                    </button>
                    
                    <button className="btn-danger" onClick={kick} style={{ flex: 1, padding: '10px' }}>
                        Отказать
                    </button>
                </div>
            </div>
        </div>
    );
}