"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export type NeuralNetworkBackgroundProps = {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  speed?: "slow" | "normal" | "fast" | number;
  opacity?: number;
};

function parseRgb(color?: string, fallback: [number, number, number] = [255, 92, 92]): [number, number, number] {
  if (!color) return fallback;
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16),
      ];
    }
    if (hex.length === 6) {
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ];
    }
  }
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
  }
  return fallback;
}

export default function NeuralNetworkBackground({
  className,
  primaryColor = "#ff5c5c",
  secondaryColor = "#ff5c5c",
  speed = "normal",
  opacity = 1,
}: NeuralNetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    const particles: Particle[] = [];

    const speedMultiplier =
      typeof speed === "number"
        ? speed
        : speed === "slow"
        ? 0.5
        : speed === "fast"
        ? 1.8
        : 1.0;

    const pRgb = parseRgb(primaryColor, [255, 92, 92]);
    const lRgb = parseRgb(secondaryColor, pRgb);

    const getDimensions = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 100);
      const height = Math.max(rect.height, 100);
      return { width, height };
    };

    const getParticleCount = (width: number, height: number) => {
      const area = width * height;
      const isCard = width < 500 || height < 350;
      if (isCard) {
        return Math.min(45, Math.max(20, Math.floor(area / 9000)));
      }
      return Math.min(100, Math.max(40, Math.floor(area / 18000)));
    };

    const setupParticles = (width: number, height: number) => {
      particles.length = 0;
      const count = getParticleCount(width, height);

      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45 * speedMultiplier,
          vy: (Math.random() - 0.5) * 0.45 * speedMultiplier,
          radius: Math.random() * 2.1 + 1.3,
        });
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = getDimensions();

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setupParticles(width, height);
    };

    const draw = () => {
      const { width, height } = getDimensions();
      const isCard = width < 500 || height < 350;
      const connectDistance = isCard ? 90 : 140;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }

        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${pRgb[0]}, ${pRgb[1]}, ${pRgb[2]}, ${0.9 * opacity})`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDistance) {
            const lineOpacity = (1 - distance / connectDistance) * 0.55 * opacity;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lRgb[0]}, ${lRgb[1]}, ${lRgb[2]}, ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", resizeCanvas);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", resizeCanvas);
      }
    };
  }, [primaryColor, secondaryColor, speed, opacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className ?? "neural-network-bg"}
    >
      <canvas ref={canvasRef} className="block w-full h-full bg-[#0b192f]" />
    </div>
  );
}
