import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, File, Terminal } from 'lucide-react';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  mdFile?: string;
}

// Function to load markdown content
const loadMarkdownContent = async (mdFile: string): Promise<string> => {
  try {
    const response = await fetch(`/src/data/${mdFile}`);
    const text = await response.text();
    return text;
  } catch (error) {
    return `Error loading content: ${error}`;
  }
};
const fileSystem: FileNode[] = [
  {
    name: 'readme.txt',
    path: '/readme.txt',
    type: 'file',
    content: `╔════════════════════════════════════════════════╗
║              WELCOME TO DOS PORTFOLIO          ║
╠════════════════════════════════════════════════╣
║                                                ║
║  Добро пожаловать в ретро-портфолио            ║
║  в стиле Norton Commander!                     ║
║                                                ║
║  НАВИГАЦИЯ:                                    ║
║  • Используйте левую панель для навигации      ║
║  • Кликайте на файлы для просмотра             ║
║  • Папки можно раскрывать/сворачивать          ║
║                                                ║
║  ФАЙЛЫ:                                        ║
║  /experience/ - опыт работы                    ║
║  skills.txt   - навыки и компетенции           ║
║  achievements.txt - достижения                 ║
║  /contacts/   - контактная информация          ║
║                                                ║
║  [F1] Help   [F10] Exit                        ║
╚════════════════════════════════════════════════╝`
  },
  {
    name: 'about.txt',
    path: '/about.txt',
    type: 'file',
    content: `╔════════════════════════════════════════════════╗
║                   О СЕБЕ                       ║
╠════════════════════════════════════════════════╣
║                                                ║
║  Привет! Меня зовут Сергей Синяков             ║
║  Я Product Manager с 8+ годами опыта           ║
║                                                ║
║  🎯 СПЕЦИАЛИЗАЦИЯ:                             ║
║  • B2B SaaS продукты                          ║
║  • Fintech решения                             ║
║  • Enterprise платформы                        ║
║                                                ║
║  💡 ФИЛОСОФИЯ:                                 ║
║  "Лучший продукт - тот, который решает         ║
║   реальную проблему пользователя лучше        ║
║   всех остальных"                              ║
║                                                ║
║  🚀 ПОДХОД:                                    ║
║  • Data-driven решения                         ║
║  • Customer-centric мышление                   ║
║  • Agile методологии                           ║
║  • Continuous improvement                      ║
║                                                ║
╚════════════════════════════════════════════════╝`
  },
  {
    name: 'experience',
    path: '/experience',
    type: 'folder',
    children: [
      {
        name: 'positive.log',
        path: '/experience/positive.log',
        type: 'file',
        mdFile: 'positive.md'
      },
      {
        name: 'ingosstrah.log',
        path: '/experience/ingosstrah.log',
        type: 'file',
        mdFile: 'ingosstrah.md'
      },
      {
        name: 'antraks.log',
        path: '/experience/antraks.log',
        type: 'file',
        mdFile: 'antraks.md'
      }
    ]
  },
  {
    name: 'skills.txt',
    path: '/skills.txt',
    type: 'file',
    content: \`╔════════════════════════════════════════════════╗
║                НАВЫКИ И КОМПЕТЕНЦИИ            ║
╠════════════════════════════════════════════════╣
║                                                ║
║ ПРОДУКТОВЫЕ НАВЫКИ:                            ║
║ ██████████ Roadmapping & Strategy              ║
║ ████████░░ Agile / Scrum / SAFe                ║
║ ██████████ Метрики (MAU, LTV, ARPU)            ║
║ ████████░░ Customer Journey Mapping            ║
║ ██████████ Jobs-to-be-Done Framework           ║
║ ████████░░ Customer Development                ║
║                                                ║
║ АНАЛИТИЧЕСКИЕ НАВЫКИ:                          ║
║ ████████░░ SQL, Python                         ║
║ ██████████ Google Analytics, Mixpanel          ║
║ ████████░░ A/B Testing                         ║
║ ██████████ Cohort Analysis                     ║
║                                                ║
║ УПРАВЛЕНЧЕСКИЕ НАВЫКИ:                         ║
║ ██████████ Team Leadership                     ║
║ ████████░░ Stakeholder Management              ║
║ ██████████ Cross-functional Collaboration     ║
║ ████████░░ Public Speaking                     ║
║                                                ║
║ ИНСТРУМЕНТЫ:                                   ║
║ • JIRA, Confluence, Notion                     ║
║ • Figma, Miro, Whimsical                      ║
║ • Amplitude, Hotjar, FullStory                ║
╚════════════════════════════════════════════════╝`
  },
  {
    name: 'achievements.txt',
    path: '/achievements.txt',
    type: 'file',
    content: \`╔════════════════════════════════════════════════╗
║                   ДОСТИЖЕНИЯ                   ║
╠════════════════════════════════════════════════╣
║                                                ║
║ 👑 ПОВЕЛИТЕЛЬ MVP                              ║
║    Запущено 15+ MVP с Product-Market Fit      ║
║    Средний срок от идеи до первых клиентов:   ║
║    42 дня (против среднего 6 месяцев)         ║
║                                                ║
║ ⚡ СПАСИТЕЛЬ ДЕДЛАЙНОВ                         ║
║    100% проектов сданы в срок или раньше      ║
║    Рекорд: сокращение time-to-market на 60%   ║
║                                                ║
║ 📊 МАГ МЕТРИК                                  ║
║    Построил системы аналитики для 8 продуктов ║
║    Увеличение конверсий в среднем на 45%      ║
║                                                ║
║ 🎯 ЛИДЕР КОМАНД                                ║
║    Управлял командами до 50+ человек          ║
║    Retention в командах: 95%                  ║
║    NPS от команд: 9.2/10                      ║
║                                                ║
║ 🏆 СЕРТИФИКАЦИИ:                               ║
║    • Certified Scrum Product Owner (CSPO)     ║
║    • SAFe Product Owner/Product Manager        ║
║    • Google Analytics Individual Qualification ║
║    • Product Management Certificate (Stanford) ║
║                                                ║
║ 📈 ЦИФРЫ:                                      ║
║    • Общий рост выручки продуктов: 300%+      ║
║    • Привлечено инвестиций: $2.5M             ║
║    • Запущено в production: 23 продукта       ║
╚════════════════════════════════════════════════╝`
  },
  {
    name: 'contacts',
    path: '/contacts',
    type: 'folder',
    children: [
      {
        name: 'email.vcf',
        path: '/contacts/email.vcf',
        type: 'file',
        content: \`╔════════════════════════════════════════════════╗
║               КОНТАКТНАЯ ИНФОРМАЦИЯ            ║
╠════════════════════════════════════════════════╣
║                                                ║
║ 📧 EMAIL:                                      ║
║    sergey@pm-hero.com                          ║
║                                                ║
║ 🔗 LINKEDIN:                                   ║
║    linkedin.com/in/sergey-sinyakov             ║
║                                                ║
║ 📱 TELEGRAM:                                   ║
║    @sergey_pm                                  ║
║                                                ║
║ 🌐 WEBSITE:                                    ║
║    pm-hero.com                                 ║
║                                                ║
║ 📍 ЛОКАЦИЯ:                                    ║
║    Москва, Россия                              ║
║    Готов к релокации                           ║
║                                                ║
║ ⏰ ДОСТУПНОСТЬ:                                ║
║    • Полная занятость                         ║
║    • Частичная занятость                      ║
║    • Консультации                              ║
║    • Менторство                                ║
║                                                ║
║ 💼 ПРЕДПОЧТЕНИЯ:                               ║
║    • Удаленная работа: ДА                     ║
║    • Офисная работа: ДА                       ║
║    • Гибридный формат: ДА                     ║
║                                                ║
║ [ESC] Назад   [ENTER] Связаться                ║
╚════════════════════════════════════════════════╝`
      }
    ]
  }
];

