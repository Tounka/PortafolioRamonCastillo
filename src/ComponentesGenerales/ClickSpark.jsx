import { useRef, useEffect } from 'react';

const easings = {
  linear: t => t,
  'ease-in': t => t * t,
  'ease-in-out': t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  'ease-out': t => t * (2 - t)
};

// Capa global: un canvas fijo sobre toda la ventana que dibuja chispas en cada click,
// sin importar la sección o el modal donde ocurra.
const ClickSpark = ({
  sparkColor = '#fcb71c',
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const easeFunc = easings[easing] || easings['ease-out'];

    let sparks = [];
    let animationId = null;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = timestamp => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      sparks = sparks.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const eased = easeFunc(Math.max(0, elapsed) / duration);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const cos = Math.cos(spark.angle);
        const sin = Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(spark.x + distance * cos, spark.y + distance * sin);
        ctx.lineTo(spark.x + (distance + lineLength) * cos, spark.y + (distance + lineLength) * sin);
        ctx.stroke();

        return true;
      });

      // Solo se anima mientras haya chispas vivas
      animationId = sparks.length ? requestAnimationFrame(draw) : null;
    };

    const handleClick = e => {
      // Los clicks generados por teclado llegan con coordenadas 0,0
      if (e.detail === 0) return;

      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now
        });
      }

      if (animationId === null) animationId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // Fase de captura para que un stopPropagation en algún componente no bloquee el efecto
    window.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleClick, true);
      if (animationId !== null) cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 9999
        }}
      />
      {children}
    </>
  );
};

export default ClickSpark;
