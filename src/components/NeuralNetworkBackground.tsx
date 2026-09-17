"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  glow: number;
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
    const mouse = { x: -2000, y: -2000, active: false };

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
      return { width, height, rect };
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
          glow: 0,
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

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const draw = () => {
      const { width, height } = getDimensions();
      const isCard = width < 500 || height < 350;
      const connectDistance = isCard ? 90 : 140;
      const mouseRadius = isCard ? 110 : 170;

      ctx.clearRect(0, 0, width, height);

      // 1. Update particles & calculate star glow based on mouse distance
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

        // Mouse proximity calculation
        let targetGlow = 0;
        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            // Strong quadratic falloff: very bright at core
            targetGlow = Math.pow(1 - dist / mouseRadius, 1.4);

            // Connect neuron to mouse cursor
            const mouseLineAlpha = (1 - dist / mouseRadius) * 0.7 * opacity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${pRgb[0]}, ${pRgb[1]}, ${pRgb[2]}, ${mouseLineAlpha})`;
            ctx.lineWidth = 1 + targetGlow * 1.2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Smoothly interpolate glow for star flare transition
        particle.glow += (targetGlow - particle.glow) * 0.2;
      }

      // 2. Inter-particle connections
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDistance) {
            const baseAlpha = (1 - distance / connectDistance) * 0.55 * opacity;
            const glowBoost = Math.max(a.glow, b.glow);
            const lineAlpha = Math.min(1, baseAlpha + glowBoost * 0.45);

            ctx.beginPath();
            if (glowBoost > 0.3) {
              // Blend towards brighter tint when nodes are glowing
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha * 0.8})`;
              ctx.lineWidth = 1 + glowBoost * 1.5;
            } else {
              ctx.strokeStyle = `rgba(${lRgb[0]}, ${lRgb[1]}, ${lRgb[2]}, ${lineAlpha})`;
              ctx.lineWidth = 1;
            }
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 3. Render particles with radiant star bloom & flares
      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        const glow = particle.glow;

        if (glow > 0.03) {
          // Radiant star bloom gradient
          const bloomRadius = particle.radius * 3 + glow * 22;
          const grad = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            bloomRadius
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * opacity})`);
          grad.addColorStop(0.2, `rgba(${pRgb[0]}, ${pRgb[1]}, ${pRgb[2]}, ${0.85 * opacity * glow})`);
          grad.addColorStop(0.65, `rgba(${pRgb[0]}, ${pRgb[1]}, ${pRgb[2]}, ${0.25 * opacity * glow})`);
          grad.addColorStop(1, `rgba(${pRgb[0]}, ${pRgb[1]}, ${pRgb[2]}, 0)`);

          ctx.beginPath();
          ctx.fillStyle = grad;
          ctx.arc(particle.x, particle.y, bloomRadius, 0, Math.PI * 2);
          ctx.fill();

          // 4-pointed glittering star flare when directly near cursor
          if (glow > 0.3) {
            const flareSize = (glow - 0.3) * 18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${glow * 0.85 * opacity})`;
            ctx.lineWidth = 1;
            // Horizontal ray
            ctx.moveTo(particle.x - flareSize, particle.y);
            ctx.lineTo(particle.x + flareSize, particle.y);
            // Vertical ray
            ctx.moveTo(particle.x, particle.y - flareSize);
            ctx.lineTo(particle.x, particle.y + flareSize);
            ctx.stroke();
          }
        }

        // Central core of the particle / star
        ctx.beginPath();
        const coreRadius = particle.radius + glow * 1.8;
        if (glow > 0.15) {
          // Bright white-hot star center
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, 0.9 + glow * 0.1) * opacity})`;
        } else {
          ctx.fillStyle = `rgba(${pRgb[0]}, ${pRgb[1]}, ${pRgb[2]}, ${0.9 * opacity})`;
        }
        ctx.arc(particle.x, particle.y, coreRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

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
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
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
