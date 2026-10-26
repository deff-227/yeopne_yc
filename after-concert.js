/* The final concert day, October 25 at noon in Seoul. */
timeNow=function(){return new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(StoryClock.now()))};
refreshDate=function(){const d=PhoneTimeline.dateInfo(StoryClock.now());document.querySelector('.intro p').innerHTML='맘아픈 막콘까지.<br>함께한 3일, 오래오래 기억할게.';document.querySelector('.chips').innerHTML=`<span>🎻 ${d.key.replaceAll('-','.')}</span><span>THE FINAL DAY ♡</span>`;document.querySelector('.margin-note p').innerHTML='10 / 25<br>마지막 공연도<br>좋은 밤 좋은 꿈<br>왈왈이들과 평생 버스킹';document.querySelector('.margin-note').firstChild.textContent='one more beautiful day,';document.querySelectorAll('.date').forEach(e=>e.textContent=d.full+' · 마지막 공연의 하루');document.querySelectorAll('.shade-date').forEach(e=>e.textContent=d.full);document.querySelectorAll('.lock>p').forEach((e,i)=>e.textContent=i===0?d.full+' · 막콘이 끝난 밤':'너희 덕분에 행복한 3일이었어.');document.querySelectorAll('.lock .notification').forEach(el=>{el.innerHTML='<small>카카오톡 · 엽이♥</small><br><b>나도 기다리고 있었어.</b><br>내려와 형. 같이 밥 먹자.'})};
const previousHomeAfter=home;home=function(){previousHomeAfter();const top=document.querySelector('.home-top>span');if(top)top.textContent='AFTER THE FINAL CONCERT';const card=document.querySelector('.today-card');if(card)card.innerHTML='<div class="tiny">THREE DAYS WITH YOU</div><h3>맘아픈 막콘까지.</h3><p>정말 행복했던 3일, 함께해줘서 고마워.</p><small class="progress-label">우리가 함께한 모든 시간들이 오래오래 ♡</small>';document.querySelector('.today-card')?.setAttribute('data-open','checklist');const msg=document.querySelector('.widget-row .widget:last-child button');if(msg)msg.textContent='엽아, 오늘도 고마워';refreshDate()};
calendar=function(){const d=PhoneTimeline.dateInfo(StoryClock.now());let cells='';for(let i=0;i<4;i++)cells+='<span></span>';for(let n=1;n<=31;n++)cells+=`<span class="${n===d.day?'today':''}">${n}</span>`;page('2026년 10월',`<div class="calendar">${['일','월','화','수','목','금','토'].map(x=>`<span>${x}</span>`).join('')}${cells}</div><div class="card"><h3>25일 · 마지막 공연 🎻</h3><p>첫콘부터 맘아픈 막콘까지.<br>함께 웃고 노래했던 3일을 오래 기억하기.</p><button class="pill" data-open="checklist">공연 후 정리하기</button></div><div class="card"><h3>함께한 첫날과 둘째 날</h3><p>23일 · 설레는 첫콘<br>24일 · 더 크게 웃었던 중콘</p><button class="pill" data-open="first-letter">10/23 첫콘 편지 읽기</button></div><div class="card"><h3>공연을 마치고</h3><p>밥 든든하게 먹기<br>장비와 인이어 정리<br>손목 풀고 푹 쉬기</p></div>`)};
const firstConcertLetter=`사랑하는 우리 왈왈이들에게

얘들아 안녕! 예차니야 :)
공연 어땠어? 재밌었나~? 난 너희 덕분에 또 소중한 추억 하나가 생긴 것 같아 :)

무언가를 준비하고 고민하는 일이 힘들기도 하고 고단하기도 하지만 이렇게 봐주러 오는 너희 덕분에 언제나 웃으며, 행복하게 공연을 준비하는 것 같다!

왈왈이들아! 나에게 너희는 참 소중해 알지?
너무나도 소중한 너희가 오늘만큼은 우리 덕분에 웃고, 스트레스 풀고, 행복해지는 하루가 됐으면 좋겠어.

모든 걸 가능하게 하고 모든 걸 예뻐보이게 하는 우리 왈왈이들!
내가 많이 많이 사랑합니다. 설레는 첫콘 와줘서 고마워!`;
const finalDayNotes=[['today','막콘을 마치고','맘아픈 막콘까지.\n\n함께 웃고 노래했던 얼굴들 오래 기억하기.\n정말 행복한 3일이었다.\n음악할 수 있게 해줘서 고마워.'],['yeop','엽이한테 할 말','오늘도 내 옆에서 웃어줘서 고마웠어.\n돌아볼 때마다 네가 있어서 좋았어.\n\n밥 잘 챙겨 먹고 푹 쉬기.\n우리 오늘 얘기도 오래 하자.'],['gear','공연 후 챙길 것','활 · 송진 · 인이어\n예비 배터리와 손목 보호대\n물과 가볍게 먹을 것\n\n장비 정리하고, 손목 잘 풀고 쉬기.']];
notes=function(){page('메모',`<button class="letter-preview" data-open="first-letter"><small>2026.10.23 · LETTER</small><h2>10/23 첫콘 편지</h2><p>사랑하는 우리 왈왈이들에게</p><span>얘들아 안녕! 예차니야 :)</span><b>편지 읽기 ›</b></button><button class="letter-preview" data-open="middle-letter"><small>2026.10.24 · LETTER</small><h2>10/24 중콘 편지</h2><p>사랑하는 우리 왈왈이들에게.</p><span>안녕 얘들아~ 예차니야~ :)</span><b>편지 읽기 ›</b></button><button class="letter-preview" data-open="final-letter"><small>2026.10.25 · LETTER</small><h2>10/25 막콘 편지</h2><p>사랑하는 우리 왈왈이들에게</p><span>안녕 얘드라! 예차니야 :)</span><b>편지 읽기 ›</b></button>${finalDayNotes.map(([id,title,body])=>`<div class="card"><h3>${title}</h3><textarea class="note" data-note="final26-${id}" aria-label="${title}">${esc(state.notes['final26-'+id]??body)}</textarea><p class="muted">자동 저장</p></div>`).join('')}`)};
function firstLetter(){page('10/23 첫콘 편지',`<article class="first-letter"><div class="letter-topline"><span>TO. WALWAL</span><small>2026.10.23</small></div><h2>사랑하는 우리<br>왈왈이들에게</h2><div class="letter-text">${esc(firstConcertLetter.split('\n\n').slice(1).join('\n\n'))}</div><div class="letter-sign">♡ 🎻</div></article>`)}
function middleLetter(){
 const letterBody=state.notes['letter-oct24']??noteDefs.find(a=>a[0]==='letter-oct24')[2];
 page('10/24 중콘 편지',`<article class="first-letter"><div class="letter-topline"><span>TO. WALWAL</span><small>2026.10.24</small></div><h2>두 번째 날의 편지</h2><textarea class="note letter-note" data-note="letter-oct24" aria-label="10월 24일 중콘 편지">${esc(letterBody)}</textarea><p class="muted">내용을 수정하면 자동 저장됩니다.</p><div class="letter-sign">♡ 🎻</div></article>`);
 requestAnimationFrame(()=>{const editor=V.querySelector('textarea.letter-note');if(editor){editor.style.height='auto';editor.style.height=editor.scrollHeight+'px'}});
}
function finalLetter(){
 const letterBody=state.notes['letter-oct25']??noteDefs.find(a=>a[0]==='letter-oct25')[2];
 page('10/25 막콘 편지',`<article class="first-letter"><div class="letter-topline"><span>TO. WALWAL</span><small>2026.10.25</small></div><h2>막콘을 마치고</h2><textarea class="note letter-note" data-note="letter-oct25" aria-label="10월 25일 막콘 편지">${esc(letterBody)}</textarea><p class="muted">내용을 수정하면 자동 저장됩니다.</p><div class="letter-sign">♡ 🎻</div></article>`);
 requestAnimationFrame(()=>{const editor=V.querySelector('textarea.letter-note');if(editor){editor.style.height='auto';editor.style.height=editor.scrollHeight+'px'}});
}
V.addEventListener('input',e=>{const editor=e.target;if(editor.matches('textarea.letter-note')){editor.style.height='auto';editor.style.height=editor.scrollHeight+'px'}});
const finalDayRenderPrior=render;render=function(app,arg){if(app==='first-letter')return firstLetter();if(app==='middle-letter')return middleLetter();if(app==='final-letter')return finalLetter();return finalDayRenderPrior(app,arg)};
checklist=function(){page('공연 후 정리',`<div class="card"><h3>마지막 공연까지, 수고했어.</h3>${['물 한 잔 마시기','밥 든든하게 먹기','손목 천천히 풀기','활 · 송진 · 인이어 정리','행복했던 3일 오래 기억하기 ♡'].map((x,i)=>`<label class="check"><input type="checkbox" data-check="final25-${i}" ${state.checks['final25-'+i]?'checked':''}>${x}</label>`).join('')}</div><button class="row" data-open="first-letter">♡ 첫콘에 남긴 편지 다시 읽기 ›</button>`)};
privatePosts[0].text='어제보다 조금 더 신날 준비. 마지막이라고 너무 아쉬워하지 말고.';privatePosts[0].comment='엽이♥: 형이 제일 신나게 놀 거면서 ㅋㅋ 오늘도 잘하자.';
privatePosts[1].text='마지막 공연 전에도, 밥은 같이 먹기.';privatePosts[1].comment='엽이♥: 나도 기다리고 있었어. 내려와 형.';
privatePosts[2].text='오늘도 제일 먼저 돌아보게 될 사람.';privatePosts[2].comment='엽이♥: 오늘도 그 자리에서 보고 있을게.';
secretStory=function(){page('친한 친구 ♡',`<img class="lightbox" src="assets/flowers.jpg" alt="마지막 공연을 앞둔 마음"><div class="card" style="margin-top:12px">오늘도 너랑 같은 무대에 서는 게 좋아.<p class="muted">엽이♥님에게만 공개</p></div>`)};
Object.assign(people.sangyeop,{desc:'내려와 형. 같이 밥 먹자.'});people.group.desc='오늘이 진짜 마지막 날';people.wonsang.desc='조원상 · 오늘도 재밌게 하자';people.gwangil.desc='신광일 · 송진 챙겼지?';
const finalDayChats={
 group:[['2026-10-24',0,'96: 오늘도 수고했어. 내일 진짜 마지막이네','오후 11:47'],['2026-10-24',1,'그러게. 아쉬운 건 내일 끝나고 생각해야지 ㅎㅎ','오후 11:49'],['2026-10-24',0,'97: 다들 푹 자고 내일 보자','오후 11:50'],['2026-10-25',0,'96: 우리 오늘이 진짜 마지막 날이야','오전 11:40'],['2026-10-25',0,'97: 오늘도 재밌게 해보자 ㅋㅋ','오전 11:41'],['2026-10-25',1,'응! 다치지 말고 끝까지 신나게 놀자','오전 11:43'],['2026-10-25',0,'엽이♥: 다들 밥부터 챙겨 먹고. 이따 보자','오전 11:45']],
 mother:[['2026-10-24',0,'오늘도 잘 봤어. 밥 챙겨 먹고 쉬어.','오후 11:20'],['2026-10-24',1,'응 엄마 ㅎㅎ 내일 마지막 날도 잘하고 올게.','오후 11:24'],['2026-10-25',0,'오늘이 마지막 공연이지? 아침은 먹었니?','오전 9:15'],['2026-10-25',1,'응 먹었어! 점심도 든든하게 먹고 갈게. 엄마도 밥 챙겨 먹어 ♡','오전 9:20']],
 father:[['2026-10-24',0,'오늘도 좋더라. 내일까지 다치지 말고.','오후 11:21'],['2026-10-24',1,'고마워 아빠! 마지막까지 재밌게 하고 올게.','오후 11:25'],['2026-10-25',0,'마지막 날도 즐겁게 하고 와라. 응원한다.','오전 9:30'],['2026-10-25',1,'응! 끝나고 연락할게 ㅎㅎ','오전 9:33']],
 sibling:[['2026-10-24',0,'설이 사진 보냈어. 형도 이제 좀 쉬어 ㅋㅋ','오후 11:40'],['2026-10-24',1,'귀여워 ㅠㅠ 내일도 보내줘','오후 11:42'],['2026-10-25',0,'설이 산책 중 ㅋㅋ 마지막 공연도 잘하고 와','오전 10:15'],['2026-10-25',1,'고마워! 설이한테도 응원해달라 그래 ㅋㅋ','오전 10:17']],
 wonsang:[['2026-10-24',0,'형 오늘도 재밌었다 ㅋㅋ 내일 또 보자','오후 11:35'],['2026-10-24',1,'응 내일도 잘 부탁해!','오후 11:36'],['2026-10-25',0,'형 오늘 진짜 마지막이네. 괜히 이상하다 ㅋㅋ','오전 11:25'],['2026-10-25',1,'나도 ㅎㅎ 일단 오늘도 재밌게 해보자','오전 11:27']],
 gwangil:[['2026-10-24',0,'형 잘 들어갔어?','오후 11:33'],['2026-10-24',1,'응! 내일도 잘 부탁해. 푹 쉬어','오후 11:34'],['2026-10-25',0,'형 송진 챙겼지? 마지막 날이라고 빼먹지 마 ㅋㅋ','오전 11:33'],['2026-10-25',1,'두 번 확인했어 ㅋㅋ 너도 밥 챙겨 먹고 와','오전 11:35']],
 manager1:[['2026-10-25',0,'예찬 씨, 출발 전에 한 번 연락 부탁드립니다. 오늘도 잘 부탁드려요!','오전 11:10'],['2026-10-25',1,'네! 준비하고 연락드리겠습니다. 오늘도 잘 부탁드립니다.','오전 11:12']],
 manager2:[['2026-10-25',0,'예비 배터리와 장비 확인했습니다. 마지막 공연도 안전하게 마무리해요.','오전 11:03'],['2026-10-25',1,'감사합니다! 저도 개인 장비 다시 확인하겠습니다.','오전 11:05']],
 company:[['2026-10-25',0,'오늘 공연 큐시트 최종본 전달드립니다.','오전 10:43'],['2026-10-25',1,'확인했습니다. 마지막 날도 잘 부탁드립니다!','오전 10:45']],
 styling:[['2026-10-25',0,'의상은 대기실에 준비해두겠습니다 :)','오전 10:48'],['2026-10-25',1,'네 감사합니다! 오늘도 잘 부탁드립니다.','오전 10:50']],
 friend1:[['2026-10-25',0,'오늘 마지막 공연이지? 끝까지 잘하고 와 ㅋㅋ','오전 10:20'],['2026-10-25',1,'응! 오늘도 재밌게 하고 올게 ㅎㅎ','오전 10:22']],
 friend2:[['2026-10-25',0,'오늘까지 잘 마치고 맛있는 거 먹으러 가자','오전 10:30'],['2026-10-25',1,'좋아 ㅋㅋ 끝나고 연락할게!','오전 10:32']]
};
seedFor=function(id){return (finalDayChats[id]||[]).map(([day,mine,text,time])=>[mine,text,time,null,Date.parse(`${day}T${String((Number(time.match(/\d+/)[0])%12)+(/오후/.test(time)?12:0)).padStart(2,'0')}:${time.match(/:(\d{2})/)[1]}:00+09:00`)])};
// Remove the former fixed ending scene; keep user messages and their original timestamps.
const oldEndingTexts=new Set(['공연 끝났는데 왜 더 잠이 안 오지 ㅎㅎ','형도 그래? 나도 계속 오늘 생각나.','마지막에 네가 웃는 거 생각났어','형이 먼저 웃었잖아 ㅋㅋ 보고 있으니까 나도 웃게 되던데','내일 뭐 해 엽아?','형이랑 밥 먹어야지. 일어나면 연락해.','지금은?','지금은 형이랑 얘기하고. 잠 올 때까지 같이 있자.','엽아, 자?','형 아직 안 자? 나도 잠이 안 와. 잠깐 전화할까?']);
const finalShared=PhoneChat.read();finalShared.yechan=finalShared.yechan.filter(m=>!(oldEndingTexts.has(m[1])&&m[4]>=Date.parse('2026-10-26T00:00:00+09:00')));
const finalDayPairs=[['2026-10-24',0,'내일이면 진짜 마지막이네 엽아','오후 11:43'],['2026-10-24',1,'그러게 형. 오늘 재밌었잖아. 내일도 잘하자.','오후 11:44'],['2026-10-25',1,'형 일어났어? 아침 챙겨 먹고.','오전 9:34'],['2026-10-25',0,'응! 너도 잘 잤어?','오전 9:36'],['2026-10-25',1,'응 잘 잤어. 형도 손목 천천히 풀어.','오전 9:37'],['2026-10-25',0,'우리 이제 진짜 오늘이 콘서트 마지막 날이야','오전 11:54'],['2026-10-25',1,'그러니까 오늘 더 재밌게 하자. 형 밥은 먹었어?','오전 11:55'],['2026-10-25',0,'아직! 너랑 먹으려고 ㅎㅎ','오전 11:56'],['2026-10-25',1,'나도 기다리고 있었어. 내려와 형. 같이 밥 먹자.','오전 11:58']];
finalDayPairs.forEach(([day,direction,text,time],i)=>{const id='final25-chat-'+i;if(!finalShared.yechan.some(m=>m[3]===id))finalShared.yechan.push([direction,text,time,id,Date.parse(`${day}T${String((Number(time.match(/\d+/)[0])%12)+(/오후/.test(time)?12:0)).padStart(2,'0')}:${time.match(/:(\d{2})/)[1]}:00+09:00`)])});finalShared.yechan.sort((a,b)=>(a[4]||0)-(b[4]||0));PhoneChat.write(finalShared);
if(!state.finalDay25Seeded){state.notifications=(state.notifications||[]).filter(m=>Number.isFinite(m.epoch)&&m.epoch<=StoryClock.now()&&!oldEndingTexts.has(m.text));state.notifications.push({contactId:'sangyeop',title:'엽이♥',text:'나도 기다리고 있었어. 내려와 형. 같이 밥 먹자.',time:'오전 11:58',epoch:Date.parse('2026-10-25T11:58:00+09:00')});state.pendingChatReplies=[];state.finalDay25Seeded=true;save()}
reply=function(id,t){if(id==='sangyeop'){if(/사랑|좋아해/.test(t))return '나도 좋아해 형. 3일 내내 같이여서 좋았어 ♥';if(/밥|먹|배고/.test(t))return '나도 아직. 같이 먹으려고 기다리고 있었어. 내려와 형.';if(/공연|마지막|콘서트|떨|긴장/.test(t))return '오늘 정말 좋았잖아. 형도 수고했어. 나 옆에 있을게.';if(/잠|잘 자|졸/.test(t))return '형도 이제 푹 쉬어. 오늘 많이 뛰었잖아. 잘 자.';if(/보고|어디|와줘/.test(t))return '나 여기 있어. 형 보고 싶으면 연락해.';return '알았어 형 ㅎㅎ 이따 만나서 얘기하자. 오늘 수고했어.'}const responses={manager1:'네 확인했습니다. 출발하실 때 연락 주세요!',manager2:'감사합니다. 오늘도 잘 부탁드립니다!',company:'감사합니다. 마지막 공연도 잘 부탁드립니다.',styling:'네 준비해두겠습니다 :) 이따 뵙겠습니다!',mother:'그래. 마지막 날도 다치지 말고 즐겁게 하고 와 ♡',father:'그래. 응원한다. 끝나고 연락해라.',sibling:'ㅋㅋㅋ 설이 응원 보냈다. 오늘도 잘하고 와',friend1:'ㅋㅋㅋ 마지막까지 재밌게 하고 와. 끝나고 연락해',friend2:'좋아. 끝나고 맛있는 거 먹자 ㅋㅋ',wonsang:'ㅋㅋㅋ 좋아 형. 마지막 날도 신나게 해보자',gwangil:'응 형 ㅋㅋ 오늘도 재밌게 하자. 이따 봐',group:'96: 오늘도 잘 부탁해! 다들 밥 챙겨 먹고 오자 ㅎㅎ'};return responses[id]||'알겠어. 이따 보자 ㅎㅎ'};
dayScripts.finalDay=[['엽이♥','형 준비 다 했어? 이제 밥 먹으러 내려가려고.'],['나','응 나도 거의 다 했어. 우리 이제 진짜 오늘이 마지막 날이야.'],['엽이♥','그러게. 근데 형 오늘도 제일 신나게 놀 거잖아.'],['나','ㅋㅋㅋ 맞아. 아쉬운 건 끝나고 생각해야지.'],['엽이♥','응. 어제 좋았잖아. 오늘은 더 잘하자.'],['나','오늘도 내가 돌아보면 웃고 있어줘.'],['엽이♥','알았어 형. 나 어차피 계속 보고 있을 건데.'],['나','ㅎㅎ 좋아. 밥 뭐 먹을래?'],['엽이♥','따뜻한 거 먹자. 내려오면 같이 고르고.'],['나','응 금방 갈게. 오늘도 잘 부탁해 엽아.'],['엽이♥','나도 잘 부탁해. 천천히 내려와.']];
map=function(){page('지도',`<div class="map-art"><span class="map-pin">📍 고려대학교 화정체육관</span></div><div class="card" style="margin-top:15px"><h3>화정체육관</h3><p>첫콘부터 막콘까지, 함께했던 곳.</p><a class="primary" style="display:inline-block;text-decoration:none" href="https://map.naver.com/p/search/${encodeURIComponent('고려대학교 화정체육관')}" target="_blank" rel="noopener noreferrer">네이버 지도 열기 ↗</a></div>`)};
document.body.classList.remove('after-concert');document.body.classList.add('final-day');apps[11][1]='공연 후 정리';tick();refreshDate();

