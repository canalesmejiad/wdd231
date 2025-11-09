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
    const res = await fetch('./data/members.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
}

function render(members) {
    const list = document.querySelector('#directoryList');
    const tpl = document.querySelector('#cardTemplate');
    list.innerHTML = '';

    members.forEach(m => {
        const node = tpl.content.cloneNode(true);
        node.querySelector('.card-logo').src = `./images/${m.image}`;
        node.querySelector('.card-logo').alt = `${m.name} logo`;
        node.querySelector('.card-title').textContent = m.name;
        node.querySelector('.card-meta').textContent = `${m.category} • Founded ${m.founded}`;
        node.querySelector('.card-contact').textContent = `${m.phone} • ${m.address}`;
        const a = node.querySelector('.card-link');
        a.href = m.website;
        const badge = node.querySelector('.badge');
        badge.textContent = m.membership;
        badge.classList.add(m.membership.toLowerCase());
        list.appendChild(node);
    });
}

function bindUI(data) {
    const list = document.querySelector('#directoryList');
    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');
    const category = document.getElementById('categoryFilter');
    const level = document.getElementById('levelFilter');

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

    function applyFilters() {
        let filtered = [...data];
        if (category.value) {
            filtered = filtered.filter(m => m.category === category.value);
        }
        if (level.value) {
            filtered = filtered.filter(m => String(m.level) === level.value);
        }
        render(filtered);
    }

    category.addEventListener('change', applyFilters);
    level.addEventListener('change', applyFilters);
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