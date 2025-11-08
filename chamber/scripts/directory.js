const els = {
    container: document.getElementById('directoryList'),
    gridBtn: document.getElementById('gridBtn'),
    listBtn: document.getElementById('listBtn'),
    q: document.getElementById('q'),
    category: document.getElementById('categoryFilter'),
    level: document.getElementById('levelFilter'),
    template: document.getElementById('cardTemplate')
};

async function getMembers() {
    try {
        const res = await fetch('./data/members.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error('Error loading members.json', e);
        return [];
    }
}

function createCard(m) {
    const node = els.template.content.cloneNode(true);
    const logo = node.querySelector('.card-logo');
    const title = node.querySelector('.card-title');
    const meta = node.querySelector('.card-meta');
    const contact = node.querySelector('.card-contact');
    const link = node.querySelector('.card-link');
    const badge = node.querySelector('.badge');

    logo.src = m.logo || './images/placeholder-logo.png';
    logo.alt = `${m.name} logo`;
    logo.onerror = () => { logo.src = './images/placeholder-logo.png'; };

    title.textContent = m.name;
    meta.textContent = `${m.category} • Founded ${m.founded || '—'}`;
    contact.textContent = `${m.phone} • ${m.address}`;
    link.href = m.website;
    badge.textContent = m.membershipLevel || (m.level === 3 ? 'Gold' : m.level === 2 ? 'Silver' : 'Member');
    badge.classList.add((m.membershipLevel || (m.level === 3 ? 'Gold' : m.level === 2 ? 'Silver' : 'Member')).toLowerCase());

    return node;
}

function render(list) {
    els.container.innerHTML = '';
    const frag = document.createDocumentFragment();
    list.forEach(m => frag.appendChild(createCard(m)));
    els.container.appendChild(frag);
}

function filterMembers(all) {
    const q = els.q.value.trim().toLowerCase();
    const cat = els.category.value;
    const level = els.level.value;

    return all.filter(m => {
        const matchQ = !q || m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q);
        const matchCat = !cat || m.category === cat;

        const memberLevelNum = typeof m.level === 'number' ? String(m.level) : '';
        const memberLevelText = (m.membershipLevel || '').toLowerCase();
        const desiredText = level === '3' ? 'gold' : level === '2' ? 'silver' : level === '1' ? 'member' : '';

        const matchLevel =
            !level ||
            memberLevelNum === level ||
            memberLevelText === desiredText;

        return matchQ && matchCat && matchLevel;
    });
}

function setupViewToggle() {
    els.gridBtn.addEventListener('click', () => {
        els.container.classList.add('grid');
        els.container.classList.remove('list');
        els.gridBtn.classList.add('active');
        els.listBtn.classList.remove('active');
    });

    els.listBtn.addEventListener('click', () => {
        els.container.classList.add('list');
        els.container.classList.remove('grid');
        els.listBtn.classList.add('active');
        els.gridBtn.classList.remove('active');
    });
}

async function init() {
    const members = await getMembers();
    render(members);
    els.q.addEventListener('input', () => render(filterMembers(members)));
    els.category.addEventListener('change', () => render(filterMembers(members)));
    els.level.addEventListener('change', () => render(filterMembers(members)));
    setupViewToggle();
}

init();