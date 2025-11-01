const courses = [
    { code: 'WDD 130', title: 'Web Fundamentals', area: 'WDD', credits: 3 },
    { code: 'WDD 131', title: 'Dynamic Web Fundamentals', area: 'WDD', credits: 3 },
    { code: 'WDD 231', title: 'Web Frontend Development I', area: 'WDD', credits: 3 },
    { code: 'CSE 110', title: 'Intro to Programming', area: 'CSE', credits: 2 },
    { code: 'CSE 111', title: 'Programming with Functions', area: 'CSE', credits: 2 }
];

const list = document.getElementById('course-list');
const totalSpan = document.getElementById('credit-total');
const filterButtons = document.querySelectorAll('.chip');

function render(filter) {
    if (!list || !totalSpan) return;
    list.innerHTML = '';
    const items = courses.filter(c => !filter || filter === 'All' ? true : c.area === filter);
    let total = 0;
    items.forEach(c => {
        total += c.credits;
        const card = document.createElement('div');
        card.className = 'course-card';
        const left = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = c.code;
        const subtitle = document.createElement('div');
        subtitle.textContent = c.title;
        subtitle.style.opacity = '0.8';
        subtitle.style.fontSize = '.95rem';
        left.appendChild(strong);
        left.appendChild(subtitle);
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = c.area;
        card.appendChild(left);
        card.appendChild(tag);
        list.appendChild(card);
    });
    totalSpan.textContent = `The total credits for courses listed above is ${total}`;
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render(btn.dataset.filter || 'All');
    });
});

render('All');