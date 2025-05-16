import { useState, useEffect, useRef } from "react";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ command: string; output: string }[]>(
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = () => {
    if (!input.trim()) return;

    let output = "";
    const cmd = input.trim().toLowerCase();

    if (cmd === "help") {
      output =
        "Available commands: help, about, skills, projects, contact, clear";
    } else if (cmd === "about") {
      output =
        "Hi! I'm Cooper, a full-stack developer passionate about building clean, efficient applications.";
    } else if (cmd === "skills") {
      output = "JavaScript/TypeScript, React, Node.js, Python, C++, SQL, AWS";
    } else if (cmd === "projects") {
      output =
        "• AI-powered tools\n• Full-stack platforms\n• C compiler\n• This portfolio";
    } else if (cmd === "contact") {
      output = "Email: cooper.macgregor@gmail.com\nGitHub: cooopmac";
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else {
      output = `Command not found: ${input}. Type 'help' for available commands.`;
    }

    setHistory([...history, { command: input, output }]);
    setInput("");

    // Scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  useEffect(() => {
    // Add initial greeting
    if (history.length === 0) {
      setHistory([
        {
          command: "",
          output:
            "Welcome to Cooper's Terminal! Type 'help' to see available commands.",
        },
      ]);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand();
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="mt-4 mx-4 h-56 bg-neutral-900 rounded-md border border-neutral-800 overflow-hidden flex flex-col"
      onClick={focusInput}
    >
      <div className="bg-neutral-800 px-4 py-2 flex items-center relative">
        <div className="absolute left-4 flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="w-full text-center text-xs font-pixel text-neutral-400">
          terminal
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 p-3 overflow-y-auto font-mono text-sm"
      >
        {history.map((item, i) => (
          <div key={i} className="mb-1">
            {item.command && (
              <div className="flex">
                <span className="text-green-400 mr-2">➜</span>
                <span className="text-purple-400 mr-2">~</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            <div className="text-neutral-300 whitespace-pre-line pl-4">
              {item.output}
            </div>
          </div>
        ))}
        <div className="flex">
          <span className="text-green-400 mr-2">➜</span>
          <span className="text-purple-400 mr-2">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
