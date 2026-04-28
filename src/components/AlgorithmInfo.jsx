import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AlgorithmInfo({ name, type, color, description, bestCase, worstCase, whenToUse, code }) {
  const [showCode, setShowCode] = useState(false);

  const colorMap = {
    blue: { badge: "bg-blue-900/50 text-blue-300 border-blue-700", border: "border-blue-700/40", accent: "text-blue-400" },
    purple: { badge: "bg-purple-900/50 text-purple-300 border-purple-700", border: "border-purple-700/40", accent: "text-purple-400" },
  };
  const c = colorMap[color];

  return (
    <div className={`bg-slate-800/50 border ${c.border} rounded-2xl p-6 space-y-4`}>
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-2xl font-bold">{name}</h2>
        <span className={`text-xs border px-3 py-1 rounded-full ${c.badge}`}>{type}</span>
      </div>

      <p className="text-slate-300 leading-relaxed">{description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 rounded-xl p-4">
          <div className="text-xs text-slate-500 mb-1">Melhor Caso</div>
          <div className={`text-lg font-mono font-bold ${c.accent}`}>{bestCase}</div>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-4">
          <div className="text-xs text-slate-500 mb-1">Pior Caso</div>
          <div className="text-lg font-mono font-bold text-red-400">{worstCase}</div>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-4">
          <div className="text-xs text-slate-500 mb-1">Quando Usar</div>
          <div className="text-sm text-slate-300">{whenToUse}</div>
        </div>
      </div>

      <button
        onClick={() => setShowCode(!showCode)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        {showCode ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {showCode ? "Ocultar código Python" : "Ver código Python"}
      </button>

      {showCode && (
        <pre className="bg-slate-950 rounded-xl p-4 text-sm text-green-300 font-mono overflow-x-auto leading-relaxed">
          {code}
        </pre>
      )}
    </div>
  );
}