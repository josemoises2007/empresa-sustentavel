document.addEventListener('DOMContentLoaded', () => {
            fetch('https://ajudapratodos.000webhostapp.com/missoes/fetch_uploads.php')
                .then(response => response.json())
                .then(data => {
                    const uploads = document.getElementById('uploads');
                    const groups = {};

                    if (!Array.isArray(data.files)) {
                        throw new Error('Dados inválidos recebidos do servidor.');
                    }

                    data.files.forEach(file => {
                        if (!file.file_type) {
                            console.error('file_type não definido para', file);
                            return;
                        }

                        const author = file.author;
                        const title = file.title;
                        const key = `${author}-${title}`;

                        if (!groups[key]) {
                            groups[key] = {
                                author,
                                title,
                                elements: []
                            };
                        }

                        groups[key].elements.push(file);
                    });

                    Object.values(groups).forEach(group => {
                        const container = document.createElement('div');
                        container.className = 'document-group';

                        let fileElements = '<div class="document-content">';

                        group.elements.forEach(element => {
                            if (element.file_type.startsWith('image/')) {
                                fileElements += `
                                    <div class="media">
                                        <img src="https://ajudapratodos.000webhostapp.com/missoes/uploaded_files/${element.file_name}" alt="${element.file_name}">
                                        <div class="file-info">
                                            <a href="https://ajudapratodos.000webhostapp.com/missoes/uploaded_files/${element.file_name}" target="_blank">${element.file_name}</a>
                                        </div>
                                    </div>
                                `;
                            } else if (element.file_type === 'application/pdf') {
                                fileElements += `
                                    <div class="media">
                                        <object data="https://ajudapratodos.000webhostapp.com/missoes/uploaded_files/${element.file_name}" ></object>
                                        <div class="file-info">
                                            <a href="https://ajudapratodos.000webhostapp.com/missoes/uploaded_files/${element.file_name}" target="_blank">${element.file_name}</a>
                                        </div>
                                    </div>
                                `;
                            } else if (element.file_type.startsWith('video/')) {
                                fileElements += `
                                    <div class="media">
                                        <video src="https://ajudapratodos.000webhostapp.com/missoes/uploaded_files/${element.file_name}" controls></video>
                                        <div class="file-info">
                                            <a href="https://ajudapratodos.000webhostapp.com/missoes/uploaded_files/${element.file_name}" target="_blank">${element.file_name}</a>
                                        </div>
                                    </div>
                                `;
                            }
                        });

                        fileElements += '</div>';

                        container.innerHTML = `
                            <div class="group-info">
                                <h3>${group.author}</h3>
                                <h4>${group.title}</h4>
                                ${fileElements}
                            </div>
                        `;

                        uploads.appendChild(container);
                    });
                })
                .catch(error => console.error('Erro:', error));
        });

        function uploadFiles() {
            const form = document.getElementById('uploadForm');
            const formData = new FormData(form);

            fetch('https://ajudapratodos.000webhostapp.com/missoes/upload.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Sucesso:', data);
                    alert(data.message);
                    location.reload(); // Recarregar a página para ver os novos arquivos
                })
                .catch(error => console.error('Erro:', error));
        }
