"use client";
import React, { useState, useRef, useEffect } from "react";
import "../globals.css";

const Main = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [boldActive, setBoldActive] = useState(false);

  // Tabs management
  const [tabs, setTabs] = useState<string[]>(["Tab 1"]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabContents, setTabContents] = useState<{ [key: number]: string }>({
    0: "",
  });
  const [animatedTabs, setAnimatedTabs] = useState<string[]>(["Tab 1"]);

  // Renaming state
  const [renamingIndex, setRenamingIndex] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const editorRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => setDarkMode(!darkMode);

  const addTab = () => {
    if (tabs.length >= 15) return;
    const newIndex = tabs.length;
    const newName = `Tab ${newIndex + 1}`; // Default tab naming
    setTabs([...tabs, newName]);
    setTabContents({ ...tabContents, [newIndex]: "" });
    setActiveTabIndex(newIndex);

    // Animate tab appearance
    setAnimatedTabs((prev) => [...prev, ""]);
    setTimeout(() => {
      setAnimatedTabs((prev) =>
        prev.map((t, i) => (i === newIndex ? newName : t))
      );
    }, 50);
  };

  const deleteTab = (index: number) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((_, i) => i !== index);
    const newContents = { ...tabContents };
    delete newContents[index];
    const shiftedContents: { [key: number]: string } = {};
    newTabs.forEach((_, i) => {
      shiftedContents[i] = newContents[i] ?? "";
    });
    setTabs(newTabs);
    setAnimatedTabs(newTabs);
    setTabContents(shiftedContents);
    setActiveTabIndex(Math.max(0, activeTabIndex - 1));
  };

  const startRenaming = (index: number) => {
    setRenamingIndex(index);
    setRenameValue(tabs[index]);
  };

  const handleRenameSubmit = (index: number) => {
    const newTabs = [...tabs];
    newTabs[index] = renameValue.trim() || newTabs[index];
    setTabs(newTabs);
    setAnimatedTabs(newTabs);
    setRenamingIndex(null);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = tabContents[activeTabIndex] || "";
    }
  }, [activeTabIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const makeBold = () => {
    document.execCommand("bold");
    setBoldActive(!boldActive);
    editorRef.current?.focus();
  };

    const generateHTML = () => {
  const content = tabContents[activeTabIndex] || "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${tabs[activeTabIndex]}</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 1rem; background-color: ${darkMode ? "#111" : "#f9f9f9"}; color: ${darkMode ? "#f9f9f9" : "#111"};">

<h1 style="color: ${darkMode ? "#0ff" : "#06c"};">${tabs[activeTabIndex]}</h1>

<div style="background: gray; padding: 2px 4px; border-radius: 4px;">
  ${content}
</div>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("Page loaded!");
    const headings = document.querySelectorAll("h1");
    headings.forEach(h => {
      h.addEventListener("click", () => {
        alert("You clicked: " + h.innerText);
      });
    });
  });
</script>
</body>
</html>`;
};



  const copyCode = () => {
    navigator.clipboard.writeText(generateHTML());
    alert("Code copied to clipboard!");
  };

  return (
    <main
      className={`main d-flex flex-column p-3 ${
        darkMode ? "bg-black text-white" : "bg-light text-dark"
      }`}
      style={{ minHeight: "80vh" }}
    >
      {/* Header Bar */}
      <div className="d-flex justify-content-end mb-3">
        <button onClick={toggleTheme} className="btn btn-secondary">
          {darkMode ? "☀️ Light Mode" : "🌑 Dark Mode"}
        </button>
      </div>

      {/* Main content */}
      <div
        className="d-flex flex-column flex-md-row justify-content-center align-items-stretch gap-3 flex-grow-1"
        style={{ overflow: "hidden" }}
      >
        {/* First container: Tabs */}
        <div
          className="first-container border rounded p-3 flex-fill d-flex flex-column"
          style={{ minWidth: "200px", overflowY: "auto" }}
        >
          <div className="d-flex flex-column">
            {animatedTabs.map((tab, index) => (
              <div
                key={index}
                className="d-flex mb-1 align-items-center"
                style={{
                  transition: "all 0.3s ease",
                  opacity: tab ? 1 : 0,
                  maxHeight: tab ? "50px" : 0,
                }}
              >
                {renamingIndex === index ? (
                  <input
                    type="text"
                    value={renameValue}
                    autoFocus
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => handleRenameSubmit(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameSubmit(index);
                      if (e.key === "Escape") setRenamingIndex(null);
                    }}
                    className="form-control me-1"
                  />
                ) : (
                  <button
                    className={`btn flex-fill me-1 ${
                      activeTabIndex === index
                        ? "bg-dark text-white"
                        : "btn-outline-dark"
                    }`}
                    onClick={() => {
                      if (activeTabIndex === index) {
                        startRenaming(index); // click active tab to rename
                      } else {
                        setActiveTabIndex(index); // click another tab to switch
                      }
                    }}
                  >
                    {tab || " "}
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTab(index)}
                >
                  ×
                </button>
              </div>
            ))}
            <button className="btn btn-secondary mt-2" onClick={addTab}>
              + Add Tab
            </button>
          </div>
        </div>

        {/* Second container: Editor */}
        <div
          className="second-container border rounded p-3 flex-fill d-flex flex-column"
          style={{ minWidth: "280px", overflowY: "auto" }}
        >
          <div className="mb-2">
            <button
              className={`btn me-2 ${
                boldActive ? "bg-dark text-white" : "btn-secondary"
              }`}
              onClick={makeBold}
            >
              Bold
            </button>
          </div>
          <div
            ref={editorRef}
            contentEditable
            className="border p-2 flex-grow-1"
            style={{ minHeight: "150px", width: "100%", overflowY: "auto" }}
            onInput={(e) => {
              setTabContents({
                ...tabContents,
                [activeTabIndex]: (e.target as HTMLDivElement).innerHTML,
              });
            }}
          />
        </div>

        {/* Third container: Code display */}
        <div
          className={`third-container border rounded p-3 flex-fill d-flex flex-column ${
            darkMode
              ? "bg-dark text-light border-light"
              : "bg-light text-dark border-dark"
          }`}
          style={{ minWidth: "200px", overflowY: "auto" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold">Code</span>
            <button
              className={`btn btn-sm ${
                darkMode ? "btn-light text-dark" : "btn-primary"
              }`}
              onClick={copyCode}
            >
              Copy
            </button>
          </div>
          <pre
            className={`flex-grow-1 p-2 rounded ${
              darkMode ? "bg-black text-light" : "bg-white text-dark"
            }`}
            style={{
              fontSize: "12px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowY: "auto",
            }}
          >
            {generateHTML()}
          </pre>
        </div>
      </div>
    </main>
  );
};

export default Main;
