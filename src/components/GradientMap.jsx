import React, { useRef, useEffect, useState } from 'react';

export default function GradientMap({ src, gradient }) {
  const canvasRef = useRef(null);
  const [originalImageData, setOriginalImageData] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.src = src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const original = ctx.getImageData(0, 0, img.width, img.height);
      setOriginalImageData(original);

      drawGrayscale(original, ctx);
    };
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!originalImageData) return;
  
    const mapped = applyGradientMap(originalImageData, gradient);
    ctx.putImageData(mapped, 0, 0);
  }, [originalImageData, gradient]);

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="transition-all duration-500"
      style={{ cursor: 'pointer' }}
    />
  );
}

function drawGrayscale(imageData, ctx) {
  const data = new Uint8ClampedArray(imageData.data);
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i + 1] = data[i + 2] = avg;
  }
  const gray = new ImageData(data, imageData.width, imageData.height);
  ctx.putImageData(gray, 0, 0);
}

function applyGradientMap(imageData) {
    const data = new Uint8ClampedArray(imageData.data);
    const width = imageData.width;
    const height = imageData.height;
  
    const baseColor = [255, 255, 120];  // Bright yellow
    const redColor = [255, 70, 70];     // Vivid red
    const opacity = 0.55;
  
    const totalVisibleArea = width * height;
    const targetRedArea = totalVisibleArea * 0.35;
  
    let rectX, rectY, rectWidth, rectHeight;
  
    while (true) {
      rectWidth = Math.floor(width * (0.5 + Math.random()));
      rectHeight = Math.floor(height * (0.5 + Math.random()));
      rectX = Math.floor(Math.random() * (width + rectWidth)) - rectWidth;
      rectY = Math.floor(Math.random() * (height + rectHeight)) - rectHeight;
  
      const visibleWidth = Math.max(0, Math.min(rectX + rectWidth, width) - Math.max(rectX, 0));
      const visibleHeight = Math.max(0, Math.min(rectY + rectHeight, height) - Math.max(rectY, 0));
      const visibleArea = visibleWidth * visibleHeight;
  
      if (visibleArea >= targetRedArea) break;
    }
  
    for (let i = 0; i < data.length; i += 4) {
      const pixelIndex = i / 4;
      const x = pixelIndex % width;
      const y = Math.floor(pixelIndex / width);
  
      const isRed =
        x >= rectX &&
        x < rectX + rectWidth &&
        y >= rectY &&
        y < rectY + rectHeight;
  
      const [overlayR, overlayG, overlayB] = isRed ? redColor : baseColor;
  
      const originalR = data[i];
      const originalG = data[i + 1];
      const originalB = data[i + 2];
  
      // Enhanced contrast and vibrancy with soft multiply-style blend
      data[i]     = originalR * (1 - opacity) + overlayR * (opacity * originalR / 255);
      data[i + 1] = originalG * (1 - opacity) + overlayG * (opacity * originalG / 255);
      data[i + 2] = originalB * (1 - opacity) + overlayB * (opacity * originalB / 255);
    }
  
    return new ImageData(data, width, height);
  }
  
  

function createGradientMap(stops) {
  return (t) => {
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i];
      const b = stops[i + 1];
      if (t >= a.stop && t <= b.stop) {
        const ratio = (t - a.stop) / (b.stop - a.stop);
        return [
          a.color[0] + (b.color[0] - a.color[0]) * ratio,
          a.color[1] + (b.color[1] - a.color[1]) * ratio,
          a.color[2] + (b.color[2] - a.color[2]) * ratio
        ];
      }
    }
    return stops[stops.length - 1].color;
  };
}
