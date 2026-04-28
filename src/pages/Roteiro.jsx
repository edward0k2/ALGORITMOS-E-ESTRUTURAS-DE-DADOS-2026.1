import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckSquare, Square, Clock, Users } from "lucide-react";

const sections = [
  {
    time: "0:00 – 1:00",
    title: "Introducao",
    color: "blue",
    items: [
      "Apresentar o nome do grupo e cada integrante",
      "Dizer o tema: Algoritmos de Ordenacao",
      "Explicar brevemente o que sera apresentado no video",
      "Mencionar os dois algoritmos escolhidos: Bubble Sort e Merge Sort",
    ],
  },
  {
    time: "1:00 – 6:00",
    title: "Bubble Sort (Algoritmo Simples)",
    color: "yellow",
    items: [
      "O que e o Bubble Sort? Explicacao conceitual",
      "Mostrar exemplo visual passo a passo (animacao ou slide)",
      "Destacar como os elementos sao comparados e trocados",
      "Apresentar o codigo Python comentado",
      "Executar o codigo ao vivo e mostrar a saida",
      "Complexidade: melhor caso O(n), pior caso O(n²)",
      "Quando usar: listas pequenas ou fins educacionais",
    ],
  },
  {
    time: "6:00 – 12:00",
    title: "Merge Sort (Algoritmo Eficiente)",
    color: "purple",
    items: [
      "O que e o Merge Sort? Estrategia dividir e conquistar",
      "Mostrar a divisao recursiva da lista visualmente",
      "Mostrar a etapa de mescla (merge) com exemplo",
      "Apresentar o codigo Python comentado",
      "Executar o codigo ao vivo e mostrar a saida",
      "Complexidade: O(n log n) em todos os casos",
      "Quando usar: listas grandes, dados externos",
    ],
  },
  {
    time: "12:00 – 15:00",
    title: "Comparacao e Conclusao",
    color: "green",
    items: [
      "Comparar os dois algoritmos lado a lado",
      "Tabela: complexidade, espaco, estabilidade",
      "Quando escolher Bubble Sort vs Merge Sort",
      "Resumo dos pontos principais aprendidos",
    ],
  },
  {
    time: "15:00 – 20:00",
    title: "Encerramento / Extras",
    color: "slate",
    items: [
      "Exemplos adicionais ou casos de uso praticos",
      "Agradecimento e encerramento do video",
      "Indicar o tempo exato de participacao de cada membro",
      "Confirmar que o codigo foi testado e funciona",
    ],
  },
];

const colorMap = {
  blue: "border-blue-600/50 bg-blue-900/20",
  yellow: "border-yellow-600/50 bg-yellow-900/10",
  purple: "border-purple-600/50 bg-purple-900/20",
  green: "border-green-600/50 bg-green-900/20",
  slate: "border-slate-600/50 bg-slate-800/30",
};

const badgeMap = {
  blue: "bg-blue-800 text-blue-200",
  yellow: "bg-yellow-800/80 text-yellow-200",
  purple: "bg-purple-800 text-purple-200",
  green: "bg-green-800 text-green-200",
  slate: "bg-slate-700 text-slate-200",
};

export default function Roteiro() {
  const [checked, setChecked] = useState({});

  const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const total = sections.reduce((acc, s) => acc + s.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <header className="border-b border-blue-800/40 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Voltar
          </Link>
          <h1 className="text-lg font-bold text-blue-300">Roteiro — Algoritmos UPE</h1>
          <div className="hidden sm:block text-[10px] text-slate-500 max-w-[200px] leading-tight">
            Equipe: Jesus, Juciana, Deilson, Mathias, Rahissa
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <CheckSquare size={14} />
            {done}/{total}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Progress */}
        <div className="bg-slate-800/50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-300"><Clock size={14} /> Duracao sugerida: 12 a 20 minutos</div>
            <div className="flex items-center gap-2 text-slate-300"><Users size={14} /> 3 a 5 integrantes</div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Progresso do roteiro</span>
            <span>{Math.round((done / total) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Sections */}
        {sections.map((section, si) => (
          <div key={si} className={`border rounded-2xl p-5 space-y-4 ${colorMap[section.color]}`}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`text-xs font-mono px-3 py-1 rounded-full ${badgeMap[section.color]}`}>
                {section.time}
              </span>
              <h2 className="font-bold text-base">{section.title}</h2>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, ii) => {
                const key = `${si}-${ii}`;
                return (
                  <li
                    key={ii}
                    className="flex items-start gap-3 cursor-pointer group"
                    onClick={() => toggle(key)}
                  >
                    <span className="mt-0.5 shrink-0">
                      {checked[key]
                        ? <CheckSquare size={16} className="text-green-400" />
                        : <Square size={16} className="text-slate-500 group-hover:text-slate-300" />}
                    </span>
                    <span className={`text-sm leading-relaxed transition-colors ${checked[key] ? "line-through text-slate-500" : "text-slate-300"}`}>
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 text-sm text-slate-400 space-y-2">
          <p className="font-semibold text-slate-300">Lembrete para entrega:</p>
          <p>Preencha o formulario com nomes dos integrantes e o minuto exato de participacao de cada um.</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfY538sySLDF2b-lVwmj7YKqSFw7FM1xnWcE7VE0YPXm5rkDw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline"
          >
            Acessar formulario de envio
          </a>
        </div>
      </main>
    </div>
  );
}