import{a as F}from"./chunk-AQYB5AY4.js";import{a as j}from"./chunk-WQSF7HY6.js";import{a as V}from"./chunk-6OOIMU7O.js";import"./chunk-GLYEPYP4.js";import{A as l,C as r,D as b,E as v,J as w,K as k,L as O,M,N as P,O as A,P as S,V as E,i as C,k as d,l as p,la as I,o as y,p as m,q as s,r as x,s as _,t as c,v as n,w as i,x as g,y as u,z as h}from"./chunk-BA2Q4JWY.js";var T=o=>({"letra-presionada":o});function U(o,f){if(o&1){let t=u();n(0,"button",16),h("click",function(){let e=d(t).$implicit,z=l(2);return p(z.comprobar(e))}),r(1),i()}if(o&2){let t=f.$implicit,a=l(2);c("ngClass",O(2,T,a.presionadas.has(t))),s(),v(" ",t.toUpperCase()," ")}}function D(o,f){if(o&1&&(n(0,"div",5)(1,"div",14),_(2,U,2,4,"button",15),i()()),o&2){let t=l();s(2),c("ngForOf",t.letras)}}function J(o,f){if(o&1){let t=u();n(0,"div",17)(1,"div",6)(2,"h1"),r(3,"Adivinaste! \u{1F917}"),i(),n(4,"div",18)(5,"button",19),h("click",function(){d(t);let e=l();return p(e.goTo("home"))}),r(6,"Ir a home"),i(),n(7,"span"),r(8,"|"),i(),n(9,"button",19),h("click",function(){d(t);let e=l();return p(e.reiniciar())}),r(10,"Volver a jugar"),i()()()()}}function R(o,f){if(o&1){let t=u();n(0,"div",20)(1,"div",6)(2,"h3"),r(3,"Perdiste \u{1F494}"),i(),n(4,"h4"),r(5),i(),n(6,"div",18)(7,"button",19),h("click",function(){d(t);let e=l();return p(e.goTo("home"))}),r(8,"Ir a home"),i(),n(9,"span"),r(10,"|"),i(),n(11,"button",19),h("click",function(){d(t);let e=l();return p(e.reiniciar())}),r(12,"Volver a jugar"),i()()()()}if(o&2){let t=l();s(5),v("La palabra correcta era: ",t.palabra,"")}}var B=(()=>{class o{constructor(t,a){this.router=t,this.puntajeService=a,this.letra="",this.title="Ahorcado",this.palabras=["cortina","secador","pulover","teclado"],this.palabra=this.palabras[Math.floor(Math.random()*this.palabras.length)],this.palabraOculta="_ ".repeat(this.palabra.length),this.intentos=0,this.gano=!1,this.perdio=!1,this.intentosFallidos="\u{1F497} \u{1F497} \u{1F497} \u{1F497} \u{1F497} \u{1F497} ",this.imagenAhorcado="../../../assets/ahorcado/ahorcado_0.png",this.presionadas=new Set,this.letras=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]}enviarLetra(t){/^[a-zA-Z]$/.test(this.letra)?this.comprobar(this.letra.toUpperCase()):console.log("Ingrese una letra v\xE1lida."),this.letra=""}comprobar(t){this.existeLetra(t);let a=this.palabraOculta.split(" ");for(let e=0;e<this.palabra.length;e++)this.palabra[e]===t&&(a[e]=t);this.presionadas.add(t),this.palabraOculta=a.join(" "),this.verificaGanador(),this.actualizarVidas()}verificaGanador(){this.palabraOculta.split(" ").join("")===this.palabra&&(this.gano=!0,console.log("Usuario GANO"),this.puntajeService.guardarPuntos("Ahorcado",(6-this.intentos).toString())),this.intentos===6&&(this.perdio=!0,console.log("Usuario perdio"))}actualizarVidas(){this.intentosFallidos="";for(let t=0;t<6-this.intentos;t++)this.intentosFallidos+="\u{1F497} ";this.imagenAhorcado=`../../../assets/ahorcado/ahorcado_${this.intentos}.png`}existeLetra(t){this.palabra.indexOf(t)>=0||this.intentos++}goTo(t=""){t==="home"&&this.router.navigate(["/home"])}reiniciar(){this.palabra=this.palabras[Math.floor(Math.random()*this.palabras.length)],this.intentos=0,this.gano=!1,this.perdio=!1,this.intentosFallidos="\u{1F497} \u{1F497} \u{1F497} \u{1F497} \u{1F497} \u{1F497} \u{1F497} \u{1F497} \u{1F497} ",this.palabraOculta="_ ".repeat(this.palabra.length),this.imagenAhorcado="../../../assets/ahorcado/ahorcado_0.png",this.presionadas.clear()}static{this.\u0275fac=function(a){return new(a||o)(x(E),x(F))}}static{this.\u0275cmp=C({type:o,selectors:[["app-ahorcado"]],standalone:!0,features:[w([]),k],decls:29,vars:6,consts:[["charset","utf-8"],["rel","stylesheet","href",m`https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css`,"integrity","sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm","crossorigin","anonymous"],["rel","preconnect","href",m`https://fonts.googleapis.com`],["rel","preconnect","href",m`https://fonts.gstatic.com`,"crossorigin",""],["href",m`https://fonts.googleapis.com/css2?family=Bitter:wght@100&family=Jersey+10+Charted&family=Jersey+15&family=Jersey+20+Charted&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap`,"rel","stylesheet"],[1,"row"],[1,"col","text-center"],["id","titulo",1,"text-primary"],["alt","Imagen del ahorcado",3,"src"],["id","palabra-oculta"],["class","row",4,"ngIf"],["class","row","id","gano",4,"ngIf"],["class","row","id","perdio",4,"ngIf"],["id","intentos",1,"row"],["id","teclado",1,"col","text-center"],["class","btn-teclado",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"btn-teclado",3,"click","ngClass"],["id","gano",1,"row"],[1,"container"],["type","submit",3,"click"],["id","perdio",1,"row"]],template:function(a,e){a&1&&(g(0,"meta",0),n(1,"head"),g(2,"link",1)(3,"link",2)(4,"link",3)(5,"link",4),i(),n(6,"body")(7,"div",5)(8,"div",6)(9,"h1",7),r(10,"Ahorcado"),i()()(),n(11,"div")(12,"div",6),g(13,"img",8),i()(),n(14,"div")(15,"div",9)(16,"h1"),r(17),i()()(),_(18,D,3,1,"div",10)(19,J,11,0,"div",11)(20,R,13,1,"div",12),n(21,"div",13)(22,"div",6)(23,"h3"),r(24,"Intentos: "),n(25,"small"),r(26),i()()()(),g(27,"app-navbar")(28,"app-chat"),i()),a&2&&(s(13),c("src",e.imagenAhorcado,y),s(4),b(e.palabraOculta),s(),c("ngIf",!e.gano&&!e.perdio),s(),c("ngIf",e.gano),s(),c("ngIf",e.perdio),s(6),b(e.intentosFallidos))},dependencies:[I,S,M,P,A,V,j],styles:['#background[_ngcontent-%COMP%]{width:100%;height:100vh;background-size:cover;background-image:url("./media/login-desktop2-RMQDQUJU.jpg");background-repeat:no-repeat}body[_ngcontent-%COMP%]{width:100%;height:100vh;background-size:cover;background-image:url("./media/login-desktop2-RMQDQUJU.jpg");background-repeat:no-repeat}#titulo[_ngcontent-%COMP%]{padding-top:15px;color:#fff!important;font-family:"Jersey 10 Charted",sans-serif;font-size:50px;display:inline-block}#palabra-oculta[_ngcontent-%COMP%]{font-size:21px;border-color:#ff90f8;background-color:#d732ab;color:#fff;border-radius:8px;box-shadow:0 0 10px #fe83f2bf;display:inline-block;margin:10px auto;padding:10px 30px}#gano[_ngcontent-%COMP%], #perdio[_ngcontent-%COMP%]{background-color:#ee1fbe80;color:#fff;width:300px;height:200px;text-align:center;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;justify-content:center;align-items:center}div[_ngcontent-%COMP%]{text-align:center;color:#fff}#teclado[_ngcontent-%COMP%]{justify-content:center;align-items:center;height:100%}.btn-teclado[_ngcontent-%COMP%]{border-radius:5px;color:#fff;font-size:30px;background:#f766d0;padding:10px 20px;margin:5px;text-decoration:none}.btn-teclado[_ngcontent-%COMP%]:hover{cursor:pointer;background:#f20cc4}.letra-presionada[_ngcontent-%COMP%]{background-color:#92199267;cursor:not-allowed;pointer-events:none}#intentos[_ngcontent-%COMP%]{font-family:sans-serif;position:fixed;bottom:0;left:0;width:100%;text-align:center;display:flex;justify-content:center;align-items:center;background-color:#ee1fbe80}button[_ngcontent-%COMP%], span[_ngcontent-%COMP%]{background:none;color:#fff;border:none;padding:5px;font-weight:700}button[_ngcontent-%COMP%]:hover{cursor:pointer;text-decoration:underline}img[_ngcontent-%COMP%]{width:100%;max-width:300px;height:auto;margin:20px auto}@media only screen and (max-width: 768px){#titulo[_ngcontent-%COMP%]{font-size:35px}#palabra-oculta[_ngcontent-%COMP%]{font-size:15px;padding:8px 20px}.btn-teclado[_ngcontent-%COMP%]{font-size:20px;padding:8px 16px}#gano[_ngcontent-%COMP%], #perdio[_ngcontent-%COMP%]{width:250px;height:150px}img[_ngcontent-%COMP%]{max-width:100px}#intentos[_ngcontent-%COMP%]{font-size:14px}}']})}}return o})();export{B as AhorcadoComponent};