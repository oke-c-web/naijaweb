/* ===== ADMIN DASHBOARD (all numbers are demo) ===== */
const ADMIN_CODE="NAIJA-ADMIN"; // checked in the browser only: NOT secure
const ADM_MENU=["Dashboard","Users","States & Communities","Content Management","Chat Monitoring","Games & Leaderboard","Reports","Advertisements","Platform Statistics","Settings"];
const seed=(n,k=1)=>[...Array(n)].map((_,i)=>Math.round((40+30*Math.sin(i/2+k))*k+i*1.5));
const line=(a,c)=>{const mx=Math.max(...a,1);return `<polyline fill="none" stroke="${c}" stroke-width="2" points="${a.map((v,i)=>`${(i*300/(a.length-1)).toFixed(1)},${(100-v/mx*90).toFixed(1)}`).join(" ")}"/>`};
const LB=[["Adaeze","Lagos",980],["Ibrahim","Kano",910],["Kelechi","Enugu",860],["Funke","Oyo",790],["Musa","FCT",700]];
const tbl=(h,rows)=>`<div class="card"><table><tr>${h.map(x=>`<th>${x}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</table></div>`;

const admSection=()=>{switch(U.adm){
case 1:return tbl(["User","State","Points","Status"],LB.map(x=>[x[0],x[1],x[2],"Active"]));
case 2:return tbl(["State","Capital","Zone"],ST.map(s=>[s[0],s[1],ZONE_OF[s[0]]]));
case 4:return tbl(["Chat space","Pair","Messages"],[["Space A","F 19 / M 20",42],["Space B","F 22 / M 23",17]])+`<p class="demo">Chats are one-to-one only. This table is sample data.</p>`;
case 5:return `<div class="row">${["Daily","Weekly","All time"].map(t=>`<button class="${U.lb==t?"":"o"}" onclick="U.lb='${t}';R()">${t}</button>`).join("")}</div>`+tbl(["#","Player","State","Points"],LB.map((x,i)=>[i+1,x[0],x[1],Math.round(x[2]*(U.lb=="Daily"?.1:U.lb=="Weekly"?.4:1))]));
case 8:return tbl(["Metric","Value"],[["Page views",18420],["Avg. session","6m 12s"],["Chats started",2568],["Game plays",4410]]);
case 0:return "";
default:return `<div class="card">Demo section. Connect a backend (for example Supabase free tier) to manage real data here.</div>`}};

VIEWS.admin=()=>`<div class="row sp">${flag(34)}<h2>Naija<b>Web</b> Admin</h2><button class="o" onclick="go('login')">Exit</button></div>
<input placeholder="🔍 Search users, states, chats" aria-label="Admin search">
<div class="adm"><div class="side">${ADM_MENU.map((m,i)=>`<div class="${U.adm==i?"a":""}" onclick="U.adm=${i};R()">${m}</div>`).join("")}</div>
<div class="main"><h2>${U.adm?ADM_MENU[U.adm]:"Welcome Back, Admin"}</h2>${U.adm?admSection():`
<div class="nums">${[["Total Users",1284],["Active Today",312],["Total States",37],["Total Chats",2568],["Games Played",4410],["New Users This Week",96]].map(x=>`<div class="card c" style="margin:0"><b style="font-size:22px">${x[1]}</b><br><small>${x[0]}</small></div>`).join("")}</div>
<div class="card"><div class="row sp"><b>Platform Growth</b><span><button class="${U.days==7?"":"o"}" style="padding:4px 10px" onclick="U.days=7;R()">7 days</button> <button class="${U.days==30?"":"o"}" style="padding:4px 10px" onclick="U.days=30;R()">30 days</button></span></div>
<svg viewBox="0 0 300 110" style="width:100%" role="img" aria-label="Growth chart">${line(seed(U.days),"#0a8a4f")}${line(seed(U.days,.7),"#e6a700")}${line(seed(U.days,.5),"#4477ee")}</svg><small><span style="color:#0a8a4f">■ Users</span> <span style="color:#e6a700">■ Chats</span> <span style="color:#4477ee">■ Game Plays</span></small></div>
<div class="card"><b>Top 5 States by Activity</b>${["Lagos","FCT","Kano","Rivers","Enugu"].map((s,i)=>`<p>${i+1}. ${s} <span class="tag">${900-i*130} pts</span></p>`).join("")}</div>
<div class="card"><b>Top 5 Leaderboard</b><div class="row" style="margin:6px 0">${["Daily","Weekly","All time"].map(t=>`<button class="${U.lb==t?"":"o"}" style="padding:4px 10px" onclick="U.lb='${t}';R()">${t}</button>`).join("")}</div>${LB.map((x,i)=>`<p>${i+1}. ${x[0]} (${x[1]}) — ${Math.round(x[2]*(U.lb=="Daily"?.1:U.lb=="Weekly"?.4:1))}</p>`).join("")}</div>
<div class="card"><b>Community Overview</b><p>37 communities · 1,284 members · most active zone: South West</p></div>
<div class="card"><b>State Highlights</b><select aria-label="Pick a state" onchange="S.hl=this.value;R()">${ST.map(s=>`<option ${S.hl==s[0]?"selected":""}>${s[0]}</option>`).join("")}</select><p>Capital: ${cap(S.hl||"Abia")} · "${slog(S.hl||"Abia")}"</p></div>
<div class="card"><b>Journey of 66 Years</b><div class="tl">${TL.map(t=>`<p><b>${t[0]}</b> — ${t[1]}</p>`).join("")}</div></div>
<div class="card"><b>Chat Info</b><p>Chat spaces per user: 2 · Minimum age: 13 · Matching: opposite gender, similar age</p></div>
<div class="card"><b>Chat Page</b><p>Messages today: 640 · Games in chat: 212</p></div>
<div class="card"><b>Platform Statistics</b><p>Avg. session 6m 12s · Return rate 48%</p></div>`}
<p class="demo">Demo numbers. The admin code is checked in the browser and is NOT secure.</p></div></div>`;