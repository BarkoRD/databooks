const balance = document.getElementById('balance');

if (balance.textContent.includes('-')) {
  balance.classList.add('red')
} else {
  balance.classList.add('green')
}

