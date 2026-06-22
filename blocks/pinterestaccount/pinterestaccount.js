export default function decorate(block) {
  const buttons = block.querySelectorAll('p');

  if (buttons[0]) {
    buttons[0].classList.add('join-btn');
    buttons[0].addEventListener('click', () => {
      window.location.href = '/signup';
    });
  }

  if (buttons[1]) {
    buttons[1].classList.add('login-btn');
    buttons[1].addEventListener('click', () => {
      window.location.href = '/login';
    });
  }
}
document.querySelector('.join-btn')?.addEventListener('click', () => {
  window.location.href = '/signup';
});

document.querySelector('.login-btn')?.addEventListener('click', () => {
  window.location.href = '/login';
});