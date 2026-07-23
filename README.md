## 💻 1. Local System Installation Setup

Follow these exact steps to pull the repository and spin up your local environment:

### 1. Clone the project from our repository destination
```bash
git clone https://github.com/FaroukZakaria/SEF_ACADEMY-Internship_G4
```
### 2. Navigate inside the React project workspace folder
```bash
cd SEF_ACADEMY-Internship_G4
```

### 3. Download and install team packages (React Router, etc.)
```bash
npm install
```

### 4. Launch your local high-speed Vite development server
```bash
npm run dev
```

## 🎨 2. Global Amazon Theme Utility Tokens

We are using **Tailwind CSS v4** design configurations. Do not hardcode custom hex colors in your components. Instead, apply these standardized brand tokens using standard Tailwind prefixes (`bg-`, `text-`, `border-`):

*   `bg-amazon-navy` / `text-amazon-navy` (`#131921`) — Primary headers and dark backgrounds
*   `bg-amazon-lightNavy` (`#232f3e`) — Secondary navbars, sidebars, and sub-menus
*   `bg-amazon-orange` / `hover:bg-amazon-orangeHover` (`#ff9900` / `#e68a00`) — Call-to-actions, buttons, and active markers
*   `bg-amazon-bg` (`#eaeded`) — Primary page canvas backdrop
*   `bg-amazon-surface` (`#ffffff`) — Content boxes, data cards, list elements, and login panels
*   `border-amazon-border` (`#d5dbdb`) — Layout division lines and column borders
*   `text-amazon-textDark` (`#0f1111`) — Core bold body typography and metrics numbers
*   `text-amazon-textLight` (`#565959`) — Secondary muted text, labels, and metadata timestamps

---

## 🔀 3. Git Coordination Workflow (No Merge Conflicts!)

To ensure your code integrates smoothly with the rest of the team without breaking anything, follow these 3 basic Git safety commands:

1.  **Never code on the `main` branch**. Create your own feature branch before coding:
    ```bash
    git checkout -b feature/your-assigned-task
    ```
2.  Commit your updates to your branch and push it to GitHub:
    ```bash
    git add .
    git commit -m "feat: explain what you completed in your task"
    git push origin feature/your-assigned-task
    ```
3.  Go to the GitHub repository page in your browser and click **"New Pull Request"** to merge your branch into `main`. The team lead will review it and merge it instantly!
