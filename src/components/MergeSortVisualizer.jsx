import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Shuffle } from "lucide-react";

function generateArray() {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
}

function getMergeSortSteps(inputArr) {
  const steps = [];
  const arr = [...inputArr];

  function merge(a, left, mid, right) {
    const L = a.slice(left, mid + 1);
    const R = a.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < L.length && j < R.length) {
      steps.push({ array: [...a], comparing: [left + i, mid + 1 + j], merging: [left, right] });
      if (L[i] <= R[j]) { a[k++] = L[i++]; }
      else { a[k++] = R[j++]; }
      steps.push({ array: [...a], merging: [left, right] });
    }
    while (i < L.length) { a[k++] = L[i++]; steps.push({ array: [...a], merging: [left, right] }); }
    while (j < R.length) { a[k++] = R[j++]; steps.push({ array: [...a], merging: [left, right] }); }
  }

  function mergeSort(a, left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    steps.push({ array: [...a], dividing: [left, mid, right] });
    mergeSort(a, left, mid);
    mergeSort(a, mid + 1, right);
    merge(a, left, mid, right);
  }

  mergeSort(arr, 0, arr.length - 1);
  steps.push({ array: [...arr], sorted: true });
  return steps;
}

export default function MergeSortVisualizer() {
  const [array, setArray] = useState(generateArray);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(300);
  const intervalRef = useRef(null);

  useEffect(() => {
    const s = getMergeSortSteps(array);
    setSteps(s);
    setStepIndex(0);
    setPlaying(false);
  }, [array]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStepIndex(prev => {
          if (prev >= steps.length - 1) { setPlaying(false); return prev; }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, steps, speed]);

  const current = steps[stepIndex] || { array, comparing: [], merging: null };
  const maxVal = Math.max(...current.array);

  const getBarColor = (i) => {
    if (current.sorted) return "bg-green-500";
    if (current.comparing?.includes(i)) return "bg-yellow-400";
    if (current.merging && i >= current.merging[0] && i <= current.merging[1]) return "bg-purple-500";
    if (current.dividing && i >= current.dividing[0] && i <= current.dividing[2]) return "bg-blue-400";
    return "bg-slate-500";
  };

  const reset = () => setArray(generateArray());

  return (
    <div className="bg-slate-800/50 border border-purple-700/40 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-bold text-purple-300">🔀 Visualizador — Merge Sort</h3>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Velocidade:</label>
          <select
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="bg-slate-700 text-white text-xs rounded px-2 py-1"
          >
            <option value={700}>Lento</option>
            <option value={300}>Normal</option>
            <option value={100}>Rápido</option>
          </select>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end justify-center gap-1 h-48">
        {current.array.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-xs text-slate-400">{val}</span>
            <div
              className={`w-full rounded-t-sm transition-all duration-150 ${getBarColor(i)}`}
              style={{ height: `${(val / maxVal) * 140}px` }}
            />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-400 inline-block" /> Dividindo</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> Comparando</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-500 inline-block" /> Mesclando</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> Ordenado</span>
      </div>

      {/* Progress */}
      <div className="text-xs text-slate-400 text-center">
        Passo {stepIndex + 1} de {steps.length}
      </div>
      <div className="w-full bg-slate-700 rounded-full h-1.5">
        <div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} />
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button onClick={reset} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
          <Shuffle size={14} /> Nova lista
        </button>
        <button onClick={() => setStepIndex(0)} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
          <RotateCcw size={14} /> Reiniciar
        </button>
        <button
          onClick={() => setPlaying(!playing)}
          className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-semibold transition-colors"
        >
          {playing ? <><Pause size={14} /> Pausar</> : <><Play size={14} /> {stepIndex === steps.length - 1 ? "Ver de novo" : "Play"}</>}
        </button>
        <button
          onClick={() => setStepIndex(p => Math.min(p + 1, steps.length - 1))}
          disabled={playing}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors disabled:opacity-40"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}