"use client";

import { useEffect, useRef, useState } from "react";

type HalftoneOrbProps = {
    size?: number;
    seed?: number;
    variant?: "hero" | "item";
    colorScheme?: "blue" | "orange" | "green";
    forceDarkMode?: boolean;
};

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function random(seed: number) {
    let state = (seed + 1) * 0x9e3779b1;

    return () => {
        state ^= state << 13;
        state ^= state >>> 17;
        state ^= state << 5;
        return (state >>> 0) / 0xffffffff;
    };
}

export default function HalftoneOrb({ size = 48, seed = 0, variant = "hero", colorScheme = "blue", forceDarkMode }: HalftoneOrbProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const pixelRatio = window.devicePixelRatio || 1;
        const itemSpacingOnReferenceCanvas = 16;
        const step = variant === "hero" ? 2.75 : (size / 320) * itemSpacingOnReferenceCanvas;
        const cols = Math.floor(size / step);
        const rows = Math.floor(size / step);
        const points: Array<{ x: number; y: number; d: number; a: number; n: number; nx: number; ny: number }> = [];
        const rand = random(seed + 31);
        const center = size / 2;
        const radius = size * (variant === "hero" ? 0.395 : 0.33);

        for (let row = 0; row < rows; row += 1) {
            for (let col = 0; col < cols; col += 1) {
                const x = col * step + step * 0.5;
                const y = row * step + step * 0.5;
                const dx = (x - center) / radius;
                const dy = (y - center) / radius;
                const distance = Math.hypot(dx, dy);

                if (distance > 1.08) continue;
                points.push({ x, y, d: distance, a: Math.atan2(dy, dx), n: rand(), nx: dx, ny: dy });
            }
        }

        canvas.width = size * pixelRatio;
        canvas.height = size * pixelRatio;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        ctx.scale(pixelRatio, pixelRatio);
        let time = seed * 0.7;
        let itemAngle = seed * 0.19;
        let heroAngle = seed * 0.19;
        let rafId = 0;

        const ditherMatrix = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5],
        ];

        const render = () => {
            const dark = forceDarkMode !== undefined ? forceDarkMode : document.documentElement.classList.contains("dark");
            const styles = getComputedStyle(document.documentElement);
            const text = styles.getPropertyValue("--color-text").trim();
            const background = styles.getPropertyValue("--color-bg").trim();
            ctx.clearRect(0, 0, size, size);

            if (variant === "item") {
                // Item orb: tri-tone dithered halftone with color-specific tones.
                let sphereColor: string, shadowTone: string, highlightTone: string;
                
                if (colorScheme === "blue") {
                    sphereColor = dark ? "#003CFF" : "#A5B4FC";
                    shadowTone = dark ? "#0029B3" : "#5B7BD8";
                    highlightTone = dark ? "#FFFFFF" : "#E0E7FF";
                } else if (colorScheme === "orange") {
                    sphereColor = dark ? "#C23B00" : "#FDBA74";
                    shadowTone = dark ? "#8A2900" : "#C97D4F";
                    highlightTone = dark ? "#FFFFFF" : "#FED7AA";
                } else if (colorScheme === "green") {
                    sphereColor = dark ? "#006B28" : "#86EFAC";
                    shadowTone = dark ? "#004A1C" : "#4D9F6B";
                    highlightTone = dark ? "#FFFFFF" : "#BBF7D0";
                } else {
                    // Fallback to blue
                    sphereColor = dark ? "#003CFF" : "#A5B4FC";
                    shadowTone = dark ? "#0029B3" : "#5B7BD8";
                    highlightTone = dark ? "#FFFFFF" : "#E0E7FF";
                }

                ctx.fillStyle = sphereColor;
                ctx.beginPath();
                ctx.arc(center, center, radius, 0, Math.PI * 2);
                ctx.fill();

                const lx = Math.cos(itemAngle);
                const ly = -0.55;
                const lz = Math.sin(itemAngle) + 0.5;
                const lLen = Math.sqrt(lx * lx + ly * ly + lz * lz);
                const LX = lx / lLen;
                const LY = ly / lLen;
                const LZ = lz / lLen;

                for (const point of points) {
                    const z = Math.sqrt(Math.max(0, 1 - point.nx * point.nx - point.ny * point.ny));
                    let diff = point.nx * LX + point.ny * LY + z * LZ;
                    diff = Math.max(0, diff);

                    const ambient = 0.08;
                    const intensity = ambient + (1 - ambient) * diff;

                    // Ordered dither + deterministic grain for clustered tri-tone texture.
                    const shadowDensity = clamp((0.62 - intensity) / 0.62, 0, 1);
                    const highlightDensity = clamp((intensity - 0.52) / 0.48, 0, 1);
                    const matrixX = Math.floor(point.x / step) & 3;
                    const matrixY = Math.floor(point.y / step) & 3;
                    const grain = clamp((point.n - 0.5) * 0.22, -0.11, 0.11);

                    const cell = step * 0.88;
                    const parity = (Math.floor(point.x / step) + Math.floor(point.y / step) + Math.floor(point.n * 7)) & 1;

                    const shadowThreshold = (ditherMatrix[matrixY][matrixX] + 0.5) / 16;
                    if (shadowDensity + grain >= shadowThreshold) {
                        const shadowSizeBias = clamp(shadowDensity * 0.92 + point.n * 0.16, 0, 1);
                        const shadowSize = cell * (0.2 + shadowSizeBias * 0.58);
                        const shadowHalf = shadowSize * 0.5;
                        ctx.fillStyle = shadowTone;
                        ctx.globalAlpha = clamp(0.46 + shadowDensity * 0.42, 0.36, 0.9);
                        if (parity === 0) {
                            ctx.fillRect(point.x - shadowHalf, point.y - shadowHalf, shadowSize, shadowSize);
                        } else {
                            ctx.beginPath();
                            ctx.arc(point.x, point.y, shadowSize * 0.45, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }

                    const highlightThreshold = (ditherMatrix[(matrixY + 2) & 3][(matrixX + 1) & 3] + 0.5) / 16;
                    if (highlightDensity + grain * 0.6 >= highlightThreshold) {
                        const highlightSizeBias = clamp(highlightDensity * 0.86 + point.n * 0.14, 0, 1);
                        const highlightSize = cell * (0.16 + highlightSizeBias * 0.42);
                        const highlightHalf = highlightSize * 0.5;
                        ctx.fillStyle = highlightTone;
                        ctx.globalAlpha = clamp(0.32 + highlightDensity * 0.5, 0.26, 0.88);
                        if (parity === 0) {
                            ctx.fillRect(point.x - highlightHalf, point.y - highlightHalf, highlightSize, highlightSize);
                        } else {
                            ctx.beginPath();
                            ctx.arc(point.x, point.y, highlightSize * 0.44, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }

                    // Preserve tiny spark points in the brightest zones so white is visible at small sizes.
                    if (highlightDensity > 0.78 && ((matrixX + matrixY + Math.floor(point.n * 9)) & 3) === 0) {
                        const sparkle = cell * 0.14;
                        const sparkleHalf = sparkle * 0.5;
                        ctx.fillStyle = highlightTone;
                        ctx.globalAlpha = 0.92;
                        ctx.fillRect(point.x - sparkleHalf, point.y - sparkleHalf, sparkle, sparkle);
                    }
                }

                ctx.globalAlpha = 1;
                itemAngle += 24 * 0.0007;
            } else {
                const heroSphereColor = dark ? text : "#111111";
                const heroCutoutColor = background || (dark ? "#111111" : "#f8f8ff");
                ctx.fillStyle = heroSphereColor;
                ctx.beginPath();
                ctx.arc(center, center, radius, 0, Math.PI * 2);
                ctx.fill();

                const lx = Math.cos(heroAngle);
                const ly = -0.55;
                const lz = Math.sin(heroAngle) + 0.5;
                const lLen = Math.sqrt(lx * lx + ly * ly + lz * lz);
                const LX = lx / lLen;
                const LY = ly / lLen;
                const LZ = lz / lLen;
                for (const point of points) {
                    const z = Math.sqrt(Math.max(0, 1 - point.nx * point.nx - point.ny * point.ny));
                    let diff = point.nx * LX + point.ny * LY + z * LZ;
                    diff = Math.max(0, diff);
                    const ambient = 0.08;
                    const intensity = ambient + (1 - ambient) * diff;
                    const density = intensity;

                    const holeDensity = clamp(1 - density, 0, 1);
                    const matrixX = Math.floor(point.x / step) & 3;
                    const matrixY = Math.floor(point.y / step) & 3;
                    const threshold = (ditherMatrix[matrixY][matrixX] + 0.5) / 16;
                    const grain = clamp((point.n - 0.5) * 0.2, -0.1, 0.1);
                    if (holeDensity + grain < threshold) continue;

                    const alpha = clamp(0.46 + holeDensity * 0.42, 0.38, 0.9);
                    const cell = step * 0.9;
                    const sizeBias = clamp(holeDensity * 0.9 + point.n * 0.18, 0, 1);
                    const blockSize = cell * (0.18 + sizeBias * 0.58);
                    const half = blockSize * 0.5;

                    ctx.fillStyle = heroCutoutColor;
                    ctx.globalAlpha = alpha;

                    const parity = (Math.floor(point.x / step) + Math.floor(point.y / step) + Math.floor(point.n * 7)) & 1;
                    if (parity === 0) {
                        ctx.fillRect(point.x - half, point.y - half, blockSize, blockSize);
                    } else {
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, blockSize * 0.46, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                ctx.globalAlpha = 1;
                heroAngle += 24 * 0.0007;
            }

            time += 0.016;
            rafId = window.requestAnimationFrame(render);
        };

        rafId = window.requestAnimationFrame(render);
        return () => window.cancelAnimationFrame(rafId);
    }, [seed, size, variant, colorScheme, forceDarkMode]);

    return (
        <canvas 
            ref={canvasRef} 
            aria-hidden="true" 
            className="block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        />
    );

}