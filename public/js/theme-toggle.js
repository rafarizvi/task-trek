const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('theme-dark');
  if (body.classList.contains('theme-dark')) {
    themeToggle.textContent = 'Light Theme';
  } else {
    themeToggle.textContent = 'Dark Theme';
  }
});
