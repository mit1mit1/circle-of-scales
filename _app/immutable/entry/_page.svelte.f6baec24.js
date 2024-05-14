import{S as Qt,i as Wt,s as Yt,k,q as E,a as C,J as le,e as Bt,l as I,m as T,r as j,c as P,h as m,K as ne,n as s,b as oe,G as c,L as Y,u as Z,H as Lt,M as Be,N as Zt,p as De,O as he}from"../chunks/index.9fc21f1b.js";import{w as xt}from"../chunks/index.b3a1d362.js";const D=(e,t)=>{const n=e%t;return n<0?n+t:n},el=e=>{if(isNaN(e))return"NaN";const t=String(+e).split("")??[],n=["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"];let l="",a=3;for(;a--;)l=(n[+(t.pop()??"")+a*10]||"")+l;return Array(+t.join("")+1).join("M")+l},g=[{sharpNote:"C",flatNote:"C",defaultOctaveFrequency:261.63},{sharpNote:"C#",flatNote:"D♭",preferSharp:!0,defaultOctaveFrequency:277.18},{sharpNote:"D",flatNote:"D",defaultOctaveFrequency:293.66},{sharpNote:"D#",flatNote:"E♭",preferSharp:!1,defaultOctaveFrequency:311.13},{sharpNote:"E",flatNote:"E",defaultOctaveFrequency:329.63},{sharpNote:"F",flatNote:"F",defaultOctaveFrequency:349.23},{sharpNote:"F#",flatNote:"G♭",preferSharp:!0,defaultOctaveFrequency:185},{sharpNote:"G",flatNote:"G",defaultOctaveFrequency:196},{sharpNote:"G#",flatNote:"A♭",preferSharp:!1,defaultOctaveFrequency:207.65},{sharpNote:"A",flatNote:"A",defaultOctaveFrequency:220},{sharpNote:"A#",flatNote:"B♭",preferSharp:!1,defaultOctaveFrequency:233.08},{sharpNote:"A",flatNote:"B",defaultOctaveFrequency:246.94}],U=[2,2,1,2,2,2,1],te=[2,2,3,2,3],ze=[1,256/243,9/8,32/27,81/64,4/3,1024/729,3/2,128/81,27/16,16/9,243/128],tl={pentatonic:[.3,.05,.05,.2,.1],diatonic:[.3,.05,.15,.05,.075,.05,.03]},ll={pentatonic:[.5,.05,.15,.2,.05],diatonic:[.5,.02,.05,.1,.1,.05,.02]},Oe=.25,G=(e,t,n)=>{let l=0;for(let a=e;a<t;a++)l+=n[D(a,n.length)];return l},nl=(e,t)=>e===4&&t===7?"major":e===3&&t===7?"minor":e===3&&t===6?"diminished":"bizarre",al=(e,t,n)=>{const l=el(D(e+1,n.length+1)),a=e+t,u=nl(G(a,a+2,n),G(a,a+4,n));return u==="major"?l:u==="minor"?l.toLowerCase():u==="diminished"?`${l.toLowerCase()}°`:l},z=(e,t)=>{const n=[];for(let l=0;l<t.length;l++)n.push({semitonesFromRoot:G(e,e+l,t),label:al(l,e,t)});return n},Vt=(e,t)=>{const n=t+1,l=e.semitonesFromRoot-G(0,t,U);if(l===1)return`A${n}`;if([1,4,5].includes(n)){if(l===0)return`P${n}`;if(l===-1)return`d${n}`}return l===0?`M${n}`:l===-1?`m${n}`:l===-2?`d${n}`:`${e.semitonesFromRoot}s`},ol=z(0,U),sl=z(1,U),rl=z(2,U),cl=z(3,U),il=z(4,U),ul=z(5,U),hl=z(6,U),fl=[{name:"Ionian / Major",scale:ol,rootIntervalToIonian:G(0,0,U)},{name:"Dorian",scale:sl,rootIntervalToIonian:G(0,1,U)},{name:"Phrygian",scale:rl,rootIntervalToIonian:G(0,2,U)},{name:"Lydian",scale:cl,rootIntervalToIonian:G(0,3,U)},{name:"Mixolydian",scale:il,rootIntervalToIonian:G(0,4,U)},{name:"Aeolian / Natural Minor",scale:ul,rootIntervalToIonian:G(0,5,U)},{name:"Locrian",scale:hl,rootIntervalToIonian:G(0,6,U)}],dl=z(0,te),_l=z(1,te),vl=z(2,te),ml=z(3,te),gl=z(4,te),yl=[{name:"Major",scale:dl,rootIntervalToIonian:G(0,0,te)},{name:"Suspended / Egyptian",scale:_l,rootIntervalToIonian:G(0,1,te)},{name:"Blues minor / Man Gong",scale:vl,rootIntervalToIonian:G(0,2,te)},{name:"Blues major",scale:ml,rootIntervalToIonian:G(0,3,te)},{name:"Minor",scale:gl,rootIntervalToIonian:G(0,4,te)}],Le=[{label:"Diatonic",modes:fl},{label:"(Major) Pentatonic",modes:yl}],yt=xt({}),Ke=300,pt=.75,pl=12,bl=1e-6,Tl={attackTime:.1,decayTime:.3,releaseTime:.5,maxSustainTime:.2,maxGain:.1,sustainGainRatio:.1,oscillatorType:"sine"},kl=(e,t)=>{let n=1;for(;t<0;)t=t+ze.length,n=n*.5;for(;t>=ze.length;)t=t-ze.length,n=n*2;return n=n*ze[t],e.defaultOctaveFrequency*n},X=(e,t,n,l,a={})=>{if(l<n){console.log("Warning: note end time earlier than start time");return}const u={...Tl,...a};let{attackTime:r,decayTime:d}={...u};const{releaseTime:f,maxSustainTime:h,maxGain:_,sustainGainRatio:v,oscillatorType:b="triangle"}={...u},y=_*v,p=new AudioContext,O=p.createOscillator(),S=p.createGain(),be=p.createDynamicsCompressor();S.gain.value=.001,O.type=b,O.frequency.value=kl(e,t),O.connect(S).connect(be).connect(p.destination);const K=l-n;r>K/(2*1e3)&&(r=K/(2*1e3)),d+r>K/1e3&&(d=K/1e3-r);let Q=h??1e4;Q>K/1e3-r-d&&(Q=K/1e3-r-d),setTimeout(function(){const se=p.currentTime+r;S.gain.exponentialRampToValueAtTime(_,se),yt.update(W=>({...W,[D(t,g.length)]:(W[`${t}`]??0)+1})),O.start(),setTimeout(()=>{S.gain.exponentialRampToValueAtTime(y,p.currentTime+d),setTimeout(()=>{S.gain.exponentialRampToValueAtTime(bl,p.currentTime+f),yt.update(W=>{const Te=Math.max((W[`${t}`]??0)-1,0);return{...W,[D(t,g.length)]:Te}}),setTimeout(function(){O.stop(),p.close()},f*1e3+2e3)},Q*1e3)},r*1e3)},n)},Il=(e,t,n=Ke,l=pt)=>{const a=n*.5*l,u=n*.5-a,r=n*.5;[...e].forEach((d,f)=>{f===0?X(g[t],d.semitonesFromRoot,f*2*r+u,f*2*r+u+a+r):(X(g[t],0,f*2*r+u,f*2*r+u+a),X(g[t],d.semitonesFromRoot,(f*2+1)*r+u,(f*2+1)*r+u+a))}),X(g[t],0,e.length*2*r+u,e.length*2*r+u+a),X(g[t],g.length,(e.length*2+1)*r+u,(e.length*2+1)*r+u+a)},El=(e,t,n=Ke,l=pt)=>{const a=n*.5*l,u=n*.5-a,r=n*.5;X(g[t],e[0].semitonesFromRoot,u,r+u+a+r),[...e].forEach((d,f)=>{X(g[t],d.semitonesFromRoot,(f+2)*r+u,(f+2)*r+u+a+r)}),X(g[t],g.length,(e.length+2)*r+u,(e.length+2)*r+u+a),[...e].reverse().forEach((d,f)=>{X(g[t],d.semitonesFromRoot,(f+e.length+3)*r+u,(f+e.length+3)*r+u+a+r)})},jl=(e,t,n=Ke,l=pt)=>{const a=n*.5*l,u=n*.5-a,r=n*.5;X(g[t],0,u,u+r*(e.length*2+3),{maxSustainTime:r*(e.length*2+2),oscillatorType:"sine",sustainGainRatio:.5,maxGain:.0125}),[...e].forEach((d,f)=>{X(g[t],d.semitonesFromRoot,(f+2)*r+u,(f+2)*r+u+a+r)}),X(g[t],g.length,(e.length+2)*r+u,(e.length+2)*r+u+a),[...e].reverse().forEach((d,f)=>{X(g[t],d.semitonesFromRoot,(f+e.length+3)*r+u,(f+e.length+3)*r+u+a+r)})},Ml=(e,t,n,l,a=Ke,u=pl)=>{let r=0;for(;r<=u;)e.forEach((f,h)=>{if(!(h>=n.length)&&Math.random()<n[h]){const _=Math.random();let v=1;_>.8&&(v=2),_>.9&&(v=4),_>.95&&(v=6),_>.97&&(v=3),_>.99&&(v=8),X(g[t],f.semitonesFromRoot+g.length,a*r,a*r+a*Oe*v),r+=Oe}}),r+=Oe;let d=0;for(;d<=u;)e.forEach((f,h)=>{if(!(h>=l.length)&&Math.random()<l[h]){const _=Math.random();let v=1;_>.8&&(v=2),_>.9&&(v=4),_>.95&&(v=6),_>.97&&(v=3),_>.99&&(v=8),X(g[t],f.semitonesFromRoot,a*d,a*d+a*2*Oe*v),d+=2*Oe}}),d+=2*Oe};function qt(e,t,n){const l=e.slice();l[25]=t[n];const a=l[2];return l[26]=a,l}function Rt(e,t,n){const l=e.slice();l[25]=t[n];const a=l[2]+l[25].rootIntervalToIonian-l[4].rootIntervalToIonian;return l[26]=a,l}function Gt(e,t,n){const l=e.slice();return l[31]=t[n],l}function Ut(e,t,n){const l=e.slice();l[34]=t[n],l[39]=n;const a=l[1]?l[11](l[4].scale[D(l[39]-l[3].modes.findIndex(d=>d===l[4]),l[4].scale.length)].semitonesFromRoot+l[2],l[7]):l[11](l[34].semitonesFromRoot+l[2],l[7]);l[35]=a;const u=l[12](l[34],l[2],l[8]);l[36]=u;const r=l[12](l[34],l[2],l[9]);return l[37]=r,l}function Xt(e,t,n){const l=e.slice();l[40]=t[n],l[39]=n;const a=l[11](l[39],l[7]);return l[35]=a,l}function $t(e){let t,n,l,a,u,r,d,f=e[10](e[40])+"",h,_;return{c(){t=le("g"),n=le("circle"),a=le("circle"),d=le("text"),h=E(f),this.h()},l(v){t=ne(v,"g",{});var b=T(t);n=ne(b,"circle",{style:!0,cx:!0,cy:!0,r:!0,transform:!0,stroke:!0,fill:!0}),T(n).forEach(m),a=ne(b,"circle",{style:!0,cx:!0,cy:!0,r:!0,transform:!0,stroke:!0,fill:!0,opacity:!0,class:!0}),T(a).forEach(m),d=ne(b,"text",{x:!0,y:!0,class:!0,"text-anchor":!0,dy:!0});var y=T(d);h=j(y,f),y.forEach(m),b.forEach(m),this.h()},h(){De(n,"stroke-width","1.6871"),De(n,"stroke-miterlimit","10"),s(n,"cx",0),s(n,"cy",0),s(n,"r",30),s(n,"transform",`translate(${e[35].x} ${e[35].y})`),s(n,"stroke","transparent"),s(n,"fill",l=e[39]===e[2]?"yellow":"var(--base-background-color)"),De(a,"stroke-width","1.6871"),De(a,"stroke-miterlimit","10"),s(a,"cx",0),s(a,"cy",0),s(a,"r",30),s(a,"transform",`translate(${e[35].x} ${e[35].y})`),s(a,"stroke","transparent"),s(a,"fill",u=e[0][`${D(e[39]-e[2],g.length)}`]>0?"green":"var(--base-background-color)"),s(a,"opacity",r=e[0][`${D(e[39]-e[2],g.length)}`]>0?"0.5":"0"),s(a,"class","transitionAllQuick svelte-4fydyj"),s(d,"x",e[35].x),s(d,"y",e[35].y),s(d,"class",_=he(`svgNoteName ${e[13](e[39],e[2],e[4].scale)?"svgSelectedNoteName":""}`)+" svelte-4fydyj"),s(d,"text-anchor","middle"),s(d,"dy",".3em")},m(v,b){oe(v,t,b),c(t,n),c(t,a),c(t,d),c(d,h)},p(v,b){b[0]&4&&l!==(l=v[39]===v[2]?"yellow":"var(--base-background-color)")&&s(n,"fill",l),b[0]&5&&u!==(u=v[0][`${D(v[39]-v[2],g.length)}`]>0?"green":"var(--base-background-color)")&&s(a,"fill",u),b[0]&5&&r!==(r=v[0][`${D(v[39]-v[2],g.length)}`]>0?"0.5":"0")&&s(a,"opacity",r),b[0]&20&&_!==(_=he(`svgNoteName ${v[13](v[39],v[2],v[4].scale)?"svgSelectedNoteName":""}`)+" svelte-4fydyj")&&s(d,"class",_)},d(v){v&&m(t)}}}function Ht(e){let t,n,l,a,u=e[34].label+"",r,d,f,h=Vt(e[34],e[39])+"",_,v;return{c(){t=le("circle"),l=le("g"),a=le("text"),r=E(u),f=le("text"),_=E(h),this.h()},l(b){t=ne(b,"circle",{style:!0,cx:!0,cy:!0,r:!0,transform:!0,stroke:!0,fill:!0,class:!0}),T(t).forEach(m),l=ne(b,"g",{class:!0});var y=T(l);a=ne(y,"text",{x:!0,y:!0,"text-anchor":!0,dy:!0,transform:!0,class:!0});var p=T(a);r=j(p,u),p.forEach(m),f=ne(y,"text",{x:!0,y:!0,"text-anchor":!0,dy:!0,transform:!0,class:!0});var O=T(f);_=j(O,h),O.forEach(m),y.forEach(m),this.h()},h(){De(t,"stroke-width","1.6871"),De(t,"stroke-miterlimit","10"),s(t,"cx",0),s(t,"cy",0),s(t,"r",30),s(t,"transform",n=`translate(${e[35].x} ${e[35].y})`),s(t,"stroke","black"),s(t,"fill","transparent"),s(t,"class","transitionAll svelte-4fydyj"),s(a,"x",0),s(a,"y",0),s(a,"text-anchor","middle"),s(a,"dy",".3em"),s(a,"transform",d=`translate(${e[36].x} ${e[36].y})`),s(a,"class","svgNoteName scaleNote transitionAll svelte-4fydyj"),s(f,"x",0),s(f,"y",0),s(f,"text-anchor","middle"),s(f,"dy",".3em"),s(f,"transform",v=`translate(${e[37].x} ${e[37].y})`),s(f,"class","svgNoteName scaleNote transitionAll svelte-4fydyj"),s(l,"class","transitionNote")},m(b,y){oe(b,t,y),oe(b,l,y),c(l,a),c(a,r),c(l,f),c(f,_)},p(b,y){y[0]&30&&n!==(n=`translate(${b[35].x} ${b[35].y})`)&&s(t,"transform",n),y[0]&16&&u!==(u=b[34].label+"")&&Z(r,u),y[0]&20&&d!==(d=`translate(${b[36].x} ${b[36].y})`)&&s(a,"transform",d),y[0]&16&&h!==(h=Vt(b[34],b[39])+"")&&Z(_,h),y[0]&20&&v!==(v=`translate(${b[37].x} ${b[37].y})`)&&s(f,"transform",v)},d(b){b&&m(t),b&&m(l)}}}function Jt(e){let t,n=e[31].label+"",l,a,u,r,d;function f(){return e[16](e[31])}return{c(){t=k("button"),l=E(n),a=C(),this.h()},l(h){t=I(h,"BUTTON",{class:!0});var _=T(t);l=j(_,n),a=P(_),_.forEach(m),this.h()},h(){s(t,"class",u=he(e[3]===e[31]?"selectedTab":"")+" svelte-4fydyj")},m(h,_){oe(h,t,_),c(t,l),c(t,a),r||(d=Y(t,"click",f),r=!0)},p(h,_){e=h,_[0]&8&&u!==(u=he(e[3]===e[31]?"selectedTab":"")+" svelte-4fydyj")&&s(t,"class",u)},d(h){h&&m(t),r=!1,d()}}}function zt(e){let t,n,l=e[10](g[D(e[26],g.length)])+"",a,u,r=e[25].name+"",d,f,h,_,v;function b(){return e[17](e[25],e[26])}return{c(){t=k("button"),n=k("span"),a=E(l),u=C(),d=E(r),f=C(),this.h()},l(y){t=I(y,"BUTTON",{class:!0});var p=T(t);n=I(p,"SPAN",{class:!0});var O=T(n);a=j(O,l),O.forEach(m),u=P(p),d=j(p,r),f=P(p),p.forEach(m),this.h()},h(){s(n,"class","noteLabel svelte-4fydyj"),s(t,"class",h=he(e[25]===e[4]&&e[1]?"selectedTab":"")+" svelte-4fydyj")},m(y,p){oe(y,t,p),c(t,n),c(n,a),c(t,u),c(t,d),c(t,f),_||(v=Y(t,"click",b),_=!0)},p(y,p){e=y,p[0]&28&&l!==(l=e[10](g[D(e[26],g.length)])+"")&&Z(a,l),p[0]&8&&r!==(r=e[25].name+"")&&Z(d,r),p[0]&26&&h!==(h=he(e[25]===e[4]&&e[1]?"selectedTab":"")+" svelte-4fydyj")&&s(t,"class",h)},d(y){y&&m(t),_=!1,v()}}}function Kt(e){let t,n,l=e[10](g[D(e[26],g.length)])+"",a,u,r=e[25].name+"",d,f,h,_,v;function b(){return e[18](e[25],e[26])}return{c(){t=k("button"),n=k("span"),a=E(l),u=C(),d=E(r),f=C(),this.h()},l(y){t=I(y,"BUTTON",{class:!0});var p=T(t);n=I(p,"SPAN",{class:!0});var O=T(n);a=j(O,l),O.forEach(m),u=P(p),d=j(p,r),f=P(p),p.forEach(m),this.h()},h(){s(n,"class","noteLabel svelte-4fydyj"),s(t,"class",h=he(e[25]===e[4]&&!e[1]?"selectedTab":"")+" svelte-4fydyj")},m(y,p){oe(y,t,p),c(t,n),c(n,a),c(t,u),c(t,d),c(t,f),_||(v=Y(t,"click",b),_=!0)},p(y,p){e=y,p[0]&4&&l!==(l=e[10](g[D(e[26],g.length)])+"")&&Z(a,l),p[0]&8&&r!==(r=e[25].name+"")&&Z(d,r),p[0]&26&&h!==(h=he(e[25]===e[4]&&!e[1]?"selectedTab":"")+" svelte-4fydyj")&&s(t,"class",h)},d(y){y&&m(t),_=!1,v()}}}function Sl(e){let t,n=e[10](g[D(e[2],g.length)])+"",l,a,u=e[4].name+"",r,d,f,h,_,v,b,y,p,O,S,be,K,Q,se=e[10](g[D(e[2],g.length)])+"",W,Te,re,Ve,qe,ce,Re,M,A,H,$,x,Qe,Fe=e[3].label+"",Ge,We,Ye,Ze,we,ie,ke,xe,et,tt,Ie,J,fe,lt,nt,de,at,ot,_e,st,rt,ve,ct,it,Ee,je,ae,me,ut,ht,ge,Ue,ft,dt,ye,_t,vt,bt,Me=[...g],B=[];for(let i=0;i<Me.length;i+=1)B[i]=$t(Xt(e,Me,i));let Se=[...e[4].scale],L=[];for(let i=0;i<Se.length;i+=1)L[i]=Ht(Ut(e,Se,i));let Ne=Le,V=[];for(let i=0;i<Ne.length;i+=1)V[i]=Jt(Gt(e,Ne,i));let Ce=e[3].modes,q=[];for(let i=0;i<Ce.length;i+=1)q[i]=zt(Rt(e,Ce,i));let Pe=e[3].modes,R=[];for(let i=0;i<Pe.length;i+=1)R[i]=Kt(qt(e,Pe,i));return{c(){t=k("h1"),l=E(n),a=C(),r=E(u),d=C(),f=k("div"),h=le("svg"),_=le("circle");for(let i=0;i<B.length;i+=1)B[i].c();v=Bt();for(let i=0;i<L.length;i+=1)L[i].c();b=C(),y=k("div"),p=k("div"),O=E(`Root note
			`),S=k("button"),be=E("-"),K=C(),Q=k("span"),W=E(se),Te=C(),re=k("button"),Ve=E("+"),qe=C(),ce=k("div"),Re=E(`Mode type
			`);for(let i=0;i<V.length;i+=1)V[i].c();M=C(),A=k("div"),H=k("div"),$=k("div"),x=k("h2"),Qe=E("Equivalent "),Ge=E(Fe),We=E(" modes"),Ye=C();for(let i=0;i<q.length;i+=1)q[i].c();Ze=C(),we=k("div"),ie=k("div"),ke=k("h2"),xe=E("Modes by modification"),et=C();for(let i=0;i<R.length;i+=1)R[i].c();tt=C(),Ie=k("div"),J=k("div"),fe=k("button"),lt=E("▶ Scale"),nt=C(),de=k("button"),at=E("▶ Scale + Pedal"),ot=C(),_e=k("button"),st=E("▶ Scale + Drone"),rt=C(),ve=k("button"),ct=E("▶ Jam"),it=C(),Ee=k("div"),je=k("div"),ae=k("div"),me=k("button"),ut=E("-"),ht=C(),ge=k("span"),Ue=E(e[5]),ft=E(" bpm"),dt=C(),ye=k("button"),_t=E("+"),this.h()},l(i){t=I(i,"H1",{class:!0});var N=T(t);l=j(N,n),a=P(N),r=j(N,u),N.forEach(m),d=P(i),f=I(i,"DIV",{class:!0,"data-sveltekit-preload-data":!0});var o=T(f);h=ne(o,"svg",{id:!0,viewBox:!0,xmlns:!0,class:!0});var F=T(h);_=ne(F,"circle",{cx:!0,cy:!0,r:!0,stroke:!0,"stroke-width":!0,fill:!0,class:!0}),T(_).forEach(m);for(let w=0;w<B.length;w+=1)B[w].l(F);v=Bt();for(let w=0;w<L.length;w+=1)L[w].l(F);F.forEach(m),b=P(o),y=I(o,"DIV",{class:!0});var ee=T(y);p=I(ee,"DIV",{});var pe=T(p);O=j(pe,`Root note
			`),S=I(pe,"BUTTON",{class:!0});var Tt=T(S);be=j(Tt,"-"),Tt.forEach(m),K=P(pe),Q=I(pe,"SPAN",{class:!0});var kt=T(Q);W=j(kt,se),kt.forEach(m),Te=P(pe),re=I(pe,"BUTTON",{class:!0});var It=T(re);Ve=j(It,"+"),It.forEach(m),pe.forEach(m),qe=P(ee),ce=I(ee,"DIV",{});var mt=T(ce);Re=j(mt,`Mode type
			`);for(let w=0;w<V.length;w+=1)V[w].l(mt);mt.forEach(m),M=P(ee),A=I(ee,"DIV",{});var Xe=T(A);H=I(Xe,"DIV",{});var Et=T(H);$=I(Et,"DIV",{});var $e=T($);x=I($e,"H2",{class:!0});var He=T(x);Qe=j(He,"Equivalent "),Ge=j(He,Fe),We=j(He," modes"),He.forEach(m),Ye=P($e);for(let w=0;w<q.length;w+=1)q[w].l($e);$e.forEach(m),Et.forEach(m),Ze=P(Xe),we=I(Xe,"DIV",{});var jt=T(we);ie=I(jt,"DIV",{});var Je=T(ie);ke=I(Je,"H2",{class:!0});var Mt=T(ke);xe=j(Mt,"Modes by modification"),Mt.forEach(m),et=P(Je);for(let w=0;w<R.length;w+=1)R[w].l(Je);Je.forEach(m),jt.forEach(m),Xe.forEach(m),tt=P(ee),Ie=I(ee,"DIV",{class:!0});var St=T(Ie);J=I(St,"DIV",{class:!0});var ue=T(J);fe=I(ue,"BUTTON",{class:!0});var Nt=T(fe);lt=j(Nt,"▶ Scale"),Nt.forEach(m),nt=P(ue),de=I(ue,"BUTTON",{class:!0});var Ct=T(de);at=j(Ct,"▶ Scale + Pedal"),Ct.forEach(m),ot=P(ue),_e=I(ue,"BUTTON",{class:!0});var Pt=T(_e);st=j(Pt,"▶ Scale + Drone"),Pt.forEach(m),rt=P(ue),ve=I(ue,"BUTTON",{class:!0});var At=T(ve);ct=j(At,"▶ Jam"),At.forEach(m),ue.forEach(m),St.forEach(m),it=P(ee),Ee=I(ee,"DIV",{class:!0});var Ot=T(Ee);je=I(Ot,"DIV",{class:!0});var Dt=T(je);ae=I(Dt,"DIV",{});var Ae=T(ae);me=I(Ae,"BUTTON",{class:!0});var Ft=T(me);ut=j(Ft,"-"),Ft.forEach(m),ht=P(Ae),ge=I(Ae,"SPAN",{class:!0});var gt=T(ge);Ue=j(gt,e[5]),ft=j(gt," bpm"),gt.forEach(m),dt=P(Ae),ye=I(Ae,"BUTTON",{class:!0});var wt=T(ye);_t=j(wt,"+"),wt.forEach(m),Ae.forEach(m),Dt.forEach(m),Ot.forEach(m),ee.forEach(m),o.forEach(m),this.h()},h(){s(t,"class","svelte-4fydyj"),s(_,"cx",e[6].xCentre),s(_,"cy",e[6].yCentre),s(_,"r",e[6].radius),s(_,"stroke","grey"),s(_,"stroke-width",1),s(_,"fill","var(--base-background-color)"),s(_,"class","background svelte-4fydyj"),s(h,"id","boxOfNotes"),s(h,"viewBox","0 0 800 800"),s(h,"xmlns","http://www.w3.org/2000/svg"),s(h,"class","svelte-4fydyj"),s(S,"class","svelte-4fydyj"),s(Q,"class","noteLabel svelte-4fydyj"),s(re,"class","svelte-4fydyj"),s(x,"class","svelte-4fydyj"),s(ke,"class","svelte-4fydyj"),s(fe,"class","svelte-4fydyj"),s(de,"class","svelte-4fydyj"),s(_e,"class","svelte-4fydyj"),s(ve,"class","svelte-4fydyj"),s(J,"class","svelte-4fydyj"),s(Ie,"class","musicControls svelte-4fydyj"),s(me,"class","svelte-4fydyj"),s(ge,"class","noteLabel svelte-4fydyj"),s(ye,"class","svelte-4fydyj"),s(je,"class","svelte-4fydyj"),s(Ee,"class","musicControls svelte-4fydyj"),s(y,"class","boxOfButtons svelte-4fydyj"),s(f,"class","appContainer svelte-4fydyj"),s(f,"data-sveltekit-preload-data","hover")},m(i,N){oe(i,t,N),c(t,l),c(t,a),c(t,r),oe(i,d,N),oe(i,f,N),c(f,h),c(h,_);for(let o=0;o<B.length;o+=1)B[o].m(h,null);c(h,v);for(let o=0;o<L.length;o+=1)L[o].m(h,null);c(f,b),c(f,y),c(y,p),c(p,O),c(p,S),c(S,be),c(p,K),c(p,Q),c(Q,W),c(p,Te),c(p,re),c(re,Ve),c(y,qe),c(y,ce),c(ce,Re);for(let o=0;o<V.length;o+=1)V[o].m(ce,null);c(y,M),c(y,A),c(A,H),c(H,$),c($,x),c(x,Qe),c(x,Ge),c(x,We),c($,Ye);for(let o=0;o<q.length;o+=1)q[o].m($,null);c(A,Ze),c(A,we),c(we,ie),c(ie,ke),c(ke,xe),c(ie,et);for(let o=0;o<R.length;o+=1)R[o].m(ie,null);c(y,tt),c(y,Ie),c(Ie,J),c(J,fe),c(fe,lt),c(J,nt),c(J,de),c(de,at),c(J,ot),c(J,_e),c(_e,st),c(J,rt),c(J,ve),c(ve,ct),c(y,it),c(y,Ee),c(Ee,je),c(je,ae),c(ae,me),c(me,ut),c(ae,ht),c(ae,ge),c(ge,Ue),c(ge,ft),c(ae,dt),c(ae,ye),c(ye,_t),vt||(bt=[Y(S,"click",e[14]),Y(re,"click",e[15]),Y(fe,"click",e[19]),Y(de,"click",e[20]),Y(_e,"click",e[21]),Y(ve,"click",e[22]),Y(me,"click",e[23]),Y(ye,"click",e[24])],vt=!0)},p(i,N){if(N[0]&4&&n!==(n=i[10](g[D(i[2],g.length)])+"")&&Z(l,n),N[0]&16&&u!==(u=i[4].name+"")&&Z(r,u),N[0]&11413){Me=[...g];let o;for(o=0;o<Me.length;o+=1){const F=Xt(i,Me,o);B[o]?B[o].p(F,N):(B[o]=$t(F),B[o].c(),B[o].m(h,v))}for(;o<B.length;o+=1)B[o].d(1);B.length=Me.length}if(N[0]&7070){Se=[...i[4].scale];let o;for(o=0;o<Se.length;o+=1){const F=Ut(i,Se,o);L[o]?L[o].p(F,N):(L[o]=Ht(F),L[o].c(),L[o].m(h,null))}for(;o<L.length;o+=1)L[o].d(1);L.length=Se.length}if(N[0]&4&&se!==(se=i[10](g[D(i[2],g.length)])+"")&&Z(W,se),N[0]&24){Ne=Le;let o;for(o=0;o<Ne.length;o+=1){const F=Gt(i,Ne,o);V[o]?V[o].p(F,N):(V[o]=Jt(F),V[o].c(),V[o].m(ce,null))}for(;o<V.length;o+=1)V[o].d(1);V.length=Ne.length}if(N[0]&8&&Fe!==(Fe=i[3].label+"")&&Z(Ge,Fe),N[0]&1054){Ce=i[3].modes;let o;for(o=0;o<Ce.length;o+=1){const F=Rt(i,Ce,o);q[o]?q[o].p(F,N):(q[o]=zt(F),q[o].c(),q[o].m($,null))}for(;o<q.length;o+=1)q[o].d(1);q.length=Ce.length}if(N[0]&1054){Pe=i[3].modes;let o;for(o=0;o<Pe.length;o+=1){const F=qt(i,Pe,o);R[o]?R[o].p(F,N):(R[o]=Kt(F),R[o].c(),R[o].m(ie,null))}for(;o<R.length;o+=1)R[o].d(1);R.length=Pe.length}N[0]&32&&Z(Ue,i[5])},i:Lt,o:Lt,d(i){i&&m(t),i&&m(d),i&&m(f),Be(B,i),Be(L,i),Be(V,i),Be(q,i),Be(R,i),vt=!1,Zt(bt)}}}function Nl(e,t,n){const l={xCentre:400,yCentre:400,radius:300};let a={};yt.subscribe(M=>{console.log("newPlayingNotes are",M),n(0,a=M)});let u=!0;const r={...l,radius:l.radius},d={...l,radius:l.radius-70},f={...l,radius:l.radius+70};let h=0,_=Le[0],v=_.modes[0];const b=M=>M.preferSharp?M.sharpNote:M.flatNote,y=(M,A)=>({x:A.xCentre+A.radius*Math.cos(M*2*Math.PI/g.length-.5*Math.PI),y:A.yCentre+A.radius*Math.sin(M*2*Math.PI/g.length-.5*Math.PI)}),p=(M,A,H)=>({x:H.xCentre+H.radius*Math.cos((M.semitonesFromRoot+A)*2*Math.PI/g.length-.5*Math.PI),y:H.yCentre+H.radius*Math.sin((M.semitonesFromRoot+A)*2*Math.PI/g.length-.5*Math.PI)}),O=(M,A,H)=>{let $=D(M-A,g.length);return $<0&&($=$+g.length),H.some(x=>x.semitonesFromRoot===$)};let S=90;return[a,u,h,_,v,S,l,r,d,f,b,y,p,O,()=>{n(2,h=h-1),h<0&&n(2,h=h+12)},()=>{n(2,h=h+1),h>=12&&n(2,h=h-12)},M=>{_!==M&&(n(3,_=M),n(4,v=M.modes[0]))},(M,A)=>{n(4,v=M),n(2,h=D(A,g.length)),n(1,u=!0)},(M,A)=>{n(4,v=M),n(2,h=D(A,g.length)),n(1,u=!1)},()=>{El(v.scale,h,60*1e3/S)},()=>{Il(v.scale,h,60*1e3/S)},()=>{jl(v.scale,h,60*1e3/S)},()=>{Ml(v.scale,h,tl[_===Le[1]?"pentatonic":"diatonic"],ll[_===Le[1]?"pentatonic":"diatonic"],60*1e3/S)},()=>{S>10&&n(5,S=S-20)},()=>{n(5,S=S+20)}]}class Al extends Qt{constructor(t){super(),Wt(this,t,Nl,Sl,Yt,{},null,[-1,-1])}}export{Al as default};
