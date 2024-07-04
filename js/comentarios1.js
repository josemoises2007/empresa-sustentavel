document.addEventListener('DOMContentLoaded', function () {
    const addFotoCheckbox = document.getElementById('addFoto');
    const fotoContainer = document.getElementById('fotoContainer');
    const comentariosDiv = document.getElementById('comentarios');

    addFotoCheckbox.addEventListener('change', function () {
        if (addFotoCheckbox.checked) {
            fotoContainer.style.display = 'block';
        } else {
            fotoContainer.style.display = 'none';
        }
    });

    fetch('https://ajudapratodos.000webhostapp.com/comentariostext/carrega_comentarios.php')
        .then(response => response.json())
        .then(comentarios => {
            comentarios.forEach(comentario => {
                const comentarioDiv = document.createElement('div');
                comentarioDiv.classList.add('comentario');

                const nome = document.createElement('h3');
                nome.textContent = comentario.nome;

                const texto = document.createElement('p');
                texto.textContent = comentario.comentario;

                comentarioDiv.appendChild(nome);
                comentarioDiv.appendChild(texto);

                if (comentario.foto) {
                    const foto = document.createElement('img');
                    foto.src = 'https://ajudapratodos.000webhostapp.com/comentariostext/' + comentario.foto;
                    comentarioDiv.appendChild(foto);
                }

                comentariosDiv.appendChild(comentarioDiv);
            });
        });
});
