import { vec2 } from "gl-matrix";

const canvas = document.getElementById(
  "render-canvas"
)! as HTMLCanvasElement;
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const ctx = canvas.getContext("2d")!;
const center = vec2.fromValues(canvas.width / 2, canvas.height / 2);
const scale = Math.min(canvas.width, canvas.height) * 0.9;

function renderGrid(
  x: number,
  y: number,
  width: number,
  height: number,
  widthSteps: number,
  heightSteps: number
) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgb(192,192,192)";
  for (let i = 0; i <= widthSteps; i++) {
    const p0 = vec2.fromValues(x + (width * i) / widthSteps, y);
    const p1 = vec2.fromValues(x + (width * i) / widthSteps, y + height);
    vec2.scaleAndAdd(p0, center, p0, scale);
    vec2.scaleAndAdd(p1, center, p1, scale);
    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    ctx.lineTo(p1[0], p1[1]);
    ctx.stroke();
  }
  for (let i = 0; i <= heightSteps; i++) {
    const p0 = vec2.fromValues(x, y + (height * i) / heightSteps);
    const p1 = vec2.fromValues(x + width, y + (height * i) / heightSteps);
    vec2.scaleAndAdd(p0, center, p0, scale);
    vec2.scaleAndAdd(p1, center, p1, scale);
    ctx.beginPath();
    ctx.moveTo(p0[0], p0[1]);
    ctx.lineTo(p1[0], p1[1]);
    ctx.stroke();
  }
  const p0 = vec2.scaleAndAdd(vec2.create(), center, [x, y], scale);
  const size = vec2.scale(vec2.create(), [width, height], scale);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.strokeRect(p0[0], p0[1], size[0], size[1]);
}

function subNums(str: string) {
  var newStr = "";
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if (code >= 48 && code <= 57) {
      newStr += String.fromCharCode(code + 8272);
    } else {
      newStr += str[i];
    }
  }
  return newStr;
}

function renderPoint(point: vec2, label: string) {
  const p = vec2.scaleAndAdd(point, center, point, scale);
  ctx.fillStyle = "rgb(255,0,0)";
  ctx.beginPath();
  ctx.ellipse(p[0], p[1], 7, 7, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.ellipse(p[0], p[1], 7, 7, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.font = "18px sans";
  ctx.fillText(subNums(label), p[0] + 6, p[1] - 8);
}

const grids = [
  { start: [-0.5, -0.5], width: 0.25, height: 0.25, wSteps: 5, hSteps: 5 },
  { start: [0.25, -0.5], width: 0.25, height: 0.25, wSteps: 5, hSteps: 5 },
  { start: [-0.5, 0.25], width: 0.25, height: 0.25, wSteps: 5, hSteps: 5 },
  { start: [0.25, 0.25], width: 0.25, height: 0.25, wSteps: 5, hSteps: 5 },
  { start: [-0.25, -0.5], width: 0.5, height: 0.25, wSteps: 1, hSteps: 5 },
  { start: [-0.25, 0.25], width: 0.5, height: 0.25, wSteps: 1, hSteps: 5 },
  { start: [-0.5, -0.25], width: 0.25, height: 0.5, wSteps: 5, hSteps: 1 },
  { start: [0.25, -0.25], width: 0.25, height: 0.5, wSteps: 5, hSteps: 1 },
];

for (const grid of grids) {
  renderGrid(
    grid.start[0],
    grid.start[1],
    grid.width,
    grid.height,
    grid.wSteps,
    grid.hSteps
  );
}

const points = [
  { point: vec2.fromValues(-0.5, 0.5), label: "S0" },
  { point: vec2.fromValues(-0.25, 0.5), label: "S1" },
  { point: vec2.fromValues(0.25, 0.5), label: "S2" },
  { point: vec2.fromValues(-0.5, 0.25), label: "S3" },
  { point: vec2.fromValues(-0.25, 0.25), label: "S4" },
  { point: vec2.fromValues(0.25, 0.25), label: "S5" },
  { point: vec2.fromValues(-0.5, -0.25), label: "S6" },
  { point: vec2.fromValues(-0.25, -0.25), label: "S7" },
  { point: vec2.fromValues(0.25, -0.25), label: "S8" },
];

for (const point of points) {
  renderPoint(point.point, point.label);
}

