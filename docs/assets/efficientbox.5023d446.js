import"./modulepreload-polyfill.b7f2da20.js";import{f as t,R as s,d as o,m as n,c as i,s as r,t as e,l as a,b as h,g as p,a as c,h as u,i as f,n as l,p as g}from"./vendor.568513fe.js";import{i as m}from"./lines.183e1680.js";const d=[{start:t(.5,-.5,.5),right:t(0,0,-1),up:t(0,1,0)},{start:t(-.5,-.5,-.5),right:t(0,0,1),up:t(0,1,0)},{start:t(-.5,.5,.5),right:t(1,0,0),up:t(0,0,-1)},{start:t(-.5,-.5,-.5),right:t(1,0,0),up:t(0,0,1)},{start:t(-.5,-.5,.5),right:t(1,0,0),up:t(0,1,0)},{start:t(.5,-.5,-.5),right:t(-1,0,0),up:t(0,1,0)}];function w(t,s,o,n,e,a,h){const p=[];for(let c=0;c<a;c++)for(let u=0;u<h;u++){const f=r(i(),t,s,n*c/a);r(f,f,o,e*u/h);const l=r(i(),f,s,n/a),g=r(i(),l,o,e/h),m=r(i(),f,o,e/h);p.push(f,l,g,f,g,m)}return p}function y(s,o,e){const a=n(i(),o,t(.5,.5,.5));p(a,a,[e,e,e]);const h=n(i(),o,t(-.5,-.5,-.5));c(h,h,[e,e,e]);const g=u(i(),h,s);f(g,a,g);const m=l(i(),p(i(),s,g));return{normal:m,position:r(i(),g,m,e)}}const j=s({extensions:["ANGLE_instanced_arrays"]}),v=document.getElementsByTagName("canvas")[0];v.style.touchAction="none";const b=m(j,8),A=[],x=t(1,1.25,1.5);for(const B of d){const{up:t,right:s,start:e}=B,a=[],h=o(n(i(),s,x)),p=o(n(i(),t,x)),c=n(i(),e,x),u=r(i(),c,s,.25),f=r(i(),c,s,h-.25),l=r(i(),c,t,.25),g=r(i(),l,s,.25),m=r(i(),l,s,h-.25),d=r(i(),c,t,p-.25),j=r(i(),d,s,.25),v=r(i(),d,s,h-.25);a.push(...w(c,s,t,.25,.25,5,5)),a.push(...w(f,s,t,.25,.25,5,5)),a.push(...w(d,s,t,.25,.25,5,5)),a.push(...w(v,s,t,.25,.25,5,5)),a.push(...w(l,s,t,.25,p-.5,5,1)),a.push(...w(m,s,t,.25,p-.5,5,1)),a.push(...w(u,s,t,h-.5,.25,1,5)),a.push(...w(j,s,t,h-.5,.25,1,5)),a.push(...w(g,s,t,h-.5,p-.5,1,1));for(const o of a){const t=y(o,x,.25);o[0]=t.position[0],o[1]=t.position[1],o[2]=t.position[2]}A.push({positions:a})}const E=[];for(const B of A){const t=B.positions;for(let s=0;s<t.length;s+=3)E.push(t[s+0],t[s+1],t[s+1],t[s+2],t[s+2],t[s+0])}const N=j.buffer(E),_=new e(v);_.spin(1,1);const q=a(h(),[0,0,2],[0,0,0],[0,1,0]);!function t(){const s=g(h(),Math.PI/2.5,v.width/v.height,.1,100),o={x:0,y:0,width:v.width,height:v.height};j.clear({color:[1,1,1,1],depth:1}),b({points:N,color:[.5,.5,.5],width:2,segments:E.length/2,resolution:[v.width,v.height],model:_.rotation,view:q,projection:s,viewport:o}),requestAnimationFrame(t)}();