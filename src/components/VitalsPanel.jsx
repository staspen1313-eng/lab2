// Здоровье мана опыт
import React, { useContext } from 'react';
import { GameCtx } from '../context/GameContext';

export default function VitalsPanel() {
    const { state, upHp, upMp, resOk, volume, changeVolume } = useContext(GameCtx);

    if (state.dead == true) {
        return (
            <div style={{ background: '#7f1d1d', padding: '15px', borderRadius: '8px', color: 'white', textAlign: 'center' }}>
                <h1 style={{ margin: 0 }}>АЛХИМИК УМЕР</h1>
                <p>Невдалый опыт уничтожил тело!</p>
                <button className="btn-primary" onClick={resOk}>Воскресить (Сброс статов!)</button>
            </div>
        );
    }

    let hpPercent = (state.hp / state.maxHp) * 100;
    let mpPercent = (state.mp / state.maxMp) * 100;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Статус Алхимика</h2>
                
                {/* Только ползунок громкости */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '0.9rem' }}>🔊</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05" 
                        value={volume} 
                        onChange={changeVolume} 
                        style={{ width: '80px', cursor: 'pointer' }}
                        title="Громкость музыки"
                    />
                </div>
            </div>

            <div style={{ marginTop: '10px' }}><b>HP:</b> {state.hp} / {state.maxHp}</div>
            <div className="progress-bar">
                <div className="progress-hp" style={{ width: hpPercent + '%' }}></div>
            </div>

            <div><b>MP:</b> {state.mp} / {state.maxMp}</div>
            <div className="progress-bar">
                <div className="progress-mp" style={{ width: mpPercent + '%' }}></div>
            </div>

            <div style={{ marginTop: '10px' }}>
                💰 <b>Золото:</b> {state.gold} монет <br/>
                ⭐ <b>Уровень:</b> {state.lvl} ({state.xp} / {state.lvl * 50} XP)
            </div>
            
            {state.points > 0 ? (
                <div style={{ border: '1px solid #4ade80', padding: '8px', borderRadius: '6px', marginTop: '10px' }}>
                    <p style={{ margin: '0 0 5px 0', color: '#4ade80' }}>Новый уровень! Выбери бонус:</p>
                    <button className="btn-success" onClick={upHp}>+15 HP</button>
                    <button className="btn-primary" onClick={upMp}>+15 MP</button>
                </div>
            ) : null}
            
            {state.lvl % 5 == 0 && state.lvl != 1 ? <p style={{ color: '#d4af37' }}><i>👑 Вы Мастер! Цены +5%</i></p> : null}
        </div>
    );
}