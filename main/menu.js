
 
  
  (function(){
    
    const menuBox = document.querySelector('.Menu_itemsBox');
    const openBtn = document.querySelector('.BotonInMenu');
    
    const closeBtn = document.querySelector('.BotonSalirMenu');
    
    
    window.abrirMenu  = function(){ 
      
      if(menuBox) menuBox.classList.remove('menu_oculto'); 
      
      if(openBtn) openBtn.classList.add('menu_oculto');
      
    };
    
    
    window.cerrarMenu = function(){ 
      
      if(menuBox) menuBox.classList.add('menu_oculto');
      
      if(openBtn) openBtn.classList.remove('menu_oculto');
      
    };
    
    
    
    openBtn && openBtn.addEventListener('click', (e)=>{ e.stopPropagation(); abrirMenu(); });
    
    closeBtn && closeBtn.addEventListener('click', (e)=>{ e.stopPropagation(); cerrarMenu(); });
    
    document.addEventListener('click', (e)=>{ if(menuBox && !menuBox.contains(e.target) && !openBtn.contains(e.target)) cerrarMenu(); });
    
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') cerrarMenu(); });
    
    
  })();
  
 
