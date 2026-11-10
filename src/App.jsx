import React from "react";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeftRight, ArrowRight, Check, Clipboard, Download, FileUp,
  Languages, RefreshCw, ShieldCheck, Sparkles, Trash2, Type
} from "lucide-react";
import { convert } from "./converter.js";

const SAMPLE_UNICODE = "ଓଡ଼ିଆ ଭାଷା ଆମର ଗର୍ବ। ଆମେ ଓଡ଼ିଶାର ଲୋକ।";
const SAMPLE_LEGACY = "ùKû ù\na";

export default function App() {
  const [direction, setDirection] = useState("unicode-to-akruti");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef(null);

  const isUnicodeToAkruti = direction === "unicode-to-akruti";
  const inputLabel = isUnicodeToAkruti ? "Unicode Odia" : "Akruti Sarala";
  const outputLabel = isUnicodeToAkruti ? "Akruti Sarala output" : "Unicode Odia output";
  const result = useMemo(() => convert(input, direction), [input, direction]);
  const words = input.trim() ? input.trim().split(/\s+/u).length : 0;

  function switchDirection() {
    setDirection((d) => d === "unicode-to-akruti" ? "akruti-to-unicode" : "unicode-to-akruti");
    setInput(output || input);
    setOutput("");
  }

  function copyOutput() {
    if (!result) return;
    navigator.clipboard?.writeText(result).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }).catch(() => {
      const area = document.createElement("textarea");
      area.value = result;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  }

  function downloadOutput() {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isUnicodeToAkruti ? "akruti-output.txt" : "unicode-output.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function loadFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setInput(await file.text());
    setOutput("");
    event.target.value = "";
  }

  function loadSample() {
    setInput(isUnicodeToAkruti ? SAMPLE_UNICODE : "ùKû Ký }");
    setOutput("");
  }

  function clearAll() {
    setInput("");
    setOutput("");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="OdiaType home">
          <span className="brand-mark"><Languages size={21} /></span>
          <span>odia<span className="brand-accent">type</span></span>
        </a>
        <div className="topbar-right"><span className="status-dot" /> Free online tool</div>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow"><Sparkles size={14} /> MADE FOR ODIA CREATORS</div>
          <h1>Odia text, <span>your way.</span></h1>
          <p>Convert between Unicode Odia and Akruti Sarala legacy text in seconds.</p>
          <div className="hero-tags">
            <span><ShieldCheck size={14} /> Runs in your browser</span>
            <span><RefreshCw size={14} /> Two-way conversion</span>
            <span><Type size={14} /> Copy & download</span>
          </div>
        </section>

        <section className="converter-card">
          <div className="converter-heading">
            <div>
              <div className="section-kicker">TEXT CONVERTER</div>
              <h2>Convert your text</h2>
            </div>
            <span className="font-pill">AKRUTI SARALA</span>
          </div>

          <div className="direction-switch">
            <button className={isUnicodeToAkruti ? "direction-option active" : "direction-option"} onClick={() => {setDirection("unicode-to-akruti"); setOutput("");}}>
              Unicode <ArrowRight size={16} /> Akruti
            </button>
            <button className={!isUnicodeToAkruti ? "direction-option active" : "direction-option"} onClick={() => {setDirection("akruti-to-unicode"); setOutput("");}}>
              Akruti <ArrowRight size={16} /> Unicode
            </button>
            <button className="swap-button" onClick={switchDirection} title="Swap direction"><ArrowLeftRight size={17} /></button>
          </div>

          <div className="editor-grid">
            <div className="editor-panel">
              <div className="editor-top">
                <label htmlFor="source-text"> <span className="editor-dot input-dot" /> {inputLabel}</label>
                <span className="muted-label">INPUT</span>
              </div>
              <textarea
                id="source-text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isUnicodeToAkruti ? "ଏଠାରେ ଓଡ଼ିଆ Unicode ଟେକ୍ସଟ୍ ଲେଖନ୍ତୁ କିମ୍ବା paste କରନ୍ତୁ..." : "Paste your Akruti Sarala legacy text here..."}
                spellCheck="false"
              />
              <div className="editor-footer">
                <span>{input.length} characters · {words} words</span>
                <div className="editor-actions">
                  <button onClick={loadSample}>Try sample</button>
                  <button onClick={() => fileRef.current?.click()}><FileUp size={14} /> Upload .txt</button>
                  <input ref={fileRef} type="file" accept=".txt,text/plain" hidden onChange={loadFile} />
                </div>
              </div>
            </div>

            <div className="editor-panel output-panel">
              <div className="editor-top">
                <label htmlFor="output-text"><span className="editor-dot output-dot" /> {outputLabel}</label>
                <span className="muted-label">OUTPUT</span>
              </div>
              <textarea
                id="output-text"
                value={result}
                readOnly
                placeholder="Your converted text will appear here..."
                spellCheck="false"
                className={isUnicodeToAkruti ? "legacy-output" : "unicode-output"}
              />
              <div className="editor-footer">
                <span>{result.length} characters</span>
                <div className="editor-actions">
                  <button onClick={copyOutput} disabled={!result}>{copied ? <Check size={14} /> : <Clipboard size={14} />}{copied ? "Copied" : "Copy"}</button>
                  <button onClick={downloadOutput} disabled={!result}><Download size={14} /> Download</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-actions">
            <button className="clear-button" onClick={clearAll}><Trash2 size={15} /> Clear all</button>
            <div className="live-note"><span className="live-dot" /> Conversion updates as you type</div>
          </div>
        </section>

        <section className="info-grid">
          <article className="info-card">
            <div className="info-icon blue"><ArrowLeftRight size={19} /></div>
            <h3>Two-way conversion</h3>
            <p>Switch between Unicode Odia and Akruti Sarala legacy encoding whenever you need.</p>
          </article>
          <article className="info-card">
            <div className="info-icon violet"><ShieldCheck size={19} /></div>
            <h3>Private by design</h3>
            <p>Your text is processed locally in this browser. It is not uploaded to a server.</p>
          </article>
          <article className="info-card">
            <div className="info-icon amber"><Download size={19} /></div>
            <h3>Ready for your workflow</h3>
            <p>Copy the result or download a TXT file for your publishing and DTP workflow.</p>
          </article>
        </section>

        <section className="notice">
          <div className="notice-icon">i</div>
          <div>
            <strong>Font compatibility note</strong>
            <p>This first version uses the published Akruti Sarala mapping. “Akruti” includes multiple font families and versions. To display legacy output correctly in Word or DTP software, the matching Akruti Sarala font must be installed on that computer. This project does not include a proprietary Akruti font file. Unicode → Akruti uses a reverse lookup and may need manual checking for ambiguous conjuncts and uncommon characters.</p>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} OdiaType</span>
        <span>Built for the Odia creative community</span>
      </footer>
    </div>
  );
}