import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Shuffle } from "lucide-react";

function generateArray() {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 90) + 10);
}

function getSelectionSortSteps(inputArr) {
  const steps = [];
  const arr = [...inputArr];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({ 
      array: [...arr], 
      currentMin: minIdx,
      comparing: [i],
      sorted: Array.from({ length: i }, (_, k) => k)
    });
    
    for (let j = i + 1; j < n; j++) {
      steps.push({ 
        array: [...arr], 
        currentMin: minIdx,
        comparing: [j],
        sorted: Array.from({ length: i }, (_, k) => k)
      });
      
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({ 
          array: [...arr], 
          currentMin: minIdx,
          comparing: [j],
          sorted: Array.from({ length: i }, (_, k) => k)
        });
      }
    }
    
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ 
        array: [...arr], 
        swapped: [i, minIdx],
        sorted: Array.from({ length: i + 1 }, (_, k) => k)
      });
    } else {
        steps.push({ 
          array: [...arr], 
          sorted: Array.from({ length: i + 1 }, (_, k) => k)
        });
    }
  }
  
  steps.push({ 
    array: [...arr], 
    finished: true,
    sorted: Array.from({ length: n }, (_, k) => k) 
  });
  
  return steps;
}

export default function SelectionSortVisualizer() {
  const [array, setArray] = useState(generateArray);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(100);
  const intervalRef = useRef(null);

  useEffect(() => {
    const s = getSelectionSortSteps(array);
    setSteps(s);
    setStepIndex(0);
    setPlaying(false);
  }, [array]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, steps, speed]);

  const current = steps[stepIndex] || { array, comparing: [], swapped: [], sorted: [] };
  const maxVal = Math.max(...current.array);

  const getBarColor = (i) => {
    if (current.finished) return "bg-green-500";
    if (current.swapped?.includes(i)) return "bg-red-500";
    if (current.currentMin === i) return "bg-orange-500";
    if (current.comparing?.includes(i)) return "bg-yellow-400";
    if (current.sorted?.includes(i)) return "bg-green-500";
    return "bg-blue-600";
  };

  const reset = () => setArray(generateArray());

  return (
    <div className="bg-slate-800/50 border border-orange-700/40 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-bold text-orange-300">🔍 Visualizador — Selection Sort</h3>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Velocidade:</label>
          <select
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="bg-slate-700 text-white text-xs rounded px-2 py-1"
          >
            <option value={300}>Lento</option>
            <option value={100}>Normal</option>
            <option value={50}>Rápido</option>
          </select>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end justify-center gap-1 h-48">
        {current.array.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-xs text-slate-400">{val}</span>
            <div
              className={`w-full rounded-t-sm transition-all duration-100 ${getBarColor(i)}`}
              style={{ height: `${(val / maxVal) * 140}px` }}
            />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-600 inline-block" /> Aguardando</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> Comparando</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-500 inline-block" /> Menor Encontrado</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block" /> Trocando</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> Ordenado</span>
      </div>

      {/* Progress */}
      <div className="text-xs text-slate-400 text-center">
        Passo {stepIndex + 1} de {steps.length}
      </div>
      <div className="w-full bg-slate-700 rounded-full h-1.5">
        <div className="bg-orange-500 h-1.5 rounded-full transition-all" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} />
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
          className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-sm font-semibold transition-colors"
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
