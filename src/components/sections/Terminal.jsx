import { useState, useRef, useEffect } from "react";
import { sections } from "../../config/sections.config.js";
import site from "../../config/site.config.js";

function runCommand(raw, print, setActiveSection, registry) {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const arg = args.join(" ");

  switch (cmd) {
    case "":
      return;

    case "help":
      print([
        "available commands:",
        "  ls              list sections",
        "  cd <section>    open a section",
        "  cd ..           close current section",
        "  cat about.txt   print bio inline",
        "  whoami          who is this",
        "  clear           clear the terminal",
      ]);
      return;

    case "ls":
      print(sections.filter((s) => s.enabled && s.file).map((s) => s.file));
      return;

    case "whoami":
      print([`${site.name} — ${site.role}`]);
      return;

    case "cat": {
      const clean = arg.toLowerCase();
      const knownFiles = ["about.txt"]; // extend this list as you add more "cat-able" files

      if (clean === "about.txt") {
        print([site.tagline]);
        return;
      }

      const suggestions = knownFiles.filter(
        (f) => f.includes(clean) || clean.includes(f.replace(".txt", ""))
      );

      if (suggestions.length > 0) {
        print([
          `cat: ${arg || "(missing file)"}: no such file`,
          `did you mean: ${suggestions.join(", ")}?`,
        ]);
      } else {
        print([`cat: ${arg || "(missing file)"}: no such file`]);
      }
      return;
    }

    case "cd": {
      const clean = arg.replace("/", "").toLowerCase();
      if (!clean || clean === "..") {
        setActiveSection(null);
        print(["closed — back to ~/"]);
        return;
      }

      const available = sections.filter((s) => s.enabled && s.file);

      // exact match first
      const target = available.find(
        (s) => s.file.replace("/", "").toLowerCase() === clean
      );

      if (target && registry[target.id]) {
        setActiveSection(target.id);
        print([`opened ~/${target.file}`]);
        return;
      }

      // no exact match — look for close matches
      const suggestions = available.filter((s) => {
        const name = s.file.replace("/", "").toLowerCase();
        return name.includes(clean) || clean.includes(name);
      });

      if (suggestions.length > 0) {
        print([
          `cd: ${arg}: no such section`,
          `did you mean: ${suggestions.map((s) => s.file).join(", ")}?`,
        ]);
      } else {
        print([
          `cd: ${arg}: no such section`,
          `type "ls" to see available sections`,
        ]);
      }
      return;
    }

    case "clear":
      print(null);
      return;

    default:
      print([`command not found: ${cmd}. type "help" for a list.`]);
  }
}

export default function Terminal({ registry }) {
  const [history, setHistory] = useState([
    { type: "output", lines: [`Welcome, ${site.name.split(" ")[0]}'s portfolio. Type "help" to start.`] },
  ]);
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState([]);
  const [cmdPointer, setCmdPointer] = useState(-1);
  const [activeSection, setActiveSection] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const print = (lines) => {
    if (lines === null) {
      setHistory([]);
      return;
    }
    setHistory((h) => [...h, { type: "output", lines }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const command = input;
    setHistory((h) => [...h, { type: "input", lines: [command] }]);
    runCommand(command, print, setActiveSection, registry);
    setCmdLog((log) => [...log, command]);
    setCmdPointer(-1);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdLog.length === 0) return;
      const nextPointer = cmdPointer === -1 ? cmdLog.length - 1 : Math.max(0, cmdPointer - 1);
      setCmdPointer(nextPointer);
      setInput(cmdLog[nextPointer]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdPointer === -1) return;
      const nextPointer = cmdPointer + 1;
      if (nextPointer >= cmdLog.length) {
        setCmdPointer(-1);
        setInput("");
      } else {
        setCmdPointer(nextPointer);
        setInput(cmdLog[nextPointer]);
      }
    }
  };

  const ActiveComponent = activeSection ? registry[activeSection] : null;

  return (
    <section className="min-h-screen flex flex-col bg-bg" id="terminal">
      <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 py-8">
        <div
          className="flex flex-col flex-1 rounded-xl border border-mist/20 bg-bg2 overflow-hidden"
          onClick={() => document.getElementById("terminal-input")?.focus()}
        >
          {/* window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-mist/20 shrink-0">
            <span className="w-3 h-3 rounded-full bg-coral/70" />
            <span className="w-3 h-3 rounded-full bg-lime/70" />
            <span className="w-3 h-3 rounded-full bg-mist/70" />
            <span className="ml-3 text-xs font-mono text-mist">navigate.sh</span>
          </div>

          {/* command log */}
          <div className="p-4 font-mono text-sm h-56 overflow-y-auto space-y-1 border-b border-mist/20 shrink-0">
            {history.map((entry, i) => (
              <div key={i}>
                {entry.type === "input" ? (
                  <div className="text-lime">
                    <span className="text-mist">$ </span>
                    {entry.lines[0]}
                  </div>
                ) : (
                  entry.lines.map((line, j) => (
                    <div key={j} className="text-ink">{line}</div>
                  ))
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* input line */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center px-4 py-3 font-mono text-sm border-b border-mist/20 shrink-0"
          >
            <span className="text-mist mr-2">$</span>
            <input
              id="terminal-input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-ink"
              placeholder="type a command... (try 'help')"
            />
          </form>

          {/* content viewport - renders whatever section was cd'd into */}
          <div className="flex-1 overflow-y-auto">
            {ActiveComponent ? (
              <ActiveComponent />
            ) : (
              <div className="p-8 font-mono text-xs text-mist">
                nothing open — try <span className="text-lime">cd about.txt</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}