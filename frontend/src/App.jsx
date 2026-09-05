import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MineProvider } from './context/MineContext';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ExplorationPage } from './pages/ExplorationPage';
import { ProductionPage } from './pages/ProductionPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { SpaceWeatherPage } from './pages/SpaceWeatherPage';
import { RiskPage } from './pages/RiskPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MineProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/exploration" element={<ExplorationPage />} />
              <Route path="/production" element={<ProductionPage />} />
              <Route path="/equipment" element={<EquipmentPage />} />
              <Route path="/space-weather" element={<SpaceWeatherPage />} />
              <Route path="/risk" element={<RiskPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </MineProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
