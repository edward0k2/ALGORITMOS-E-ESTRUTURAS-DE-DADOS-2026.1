import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    type: "cover",
    content: null,
  },
  {
    id: 2,
    type: "intro",
    title: "O que são Algoritmos de Ordenação?",
    body: "Algoritmos de ordenação reorganizam os elementos de uma lista em uma ordem específica. Eles são a base para sistemas de busca, bancos de dados e otimização de performance em larga escala.",
    icon: "📚",
  },
  {
    id: 3,
    type: "algorithm",
    name: "Bubble Sort",
    tag: "Algoritmo Simples",
    tagColor: "blue",
    description: "O algoritmo mais intuitivo. Percorre a lista repetidamente, comparando e trocando elementos vizinhos fora de ordem.",
    steps: ["Compara elementos adjacentes", "Troca se estiverem fora de ordem", "O maior elemento 'flutua' até o fim", "Repete até a lista estar ordenada"],
    complexity: { best: "O(n)", worst: "O(n²)" },
    icon: "🫧",
  },
  {
    id: 4,
    type: "algorithm",
    name: "Selection Sort",
    tag: "Algoritmo Simples",
    tagColor: "orange",
    description: "Mantém uma parte ordenada e outra não. Seleciona sistematicamente o menor elemento da parte não ordenada e o move para o início.",
    steps: ["Encontra o menor elemento da lista", "Troca com o primeiro elemento não ordenado", "Avança a fronteira da parte ordenada", "Minimiza o número total de trocas"],
    complexity: { best: "O(n²)", worst: "O(n²)" },
    icon: "🔍",
  },
  {
    id: 5,
    type: "algorithm",
    name: "Quick Sort",
    tag: "Eficiência Máxima",
    tagColor: "green",
    description: "Usa um 'Pivô' para dividir a lista. É um dos algoritmos mais rápidos na prática e usa a estratégia de dividir e conquistar.",
    steps: ["Escolhe um elemento como Pivô", "Particiona a lista ao redor do pivô", "Recursão para os lados esquerdo e direito", "Extremamente eficiente em cache"],
    complexity: { best: "O(n log n)", worst: "O(n²)" },
    icon: "⚡",
  },
  {
    id: 6,
    type: "algorithm",
    name: "Merge Sort",
    tag: "Eficiente e Estável",
    tagColor: "purple",
    description: "Divide a lista ao meio recursivamente até chegar em elementos únicos, depois os mescla (merge) de forma ordenada.",
    steps: ["Divide a lista sucessivamente ao meio", "Ordena as sublistas de 1 elemento", "Intercala (Merge) as sublistas em ordem", "Garante performance estável"],
    complexity: { best: "O(n log n)", worst: "O(n log n)" },
    icon: "🔀",
  },
  {
    id: 7,
    type: "code",
    name: "Selection & Quick Sort — Python",
    tagColor: "green",
    code: `# Selection Sort
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]: min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

# Quick Sort (Recursivo)
def quick_sort(arr):
    if len(arr) <= 1: return arr
    pivo = arr[len(arr) // 2]
    esq = [x for x in arr if x < pivo]
    meio = [x for x in arr if x == pivo]
    dir = [x for x in arr if x > pivo]
    return quick_sort(esq) + meio + quick_sort(dir)`,
  },
  {
    id: 8,
    type: "comparison",
  },
  {
    id: 9,
    type: "conclusion",
  },
];

