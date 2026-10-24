/* Interactive quiet calls, resumable transcripts and conversation search. */
let restoringCallV33=null;
const choiceSetsV33=[
 [{text:'나도 보고 싶어',reply:'나두 ㅎㅎ 그 말 들으니까 지금 만나러 가고 싶잖아.'},{text:'조금만 더 얘기하자',reply:'좋아. 나 안 끊을게. 편하게 누워서 얘기해 엽아.'}],
 [{text:'오늘 형 진짜 멋있었어',reply:'아 뭐야아ㅋㅋ 너한테 들으니까 더 좋네. 나 내일도 열심히 해야겠다.'},{text:'내일도 같이 잘하자',reply:'응, 내일도 같이. 떨리면 나 한 번 봐줘. 내가 웃어줄게.'}],
 [{text:'사랑해 형',reply:'나도 사랑해 엽아. 오늘도 내일도 많이 ㅎㅎ'},{text:'끝나고 꼭 안아줘',reply:'알았어. 네가 먼저 놓으라고 할 때까지 안고 있을게ㅋㅋ'}]
];
function paintQuietTranscriptV33(){const box=$('#textCallLinesV26');if(!box||!textCallV26)return;box.innerHTML=textCallV26.shown.map(r=>`<p class="${r.speaker==='self'?'quiet-self-v33':''}">${r.speaker==='self'?'<small>상엽</small>':''}${esc(r.text)}</p>`).join('');box.scrollTop=box.scrollHeight}
function checkpointCallV33(){if(!textCallV26?.script.band?.startsWith('quiet32:'))return;const e=textCallV26;e.resumeV33={script:structuredClone(e.script),index:e.index,shown:structuredClone(e.shown),choices:[...(e.choicesV33||[])],waiting:e.waitingV33??null};}
function showChoiceV33(gate){
 const e=textCallV26;if(!e)return;clearTimeout(e.next);e.waitingV33=gate;
 let box=$('#quietChoicesV33');if(!box){box=document.createElement('div');box.id='quietChoicesV33';box.className='quiet-choices-v33';box.setAttribute('role','group');box.setAttribute('aria-label','예찬이에게 답하기');$('#textCallLinesV26')?.insertAdjacentElement('afterend',box)}
 box.innerHTML=choiceSetsV33[gate].map((c,i)=>`<button onclick="chooseQuietReplyV33(${i})">${esc(c.text)}</button>`).join('');const next=surface.querySelector('.text-call-next-v26');if(next)next.disabled=true;checkpointCallV33();
}
function chooseQuietReplyV33(index){
 const e=textCallV26;if(!e||e.waitingV33==null)return;const gate=e.waitingV33,choice=choiceSetsV33[gate]?.[index];if(!choice)return;
 e.waitingV33=null;(e.choicesV33||(e.choicesV33=[])).push(gate);e.shown.push({text:choice.text,speaker:'self',at:Date.now()});e.script.lines.splice(e.index,0,choice.reply);$('#quietChoicesV33')?.remove();const next=surface.querySelector('.text-call-next-v26');if(next)next.disabled=false;paintQuietTranscriptV33();checkpointCallV33();e.next=setTimeout(()=>showTextLineV26(),900);
}
const lineBeforeV33=showTextLineV26;
showTextLineV26=function(){
 const e=textCallV26;if(!e)return;
 if(restoringCallV33){const snapshot=restoringCallV33;restoringCallV33=null;e.script=structuredClone(snapshot.script);e.index=snapshot.index;e.shown=structuredClone(snapshot.shown);e.choicesV33=[...snapshot.choices];paintQuietTranscriptV33();if(snapshot.waiting!=null){showChoiceV33(snapshot.waiting);return}}
 if(e.waitingV33!=null)return;
 const result=lineBeforeV33();if(!textCallV26)return result;
 paintQuietTranscriptV33();
 if(e.script.band?.startsWith('quiet32:')){const gate=[4,10,16].findIndex((threshold,i)=>e.index>=threshold&&!(e.choicesV33||[]).includes(i));if(gate>=0)showChoiceV33(gate);checkpointCallV33()}
 return result;
};
const finishBeforeV33=finishTextCallV26;
finishTextCallV26=function(...args){
 const e=textCallV26;if(!e)return;checkpointCallV33();const snapshot=e.resumeV33&&e.index<e.script.lines.length?structuredClone(e.resumeV33):null,started=e.started;
 const result=finishBeforeV33(...args),row=callLog.find(r=>r.recordId==='text26:'+started);
 if(row){if(snapshot)row.resumeV33=snapshot;row.transcript=e.shown.map(r=>({...r}));saveStore('call-log',callLog)}return result;
};
function resumeQuietCallV33(recordId){
 const row=callLog.find(r=>r.recordId===recordId);if(!row?.resumeV33)return;
 if(callStage){toast('현재 통화를 먼저 종료해 주세요.');return}if(denyContactV23())return;if(sleepingV23()){toast('예찬이는 지금 자고 있어요. 아침에 다시 전화해 주세요.');return}
 const original=textScriptV26;restoringCallV33=structuredClone(row.resumeV33);restoringCallV33.script.day=phoneDate().getDate();textScriptV26=()=>({...structuredClone(row.resumeV33.script),day:phoneDate().getDate()});
 try{startTextCallV26('발신')}finally{textScriptV26=original;restoringCallV33=null}
}
const archiveBeforeV33=openCallArchiveV26;
openCallArchiveV26=function(id){archiveBeforeV33(id);const row=callLog.find(r=>r.recordId===id);if(!row)return;const box=overlay.querySelector('.collection-list-v25');if(!box)return;
 if(row.transcript)box.querySelectorAll('.archived-line-v26').forEach((el,i)=>{if(row.transcript[i]?.speaker==='self'){el.classList.add('quiet-self-v33');el.insertAdjacentHTML('afterbegin','<small>상엽</small>')}});
 if(row.resumeV33){const btn=document.createElement('button');btn.className='collection-item-v25';btn.textContent='이 통화 이어 보기 ›';btn.onclick=()=>resumeQuietCallV33(id);box.appendChild(btn)}
};
function normalizedSearchV33(text){return String(text).normalize('NFC').toLocaleLowerCase().replace(/\s+/g,'')}
function conversationMatchesV33(query,id=activeChat){const q=normalizedSearchV33(query);if(!q)return [];return (chats[id]||[]).map((row,index)=>({row,index})).filter(({row})=>normalizedSearchV33(row[1]).includes(q)).reverse()}
findMessages=function(query){const box=$('#convResults');if(!box)return;const matches=conversationMatchesV33(query);box.innerHTML=!String(query).trim()?'검색어를 입력하세요.':matches.length?`<p>${matches.length}개의 메시지</p>`+matches.map(({row,index})=>`<button class="search-result-v33" onclick="jumpToMessageV33(${index})"><small>${row[0]?'상엽':esc(CONTACTS[row[5]]?.short||CONTACTS[activeChat]?.name||'상대방')} · ${row[4]?esc(realtimeDateLabelV22(row[4]))+' · ':''}${esc(row[2]||'')}</small><span>${esc(row[1])}</span></button>`).join(''):'검색 결과가 없습니다.'};
function jumpToMessageV33(index){overlay.innerHTML='';renderChat();requestAnimationFrame(()=>{const el=surface.querySelectorAll('#chatScroll .message')[index];if(el){el.scrollIntoView({block:'center',behavior:'auto'});el.classList.add('search-hit-v33');setTimeout(()=>el.classList.remove('search-hit-v33'),1800)}})}
const cssV33=document.createElement('style');cssV33.textContent='.quiet-choices-v33{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;padding:8px 16px}.quiet-choices-v33 button{border:1px solid #ffffff60;border-radius:16px;background:#f6faf1;color:#294537;padding:9px 12px;font-size:11px}.quiet-self-v33{background:#e1f1df!important;color:#264731!important;margin-left:24px!important}.quiet-self-v33 small{display:block;opacity:.65;font-size:10px;margin-bottom:3px}.search-result-v33{display:block;text-align:left;width:100%;border:0;border-bottom:1px solid #e6e9e5;padding:12px;background:transparent;color:inherit}.search-result-v33 small{display:block;font-size:10px;color:#788478}.search-result-v33 span{display:block;overflow-wrap:anywhere;margin-top:4px}.search-hit-v33{outline:2px solid #8aaa7c;outline-offset:3px;border-radius:10px}.text-call-next-v26:disabled{opacity:.4}';document.head.appendChild(cssV33);
