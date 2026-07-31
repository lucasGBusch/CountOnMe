document.addEventListener('DOMContentLoaded', () => {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');

  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  if (!tabLogin || !tabRegister) return;

  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');

    formLogin.classList.remove('hidden');
    formRegister.classList.add('hidden');
  });

  tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');

    formRegister.classList.remove('hidden');
    formLogin.classList.add('hidden');
  });

   formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    sessionStorage.setItem('countonme_auth', 'true');
    window.location.href = 'dashboard.html';
  });

  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    sessionStorage.setItem('countonme_auth', 'true');
    window.location.href = 'dashboard.html';
  });
});