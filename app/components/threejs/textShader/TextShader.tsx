import React from 'react'
import * as THREE from 'three';


const TextShader = () => {
  return (
    <div>TextShader</div>
   
  )
}

export const createTextTexture = (text:string, font:any, size:any, color:string, fontWeight = 100)=> {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if(!ctx) return null;
    const canvasWidth = window.innerWidth * 2;
    const canvasHeight = window.innerHeight * 2;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.fillStyle = color || "#121212";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    const fontSize = size || Math.floor(canvasWidth * 2)
    
    ctx.fillStyle = "#ffffff"
    ctx.font = `${fontWeight} ${fontSize}px "CustomFont"`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle";

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const textMetrics = ctx?.measureText(text)
    const textWidth = textMetrics!.width

    const scaleFactor = Math.min(1, (canvasWidth*1)/textWidth)
    const aspectCorrection = canvasWidth / canvasHeight
    ctx?.setTransform(
        scaleFactor,
        0,
        0,
        scaleFactor / aspectCorrection,
        canvasWidth / 2,
        canvasHeight / 2
    );

    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = fontSize * 0.005;
    for(let i = 0; i<3; i++){
        ctx?.strokeText(text,0,0);
    }

    ctx?.fillText(text,0,0);

    return new THREE.CanvasTexture(canvas);
}

export default TextShader