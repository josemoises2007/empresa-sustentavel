document.addEventListener('DOMContentLoaded', function () {
    const addFotoCheckbox = document.getElementById('addFoto');
    const fotoContainer = document.getElementById('fotoContainer');

    addFotoCheckbox.addEventListener('change', function () {
        if (addFotoCheckbox.checked) {
            fotoContainer.style.display = 'block';
        } else {
            fotoContainer.style.display = 'none';
        }
    });
});
