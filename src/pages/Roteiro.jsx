import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckSquare, Square, Clock, Users } from "lucide-react";

const sections = [
  {
    time: "0:00 – 2:00",
    title: "Abertura e Contextualização",
    color: "blue",
    items: [
      "Apresentação da Equipe: Deilson, Jesus, Juciana, Mathias e Rahissa",
      "Definição de Algoritmos de Ordenação e sua importância no mundo real",
      "Visão geral das duas categorias: Algoritmos Iterativos vs. Dividir e Conquistar",
      "Apresentação da plataforma interativa desenvolvida pelo grupo",
    ],
  },
  {
    time: "2:00 – 7:00",
    title: "Algoritmos Iterativos: Bubble & Selection",
    color: "yellow",
    items: [
      "Bubble Sort: Explicação da lógica de 'flutuação' dos maiores elementos",
      "Visualização prática do Bubble Sort no sistema",
      "Selection Sort: Como o algoritmo 'seleciona' sistematicamente o menor valor",
      "Comparação visual entre as trocas constantes do Bubble vs. trocas mínimas do Selection",
      "Análise de complexidade: Por que ambos são O(n²) no pior caso?",
    ],
  },
  {
    time: "7:00 – 13:00",
    title: "Eficiência Máxima: Merge & Quick Sort",
    color: "purple",
    items: [
      "Merge Sort: O conceito de recursão e a técnica de 'Dividir para Conquistar'",
      "Demonstração visual da partição e da intercalação (Merge)",
      "Quick Sort: A importância da escolha do Pivô e o particionamento de Hoare/Lomuto",
      "Análise de Desempenho: O salto de O(n²) para O(n log n)",
      "Discussão sobre Estabilidade: Por que o Merge é estável e o Quick não?",
    ],
  },
  {
    time: "13:00 – 17:00",
    title: "Demonstração de Código e Ferramenta",
    color: "green",
    items: [
      "Explicação dos códigos em Python disponibilizados na plataforma",
      "Demonstração do modo 'Passo a Passo' personalizado",
      "Como a ferramenta auxilia estudantes de Algoritmos e Estruturas de Dados",
      "Teste de performance com diferentes tamanhos de listas",
    ],
  },
  {
    time: "17:00 – 20:00",
    title: "Conclusão e Encerramento",
    color: "slate",
    items: [
      "Tabela comparativa final: Tempo, Espaço e Melhores Casos",
      "Sugestões de qual algoritmo usar para cada cenário real",
      "Agradecimentos e referências bibliográficas",
      "Informações finais sobre a participação de cada integrante da equipe",
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
            Equipe: Deilson, Jesus, Juciana, Mathias, Rahissa
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