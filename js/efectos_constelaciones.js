// Mouse local exclusivo para la portada
const mousePortada = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    mousePortada.x = e.clientX;
    mousePortada.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
    mousePortada.x = null;
    mousePortada.y = null;
});

// Guardamos la lógica en el almacén global
class EfectoPortada {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particulas = [];
        this.inicializar();
    }

    inicializar() {
        this.particulas = [];
        const cantidad = Math.floor((this.canvas.width * this.canvas.height) / 6500);
        for (let i = 0; i < Math.min(cantidad, 500); i++) {
            this.particulas.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                radio: Math.random() * 2 + 1
            });
        }
    }

    actualizar() {
        this.ctx.fillStyle = '#0a0f25';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particulas.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            if (mousePortada.x !== null) {
                const rect = this.canvas.getBoundingClientRect();
                const mx = mousePortada.x - rect.left;
                const my = mousePortada.y - rect.top;
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.hypot(dx, dy);
                if (dist < 150) {
                    p.x += (dx / dist) * 2;
                    p.y += (dy / dist) * 2;
                }
            }

            this.ctx.fillStyle = 'rgba(250, 250, 255, 0.7)';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
            this.ctx.fill();
        });

        for (let i = 0; i < this.particulas.length; i++) {
            for (let j = i + 1; j < this.particulas.length; j++) {
                const p1 = this.particulas[i];
                const p2 = this.particulas[j];
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < 120) {
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${1 - dist / 120 * 0.15})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }
};

// Arranque independiente de esta animación (ya no depende de script.js)
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.constelaciones');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let instancia;

    function ajustarTamaño() {
        const contenedor = canvas.parentElement;
        canvas.width = contenedor.clientWidth;
        canvas.height = contenedor.clientHeight;
        if (instancia) instancia.inicializar();
        else instancia = new EfectoPortada(canvas, ctx);
    }

    function bucle() {
        instancia.actualizar();
        requestAnimationFrame(bucle);
    }

    ajustarTamaño();
    bucle();
    window.addEventListener('resize', ajustarTamaño);
});
