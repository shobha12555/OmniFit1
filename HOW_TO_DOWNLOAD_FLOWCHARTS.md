# 📥 How to Download the BhumiCheck Flowcharts as PDF & Word

> **Step-by-step guide for all skill levels — no coding required for Methods 1 & 2**

The flowcharts (architecture diagrams) live in **[`ARCHITECTURE_DIAGRAMS.md`](./ARCHITECTURE_DIAGRAMS.md)**.  
There are **15 diagrams** in that file: system architecture, AI engine, GPS flow, ER diagram, and more.

---

## 🗂️ Quick Navigation

| Your Goal | Best Method |
|---|---|
| Save **one diagram** as a PNG/SVG image | ➡️ [Method 1 — mermaid.live](#method-1--mermaidlive-one-diagram-at-a-time-easiest) |
| Save the **whole document** as PDF instantly | ➡️ [Method 2 — Browser Print to PDF](#method-2--browser-print-to-pdf-whole-document) |
| Save as a proper Word (.docx) file | ➡️ [Method 3 — CloudConvert Online](#method-3--cloudconvert-online-no-install-needed) |
| Best quality PDF + diagrams with colour | ➡️ [Method 4 — Pandoc (Developer)](#method-4--pandoc-best-quality-developers) |

---

## Method 1 — mermaid.live (One Diagram at a Time, Easiest)

**What you need:** Any web browser (Chrome, Firefox, Edge, Safari)  
**Time:** ~2 minutes per diagram  
**Result:** PNG image or SVG image of the diagram

---

### Step 1 — Open the Diagrams File on GitHub

1. Go to the repository on GitHub:  
   `https://github.com/abcgstabc-cloud/Bhu-Sathi`
2. Click the **`docs`** folder.
3. Click **`ARCHITECTURE_DIAGRAMS.md`**.
4. You will see all 15 diagrams rendered as colourful flowcharts.

---

### Step 2 — Choose the Diagram You Want

Each diagram has a heading like:
- `## 1. 🏗️ Master System Architecture`
- `## 2. 🤖 Hybrid AI Engine Flow`
- `## 3. 🗺️ User Journey Flowchart`
- … and so on up to 15.

Scroll to the diagram you want to download.

---

### Step 3 — Copy the Mermaid Code

1. Click the **Raw** button at the top-right of the file on GitHub  
   *(Or press `Ctrl+U` / `Cmd+U` in browser to view page source)*
2. Find the diagram you want — it is marked by a line that says `` ```mermaid `` at the start
   and a closing `` ``` `` line at the end.
3. **Select all the text** between those two marker lines (including `flowchart TD` or `flowchart LR`).
4. Press **`Ctrl+C`** (Windows/Linux) or **`⌘+C`** (Mac) to copy it.

> 💡 **Tip:** On GitHub, you can also click the **"Copy raw file"** button (clipboard icon) at the top-right of the file view.

---

### Step 4 — Paste into mermaid.live

1. Open a new browser tab and go to: **https://mermaid.live**
2. You will see a text editor on the left and a preview panel on the right.
3. **Delete** all existing text in the left editor.
4. Press **`Ctrl+V`** (Windows/Linux) or **`⌘+V`** (Mac) to paste your copied diagram code.
5. The diagram appears immediately in the right panel.

---

### Step 5 — Download as PNG (for PDF or Word)

**To download as PNG (image):**
1. Look at the top-right of the page — find the **"Actions"** dropdown button.
2. Click it and choose **"PNG"**.
3. The PNG file downloads to your **Downloads** folder automatically.
4. File name example: `diagram.png`

**To download as SVG (for scalable / print quality):**
1. Click the **"Actions"** dropdown.
2. Choose **"SVG"**.
3. SVG downloads to your **Downloads** folder.

---

### Step 6 — Insert the Image into Word or PDF

**To insert into Microsoft Word:**
1. Open Microsoft Word.
2. Click **Insert** → **Pictures** → **This Device**.
3. Navigate to your **Downloads** folder.
4. Select the downloaded `diagram.png` or `diagram.svg`.
5. Click **Insert**.
6. Save as `.docx` or export as PDF from Word (**File → Save As → PDF**).

**To insert into Google Docs:**
1. Open Google Docs.
2. Click **Insert** → **Image** → **Upload from computer**.
3. Select the downloaded `diagram.png`.
4. Click **Open**.

---

### Repeat for Each Diagram

Repeat Steps 2–5 for each of the 15 diagrams you want to save.

---

## Method 2 — Browser Print to PDF (Whole Document)

**What you need:** Any web browser (Chrome recommended)  
**Time:** ~1 minute  
**Result:** PDF of the full `ARCHITECTURE_DIAGRAMS.md` page with all diagrams

> ⚠️ **Note:** This method prints all diagrams as they appear on GitHub. Most browsers now render Mermaid diagrams correctly when printing from GitHub.

---

### Step 1 — Open the File on GitHub

1. Go to: `https://github.com/abcgstabc-cloud/Bhu-Sathi/blob/main/docs/ARCHITECTURE_DIAGRAMS.md`
2. Wait for all 15 diagrams to fully render (they may take 10–20 seconds).

---

### Step 2 — Open Print Dialog

#### On Windows (Chrome / Edge):
- Press **`Ctrl + P`**

#### On Mac (Chrome / Safari):
- Press **`⌘ + P`**

#### On Mobile (Android Chrome):
- Tap the **three-dot menu** (⋮) at the top-right.
- Tap **Share** → **Print**.

---

### Step 3 — Set Print Settings

In the print dialog that appears, change these settings:

| Setting | Value to Choose |
|---|---|
| **Destination / Printer** | **Save as PDF** |
| **Paper size** | A4 |
| **Layout / Orientation** | **Landscape** (recommended for wide diagrams) |
| **Margins** | Minimum or None |
| **Background graphics** | ✅ **Enabled** (critical for diagram colours!) |
| **Scale** | 100% (or "Fit to page") |

> 🔴 **Important:** If you skip "Background graphics", the diagrams will appear as blank boxes.

---

### Step 4 — Save the PDF

1. Click **Save** (Chrome) or **Print** (then choose a save location).
2. Choose where to save the file on your computer.
3. Give it a name like `BhumiCheck_Diagrams.pdf`.
4. Click **Save**.

✅ Done! You now have a PDF with all 15 diagrams.

---

### Step 5 — Convert PDF to Word (Optional)

If you also need a Word (.docx) version:

1. Go to: **https://www.ilovepdf.com/pdf_to_word**
2. Click **"Select PDF file"** and upload your `BhumiCheck_Diagrams.pdf`.
3. Click **"Convert to Word"**.
4. Download the `.docx` file.

---

## Method 3 — CloudConvert Online (No Install Needed)

**What you need:** A free CloudConvert account + internet  
**Time:** ~3 minutes  
**Result:** Properly formatted Word (.docx) or PDF with all diagrams

> This is the best no-install option for a **Word document** with all diagrams included.

---

### Step 3.1 — Download the Raw Markdown File

1. Go to: `https://github.com/abcgstabc-cloud/Bhu-Sathi/blob/main/docs/ARCHITECTURE_DIAGRAMS.md`
2. Click the **"Raw"** button at the top-right of the file.
3. You will see plain text. Press **`Ctrl+S`** (Windows) or **`⌘+S`** (Mac) to save it.
4. Save as `ARCHITECTURE_DIAGRAMS.md` (choose "All Files" type if needed — not `.txt`).

> 📁 Alternatively, to download ALL docs at once: Go to repository → **Code** → **Download ZIP** → unzip → find the `docs/` folder.

---

### Step 3.2 — Convert to PDF using CloudConvert

1. Go to: **https://cloudconvert.com/md-to-pdf**
2. Click **"Select File"**.
3. Upload `ARCHITECTURE_DIAGRAMS.md`.
4. Click the **Convert** button.
5. When done, click **Download**.
6. Your `ARCHITECTURE_DIAGRAMS.pdf` downloads to your Downloads folder.

---

### Step 3.3 — Convert to Word using CloudConvert

1. Go to: **https://cloudconvert.com/md-to-docx**
2. Click **"Select File"**.
3. Upload `ARCHITECTURE_DIAGRAMS.md`.
4. Click the **Convert** button.
5. When done, click **Download**.
6. Your `ARCHITECTURE_DIAGRAMS.docx` downloads to your Downloads folder.

> 💡 **Note:** CloudConvert converts the text and structure. For the Mermaid diagram images, follow Method 1 to download each diagram as PNG and then paste them into the Word file at the right location.

---

### Step 3.4 — Combining Diagrams into the Word Document

1. Open the downloaded `.docx` in Microsoft Word.
2. For each diagram section (you will see a code block where the diagram should be):
   - Download the matching PNG from mermaid.live (Method 1).
   - Place your cursor where the code block is.
   - Select and delete the code block text.
   - Click **Insert** → **Pictures** → **This Device** → select the PNG.
3. Resize as needed.
4. Save the file.

---

## Method 4 — Pandoc (Best Quality, Developers)

**What you need:** Command line / Terminal + Pandoc installed  
**Time:** 15 minutes setup, then 30 seconds per conversion  
**Result:** High-quality PDF or Word with proper formatting

> Use this if you are comfortable with the command line and want the best output quality.

---

### Step 4.1 — Install Pandoc

#### Windows:
1. Go to: **https://pandoc.org/installing.html**
2. Download the Windows installer (`.msi` file).
3. Double-click to install. Click **Next** → **Next** → **Install**.
4. Open **Command Prompt** (search "cmd" in Start Menu).
5. Type `pandoc --version` and press Enter to confirm it's installed.

#### macOS:
1. Open **Terminal** (search "Terminal" in Spotlight).
2. If you have Homebrew, type:
   ```
   brew install pandoc
   ```
3. If you don't have Homebrew, download the `.pkg` file from **https://pandoc.org/installing.html**.
4. Double-click the `.pkg` to install.

#### Ubuntu / Linux:
```bash
sudo apt-get update
sudo apt-get install pandoc
```

---

### Step 4.2 — Install a PDF Engine (for PDF output only)

Pandoc needs a "PDF engine" to create PDF files.

#### Windows (MiKTeX — easiest):
1. Go to: **https://miktex.org/download**
2. Download the Windows installer.
3. Run the installer, accept defaults, click **Install**.

#### macOS (BasicTeX — smallest):
```bash
brew install --cask basictex
```

#### Ubuntu:
```bash
sudo apt-get install texlive-xetex texlive-fonts-recommended
```

> 💡 If you only need **Word (.docx)**, you can **skip this step** — Pandoc does not need a PDF engine for Word output.

---

### Step 4.3 — Download the Repository Files

Open Terminal / Command Prompt and type:

```bash
git clone https://github.com/abcgstabc-cloud/Bhu-Sathi.git
cd Bhu-Sathi
```

Or download the ZIP: **GitHub → Code → Download ZIP** → unzip it.

---

### Step 4.4 — Convert to PDF

In Terminal / Command Prompt, from inside the `Bhu-Sathi` folder, run:

```bash
pandoc docs/ARCHITECTURE_DIAGRAMS.md -o BhumiCheck_Diagrams.pdf --pdf-engine=xelatex -V geometry:margin=1in -V mainfont="DejaVu Sans"
```

**Convert ALL documents together into one PDF:**
```bash
pandoc docs/ARCHITECTURE.md docs/ARCHITECTURE_DIAGRAMS.md docs/SALES_PITCH.md -o BhumiCheck_Complete.pdf --pdf-engine=xelatex --toc -V geometry:margin=1in
```

The PDF file is saved in the current folder where you ran the command.

> ⚠️ Mermaid code blocks will appear as text in Pandoc output. To get rendered diagrams, first export each diagram as PNG using Method 1, then use `--resource-path` to include them, or paste them manually into the Word document.

---

### Step 4.5 — Convert to Word (.docx)

```bash
pandoc docs/ARCHITECTURE_DIAGRAMS.md -o BhumiCheck_Diagrams.docx --toc
```

**Convert ALL documents together into one Word file:**
```bash
pandoc docs/ARCHITECTURE.md docs/ARCHITECTURE_DIAGRAMS.md docs/SALES_PITCH.md -o BhumiCheck_Complete.docx --toc
```

The `.docx` file is saved in the current folder.

---

## 🌟 Recommended Workflow (Best Result)

For the **best PDF or Word** file with all 15 colourful diagrams:

```
Step A → Download all 15 diagram PNGs from mermaid.live (Method 1, Steps 1–5)
Step B → Download the ARCHITECTURE_DIAGRAMS.md as Word via CloudConvert (Method 3, Step 3.3)
Step C → Open the Word file, replace each code block with the matching PNG (Method 3, Step 3.4)
Step D → File → Save As → PDF  (from Microsoft Word or Google Docs)
```

**Time needed:** ~30 minutes for all 15 diagrams

---

## 📋 All 15 Diagrams — Quick Reference

| # | Diagram Name | Section in File |
|---|---|---|
| 1 | 🏗️ Master System Architecture | `## 1.` |
| 2 | 🤖 Hybrid AI Engine Flow | `## 2.` |
| 3 | 🗺️ User Journey Flowchart | `## 3.` |
| 4 | 🌐 Multi-Language System | `## 4.` |
| 5 | 📐 GPS Demarcation Flow | `## 5.` |
| 6 | 🔄 Data Flow Diagram | `## 6.` |
| 7 | 🔒 Security Architecture | `## 7.` |
| 8 | 🚀 Deployment Topology | `## 8.` |
| 9 | 🔗 Microservice Dependency Graph | `## 9.` |
| 10 | 💳 Monetization & Subscription Flow | `## 10.` |
| 11 | 🕷️ Scraper Orchestration Flow | `## 11.` |
| 12 | 🧠 RAG Pipeline Detail | `## 12.` |
| 13 | ⚡ CI/CD Pipeline | `## 13.` |
| 14 | 🗃️ Database ER Diagram | `## 14.` |
| 15 | 🔄 Land Record Lifecycle (State Machine) | `## 15.` |

---

## ❓ Frequently Asked Questions

**Q: The diagram appears as a text code block when I print. What do I do?**  
A: GitHub needs a second or two to render Mermaid diagrams. Wait for the coloured diagram to appear before printing. If it still shows code, try hard-refreshing the page (`Ctrl+Shift+R`).

**Q: The diagrams are white / blank in the PDF I printed.**  
A: In the browser print dialog, make sure **"Background graphics"** is checked/enabled.

**Q: mermaid.live shows an error when I paste.**  
A: Make sure you copied only the text *between* the ` ```mermaid ` and closing ` ``` ` lines, not including those lines themselves.

**Q: My PNG is low resolution.**  
A: On mermaid.live, before downloading click the **gear icon ⚙️** → increase "Width" to `2400` → then download.

**Q: I want a PDF of the whole architecture document (not just diagrams).**  
A: Follow Method 2, but open `ARCHITECTURE.md` instead of `ARCHITECTURE_DIAGRAMS.md`. That file contains the full 10-section enterprise architecture.

**Q: Can I do this on a phone / tablet?**  
A: Yes — Method 2 (Print to PDF) works on Android Chrome and iPhone Safari. Method 1 (mermaid.live) also works in mobile browsers.

**Q: I get "xelatex not found" when running the Pandoc command.**  
A: Install MiKTeX (Windows) or BasicTeX (Mac) first — see Step 4.2.

---

## 🔗 Useful Links

| Tool | Link | Purpose |
|---|---|---|
| mermaid.live | https://mermaid.live | Render & download individual diagrams |
| CloudConvert MD→PDF | https://cloudconvert.com/md-to-pdf | Convert Markdown to PDF online |
| CloudConvert MD→DOCX | https://cloudconvert.com/md-to-docx | Convert Markdown to Word online |
| iLovePDF | https://www.ilovepdf.com/pdf_to_word | Convert PDF to Word |
| Pandoc download | https://pandoc.org/installing.html | Install Pandoc CLI |
| MiKTeX (Windows PDF) | https://miktex.org/download | PDF engine for Windows |
| ARCHITECTURE_DIAGRAMS.md | ./ARCHITECTURE_DIAGRAMS.md | All 15 diagrams source |
| ARCHITECTURE.md | ./ARCHITECTURE.md | Full architecture document |

---

*BhumiCheck — India's Land Intelligence Platform*  
*For a technical overview of all export methods, see [`DOWNLOAD_README.md`](./DOWNLOAD_README.md)*
