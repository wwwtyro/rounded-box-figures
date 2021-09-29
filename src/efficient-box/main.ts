import { vec3, mat4 } from "gl-matrix";
import REGL from "regl";
import Trackball from "trackball-controller";
import { interleavedSegmentsRoundCapJoin3D } from "../lines";

const faces = [
  {
    start: vec3.fromValues(+0.5, -0.5, +0.5),
    right: vec3.fromValues(0, 0, -1),
    up: vec3.fromValues(0, +1, 0),
  },
  {
    start: vec3.fromValues(-0.5, -0.5, -0.5),
    right: vec3.fromValues(0, 0, +1),
    up: vec3.fromValues(0, +1, 0),
  },
  {
    start: vec3.fromValues(-0.5, +0.5, +0.5),
    right: vec3.fromValues(+1, 0, 0),
    up: vec3.fromValues(0, 0, -1),
  },
  {
    start: vec3.fromValues(-0.5, -0.5, -0.5),
    right: vec3.fromValues(+1, 0, 0),
    up: vec3.fromValues(0, 0, +1),
  },
  {
    start: vec3.fromValues(-0.5, -0.5, +0.5),
    right: vec3.fromValues(+1, 0, 0),
    up: vec3.fromValues(0, +1, 0),
  },
  {
    start: vec3.fromValues(+0.5, -0.5, -0.5),
    right: vec3.fromValues(-1, 0, 0),
    up: vec3.fromValues(0, +1, 0),
  },
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

function roundedBoxPoint(point: vec3, size: vec3, radius: number) {
  const boundMax = vec3.multiply(vec3.create(), size, vec3.fromValues(0.5, 0.5, 0.5));
  vec3.subtract(boundMax, boundMax, [radius, radius, radius]);
  const boundMin = vec3.multiply(vec3.create(), size, vec3.fromValues(-0.5, -0.5, -0.5));
  vec3.add(boundMin, boundMin, [radius, radius, radius]);
  const clamped = vec3.max(vec3.create(), boundMin, point);
  vec3.min(clamped, boundMax, clamped);
  const normal = vec3.normalize(vec3.create(), vec3.subtract(vec3.create(), point, clamped));
  const position = vec3.scaleAndAdd(vec3.create(), clamped, normal, radius);
  return {
    normal,
    position,
  };
}

const regl = REGL({ extensions: ["ANGLE_instanced_arrays"] });
const canvas = document.getElementsByTagName("canvas")[0];
canvas.style.touchAction = "none";

const render = interleavedSegmentsRoundCapJoin3D(regl, 8);

const faceGeometries: {
  positions: vec3[];
}[] = [];

const size = vec3.fromValues(1, 1.25, 1.5);
const radius = 0.25;
const resolution = 5;

for (const face of faces) {
  const { up, right, start } = face;
  const positions: vec3[] = [];
  const width = vec3.length(vec3.multiply(vec3.create(), right, size));
  const height = vec3.length(vec3.multiply(vec3.create(), up, size));
  const s0 = vec3.multiply(vec3.create(), start, size);
  const s1 = vec3.scaleAndAdd(vec3.create(), s0, right, radius);
  const s2 = vec3.scaleAndAdd(vec3.create(), s0, right, width - radius);
  const s3 = vec3.scaleAndAdd(vec3.create(), s0, up, radius);
  const s4 = vec3.scaleAndAdd(vec3.create(), s3, right, radius);
  const s5 = vec3.scaleAndAdd(vec3.create(), s3, right, width - radius);
  const s6 = vec3.scaleAndAdd(vec3.create(), s0, up, height - radius);
  const s7 = vec3.scaleAndAdd(vec3.create(), s6, right, radius);
  const s8 = vec3.scaleAndAdd(vec3.create(), s6, right, width - radius);
  // Each corner grid.
  positions.push(...grid(s0, right, up, radius, radius, resolution, resolution));
  positions.push(...grid(s2, right, up, radius, radius, resolution, resolution));
  positions.push(...grid(s6, right, up, radius, radius, resolution, resolution));
  positions.push(...grid(s8, right, up, radius, radius, resolution, resolution));
  // Left and right side.
  positions.push(...grid(s3, right, up, radius, height - 2 * radius, resolution, 1));
  positions.push(...grid(s5, right, up, radius, height - 2 * radius, resolution, 1));
  // Top and bottom.
  positions.push(...grid(s1, right, up, width - 2 * radius, radius, 1, resolution));
  positions.push(...grid(s7, right, up, width - 2 * radius, radius, 1, resolution));
  // Middle face.
  positions.push(...grid(s4, right, up, width - 2 * radius, height - 2 * radius, 1, 1));
  for (const position of positions) {
    const rounded = roundedBoxPoint(position, size, 0.25);
    position[0] = rounded.position[0];
    position[1] = rounded.position[1];
    position[2] = rounded.position[2];
  }
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
  const viewport = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
  };
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
