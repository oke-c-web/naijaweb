/* ===== STORE: saved data (localStorage) + temporary screen state ===== */
const KEY="naijaweb.v1";
let S={};
try{S=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){S={}}
S.pts=S.pts||0;S.games=S.games||0;S.msgs=S.msgs||{};
const sv=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
// U = what is on screen right now (not saved)
const U={v:"login",tab:"About",gm:false,menu:false,ci:0,modal:"",q:"",slide:0,pw:false,err:"",days:7,adm:0,qi:0,ans:null,peerPts:0,gender:"",dob:"",pq:"",lb:"All time"};