export default function Slides() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const prev = () => setCurrent(p => Math.max(0, p - 1));
  const next = () => setCurrent(p => Math.min(slides.length - 1, p + 1));

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
          <ArrowLeft size={14} /> Voltar
        </Link>
        <span className="text-xs text-slate-500">{current + 1} / {slides.length}</span>
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-blue-400 w-4" : "bg-slate-700"}`}
            />
          ))}
        </div>
      </div>

      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl min-h-96 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          {slide.type === "cover" && (
            <div className="h-full min-h-96 flex flex-col items-center justify-center text-center p-10 bg-gradient-to-br from-blue-950 to-slate-900 space-y-6">
              <div className="text-6xl">🔢</div>
              <h1 className="text-4xl font-extrabold text-white leading-tight">Algoritmos de<br />Ordenacao</h1>
              <p className="text-blue-300 text-sm">Bubble • Selection • Quick • Merge</p>
              <div className="h-px w-24 bg-blue-700" />
              <div className="space-y-1">
                <p className="text-slate-400 text-xs">Disciplina: Algoritmos e Estrutura de Dados — UPE</p>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest">Integrantes</p>
                <p className="text-slate-300 text-[11px] leading-tight">
                  Deilson Pereira • Jesus Eduardo • Juciana Maria<br />
                  Mathias Ferreira • Rahissa Beatriz
                </p>
              </div>
            </div>
          )}

          {slide.type === "intro" && (
            <div className="p-10 flex flex-col justify-center min-h-96 space-y-6">
              <div className="text-5xl">{slide.icon}</div>
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="text-slate-300 text-lg leading-relaxed">{slide.body}</p>
              <div className="flex gap-4 flex-wrap mt-4">
                <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-[10px] border border-blue-700">Bubble</span>
                <span className="px-3 py-1 bg-orange-900/50 text-orange-300 rounded-full text-[10px] border border-orange-700">Selection</span>
                <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-[10px] border border-green-700">Quick</span>
                <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-[10px] border border-purple-700">Merge</span>
              </div>
            </div>
          )}

          {slide.type === "algorithm" && (
            <div className="p-10 flex flex-col justify-center min-h-96 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{slide.icon}</span>
                <div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    slide.tagColor === "blue" ? "bg-blue-900 text-blue-300" : 
                    slide.tagColor === "orange" ? "bg-orange-900 text-orange-300" : 
                    slide.tagColor === "green" ? "bg-green-900 text-green-300" : 
                    "bg-purple-900 text-purple-300"
                  }`}>{slide.tag}</span>
                  <h2 className="text-2xl font-bold mt-1">{slide.name}</h2>
                </div>
              </div>
              <p className="text-slate-300">{slide.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slide.steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-800/60 rounded-xl p-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      slide.tagColor === "blue" ? "bg-blue-700" : 
                      slide.tagColor === "orange" ? "bg-orange-700" : 
                      slide.tagColor === "green" ? "bg-green-700" : 
                      "bg-purple-700"
                    }`}>{i + 1}</span>
                    <span className="text-sm text-slate-300">{s}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-800/60 rounded-xl px-4 py-2 text-sm">
                  <span className="text-slate-500">Melhor: </span>
                  <span className="font-mono text-green-400">{slide.complexity.best}</span>
                </div>
                <div className="bg-slate-800/60 rounded-xl px-4 py-2 text-sm">
                  <span className="text-slate-500">Pior: </span>
                  <span className="font-mono text-red-400">{slide.complexity.worst}</span>
                </div>
              </div>
            </div>
          )}

          {slide.type === "code" && (
            <div className="p-10 flex flex-col justify-center min-h-96 space-y-4">
              <h2 className="text-xl font-bold">{slide.name}</h2>
              <pre className="bg-slate-950 rounded-xl p-5 text-sm text-green-300 font-mono overflow-x-auto leading-relaxed">
                {slide.code}
              </pre>
            </div>
          )}

          {slide.type === "comparison" && (
            <div className="p-10 flex flex-col justify-center min-h-96 space-y-5">
              <h2 className="text-2xl font-bold">Comparacao</h2>
              <table className="w-full text-[10px] sm:text-xs">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-slate-400">Criterio</th>
                    <th className="text-center py-2 text-blue-400">Bubble</th>
                    <th className="text-center py-2 text-orange-400">Selection</th>
                    <th className="text-center py-2 text-green-400">Quick</th>
                    <th className="text-center py-2 text-purple-400">Merge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    ["Pior Caso", "O(n²)", "O(n²)", "O(n²)", "O(n log n)"],
                    ["Espaco", "O(1)", "O(1)", "O(log n)", "O(n)"],
                    ["Estavel", "Sim", "Não", "Não", "Sim"],
                  ].map(([c, b, s, q, m]) => (
                    <tr key={c}>
                      <td className="py-2.5 text-slate-300">{c}</td>
                      <td className="py-2.5 text-center font-mono text-blue-300">{b}</td>
                      <td className="py-2.5 text-center font-mono text-orange-300">{s}</td>
                      <td className="py-2.5 text-center font-mono text-green-300">{q}</td>
                      <td className="py-2.5 text-center font-mono text-purple-300">{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {slide.type === "conclusion" && (
            <div className="p-10 flex flex-col items-center justify-center min-h-96 text-center space-y-6 bg-gradient-to-br from-slate-900 to-blue-950">
              <div className="text-5xl">✅</div>
              <h2 className="text-3xl font-bold">Conclusao</h2>
              <p className="text-slate-300 max-w-lg text-sm leading-relaxed">
                Aprendemos que cada algoritmo tem seu propósito: do <span className="text-blue-300">Bubble</span> para educação ao <span className="text-green-300">Quick Sort</span> para performance bruta. 
                O <span className="text-purple-300">Merge</span> nos garante estabilidade, e o <span className="text-orange-300">Selection</span> minimiza trocas. 
                Escolher o algoritmo certo é a marca de um bom desenvolvedor!
              </p>
              <p className="text-slate-500 text-sm">Obrigado pela atencao!</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 py-4 bg-slate-900 border-t border-slate-800">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm font-medium transition-colors disabled:opacity-30"
        >
          <ChevronLeft size={16} /> Anterior
        </button>
        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium transition-colors disabled:opacity-30"
        >
          Proximo <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}