import"./modulepreload-polyfill.b7f2da20.js";import{f as t,R as o,t as s,l as n,b as e,s as i,c as r,p as a}from"./vendor.568513fe.js";import{i as h}from"./lines.183e1680.js";const c=[{start:t(.5,-.5,.5),right:t(0,0,-1),up:t(0,1,0)},{start:t(-.5,-.5,-.5),right:t(0,0,1),up:t(0,1,0)},{start:t(-.5,.5,.5),right:t(1,0,0),up:t(0,0,-1)},{start:t(-.5,-.5,-.5),right:t(1,0,0),up:t(0,0,1)},{start:t(-.5,-.5,.5),right:t(1,0,0),up:t(0,1,0)},{start:t(.5,-.5,-.5),right:t(-1,0,0),up:t(0,1,0)}];function p(t,o,s,n,e,a,h){const c=[];for(let p=0;p<a;p++)for(let l=0;l<h;l++){const u=i(r(),t,o,n*p/a);i(u,u,s,e*l/h);const f=i(r(),u,o,n/a),g=i(r(),f,s,e/h),d=i(r(),u,s,e/h);c.push(u,f,g,u,g,d)}return c}const l=o({extensions:["ANGLE_instanced_arrays"]}),u=document.getElementsByTagName("canvas")[0];u.style.touchAction="none";const f=h(l,8),g=[];for(const j of c){const t=p(j.start,j.right,j.up,1,1,16,16);g.push({positions:t})}const d=[];for(const j of g){const t=j.positions;for(let o=0;o<t.length;o+=3)d.push(t[o+0],t[o+1],t[o+1],t[o+2],t[o+2],t[o+0])}const m=l.buffer(d),w=new s(u);w.spin(1,1);const y=n(e(),[0,0,2],[0,0,0],[0,1,0]);!function t(){const o=a(e(),Math.PI/3,u.width/u.height,.1,100),s={x:0,y:0,width:u.width,height:u.height};l.clear({color:[1,1,1,1],depth:1}),f({points:m,color:[.5,.5,.5],width:2,segments:d.length/2,resolution:[u.width,u.height],model:w.rotation,view:y,projection:o,viewport:s}),requestAnimationFrame(t)}();
