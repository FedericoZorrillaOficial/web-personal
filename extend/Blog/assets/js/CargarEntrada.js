const params = new URLSearchParams(window.location.search);
const entradaId = params.get('id');

fetch('data/publicaciones.json')
  .then(response => response.json())
  .then(data => {
    const entrada = data.find(e => e.id === entradaId);
    if (!entrada) {
      document.getElementById("EntradaContainer").innerHTML = "<h2>Entrada no encontrada</h2>";
      return;
    }

    document.getElementById("titulo").textContent = entrada.titulo;
    document.getElementById("fecha").textContent = entrada.fecha;
    document.getElementById("etiquetas").innerHTML = entrada.etiquetas.map(et => `<span>${et}</span>`).join(" ");

    // Cargar el archivo HTML real con fetch
    fetch(entrada.archivo)
      .then(res => res.text())
      .then(html => {
        document.getElementById("contenido").innerHTML = html;
      })
      .catch(() => {
        document.getElementById("contenido").innerHTML = "<p>No se pudo cargar el contenido.</p>";
      });
  });