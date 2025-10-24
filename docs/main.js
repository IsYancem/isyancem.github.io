// ====== Año dinámico ======
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// ====== Toggle de tema (oscuro/claro en grises) ======
const root = document.documentElement;
const btn = document.getElementById('themeToggle');
const label = document.getElementById('themeLabel');
const THEME_KEY = 'pref-theme-gray';


function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    if (label) label.textContent = mode === 'dark' ? 'Oscuro' : 'Claro';
    try { localStorage.setItem(THEME_KEY, mode); } catch (_) { }
}


(function initTheme() {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'light' || saved === 'dark') return setTheme(saved);
    } catch (_) { }
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
})();


if (btn) btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});


// ====== Copiar email ======
const copyBtn = document.getElementById('copyEmail');
const emailLabel = document.getElementById('emailLabel');
if (copyBtn && emailLabel) {
    const emailText = emailLabel.textContent.trim();
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(emailText);
            const prev = copyBtn.innerHTML;
            copyBtn.innerHTML = 'Copiado ✓';
            setTimeout(() => copyBtn.innerHTML = prev, 1200);
        } catch (_) { }
    });
}