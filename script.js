function convertToJpg() {
    const imageInput = document.getElementById('imageInput');
    const canvas = document.getElementById('canvas');
    const downloadLink = document.getElementById('downloadLink');

    const file = imageInput.files[0];
    if (!file) {
        alert('Please select a PNG image to convert.');
        return;
    }

    if (!file.type.startsWith('image/png')) {
        alert('Please select a PNG image to convert.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const convertedImage = canvas.toDataURL('image/jpeg', 0.9);
            downloadLink.href = convertedImage;
            downloadLink.download = 'converted_image.jpg';
            downloadLink.style.display = 'block';
            alert('Conversion complete. Click "Download JPG" to save the image.');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}
