const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'Students become more organized and powerful programmers by learning to research and call functions written by others and to write, debug, and test their own.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'This course introduces the notion of classes and objects. It presents encapsulation and also works with inheritance and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'Students learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description:
            'Students focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const list = document.getElementById('course-list');
const totalSpan = document.getElementById('credit-total');
const filterButtons = document.querySelectorAll('.chip');

function render(filter) {
    if (!list || !totalSpan) return;
    list.innerHTML = '';
    const filtered = courses.filter(c =>
        filter === 'All' || !filter ? true : c.subject === filter
    );
    let total = 0;
    filtered.forEach(c => {
        total += c.credits;
        const card = document.createElement('div');
        card.className = 'course-card';
        const left = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = `${c.subject} ${c.number}`;
        const subtitle = document.createElement('div');
        subtitle.textContent = c.title;
        subtitle.style.opacity = '0.85';
        subtitle.style.fontSize = '.95rem';
        left.appendChild(strong);
        left.appendChild(subtitle);
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = c.subject;
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