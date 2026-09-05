import React from 'react';
import { Truck, Wrench, AlertTriangle, Gauge, Clock, Activity, CheckCircle2 } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export function EquipmentStats({ summary }) {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <StatCard
        title="Total Fleet"
        value={summary.totalEquipment}
        unit="units"
        secondaryMetric={`${summary.active} in service`}
        icon={Truck}
        variant="default"
      />

      <StatCard
        title="Active Equipment"
        value={summary.active}
        unit="units"
        status="ACTIVE"
        secondaryMetric="79.7% of fleet"
        icon={CheckCircle2}
        variant="green"
      />

      <StatCard
        title="In Maintenance"
        value={summary.maintenance}
        unit="units"
        status="MAINTENANCE"
        secondaryMetric="Scheduled shop bays"
        icon={Wrench}
        variant="amber"
      />

      <StatCard
        title="Down / Unscheduled"
        value={summary.down}
        unit="units"
        status="DOWN"
        secondaryMetric="Critical bottleneck"
        icon={AlertTriangle}
        variant="red"
      />

      <StatCard
        title="Avg Availability"
        value={`${summary.averageAvailability}%`}
        secondaryMetric="-5.8% vs target (90%)"
        icon={Gauge}
        variant="amber"
      />

      <StatCard
        title="Total Downtime"
        value={summary.totalDowntimeHours}
        unit="hrs"
        secondaryMetric="Loss: ~650 T/day"
        icon={Clock}
        variant="red"
      />
    </div>
  );
}
