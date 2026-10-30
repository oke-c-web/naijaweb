/* ===== USER SCREENS (one function per screen) ===== */
const VIEWS={};

// 1. LOGIN
VIEWS.login=()=>`${brand()}<div class="card"><h2>Welcome to NaijaWeb</h2><p>Your Nigerian states. Your people. Your community.</p>
<input id="u" placeholder="Username" aria-label="Username" value="${esc(S.user||"")}">
<div class="row"><input id="p" type="${U.pw?"text":"password"}" placeholder="Password" aria-label="Password" style="flex:1"><button class="o" aria-label="Show or hide password" onclick="U.pw=!U.pw;keepUser();R()">${U.pw?"🙈":"👁"}</button></div>
<div class="err">${U.err}</div><button class="full" onclick="cont()">Continue</button>
<p class="c" style="margin:8px">Don't have an account? <a href="#" onclick="cont();return false"><b>Sign Up</b></a></p>
<p class="c">— or —</p><button class="o full" onclick="S.user='Guest'+(100+Math.random()*899|0);sv();go(S.state?'community':'welcome')">Continue as Guest</button>
<p class="c"><a href="#" style="color:#789;font-size:12px" onclick="adminAsk();return false">Admin</a></p></div>
<p class="demo c">Demo: there is no server. Accounts live only in this browser and passwords are never stored.</p>`;

