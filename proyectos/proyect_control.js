

function getLisst(num){
  
  if(num == 1){
    
  return fetch("proyectos/componentes/compo_list.json")
  .then(response => response.json())
  .then(data => {
    
    return data;
    
  })
  
  }else{
  return fetch("componentes/compo_list.json")
  .then(response => response.json())
  .then(data => {
    
    return data;
    
  })
  }
  
}



function cargarHTML(dir, num){
  
  if(num == 1){
    
  return fetch("proyectos/" + dir)
  .then(response => response.text())
  .then(data => {
    return data;
  })
  
    
  }else{
  return fetch(dir)
  .then(response => response.text())
  .then(data => {
    return data;
  })
  }
  
}



let list = "none";
async function insertarProyectosEn(element, begin, end, num){
 
  
  let respuesta = "";
  
  if (list === "none"){
    
    list = await getLisst(num);
    
    if(end == "all"){
      end = list.length - 1;
    }
    
    
    if(begin <= list.length - 1){
      
      for (let i=begin; i<=end; i++){
        
        respuesta += await cargarHTML(list[i], num);
        
        if(i == list.length-1){
          break;
        }
      }
      
    }
    
  }
  
  
  document.getElementById(element).innerHTML = respuesta;
  
 
}

