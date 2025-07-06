
document.querySelectorAll('.sidebar nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.sidebar nav a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
document.querySelector('.upgrade').addEventListener('click', () => {
  alert('Redirecting to upgrade page...');
});
document.querySelectorAll('.bottom-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    if(link.textContent.includes('Logout')){
      if(confirm('Are you sure you want to logout?')) alert('Logged out!');
    } else if(link.textContent.includes('Settings')){
      alert('Opening settings...');
    } else {
      alert(`Opening ${link.textContent}...`);
    }
  });
});
document.querySelectorAll('.sidebar nav a').forEach(link => {
  link.setAttribute('title', `Go to ${link.textContent}`);
});
document.querySelectorAll('.game').forEach(game => {
  game.addEventListener('click', () => {
    let overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.textContent = 'Loading game...';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1500);
  });
});
if(localStorage.getItem('theme') === 'dark'){
  document.body.classList.add('dark');
}
document.addEventListener('keydown', e => {
  if(e.key === 'L' || e.key === 'l'){
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  }
});
