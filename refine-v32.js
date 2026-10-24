/* October 23 posts and post-show conversation. */
const bubblePostsV32=[[18,23,'무대에서 만나자 !!'],[23,10,'너무너무너무 재밌었다 !!'],[23,16,'[첫콘 셀카 v32]'],[23,16,'내일도 재밌겠지??']];
const groupPostsV32=[
 [22,20,'yechan','다들 수고했어어 오늘 진짜 재밌었다'],
 [22,21,'wonsang','첫 곡 시작할 때 함성 듣고 소름 돋았어ㅋㅋ'],
 [22,22,'self','나도. 긴장했는데 객석 보니까 바로 신나더라'],
 [22,23,'gwangil','형들 오늘 너무 좋았어. 마지막에 내려오기 싫었음'],
 [22,24,'yechan','맞아ㅋㅋ 나 아직도 귀에 함성 들려'],
 [22,25,'self','형 마지막 멘트 하면서 또 울 줄 알았는데'],
 [22,26,'yechan','안 울었거든?? 내일도 해야 되니까 아껴둔 거야'],
 [22,27,'wonsang','그럼 막콘 때 큰일 났네ㅋㅋㅋㅋ'],
 [22,29,'gwangil','일단 다들 뭐 좀 먹자. 배고파'],
 [22,30,'self','밥부터 먹자. 내일도 해야 되니까'],
 [23,20,'wonsang','오늘 영상 잠깐 봤는데 내일 여기 한 번만 더 맞추면 좋겠다'],
 [23,21,'yechan','응 내일 리허설 때 같이 보자. 오늘보다 더 재밌게 할 수 있을 듯'],
 [23,22,'self','나 벌써 내일 기대돼. 오늘 객석 진짜 좋았어'],
 [23,23,'gwangil','중콘은 더 신나게 해보자ㅋㅋ 내일도 잘 부탁해'],
 [23,24,'yechan','내일도 다치지 말고 재밌게 하자아'],
 [23,25,'wonsang','다들 따뜻한 물 마시고 푹 자. 지각 금지'],
 [23,26,'self','알았어ㅋㅋ 다들 수고했어. 내일 보자'],
 [23,27,'yechan','잘 자아 내일 또 같이 놀자 ㅎㅎ']
];
function postTimeV32(h,m){return Date.parse(`2026-10-23T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00+09:00`)}
function importPostsV32(now=Date.now()){
 let bubbleChanged=false,groupChanged=false;
 bubblePostsV32.forEach(([h,m,text],i)=>{const ms=postTimeV32(h,m),id='bubble32:'+i;if(ms<=now&&!bubble.some(r=>r[3]===id)){bubble.push([1,text,`오후 ${h%12||12}:${String(m).padStart(2,'0')}`,id,ms]);bubbleChanged=true}});
 const rows=chats.group||(chats.group=[]);
 groupPostsV32.forEach(([h,m,speaker,text],i)=>{const ms=postTimeV32(h,m),id='group32:'+i;if(ms<=now&&!rows.some(r=>r[3]===id)){rows.push([speaker==='self'?1:0,text,`오후 ${h%12||12}:${String(m).padStart(2,'0')}`,id,ms,speaker]);groupChanged=true}});
 if(bubbleChanged){bubble.sort((a,b)=>(a[4]||0)-(b[4]||0));saveStore('bubble',bubble)}
 if(groupChanged){rows.sort((a,b)=>(a[4]||0)-(b[4]||0));saveStore('chats',chats)}
 return {bubbleChanged,groupChanged};
}
const bubbleBeforeV32=renderBubble;
renderBubble=function(...args){importPostsV32();bubbleBeforeV32(...args);const rows=bubble.filter(r=>r[0]);surface.querySelectorAll('#bubbleScroll .artist-message,#bubbleScroll .artist-outgoing').forEach((el,i)=>{if(rows[i]?.[1]==='[첫콘 셀카 v32]'){const box=el.querySelector('.artist-bubble');if(box){box.classList.add('bubble-photo-v32');box.innerHTML='<div class="bubble-photo-frame-v32" role="img" aria-label="첫콘 후 상엽이 셀카"><img src="assets/bubble-oct23-reference.jpg" alt="" loading="lazy"></div>'}}});const anniversary=surface.querySelector('.bubble-anniversary');if(anniversary&&Date.now()>=postTimeV32(0,0))anniversary.innerHTML='<i>bubble</i> ♥ + '+(105+Math.max(0,Math.floor((Date.now()-postTimeV32(0,0))/86400000)))};
const msgBeforeV32=msgHTML;
msgHTML=function(row,id){let html=msgBeforeV32(row,id);if(id==='group'&&!row[0]&&row[5]&&CONTACTS[row[5]]){html=html.replace(profile('group'),profile(row[5]));html=html.split(esc(CONTACTS.group.name)).join(esc(CONTACTS[row[5]].short||CONTACTS[row[5]].name))}return html};
// Three silent calls; every shown line is archived by the existing call recorder.
const quietScriptsV32=[
 {title:'첫콘 끝나고',lines:[
 '엽아 어디야? 나 이제 좀 조용한 데 나왔어. 너도 옷 갈아입었어?',
 '아까는 정신없어서 제대로 얘기도 못 했네. 오늘 진짜 수고했어.',
 '우리 올라가기 직전에 너 계속 손 만지작거리고 있었잖아. 나 그거 봤어ㅋㅋ',
 '나도 떨렸는데 네가 먼저 웃어줘서 좀 괜찮아졌어. 아, 이제 시작하는구나 싶더라.',
 '첫 곡 들어가고 객석에서 소리 나는데 순간 웃음이 안 멈추는 거야.',
 '너도 그랬지? 나 봤어. 노래하면서 입꼬리 계속 올라가던데 ㅎㅎ',
 '오늘 같이 불러주는 소리 진짜 컸어. 연주하면서도 자꾸 객석 보게 되더라.',
 '근데 네 목소리는 또 잘 들렸어. 아까 그 부분 좋더라. 리허설 때랑 다르게 부른 데.',
 '왜, 내가 그런 것도 못 알아들을 줄 알았어? 네 노래 얼마나 많이 듣는데ㅋㅋ',
 '끝나고 인사할 때는 좀 아쉽더라. 벌써 내려가야 되나 싶어서.',
 '내일 또 할 수 있어서 다행이지. 하루만 하고 끝났으면 나 오늘 잠 못 잤을걸.',
 '목은 괜찮아? 아프진 않고? 아까 물 마시는 거 보긴 했는데.',
 '알았어어. 잔소리 그만할게. 그래도 네가 괜찮다고 하면 나 한 번 더 물어보게 돼.',
 '밥 아직이면 같이 먹자. 나도 배고픈데 혼자 먹기는 싫어.',
 '너 먹고 싶은 거 골라. 오늘은 내가 네 메뉴에 따라갈게 ㅎㅎ',
 '지금 나온다고? 그럼 천천히 와. 나 여기서 기다릴게.',
 '엽아, 오늘 네 옆에서 연주해서 좋았어. 이 말은 만나서도 한 번 더 할 거야.',
 'ㅋㅋㅋㅋ알았어. 얼른 와. 얼굴 보고 얘기하자.'
 ]},
 {title:'내일도 같이',lines:[
 '엽아 뭐 해? 오늘 영상 보고 있었어? 나도 방금 조금 봤는데.',
 '그러니까ㅋㅋ 보면 또 끝까지 보게 돼. 이제 씻어야 되는데 계속 넘기고 있었어.',
 '너 아까 나한테 뭐라고 한 거야? 무대에서 입 모양으로 말한 거. 잘 안 들렸어.',
 '아 그거였어? 나는 그냥 웃어달라는 줄 알고 냅다 웃었는데ㅋㅋㅋㅋ',
 '근데 너도 따라 웃었잖아. 그래서 제대로 알아들은 줄 알았지.',
 '내일은 말로 해. 아니면 내려와서 알려줘. 나 혼자 계속 궁금해하니까.',
 '오늘 하고 나니까 내일은 좀 더 편하게 놀 수 있을 것 같아.',
 '처음에는 순서 생각하느라 바빴는데 중간부터는 그냥 재밌더라.',
 '너도 내일 너무 잘하려고만 하지 마. 오늘처럼 즐거우면 좋겠어.',
 '물론 네가 신나면 더 잘하는 건 나도 알지 ㅎㅎ 그냥 하는 말이야.',
 '오늘 눈 마주쳤던 데 기억나? 거기서 내일도 나 한 번 봐줘.',
 '내가 먼저 보고 있을 수도 있는데 못 본 척하지 말고ㅋㅋ',
 '리허설 때 맞출 거는 단체방에 적어놨어. 우리 내일 가서 같이 보면 되겠다.',
 '지금은 연습 더 하지 말고 쉬어. 나도 오늘은 여기까지만 볼게.',
 '끝나고 뭐 먹을지는 내일 정할까? 벌써 고민하면 또 배고파지잖아.',
 'ㅋㅋㅋㅋ고기? 알았어. 네가 먹고 싶으면 고기 먹자.',
 '오늘도 좋았는데 내일은 또 어떨지 궁금하다. 너랑 같이하는 건데도 매번 달라.',
 '우리 내일도 재밌게 하자. 나 네 옆에서 열심히 켤게.',
 '응, 내일 봐 엽아. 일어나면 연락해. 나도 준비하면서 폰 볼게.'
 ]},
 {title:'잠들기 전에',lines:[
 '엽아 누웠어? 목소리가 아까보다 좀 졸린데 ㅎㅎ',
 '나도 씻고 누웠어. 불은 껐는데 아직 잠이 바로 오지는 않네.',
 '몸은 피곤한데 머리가 계속 공연장에 있는 것 같아. 너도 그래?',
 '오늘 객석에서 같이 불러주던 거 생각나. 집에 왔는데도 자꾸 들리는 기분이야.',
 '아까는 다들 있어서 못 했는데 너 오늘 진짜 멋있었어.',
 '왜 웃어ㅋㅋ 진짜로. 네가 앞에서 노래하고 있으니까 나도 괜히 힘나더라.',
 '너 지금 부끄러워하는 거야? 얼굴 안 보이니까 아쉽네. 보고 싶은데.',
 '사진 보내라는 말은 아니고ㅋㅋ 그냥 보고 싶다고 한 거야.',
 '아까 봤는데 또 보고 싶으면 어떡하지. 내일 아침까지 기다려야 되네.',
 '그래도 눈 뜨면 또 만나니까 좋다. 너랑 내일 할 얘기가 아직 많아.',
 '지금 다 하면 너 못 자잖아. 몇 개는 만나서 얘기할게.',
 '물은 옆에 놨어? 자다가 목 마르면 바로 마실 수 있게.',
 '응, 알았어. 이제 안 물어볼게. 나도 물 마시고 잘 거야.',
 '오늘 아쉬웠던 거 생각나도 지금 혼자 오래 붙잡고 있지 마.',
 '내일 같이 한 번 더 해보면 되지. 네가 신경 쓰이는 데 있으면 나한테 말해줘.',
 '난 오늘 너 웃는 얼굴 많이 봐서 좋았어. 내일도 그랬으면 좋겠다.',
 '이제 진짜 졸리지? 대답 점점 느려지는데ㅋㅋ 귀여워.',
 '응, 먼저 자. 나도 전화 끊고 폰 내려놓을게.',
 '엽아 오늘도 고생 많았어. 사랑해.',
 '나도 많이. 잘 자 ㅎㅎ 내일 보자.'
 ]}
];
function quietCallV32(index){
 if(!unlocked){beginUnlock('phone');return}if(callStage){toast('현재 통화를 먼저 종료해 주세요.');return}if(denyContactV23())return;if(sleepingV23()){startSleepDialV23();return}
 index=Number(index);if(!Number.isInteger(index)||index<0||index>=quietScriptsV32.length)index=0;const chosen=quietScriptsV32[index];overlay.innerHTML='';stopSharedMediaV26();
 const original=textScriptV26;textScriptV26=()=>({day:phoneDate().getDate(),band:'quiet32:'+index,lines:chosen.lines.slice()});
 try{startTextCallV26('발신')}finally{textScriptV26=original}
 saveStore('quiet-call-next-v32',(index+1)%quietScriptsV32.length);
}
function quietCallMenuV32(){collectionSheetV25('예찬이와 통화',quietScriptsV32.map((s,i)=>`<button class="collection-item-v25" onclick="quietCallV32(${i})"><b>${esc(s.title)}</b><small>대사로 듣는 통화</small></button>`).join(''))}
const phoneBeforeV32=renderPhone;
renderPhone=function(tab='recent'){phoneBeforeV32(tab);if(tab!=='recent')return;const anchor=surface.querySelector('.call-archives-v26')||surface.querySelector('.app-content');if(anchor){const button=document.createElement('button');button.className='quiet-call-menu-v32';button.textContent='예찬이와 대사 통화 ›';button.onclick=quietCallMenuV32;anchor.insertAdjacentElement('afterend',button)}};
const startBeforeV32=startCall;
startCall=function(id){const d=phoneDate();if(id==='yechan'&&d.getFullYear()===2026&&d.getMonth()===9&&d.getDate()===23&&d.getHours()>=22){quietCallV32(Number(readStore('quiet-call-next-v32',0))%3);return}return startBeforeV32(id)};
importPostsV32();setInterval(()=>{const changed=importPostsV32();if(document.hidden)return;if(changed.bubbleChanged&&screen==='bubble')renderBubble(bubbleTab);if(changed.groupChanged&&screen==='kakao'){if(activeChat==='group')renderChat();else if(!activeChat)renderKakao()}},15000);
const cssV32=document.createElement('style');cssV32.textContent='.artist-bubble.bubble-photo-v32{padding:0!important;background:transparent!important;overflow:hidden;max-width:230px;width:230px}.bubble-photo-frame-v32{position:relative;width:100%;aspect-ratio:642/860;overflow:hidden;border-radius:14px;background:#222}.bubble-photo-frame-v32 img{position:absolute;width:164.486%!important;max-width:none!important;height:auto!important;left:-23.364%;top:-83.721%;border-radius:0!important}.quiet-call-menu-v32{display:block;margin:10px auto;padding:11px 16px;border:1px solid #dbe5dc;border-radius:16px;background:#f1f6f0;color:#315141;font:inherit;font-size:12px}';document.head.appendChild(cssV32);
