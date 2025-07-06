
document.querySelectorAll('.sidebar nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.sidebar nav a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    localStorage.setItem('activeLink', link.textContent);
  });
});
if(localStorage.getItem('activeLink')) {
  document.querySelectorAll('.sidebar nav a').forEach(l => {
    if(l.textContent == localStorage.getItem('activeLink')) l.classList.add('active');
  });
}
document.querySelectorAll('.game img').forEach(game => {
  game.addEventListener('click', () => {
    let overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.textContent = 'Loading game...';
    Object.assign(overlay.style, {
      position: 'fixed', top:0, left:0, right:0, bottom:0,
      background:'rgba(0,0,0,0.8)', color:'#fff', fontSize:'24px',
      display:'flex', alignItems:'center', justifyContent:'center',
      zIndex:9999
    });
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1500);
  });
});
document.addEventListener('keydown', e => {
  if(e.key === 'L' || e.key === 'l'){
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  }
});
if(localStorage.getItem('theme') === 'dark'){
  document.body.classList.add('dark');
}
