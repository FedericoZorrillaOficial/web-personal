
  document.getElementById('cantactar').addEventListener('submit', function (e) {
    
    
    e.preventDefault(); // Evita que el formulario se envíe realmente
    
    const email = document.getElementById('email').value;
    
    const mensaje = document.getElementById('mensaje').value + "\n \n direccion de reenvío: " + email;
    
    const nombre = document.getElementById('nombre').value;
    
    
    const asunto = "Mensage desde portafolio de: " + nombre;
    
    const destinatario = "federicozorrillaoficial@gmail.com";
    
    const body = encodeURIComponent(mensaje);
    
    const subject = encodeURIComponent(asunto);
    
    const mailtoLink = `mailto:${destinatario}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    
  });