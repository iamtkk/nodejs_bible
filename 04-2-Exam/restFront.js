document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e.target.username);
});
