export default function ComparisonTable() {
  const data = [
    { criteria: "Complexidade Melhor Caso", bubble: "O(n)", merge: "O(n log n)" },
    { criteria: "Complexidade Pior Caso", bubble: "O(n²)", merge: "O(n log n)" },
    { criteria: "Complexidade Média", bubble: "O(n²)", merge: "O(n log n)" },
    { criteria: "Espaço Extra", bubble: "O(1)", merge: "O(n)" },
    { criteria: "Estável", bubble: "✅ Sim", merge: "✅ Sim" },
    { criteria: "Listas pequenas", bubble: "✅ Adequado", merge: "⚠️ Excessivo" },
    { criteria: "Listas grandes", bubble: "❌ Lento", merge: "✅ Ideal" },
    { criteria: "Facilidade de entendimento", bubble: "✅ Muito fácil", merge: "⚠️ Moderado" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-slate-800/50 border border-green-700/40 rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-green-300">📊 Comparação entre os Algoritmos</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Critério</th>
                <th className="text-center py-3 px-4 text-blue-400 font-semibold">🫧 Bubble Sort</th>
                <th className="text-center py-3 px-4 text-purple-400 font-semibold">🔀 Merge Sort</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className={`border-b border-slate-800 ${i % 2 === 0 ? "bg-slate-900/30" : ""}`}>
                  <td className="py-3 px-4 text-slate-300">{row.criteria}</td>
                  <td className="py-3 px-4 text-center font-mono text-blue-300">{row.bubble}</td>
                  <td className="py-3 px-4 text-center font-mono text-purple-300">{row.merge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-900/20 border border-blue-700/40 rounded-2xl p-5">
          <h3 className="text-blue-300 font-bold mb-3">🫧 Quando usar Bubble Sort?</h3>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>• Listas com poucos elementos (até ~20)</li>
            <li>• Fins educacionais e demonstrações</li>
            <li>• Quando a lista já está quase ordenada</li>
            <li>• Quando a memória disponível é muito limitada</li>
          </ul>
        </div>
        <div className="bg-purple-900/20 border border-purple-700/40 rounded-2xl p-5">
          <h3 className="text-purple-300 font-bold mb-3">🔀 Quando usar Merge Sort?</h3>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>• Listas grandes (milhares/milhões de elementos)</li>
            <li>• Quando precisamos de desempenho garantido</li>
            <li>• Ordenação de arquivos externos (fora da RAM)</li>
            <li>• Quando a estabilidade da ordenação importa</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <div className="bg-slate-800/50 border border-slate-600/40 rounded-2xl p-6 text-center space-y-3">
        <h3 className="text-xl font-bold">💡 Conclusão</h3>
        <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
          O <span className="text-blue-300 font-semibold">Bubble Sort</span> é simples de implementar e entender, perfeito para aprender os conceitos de ordenação. 
          Já o <span className="text-purple-300 font-semibold">Merge Sort</span> é muito mais eficiente para grandes volumes de dados, 
          garantindo O(n log n) em todos os casos, ao custo de usar mais memória.
        </p>
      </div>
    </div>
  );
}