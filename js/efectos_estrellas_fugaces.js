// Registramos el efecto de Habilidades en el almacén central global
class EfectoHabilidades {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.agentes = [];
        this.inicializar();
    }

    // Inicializamos 8 puntos inteligentes de energía fluida
    inicializar() {
        this.agentes = Array(30).fill().map(() => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            angle: Math.random() * Math.PI * 2,    // Dirección inicial del movimiento en radianes
            speed: Math.random() * 0.16 + 0.12       // Velocidad lenta y constante
        }));
    }

    actualizar() {
        // TRUCO CLAVE: Al pintar el fondo con una opacidad altísima (0.05),
        // las líneas anteriores no se borran del todo inmediatamente, creando estelas o colas de luz.
        this.ctx.fillStyle = 'rgba(10, 15, 12, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.agentes.forEach(a => {
            // Modificamos el ángulo ligeramente al azar para simular un comportamiento fluido y orgánico
            a.angle += (Math.random() - 0.5) * 0.4;
            
            // Calculamos el desplazamiento basado en funciones trigonométricas
            a.x += Math.cos(a.angle) * a.speed;
            a.y += Math.sin(a.angle) * a.speed;

            // Si se salen de los bordes de la sección, aparecen por el extremo opuesto (bucle infinito)
            if (a.x < 0) a.x = this.canvas.width;
            if (a.x > this.canvas.width) a.x = 0;
            if (a.y < 0) a.y = this.canvas.height;
            if (a.y > this.canvas.height) a.y = 0;

            // Dibujar el punto brillante que va dejando el rastro
            this.ctx.fillStyle = 'rgba(0, 255, 150, 0.35)'; // Verde cian luminoso
            this.ctx.beginPath();
            this.ctx.arc(a.x, a.y, 1.5, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
};

// Arranque independiente de esta animación (ya no depende de script.js)
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.estrellas_fugases');
    
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let instancia;

    function ajustarTamaño() {
        const contenedor = canvas.parentElement;
        canvas.width = contenedor.clientWidth;
        canvas.height = contenedor.clientHeight;
        if (instancia) instancia.inicializar();
        else instancia = new EfectoHabilidades(canvas, ctx);
    }

    function bucle() {
        instancia.actualizar();
        requestAnimationFrame(bucle);
    }

    ajustarTamaño();
    bucle();
    window.addEventListener('resize', ajustarTamaño);
});
