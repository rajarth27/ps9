import React, { useState } from 'react';
import { RecommendationCard } from '../components/recommendations/RecommendationCard';
import { ActionSimulationModal } from '../components/recommendations/ActionSimulationModal';
import { AI_RECOMMENDATIONS, RECOMMENDATION_TYPES } from '../data/recommendations';
import { Lightbulb, Filter, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export function RecommendationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Recommendations');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [simulatingRecommendation, setSimulatingRecommendation] = useState(null);

  const filtered = AI_RECOMMENDATIONS.filter(item => {
    const matchesCat = selectedCategory === 'All Recommendations' || item.category === selectedCategory;
    const matchesPriority = priorityFilter === 'ALL' || item.priority === priorityFilter;
    return matchesCat && matchesPriority;
  });

  const totalRecovery = AI_RECOMMENDATIONS.reduce((acc, curr) => acc + (curr.expectedRecoveryTonnes || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black text-white tracking-tight uppercase">
              AI Decision Support & Corrective Actions
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
              Prescriptive Intelligence
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Data-driven operational directives to eliminate production shortfalls and enhance haulage throughput
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-mining-900 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Total Recoverable: <strong>~{totalRecovery} T / day</strong></span>
          </div>
        </div>
      </div>

      {/* Filter and Category Bar (Section 23) */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-mining-850">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex-shrink-0">
            Category:
          </span>
          <div className="flex items-center gap-1 min-w-max">
            {RECOMMENDATION_TYPES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white bg-mining-900 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center flex-shrink-0">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Priority:
          </span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-mining-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High Priority Only</option>
            <option value="MEDIUM">Medium Priority Only</option>
            <option value="LOW">Low Priority Only</option>
          </select>
        </div>
      </div>

      {/* Recommendation Cards List */}
      <div className="space-y-4">
        {filtered.map(item => (
          <RecommendationCard
            key={item.id}
            recommendation={item}
            onSimulate={(rec) => setSimulatingRecommendation(rec)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center text-slate-500 glass-panel rounded-xl border border-slate-800">
            No recommendations match your selected filters.
          </div>
        )}
      </div>

      {/* Action Simulation Modal */}
      <ActionSimulationModal
        recommendation={simulatingRecommendation}
        isOpen={!!simulatingRecommendation}
        onClose={() => setSimulatingRecommendation(null)}
        currentShortfall={700}
        target={10000}
      />
    </div>
  );
}
