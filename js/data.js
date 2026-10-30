/* ===== DATA (demo content - edit freely) ===== */
const ST="Abia|Umuahia,Adamawa|Yola,Akwa Ibom|Uyo,Anambra|Awka,Bauchi|Bauchi,Bayelsa|Yenagoa,Benue|Makurdi,Borno|Maiduguri,Cross River|Calabar,Delta|Asaba,Ebonyi|Abakaliki,Edo|Benin City,Ekiti|Ado-Ekiti,Enugu|Enugu,FCT|Abuja,Gombe|Gombe,Imo|Owerri,Jigawa|Dutse,Kaduna|Kaduna,Kano|Kano,Katsina|Katsina,Kebbi|Birnin Kebbi,Kogi|Lokoja,Kwara|Ilorin,Lagos|Ikeja,Nasarawa|Lafia,Niger|Minna,Ogun|Abeokuta,Ondo|Akure,Osun|Osogbo,Oyo|Ibadan,Plateau|Jos,Rivers|Port Harcourt,Sokoto|Sokoto,Taraba|Jalingo,Yobe|Damaturu,Zamfara|Gusau".split(",").map(x=>x.split("|"));

const ZONES={"North Central":["Benue","FCT","Kogi","Kwara","Nasarawa","Niger","Plateau"],"North East":["Adamawa","Bauchi","Borno","Gombe","Taraba","Yobe"],"North West":["Jigawa","Kaduna","Kano","Katsina","Kebbi","Sokoto","Zamfara"],"South East":["Abia","Anambra","Ebonyi","Enugu","Imo"],"South South":["Akwa Ibom","Bayelsa","Cross River","Delta","Edo","Rivers"],"South West":["Ekiti","Lagos","Ogun","Ondo","Osun","Oyo"]};
const ZONE_OF={};Object.entries(ZONES).forEach(([z,l])=>l.forEach(s=>ZONE_OF[s]=z));

// Slogans: only a few filled in. Add more as "State":"Slogan". Missing ones fall back to "Pride of Naija".
const SL={Lagos:"Centre of Excellence",Kano:"Centre of Commerce",Rivers:"Treasure Base of the Nation","Akwa Ibom":"Land of Promise",Enugu:"Coal City State",Oyo:"Pace Setter State",FCT:"Centre of Unity","Cross River":"The People's Paradise",Plateau:"Home of Peace and Tourism",Ogun:"Gateway State"};

// The 9 "About" cards: [emoji, title]
const CARDS=[["🍲","Food"],["🎭","Culture"],["👘","Mode of Dressing"],["🎵","Music"],["🎉","Major Event"],["📜","History"],["💎","Treasure"],["⭐","Known For in Nigeria"],["💬","State Slogan"]];

// Optional real content per state and card title. Anything missing shows placeholder text.
const STATE_INFO={Lagos:{Food:"Jollof rice, amala with ewedu, akara, suya.",Culture:"A meeting point of Yoruba traditions and cultures from across Nigeria."}};

// Timeline: independence (1960) to 2026 = 66 years
const TL=[[1960,"Independence from Britain (1 October)"],[1963,"Nigeria becomes a Republic"],[1979,"Second Republic begins"],[1999,"Return to democracy"],[2015,"First democratic transfer of power between parties"],[2026,"66 years of independence"]];