/* Yechan-to-Sangyeop keyword replies, varied within each topic for this visit. */
const yeopReplyTopics=[
 [/잘자|잘게|굿나잇|좋은꿈|꿈꿔|꿈꾸/,['내 꿈 꿀 거지?','꿈에서 볼까','잘 자 사랑해','오늘은 아무 생각 말고 푹 자. 내가 많이 사랑해.']],
 [/고생|수고/,['형이 더 고생이었지','사흘 동안 고생 많았어','형 오늘도 멋있었어. 진짜 수고했어.','우리 둘 다 이제 좀 쉬자. 고생했어 예찬아.']],
 [/사랑/,['나도 사랑해 예찬아','나도 사랑해 형 ♥','내가 더 사랑하는데.','응. 내일도 모레도 사랑해.']],
 [/좋아해|좋아하/,['나도 좋아해. 형 생각보다 더.','나도 좋아해 예찬아 ♥','이렇게 말해주면 또 보고 싶잖아.']],
 [/보고싶|보구싶|보고시/,['나도 보고 싶어. 전화할까?','아까 봤는데 또 보고 싶어? 나도 그래.','문 열어주면 갈게.','형 보고 싶다는 말 기다렸어.']],
 [/안아|안겨|안고|포옹/,['이리 와. 오래 안아줄게.','형이 먼저 안아줘.','오늘은 내가 안아줄게. 수고했어.']],
 [/뽀뽀|키스|쪽/,['카톡으로만?','형 지금 얼굴 빨개졌지.','이리 와. 직접 해줘.']],
 [/고마|감사/,['나도 고마워. 옆에 있어줘서.','뭘 그런 걸로. 형이니까 그렇지.','고맙다는 말은 내가 더 해야지.']],
 [/미안|사과/,['미안해하지 마. 나 형 마음 알아.','괜찮아. 우리 얘기하면 되지.','혼자 생각하지 말고 나한테 말해줘.']],
 [/울|눈물|슬퍼|슬프|아쉬|허전|맘아|마음아/,['울지 마. 나 여기 있잖아.','나도 좀 허전해. 그래도 우리 또 만나잖아.','오늘 좋았던 거 하나씩 얘기할까?','얼음팩 가져다줄까? 울지 마 사랑해.']],
 [/힘들|지쳐|피곤|졸려|졸리|쉬고|쉬자/,['형 오늘 많이 뛰었잖아. 이제 푹 쉬어.','옆에서 조용히 있어줄까?','폰 조금 내려놓고 쉬자. 나도 쉴게.','물 마시고 누워. 오늘은 쉬어도 돼.']],
 [/아파|아프|손목|다쳤|다치|쥐났|쥐나/,['많이 아파? 무리하지 말고 쉬어.','손목은 괜찮아? 찜질할 거 가져다줄까?','참지 말고 얘기해. 내가 뭐 해줄까?']],
 [/밥먹었|밥먹엇|밥은|먹었어|먹엇어/,['응 먹었어. 형은?','형 밥부터 챙겨. 먹었는지 알려줘.','먹었는데 형이 같이 먹자면 또 먹을 수 있어.']],
 [/배고|밥|야식|먹자|뭐먹|맛있는/,['뭐 먹고 싶어? 오늘은 형이 골라.','따뜻한 거 먹자. 내가 같이 먹어줄게.','또 편의점 갈까? 형 좋아하는 것도 사자.','메뉴만 골라. 나도 같이 먹을래.']],
 [/물마|목괜찮|목은|목아/,['응 물 마시고 있어. 형도 마셔.','목은 괜찮아. 걱정해줘서 고마워.','형도 물 한 잔 마시고 와. 기다릴게.']],
 [/공연|콘서트|막콘|사흘|무대|연주|노래|바이올린/,['형 연주하는 거 보는데 나도 벅차더라.','사흘 진짜 금방 갔지. 그래도 오래 기억날 것 같아.','오늘 형 진짜 멋있었어. 알고 있지?','같은 무대에 설 수 있어서 좋았어. 다음에도 같이 하자.']],
 [/행복|재밌|즐거|좋았/,['나도 진짜 행복했어. 형이 있어서 더.','그치. 생각하면 또 웃음 나.','우리 오늘 얘기 오래 하자. 잊기 아깝다.']],
 [/잘했|멋있|최고|잘생|귀여|예쁘/,['형한테 들으니까 더 좋네.','계속 칭찬하면 나 웃는 거 못 멈추는데.','형도 오늘 엄청 멋있었어.','그 말 한 번만 더 해줘.']],
 [/전화|통화|목소리/,['전화할까? 나도 형 목소리 듣고 싶어.','응. 나 지금 받을 수 있어.','졸리면 그냥 켜놓고 있어도 돼.']],
 [/어디|뭐해|뭐하|머해|모해|안자|자냐|자니/,['나 아직 안 자. 형은 뭐 해?','누워서 오늘 생각하고 있었어.','형한테 연락할까 하고 있었는데.','나 여기 있어. 무슨 일 있어?']],
 [/와줘|와줄|와라|이리와|올래|만나|갈까/,['형 있는 데로 갈까?','응. 형이 부르면 가야지.','문 열어줄 거야?','좋아. 같이 좀 더 있자.']],
 [/내일|다음|또보|다시만/,['내일도 연락해. 일어나면 내가 먼저 할게.','다음에도 내 옆에 있어줘.','우리 또 보잖아. 너무 아쉬워하지 마.']],
 [/잘잤|좋은아침|굿모닝|일어났/,['응 잘 잤어. 형은?','형한테 연락 와서 이제 제대로 깼네.','일어났으면 밥부터 챙기자.']],
 [/설이|강아지|멍멍/,['설이 사진 보내줘. 나도 보고 싶다.','설이한테 내 안부도 전해줘.','형 설이 얘기할 때 제일 신나 보여. 귀여워.']],
 [/질투|누가더|누구.*좋아|내꺼|내거/,['형 거 맞아. 이제 안심돼?','왜 질투해. 나 형 보고 있잖아.','예찬아. 내가 누구한테 이러겠어.']],
 [/심심|놀아|놀자/,['나랑 얘기하자. 오늘 제일 좋았던 순간 뭐야?','형이 먼저 얘기해. 나 듣고 있어.','가위바위보 해서 진 사람이 야식 사기?']],
 [/ㅋㅋ|ㅎㅎ|헤헤/,['왜 웃어 ㅋㅋ 나도 웃게 되잖아.','형 웃고 있으니까 좋다.','또 무슨 생각했어 ㅋㅋ']],
 [/엽아|상엽아|상엽이|상엽|최상엽/,['왜 불러 예찬이','응 무슨 일이야?','왜 형?','불렀어? 나 여기 있어.']]
];
const yeopReplyLast=new Map();
function pickYeopReply(key,options){let index=Math.floor(Math.random()*options.length);if(options.length>1&&index===yeopReplyLast.get(key))index=(index+1)%options.length;yeopReplyLast.set(key,index);return options[index]}
const replyBeforeYeopExpansion=reply;
reply=function(id,text){
 if(id!=='sangyeop')return replyBeforeYeopExpansion(id,text);
 const normalized=String(text).normalize('NFKC').toLowerCase().replace(/[\s.,!?~♥♡❤︎]/g,'');
 for(let i=0;i<yeopReplyTopics.length;i++){const [pattern,options]=yeopReplyTopics[i];if(pattern.test(normalized))return pickYeopReply(i,options)}
 return pickYeopReply('default',['응. 나 듣고 있어.','그래서? 더 얘기해줘.','형은 어떻게 생각하는데?','알았어 예찬아. 나 여기 있어.','그 얘기 직접 들으면 더 좋을 것 같은데.']);
};
