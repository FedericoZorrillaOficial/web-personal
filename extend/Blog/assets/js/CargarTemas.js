
  
  function inyectar(publicacion, contenedor){
    
    
    const contenido = `
    
    <h3>
      ${publicacion.titulo}
    </h3>
    
    <p>
      <em class="fecha">
        ${publicacion.fecha}
      </em>
    </p>
    
    
    <div class="etiquetas">
      
      ${publicacion.etiquetas.map(et => `<span> ${et} </span>`).join(" ")}
      
    </div>
    
    
    
    <p class="entrada-preview">
      
      <a class="linck" href="entrada.html?id=${publicacion.id}">
        ${publicacion.resumen}
      </a>
     
    </p>
    
    `;
    
    
    
    
    contenedor.insertAdjacentHTML("beforeend", contenido);
    
    
  }
  
  
  
  
  function cargarRecusos(){
    
    
   
    fetch("data/publicaciones.json")
    .then((res) => res.json())
    .then((data) => {
      
      
      const contenedor = document.querySelector("#EntradaContainer");
      
      
      contenedor.innerHTML = "<section><h2>Algunos temas</h2></section>";
      
      
      data.reverse().forEach((publicaciones) => {
        
      
        inyectar(publicaciones, contenedor);
        
        
      });
      
    });
    
  }
  
  
  
  
  
  window.addEventListener("load", cargarRecusos, false);
  