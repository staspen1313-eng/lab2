// Главный компонент верстки
import React, { useContext } from 'react';
import './index.css';
import { GameCtx } from './context/GameContext';
import VitalsPanel from './components/VitalsPanel';
import MarketPantry from './components/MarketPantry';
import Cauldron from './components/Cauldron';
import PotionsInventory from './components/PotionsInventory';
import CustomerQueue from './components/CustomerQueue';
import Grimoire from './components/Grimoire';

function App() {
  const { resetAll } = useContext(GameCtx);

  return (
    <div className="game-container">
      <div className="column">
        <div className="panel">
          <VitalsPanel />
        </div>
        <div className="panel">
          <MarketPantry />
        </div>
      </div>

      <div className="column">
        <div className="panel">
          <Cauldron />
        </div>
        <div className="panel">
          <CustomerQueue />
        </div>
      </div>

      <div className="column">
        <div className="panel">
          <PotionsInventory />
        </div>
        <div className="panel">
          <Grimoire />
        </div>
      </div>

      
      <button className="reset-btn-fixed" onClick={resetAll}>
        🔄 Начать заново
      </button>
    </div>
  );
}

export default App;