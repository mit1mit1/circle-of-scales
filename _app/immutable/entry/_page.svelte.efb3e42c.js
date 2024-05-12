import{S as Gt,i as Ht,s as zt,k,q as T,a as P,J as Z,e as Dt,l as I,m as b,r as N,c as D,h as d,K as x,n as i,b as ee,G as r,L as Q,u as z,H as Ft,M as Fe,N as $t,p as He,O as oe}from"../chunks/index.9fc21f1b.js";const U=(e,t)=>{const n=e%t;return n<0?n+t:n},Jt=e=>{if(isNaN(e))return"NaN";const t=String(+e).split("")??[],n=["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"];let l="",s=3;for(;s--;)l=(n[+(t.pop()??"")+s*10]||"")+l;return Array(+t.join("")+1).join("M")+l},g=[{sharpNote:"C",flatNote:"C",defaultOctaveFrequency:261.63},{sharpNote:"C#",flatNote:"D♭",preferSharp:!0,defaultOctaveFrequency:277.18},{sharpNote:"D",flatNote:"D",defaultOctaveFrequency:293.66},{sharpNote:"D#",flatNote:"E♭",preferSharp:!1,defaultOctaveFrequency:311.13},{sharpNote:"E",flatNote:"E",defaultOctaveFrequency:329.63},{sharpNote:"F",flatNote:"F",defaultOctaveFrequency:349.23},{sharpNote:"F#",flatNote:"G♭",preferSharp:!0,defaultOctaveFrequency:185},{sharpNote:"G",flatNote:"G",defaultOctaveFrequency:196},{sharpNote:"G#",flatNote:"A♭",preferSharp:!1,defaultOctaveFrequency:207.65},{sharpNote:"A",flatNote:"A",defaultOctaveFrequency:220},{sharpNote:"A#",flatNote:"B♭",preferSharp:!1,defaultOctaveFrequency:233.08},{sharpNote:"A",flatNote:"B",defaultOctaveFrequency:246.94}],X=[2,2,1,2,2,2,1],W=[2,2,3,2,3],Ge=[1,256/243,9/8,32/27,81/64,4/3,1024/729,3/2,128/81,27/16,16/9,243/128],R=(e,t,n)=>{let l=0;for(let s=e;s<t;s++)l+=n[U(s,n.length)];return l},Kt=(e,t)=>e===4&&t===7?"major":e===3&&t===7?"minor":e===3&&t===6?"diminished":"bizarre",Qt=(e,t,n)=>{const l=Jt(U(e+1,n.length+1)),s=e+t,u=Kt(R(s,s+2,n),R(s,s+4,n));return u==="major"?l:u==="minor"?l.toLowerCase():u==="diminished"?`${l.toLowerCase()}°`:l},H=(e,t)=>{const n=[];for(let l=0;l<t.length;l++)n.push({semitonesFromRoot:R(e,e+l,t),label:Qt(l,e,t)});return n},Ot=(e,t)=>{const n=t+1,l=e.semitonesFromRoot-R(0,t,X);if(l===1)return`A${n}`;if([1,4,5].includes(n)){if(l===0)return`P${n}`;if(l===-1)return`d${n}`}return l===0?`M${n}`:l===-1?`m${n}`:l===-2?`d${n}`:`${e.semitonesFromRoot}s`},Wt=H(0,X),Yt=H(1,X),Zt=H(2,X),xt=H(3,X),el=H(4,X),tl=H(5,X),ll=H(6,X),nl=[{name:"Ionian / Major",scale:Wt,rootIntervalToIonian:R(0,0,X)},{name:"Dorian",scale:Yt,rootIntervalToIonian:R(0,1,X)},{name:"Phrygian",scale:Zt,rootIntervalToIonian:R(0,2,X)},{name:"Lydian",scale:xt,rootIntervalToIonian:R(0,3,X)},{name:"Mixolydian",scale:el,rootIntervalToIonian:R(0,4,X)},{name:"Aeolian / Natural Minor",scale:tl,rootIntervalToIonian:R(0,5,X)},{name:"Locrian",scale:ll,rootIntervalToIonian:R(0,6,X)}],al=H(0,W),sl=H(1,W),ol=H(2,W),rl=H(3,W),cl=H(4,W),il=[{name:"Major",scale:al,rootIntervalToIonian:R(0,0,W)},{name:"Suspended / Egyptian",scale:sl,rootIntervalToIonian:R(0,1,W)},{name:"Blues minor / Man Gong",scale:ol,rootIntervalToIonian:R(0,2,W)},{name:"Blues major",scale:rl,rootIntervalToIonian:R(0,3,W)},{name:"Minor",scale:cl,rootIntervalToIonian:R(0,4,W)}],ft=[{label:"Diatonic",modes:nl},{label:"(Major) Pentatonic",modes:il}],_t=300,dt=.75,hl=(e,t)=>{let n=1;for(;t<0;)t=t+Ge.length,n=n*.5;for(;t>=Ge.length;)t=t-Ge.length,n=n*2;return n=n*Ge[t],e.defaultOctaveFrequency*n},j=(e,t,n,l,s=.05,u=.5,h=0,m=.1,o="triangle")=>{const f=new AudioContext,_=f.createOscillator(),S=f.createGain(),y=f.createDynamicsCompressor();S.gain.value=.001,_.type=o,_.frequency.value=hl(e,t),_.connect(S).connect(y).connect(f.destination),setTimeout(function(){S.gain.exponentialRampToValueAtTime(m,f.currentTime+s),setTimeout(()=>{S.gain.exponentialRampToValueAtTime(1e-5,f.currentTime+(l-n)/1e3+u)},h),_.start()},n),setTimeout(function(){_.stop(),f.close()},l+2e3+u*1e3)},ul=(e,t,n=_t,l=dt)=>{const s=n*l,u=n-s,h=n;[...e].forEach((m,o)=>{o===0?j(g[t],m.semitonesFromRoot,o*2*h+u,o*2*h+u+s+h):(j(g[t],0,o*2*h+u,o*2*h+u+s),j(g[t],m.semitonesFromRoot,(o*2+1)*h+u,(o*2+1)*h+u+s))}),j(g[t],0,e.length*2*h+u,e.length*2*h+u+s),j(g[t],g.length,(e.length*2+1)*h+u,(e.length*2+1)*h+u+s)},fl=(e,t,n=_t,l=dt)=>{const s=n*l,u=n-s,h=n;j(g[t],e[0].semitonesFromRoot,u,h+u+s+h),[...e].forEach((m,o)=>{j(g[t],m.semitonesFromRoot,(o+2)*h+u,(o+2)*h+u+s+h)}),j(g[t],g.length,(e.length+2)*h+u,(e.length+2)*h+u+s),[...e].reverse().forEach((m,o)=>{j(g[t],m.semitonesFromRoot,(o+e.length+3)*h+u,(o+e.length+3)*h+u+s+h)})},_l=(e,t,n=_t,l=dt)=>{const s=n*l,u=n-s,h=n;j(g[t],0,u,u+h*(e.length*2+3),.1,.2,h*(e.length*2+2),.025,"sine"),[...e].forEach((m,o)=>{j(g[t],m.semitonesFromRoot,(o+2)*h+u,(o+2)*h+u+s+h)}),j(g[t],g.length,(e.length+2)*h+u,(e.length+2)*h+u+s),[...e].reverse().forEach((m,o)=>{j(g[t],m.semitonesFromRoot,(o+e.length+3)*h+u,(o+e.length+3)*h+u+s+h)})};function At(e,t,n){const l=e.slice();l[23]=t[n];const s=l[1];return l[24]=s,l}function Lt(e,t,n){const l=e.slice();l[23]=t[n];const s=l[1]+l[23].rootIntervalToIonian-l[3].rootIntervalToIonian;return l[24]=s,l}function qt(e,t,n){const l=e.slice();return l[29]=t[n],l}function Vt(e,t,n){const l=e.slice();l[32]=t[n],l[37]=n;const s=l[0]?l[10](l[3].scale[U(l[37]-l[2].modes.findIndex(m=>m===l[3]),l[3].scale.length)].semitonesFromRoot+l[1],l[6]):l[10](l[32].semitonesFromRoot+l[1],l[6]);l[33]=s;const u=l[11](l[32],l[1],l[7]);l[34]=u;const h=l[11](l[32],l[1],l[8]);return l[35]=h,l}function wt(e,t,n){const l=e.slice();l[38]=t[n],l[37]=n;const s=l[10](l[37],l[6]);return l[33]=s,l}function Bt(e){let t,n,l,s,u=e[9](e[38])+"",h,m;return{c(){t=Z("g"),n=Z("circle"),s=Z("text"),h=T(u),this.h()},l(o){t=x(o,"g",{});var f=b(t);n=x(f,"circle",{style:!0,cx:!0,cy:!0,r:!0,transform:!0,stroke:!0,fill:!0}),b(n).forEach(d),s=x(f,"text",{x:!0,y:!0,class:!0,"text-anchor":!0,dy:!0});var _=b(s);h=N(_,u),_.forEach(d),f.forEach(d),this.h()},h(){He(n,"stroke-width","1.6871"),He(n,"stroke-miterlimit","10"),i(n,"cx",0),i(n,"cy",0),i(n,"r",30),i(n,"transform",`translate(${e[33].x} ${e[33].y})`),i(n,"stroke","transparent"),i(n,"fill",l=e[37]===e[1]?"yellow":"var(--base-background-color)"),i(s,"x",e[33].x),i(s,"y",e[33].y),i(s,"class",m=oe(`svgNoteName ${e[12](e[37],e[1],e[3].scale)?"svgSelectedNoteName":""}`)+" svelte-44cbht"),i(s,"text-anchor","middle"),i(s,"dy",".3em")},m(o,f){ee(o,t,f),r(t,n),r(t,s),r(s,h)},p(o,f){f[0]&2&&l!==(l=o[37]===o[1]?"yellow":"var(--base-background-color)")&&i(n,"fill",l),f[0]&10&&m!==(m=oe(`svgNoteName ${o[12](o[37],o[1],o[3].scale)?"svgSelectedNoteName":""}`)+" svelte-44cbht")&&i(s,"class",m)},d(o){o&&d(t)}}}function Rt(e){let t,n,l,s,u=e[32].label+"",h,m,o,f=Ot(e[32],e[37])+"",_,S;return{c(){t=Z("circle"),l=Z("g"),s=Z("text"),h=T(u),o=Z("text"),_=T(f),this.h()},l(y){t=x(y,"circle",{style:!0,cx:!0,cy:!0,r:!0,transform:!0,stroke:!0,fill:!0,class:!0}),b(t).forEach(d),l=x(y,"g",{class:!0});var v=b(l);s=x(v,"text",{x:!0,y:!0,"text-anchor":!0,dy:!0,transform:!0,class:!0});var p=b(s);h=N(p,u),p.forEach(d),o=x(v,"text",{x:!0,y:!0,"text-anchor":!0,dy:!0,transform:!0,class:!0});var M=b(o);_=N(M,f),M.forEach(d),v.forEach(d),this.h()},h(){He(t,"stroke-width","1.6871"),He(t,"stroke-miterlimit","10"),i(t,"cx",0),i(t,"cy",0),i(t,"r",30),i(t,"transform",n=`translate(${e[33].x} ${e[33].y})`),i(t,"stroke","black"),i(t,"fill","transparent"),i(t,"class","transitionAll svelte-44cbht"),i(s,"x",0),i(s,"y",0),i(s,"text-anchor","middle"),i(s,"dy",".3em"),i(s,"transform",m=`translate(${e[34].x} ${e[34].y})`),i(s,"class","svgNoteName scaleNote transitionAll svelte-44cbht"),i(o,"x",0),i(o,"y",0),i(o,"text-anchor","middle"),i(o,"dy",".3em"),i(o,"transform",S=`translate(${e[35].x} ${e[35].y})`),i(o,"class","svgNoteName scaleNote transitionAll svelte-44cbht"),i(l,"class","transitionNote")},m(y,v){ee(y,t,v),ee(y,l,v),r(l,s),r(s,h),r(l,o),r(o,_)},p(y,v){v[0]&15&&n!==(n=`translate(${y[33].x} ${y[33].y})`)&&i(t,"transform",n),v[0]&8&&u!==(u=y[32].label+"")&&z(h,u),v[0]&10&&m!==(m=`translate(${y[34].x} ${y[34].y})`)&&i(s,"transform",m),v[0]&8&&f!==(f=Ot(y[32],y[37])+"")&&z(_,f),v[0]&10&&S!==(S=`translate(${y[35].x} ${y[35].y})`)&&i(o,"transform",S)},d(y){y&&d(t),y&&d(l)}}}function Xt(e){let t,n=e[29].label+"",l,s,u,h,m;function o(){return e[15](e[29])}return{c(){t=k("button"),l=T(n),s=P(),this.h()},l(f){t=I(f,"BUTTON",{class:!0});var _=b(t);l=N(_,n),s=D(_),_.forEach(d),this.h()},h(){i(t,"class",u=oe(e[2]===e[29]?"selectedTab":"")+" svelte-44cbht")},m(f,_){ee(f,t,_),r(t,l),r(t,s),h||(m=Q(t,"click",o),h=!0)},p(f,_){e=f,_[0]&4&&u!==(u=oe(e[2]===e[29]?"selectedTab":"")+" svelte-44cbht")&&i(t,"class",u)},d(f){f&&d(t),h=!1,m()}}}function Ut(e){let t,n,l=e[9](g[U(e[24],g.length)])+"",s,u,h=e[23].name+"",m,o,f,_,S;function y(){return e[16](e[23],e[24])}return{c(){t=k("button"),n=k("span"),s=T(l),u=P(),m=T(h),o=P(),this.h()},l(v){t=I(v,"BUTTON",{class:!0});var p=b(t);n=I(p,"SPAN",{class:!0});var M=b(n);s=N(M,l),M.forEach(d),u=D(p),m=N(p,h),o=D(p),p.forEach(d),this.h()},h(){i(n,"class","noteLabel svelte-44cbht"),i(t,"class",f=oe(e[23]===e[3]&&e[0]?"selectedTab":"")+" svelte-44cbht")},m(v,p){ee(v,t,p),r(t,n),r(n,s),r(t,u),r(t,m),r(t,o),_||(S=Q(t,"click",y),_=!0)},p(v,p){e=v,p[0]&14&&l!==(l=e[9](g[U(e[24],g.length)])+"")&&z(s,l),p[0]&4&&h!==(h=e[23].name+"")&&z(m,h),p[0]&13&&f!==(f=oe(e[23]===e[3]&&e[0]?"selectedTab":"")+" svelte-44cbht")&&i(t,"class",f)},d(v){v&&d(t),_=!1,S()}}}function jt(e){let t,n,l=e[9](g[U(e[24],g.length)])+"",s,u,h=e[23].name+"",m,o,f,_,S;function y(){return e[17](e[23],e[24])}return{c(){t=k("button"),n=k("span"),s=T(l),u=P(),m=T(h),o=P(),this.h()},l(v){t=I(v,"BUTTON",{class:!0});var p=b(t);n=I(p,"SPAN",{class:!0});var M=b(n);s=N(M,l),M.forEach(d),u=D(p),m=N(p,h),o=D(p),p.forEach(d),this.h()},h(){i(n,"class","noteLabel svelte-44cbht"),i(t,"class",f=oe(e[23]===e[3]&&!e[0]?"selectedTab":"")+" svelte-44cbht")},m(v,p){ee(v,t,p),r(t,n),r(n,s),r(t,u),r(t,m),r(t,o),_||(S=Q(t,"click",y),_=!0)},p(v,p){e=v,p[0]&2&&l!==(l=e[9](g[U(e[24],g.length)])+"")&&z(s,l),p[0]&4&&h!==(h=e[23].name+"")&&z(m,h),p[0]&13&&f!==(f=oe(e[23]===e[3]&&!e[0]?"selectedTab":"")+" svelte-44cbht")&&i(t,"class",f)},d(v){v&&d(t),_=!1,S()}}}function dl(e){let t,n=e[9](g[U(e[1],g.length)])+"",l,s,u=e[3].name+"",h,m,o,f,_,S,y,v,p,M,te,Oe,Ae,re,me=e[9](g[U(e[1],g.length)])+"",Me,Le,le,qe,Ve,E,A,$,G,ce,ne,ae,ze,Pe=e[2].label+"",we,$e,Je,Ke,De,se,ge,Qe,We,Ye,be,J,ie,Ze,xe,he,et,tt,ue,lt,nt,pe,ke,Y,fe,at,st,_e,Be,ot,rt,de,ct,it,vt,Ie=[...g],L=[];for(let c=0;c<Ie.length;c+=1)L[c]=Bt(wt(e,Ie,c));let ye=[...e[3].scale],q=[];for(let c=0;c<ye.length;c+=1)q[c]=Rt(Vt(e,ye,c));let Ee=ft,V=[];for(let c=0;c<Ee.length;c+=1)V[c]=Xt(qt(e,Ee,c));let Te=e[2].modes,w=[];for(let c=0;c<Te.length;c+=1)w[c]=Ut(Lt(e,Te,c));let Ne=e[2].modes,B=[];for(let c=0;c<Ne.length;c+=1)B[c]=jt(At(e,Ne,c));return{c(){t=k("h1"),l=T(n),s=P(),h=T(u),m=P(),o=k("div"),f=Z("svg"),_=Z("circle");for(let c=0;c<L.length;c+=1)L[c].c();S=Dt();for(let c=0;c<q.length;c+=1)q[c].c();y=P(),v=k("div"),p=k("div"),M=T(`Root note
			`),te=k("button"),Oe=T("-"),Ae=P(),re=k("span"),Me=T(me),Le=P(),le=k("button"),qe=T("+"),Ve=P(),E=k("div"),A=T(`Mode type
			`);for(let c=0;c<V.length;c+=1)V[c].c();$=P(),G=k("div"),ce=k("div"),ne=k("div"),ae=k("h2"),ze=T("Equivalent "),we=T(Pe),$e=T(" modes"),Je=P();for(let c=0;c<w.length;c+=1)w[c].c();Ke=P(),De=k("div"),se=k("div"),ge=k("h2"),Qe=T("Modes by modification"),We=P();for(let c=0;c<B.length;c+=1)B[c].c();Ye=P(),be=k("div"),J=k("div"),ie=k("button"),Ze=T("▶ Scale"),xe=P(),he=k("button"),et=T("▶ Scale + Pedal"),tt=P(),ue=k("button"),lt=T("▶ Scale + Drone"),nt=P(),pe=k("div"),ke=k("div"),Y=k("div"),fe=k("button"),at=T("-"),st=P(),_e=k("span"),Be=T(e[4]),ot=T(" bpm"),rt=P(),de=k("button"),ct=T("+"),this.h()},l(c){t=I(c,"H1",{class:!0});var C=b(t);l=N(C,n),s=D(C),h=N(C,u),C.forEach(d),m=D(c),o=I(c,"DIV",{class:!0,"data-sveltekit-preload-data":!0});var a=b(o);f=x(a,"svg",{id:!0,viewBox:!0,xmlns:!0,class:!0});var F=b(f);_=x(F,"circle",{cx:!0,cy:!0,r:!0,stroke:!0,"stroke-width":!0,fill:!0,class:!0}),b(_).forEach(d);for(let O=0;O<L.length;O+=1)L[O].l(F);S=Dt();for(let O=0;O<q.length;O+=1)q[O].l(F);F.forEach(d),y=D(a),v=I(a,"DIV",{class:!0});var K=b(v);p=I(K,"DIV",{});var ve=b(p);M=N(ve,`Root note
			`),te=I(ve,"BUTTON",{class:!0});var mt=b(te);Oe=N(mt,"-"),mt.forEach(d),Ae=D(ve),re=I(ve,"SPAN",{class:!0});var gt=b(re);Me=N(gt,me),gt.forEach(d),Le=D(ve),le=I(ve,"BUTTON",{class:!0});var bt=b(le);qe=N(bt,"+"),bt.forEach(d),ve.forEach(d),Ve=D(K),E=I(K,"DIV",{});var ht=b(E);A=N(ht,`Mode type
			`);for(let O=0;O<V.length;O+=1)V[O].l(ht);ht.forEach(d),$=D(K),G=I(K,"DIV",{});var Re=b(G);ce=I(Re,"DIV",{});var pt=b(ce);ne=I(pt,"DIV",{});var Xe=b(ne);ae=I(Xe,"H2",{class:!0});var Ue=b(ae);ze=N(Ue,"Equivalent "),we=N(Ue,Pe),$e=N(Ue," modes"),Ue.forEach(d),Je=D(Xe);for(let O=0;O<w.length;O+=1)w[O].l(Xe);Xe.forEach(d),pt.forEach(d),Ke=D(Re),De=I(Re,"DIV",{});var kt=b(De);se=I(kt,"DIV",{});var je=b(se);ge=I(je,"H2",{class:!0});var It=b(ge);Qe=N(It,"Modes by modification"),It.forEach(d),We=D(je);for(let O=0;O<B.length;O+=1)B[O].l(je);je.forEach(d),kt.forEach(d),Re.forEach(d),Ye=D(K),be=I(K,"DIV",{class:!0});var yt=b(be);J=I(yt,"DIV",{class:!0});var Ce=b(J);ie=I(Ce,"BUTTON",{class:!0});var Et=b(ie);Ze=N(Et,"▶ Scale"),Et.forEach(d),xe=D(Ce),he=I(Ce,"BUTTON",{class:!0});var Tt=b(he);et=N(Tt,"▶ Scale + Pedal"),Tt.forEach(d),tt=D(Ce),ue=I(Ce,"BUTTON",{class:!0});var Nt=b(ue);lt=N(Nt,"▶ Scale + Drone"),Nt.forEach(d),Ce.forEach(d),yt.forEach(d),nt=D(K),pe=I(K,"DIV",{class:!0});var Ct=b(pe);ke=I(Ct,"DIV",{class:!0});var St=b(ke);Y=I(St,"DIV",{});var Se=b(Y);fe=I(Se,"BUTTON",{class:!0});var Mt=b(fe);at=N(Mt,"-"),Mt.forEach(d),st=D(Se),_e=I(Se,"SPAN",{class:!0});var ut=b(_e);Be=N(ut,e[4]),ot=N(ut," bpm"),ut.forEach(d),rt=D(Se),de=I(Se,"BUTTON",{class:!0});var Pt=b(de);ct=N(Pt,"+"),Pt.forEach(d),Se.forEach(d),St.forEach(d),Ct.forEach(d),K.forEach(d),a.forEach(d),this.h()},h(){i(t,"class","svelte-44cbht"),i(_,"cx",e[5].xCentre),i(_,"cy",e[5].yCentre),i(_,"r",e[5].radius),i(_,"stroke","grey"),i(_,"stroke-width",1),i(_,"fill","var(--base-background-color)"),i(_,"class","background svelte-44cbht"),i(f,"id","boxOfNotes"),i(f,"viewBox","0 0 800 800"),i(f,"xmlns","http://www.w3.org/2000/svg"),i(f,"class","svelte-44cbht"),i(te,"class","svelte-44cbht"),i(re,"class","noteLabel svelte-44cbht"),i(le,"class","svelte-44cbht"),i(ae,"class","svelte-44cbht"),i(ge,"class","svelte-44cbht"),i(ie,"class","svelte-44cbht"),i(he,"class","svelte-44cbht"),i(ue,"class","svelte-44cbht"),i(J,"class","svelte-44cbht"),i(be,"class","musicControls svelte-44cbht"),i(fe,"class","svelte-44cbht"),i(_e,"class","noteLabel svelte-44cbht"),i(de,"class","svelte-44cbht"),i(ke,"class","svelte-44cbht"),i(pe,"class","musicControls svelte-44cbht"),i(v,"class","boxOfButtons svelte-44cbht"),i(o,"class","appContainer svelte-44cbht"),i(o,"data-sveltekit-preload-data","hover")},m(c,C){ee(c,t,C),r(t,l),r(t,s),r(t,h),ee(c,m,C),ee(c,o,C),r(o,f),r(f,_);for(let a=0;a<L.length;a+=1)L[a].m(f,null);r(f,S);for(let a=0;a<q.length;a+=1)q[a].m(f,null);r(o,y),r(o,v),r(v,p),r(p,M),r(p,te),r(te,Oe),r(p,Ae),r(p,re),r(re,Me),r(p,Le),r(p,le),r(le,qe),r(v,Ve),r(v,E),r(E,A);for(let a=0;a<V.length;a+=1)V[a].m(E,null);r(v,$),r(v,G),r(G,ce),r(ce,ne),r(ne,ae),r(ae,ze),r(ae,we),r(ae,$e),r(ne,Je);for(let a=0;a<w.length;a+=1)w[a].m(ne,null);r(G,Ke),r(G,De),r(De,se),r(se,ge),r(ge,Qe),r(se,We);for(let a=0;a<B.length;a+=1)B[a].m(se,null);r(v,Ye),r(v,be),r(be,J),r(J,ie),r(ie,Ze),r(J,xe),r(J,he),r(he,et),r(J,tt),r(J,ue),r(ue,lt),r(v,nt),r(v,pe),r(pe,ke),r(ke,Y),r(Y,fe),r(fe,at),r(Y,st),r(Y,_e),r(_e,Be),r(_e,ot),r(Y,rt),r(Y,de),r(de,ct),it||(vt=[Q(te,"click",e[13]),Q(le,"click",e[14]),Q(ie,"click",e[18]),Q(he,"click",e[19]),Q(ue,"click",e[20]),Q(fe,"click",e[21]),Q(de,"click",e[22])],it=!0)},p(c,C){if(C[0]&2&&n!==(n=c[9](g[U(c[1],g.length)])+"")&&z(l,n),C[0]&8&&u!==(u=c[3].name+"")&&z(h,u),C[0]&5706){Ie=[...g];let a;for(a=0;a<Ie.length;a+=1){const F=wt(c,Ie,a);L[a]?L[a].p(F,C):(L[a]=Bt(F),L[a].c(),L[a].m(f,S))}for(;a<L.length;a+=1)L[a].d(1);L.length=Ie.length}if(C[0]&3535){ye=[...c[3].scale];let a;for(a=0;a<ye.length;a+=1){const F=Vt(c,ye,a);q[a]?q[a].p(F,C):(q[a]=Rt(F),q[a].c(),q[a].m(f,null))}for(;a<q.length;a+=1)q[a].d(1);q.length=ye.length}if(C[0]&2&&me!==(me=c[9](g[U(c[1],g.length)])+"")&&z(Me,me),C[0]&12){Ee=ft;let a;for(a=0;a<Ee.length;a+=1){const F=qt(c,Ee,a);V[a]?V[a].p(F,C):(V[a]=Xt(F),V[a].c(),V[a].m(E,null))}for(;a<V.length;a+=1)V[a].d(1);V.length=Ee.length}if(C[0]&4&&Pe!==(Pe=c[2].label+"")&&z(we,Pe),C[0]&527){Te=c[2].modes;let a;for(a=0;a<Te.length;a+=1){const F=Lt(c,Te,a);w[a]?w[a].p(F,C):(w[a]=Ut(F),w[a].c(),w[a].m(ne,null))}for(;a<w.length;a+=1)w[a].d(1);w.length=Te.length}if(C[0]&527){Ne=c[2].modes;let a;for(a=0;a<Ne.length;a+=1){const F=At(c,Ne,a);B[a]?B[a].p(F,C):(B[a]=jt(F),B[a].c(),B[a].m(se,null))}for(;a<B.length;a+=1)B[a].d(1);B.length=Ne.length}C[0]&16&&z(Be,c[4])},i:Ft,o:Ft,d(c){c&&d(t),c&&d(m),c&&d(o),Fe(L,c),Fe(q,c),Fe(V,c),Fe(w,c),Fe(B,c),it=!1,$t(vt)}}}function vl(e,t,n){const l={xCentre:400,yCentre:400,radius:300};let s=!0;const u={...l,radius:l.radius},h={...l,radius:l.radius-70},m={...l,radius:l.radius+70};let o=0,f=ft[0],_=f.modes[0];const S=E=>E.preferSharp?E.sharpNote:E.flatNote,y=(E,A)=>({x:A.xCentre+A.radius*Math.cos(E*2*Math.PI/g.length-.5*Math.PI),y:A.yCentre+A.radius*Math.sin(E*2*Math.PI/g.length-.5*Math.PI)}),v=(E,A,$)=>({x:$.xCentre+$.radius*Math.cos((E.semitonesFromRoot+A)*2*Math.PI/g.length-.5*Math.PI),y:$.yCentre+$.radius*Math.sin((E.semitonesFromRoot+A)*2*Math.PI/g.length-.5*Math.PI)}),p=(E,A,$)=>{let G=U(E-A,g.length);return G<0&&(G=G+g.length),$.some(ce=>ce.semitonesFromRoot===G)};let M=120;return[s,o,f,_,M,l,u,h,m,S,y,v,p,()=>{n(1,o=o-1),o<0&&n(1,o=o+12)},()=>{n(1,o=o+1),o>=12&&n(1,o=o-12)},E=>{f!==E&&(n(2,f=E),n(3,_=E.modes[0]))},(E,A)=>{n(3,_=E),n(1,o=U(A,g.length)),n(0,s=!0)},(E,A)=>{n(3,_=E),n(1,o=U(A,g.length)),n(0,s=!1)},()=>{fl(_.scale,o,60*1e3/M)},()=>{ul(_.scale,o,60*1e3/M)},()=>{_l(_.scale,o,60*1e3/M)},()=>{M>10&&n(4,M=M-20)},()=>{n(4,M=M+20)}]}class gl extends Gt{constructor(t){super(),Ht(this,t,vl,dl,zt,{},null,[-1,-1])}}export{gl as default};
