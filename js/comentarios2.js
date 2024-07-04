fetch('https://ajudapratodos.000webhostapp.com/comentariostext/carrega_comentarios.php', {headers: {"x-test": "algum valor"}})
.then(res => res.json())
.then(res => document.getElementById('comentarios').textContent = res.text)
.catch(error => document.getElementById('comentarios').textContent = error.message);