// Quiz format: [question, [options], indexOfCorrect]
const GENERIC=[
["Nigeria gained independence in?",["1960","1963","1966","1999"],0],
["What is Nigeria's capital city?",["Lagos","Abuja","Kano","Ibadan"],1],
["How many states does Nigeria have (excluding FCT)?",["30","36","37","32"],1],
["Nigeria is named after which river?",["Niger","Benue","Congo","Nile"],0],
["Nigeria became a republic in?",["1960","1963","1979","1999"],1],
["What are the colours of Nigeria's flag?",["Green-White-Green","Green-Red-White","White-Green-White","Blue-Green-Blue"],0],
["The capital officially moved to Abuja in?",["1976","1985","1991","1999"],2],
["The Niger and Benue rivers meet at?",["Lokoja","Jos","Makurdi","Kano"],0],
["Nigeria's highest mountain is?",["Chappal Waddi","Mount Patti","Zuma Rock","Olumo Rock"],0],
["Which is Nigeria's most populous city?",["Lagos","Kano","Abuja","Port Harcourt"],0],
["Nigeria's official language is?",["English","Yoruba","Hausa","French"],0],
["Nigeria's currency is the?",["Naira","Cedi","Rand","Shilling"],0],
["Which three groups are Nigeria's largest?",["Hausa-Fulani, Yoruba, Igbo","Hausa, Tiv, Efik","Igbo, Ijaw, Efik","Yoruba, Edo, Nupe"],0],
["Zuma Rock is close to which city?",["Abuja","Lagos","Enugu","Kano"],0],
["What is one hundredth of a naira called?",["Kobo","Pesewa","Cent","Pence"],0],
["Nigeria's Independence Day is?",["1 October","12 June","29 May","1 January"],0],
["Who was Nigeria's first Prime Minister?",["Abubakar Tafawa Balewa","Obafemi Awolowo","Ahmadu Bello","Nnamdi Azikiwe"],0],
["Who was Nigeria's first President (1963)?",["Nnamdi Azikiwe","Tafawa Balewa","Yakubu Gowon","Shehu Shagari"],0],
["Which bird sits on top of Nigeria's coat of arms?",["Eagle","Hawk","Parrot","Owl"],0],
["Olumo Rock is in which state?",["Ogun","Oyo","Osun","Ondo"],0],
["Yankari Game Reserve is in which state?",["Bauchi","Kano","Benue","Niger"],0],
["Obudu Mountain Resort is in which state?",["Cross River","Enugu","Plateau","Taraba"],0],
["The Argungu Fishing Festival is held in?",["Kebbi","Sokoto","Katsina","Kwara"],0],
["The Osun-Osogbo Sacred Grove is in?",["Osun","Oyo","Ekiti","Lagos"],0],
["Kainji Dam is built on which river?",["Niger","Benue","Kaduna","Cross"],0],
["Nigeria joined OPEC in?",["1960","1971","1980","1999"],1],
["The Eyo Festival is celebrated in?",["Lagos","Kano","Enugu","Jos"],0],
["The Nigerian Civil War ended in?",["1967","1970","1975","1979"],1],
["Which is Nigeria's largest state by area?",["Niger","Borno","Kano","Lagos"],0],
["Which Nigerian won the Nobel Prize in Literature?",["Wole Soyinka","Chinua Achebe","Ben Okri","Chimamanda Adichie"],0],
["Nigeria has how many Local Government Areas?",["774","650","500","820"],0]
];
// Questions specific to one state go here. They are placed first in that state's 30.
const STATE_Q={
Lagos:[["Lagos was Nigeria's capital until?",["1991","1976","1960","2001"],0],["Which bridge links Lagos Island to the mainland?",["Third Mainland Bridge","Niger Bridge","Kano Bridge","Benin Bridge"],0]],
Kano:[["The Kofar Mata dye pits are in?",["Kano","Lagos","Jos","Ilorin"],0]]
};

// Demo peers (sample profiles, not real people): [name, gender, age, bio, tags]
const PEERS=[
["Amara_24","F",24,"Lover of jollof debates and Afrobeats.",["Music","Food","Travel"]],
["Zainab_19","F",19,"Reading, art and good conversation.",["Books","Art","Tech"]],
["Ngozi_22","F",22,"Football fan, aspiring engineer.",["Sports","Tech","Movies"]],
["Bisi_17","F",17,"Dancing and trying new recipes.",["Dance","Food","Fashion"]],
["Tunde_21","M",21,"Coding late at night. Suya fan.",["Tech","Food","Gaming"]],
["Chidi_23","M",23,"History nerd and Highlife lover.",["History","Music","Travel"]],
["Emeka_20","M",20,"Photographer chasing Naija sunsets.",["Photos","Travel","Movies"]],
["Sule_16","M",16,"Football and video games.",["Sports","Gaming","Music"]],
["Kemi_15","F",15,"Drawing, anime and baking.",["Art","Food","Movies"]],
["Dayo_15","M",15,"Chess club and football.",["Games","Sports","Music"]]
];