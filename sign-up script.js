document.getElementById("submitBtn").addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  if (name && email && phone && message) {
    const whatsappURL = `https://wa.me/message/7P726ES2BNC3P1?text=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    )}`;
    window.open(whatsappURL, "_blank");
  } else {
    alert("Please fill in all fields.");
  }
});