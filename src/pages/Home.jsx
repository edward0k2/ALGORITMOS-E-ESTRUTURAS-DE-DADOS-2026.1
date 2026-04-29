import { useState } from "react";
import { Link } from "react-router-dom";
import CustomVisualizer from "../components/CustomVisualizer";
import BubbleSortVisualizer from "../components/BubbleSortVisualizer";
import MergeSortVisualizer from "../components/MergeSortVisualizer";
import SelectionSortVisualizer from "../components/SelectionSortVisualizer";
import QuickSortVisualizer from "../components/QuickSortVisualizer";
import AlgorithmInfo from "../components/AlgorithmInfo";
import ComparisonTable from "../components/ComparisonTable";
import { Linkedin, Github } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("bubble");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <header className="border-b border-blue-800/40 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-blue-300 tracking-tight">
              Algoritmos e Estrutura de Dados UPE
            </h1>
            <p className="text-xs text-slate-400">Seminario Interativo — Equipe: Deilson Pereira, Jesus Eduardo, Juciana Maria, Mathias Ferreira, Rahissa Beatriz</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <Link to="/slides" className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 px-3 py-1.5 rounded-full transition-colors">Slides</Link>
            <Link to="/roteiro" className="text-xs bg-green-900/50 hover:bg-green-900 border border-green-700 text-green-300 px-3 py-1.5 rounded-full transition-colors">Roteiro</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        <section className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Visualize a Ordenacao</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Veja passo a passo como os algoritmos organizam uma lista de numeros, com animacoes e explicacoes didaticas.
          </p>
        </section>

        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => setActiveTab("bubble")}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeTab === "bubble"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => setActiveTab("merge")}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeTab === "merge"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-900"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            Merge Sort
          </button>
          <button
            onClick={() => setActiveTab("selection")}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeTab === "selection"
                ? "bg-orange-600 text-white shadow-lg shadow-orange-900"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            Selection Sort
          </button>
          <button
            onClick={() => setActiveTab("quick")}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeTab === "quick"
                ? "bg-green-600 text-white shadow-lg shadow-green-900"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            Quick Sort
          </button>
          <button
            onClick={() => setActiveTab("compare")}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeTab === "compare"
                ? "bg-green-600 text-white shadow-lg shadow-green-900"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            Comparacao
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeTab === "custom"
                ? "bg-yellow-600 text-white shadow-lg shadow-yellow-900"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            Passo a Passo
          </button>
        </div>

        {activeTab === "bubble" && (
          <div className="space-y-8">
            <AlgorithmInfo
              name="Bubble Sort"
              type="Simples"
              color="blue"
              description="O Bubble Sort percorre a lista repetidamente, comparando elementos vizinhos e trocando-os se estiverem fora de ordem. Os elementos maiores borbulham para o final da lista."
              bestCase="O(n)"
              worstCase="O(n²)"
              whenToUse="Listas pequenas ou quase ordenadas. Ideal para fins educacionais."
              code={`def bubble_sort(lista):
    n = len(lista)
    for i in range(n):
        for j in range(0, n - i - 1):
            # Compara elementos vizinhos
            if lista[j] > lista[j + 1]:
                # Troca se fora de ordem
                lista[j], lista[j+1] = lista[j+1], lista[j]
    return lista

numeros = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(numeros))
# Saida: [11, 12, 22, 25, 34, 64, 90]`}
            />
            <BubbleSortVisualizer />
          </div>
        )}

        {activeTab === "merge" && (
          <div className="space-y-8">
            <AlgorithmInfo
              name="Merge Sort"
              type="Eficiente"
              color="purple"
              description="O Merge Sort usa a estrategia de dividir e conquistar: divide a lista ao meio recursivamente ate ter sublistas de 1 elemento, depois as une em ordem. Garantia de O(n log n) em todos os casos."
              bestCase="O(n log n)"
              worstCase="O(n log n)"
              whenToUse="Listas grandes que precisam de ordenacao rapida e consistente. Ideal para dados que nao cabem em memoria."
              code={`def merge_sort(lista):
    if len(lista) <= 1:
        return lista
    meio = len(lista) // 2
    esq = merge_sort(lista[:meio])
    dir = merge_sort(lista[meio:])
    return merge(esq, dir)

def merge(esq, dir):
    resultado = []
    i = j = 0
    while i < len(esq) and j < len(dir):
        if esq[i] <= dir[j]:
            resultado.append(esq[i]); i += 1
        else:
            resultado.append(dir[j]); j += 1
    resultado.extend(esq[i:])
    resultado.extend(dir[j:])
    return resultado

numeros = [64, 34, 25, 12, 22, 11, 90]
print(merge_sort(numeros))
# Saida: [11, 12, 22, 25, 34, 64, 90]`}
            />
            <MergeSortVisualizer />
          </div>
        )}

        {activeTab === "selection" && (
          <div className="space-y-8">
            <AlgorithmInfo
              name="Selection Sort"
              type="Simples"
              color="orange"
              description="O Selection Sort divide a lista em duas partes: a parte ordenada e a parte não ordenada. Ele busca repetidamente o menor elemento da parte não ordenada e o move para o início."
              bestCase="O(n²)"
              worstCase="O(n²)"
              whenToUse="Listas pequenas onde a simplicidade é prioridade. Tem o benefício de minimizar o número de trocas."
              code={`def selection_sort(lista):
    n = len(lista)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if lista[j] < lista[min_idx]:
                min_idx = j
        # Troca o menor encontrado com o primeiro elemento nao ordenado
        lista[i], lista[min_idx] = lista[min_idx], lista[i]
    return lista

numeros = [64, 34, 25, 12, 22, 11, 90]
print(selection_sort(numeros))`}
            />
            <SelectionSortVisualizer />
          </div>
        )}

        {activeTab === "quick" && (
          <div className="space-y-8">
            <AlgorithmInfo
              name="Quick Sort"
              type="Eficiente"
              color="green"
              description="O Quick Sort escolhe um 'pivô' e particiona a lista ao redor dele, movendo elementos menores para a esquerda e maiores para a direita. É extremamente rápido na prática."
              bestCase="O(n log n)"
              worstCase="O(n²)"
              whenToUse="Algoritmo padrão para uso geral em sistemas de alto desempenho. Extremamente eficiente em cache."
              code={`def quick_sort(lista):
    if len(lista) <= 1:
        return lista
    pivo = lista[len(lista) // 2]
    esq = [x for x in lista if x < pivo]
    meio = [x for x in lista if x == pivo]
    dir = [x for x in lista if x > pivo]
    return quick_sort(esq) + meio + quick_sort(dir)

numeros = [64, 34, 25, 12, 22, 11, 90]
print(quick_sort(numeros))`}
            />
            <QuickSortVisualizer />
          </div>
        )}

        {activeTab === "compare" && <ComparisonTable />}
        {activeTab === "custom" && <CustomVisualizer />}
      </main>

      <footer className="py-8 text-slate-600 text-xs border-t border-slate-800 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Algoritmos e Estrutura de Dados UPE — Equipe: Deilson, Jesus, Juciana, Mathias, Rahissa</p>
          <div className="flex items-center gap-3">
            <a 
              href="https://www.linkedin.com/in/jesus-eduardo-pereira/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-blue-900 transition-colors p-2 rounded-full text-slate-400 hover:text-white"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://github.com/edward0k2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 transition-colors p-2 rounded-full text-slate-400 hover:text-white"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}