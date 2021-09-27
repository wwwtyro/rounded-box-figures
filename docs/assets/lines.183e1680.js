function o(o,t){const i=function(o,t){const i=[[0,-.5,0],[0,-.5,1],[0,.5,1],[0,-.5,0],[0,.5,1],[0,.5,0]];for(let n=0;n<t;n++){const o=Math.PI/2+(n+0)*Math.PI/t,e=Math.PI/2+(n+1)*Math.PI/t;i.push([0,0,0]),i.push([.5*Math.cos(o),.5*Math.sin(o),0]),i.push([.5*Math.cos(e),.5*Math.sin(e),0])}for(let n=0;n<t;n++){const o=3*Math.PI/2+(n+0)*Math.PI/t,e=3*Math.PI/2+(n+1)*Math.PI/t;i.push([0,0,1]),i.push([.5*Math.cos(o),.5*Math.sin(o),1]),i.push([.5*Math.cos(e),.5*Math.sin(e),1])}return{buffer:o.buffer(i),count:i.length}}(o,t);return o({vert:"\n      precision highp float;\n      attribute vec3 position;\n      attribute vec3 pointA, pointB;\n\n      uniform float width;\n      uniform vec2 resolution;\n      uniform mat4 model, view, projection;\n\n      varying float vDepth;\n\n      void main() {\n        vec4 clip0 = projection * view * model * vec4(pointA, 1.0);\n        vec4 clip1 = projection * view * model * vec4(pointB, 1.0);\n        vec2 screen0 = resolution * (0.5 * clip0.xy/clip0.w + 0.5);\n        vec2 screen1 = resolution * (0.5 * clip1.xy/clip1.w + 0.5);\n        vec2 xBasis = normalize(screen1 - screen0);\n        vec2 yBasis = vec2(-xBasis.y, xBasis.x);\n\n        // Calculate an attenuated line width.\n        float wz0 = abs(width / (view * model * vec4(pointA, 1.0)).z);\n        float wz1 = abs(width / (view * model * vec4(pointB, 1.0)).z);\n        \n        // Replace the usage of width by the attenuated widths:\n        vec2 pt0 = screen0 + wz0 * (position.x * xBasis + position.y * yBasis);\n        vec2 pt1 = screen1 + wz1 * (position.x * xBasis + position.y * yBasis);\n        \n        vec2 pt = mix(pt0, pt1, position.z);\n        vec4 clip = mix(clip0, clip1, position.z);\n        vDepth = clip.z;\n        gl_Position = vec4(clip.w * (2.0 * pt/resolution - 1.0), clip.z, clip.w);\n      }",frag:"\n      precision highp float;\n      uniform vec3 color;\n      varying float vDepth;\n      void main() {\n        gl_FragColor = vec4(color * 0.75 * vDepth, 1);\n      }",cull:{enable:!0,face:"back"},attributes:{position:{buffer:i.buffer,divisor:0},pointA:{buffer:o.prop("points"),divisor:1,offset:0*Float32Array.BYTES_PER_ELEMENT,stride:6*Float32Array.BYTES_PER_ELEMENT},pointB:{buffer:o.prop("points"),divisor:1,offset:3*Float32Array.BYTES_PER_ELEMENT,stride:6*Float32Array.BYTES_PER_ELEMENT}},uniforms:{color:o.prop("color"),width:o.prop("width"),model:o.prop("model"),view:o.prop("view"),projection:o.prop("projection"),resolution:o.prop("resolution")},count:i.count,instances:o.prop("segments"),viewport:o.prop("viewport")})}export{o as i};