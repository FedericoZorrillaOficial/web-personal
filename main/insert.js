  
  function insertar(title, img){
    
    
    let CajaProyectos = document.querySelector(".CajaProyectos");
    
    
    
    for (let i = 0; i < img.length; i++) {
      
      
      
      CajaProyectos.insertAdjacentHTML("afterbegin", `
        
        <article class="Panel BigPanel">
          
          <div class = "PSuperior">
            
            <h4>`
              + title[i] +
            `</h4>
            
          </div>
          
          
          <div class = "PMedio">
            
            <img 
              src="`+img[i]+`" 
              alt="imagen de proyecto"
            />
            
          </div>
          
          
          <div class = "PInferior">
            
            <input type="button" value ="Ver más..." onClick="irA('extend/Proyectos')"/>
            
          </div>
          
        </article>
        
        
      `)
      
    }
    
  }
  
  
  
  
  fetch("main/proyectos.json")
  .then(respuesta => respuesta.json())
  .then(data => {
    
    insertar(data.title, data.img)
    
  });
  