function App() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/experience', '/contacts']));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Flatten file tree for keyboard navigation
  const getFlatFileList = (): FileNode[] => {
    const flatList: FileNode[] = [];
    
    const traverse = (nodes: FileNode[]) => {
      nodes.forEach(node => {
        flatList.push(node);
        if (node.type === 'folder' && expandedFolders.has(node.path) && node.children) {
          traverse(node.children);
        }
      });
    };
    
    traverse(fileSystem);
    return flatList;
  };

  useEffect(() => {
    // Set default file to readme.txt
    const readmeFile = fileSystem.find(node => node.name === 'readme.txt');
    if (readmeFile) {
      setSelectedFile(readmeFile);
    }

    // Check for mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const flatList = getFlatFileList();
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => Math.max(0, prev - 1));
          break;
          
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => Math.min(flatList.length - 1, prev + 1));
          break;
          
        case 'Enter':
          e.preventDefault();
          const currentNode = flatList[focusedIndex];
          if (currentNode) {
            if (currentNode.type === 'folder') {
              toggleFolder(currentNode.path);
            } else {
              handleFileSelect(currentNode);
            }
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          if (isMobile) {
            setShowMobileNav(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, expandedFolders, isMobile]);

  // Update focused index when folders expand/collapse
  useEffect(() => {
    const flatList = getFlatFileList();
    if (focusedIndex >= flatList.length) {
      setFocusedIndex(Math.max(0, flatList.length - 1));
    }
  }, [expandedFolders]);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileSelect = (file: FileNode) => {
    if (file.mdFile) {
      // Load markdown content
      loadMarkdownContent(file.mdFile).then(content => {
        setSelectedFile({ ...file, content });
      });
    } else {
      setSelectedFile(file);
    }
    if (isMobile) {
      setShowMobileNav(false);
    }
  };

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    const flatList = getFlatFileList();
    
    return nodes.map((node) => {
      const isExpanded = expandedFolders.has(node.path);
      const isSelected = selectedFile?.path === node.path;
      const nodeIndex = flatList.findIndex(item => item.path === node.path);
      const isFocused = nodeIndex === focusedIndex;
      
      return (
        <div key={node.path}>
          <div 
            className={`
              flex items-center px-2 py-1 cursor-pointer font-mono text-sm
              ${isSelected ? 'bg-yellow-600 text-black' : 
                isFocused ? 'bg-cyan-600 text-black' :
                'text-green-400 hover:bg-blue-800'}
              transition-colors duration-150
              ${isFocused ? 'ring-2 ring-cyan-400' : ''}
            `}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
            onClick={() => {
              setFocusedIndex(nodeIndex);
              if (node.type === 'folder') {
                toggleFolder(node.path);
              } else {
                handleFileSelect(node);
              }
            }}
          >
            {node.type === 'folder' ? (
              <>
                {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                <Folder size={12} className="mx-1" />
                <span>{node.name}/</span>
              </>
            ) : (
              <>
                <span className="w-3" />
                <File size={12} className="mx-1" />
                <span>{node.name}</span>
              </>
            )}
          </div>
          {node.type === 'folder' && isExpanded && node.children && (
            <div>
              {renderFileTree(node.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-mono">
      {/* DOS Header */}
      <div className="bg-blue-800 border-b border-cyan-400 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal size={16} className="text-cyan-400" />
          <span className="text-cyan-400 font-bold">DOS PORTFOLIO v1.0</span>
        </div>
        <div className="text-xs text-cyan-400 flex items-center space-x-4">
          <span className="hidden md:inline">↑↓ Navigate | Enter Select | Esc Close</span>
          {isMobile && (
            <button 
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="mr-4 px-2 py-1 bg-blue-700 rounded"
            >
              ☰ FILES
            </button>
          )}
          [F10] EXIT
        </div>
      </div>

      <div className="flex h-[calc(100vh-48px)]">
        {/* Left Panel - File Tree */}
        <div className={`
          ${isMobile 
            ? `absolute top-0 left-0 h-full w-full bg-blue-900 z-10 transform transition-transform duration-300 ${
                showMobileNav ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-1/3 border-r border-cyan-400'
          }
        `}>
          <div className="bg-blue-800 px-4 py-2 border-b border-cyan-400">
            <div className="text-cyan-400 font-bold text-sm">├─ FILE SYSTEM</div>
          </div>
          <div className="h-full overflow-y-auto bg-blue-900 p-2">
            {renderFileTree(fileSystem)}
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className={`${isMobile ? 'w-full' : 'w-2/3'} flex flex-col`}>
          <div className="bg-blue-800 px-4 py-2 border-b border-cyan-400">
            <div className="text-cyan-400 font-bold text-sm flex items-center">
              <File size={14} className="mr-2" />
              {selectedFile ? selectedFile.path : '/readme.txt'}
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-blue-900">
            {selectedFile?.content ? (
              selectedFile.mdFile ? (
                <div className="text-white text-sm leading-relaxed">
                  {selectedFile.content.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={index} className="text-cyan-400 text-xl font-bold mb-4 border-b border-cyan-400 pb-2">{line.substring(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={index} className="text-green-400 text-lg font-bold mt-6 mb-3">{line.substring(3)}</h2>;
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={index} className="text-yellow-400 font-bold mb-2">{line.substring(2, line.length - 2)}</p>;
                    } else if (line.startsWith('- ')) {
                      return <p key={index} className="text-white ml-4 mb-1">• {line.substring(2)}</p>;
                    } else if (line.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return <p key={index} className="text-white mb-2">{line}</p>;
                    }
                  })}
                </div>
              ) : (
                <pre className="text-white text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedFile.content}
                </pre>
              )
            ) : (
              <div className="text-green-400 text-center mt-8">
                <div className="text-2xl mb-4">░░░░░░░░░░░░░░░░░░░░</div>
                <div>SELECT A FILE TO VIEW</div>
                <div className="text-2xl mt-4">░░░░░░░░░░░░░░░░░░░░</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DOS Footer */}
      <div className="bg-blue-800 border-t border-cyan-400 px-4 py-1">
        <div className="flex justify-between text-xs text-cyan-400">
          <span>
            {selectedFile ? `${selectedFile.name} - ${selectedFile.type.toUpperCase()}` : 'READY'} | 
            Use ↑↓ arrows and Enter to navigate
          </span>
          <span className="animate-pulse">█</span>
        </div>
      </div>
    </div>
  );
}

export default App;