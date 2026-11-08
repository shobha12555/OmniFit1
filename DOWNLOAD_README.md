# 📥 Downloading BhumiCheck Architecture Docs

This guide explains how to download the architecture documentation as **PDF** or **MS Word**, and how to render the Mermaid diagrams as images.

---

> 🆕 **Want a step-by-step guide specifically for downloading the flowcharts (diagrams)?**  
> 👉 See **[HOW_TO_DOWNLOAD_FLOWCHARTS.md](./HOW_TO_DOWNLOAD_FLOWCHARTS.md)** — beginner-friendly, no coding required, covers all 15 diagrams, PDF & Word.

---

## 📄 Direct Links to Files

| File | Description |
|---|---|
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Complete enterprise architecture document |
| [`ARCHITECTURE_DIAGRAMS.md`](./ARCHITECTURE_DIAGRAMS.md) | All 15 Mermaid diagrams (standalone) |
| [`HOW_TO_DOWNLOAD_FLOWCHARTS.md`](./HOW_TO_DOWNLOAD_FLOWCHARTS.md) | ⭐ Step-by-step guide to download diagrams as PDF/Word |
| [`SALES_PITCH.md`](./SALES_PITCH.md) | CEO sales deck |
| [`i18n/en.json`](./i18n/en.json) | English UI strings |
| [`i18n/hi.json`](./i18n/hi.json) | Hindi UI strings (हिन्दी) |

---

## 🖨️ Export to PDF

### Option 1 — GitHub Print to PDF (Easiest, No Tools Needed)
1. Open the file on GitHub (e.g., `ARCHITECTURE.md`)
2. Press **Ctrl+P** (Windows/Linux) or **⌘+P** (macOS)
3. Set destination to **"Save as PDF"**
4. Enable **"Background graphics"** for proper color rendering
5. Click **Save**

> ⚠️ Mermaid diagrams may not render in browser print. Use Option 2 or 3 for diagrams.

### Option 2 — Pandoc (Best Quality, Full Mermaid Support)

Install Pandoc and required dependencies:

```bash
# macOS
brew install pandoc
brew install --cask mactex   # for PDF via LaTeX

# Ubuntu / Debian
sudo apt-get install pandoc texlive-xetex texlive-fonts-recommended

# Windows (via Chocolatey)
choco install pandoc miktex
```

Convert Markdown to PDF:

```bash
pandoc docs/ARCHITECTURE.md \
  -o BhumiCheck_Architecture.pdf \
  --pdf-engine=xelatex \
  --toc \
  -V geometry:margin=1in \
  -V mainfont="DejaVu Sans"
```

Convert all docs at once:

```bash
pandoc docs/ARCHITECTURE.md docs/SALES_PITCH.md \
  -o BhumiCheck_Complete_Docs.pdf \
  --pdf-engine=xelatex \
  --toc \
  -V geometry:margin=1in
```

### Option 3 — Online Converters

| Tool | URL | Notes |
|---|---|---|
| Dillinger | https://dillinger.io | Paste Markdown → Export PDF |
| StackEdit | https://stackedit.io | Full Markdown editor with PDF export |
| Markdown to PDF | https://md2pdf.netlify.app | Simple drag-and-drop |
| GitPrint | https://gitprint.com | Append `?print` to GitHub URL |

---

## 📝 Export to MS Word (.docx)

### Using Pandoc

```bash
pandoc docs/ARCHITECTURE.md \
  -o BhumiCheck_Architecture.docx \
  --toc \
  --reference-doc=custom-reference.docx   # optional: use your branded template
```

To export all docs:

```bash
pandoc docs/ARCHITECTURE.md docs/SALES_PITCH.md \
  -o BhumiCheck_Complete.docx \
  --toc
```

### Using Online Tools

| Tool | URL |
|---|---|
| Aspose Markdown to Word | https://products.aspose.app/words/conversion/md-to-word |
| CloudConvert | https://cloudconvert.com/md-to-docx |
| Word Online (paste) | Copy rendered Markdown from GitHub → Paste into Word Online |

---

## 🖼️ Rendering Mermaid Diagrams as Images

All architecture diagrams in `ARCHITECTURE_DIAGRAMS.md` use [Mermaid](https://mermaid.js.org) syntax. Here's how to convert them to PNG/SVG:

### Option 1 — mermaid.live (Browser, No Install)
1. Go to **https://mermaid.live**
2. Paste any diagram block from `ARCHITECTURE_DIAGRAMS.md`
3. Click **"Download PNG"** or **"Download SVG"**

### Option 2 — Mermaid CLI (Batch Export)

```bash
# Install
npm install -g @mermaid-js/mermaid-cli

# Export single diagram
mmdc -i diagram.mmd -o diagram.png -t default -w 1920

# Export all .mmd files in a directory
for f in docs/diagrams/*.mmd; do
  mmdc -i "$f" -o "${f%.mmd}.png" -w 1920 -H 1080
done
```

### Option 3 — GitHub Native Rendering
GitHub renders Mermaid diagrams natively in Markdown files. Simply view `ARCHITECTURE_DIAGRAMS.md` on GitHub to see all diagrams rendered inline.

### Option 4 — VS Code Extension
Install the **Markdown Preview Mermaid Support** extension:
```
ext install bierner.markdown-mermaid
```
Then use `Ctrl+Shift+V` to preview and right-click to save diagrams.

---

## 🌐 Viewing Hindi / Devanagari Content

Hindi content in `i18n/hi.json` uses standard UTF-8 Devanagari Unicode. It renders correctly in:
- Any modern browser (Chrome, Firefox, Safari, Edge)
- VS Code with any theme
- GitHub Markdown viewer
- Pandoc PDF output (use `mainfont="Noto Sans Devanagari"` for best results)

---

## 📦 Complete Download Package

To download all docs as a ZIP from GitHub:

1. Go to the repository root on GitHub
2. Click **Code → Download ZIP**
3. The `docs/` folder will be included in the ZIP

Or using `git`:

```bash
git clone https://github.com/abcgstabc-cloud/Bhu-Sathi.git
cd Bhu-Sathi/docs
```

---

## 🛠️ Pandoc Installation Quick Reference

| Platform | Command |
|---|---|
| macOS | `brew install pandoc` |
| Ubuntu | `sudo apt install pandoc` |
| Windows | `choco install pandoc` or download from https://pandoc.org/installing.html |
| Docker | `docker run --rm -v $(pwd):/data pandoc/latex ARCHITECTURE.md -o out.pdf` |

---

*Generated for BhumiCheck — India's Land Intelligence Platform*
