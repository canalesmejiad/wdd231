const y = document.getElementById('currentyear');
if (y) y.textContent = new Date().getFullYear();
const lm = document.getElementById('lastModified');
if (lm) lm.textContent = document.lastModified;