export default function ComparisonTable() {
  const data = [
    { criteria: "Complexidade Melhor Caso", bubble: "O(n)", merge: "O(n log n)", selection: "O(n²)", quick: "O(n log n)" },
    { criteria: "Complexidade Pior Caso", bubble: "O(n²)", merge: "O(n log n)", selection: "O(n²)", quick: "O(n²)" },
    { criteria: "Complexidade Média", bubble: "O(n²)", merge: "O(n log n)", selection: "O(n²)", quick: "O(n log n)" },
    { criteria: "Espaço Extra", bubble: "O(1)", merge: "O(n)", selection: "O(1)", quick: "O(log n)" },
    { criteria: "Estável", bubble: "✅ Sim", merge: "✅ Sim", selection: "❌ Não", quick: "❌ Não" },
    { criteria: "Listas pequenas", bubble: "✅ Adequado", merge: "⚠️ Excessivo", selection: "✅ Adequado", quick: "✅ Adequado" },
    { criteria: "Listas grandes", bubble: "❌ Lento", merge: "✅ Ideal", selection: "❌ Lento", quick: "✅ Ideal" },
    { criteria: "Facilidade de entendimento", bubble: "✅ Muito fácil", merge: "⚠️ Moderado", selection: "✅ Fácil", quick: "❌ Difícil" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-slate-800/50 border border-green-700/40 rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-green-300">📊 Comparação entre os Algoritmos</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Critério</th>
                <th className="text-center py-3 px-4 text-blue-400 font-semibold">🫧 Bubble</th>
                <th className="text-center py-3 px-4 text-orange-400 font-semibold">🔍 Selection</th>
                <th className="text-center py-3 px-4 text-green-400 font-semibold">⚡ Quick</th>
                <th className="text-center py-3 px-4 text-purple-400 font-semibold">🔀 Merge</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className={`border-b border-slate-800 ${i % 2 === 0 ? "bg-slate-900/30" : ""}`}>
                  <td className="py-3 px-4 text-slate-300">{row.criteria}</td>
                  <td className="py-3 px-4 text-center font-mono text-blue-300">{row.bubble}</td>
                  <td className="py-3 px-4 text-center font-mono text-orange-300">{row.selection}</td>
                  <td className="py-3 px-4 text-center font-mono text-green-300">{row.quick}</td>
                  <td className="py-3 px-4 text-center font-mono text-purple-300">{row.merge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-900/20 border border-blue-700/40 rounded-2xl p-4">
          <h3 className="text-blue-300 font-bold mb-2 text-sm">🫧 Bubble Sort</h3>
          <p className="text-slate-400 text-xs mb-3 italic">Simplicidade extrema.</p>
          <ul className="text-slate-300 text-[11px] space-y-1">
            <li>• Listas muito pequenas</li>
            <li>• Fins educacionais</li>
            <li>• Quase ordenadas</li>
          </ul>
        </div>
        <div className="bg-orange-900/20 border border-orange-700/40 rounded-2xl p-4">
          <h3 className="text-orange-300 font-bold mb-2 text-sm">🔍 Selection Sort</h3>
          <p className="text-slate-400 text-xs mb-3 italic">Mínimas trocas.</p>
          <ul className="text-slate-300 text-[11px] space-y-1">
            <li>• Reduzir escritas em disco</li>
            <li>• Pouca memória RAM</li>
            <li>• Listas pequenas</li>
          </ul>
        </div>
        <div className="bg-green-900/20 border border-green-700/40 rounded-2xl p-4">
          <h3 className="text-green-300 font-bold mb-2 text-sm">⚡ Quick Sort</h3>
          <p className="text-slate-400 text-xs mb-3 italic">O mais rápido na prática.</p>
          <ul className="text-slate-300 text-[11px] space-y-1">
            <li>• Algoritmo padrão de uso geral</li>
            <li>• Dados em memória RAM</li>
            <li>• Alta performance</li>
          </ul>
        </div>
        <div className="bg-purple-900/20 border border-purple-700/40 rounded-2xl p-4">
          <h3 className="text-purple-300 font-bold mb-2 text-sm">🔀 Merge Sort</h3>
          <p className="text-slate-400 text-xs mb-3 italic">Estável e garantido.</p>
          <ul className="text-slate-300 text-[11px] space-y-1">
            <li>• Grandes volumes de dados</li>
            <li>• Arquivos externos</li>
            <li>• Estabilidade necessária</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <div className="bg-slate-800/50 border border-slate-600/40 rounded-2xl p-6 text-center space-y-3">
        <h3 className="text-xl font-bold">💡 Resumo Didático</h3>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed">
          Para aprender, use o <span className="text-blue-300">Bubble</span>. Para trocar pouco, <span className="text-orange-300">Selection</span>. 
          No dia a dia, o <span className="text-green-300">Quick Sort</span> é a escolha padrão por sua velocidade média imbatível. 
          Se precisar de estabilidade ou lidar com dados gigantescos, o <span className="text-purple-300">Merge Sort</span> é o rei.
        </p>
      </div>
    </div>
  );
}