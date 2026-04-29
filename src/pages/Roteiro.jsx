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
        explanation: "O grupo deve iniciar o vídeo de forma profissional. Cada membro deve dizer seu nome e um resumo rápido de sua contribuição.",
        script: "Bom dia, professor e colegas. Somos a equipe composta por Deilson, Jesus, Juciana, Mathias e Rahissa. Hoje vamos apresentar nosso seminário sobre Algoritmos de Ordenação, um pilar fundamental da Ciência da Computação. Cada um de nós participou tanto no desenvolvimento da ferramenta visual quanto na pesquisa teórica que vocês verão a seguir."
      },
      {
        label: "Definição de Algoritmos de Ordenação e sua importância no mundo real",
        explanation: "Explique que ordenar é colocar elementos em uma sequência lógica. Cite exemplos reais.",
        script: "Para começar, o que é ordenação? Em termos simples, é o processo de organizar um conjunto de dados em uma ordem específica, seja crescente ou decrescente. No mundo real, isso é vital: sem algoritmos eficientes, o Google não conseguiria ranquear buscas em milissegundos, e sistemas bancários não processariam milhares de transações por segundo. Ordenar não é apenas estética, é eficiência computacional."
      },
      {
        label: "Visão geral das duas categorias: Algoritmos Iterativos vs. Dividir e Conquistar",
        explanation: "Diferencie algoritmos simples de algoritmos avançados.",
        script: "Nossa apresentação divide os algoritmos em duas categorias principais. Primeiro, os iterativos, como o Bubble e o Selection, que são ótimos para entender os conceitos básicos. Segundo, os algoritmos de 'Dividir e Conquistar', como o Merge e o Quick Sort, que utilizam recursão para alcançar uma performance muito superior em grandes volumes de dados."
      },
      {
        label: "Apresentação da plataforma interativa desenvolvida pelo grupo",
        explanation: "Mostre a tela inicial do sistema construído com React e Tailwind.",
        script: "Para tornar este estudo mais prático, desenvolvemos uma plataforma interativa. Utilizamos tecnologias modernas como React e Tailwind CSS para criar visualizadores que permitem ver, passo a passo, o que acontece dentro da memória do computador durante a ordenação. A ideia é transformar o código abstrato em algo concreto e visual."
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
        explanation: "Use a metáfora das 'bolhas'. O maior elemento flutua para o topo a cada iteração.",
        script: "Professor, o Bubble Sort é chamado assim devido ao efeito de 'bolha'. Imagine que os números maiores são mais leves e sobem mais rápido para o topo. O algoritmo percorre a lista comparando elementos vizinhos; se o da esquerda for maior que o da direita, eles trocam. Após a primeira passada, o maior número já está na sua posição final correta."
      },
      {
        label: "Visualização prática do Bubble Sort no sistema",
        explanation: "Dê 'Play' no visualizador e destaque as cores Amarelo e Vermelho.",
        script: "Vejam no nosso visualizador: as barras em amarelo indicam a comparação atual. Quando uma barra fica vermelha, significa que os valores foram trocados. Notem como o maior valor vai sendo 'empurrado' para o lado direito da tela. É um processo repetitivo mas que garante a ordenação total ao final de N passadas."
      },
      {
        label: "Selection Sort: Como o algoritmo 'seleciona' sistematicamente o menor valor",
        explanation: "Explique a busca pelo menor valor e a troca com a primeira posição livre.",
        script: "Agora, passando para o Selection Sort. Ao contrário do Bubble, que move o maior para o fim, o Selection busca o MENOR elemento de toda a parte não ordenada e o joga para o início. Ele varre a lista, guarda o índice do menor valor encontrado e só faz uma troca no final de cada loop externo."
      },
      {
        label: "Comparação visual entre as trocas constantes do Bubble vs. trocas mínimas do Selection",
        explanation: "Mostre que o Selection só faz UMA troca por iteração externa.",
        script: "A grande vantagem do Selection Sort sobre o Bubble Sort é o número de trocas. Enquanto o Bubble pode trocar elementos centenas de vezes, o Selection faz no máximo N-1 trocas. Em sistemas onde gravar dados é caro ou lento, como em memórias Flash, o Selection Sort acaba sendo uma escolha melhor entre os algoritmos simples."
      },
      {
        label: "Análise de complexidade: Por que ambos são O(n²) no pior caso?",
        explanation: "Explique o impacto dos laços de repetição aninhados (for dentro de for).",
        script: "Matematicamente, ambos os algoritmos possuem complexidade de tempo O(n²). Isso acontece porque para cada elemento da lista, precisamos olhar para quase todos os outros novamente. Se tivermos 10 vezes mais dados, o tempo de execução aumenta 100 vezes. Por isso, para milhões de registros, precisamos de técnicas mais avançadas."
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
        explanation: "Explique a divisão ao meio até ter sublistas de 1 elemento.",
        script: "Entramos agora no Merge Sort. Ele utiliza a técnica de 'Dividir para Conquistar'. O algoritmo quebra a lista original em duas metades sucessivamente até que tenhamos apenas elementos únicos. Depois, ele começa o processo de 'Merge', ou intercalação, unindo as partes já ordenadas até recompor a lista original completa."
      },
      {
        label: "Demonstração visual da partição e da intercalação (Merge)",
        explanation: "No visualizador de Merge, mostre as cores Azul (dividindo) e Roxo (mesclando).",
        script: "Observem no visualizador como as barras são divididas em blocos (em azul). Quando elas começam a subir e mudar para roxo, o algoritmo está comparando os elementos das duas metades e escolhendo o menor para a nova lista. É um algoritmo extremamente estável e eficiente para grandes volumes de dados."
      },
      {
        label: "Quick Sort: A importância da escolha do Pivô e o particionamento",
        explanation: "Explique como o pivô organiza os elementos menores e maiores ao seu redor.",
        script: "O Quick Sort é o 'velocista' dos algoritmos. Ele escolhe um elemento chamado Pivô. O objetivo é reorganizar a lista de modo que todos os menores que o pivô fiquem à esquerda e os maiores à direita. Ele faz isso de forma recursiva. Como vocês podem ver, o pivô, destacado em roxo, atua como um mestre de obras organizando os dados ao seu redor."
      },
      {
        label: "Análise de Desempenho: O salto de O(n²) para O(n log n)",
        explanation: "Destaque como dividir o problema ao meio reduz o trabalho total.",
        script: "A eficiência desses dois algoritmos é O(n log n). Esse 'log n' faz toda a diferença. Para uma lista de 1 milhão de itens, o Bubble faria 1 trilhão de operações, enquanto o Merge ou Quick fariam apenas cerca de 20 milhões. É por isso que estes são os algoritmos usados internamente pela maioria das linguagens de programação modernas."
      },
      {
        label: "Discussão sobre Estabilidade: Por que o Merge é estável e o Quick não?",
        explanation: "Defina estabilidade como a preservação da ordem relativa de elementos iguais.",
        script: "Um ponto técnico importante é a estabilidade. O Merge Sort é estável, o que significa que se tivermos dois itens com o mesmo valor, eles manterão sua ordem original. O Quick Sort, embora mais rápido na média, não garante isso. Essa é a razão de usarmos o Merge quando a ordem original dos dados secundários precisa ser preservada."
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
        explanation: "Abra a aba de código e mostre as funções escritas de forma didática.",
        script: "Professor, para que os alunos possam aplicar isso, incluímos o código fonte em Python para cada algoritmo. Notem como o código do Quick Sort reflete fielmente a recursão que explicamos. Nossa ideia foi criar um ambiente onde a teoria, a visualização e a implementação prática andassem de mãos dadas."
      },
      {
        label: "Demonstração do modo 'Passo a Passo' personalizado",
        explanation: "Mostre o botão 'Próximo →' e como ele auxilia no controle do tempo de estudo.",
        script: "Uma funcionalidade chave da nossa plataforma é o controle manual. Ao clicar em 'Próximo', o estudante pode parar o tempo e analisar: 'Por que esta barra mudou de lugar?'. Isso remove a ansiedade de tentar acompanhar uma animação rápida e permite focar na lógica por trás de cada swap ou comparação."
      },
      {
        label: "Como a ferramenta auxilia estudantes de Algoritmos e Estruturas de Dados",
        explanation: "Mencione que visualizar o abstrato torna o aprendizado concreto.",
        script: "Concluímos que visualizar o abstrato torna o aprendizado muito mais eficaz. Muitos alunos têm dificuldade com recursão, por exemplo. Ao ver o Merge Sort dividindo e unindo as barras, aquele conceito que parecia impossível no papel passa a fazer sentido visual total."
      },
      {
        label: "Teste de performance com diferentes tamanhos de listas",
        explanation: "Compare a velocidade visual de cada algoritmo para listas maiores.",
        script: "Para finalizar a demonstração técnica, se aumentarmos o tamanho da lista para 50 elementos, o Bubble Sort levaria muito tempo para terminar visualmente. Já o Quick Sort resolve em poucos segundos. Essa diferença visual é a prova real de tudo o que discutimos sobre complexidade assintótica hoje."
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
        explanation: "Recapitule a tabela comparativa geral de todos os algoritmos.",
        script: "Resumindo nossa jornada: vimos que não existe um 'melhor algoritmo' absoluto, mas sim o melhor para cada situação. O Bubble para aprender, o Selection para poucas trocas, o Quick para velocidade média e o Merge para estabilidade e grandes dados. Esta tabela que vocês veem na tela sintetiza meses de estudo em um guia prático."
      },
      {
        label: "Sugestões de qual algoritmo usar para cada cenário real",
        explanation: "Dê o veredito final baseado no que foi apresentado.",
        script: "Se você estiver construindo um sistema hoje, use o Quick Sort na maioria das vezes. Mas se estiver trabalhando com sistemas críticos onde a estabilidade é lei, o Merge Sort será seu melhor amigo. O importante é saber escolher a ferramenta certa para o problema certo."
      },
      {
        label: "Agradecimentos e referências bibliográficas",
        explanation: "Agradeça ao professor e cite as fontes como o livro do Cormen.",
        script: "Gostaríamos de agradecer ao professor pela orientação e aos colegas pela atenção. Nossas principais referências foram o clássico livro 'Algoritmos: Teoria e Prática' de Thomas Cormen e a documentação oficial do Python. Esperamos que esta apresentação tenha sido útil para todos."
      },
      {
        label: "Informações finais sobre a participação de cada integrante",
        explanation: "Reforce a contribuição do grupo e finalize o vídeo.",
        script: "Com isso, encerramos nosso seminário. Todo o código e esta apresentação estão disponíveis em nosso repositório no GitHub para quem quiser estudar mais. Deilson, Jesus, Juciana, Mathias e Rahissa agradecem a todos. Muito obrigado!"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white pb-20">
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
                    className={`rounded-xl transition-all duration-200 border ${isExpanded ? "bg-slate-900/80 border-slate-500 p-5" : "border-transparent hover:bg-slate-800/40 p-3"}`}
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
                          ? <CheckSquare size={20} className="text-green-400" />
                          : <Square size={20} className="text-slate-500 group-hover:text-slate-300" />}
                      </button>
                      <span className={`text-sm font-semibold leading-relaxed transition-colors ${checked[key] ? "line-through text-slate-500" : "text-slate-100"}`}>
                        {item.label}
                      </span>
                    </div>
                    {isExpanded && (
                      <div className="mt-4 ml-8 space-y-4 animate-in fade-in slide-in-from-top-2">
                        <div className="text-[11px] text-slate-400 leading-relaxed border-l-2 border-blue-500/30 pl-4">
                          <p className="text-blue-400 font-bold mb-1 uppercase tracking-widest text-[9px]">💡 Dica Técnica:</p>
                          {item.explanation}
                        </div>
                        <div className="bg-slate-950/50 rounded-lg p-4 border border-blue-900/30 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                          <p className="text-blue-500 font-bold mb-2 uppercase tracking-widest text-[9px]">🎤 Roteiro de Fala (Para ler ao professor):</p>
                          <p className="text-sm text-blue-50 italic leading-relaxed font-serif">
                            "{item.script}"
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5 text-sm text-slate-400 space-y-2">
          <p className="font-semibold text-slate-300">💡 Como usar este roteiro:</p>
          <p>1. Clique em um tópico para abrir os detalhes.</p>
          <p>2. Use a <b>Dica Técnica</b> para orientar suas ações na tela.</p>
          <p>3. Leia o <b>Roteiro de Fala</b> para explicar o assunto de forma profissional e clara ao professor.</p>
        </div>
      </main>
    </div>
  );
}