var o=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,e=Object.prototype.propertyIsEnumerable,s=(t,r,i)=>r in t?o(t,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[r]=i,p=(o,t)=>{for(var r in t||(t={}))n.call(t,r)&&s(o,r,t[r]);if(i)for(var r of i(t))e.call(t,r)&&s(o,r,t[r]);return o};import"./modulepreload-polyfill.b7f2da20.js";import{f as a,R as c,d as l,m as h,c as u,s as g,A as m,t as f,l as v,b as d,g as w,a as b,h as j,i as y,n as O,p as P}from"./vendor.568513fe.js";import{i as N}from"./lines.183e1680.js";const _=[{start:a(.5,-.5,.5),right:a(0,0,-1),up:a(0,1,0)},{start:a(-.5,-.5,-.5),right:a(0,0,1),up:a(0,1,0)},{start:a(-.5,.5,.5),right:a(1,0,0),up:a(0,0,-1)},{start:a(-.5,-.5,-.5),right:a(1,0,0),up:a(0,0,1)},{start:a(-.5,-.5,.5),right:a(1,0,0),up:a(0,1,0)},{start:a(.5,-.5,-.5),right:a(-1,0,0),up:a(0,1,0)}];function A(o,t,r,i,n,e,s){const p=[];for(let a=0;a<e;a++)for(let c=0;c<s;c++){const l=g(u(),o,t,i*a/e);g(l,l,r,n*c/s);const h=g(u(),l,t,i/e),m=g(u(),h,r,n/s),f=g(u(),l,r,n/s);p.push(l,h,m,l,m,f)}return p}function E(o,t,r){const i=h(u(),t,a(.5,.5,.5));w(i,i,[r,r,r]);const n=h(u(),t,a(-.5,-.5,-.5));b(n,n,[r,r,r]);const e=j(u(),n,o);y(e,i,e);const s=O(u(),w(u(),o,e));return{normal:s,position:g(u(),e,s,r)}}const x=c({extensions:["ANGLE_instanced_arrays"]}),z=document.getElementsByTagName("canvas")[0],F=N(x,8),I=x({vert:"\n      precision highp float;\n      attribute vec3 position, normal;\n      uniform mat4 model, view, projection;\n      varying vec3 vNormal;\n      void main() {\n        gl_Position = projection * view * model * vec4(position, 1);\n        vNormal = vec3(model * vec4(normal, 1));\n      }",frag:"\n      precision highp float;\n      varying vec3 vNormal;\n      void main() {\n        float light = 0.5 + 0.5 * dot(normalize(vNormal), normalize(vec3(1,0.5,0.5)));\n        gl_FragColor = vec4(vec3(light), 1.0);\n      }",attributes:{position:x.prop("positions"),normal:x.prop("normals")},uniforms:{model:x.prop("model"),view:x.prop("view"),projection:x.prop("projection")},cull:{enable:!0,face:"back"},count:x.prop("count"),viewport:x.prop("viewport")}),k=[],q=a(1,1.25,1.5);for(const L of _){const o=[],t=l(h(u(),L.right,q)),r=l(h(u(),L.up,q)),i=h(u(),L.start,q),n=g(u(),i,L.right,.25),e=g(u(),i,L.right,t-.25),s=g(u(),i,L.up,.25),p=g(u(),s,L.right,.25),a=g(u(),s,L.right,t-.25),c=g(u(),i,L.up,r-.25),m=g(u(),c,L.right,.25),f=g(u(),c,L.right,t-.25);o.push(...A(i,L.right,L.up,.25,.25,5,5)),o.push(...A(e,L.right,L.up,.25,.25,5,5)),o.push(...A(c,L.right,L.up,.25,.25,5,5)),o.push(...A(f,L.right,L.up,.25,.25,5,5)),o.push(...A(s,L.right,L.up,.25,r-.5,5,1)),o.push(...A(a,L.right,L.up,.25,r-.5,5,1)),o.push(...A(n,L.right,L.up,t-.5,.25,1,5)),o.push(...A(m,L.right,L.up,t-.5,.25,1,5)),o.push(...A(p,L.right,L.up,t-.5,r-.5,1,1));const v=[];for(const l of o){const o=E(l,q,.25);l[0]=o.position[0],l[1]=o.position[1],l[2]=o.position[2],v.push(o.normal)}k.push({positions:o,normals:v})}const B=[];for(const L of k){const o=L.positions;for(let t=0;t<o.length;t+=3)B.push(o[t+0].slice(),o[t+1].slice(),o[t+1].slice(),o[t+2].slice(),o[t+2].slice(),o[t+0].slice())}for(const L of B)m(L,L,1.001);const C=x.buffer(B),D=new f(z);D.spin(1,1);const G=v(d(),[0,0,2],[0,0,0],[0,1,0]);!function o(){const i=P(d(),Math.PI/2.5,z.width/z.height,.1,100),n={x:0,y:0,width:z.width,height:z.height};x.clear({color:[1,1,1,1],depth:1}),F({points:C,color:[.5,.5,.5],width:2,segments:B.length/2,resolution:[z.width,z.height],model:D.rotation,view:G,projection:i,viewport:n});for(const a of k)I((e=p({},a),s={model:D.rotation,view:G,projection:i,viewport:n,count:a.positions.length},t(e,r(s))));var e,s;requestAnimationFrame(o)}();
