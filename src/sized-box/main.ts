import { vec3, mat4 } from "gl-matrix";
import REGL from "regl";
import Trackball from "trackball-controller";
import { interleavedSegmentsRoundCapJoin3D } from "../lines";

const faces = [
  { start: vec3.fromValues(+0.5, -0.5, +0.5), right: vec3.fromValues(0, 0, -1), up: vec3.fromValues(0, +1, 0) },
  { start: vec3.fromValues(-0.5, -0.5, -0.5), right: vec3.fromValues(0, 0, +1), up: vec3.fromValues(0, +1, 0) },
  { start: vec3.fromValues(-0.5, +0.5, +0.5), right: vec3.fromValues(+1, 0, 0), up: vec3.fromValues(0, 0, -1) },
  { start: vec3.fromValues(-0.5, -0.5, -0.5), right: vec3.fromValues(+1, 0, 0), up: vec3.fromValues(0, 0, +1) },
  { start: vec3.fromValues(-0.5, -0.5, +0.5), right: vec3.fromValues(+1, 0, 0), up: vec3.fromValues(0, +1, 0) },
  { start: vec3.fromValues(+0.5, -0.5, -0.5), right: vec3.fromValues(-1, 0, 0), up: vec3.fromValues(0, +1, 0) },
];

function grid(start: vec3, right: vec3, up: vec3, width: number, height: number, widthSteps: number, heightSteps: number) {
  const positions: vec3[] = [];
  for (let x = 0; x < widthSteps; x++) {
    for (let y = 0; y < heightSteps; y++) {
      const pa = vec3.scaleAndAdd(vec3.create(), start, right, (width * x) / widthSteps);
      vec3.scaleAndAdd(pa, pa, up, (height * y) / heightSteps);
      const pb = vec3.scaleAndAdd(vec3.create(), pa, right, width / widthSteps);
      const pc = vec3.scaleAndAdd(vec3.create(), pb, up, height / heightSteps);
      const pd = vec3.scaleAndAdd(vec3.create(), pa, up, height / heightSteps);
      positions.push(pa, pb, pc, pa, pc, pd);
    }
  }
  return positions;
}

const regl = REGL({ extensions: ["ANGLE_instanced_arrays"] });
const canvas = document.getElementsByTagName("canvas")[0];

const render = interleavedSegmentsRoundCapJoin3D(regl, 8);

const faceGeometries: {
  positions: vec3[];
}[] = [];

const size = vec3.fromValues(1, 1.25, 1.5);

for (const face of faces) {
  const start = vec3.multiply(vec3.create(), face.start, size);
  const width = vec3.length(vec3.multiply(vec3.create(), face.right, size));
  const height = vec3.length(vec3.multiply(vec3.create(), face.up, size));
  const positions = grid(start, face.right, face.up, width, height, 16, 16);
  faceGeometries.push({ positions });
}

const points: vec3[] = [];
for (const geometry of faceGeometries) {
  const positions = geometry.positions;
  for (let i = 0; i < positions.length; i += 3) {
    points.push(positions[i + 0], positions[i + 1], positions[i + 1], positions[i + 2], positions[i + 2], positions[i + 0]);
  }
}

const pointsBuffer = regl.buffer(points);

const trackball = new Trackball(canvas);
trackball.spin(1, 1);

const view = mat4.lookAt(mat4.create(), [0, 0, 2], [0, 0, 0], [0, 1, 0]);

function loop() {
  const projection = mat4.perspective(mat4.create(), Math.PI / 2.5, canvas.width / canvas.height, 0.1, 100);
  const viewport = { x: 0, y: 0, width: canvas.width, height: canvas.height };
  regl.clear({
    color: [1, 1, 1, 1],
    depth: 1,
  });
  render({
    points: pointsBuffer,
    color: [0.5, 0.5, 0.5],
    width: 2,
    segments: points.length / 2,
    resolution: [canvas.width, canvas.height],
    model: trackball.rotation,
    view,
    projection,
    viewport,
  });
  requestAnimationFrame(loop);
}

loop();
