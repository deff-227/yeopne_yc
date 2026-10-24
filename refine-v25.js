/* Contextual chat, delayed contact, shared-file collections and favorite messages. */
const chatExtrasV25=readStore('chat-extras-v25',{memory:{},favorites:[],followups:[]});
chatExtrasV25.memory??={};chatExtrasV25.favorites??=[];chatExtrasV25.followups??=[];
function saveChatExtrasV25(){saveStore('chat-extras-v25',chatExtrasV25)}
function pickReplyV25(id,category,options){
 const memory=chatExtrasV25.memory[id]||(chatExtrasV25.memory[id]={});
 const key='choice:'+category,index=((memory[key]??-1)+1)%options.length;memory[key]=index;memory.topic=category;memory.at=Date.now();saveChatExtrasV25();return options[index];
}
function nextFreeTimeV25(ms){let d=new Date(ms);while(contactBlockV23(d.getTime())||sleepingV23(d.getTime()))d=new Date(d.getTime()+60000);return d.getTime()}
function scheduleFollowupV25(){
 const due=nextFreeTimeV25(Date.now()+20*60000);
 if(!chatExtrasV25.followups.some(e=>e.kind==='practice'&&e.ms>Date.now())){
  chatExtrasV25.followups.push({kind:'practice',ms:due,id:'followup25:'+Date.now(),text:'나 이제 연습 끝났어. 엽아 뭐 해? 아까 하던 얘기 마저 하자 ㅎㅎ'});saveChatExtrasV25();
 }
}
const replyBeforeV25=makeReply;
makeReply=function(id,text){
 if(id!=='yechan')return replyBeforeV25(id,text);
 const n=normalizeText(text),h=phoneDate().getHours(),memory=chatExtrasV25.memory[id]||(chatExtrasV25.memory[id]={});
 const recent=Date.now()-(memory.at||0)<30*60000,previous=memory.topic;
 if(typeof customReplyRules!=='undefined'&&!/^\[음성 녹음:/.test(text)&&!/보고싶어서/.test(n))for(const rule of customReplyRules){const key=normalizeText(String(rule.keyword||''));if(key&&(rule.contact==='all'||rule.contact===id)&&n.includes(key))return rule.reply}
 let reply;
 if(/^\[음성 녹음:/.test(text))reply=pickReplyV25(id,'audio',['뭐야 너무 좋다아 ㅎㅎ','이거 네가 부른 거야? 너무 좋다… 한 번 더 들을래','나 이거 저장해 둘래. 네 목소리 진짜 좋아','이어폰 끼고 다시 듣는 중 ㅎㅎ 보내줘서 고마워']);
 else if(/^\[사진:/.test(text))reply=pickReplyV25(id,'photo',['이거 언제 찍었어ㅋㅋㅋㅋ 잘 나왔다','잠깐 이거 저장해도 돼?','너 왜 이렇게 귀엽게 나왔어 ㅎㅎ','이 사진 좋다. 나중에 원본도 보내줘']);
 else if(/보고싶어서/.test(n)){reply='나두 ㅎㅎ 연습 끝나고 연락할게';memory.busyUntil=nextFreeTimeV25(Date.now()+20*60000);scheduleFollowupV25()}
 else if(recent&&previous==='meal'&&/^(아직|나도|나도아직)$|아직안|안먹|못먹/.test(n))reply=pickReplyV25(id,'meal-next',['그럼 같이 먹자. 너 뭐 먹고 싶어?','우리 둘 다 아직이네ㅋㅋ 내가 메뉴 찾아볼게','일단 뭐라도 먹자. 너 배고프면 힘 없잖아']);
 else if(recent&&previous==='tired'&&/그냥|모르겠|괜찮|응|웅/.test(n))reply=pickReplyV25(id,'comfort',['말하기 싫으면 안 해도 돼. 그냥 옆에 있을게','알았어. 그래도 혼자 끙끙대지는 말고','그럼 오늘은 좀 쉬자. 나랑 별 얘기나 하면서']);
 else if(/보고싶|보고시|생각나|만나고싶|보고파/.test(n))reply=pickReplyV25(id,'miss',['나도 보고 싶어 엽아','아까부터 네 생각 하고 있었는데 ㅎㅎ','조금만 기다려. 나도 얼른 보고 싶어','아까 봤는데 왜 또 보고 싶지ㅋㅋ']);
 else if(/사랑|좋아해|조아해/.test(n)||/[♥♡❤🫶]/u.test(text))reply=pickReplyV25(id,'love',['나도 사랑해','ㅋㅋㅋㅋ알았어 나도 많이 사랑해','그렇게 말하면 나 또 보고 싶잖아','나도. 오늘은 내가 더 좋아할게 ㅎㅎ']);
 else if(/뭐해|머해|모해|뭐하는|머하는/.test(n)){
  if(memory.busyUntil>Date.now())reply=pickReplyV25(id,'busy',['아직 연습 중이야. 끝나면 내가 먼저 연락할게','한 번만 더 맞춰보고! 조금만 기다려 엽아','잠깐 폰 봤어ㅋㅋ 끝나고 얘기하자']);
  else reply=h>=22||h<2?pickReplyV25(id,'night',['씻고 누웠어. 이제 좀 살겠다','네 카톡 기다리면서 폰 보고 있었지 ㅎㅎ','누워 있는데 잠이 안 오네. 너는?']):pickReplyV25(id,'doing',['연습하다 잠깐 쉬는 중. 너는?','방금 물 마시러 나왔어. 엽이는 뭐 해','녹음한 거 다시 듣고 있었어','잠깐 쉬고 있어. 네 카톡 오니까 좋네 ㅎㅎ']);
 }
 else if(/밥|먹었|먹음|배고|저녁|점심|아침|메뉴/.test(n))reply=pickReplyV25(id,'meal',['아직 못 먹었어. 너는 먹었어?','먹었지. 근데 너랑 먹으면 또 먹을 수 있어','너 또 밥 안 먹었지ㅋㅋ 얼른 먹어','나 메뉴 못 정하겠어. 너 뭐 먹을 건데']);
 else if(/힘들|지쳤|지쳐|피곤|우울|별로야|속상/.test(n))reply=pickReplyV25(id,'tired',['무슨 일 있었어? 얘기해 봐','오늘 많이 힘들었나 보네. 내가 들어줄게','일단 좀 앉아 있어. 밥은 먹었고?','괜찮은 척 안 해도 돼. 천천히 얘기해']);
 else if(/잘자|졸려|먼저잘|자러|잘게|굿나잇/.test(n))reply=pickReplyV25(id,'sleep',['너도 잘 자 엽아. 폰 그만 보고 ㅎㅎ','응 얼른 자. 오늘도 고생했어','꿈에서 만나 그럼. 잘 자','일어나면 연락해. 나도 이제 잘게']);
 else if(/^(형|형아|혀엉|형님|예찬이형|예찬형|예찬아)+$/.test(n))reply=pickReplyV25(id,'calling',['왜애 엽아','ㅋㅋㅋㅋ왜 이렇게 귀엽게 불러','나 여기 있는데. 무슨 일이야','보고 싶어서 부르는 거지 ㅎㅎ']);
 else if(/고마워|고맙|감사/.test(n))reply=pickReplyV25(id,'thanks',['나한테 그런 말 안 해도 돼 ㅎㅎ','고마우면 밥 같이 먹어줘','내가 더 고맙지. 늘 고마워 엽아']);
 else if(/연습|바빠|끝났어|끝나면/.test(n)){
  reply=pickReplyV25(id,'practice',['나도 아직 연습 중이야. 끝나고 연락할게','우리 둘 다 바쁘네ㅋㅋ 끝나고 연락할게','조금만 더 맞춰보고 연락할게. 밥 챙겨 먹고 있어']);
  memory.busyUntil=nextFreeTimeV25(Date.now()+20*60000);scheduleFollowupV25();
 }else reply=pickReplyV25(id,'smalltalk',['ㅋㅋㅋㅋ그래서 어떻게 됐는데?','응 듣고 있어. 더 얘기해 봐','엽아 너랑 이렇게 얘기하는 거 좋다','그랬어? 나한테도 좀 자세히 말해줘']);
 if(/연습 끝나고 연락할게|끝나고 연락할게|맞춰보고 연락할게/.test(reply))scheduleFollowupV25();
 saveChatExtrasV25();return reply;
};
const proactiveV25={
 1:[['엽아 아직 깨어 있어?','응 형. 조금만 더 있다 자려고'],['나 잠이 안 오네. 너는?','나도 아직 안 자. 형 뭐 하고 있었어?'],['이 시간만 되면 네 생각이 나','나도 형 생각하고 있었는데']],
 9:[['일어났어? 오늘은 좀 쌀쌀하더라','응 형. 겉옷 챙겨 나갈게'],['엽아 잘 잤어? 나는 이제 나갈 준비 중','잘 잤어. 형도 아침 챙겨 먹어'],['눈 뜨자마자 네 생각나서 연락했지 ㅎㅎ','아침부터 왜 이렇게 귀여워 형']],
 12:[['밥 먹었어? 나 메뉴 못 정하겠어','나도 아직. 형 뭐 먹고 싶은데?'],['점심은 꼭 챙겨 먹어. 너 또 까먹을까 봐','알았어 형 ㅎㅎ 형도 맛있는 거 먹어'],['나 이제 밥 먹으러 나왔어. 같이 먹을래?','좋지. 어디로 가면 돼?']],
 19:[['저녁 뭐 먹을지 정했어? 애들이 고기 먹자던데','고기 좋지. 형도 같이 먹을 거지?'],['엽아 애들이 찜닭 먹자는데 너도 갈래?','응 갈래. 형 어디야?'],['나 저녁 메뉴 아직 못 골랐어ㅋㅋ 너는?','형이랑 같이 먹으려고 기다렸지']],
 23:[['집 도착했어? 씻고 연락해','응 방금 왔어. 씻고 바로 연락할게'],['오늘도 수고했어 엽아. 이제 좀 쉬어','형도 고생했어. 따뜻하게 하고 자'],['네 목소리 들으니까 오늘 하루가 좀 괜찮네','나도 형이랑 얘기하니까 좋다']]
};
const eventsBeforeV25=realtimeEventsV22;
realtimeEventsV22=function(from,to){
 const events=eventsBeforeV25(from,to);
 for(const event of events){
  if(!event.id.startsWith('rt22:'))continue;
  const d=new Date(event.ms),h=+event.id.split(':').at(-2),options=proactiveV25[h];if(!options)continue;
  const day=Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000),pair=options[day%options.length];event.text=pair[event.dir];
 }
 const days=new Date(from);days.setHours(0,0,0,0);
 while(days.getTime()<=to){
  if(!concertDayV23(days.getTime())){
   const t=new Date(days);t.setHours(21,35,0,0);const key=`${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`,ms=t.getTime();
   for(const e of [{ms,text:'[예찬 음성메시지]',id:'voice25:'+key+':card'},{ms:ms+12000,text:['그냥 네 생각나서 보냈어 ㅎㅎ','엽아 오늘도 고생했어. 이따 얘기하자','갑자기 보고 싶어서ㅋㅋ 잘 듣고 있어?'][t.getDate()%3],id:'voice25:'+key+':text'}])if(e.ms>from&&e.ms<=to)events.push({...e,dir:0});
  }
  days.setDate(days.getDate()+1);
 }
 return events.sort((a,b)=>a.ms-b.ms);
};
function runFollowupsV25(now){
 let changed=false;
 chatExtrasV25.followups=chatExtrasV25.followups.filter(event=>{
  if(event.ms>now)return true;
  if(contactBlockV23(event.ms)||sleepingV23(event.ms)){event.ms=nextFreeTimeV25(event.ms);if(event.ms>now)return true}
  changed=addRealtimeRowV22(0,event.text,event.ms,event.id,!document.hidden)||changed;return false;
 });
 if(changed){saveChatExtrasV25();persistRealtimeV22();refreshUnreadBadges();if(!document.hidden&&screen==='kakao'&&activeChat==='yechan')renderChat()}
}
const advanceBeforeV25=advanceRealtimeV22;
advanceRealtimeV22=function(now,away){advanceBeforeV25(now,away);runFollowupsV25(now)};
function messageIdentityV25(id,row,index){return row[3]||'legacy25:'+id+':'+index+':'+row[0]+':'+row[1]}
function isFavoriteV25(id,row,index){const key=messageIdentityV25(id,row,index);return chatExtrasV25.favorites.some(f=>f.contact===id&&f.key===key)}
function toggleFavoriteV25(encodedId,index){
 const id=decodeURIComponent(encodedId),row=chats[id]?.[index];if(!row)return;
 const key=messageIdentityV25(id,row,index),found=chatExtrasV25.favorites.findIndex(f=>f.contact===id&&f.key===key);
 if(found>=0)chatExtrasV25.favorites.splice(found,1);else chatExtrasV25.favorites.push({contact:id,key,row:structuredClone(row)});
 saveChatExtrasV25();if(screen==='kakao'&&activeChat===id)renderChat();toast(found>=0?'즐겨찾기를 해제했습니다.':'즐겨찾기에 담았습니다.');
}
const msgBeforeV25=msgHTML;
msgHTML=function(row,id){
 let html;
 if(row[1]==='[예찬 음성메시지]')html=`<div class="message">${profile(id)}<div class="msg-body"><div class="sender-name">${esc(CONTACTS[id]?.name)}</div><div class="bubble-line"><div class="bubble voice-card-v25" role="group" aria-label="예찬이의 음성메시지 카드"><span>🎙 음성메시지</span><div aria-hidden="true">▂ ▅ ▃ ▇ ▄ ▆ ▂ ▅ ▃</div></div><span class="msg-time">${esc(row[2])}</span></div></div></div>`;
 else html=msgBeforeV25(row,id);
 const index=chats[id]?.indexOf(row)??-1;if(index<0)return html;
 const liked=isFavoriteV25(id,row,index),button=`<button type="button" class="msg-favorite-v25 ${liked?'liked':''}" aria-label="${liked?'메시지 즐겨찾기 해제':'메시지 즐겨찾기 추가'}" onclick="toggleFavoriteV25('${esc(encodeURIComponent(id))}',${index})">${liked?'♥':'♡'}</button>`;
 const end=html.lastIndexOf('</div></div>');return end>=0?html.slice(0,end)+button+html.slice(end):html;
};
function collectionSheetV25(title,content){overlay.innerHTML=`<div class="info-sheet collection-v25"><header><h3>${esc(title)}</h3><button aria-label="모아보기 닫기" onclick="overlay.innerHTML=''">×</button></header><div class="collection-list-v25">${content||'<p>아직 모아둔 항목이 없습니다.</p>'}</div></div>`}
function showSharedFilesV25(){
 const id=activeChat;if(!id)return;
 const rows=(chats[id]||[]).map((row,index)=>({row,index})).filter(({row})=>/^\[(사진:|음성 녹음:|예찬 음성메시지\])/.test(row[1]));
 collectionSheetV25('주고받은 파일',rows.map(({row,index})=>{
  const recording=sharedRecordingV24(row[1]),photo=row[1].match(/^\[사진:([^\]]+)\]$/),name=recording?.name||(photo?'사진':'예찬이 음성메시지');
  return `<button class="collection-item-v25" onclick="openSharedFileV25('${esc(encodeURIComponent(id))}',${index})"><b>${esc(name)}</b><small>${row[0]?'상엽이':esc(CONTACTS[id]?.name)} · ${esc(row[4]?realtimeDateLabelV22(row[4]):'이전 대화')} ${esc(row[2])}</small></button>`;
 }).join(''));
}
function openSharedFileV25(encodedId,index){
 const id=decodeURIComponent(encodedId),row=chats[id]?.[index];if(!row)return;
 const photo=row[1].match(/^\[사진:([^\]]+)\]$/);
 if(photo){const i=PHOTOS.findIndex(p=>p[0]===photo[1]);if(i<0){toast('사진을 찾을 수 없습니다.');return}overlay.innerHTML='';openPhoto(i);return}
 collectionSheetV25('주고받은 파일',msgHTML(row,id));
}
function showFavoritesV25(){
 const id=activeChat;
 collectionSheetV25('즐겨찾는 메시지',chatExtrasV25.favorites.filter(f=>f.contact===id).map(f=>`<article class="favorite-item-v25"><small>${f.row[0]?'상엽이':esc(CONTACTS[id]?.name)} · ${esc(f.row[2])}</small><p>${esc(f.row[1].startsWith('[음성 녹음:')?(sharedRecordingV24(f.row[1])?.name||'음성 녹음'):f.row[1])}</p></article>`).join(''));
}
const menuBeforeV25=chatMenu;
chatMenu=function(){menuBeforeV25();overlay.querySelector('.chat-menu')?.insertAdjacentHTML('afterbegin','<button onclick="showSharedFilesV25()">주고받은 파일</button><button onclick="showFavoritesV25()">즐겨찾는 메시지</button>')};
const attachmentBeforeV25=chatAttachment;
chatAttachment=function(){attachmentBeforeV25();if(activeChat==='yechan')overlay.querySelector('.attach-sheet')?.insertAdjacentHTML('afterbegin','<button onclick="chooseRecordingV25()">🎙<span>녹음 보내기</span></button>')};
function chooseRecordingV25(){
 collectionSheetV25('예찬이에게 녹음 보내기',RECORDINGS.map((r,i)=>r.src?`<button class="collection-item-v25" onclick="overlay.innerHTML='';shareRecordingToYechanV24(${i})"><b>${esc(r.name)}</b><small>${esc(r.length)}</small></button>`:'').join(''));
}
if(document.querySelector('meta[name="realtime-extension"]')?.content==='25')initializeRealtimeV22();else if(!document.querySelector('meta[name="realtime-extension"]'))runFollowupsV25(Date.now());
