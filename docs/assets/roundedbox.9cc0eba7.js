import"./modulepreload-polyfill.b7f2da20.js";import{f as t,R as s,m as o,c as n,d as i,e as r,t as e,l as a,b as c,s as h,g as p,a as u,h as f,i as l,n as g,p as m}from"./vendor.568513fe.js";import{i as d}from"./lines.183e1680.js";const w=[{start:t(.5,-.5,.5),right:t(0,0,-1),up:t(0,1,0)},{start:t(-.5,-.5,-.5),right:t(0,0,1),up:t(0,1,0)},{start:t(-.5,.5,.5),right:t(1,0,0),up:t(0,0,-1)},{start:t(-.5,-.5,-.5),right:t(1,0,0),up:t(0,0,1)},{start:t(-.5,-.5,.5),right:t(1,0,0),up:t(0,1,0)},{start:t(.5,-.5,-.5),right:t(-1,0,0),up:t(0,1,0)}];function y(t,s,o,i,r,e,a){const c=[];for(let p=0;p<e;p++)for(let u=0;u<a;u++){const f=h(n(),t,s,i*p/e);h(f,f,o,r*u/a);const l=h(n(),f,s,i/e),g=h(n(),l,o,r/a),m=h(n(),f,o,r/a);c.push(f,l,g,f,g,m)}return c}function j(s,i,r){const e=o(n(),i,t(.5,.5,.5));p(e,e,[r,r,r]);const a=o(n(),i,t(-.5,-.5,-.5));u(a,a,[r,r,r]);const c=f(n(),a,s);l(c,e,c);const m=g(n(),p(n(),s,c));return{normal:m,position:h(n(),c,m,r)}}const v=s({extensions:["ANGLE_instanced_arrays"]}),b=document.getElementsByTagName("canvas")[0];b.style.touchAction="none";const A=d(v,8),x=[],E=t(1,1.25,1.5);for(const F of w){const t=o(n(),F.start,E),s=i(o(n(),F.right,E)),e=i(o(n(),F.up,E)),a=y(t,F.right,F.up,s,e,16,16);for(const o of a){r(o,j(o,E,.25).position)}x.push({positions:a})}const N=[];for(const F of x){const t=F.positions;for(let s=0;s<t.length;s+=3)N.push(t[s+0],t[s+1],t[s+1],t[s+2],t[s+2],t[s+0])}const _=v.buffer(N),q=new e(b);q.spin(1,1);const B=a(c(),[0,0,2],[0,0,0],[0,1,0]);!function t(){const s=m(c(),Math.PI/2.5,b.width/b.height,.1,100),o={x:0,y:0,width:b.width,height:b.height};v.clear({color:[1,1,1,1],depth:1}),A({points:_,color:[.5,.5,.5],width:2,segments:N.length/2,resolution:[b.width,b.height],model:q.rotation,view:B,projection:s,viewport:o}),requestAnimationFrame(t)}();
