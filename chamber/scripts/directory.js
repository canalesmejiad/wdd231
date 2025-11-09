function initFooter() {
    const year = document.getElementById('year');
    const lastmod = document.getElementById('lastmod');
    if (year && lastmod) {
        const d = new Date(document.lastModified);
        year.textContent = new Date().getFullYear();
        lastmod.textContent = d.toLocaleString();
        lastmod.setAttribute('datetime', d.toISOString());
    }
}

async function loadData() {
    const res = await fetch('./data/members.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
}

function render(members) {
    const list = document.querySelector('#directoryList');
    const tpl = document.querySelector('#cardTemplate');
    if (!list || !tpl) return;
    list.innerHTML = '';
    members.forEach(m => {
        const node = tpl.content.cloneNode(true);
        const img = node.querySelector('.card-logo');
        const title = node.querySelector('.card-title');
        const meta = node.querySelector('.card-meta');
        const contact = node.querySelector('.card-contact');
        const a = node.querySelector('.card-link');
        const badge = node.querySelector('.badge');
        const src = `./images/${m.image}`;
        img.src = src;
        img.alt = `${m.name} logo`;
        img.onerror = () => { img.src = './images/placeholder-logo.png'; };
        title.textContent = m.name;
        meta.textContent = `${m.category} • Founded ${m.founded}`;
        contact.textContent = `${m.phone} • ${m.address}`;
        a.href = m.website;
        badge.textContent = m.membership;
        badge.classList.add(String(m.membership).toLowerCase());
        list.appendChild(node);
    });
}

function bindUI(data) {
    const listEl = document.querySelector('#directoryList');
    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');
    const qInput = document.getElementById('q');
    const categorySel = document.getElementById('categoryFilter');
    const levelSel = document.getElementById('levelFilter');
    if (gridBtn && listBtn && listEl) {
        gridBtn.addEventListener('click', () => {
            listEl.classList.add('grid');
            listEl.classList.remove('list');
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
        });
        listBtn.addEventListener('click', () => {
            listEl.classList.add('list');
            listEl.classList.remove('grid');
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
        });
    }
    const state = { q: '', category: '', level: '' };
    function apply() {
        const q = state.q.trim().toLowerCase();
        let filtered = data;
        if (state.category) filtered = filtered.filter(m => (m.category || '') === state.category);
        if (state.level) filtered = filtered.filter(m => String(m.level) === state.level);
        if (q) {
            filtered = filtered.filter(m => {
                const haystack = `${m.name} ${m.category}`.toLowerCase();
                return haystack.includes(q);
            });
        }
        render(filtered);
    }
    function debounce(fn, ms) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), ms);
        };
    }
    const onSearch = debounce(e => {
        state.q = e.target.value || '';
        apply();
    }, 200);
    qInput?.addEventListener('input', onSearch);
    categorySel?.addEventListener('change', () => {
        state.category = categorySel.value || '';
        apply();
    });
    levelSel?.addEventListener('change', () => {
        state.level = levelSel.value || '';
        apply();
    });
    apply();
}

async function main() {
    try {
        initFooter();
        const data = await loadData();
        render(data);
        bindUI(data);
    } catch (err) {
        console.error(err);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}