// directory.js
// Load and render business data from members.json

const els = {
    container: document.getElementById('directory'),
    gridBtn: document.getElementById('gridBtn'),
    listBtn: document.getElementById('listBtn'),
    q: document.getElementById('q'),
    category: document.getElementById('categoryFilter'),
    level: document.getElementById('levelFilter'),
    template: document.getElementById('cardTemplate')
};

// Fetch the JSON data
async function getMembers() {
    const response = await fetch('./data/members.json');
    if (!response.ok) {
        console.error('Error loading members.json');
        return [];
    }
    const data = await response.json();
    return data;
}

// Build each card from the template
function createCard(member) {
    const node = els.template.content.cloneNode(true);
    const logo = node.querySelector('.card-logo');
    const title = node.querySelector('.card-title');
    const meta = node.querySelector('.card-meta');
    const contact = node.querySelector('.card-contact');
    const link = node.querySelector('.card-link');
    const badge = node.querySelector('.badge');

    logo.src = member.logo || './images/placeholder-logo.png';
    logo.alt = `${member.name} logo`;
    title.textContent = member.name;
    meta.textContent = `${member.category} • Founded ${member.founded}`;
    contact.textContent = `${member.phone} • ${member.address}`;
    link.href = member.website;
    badge.textContent = member.membershipLevel || '';
    badge.classList.add(member.membershipLevel?.toLowerCase() || 'member');

    return node;
}

// Render filtered list
function render(members) {
    els.container.innerHTML = '';
    members.forEach(m => els.container.appendChild(createCard(m)));
}

// Filter and search logic
function filterMembers(all) {
    const query = els.q.value.toLowerCase();
    const cat = els.category.value;
    const level = els.level.value;

    return all.filter(m => {
        const matchesQuery =
            m.name.toLowerCase().includes(query) ||
            m.category.toLowerCase().includes(query);

        const matchesCat = !cat || m.category === cat;
        const matchesLevel = !level || String(m.membershipLevel) === level;

        return matchesQuery && matchesCat && matchesLevel;
    });
}

// View toggle
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

// Initialize directory
async function init() {
    const members = await getMembers();
    render(members);

    // Event listeners for filters/search
    els.q.addEventListener('input', () => render(filterMembers(members)));
    els.category.addEventListener('change', () => render(filterMembers(members)));
    els.level.addEventListener('change', () => render(filterMembers(members)));

    setupViewToggle();
}

init();