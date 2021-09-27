import { vec2 } from "gl-matrix";

const canvas = document.getElementById("render-canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const radiusInput = document.getElementById("radius-input")! as HTMLInputElement;
let radius = radiusInput.valueAsNumber;
radiusInput.addEventListener("input", (_event) => {
  radius = radiusInput.valueAsNumber;
  render();
});

const resolutionInput = document.getElementById("resolution-input")! as HTMLInputElement;
let resolution = resolutionInput.valueAsNumber;
resolutionInput.addEventListener("input", (_event) => {
  resolution = resolutionInput.valueAsNumber;
  render();
});

function roundedBoxPoint(point: vec2, radius: number) {
  const size = vec2.fromValues(1, 1);
  const boundMax = vec2.multiply(vec2.create(), size, vec2.fromValues(0.5, 0.5));
  vec2.subtract(boundMax, boundMax, [radius, radius]);
  const boundMin = vec2.multiply(vec2.create(), size, vec2.fromValues(-0.5, -0.5));
  vec2.add(boundMin, boundMin, [radius, radius]);
  const clamped = vec2.max(vec2.create(), boundMin, point);
  vec2.min(clamped, boundMax, clamped);
  const normal = vec2.normalize(vec2.create(), vec2.subtract(vec2.create(), point, clamped));
  const position = vec2.scaleAndAdd(vec2.create(), clamped, normal, radius);
  return {
    normal,
    position,
    clamped,
  };
}

function render() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const center = vec2.fromValues(canvas.width / 2, canvas.height / 2);

  const scale = Math.min(canvas.width, canvas.height) * 0.9;

  const originalPoints: vec2[] = [];
  for (let i = 0; i <= resolution; i++) {
    originalPoints.push(vec2.fromValues(-0.5, -0.5 + i / resolution));
  }
  for (let i = 1; i <= resolution; i++) {
    originalPoints.push(vec2.fromValues(-0.5 + i / resolution, 0.5));
  }
  for (let i = 1; i <= resolution; i++) {
    originalPoints.push(vec2.fromValues(0.5, 0.5 - i / resolution));
  }
  for (let i = 1; i < resolution; i++) {
    originalPoints.push(vec2.fromValues(0.5 - i / resolution, -0.5));
  }

  const roundedPoints = originalPoints.map((p) => roundedBoxPoint(p, radius));
  const roundedPointPositions = roundedPoints.map((p) => p.position);
  const roundedPointClamps = roundedPoints.map((p) => p.clamped);

  const scaledOriginalPoints = originalPoints.map((p) => vec2.scaleAndAdd(vec2.create(), center, p, scale));
  const scaledRoundedPoints = roundedPointPositions.map((p) => vec2.scaleAndAdd(vec2.create(), center, p, scale));
  const scaledRoundedClamps = roundedPointClamps.map((p) => vec2.scaleAndAdd(vec2.create(), center, p, scale));

  // Connection lines.
  ctx.strokeStyle = "rgb(224, 224, 224)";
  ctx.beginPath();
  for (let i = 0; i < originalPoints.length; i++) {
    const oPoint = scaledOriginalPoints[i];
    const rPoint = scaledRoundedPoints[i];
    ctx.moveTo(oPoint[0], oPoint[1]);
    ctx.lineTo(rPoint[0], rPoint[1]);
  }
  ctx.stroke();
  ctx.strokeStyle = "rgb(255, 192, 192)";
  ctx.beginPath();
  for (let i = 0; i < originalPoints.length; i++) {
    const oPoint = scaledRoundedClamps[i];
    const rPoint = scaledRoundedPoints[i];
    ctx.moveTo(oPoint[0], oPoint[1]);
    ctx.lineTo(rPoint[0], rPoint[1]);
  }
  ctx.stroke();

  // Bounds.
  const boundMin = vec2.fromValues(-0.5 + radius, -0.5 + radius);
  const boundMax = vec2.fromValues(0.5 - radius, 0.5 - radius);
  const boundSize = vec2.sub(vec2.create(), boundMax, boundMin);
  vec2.scaleAndAdd(boundMin, center, boundMin, scale);
  vec2.scale(boundSize, boundSize, scale);
  ctx.strokeStyle = "rgb(255, 128, 128)";
  ctx.strokeRect(boundMin[0], boundMin[1], boundSize[0], boundSize[1]);

  // Clamp centers and circles.
  ctx.fillStyle = "rgb(255, 128, 128)";
  ctx.strokeStyle = "rgb(255, 192, 192)";
  for (const point of scaledRoundedClamps) {
    ctx.beginPath();
    ctx.ellipse(point[0], point[1], 3, 3, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(point[0], point[1], radius * scale, radius * scale, 0, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Original vertices.
  ctx.fillStyle = "rgb(128, 128, 128)";
  for (const point of scaledOriginalPoints) {
    ctx.beginPath();
    ctx.ellipse(point[0], point[1], 3, 3, 0, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Original faces.
  ctx.strokeStyle = "rgb(128, 128, 128)";
  ctx.beginPath();
  ctx.moveTo(scaledOriginalPoints[0][0], scaledOriginalPoints[0][1]);
  for (let i = 1; i < originalPoints.length; i++) {
    const point = scaledOriginalPoints[i];
    ctx.lineTo(point[0], point[1]);
  }
  ctx.lineTo(scaledOriginalPoints[0][0], scaledOriginalPoints[0][1]);
  ctx.stroke();

  // Rounded vertices.
  ctx.fillStyle = "rgb(0, 0, 0)";
  for (const point of scaledRoundedPoints) {
    ctx.beginPath();
    ctx.ellipse(point[0], point[1], 3, 3, 0, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Rounded faces.
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.moveTo(scaledRoundedPoints[0][0], scaledRoundedPoints[0][1]);
  for (let i = 1; i < roundedPointPositions.length; i++) {
    const point = scaledRoundedPoints[i];
    ctx.lineTo(point[0], point[1]);
  }
  ctx.lineTo(scaledRoundedPoints[0][0], scaledRoundedPoints[0][1]);
  ctx.stroke();
}

render();
