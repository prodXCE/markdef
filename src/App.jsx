import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';
import { FileText, Download, Upload, Trash2, Bold, Italic, List, Code, Type, Heading1, Quote, Link as LinkIcon, Image as ImageIcon, Moon, Sun } from 'lucide-react';

function App() {
  const [markdown, setMarkdown] = useState('# Project Atlas\n\n![Northern Lights](https://images.unsplash.com/photo-1531346878377-a51349593da4?auto=format&fit=crop&w=1000&q=80)\n\n## Overview\nProject Atlas is an experimental workspace designed to explore rapid prototyping, modular thinking, and clean architecture.\n\n---\n\n## Objectives\n- Build small, composable modules\n- Favor explicit configuration over magic\n- Optimize for readability and maintainability\n\n---\n\n## Architecture Notes\n> "Complexity should be *earned*, not accumulated."\n\n- **Core Layer**: Pure logic, no side effects\n- **Service Layer**: Orchestration and I/O\n- **Interface Layer**: CLI, HTTP, or UI adapters\n\n---\n\n## Example Snippet\n```js\nexport function computeScore(input) {\n  if (!input) return 0\n  return input.values.reduce((a, b) => a + b, 0)\n}\n```');

  // STATE
  const [fileName, setFileName] = useState('my-document');
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({ words: 0, chars: 0 });

  // REFS
  const printRef = useRef();
  const textareaRef = useRef();
  const previewRef = useRef();

  // UPDATE STATS
  useEffect(() => {
    const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
    const chars = markdown.length;
    setStats({ words, chars });
  }, [markdown]);

  // --- FEATURES ---

  // CUSTOM IMAGE COMPONENT
  const ImageRenderer = useCallback(({ src, alt }) => {
    let finalSrc = src;
    if (src.includes('unsplash.com') && !src.includes('?')) {
       finalSrc = `${src}?auto=format&fit=crop&w=1000&q=80`;
    }

    return (
      <img
        src={finalSrc}
        alt={alt}
        className="rounded-xl shadow-lg mx-auto max-w-full object-contain my-4 block"
        crossOrigin="anonymous"
        loading="lazy"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  }, []);

  const handleScroll = (e) => {
    const editor = e.target;
    const preview = previewRef.current;
    if (editor && preview) {
      const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
      preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight);
    }
  };

  const insertFormat = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    setMarkdown(`${before}${prefix}${selection}${suffix}${after}`);
    textarea.focus();
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target.result;
          insertFormat(`![Pasted Image](${base64})`);
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setMarkdown(e.target.result);
      reader.readAsText(file);
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleClear = () => {
    if(window.confirm("Are you sure you want to clear the editor?")) {
      setMarkdown("");
    }
  };

  const handleDownloadPDF = () => {
    const element = printRef.current;
    const opt = {
      margin:       [0.5, 0.5],
      filename:     `${fileName}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
        windowWidth: 800
      },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-[#F3F4F6] text-gray-800'}`}>

      {/* SIDEBAR */}
      <aside className={`w-20 flex flex-col items-center py-8 gap-6 shadow-2xl z-20 shrink-0 transition-colors duration-300 ${darkMode ? 'bg-gray-950 border-r border-gray-800' : 'bg-[#1e293b]'}`}>

        <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/50 mb-2">
          <FileText className="text-white w-6 h-6" />
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-xl transition-all ${darkMode ? 'text-yellow-400 hover:bg-gray-800' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        <div className="w-10 h-px bg-gray-700/50 my-2"></div>

        <label className={`group relative cursor-pointer p-3 rounded-xl transition-all ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
          <Upload className="w-6 h-6" />
          <input type="file" accept=".md,.txt" className="hidden" onChange={handleFileUpload} />
          <span className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-md">Upload</span>
        </label>

        <button onClick={handleClear} className={`group relative p-3 rounded-xl transition-all ${darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-800' : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'}`}>
          <Trash2 className="w-6 h-6" />
          <span className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-md">Clear</span>
        </button>

        <div className="flex-grow"></div>

        <a
          href="https://www.buymeacoffee.com/prodXCE"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-3 rounded-xl transition-all text-yellow-500 hover:bg-yellow-500/10 mb-4"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          <span className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-md">
            Donate
          </span>
        </a>

        <button onClick={handleDownloadPDF} className="group relative p-3 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-xl transition-all mb-4">
          <Download className="w-6 h-6" />
          <span className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-md">Download</span>
        </button>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex overflow-hidden">

        {/* LEFT: EDITOR */}
        <div className={`w-1/2 h-full flex flex-col border-r transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300/50'}`}>

          <div className={`h-14 border-b flex items-center px-4 gap-4 shrink-0 overflow-x-auto transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50/50 border-gray-100'}`}>
            <div className="flex items-center gap-1 shrink-0 bg-transparent">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className={`w-32 text-sm font-bold bg-transparent focus:outline-none border-b border-transparent focus:border-blue-500 transition-all ${darkMode ? 'text-gray-200 placeholder-gray-600' : 'text-gray-700 placeholder-gray-400'}`}
                placeholder="Filename"
              />
              <span className="text-xs text-gray-400 font-mono">.pdf</span>
            </div>

            <div className={`w-px h-6 mx-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

            <div className="flex items-center gap-1">
              <button onClick={() => insertFormat('**', '**')} className={`p-1.5 rounded transition ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}><Bold className="w-4 h-4" /></button>
              <button onClick={() => insertFormat('_', '_')} className={`p-1.5 rounded transition ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}><Italic className="w-4 h-4" /></button>
              <button onClick={() => insertFormat('> ')} className={`p-1.5 rounded transition ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}><Quote className="w-4 h-4" /></button>
              <button onClick={() => insertFormat('# ')} className={`p-1.5 rounded transition ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}><Heading1 className="w-4 h-4" /></button>
              <button onClick={() => insertFormat('## ')} className={`p-1.5 rounded transition ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}><Type className="w-4 h-4" /></button>
              <button onClick={() => insertFormat('- ')} className={`p-1.5 rounded transition ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}><List className="w-4 h-4" /></button>
              <button onClick={() => insertFormat('```\n', '\n```')} className={`p-1.5 rounded transition ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}><Code className="w-4 h-4" /></button>
              <button onClick={() => insertFormat('[', '](url)')} className={`p-1.5 rounded transition ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}><LinkIcon className="w-4 h-4" /></button>
              <button onClick={() => insertFormat('![Alt Text](', ')')} className={`p-1.5 rounded transition ${darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}><ImageIcon className="w-4 h-4" /></button>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            onScroll={handleScroll}
            onPaste={handlePaste}
            className={`flex-1 w-full p-8 resize-none focus:outline-none font-mono text-sm leading-relaxed overflow-y-auto custom-scrollbar transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-300 placeholder-gray-600' : 'bg-white text-gray-700 placeholder-gray-300'}`}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="# Start typing..."
            spellCheck="false"
          />

          <div className={`h-8 border-t flex items-center px-4 text-xs font-medium justify-end gap-4 shrink-0 transition-colors duration-300 ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-500' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
             <span>{stats.words} Words</span>
             <span>{stats.chars} Characters</span>
          </div>
        </div>

        {/* RIGHT: PREVIEW */}
        <div
          ref={previewRef}
          className={`w-1/2 h-full relative overflow-y-auto py-8 px-4 transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-[#E5E7EB]'}`}
        >
          {/* Paper View */}
          <div
            ref={printRef}
            className="w-[21cm] min-h-[29.7cm] h-fit bg-white shadow-xl shadow-gray-400/20 mx-auto transition-transform duration-300 mb-8"
          >
            <div className="p-12 pb-24 prose prose-slate max-w-none break-words
              prose-headings:font-bold
              prose-h1:text-3xl
              prose-pre:bg-gray-800 prose-pre:text-gray-100
              prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto
              [&>*]:break-inside-avoid
              [&_pre]:break-inside-avoid"
            >
              <ReactMarkdown components={{ img: ImageRenderer }}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
