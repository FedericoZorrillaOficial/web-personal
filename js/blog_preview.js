
function publicarResumen(list){
  
  
  const contendPreview = document.getElementById("blog_preview");
  
  
  let respuesta = "";
  
  for(let f = 1; f<list.length; f++){
    
    if(f >= 7){break;}
    
    
    fetch("blog/" + list[f].dir)
    .then(response => response.json())
    .then(data => {
      
      respuesta += `
       
        <article class="post_card">
          
          <h3 class="post_titulo">
            <a href="blog?pg=${data.id}">
              ${data.titulo}
              
            </a>
          </h3>
          
          <p class="post_fecha">
            ${data.fecha}
          </p>
          
          <p class="post_resumen">
            ${data.resumen}
          </p>
          
        </article>
      `;
      
      
      contendPreview.innerHTML = respuesta;
      
    })
    
  }
  
}




function getPostList(){
  
  fetch("blog/data/publicaciones.json")
  .then(response => response.json())
  .then(data => {
    
    publicarResumen(data);
    
  })
  
}


getPostList();
