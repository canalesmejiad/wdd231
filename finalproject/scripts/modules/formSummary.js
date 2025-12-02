export function initFormSummary() {
    const list = document.querySelector('#form-summary');
    if (!list) return;

    const params = new URLSearchParams(window.location.search);

    const entries = [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Service type', key: 'serviceType' },
        { label: 'Message', key: 'message' }
    ];

    list.innerHTML = '';

    entries.forEach((item) => {
        const value = params.get(item.key);
        if (value) {
            const li = document.createElement('li');
            li.innerHTML = '<span class="summary-label">' + item.label + ':</span> ' + value;
            list.appendChild(li);
        }
    });
}