import React, { useEffect, useState } from 'react';
import { useMine } from '../context/MineContext';
import { getDashboard } from '../services/api';
import { PipelineBanner } from '../components/common/PipelineBanner';
import { StatCard } from '../components/common/StatCard';
import { CurrentConditions } from '../components/dashboard/CurrentConditions';
import { ProductionChart } from '../components/dashboard/ProductionChart';
import { ShortfallCard } from '../components/dashboard/ShortfallCard';
import { MineOverviewMiniMap } from '../components/dashboard/MineOverviewMiniMap';
import { OperationalDelays } from '../components/operations/OperationalDelays';
import { LoadingState } from '../components/common/LoadingState';
import {
  Compass,
  Activity,
  Cpu,
  AlertTriangle,
  ShieldCheck,
  TrendingDown,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { selectedMine, selectedMineId } = useMine();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const res = await getDashboard(selectedMineId);
        if (mounted) setDashboardData(res);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, [selectedMineId]);

  if (loading || !dashboardData) {
    return <LoadingState message="Aggregating Mine Telemetry & ML Models..." height="h-96" />;
  }

  const { kpis, currentConditions, shortfallForecast } = dashboardData;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Core End-to-End Pipeline Banner (Section 37) */}
      <PipelineBanner />

      {/* 2. Top 5 Command KPI Cards (Section 7) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard
          title="Estimated Reserve"
          value={kpis.estimatedReserveMT}
          unit="MT"
          secondaryMetric="Proven & Probable"
          status="ACTIVE"
          icon={Compass}
          variant="green"
        />

        <StatCard
          title="Today's Production"
          value={kpis.todayProductionTonnes.toLocaleString()}
          unit="T"
          secondaryMetric="Shift 1 Extracted"
          trend="-850 T"
          icon={Activity}
          variant="default"
        />

        <StatCard
          title="Predicted Production"
          value={kpis.predictedProductionTonnes.toLocaleString()}
          unit="T"
          secondaryMetric="ML 24h Regressor"
          status="NORMAL"
          icon={Cpu}
          variant="blue"
        />

        <StatCard
          title="Expected Shortfall"
          value={kpis.expectedShortfallTonnes.toLocaleString()}
          unit="T"
          secondaryMetric={`-${kpis.shortfallPercentage}% of daily target`}
          status={kpis.overallRisk}
          icon={TrendingDown}
          variant="red"
        />

        <StatCard
          title="Overall Risk"
          value={kpis.overallRisk}
          secondaryMetric={`Confidence: ${kpis.confidence}%`}
          status={kpis.overallRisk}
          icon={AlertTriangle}
          variant="amber"
        />
      </div>

      {/* 3. Section 8: Explicit ML Current Mining Conditions (Rainfall, Soil Moisture, Temp, Equip, Delays) */}
      <CurrentConditions data={currentConditions} />

      {/* 4. Section 9 & 10: Production Chart + AI Shortfall Forecast Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductionChart />
        </div>
        <div>
          <ShortfallCard
            expectedShortfall={kpis.expectedShortfallTonnes}
            productionTarget={selectedMine.dailyTarget}
            riskLevel={kpis.overallRisk}
            confidence={kpis.confidence}
          />
        </div>
      </div>

      {/* 5. Section 17 & Map: Operational Delays + Mini GIS Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OperationalDelays
          drillingDelay={currentConditions.drillingDelay}
          blastDelay={currentConditions.blastDelay}
        />
        <MineOverviewMiniMap mine={selectedMine} />
      </div>

      {/* 6. Quick Action Navigation Bar */}
      <div className="p-4 rounded-xl bg-mining-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Need to run deep ML exploration or inspect fleet status?</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/exploration"
            className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            <span>Explore Manganese Reserves</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-slate-600">|</span>
          <Link
            to="/recommendations"
            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
          >
            <span>View AI Decision Support</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