// 2. WELCOME / ADVERTISING
VIEWS.welcome=()=>{const caps=["Learn about states","Play the state game","Chat with others","Earn points"],ic=["📚","🎮","💬","⭐"],lm=["🌴","🕌","🏛️","🪘","🏞️","🗿","🌉","🏰","⛰️","🌊","🌍","🎭"];
return `${brand()}<div class="card dk c"><h2>Discover Nigeria One State at a Time</h2>
<div class="map">${lm.map((e,i)=>pic(`landmarks/${i+1}.jpg`,e,56)).join("")}</div>
<div class="row" style="justify-content:center;margin:12px 0">${ic.map((x,i)=>`<div class="chip" style="${U.slide==i?"outline:2px solid var(--m)":""}" onclick="U.slide=${i};R()">${x}<br>${caps[i]}</div>`).join("")}</div>
<div>${[0,1,2,3].map(i=>`<span onclick="U.slide=${i};R()" style="cursor:pointer;color:${U.slide==i?"#12E3A4":"#fff6"}">●</span> `).join("")}</div>
<div class="row sp" style="margin-top:12px"><button class="o" onclick="go('select')">Skip</button><button onclick="go('select')">Get Started</button></div></div>`};

// 3. SELECT STATE
VIEWS.select=()=>`${brand()}<h2 class="c">Select Your State</h2>${grid()}`;

// 4. COMMUNITY (HOME)
VIEWS.community=()=>{const s=S.state||"Lagos";return `${board()}
<div class="card dk"><div class="row">${pic(`states/${slug(s)}.png`,"🛡️",54)}<div><h2>${s}</h2><small>Capital: ${cap(s)}</small><br><i class="m">"${slog(s)}"</i></div></div></div>
<h3>About ${s}</h3><div class="grid">${CARDS.map(c=>`<div class="card c" style="margin:0;cursor:pointer" onclick="info('${c[1]}')"><div style="font-size:26px">${c[0]}</div><small>${c[1]}</small></div>`).join("")}</div>
<h3 style="margin-top:14px">The Journey of 66 Years</h3><div class="tl">${TL.map(t=>`<p><b class="m">${t[0]}</b> — ${t[1]}</p>`).join("")}</div>
<p class="demo">Demo: only capitals and some slogans are state-specific. Add real content in js/data.js.</p>`};

// 5. CHAT INFO (state + gender + date of birth)
VIEWS.chatinfo=()=>`${brand()}<h2 class="c">Chat Info</h2><p class="c demo">Pick your state, gender and date of birth. Chat is for ages 13 and over.</p>${grid()}
<div class="card"><b>Gender</b><div class="row" style="margin:6px 0"><button class="${U.gender=="Male"?"":"o"}" onclick="U.gender='Male';keepDob();R()">Male</button><button class="${U.gender=="Female"?"":"o"}" onclick="U.gender='Female';keepDob();R()">Female</button></div>
<b>Date of Birth</b><input type="date" id="dob" aria-label="Date of birth" value="${U.dob}"><div class="err">${U.err}</div><button class="full" onclick="chatNext()">Next</button></div>`;

// 6. PERSONAL CHAT (2 spaces)
VIEWS.chatlist=()=>`<div class="card dk c"><b>You can chat with only 2 people.</b><br>Choose one to start a conversation.<br><span class="m">2 / 2 Chats Available</span></div>
${S.peers.map((p,i)=>`<div class="card"><div class="row">${avatar(p.g,56)}<div><b>Chat Space ${i+1}</b><br><b>${p.n}</b> · ${p.g} · ${p.a} · ${p.s}</div></div><p>${p.bio}</p><div class="row">${p.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div><p>Born: ${p.born} · Age: ${p.a} · Match Score: <b>${p.score}%</b></p><button class="full" onclick="U.ci=${i};U.gm=false;go('chat')">Chat Now</button></div>`).join("")}
<div class="card dk">🛡️ <b>Safe &amp; Respectful</b><br>You are matched with the opposite gender and a similar age. Chats are one-to-one only, never groups.</div>
<p class="demo c">Demo: peers are sample profiles, not real people.</p>`;

// 7. CHAT + STATE KNOWLEDGE GAME
VIEWS.chat=()=>{const p=S.peers[U.ci],m=S.msgs[U.ci]||[],qs=getQs(),qn=U.qi%qs.length,Q=qs[qn];
return `<div class="row sp lb"><div class="row"><button class="o" aria-label="Back" onclick="go('chatlist')">←</button>${avatar(p.g,40)}<div><b>${p.n}</b><br><small class="m">● Online</small> <small>${p.g} · ${p.a} · ${p.s}</small></div></div>
<div class="row"><button onclick="U.gm=!U.gm;R()" style="padding:8px 10px;font-size:12px">🎮 State Game<br><small>Live in chat · ${S.pts} pts</small></button><button class="o" aria-label="Menu" onclick="U.menu=!U.menu;R()">⋮</button></div></div>
${U.menu?`<div class="card"><div style="cursor:pointer" onclick="S.msgs[U.ci]=[];sv();U.menu=false;R()">🗑 Clear this chat</div><div style="cursor:pointer;margin-top:8px" onclick="S.pts=0;sv();U.menu=false;R()">↺ Reset my points</div></div>`:""}
${U.gm?`<div class="card"><b>State Knowledge Game</b> · Question ${qn+1}/${qs.length}<div class="row sp"><span>You: <b>${S.pts}</b></span><span>${p.n}: <b>${U.peerPts}</b></span></div><p><b>${Q.q}</b></p>
${Q.o.map((x,i)=>`<button class="opt ${U.ans!=null?(i==Q.c?"ok":i==U.ans?"bad":""):""}" onclick="answer(${i})">${"ABCD"[i]}. ${x}</button>`).join("")}
${U.ans!=null?`<p><b>${U.ans==Q.c?"Correct! +10 pts":"Not quite. The answer is "+Q.o[Q.c]+"."}</b></p><button onclick="U.qi++;U.ans=null;R()">Next question</button>`:""}</div>`:""}
<div>${m.length?m.map(x=>`<div class="row" style="align-items:flex-end;${x.me?"flex-direction:row-reverse":""}">${x.me?pic("user.png",S.pic||"🧑🏾",28):avatar(p.g,28)}<div class="bub ${x.me?"me":""}">${x.t}<br><small>${x.time} ${x.me?"✓✓":""}</small></div></div>`).join(""):`<p class="c demo">Say hi to ${p.n} 👋</p>`}</div>
<div class="row" style="position:sticky;bottom:70px;background:var(--g);padding:6px 0"><button class="o" aria-label="Emoji" onclick="addEmoji()">😊</button><button class="o" aria-label="Attach" onclick="notice('Attachments are switched off in this demo.')">📎</button><input id="mi" style="flex:1;margin:0" placeholder="Type a message" aria-label="Message" onkeydown="if(event.key=='Enter')send()"><button aria-label="Send" onclick="send()">➤</button></div>`};

// 8. PROFILE
VIEWS.profile=()=>{const a=age(S.dob);return `<input placeholder="🔍 Search states" aria-label="Search states" value="${esc(U.pq)}" oninput="U.pq=this.value;$('#sr').innerHTML=srch()"><div id="sr" class="row" style="margin:6px 0">${srch()}</div>
<div class="card dk c">${pic("user.png",S.pic||"🧑🏾",80)}<h2>${esc(S.user||"Guest")}</h2><span class="m">● Online</span><p>${S.gender||"—"} · ${a||"—"} · ${S.state||"—"}</p><button onclick="editP()">Edit Profile</button>
<div class="row" style="justify-content:space-around;margin-top:12px"><div><b>${S.pts}</b><br><small>Total Points</small></div><div><b>#${Math.max(1,6-Math.floor(S.pts/200))}</b><br><small>Rank</small></div><div><b>${S.games}</b><br><small>Games Played</small></div></div></div>
<div class="row">${["About","State","Activity"].map(t=>`<button class="${U.tab==t?"":"o"}" onclick="U.tab='${t}';R()">${t}</button>`).join("")}</div>
<div class="card">${U.tab=="About"?`<p>Username: <b>${esc(S.user||"Guest")}</b></p><p>Gender: ${S.gender||"—"}</p><p>Date of Birth: ${S.dob||"—"}</p><p>Age: ${a||"—"}</p><p>State: ${S.state||"—"}</p><p>Bio: ${esc(S.bio||"Tell people about yourself.")}</p><button onclick="changePic()">Change Picture</button>`:U.tab=="State"?`<p><b>${S.state||"—"}</b> · Capital ${cap(S.state)}</p><p>"${slog(S.state)}"</p><button onclick="go('select')">Change state</button>`:`<p>Points earned: ${S.pts}</p><p>Games played: ${S.games}</p><p>Chat spaces: 2</p>`}</div>`};
const srch=()=>U.pq?ST.filter(s=>s[0].toLowerCase().includes(U.pq.toLowerCase())).slice(0,8).map(s=>`<span class="chip" onclick="pick('${s[0]}')">${s[0]}</span>`).join("")||"<small>No match</small>":"";