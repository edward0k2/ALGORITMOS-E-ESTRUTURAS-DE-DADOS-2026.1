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
    title: "O que sao Algoritmos de Ordenacao?",
    body: "Algoritmos de ordenacao reorganizam os elementos de uma lista em uma ordem especifica (crescente ou decrescente). Sao fundamentais na Computacao e usados em buscas, bancos de dados, jogos e muito mais.",
    icon: "📚",
  },
  {
    id: 3,
    type: "algorithm",
    name: "Bubble Sort",
    tag: "Algoritmo Simples",
    tagColor: "blue",
    description: "Percorre a lista repetidamente, comparando e trocando elementos vizinhos fora de ordem.",
    steps: ["Compara lista[j] e lista[j+1]", "Se lista[j] > lista[j+1], troca os dois", "Repete ate nao haver mais trocas", "Elementos maiores sobem ao final"],
    complexity: { best: "O(n)", worst: "O(n²)" },
    icon: "🫧",
  },
  {
    id: 4,
    type: "code",
    name: "Bubble Sort — Codigo Python",
    tagColor: "blue",
    code: `def bubble_sort(lista):
    n = len(lista)
    for i in range(n):
        for j in range(0, n - i - 1):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j+1] = lista[j+1], lista[j]
    return lista

# Exemplo
numeros = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(numeros))
# Saida: [11, 12, 22, 25, 34, 64, 90]`,
  },
  {
    id: 5,
    type: "algorithm",
    name: "Merge Sort",
    tag: "Algoritmo Eficiente",
    tagColor: "purple",
    description: "Usa dividir e conquistar: divide a lista ao meio recursivamente, depois mescla as partes em ordem.",
    steps: ["Divide a lista ao meio", "Chama merge_sort em cada metade", "Mescla as duas metades ordenadas", "Garantia de O(n log n) sempre"],
    complexity: { best: "O(n log n)", worst: "O(n log n)" },
    icon: "🔀",
  },
  {
    id: 6,
    type: "code",
    name: "Merge Sort — Codigo Python",
    tagColor: "purple",
    code: `def merge_sort(lista):
    if len(lista) <= 1:
        return lista
    meio = len(lista) // 2
    esq = merge_sort(lista[:meio])
    dir = merge_sort(lista[meio:])
    return merge(esq, dir)

def merge(esq, dir):
    resultado, i, j = [], 0, 0
    while i < len(esq) and j < len(dir):
        if esq[i] <= dir[j]:
            resultado.append(esq[i]); i += 1
        else:
            resultado.append(dir[j]); j += 1
    resultado.extend(esq[i:])
    resultado.extend(dir[j:])
    return resultado`,
  },
  {
    id: 7,
    type: "comparison",
  },
  {
    id: 8,
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
              <p className="text-blue-300 text-lg">Bubble Sort e Merge Sort</p>
              <div className="h-px w-24 bg-blue-700" />
              <p className="text-slate-400 text-sm">Disciplina: Algoritmos e Estrutura de Dados — UPE</p>
            </div>
          )}

          {slide.type === "intro" && (
            <div className="p-10 flex flex-col justify-center min-h-96 space-y-6">
              <div className="text-5xl">{slide.icon}</div>
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="text-slate-300 text-lg leading-relaxed">{slide.body}</p>
              <div className="flex gap-4 flex-wrap mt-4">
                <span className="px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full text-sm border border-blue-700">Bubble Sort</span>
                <span className="px-4 py-2 bg-purple-900/50 text-purple-300 rounded-full text-sm border border-purple-700">Merge Sort</span>
              </div>
            </div>
          )}

          {slide.type === "algorithm" && (
            <div className="p-10 flex flex-col justify-center min-h-96 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{slide.icon}</span>
                <div>
                  <span className={`text-xs px-3 py-1 rounded-full ${slide.tagColor === "blue" ? "bg-blue-900 text-blue-300" : "bg-purple-900 text-purple-300"}`}>{slide.tag}</span>
                  <h2 className="text-2xl font-bold mt-1">{slide.name}</h2>
                </div>
              </div>
              <p className="text-slate-300">{slide.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slide.steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-800/60 rounded-xl p-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${slide.tagColor === "blue" ? "bg-blue-700" : "bg-purple-700"}`}>{i + 1}</span>
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
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-slate-400">Criterio</th>
                    <th className="text-center py-2 text-blue-400">Bubble Sort</th>
                    <th className="text-center py-2 text-purple-400">Merge Sort</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    ["Pior Caso", "O(n²)", "O(n log n)"],
                    ["Espaco extra", "O(1)", "O(n)"],
                    ["Estavel", "Sim", "Sim"],
                    ["Listas grandes", "Lento", "Ideal"],
                  ].map(([c, b, m]) => (
                    <tr key={c}>
                      <td className="py-2.5 text-slate-300">{c}</td>
                      <td className="py-2.5 text-center font-mono text-blue-300">{b}</td>
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
              <p className="text-slate-300 max-w-lg leading-relaxed">
                O <span className="text-blue-300 font-semibold">Bubble Sort</span> e simples e didatico.
                O <span className="text-purple-300 font-semibold">Merge Sort</span> e eficiente e escalavel.
                Escolha o algoritmo certo para cada situacao!
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