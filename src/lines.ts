import { Regl } from "regl";

function roundCapJoinGeometry(regl: Regl, resolution: number) {
  const instanceRoundRound = [
    [0, -0.5, 0],
    [0, -0.5, 1],
    [0, 0.5, 1],
    [0, -0.5, 0],
    [0, 0.5, 1],
    [0, 0.5, 0],
  ];
  // Add the left cap.
  for (let step = 0; step < resolution; step++) {
    const theta0 = Math.PI / 2 + ((step + 0) * Math.PI) / resolution;
    const theta1 = Math.PI / 2 + ((step + 1) * Math.PI) / resolution;
    instanceRoundRound.push([0, 0, 0]);
    instanceRoundRound.push([0.5 * Math.cos(theta0), 0.5 * Math.sin(theta0), 0]);
    instanceRoundRound.push([0.5 * Math.cos(theta1), 0.5 * Math.sin(theta1), 0]);
  }
  // Add the right cap.
  for (let step = 0; step < resolution; step++) {
    const theta0 = (3 * Math.PI) / 2 + ((step + 0) * Math.PI) / resolution;
    const theta1 = (3 * Math.PI) / 2 + ((step + 1) * Math.PI) / resolution;
    instanceRoundRound.push([0, 0, 1]);
    instanceRoundRound.push([0.5 * Math.cos(theta0), 0.5 * Math.sin(theta0), 1]);
    instanceRoundRound.push([0.5 * Math.cos(theta1), 0.5 * Math.sin(theta1), 1]);
  }
  return {
    buffer: regl.buffer(instanceRoundRound),
    count: instanceRoundRound.length,
  };
}

export function interleavedSegmentsRoundCapJoin3D(regl: Regl, resolution: number) {
  const roundCapJoin = roundCapJoinGeometry(regl, resolution);
  return regl({
    vert: `
      precision highp float;
      attribute vec3 position;
      attribute vec3 pointA, pointB;

      uniform float width;
      uniform vec2 resolution;
      uniform mat4 model, view, projection;

      varying float vDepth;

      void main() {
        vec4 clip0 = projection * view * model * vec4(pointA, 1.0);
        vec4 clip1 = projection * view * model * vec4(pointB, 1.0);
        vec2 screen0 = resolution * (0.5 * clip0.xy/clip0.w + 0.5);
        vec2 screen1 = resolution * (0.5 * clip1.xy/clip1.w + 0.5);
        vec2 xBasis = normalize(screen1 - screen0);
        vec2 yBasis = vec2(-xBasis.y, xBasis.x);

        // Calculate an attenuated line width.
        float wz0 = abs(width / (view * model * vec4(pointA, 1.0)).z);
        float wz1 = abs(width / (view * model * vec4(pointB, 1.0)).z);
        
        // Replace the usage of width by the attenuated widths:
        vec2 pt0 = screen0 + wz0 * (position.x * xBasis + position.y * yBasis);
        vec2 pt1 = screen1 + wz1 * (position.x * xBasis + position.y * yBasis);
        
        vec2 pt = mix(pt0, pt1, position.z);
        vec4 clip = mix(clip0, clip1, position.z);
        vDepth = clip.z;
        gl_Position = vec4(clip.w * (2.0 * pt/resolution - 1.0), clip.z, clip.w);
      }`,

    frag: `
      precision highp float;
      uniform vec3 color;
      varying float vDepth;
      void main() {
        gl_FragColor = vec4(color * 0.75 * vDepth, 1);
      }`,

    cull: {
      enable: true,
      face: "back",
    },

    attributes: {
      position: {
        buffer: roundCapJoin.buffer,
        divisor: 0,
      },
      pointA: {
        buffer: regl.prop<any, any>("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 0,
        stride: Float32Array.BYTES_PER_ELEMENT * 6,
      },
      pointB: {
        buffer: regl.prop<any, any>("points"),
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 3,
        stride: Float32Array.BYTES_PER_ELEMENT * 6,
      },
    },

    uniforms: {
      color: regl.prop<any, any>("color"),
      width: regl.prop<any, any>("width"),
      model: regl.prop<any, any>("model"),
      view: regl.prop<any, any>("view"),
      projection: regl.prop<any, any>("projection"),
      resolution: regl.prop<any, any>("resolution"),
    },

    count: roundCapJoin.count,
    instances: regl.prop<any, any>("segments"),
    viewport: regl.prop<any, any>("viewport"),
  });
}
