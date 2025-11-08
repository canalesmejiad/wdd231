const DATA_URL = './data/members.json';

const state = {
    members: [],
    view: 'grid',
    q: '',
    category: '',
    level: ''
};

const els = {
    container: document.getElementById('directory'),
    gridBtn: document.getElementById('gridBtn'),
    listBtn: document.getElementById('listBtn'),
    q: document.getElementById('q'),
    category: document.getElementById('categoryFilter'),
    level: document.getElementById('levelFilter'),
    template: document.getElementById('cardTemplate')
};

init();

async function init() {
    wireEvents();
    await loadData();
    setView('grid');
    render();
}

function wireEvents() {
    els.gridBtn.addEventListener('click', () => setView('grid'));
    els.listBtn.addEventListener('click', () => setView('list'));
    els.q.addEventListener('input', e => { state.q = e.target.value.trim().toLowerCase(); render(); });
    els.category.addEventListener('change', e => { state.category = e.target.value; render(); });
    els.level.addEventListener('change', e => { state.level = e.target.value; render(); });
}

function setView(view) {
    state.view = view;
    els.gridBtn.classList.toggle('active', view === 'grid');
    els.listBtn.classList.toggle('active', view === 'list');
    els.gridBtn.setAttribute('aria-pressed', view === 'grid');
    els.listBtn.setAttribute('aria-pressed', view === 'list');
    els.container.classList.toggle('grid', view === 'grid');
    els.container.classList.toggle('list', view === 'list');
}

async function loadData() {
    try {
        const res = await fetch(DATA_URL);
        state.members = await res.json();
    } catch (err) {
        console.error('Error loading members:', err);
        state.members = [];
    }
}

function render() {
    const filtered = state.members.filter(m => {
        const matchQ = !state.q ||
            m.name.toLowerCase().includes(state.q) ||
            (m.category?.toLowerCase().includes(state.q));
        const matchCat = !state.category || m.category === state.category;
        const matchLevel = !state.level || m.membershipLevel === state.level;
        return matchQ && matchCat && matchLevel;
    });

    els.container.innerHTML = '';
    const frag = document.createDocumentFragment();
    filtered.forEach(m => frag.appendChild(cardFor(m)));
    els.container.appendChild(frag);
}

function cardFor(m) {
    const node = els.template.content.firstElementChild.cloneNode(true);
    const logo = node.querySelector('.card-logo');
    logo.src = m.logo || './images/placeholder-logo.png';
    logo.alt = `${m.name} logo`;
    node.querySelector('.card-title').textContent = m.name;
    node.querySelector('.card-meta').textContent = `${m.category} • Founded ${m.founded || '—'}`;
    node.querySelector('.card-contact').textContent = `${m.phone} • ${m.address}`;
    const link = node.querySelector('.card-link');
    link.href = m.website; link.textContent = 'Website';
    node.querySelector('.badge').textContent = m.membershipLevel || 'Member';
    return node;
}