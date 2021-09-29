import { vec3, mat4 } from "gl-matrix";
import REGL from "regl";
import Trackball from "trackball-controller";

const faces = [
  { start: vec3.fromValues(+0.5, -0.5, +0.5), right: vec3.fromValues(0, 0, -1), up: vec3.fromValues(0, +1, 0), label: "+X" },
  { start: vec3.fromValues(-0.5, -0.5, -0.5), right: vec3.fromValues(0, 0, +1), up: vec3.fromValues(0, +1, 0), label: "-X" },
  { start: vec3.fromValues(-0.5, +0.5, +0.5), right: vec3.fromValues(+1, 0, 0), up: vec3.fromValues(0, 0, -1), label: "+Y" },
  { start: vec3.fromValues(-0.5, -0.5, -0.5), right: vec3.fromValues(+1, 0, 0), up: vec3.fromValues(0, 0, +1), label: "-Y" },
  { start: vec3.fromValues(-0.5, -0.5, +0.5), right: vec3.fromValues(+1, 0, 0), up: vec3.fromValues(0, +1, 0), label: "+Z" },
  { start: vec3.fromValues(+0.5, -0.5, -0.5), right: vec3.fromValues(-1, 0, 0), up: vec3.fromValues(0, +1, 0), label: "-Z" },
];

const regl = REGL();
const canvas = document.getElementsByTagName("canvas")[0];
canvas.style.touchAction = "none";

const textures: REGL.Texture2D[] = [];

for (const face of faces) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 512;
  textureCanvas.height = 512;
  textureCanvas.style.margin = "4px";
  const ctx = textureCanvas.getContext("2d")!;
  ctx.fillStyle = "rgb(32,32,32)";
  ctx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
  ctx.font = "256px serif";
  ctx.fillStyle = "white";
  const metrics = ctx.measureText(face.label);
  ctx.fillText(
    face.label,
    textureCanvas.width - (64 + metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft),
    metrics.actualBoundingBoxAscent + 64
  );
  ctx.ellipse(16, textureCanvas.height - 16, 10, 10, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.font = "36px sans";
  ctx.fillText(`start`, 24, textureCanvas.height - 32);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.moveTo(16, textureCanvas.height - 16);
  ctx.lineTo(textureCanvas.width - 64, textureCanvas.height - 16);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(textureCanvas.width - 64, textureCanvas.height - 16);
  ctx.lineTo(textureCanvas.width - 64 - 9, textureCanvas.height - 16 - 9);
  ctx.lineTo(textureCanvas.width - 64 + 13, textureCanvas.height - 16);
  ctx.lineTo(textureCanvas.width - 64 - 9, textureCanvas.height - 16 + 9);
  ctx.lineTo(textureCanvas.width - 64, textureCanvas.height - 16);
  ctx.fill();
  ctx.fillText("right", textureCanvas.width - 170, textureCanvas.height - 32);
  ctx.beginPath();
  ctx.moveTo(16, textureCanvas.height - 16);
  ctx.lineTo(16, 64);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(16, 64);
  ctx.lineTo(16 - 9, 64 + 9);
  ctx.lineTo(16, 64 - 13);
  ctx.lineTo(16 + 9, 64 + 9);
  ctx.lineTo(16, 64);
  ctx.fill();
  ctx.fillText("up", 24, 100);
  textures.push(
    regl.texture({
      data: textureCanvas,
      min: "linear mipmap linear",
      mag: "linear",
      flipY: true,
    })
  );
}

const render = regl({
  vert: `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 model, view, projection;
      varying vec2 vUV;
      void main() {
        gl_Position = projection * view * model * vec4(position, 1);
        vUV = uv;
      }`,
  frag: `
      precision highp float;
      uniform sampler2D texture;
      varying vec2 vUV;
      void main() {
        gl_FragColor = texture2D(texture, vUV);
      }`,
  attributes: {
    position: regl.prop<any, any>("positions"),
    uv: regl.prop<any, any>("uvs"),
  },
  uniforms: {
    texture: regl.prop<any, any>("texture"),
    model: regl.prop<any, any>("model"),
    view: regl.prop<any, any>("view"),
    projection: regl.prop<any, any>("projection"),
  },
  cull: {
    // enable: true,
    face: "back",
  },
  count: 6,
  viewport: regl.prop<any, any>("viewport"),
});

const faceGeometries: {
  positions: vec3[];
  uvs: number[];
  texture: REGL.Texture2D;
}[] = [];

for (let i = 0; i < faces.length; i++) {
  const face = faces[i];
  const pa = face.start;
  const pb = vec3.add(vec3.create(), pa, face.right);
  const pc = vec3.add(vec3.create(), pb, face.up);
  const pd = vec3.add(vec3.create(), pa, face.up);
  const positions = [pa, pb, pc, pa, pc, pd];
  const uvs = [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1];
  faceGeometries.push({
    positions,
    uvs,
    texture: textures[i],
  });
}

const trackball = new Trackball(canvas);
trackball.spin(1, 1);

const view = mat4.lookAt(mat4.create(), [0, 0, 2], [0, 0, 0], [0, 1, 0]);

function loop() {
  const projection = mat4.perspective(mat4.create(), Math.PI / 3, canvas.width / canvas.height, 0.1, 100);
  const viewport = { x: 0, y: 0, width: canvas.width, height: canvas.height };
  regl.clear({
    color: [1, 1, 1, 1],
    depth: 1,
  });
  for (const geometry of faceGeometries) {
    render({
      ...geometry,
      model: trackball.rotation,
      view,
      projection,
      viewport,
    });
  }
  requestAnimationFrame(loop);
}

loop();
