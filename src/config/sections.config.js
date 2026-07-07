// Controls which sections render, in what order, and how the terminal
// refers to them (`file` = what "ls" shows and what "cd" matches against).

export const sections = [
  { id: "hero", enabled: true, file: null },
  { id: "terminal-bio", enabled: true, file: "about.txt" },
  { id: "manifesto", enabled: true, file: "manifesto.md" },
  { id: "now", enabled: true, file: "now.log" },
  { id: "case-study", enabled: true, file: "work/" },
  { id: "timeline", enabled: true, file: "timeline.log" },
  { id: "build-log", enabled: true, file: "experiments/" },
  { id: "failures", enabled: true, file: "failures.log" },
  { id: "playground", enabled: false, file: "playground/" },
  { id: "contact", enabled: false, file: "contact.sh" },
];