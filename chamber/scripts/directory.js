async function loadMembers() {
    try {
        const response = await fetch('./data/members.json');
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error loading member data:', error);
    }
}

function displayMembers(members) {
    const container = document.querySelector('#directoryList');
    const template = document.querySelector('#cardTemplate');
    container.innerHTML = '';
    members.forEach(member => {
        const card = template.content.cloneNode(true);
        const img = card.querySelector('.card-logo');
        const title = card.querySelector('.card-title');
        const meta = card.querySelector('.card-meta');
        const contact = card.querySelector('.card-contact');
        const link = card.querySelector('.card-link');
        const badge = card.querySelector('.badge');
        img.src = `./images/${member.image}`;
        img.alt = `${member.name} logo`;
        title.textContent = member.name;
        meta.textContent = `${member.category} • Founded ${member.founded}`;
        contact.textContent = `${member.phone} • ${member.address}`;
        link.href = member.website;
        badge.textContent = member.membership;
        badge.classList.add(member.membership.toLowerCase());
        container.appendChild(card);
    });
}

const gridBtn = document.querySelector('#gridBtn');
const listBtn = document.querySelector('#listBtn');
const container = document.querySelector('#directoryList');

gridBtn.addEventListener('click', () => {
    container.classList.add('grid');
    container.classList.remove('list');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list');
    container.classList.remove('grid');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

document.querySelector('#categoryFilter').addEventListener('change', filterMembers);
document.querySelector('#levelFilter').addEventListener('change', filterMembers);

async function filterMembers() {
    const category = document.querySelector('#categoryFilter').value;
    const level = document.querySelector('#levelFilter').value;
    try {
        const response = await fetch('./data/members.json');
        const data = await response.json();
        let filtered = data;
        if (category) filtered = filtered.filter(m => m.category === category);
        if (level) filtered = filtered.filter(m => m.level == level);
        displayMembers(filtered);
    } catch (error) {
        console.error('Error filtering members:', error);
    }
}

const year = document.getElementById('year');
const lastmod = document.getElementById('lastmod');
if (year && lastmod) {
    const d = new Date(document.lastModified);
    year.textContent = new Date().getFullYear();
    lastmod.textContent = d.toLocaleString();
    lastmod.setAttribute('datetime', d.toISOString());
}

document.addEventListener('DOMContentLoaded', loadMembers);