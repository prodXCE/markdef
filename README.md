# MarkDef

<div align="center">
  <img src="public/favicon.svg" alt="Zen PDF Logo" width="100" />
  <br/>
  <br/>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  
  <h3>A distraction-free Markdown editor with smart PDF export.</h3>
  
  [Live Demo](https://markdef.vercel.app) · [Report Bug](https://github.com/prodXCE/markdef/issues) · [Request Feature](https://github.co,/prodXCE/markdef/issues)
</div>

---

## 🚀 About The Project

**MarkDef** is a minimal, browser-based tool designed to solve a specific problem: converting Markdown to PDF without the layout breaking.

Most Markdown editors slice code blocks in half or leave orphans at the bottom of the page when printing. MarkDef uses a smart A4 simulation engine to ensure your documents look professional, with optimized pagination, magnetic headers, and unbreakable code blocks.

### Key Features

* **📄 Smart PDF Generation:** Automatically prevents page breaks inside code blocks, lists, and headers.
* **🌗 Dark/Light Mode:** A beautiful "Midnight Blue" dark theme for late-night writing.
* **⚡ Live Preview:** Real-time rendering with synchronized scrolling (editor and preview scroll together).
* **🖼️ robust Image Handling:**
    * Paste screenshots directly (Ctrl+V) to insert them.
    * Auto-fixes broken Unsplash links.
    * Optimizes image sizes to fit A4 paper constraints.
* **🛠️ Formatting Toolbar:** One-click formatting for Bold, Italic, Headings, Links, and more.
* **📊 Live Stats:** Real-time Word and Character count.
* **🔒 Privacy First:** Everything runs locally in your browser. No data is sent to a server.

---

## 🛠️ Tech Stack

This project was built using the modern web stack:

* **Core:** [React](https://react.dev/) (v18) + [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + `@tailwindcss/typography`
* **Logic:**
    * `react-markdown`: For safe and fast markdown rendering.
    * `html2pdf.js`: For canvas-based PDF generation.
* **Icons:** [Lucide React](https://lucide.dev/)

---

## 🏁 Getting Started

To run this project locally, follow these simple steps.

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/prodXCE/markdef.git
    cd markdef
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```

3.  **Start the server**
    ```sh
    npm run dev
    ```

4.  Open your browser to `http://localhost:5173`

---

## 📖 Usage

1.  **Write:** Type Markdown in the left pane. You can use standard syntax (`#`, `**`, `-`).
2.  **Format:** Use the toolbar at the top to insert syntax quickly.
3.  **Images:** Click the Image icon to insert a URL, or simply **paste an image** from your clipboard directly into the editor.
4.  **Name It:** Change the filename in the top-left input field.
5.  **Export:** Click the **Download** button in the sidebar to generate a clean PDF.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## ☕ Support

If this project saved you time or helped you write a great document, consider buying me a coffee!

<a href="https://www.buymeacoffee.com/prodXCE">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="180" />
</a>
