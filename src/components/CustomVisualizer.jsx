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

function getSelectionSteps(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    steps.push({ array: [...a], minIndex: minIdx, sorted: Array.from({ length: i }, (_, k) => k), action: `Iniciando nova busca pelo menor a partir da posição ${i}` });
    for (let j = i + 1; j < n; j++) {
      steps.push({ array: [...a], comparing: [j], minIndex: minIdx, sorted: Array.from({ length: i }, (_, k) => k), action: `Comparando ${a[j]} com o menor atual (${a[minIdx]})` });
      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({ array: [...a], minIndex: minIdx, sorted: Array.from({ length: i }, (_, k) => k), action: `Novo menor encontrado: ${a[j]}` });
      }
    }
    if (minIdx !== i) {
      steps.push({ array: [...a], swapped: [i, minIdx], sorted: Array.from({ length: i }, (_, k) => k), action: `Trocando ${a[i]} com o menor encontrado (${a[minIdx]})` });
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
  }
  steps.push({ array: [...a], sorted: true, action: "Lista ordenada!" });
  return steps;
}

function getQuickSteps(arr) {
  const steps = [];
  const a = [...arr];

  function partition(low, high) {
    const pivot = a[high];
    steps.push({ array: [...a], pivot: high, range: [low, high], action: `Pivô escolhido: ${pivot}` });
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ array: [...a], comparing: [j], pivot: high, range: [low, high], action: `Comparando ${a[j]} com o pivô ${pivot}` });
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ array: [...a], swapped: [i, j], pivot: high, range: [low, high], action: `Elemento menor que pivô, movendo para a esquerda` });
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({ array: [...a], swapped: [i + 1, high], pivot: i + 1, range: [low, high], action: `Posicionando o pivô ${pivot} no seu lugar final` });
    return i + 1;
  }

  function quickSort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  quickSort(0, a.length - 1);
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
    let s = [];
    if (algorithm === "bubble") s = getBubbleSteps(nums);
    else if (algorithm === "merge") s = getMergeSteps(nums);
    else if (algorithm === "selection") s = getSelectionSteps(nums);
    else if (algorithm === "quick") s = getQuickSteps(nums);
    
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
    if (current.pivot === i) return "bg-purple-600 ring-2 ring-white";
    if (current.minIndex === i) return "bg-orange-500 ring-2 ring-white";
    if (current.swapped?.includes(i)) return "bg-red-500";
    if (current.comparing?.includes(i)) return "bg-yellow-400";
    if (current.merging && i >= current.merging[0] && i <= current.merging[1]) return "bg-purple-500";
    if (current.dividing && i >= current.dividing[0] && i <= current.dividing[2]) return "bg-blue-400";
    if (current.range && i >= current.range[0] && i <= current.range[1]) return "bg-green-900/40";
    
    if (algorithm === "bubble") return "bg-blue-600";
    if (algorithm === "merge") return "bg-purple-600";
    if (algorithm === "selection") return "bg-orange-600";
    if (algorithm === "quick") return "bg-green-600";
    return "bg-slate-600";
  };

  return (
    <div className="bg-slate-800/50 border border-slate-600/40 rounded-2xl p-6 space-y-5 shadow-xl">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <span className="w-2 h-6 bg-yellow-500 rounded-full" />
        Modo Passo a Passo — Sua Lista
      </h3>

      {!started ? (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Digite seus numeros (separados por espaco):</label>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder="Ex: 5 3 8 1 9 2"
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="block text-xs text-slate-500 uppercase tracking-widest font-bold">Selecione o Algoritmo:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setAlgorithm("bubble")}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${algorithm === "bubble" ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"}`}
              >
                Bubble Sort
              </button>
              <button
                onClick={() => setAlgorithm("selection")}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${algorithm === "selection" ? "bg-orange-600 border-orange-400 text-white shadow-lg shadow-orange-900/40" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"}`}
              >
                Selection Sort
              </button>
              <button
                onClick={() => setAlgorithm("quick")}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${algorithm === "quick" ? "bg-green-600 border-green-400 text-white shadow-lg shadow-green-900/40" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"}`}
              >
                Quick Sort
              </button>
              <button
                onClick={() => setAlgorithm("merge")}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${algorithm === "merge" ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/40" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"}`}
              >
                Merge Sort
              </button>
            </div>
          </div>

          <button
            onClick={start}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
          >
            <Play size={16} /> Iniciar Visualização
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-slate-950 rounded-xl px-4 py-3 text-sm text-yellow-300 font-medium border border-slate-800 shadow-inner flex items-center gap-3">
            <span className="shrink-0 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            {current.action || ""}
          </div>

          <div className="flex items-end justify-center gap-1.5 h-48 bg-slate-900/30 rounded-2xl p-4 border border-slate-800/50">
            {arr.map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-white transition-colors">{val}</span>
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${getBarColor(i)} shadow-lg`}
                  style={{ height: `${(val / maxVal) * 140}px` }}
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
              <span>Início</span>
              <span>Passo {stepIndex + 1} de {steps.length}</span>
              <span>Fim</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1.5 border border-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  algorithm === "bubble" ? "bg-blue-500" : 
                  algorithm === "selection" ? "bg-orange-500" :
                  algorithm === "quick" ? "bg-green-500" : "bg-purple-500"
                }`}
                style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-center pt-2">
            <button onClick={reset} className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700">
              <RotateCcw size={14} /> Nova Lista
            </button>
            <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700">
              <button
                onClick={() => setStepIndex(p => Math.max(0, p - 1))}
                disabled={stepIndex === 0}
                className="px-4 py-1.5 hover:bg-slate-700 rounded-lg text-xs font-bold transition-all disabled:opacity-20"
              >
                Anterior
              </button>
              <button
                onClick={() => setStepIndex(p => Math.min(steps.length - 1, p + 1))}
                disabled={stepIndex === steps.length - 1}
                className="flex items-center gap-2 px-6 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-20 shadow-lg shadow-blue-900/20"
              >
                Próximo <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}