import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckSquare, Square, Clock, Users } from "lucide-react";

const sections = [
  {
    time: "0:00 – 2:00",
    title: "Abertura e Contextualização",
    color: "blue",
    items: [
      {
        label: "Apresentação da Equipe: Deilson, Jesus, Juciana, Mathias e Rahissa",
        explanation: "O grupo deve iniciar o vídeo de forma profissional. Cada membro deve dizer seu nome e um resumo rápido de sua contribuição para o seminário. Sorria e mantenha contato visual com a câmera!"
      },
      {
        label: "Definição de Algoritmos de Ordenação e sua importância no mundo real",
        explanation: "Explique que ordenar é colocar elementos em uma sequência lógica. Cite exemplos reais como: lista de contatos do celular, rankings de e-sports, filtros de preço em e-commerce e organização de grandes bancos de dados."
      },
      {
        label: "Visão geral das duas categorias: Algoritmos Iterativos vs. Dividir e Conquistar",
        explanation: "Diferencie algoritmos simples (como Bubble e Selection), que comparam elementos um a um, de algoritmos avançados (como Merge e Quick), que quebram o problema em partes menores para ganhar velocidade exponencial."
      },
      {
        label: "Apresentação da plataforma interativa desenvolvida pelo grupo",
        explanation: "Mostre a tela inicial do sistema. Explique que foi construído com React e Tailwind para facilitar o aprendizado visual, permitindo que o aluno veja a lógica 'acontecendo' em tempo real."
      },
    ],
  },
  {
    time: "2:00 – 7:00",
    title: "Algoritmos Iterativos: Bubble & Selection",
    color: "yellow",
    items: [
      {
        label: "Bubble Sort: Explicação da lógica de 'flutuação' dos maiores elementos",
        explanation: "Use a metáfora das 'bolhas'. O maior elemento flutua para o topo a cada iteração. Explique que o algoritmo percorre a lista várias vezes comparando pares adjacentes."
      },
      {
        label: "Visualização prática do Bubble Sort no sistema",
        explanation: "Dê 'Play' no visualizador. Destaque as barras mudando de cor: Amarelo para comparar e Vermelho para trocar. Mostre como os números maiores vão parando no final da lista."
      },
      {
        label: "Selection Sort: Como o algoritmo 'seleciona' sistematicamente o menor valor",
        explanation: "Explique que este algoritmo mantém uma parte ordenada e outra não. Ele varre a parte não ordenada em busca do menor valor e o coloca na primeira posição livre. É mais eficiente em número de trocas que o Bubble."
      },
      {
        label: "Comparação visual entre as trocas constantes do Bubble vs. trocas mínimas do Selection",
        explanation: "Mostre no visualizador do Selection Sort que ele só faz UMA troca por iteração externa, enquanto o Bubble Sort pode fazer várias. Isso o torna superior em sistemas onde 'escrever dados' é custoso."
      },
      {
        label: "Análise de complexidade: Por que ambos são O(n²) no pior caso?",
        explanation: "Explique que ambos possuem dois laços de repetição aninhados (for dentro de for). Se a lista dobra de tamanho, o tempo de execução quadruplica. Por isso não são indicados para milhões de dados."
      },
    ],
  },
  {
    time: "7:00 – 13:00",
    title: "Eficiência Máxima: Merge & Quick Sort",
    color: "purple",
    items: [
      {
        label: "Merge Sort: O conceito de recursão e a técnica de 'Dividir para Conquistar'",
        explanation: "Explique que o Merge Sort divide a lista ao meio repetidamente até ter sublistas de apenas 1 elemento. A 'mágica' acontece na hora de juntar (mesclar) essas listas de forma ordenada."
      },
      {
        label: "Demonstração visual da partição e da intercalação (Merge)",
        explanation: "No visualizador de Merge, mostre as cores Azul (dividindo) e Roxo (mesclando). Enfatize que ele precisa de memória extra para criar essas sublistas temporárias."
      },
      {
        label: "Quick Sort: A importância da escolha do Pivô e o particionamento",
        explanation: "O Quick Sort escolhe um 'Pivô'. Elementos menores que ele vão para a esquerda e maiores para a direita. Mostre no visualizador como o pivô (roxo) organiza o caos ao seu redor."
      },
      {
        label: "Análise de Desempenho: O salto de O(n²) para O(n log n)",
        explanation: "Destaque que dividir o problema ao meio reduz drasticamente o trabalho. O(n log n) é a fronteira da eficiência máxima para ordenação baseada em comparação."
      },
      {
        label: "Discussão sobre Estabilidade: Por que o Merge é estável e o Quick não?",
        explanation: "Estabilidade significa manter a ordem relativa de elementos iguais. Explique que o Merge preserva essa ordem, o que é vital para ordenar por 'Nome' e depois por 'Data', por exemplo."
      },
    ],
  },
  {
    time: "13:00 – 17:00",
    title: "Demonstração de Código e Ferramenta",
    color: "green",
    items: [
      {
        label: "Explicação dos códigos em Python disponibilizados na plataforma",
        explanation: "Abra a aba de código no sistema. Mostre as funções 'def merge_sort' ou 'def bubble_sort'. Explique que o código foi escrito de forma limpa e didática para facilitar o estudo."
      },
      {
        label: "Demonstração do modo 'Passo a Passo' personalizado",
        explanation: "Mostre o botão 'Próximo →'. Explique que o usuário pode controlar o tempo do aprendizado, analisando o estado da lista em cada micro-passo do algoritmo."
      },
      {
        label: "Como a ferramenta auxilia estudantes de Algoritmos e Estruturas de Dados",
        explanation: "Mencione que visualizar o abstrato torna o aprendizado concreto. A ferramenta elimina a dúvida de 'como os dados estão se movendo' na memória do computador."
      },
      {
        label: "Teste de performance com diferentes tamanhos de listas",
        explanation: "Compare a velocidade visual de cada algoritmo. O Merge Sort termina quase instantaneamente enquanto o Bubble Sort ainda está no início para listas maiores."
      },
    ],
  },
  {
    time: "17:00 – 20:00",
    title: "Conclusão e Encerramento",
    color: "slate",
    items: [
      {
        label: "Tabela comparativa final: Tempo, Espaço e Melhores Casos",
        explanation: "Recapitule a tabela: Bubble (Educação), Selection (Trocas mínimas), Quick (Velocidade geral) e Merge (Estabilidade e Dados Gigantes)."
      },
      {
        label: "Sugestões de qual algoritmo usar para cada cenário real",
        explanation: "Dê o veredito: Use Quick Sort na maioria dos casos. Use Merge Sort se precisar de estabilidade. Nunca use Bubble em produção para grandes dados."
      },
      {
        label: "Agradecimentos e referências bibliográficas",
        explanation: "Agradeça ao professor e aos colegas. Cite o livro do Cormen (Algoritmos: Teoria e Prática) como a principal fonte de estudos para o grupo."
      },
      {
        label: "Informações finais sobre a participação de cada integrante",
        explanation: "Garanta que todos apareceram no vídeo e contribuíram igualmente. Finalize reforçando que o projeto está disponível no GitHub para consulta futura."
      },
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
  const [expanded, setExpanded] = useState(null);

  const toggle = (key, e) => {
    e.stopPropagation();
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleExpand = (key) => {
    setExpanded(expanded === key ? null : key);
  };

  const total = sections.reduce((acc, s) => acc + s.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <header className="border-b border-blue-800/40 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} /> Voltar
          </Link>
          <h1 className="text-lg font-bold text-blue-300">Roteiro Interativo — UPE</h1>
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
            <span>Seu progresso na apresentação</span>
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
            <ul className="space-y-3">
              {section.items.map((item, ii) => {
                const key = `${si}-${ii}`;
                const isExpanded = expanded === key;
                return (
                  <li
                    key={ii}
                    className={`rounded-xl transition-all duration-200 border ${isExpanded ? "bg-slate-900/60 border-slate-600 p-4" : "border-transparent hover:bg-slate-800/40 p-2"}`}
                  >
                    <div
                      className="flex items-start gap-3 cursor-pointer group"
                      onClick={() => toggleExpand(key)}
                    >
                      <button 
                        className="mt-0.5 shrink-0 outline-none"
                        onClick={(e) => toggle(key, e)}
                      >
                        {checked[key]
                          ? <CheckSquare size={18} className="text-green-400" />
                          : <Square size={18} className="text-slate-500 group-hover:text-slate-300" />}
                      </button>
                      <span className={`text-sm font-medium leading-relaxed transition-colors ${checked[key] ? "line-through text-slate-500" : "text-slate-200"}`}>
                        {item.label}
                      </span>
                    </div>
                    {isExpanded && (
                      <div className="mt-3 ml-7 text-xs text-slate-400 leading-relaxed border-l-2 border-blue-500/30 pl-4 animate-in fade-in slide-in-from-top-1">
                        <p className="text-blue-300/90 font-semibold mb-1 uppercase tracking-wider text-[10px]">O que dizer / explicar:</p>
                        {item.explanation}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 text-sm text-slate-400 space-y-2">
          <p className="font-semibold text-slate-300">💡 Dica de apresentação:</p>
          <p>Clique em um tópico para ver a explicação detalhada do que dizer durante o vídeo do seminário.</p>
        </div>
      </main>
    </div>
  );
}