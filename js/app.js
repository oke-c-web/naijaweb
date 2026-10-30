/* ===== APP LOGIC: actions, quiz builder, matching, start-up ===== */

// ---- Quiz: 30 questions per state, built once per state ----
const rng=seed=>()=>{seed=(seed*9301+49297)%233280;return seed/233280};
const shuf=(a,r)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const buildQ=(raw,r)=>{const right=raw[1][raw[2]],o=shuf(raw[1],r);return{q:raw[0],o,c:o.indexOf(right)}};
const QC={};
function getQs(){
  const s=S.state||"Lagos";if(QC[s])return QC[s];
  const r=rng([...s].reduce((a,c)=>a+c.charCodeAt(0),7));
  const caps=ST.map(x=>x[1]).filter(x=>x!=cap(s));
  const dyn=[[`What is the capital of ${s}?`,[cap(s),...shuf(caps,r).slice(0,3)],0],
             [`Which zone is ${s} in?`,[ZONE_OF[s],...shuf(Object.keys(ZONES).filter(z=>z!=ZONE_OF[s]),r).slice(0,3)],0]];
  if(SL[s])dyn.push([`Which slogan belongs to ${s}?`,[SL[s],...shuf(Object.values(SL).filter(x=>x!=SL[s]),r).slice(0,3)],0]);
  return QC[s]=[...dyn,...(STATE_Q[s]||[]),...shuf(GENERIC,r)].slice(0,30).map(x=>buildQ(x,r));
}

// ---- Keep typed text when a button re-draws the screen ----
const keepUser=()=>{const u=$("#u");if(u)S.user=u.value};
const keepDob=()=>{const d=$("#dob");if(d)U.dob=d.value};

// ---- Login / navigation ----
const cont=()=>{const u=$("#u").value.trim();if(u.length<3){U.err="Enter a username with at least 3 characters.";return R()}S.user=u.slice(0,24);sv();go(S.state?"community":"welcome")};
const pick=n=>{S.state=n;sv();if(U.v=="select")go("community");else R()};
const tapNav=v=>{if(v=="chatlist"&&!S.peers){U.gender=S.gender||"";U.dob=S.dob||"";return go("chatinfo")}go(v)};
const info=t=>{const s=S.state||"Lagos",txt=(STATE_INFO[s]||{})[t]||(t=="State Slogan"?`"${slog(s)}"`:`Demo content for ${s}. Add real ${t.toLowerCase()} details in js/data.js.`);openModal(`<h3>${t} · ${s}</h3><p>${txt}</p><button class="full" onclick="closeModal()">Close</button>`)};
const adminAsk=()=>openModal(`<h3>Admin code</h3><input id="ac" type="password" placeholder="Enter code" aria-label="Admin code"><div class="err" id="ae"></div><button class="full" onclick="adminGo()">Open</button><button class="o full" onclick="closeModal()">Cancel</button>`);
const adminGo=()=>{if($("#ac").value==ADMIN_CODE)go("admin");else $("#ae").textContent="Wrong code."};

// ---- Chat matching: opposite gender, similar age, minors only with minors ----
const makePeers=()=>{
  const a=age(S.dob),g=S.gender=="Male"?"F":"M",minor=a<18;
  const pool=PEERS.filter(x=>x[1]==g&&(x[2]<18)==minor).sort((x,y)=>Math.abs(x[2]-a)-Math.abs(y[2]-a)).slice(0,2);
  S.peers=pool.map((x,i)=>({n:x[0],g:x[1]=="F"?"Female":"Male",a:x[2],s:ST[(i*11+a)%ST.length][0],bio:x[3],tags:x[4],born:new Date().getFullYear()-x[2],score:Math.max(60,96-4*Math.abs(x[2]-a))}));
};
const chatNext=()=>{keepDob();
  if(!S.state){U.err="Select your state first.";return R()}
  if(!U.gender){U.err="Choose a gender.";return R()}
  if(!U.dob||age(U.dob)<13){U.err="You must be 13 or older to chat.";return R()}
  S.gender=U.gender;S.dob=U.dob;makePeers();sv();go("chatlist")};

// ---- Chat ----
const addEmoji=()=>{const i=$("#mi");i.value+=["😊","😂","🇳🇬","🔥","👍"][Math.random()*5|0];i.focus()};
const send=()=>{const i=$("#mi");if(!i.value.trim())return;
  const t=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),k=U.ci;
  (S.msgs[k]=S.msgs[k]||[]).push({me:1,t:esc(i.value),time:t});sv();R();$("#mi").focus();
  setTimeout(()=>{S.msgs[k].push({t:["Nice! Tell me more 😊","Haha, true!","Want to try the state game?"][Math.random()*3|0],time:t});sv();if(U.v=="chat"&&U.ci==k)R()},1200)};
const answer=i=>{if(U.ans!=null)return;const Q=getQs()[U.qi%getQs().length];U.ans=i;S.games++;if(i==Q.c)S.pts+=10;if(Math.random()<.5)U.peerPts+=10;sv();R()};

// ---- Profile ----
const editP=()=>openModal(`<h3>Edit Profile</h3><input id="eu" value="${esc(S.user||"")}" placeholder="Username" aria-label="Username"><input id="eb" value="${esc(S.bio||"")}" placeholder="Short bio" aria-label="Bio"><button class="full" onclick="S.user=$('#eu').value.trim()||S.user;S.bio=$('#eb').value.slice(0,120);sv();closeModal()">Save changes</button>`);
const changePic=()=>{S.pic=["🧑🏾","👩🏾","👨🏾","😎","🦁","🌴"][Math.random()*6|0];sv();R()};

// ---- Start ----
if(S.user&&S.state)U.v="community";
R();