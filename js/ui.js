/* ===== UI HELPERS shared by all screens ===== */
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cap=n=>(ST.find(s=>s[0]==n)||["",""])[1];
const slog=n=>SL[n]||"Pride of Naija";
const age=d=>{if(!d)return 0;const b=new Date(d),t=new Date();let a=t.getFullYear()-b.getFullYear();if(t<new Date(t.getFullYear(),b.getMonth(),b.getDate()))a--;return a};
const slug=n=>n.toLowerCase().replace(/[^a-z]+/g,"-");

const flag=(w=44)=>`<svg width="${w}" height="${Math.round(w*.7)}" viewBox="0 0 30 21" role="img" aria-label="Nigerian flag"><rect width="30" height="21" rx="4" fill="#0a8a4f"/><rect x="10" width="10" height="21" fill="#fff"/></svg>`;
// Shows your image if the file exists in assets/images, otherwise the emoji.
const pic=(file,fb,size=44)=>`<span class="pic" style="--s:${size}px"><i>${fb}</i><img src="assets/images/${file}" alt="" onerror="this.remove()"></span>`;
const brand=()=>`<div class="c" style="margin:12px 0">${flag()}<h1 style="font-size:30px">Naija<b>Web</b></h1><p class="m">Explore • Learn • Connect</p></div>`;
const avatar=(g,size)=>pic(g=="Female"?"avatar-f.png":"avatar-m.png",g=="Female"?"👩🏾":"👨🏾",size);

const R=()=>{
  const a=$("#app");a.className=U.v=="admin"?"w":"";
  a.innerHTML=(VIEWS[U.v]||VIEWS.login)()+(U.modal?`<div class="mod"><div class="card" role="dialog">${U.modal}</div></div>`:"")+(["community","chatlist","chat","profile"].includes(U.v)?nav():"");
};
const go=v=>{U.v=v;U.menu=false;U.modal="";U.err="";R();scrollTo(0,0)};
const openModal=h=>{U.modal=h;R()};
const closeModal=()=>{U.modal="";R()};
const notice=t=>openModal(`<p>${t}</p><button class="full" onclick="closeModal()">OK</button>`);

const nav=()=>`<div class="nav">${[["community","🏠","Community"],["chatlist","💬","Chat"],["profile","👤","Profile"]].map(x=>`<div class="${U.v==x[0]||(U.v=="chat"&&x[0]=="chatlist")?"a":""}" onclick="tapNav('${x[0]}')"><span>${x[1]}</span>${x[2]}</div>`).join("")}</div>`;

// State picker (used on Select Your State and Chat Info)
const tiles=()=>ST.filter(s=>s[0].toLowerCase().includes(U.q.toLowerCase())).map(s=>`<div class="st ${S.state==s[0]?"on":""}" onclick="pick('${s[0]}')">${flag(26)}<br><b>${s[0]}</b><br><small>${s[1]}</small></div>`).join("")||`<p>No state matches "${esc(U.q)}".</p>`;
const grid=()=>`<input placeholder="🔍 Search states" aria-label="Search states" value="${esc(U.q)}" oninput="U.q=this.value;$('#gridbox').innerHTML=tiles()"><div class="grid" id="gridbox">${tiles()}</div>`;

const board=()=>{const b=[["Adaeze",980],["Ibrahim",910],["Kelechi",860],["Funke",790],[S.user||"You",S.pts]].sort((a,b)=>b[1]-a[1]);return `<div class="lb"><b class="m">🏆 Top Five Leaderboard</b><div class="row">${b.map((x,i)=>`<span class="chip">${["🥇","🥈","🥉","4","5"][i]} ${pic("user.png","🙂",22)} ${esc(x[0])} · ${x[1]}</span>`).join("")}</div></div>`};