import { useState } from "react";
import { Play, RotateCcw, ChevronRight } from "lucide-react";

function getBubbleSteps(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const comparing = [j, j + 1];
      const sorted = Array.from({ length: i }, (_, k) => n - 1 - k);
      if (a[j] > a[j + 1]) {
        steps.push({ array: [...a], comparing, sorted, action: `Comparando ${a[j]} e ${a[j+1]}: trocando!` });
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ array: [...a], swapped: comparing, sorted, action: `Troca feita!` });
      } else {
        steps.push({ array: [...a], comparing, sorted, action: `Comparando ${a[j]} e ${a[j+1]}: sem troca` });
      }
    }
  }
  steps.push({ array: [...a], sorted: Array.from({ length: n }, (_, k) => k), action: "Lista ordenada!" });
  return steps;
}

function getMergeSteps(arr) {
  const steps = [];
  const a = [...arr];

  function merge(arr2, left, mid, right) {
    const L = arr2.slice(left, mid + 1);
    const R = arr2.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < L.length && j < R.length) {
      steps.push({ array: [...arr2], comparing: [left + i, mid + 1 + j], merging: [left, right], action: `Comparando ${L[i]} e ${R[j]}` });
      if (L[i] <= R[j]) { arr2[k++] = L[i++]; }
      else { arr2[k++] = R[j++]; }
      steps.push({ array: [...arr2], merging: [left, right], action: "Mesclando..." });
    }
    while (i < L.length) { arr2[k++] = L[i++]; steps.push({ array: [...arr2], merging: [left, right], action: "Mesclando restantes..." }); }
    while (j < R.length) { arr2[k++] = R[j++]; steps.push({ array: [...arr2], merging: [left, right], action: "Mesclando restantes..." }); }
  }

  function mergeSort(arr2, left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    steps.push({ array: [...arr2], dividing: [left, mid, right], action: `Dividindo posicoes ${left} a ${right}` });
    mergeSort(arr2, left, mid);
    mergeSort(arr2, mid + 1, right);
    merge(arr2, left, mid, right);
  }

  mergeSort(a, 0, a.length - 1);
  steps.push({ array: [...a], sorted: true, action: "Lista ordenada!" });
  return steps;
}

export default function CustomVisualizer() {
  const [input, setInput] = useState("5 3 8 1 9 2 7 4");
  const [algorithm, setAlgorithm] = useState("bubble");
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");

  const parseInput = () => {
    const nums = input.trim().split(/[\s,]+/).map(Number);
    if (nums.some(isNaN) || nums.length < 2 || nums.length > 15) {
      setError("Digite entre 2 e 15 numeros separados por espaco.");
      return null;
    }
    setError("");
    return nums;
  };

  const start = () => {
    const nums = parseInput();
    if (!nums) return;
    const s = algorithm === "bubble" ? getBubbleSteps(nums) : getMergeSteps(nums);
    setSteps(s);
    setStepIndex(0);
    setStarted(true);
  };

  const reset = () => { setStarted(false); setSteps([]); setStepIndex(0); };

  const current = steps[stepIndex] || {};
  const arr = current.array || [];
  const maxVal = arr.length ? Math.max(...arr) : 1;

  const getBarColor = (i) => {
    if (current.sorted === true || current.sorted?.includes(i)) return "bg-green-500";
    if (current.swapped?.includes(i)) return "bg-red-500";
    if (current.comparing?.includes(i)) return "bg-yellow-400";
    if (current.merging && i >= current.merging[0] && i <= current.merging[1]) return "bg-purple-500";
    if (current.dividing && i >= current.dividing[0] && i <= current.dividing[2]) return "bg-blue-400";
    return algorithm === "bubble" ? "bg-blue-600" : "bg-purple-600";
  };

  return (
    <div className="bg-slate-800/50 border border-slate-600/40 rounded-2xl p-6 space-y-5">
      <h3 className="text-lg font-bold text-white">Modo Passo a Passo — Sua Lista</h3>

      {!started ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Digite seus numeros (separados por espaco):</label>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              placeholder="Ex: 5 3 8 1 9 2"
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setAlgorithm("bubble")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${algorithm === "bubble" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-400"}`}
            >
              Bubble Sort
            </button>
            <button
              onClick={() => setAlgorithm("merge")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${algorithm === "merge" ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-400"}`}
            >
              Merge Sort
            </button>
          </div>
          <button
            onClick={start}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 rounded-xl text-sm font-semibold transition-colors"
          >
            <Play size={14} /> Comecar
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Action label */}
          <div className="bg-slate-900/60 rounded-xl px-4 py-2 text-sm text-yellow-300 font-medium min-h-9">
            {current.action || ""}
          </div>

          {/* Bars */}
          <div className="flex items-end justify-center gap-1 h-40">
            {arr.map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-xs text-slate-400">{val}</span>
                <div
                  className={`w-full rounded-t-sm transition-all duration-200 ${getBarColor(i)}`}
                  style={{ height: `${(val / maxVal) * 120}px` }}
                />
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="text-xs text-slate-400 text-center">Passo {stepIndex + 1} de {steps.length}</div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${algorithm === "bubble" ? "bg-blue-500" : "bg-purple-500"}`}
              style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={reset} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
              <RotateCcw size={14} /> Nova lista
            </button>
            <button
              onClick={() => setStepIndex(p => Math.max(0, p - 1))}
              disabled={stepIndex === 0}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors disabled:opacity-40"
            >
              Anterior
            </button>
            <button
              onClick={() => setStepIndex(p => Math.min(steps.length - 1, p + 1))}
              disabled={stepIndex === steps.length - 1}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40"
            >
              Proximo <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}