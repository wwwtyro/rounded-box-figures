import"./modulepreload-polyfill.b7f2da20.js";import{f as t,R as s,d as o,m as n,c as i,s as r,t as a,l as e,b as h,g as p,a as c,h as u,i as f,n as l,p as g}from"./vendor.568513fe.js";import{i as m}from"./lines.183e1680.js";const d=[{start:t(.5,-.5,.5),right:t(0,0,-1),up:t(0,1,0)},{start:t(-.5,-.5,-.5),right:t(0,0,1),up:t(0,1,0)},{start:t(-.5,.5,.5),right:t(1,0,0),up:t(0,0,-1)},{start:t(-.5,-.5,-.5),right:t(1,0,0),up:t(0,0,1)},{start:t(-.5,-.5,.5),right:t(1,0,0),up:t(0,1,0)},{start:t(.5,-.5,-.5),right:t(-1,0,0),up:t(0,1,0)}];function w(t,s,o,n,a,e,h){const p=[];for(let c=0;c<e;c++)for(let u=0;u<h;u++){const f=r(i(),t,s,n*c/e);r(f,f,o,a*u/h);const l=r(i(),f,s,n/e),g=r(i(),l,o,a/h),m=r(i(),f,o,a/h);p.push(f,l,g,f,g,m)}return p}function j(s,o,a){const e=n(i(),o,t(.5,.5,.5));p(e,e,[a,a,a]);const h=n(i(),o,t(-.5,-.5,-.5));c(h,h,[a,a,a]);const g=u(i(),h,s);f(g,e,g);const m=l(i(),p(i(),s,g));return{normal:m,position:r(i(),g,m,a)}}const v=s({extensions:["ANGLE_instanced_arrays"]}),y=document.getElementsByTagName("canvas")[0],b=m(v,8),x=[],A=t(1,1.25,1.5);for(const B of d){const{up:t,right:s,start:a}=B,e=[],h=o(n(i(),s,A)),p=o(n(i(),t,A)),c=n(i(),a,A),u=r(i(),c,s,.25),f=r(i(),c,s,h-.25),l=r(i(),c,t,.25),g=r(i(),l,s,.25),m=r(i(),l,s,h-.25),d=r(i(),c,t,p-.25),v=r(i(),d,s,.25),y=r(i(),d,s,h-.25);e.push(...w(c,s,t,.25,.25,5,5)),e.push(...w(f,s,t,.25,.25,5,5)),e.push(...w(d,s,t,.25,.25,5,5)),e.push(...w(y,s,t,.25,.25,5,5)),e.push(...w(l,s,t,.25,p-.5,5,1)),e.push(...w(m,s,t,.25,p-.5,5,1)),e.push(...w(u,s,t,h-.5,.25,1,5)),e.push(...w(v,s,t,h-.5,.25,1,5)),e.push(...w(g,s,t,h-.5,p-.5,1,1));for(const o of e){const t=j(o,A,.25);o[0]=t.position[0],o[1]=t.position[1],o[2]=t.position[2]}x.push({positions:e})}const E=[];for(const B of x){const t=B.positions;for(let s=0;s<t.length;s+=3)E.push(t[s+0],t[s+1],t[s+1],t[s+2],t[s+2],t[s+0])}const N=v.buffer(E),_=new a(y);_.spin(1,1);const q=e(h(),[0,0,2],[0,0,0],[0,1,0]);!function t(){const s=g(h(),Math.PI/2.5,y.width/y.height,.1,100),o={x:0,y:0,width:y.width,height:y.height};v.clear({color:[1,1,1,1],depth:1}),b({points:N,color:[.5,.5,.5],width:2,segments:E.length/2,resolution:[y.width,y.height],model:_.rotation,view:q,projection:s,viewport:o}),requestAnimationFrame(t)}();