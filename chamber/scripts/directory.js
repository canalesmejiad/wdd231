async function loadMembers() {
    try {
        const res = await fetch('./data/members.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        displayMembers(data);
    } catch (e) {
        console.error('Error loading member data:', e);
        displayMembers([]);
    }
}

function displayMembers(members) {
    const container = document.querySelector('#directoryList');
    const template = document.querySelector('#cardTemplate');
    if (!container || !template) return;

    container.innerHTML = '';
    if (!Array.isArray(members) || members.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No businesses to display.';
        empty.style.opacity = '0.7';
        container.appendChild(empty);
        return;
    }

    members.forEach(m => {
        const card = template.content.cloneNode(true);
        const img = card.querySelector('.card-logo');
        const title = card.querySelector('.card-title');
        const meta = card.querySelector('.card-meta');
        const contact = card.querySelector('.card-contact');
        const link = card.querySelector('.card-link');
        const badge = card.querySelector('.badge');

        const name = m.name || '';
        const category = m.category || '';
        const founded = m.founded || '';
        const phone = m.phone || '';
        const address = m.address || '';
        const website = m.website || '#';
        const membership = m.membership || m.membershipLevel || 'Member';
        const imgField = m.image || m.logo || '';
        const src = imgField.startsWith('./') ? imgField : (imgField ? `./images/${imgField}` : '');

        img.src = src || './images/placeholder-logo.png';
        img.alt = `${name} logo`;
        img.onerror = () => { img.src = './images/placeholder-logo.png'; };

        title.textContent = name;
        meta.textContent = `${category} • Founded ${founded}`;
        contact.textContent = `${phone} • ${address}`;
        link.href = website;
        badge.textContent = membership;
        badge.classList.add(String(membership).toLowerCase());

        container.appendChild(card);
    });
}

function bindUI() {
    const gridBtn = document.querySelector('#gridBtn');
    const listBtn = document.querySelector('#listBtn');
    const list = document.querySelector('#directoryList');
    const categorySel = document.querySelector('#categoryFilter');
    const levelSel = document.querySelector('#levelFilter');

    if (gridBtn && listBtn && list) {
        gridBtn.addEventListener('click', () => {
            list.classList.add('grid');
            list.classList.remove('list');
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
        });

        listBtn.addEventListener('click', () => {
            list.classList.add('list');
            list.classList.remove('grid');
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
        });
    }

    async function applyFilters() {
        try {
            const res = await fetch('./data/members.json', { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            let data = await res.json();
            const cat = (categorySel?.value || '').toLowerCase();
            const lvl = levelSel?.value || '';

            if (cat) data = data.filter(m => (m.category || '').toLowerCase() === cat);
            if (lvl) data = data.filter(m => String(m.level) === String(lvl));

            displayMembers(data);
        } catch (e) {
            console.error('Error filtering members:', e);
        }
    }

    categorySel?.addEventListener('change', applyFilters);
    levelSel?.addEventListener('change', applyFilters);
}

function updateFooterDates() {
    const year = document.getElementById('year');
    const lastmod = document.getElementById('lastmod');
    if (year && lastmod) {
        const d = new Date(document.lastModified);
        year.textContent = new Date().getFullYear();
        lastmod.textContent = d.toLocaleString();
        lastmod.setAttribute('datetime', d.toISOString());
    }
}

function init() {
    bindUI();
    updateFooterDates();
    loadMembers();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}