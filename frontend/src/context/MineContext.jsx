import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMines, getSystemStatus } from '../services/api';
import { MOIL_MINES } from '../data/mines';

const MineContext = createContext();

export function MineProvider({ children }) {
  const [mines, setMines] = useState(MOIL_MINES);
  const [selectedMineId, setSelectedMineId] = useState('BALAGHAT-01');
  const [systemStatus, setSystemStatus] = useState({
    online: false,
    mode: 'DEMO',
    message: 'Initializing system telemetry...'
  });
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    const status = await getSystemStatus();
    setSystemStatus(status);
  };

  useEffect(() => {
    async function init() {
      try {
        const [minesData, statusData] = await Promise.all([
          getMines(),
          getSystemStatus()
        ]);
        if (minesData && minesData.length > 0) {
          setMines(minesData);
        }
        setSystemStatus(statusData);
      } catch (err) {
        console.error('Failed to initialize mine context:', err);
      } finally {
        setLoading(false);
      }
    }
    init();

    // Periodically re-check backend connectivity every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const selectedMine = mines.find(m => m.id === selectedMineId) || mines[0] || MOIL_MINES[0];

  return (
    <MineContext.Provider
      value={{
        mines,
        selectedMineId,
        setSelectedMineId,
        selectedMine,
        systemStatus,
        checkStatus,
        loading
      }}
    >
      {children}
    </MineContext.Provider>
  );
}

export function useMine() {
  const context = useContext(MineContext);
  if (!context) {
    throw new Error('useMine must be used within a MineProvider');
  }
  return context;
}
