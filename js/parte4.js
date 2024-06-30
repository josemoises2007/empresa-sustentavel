function toggleFullScreen() {
  const pdfContainer = document.getElementById('pdfContainer');
  pdfContainer.classList.toggle('active');
  
  const toggleBtn = document.querySelector('.toggle-btn');
  toggleBtn.style.display = pdfContainer.classList.contains('active') ? 'block' : 'none';
  toggleBtn.style.display = pdfContainer.classList.contains('active') ? 'transition' : 'all 0.2 ease';
}

function showPreview(index) {
  const pdfItems = document.querySelectorAll('.pdf-item');
  
  // Oculta todos los elementos PDF
  pdfItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Muestra el PDF seleccionado
  const pdfItem = document.getElementById(`pdfItem${index}`);
  pdfItem.classList.add('active');
  
  // Muestra el contenedor y el botón de pantalla completa
  const pdfContainer = document.getElementById('pdfContainer');
  pdfContainer.classList.add('active');
  
  const toggleBtn = document.querySelector('.toggle-btn');
  toggleBtn.style.display = 'block';
}
