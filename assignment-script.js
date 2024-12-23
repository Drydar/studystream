document.getElementById('uploadForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const message = document.getElementById('message').value.trim();
  const phoneNumber = '2348146294783'; // Replace with your WhatsApp number (e.g., '1234567890').

  if (fileInput.files.length === 0) {
    alert('Please select a file.');
    return;
  }

  const file = fileInput.files[0];
  const allowedExtensions = ['jpeg', 'png', 'pdf', 'doc', 'jpg'];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    alert('Invalid file format. Only JPEG, JPG, PNG, PDF, and DOC files are allowed.');
    return;
  }

  const fileName = file.name;
  const encodedMessage = encodeURIComponent(
    `File: ${fileName}\nMessage: ${message}`
  );

  const whatsappUrl = `https://wa.me/message/7P726ES2BNC3P1?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
});