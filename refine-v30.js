/* Opening-day lock-screen label and gentle concert replies. */
function concertDDayV30(){
 const d=phoneDate();if(d.getFullYear()!==2026||d.getMonth()!==9||d.getDate()!==23){surface.querySelector('#concertDDayV30')?.remove();return;}
 const group=surface.querySelector('.lock-clock-group');if(!group||surface.querySelector('#concertDDayV30'))return;
 const badge=document.createElement('div');badge.id='concertDDayV30';badge.className='concert-dday-v30';badge.textContent='콘서트 D-DAY';group.appendChild(badge);
}
const lockBeforeV30=renderLock;
renderLock=function(...args){const result=lockBeforeV30(...args);concertDDayV30();return result};
const replyBeforeV30=makeReply;
makeReply=function(id,text){
 if(id==='yechan'){
  const n=normalizeText(text).replace(/\s/g,'');
  if(/떨린|떨려|떨리네|긴장돼|긴장되/.test(n))return pickReplyV25(id,'concert-nerves30',[
   '나두 떨려 ㅎㅎ 무대에서 나 보면 웃어줘. 나도 엽이 보고 웃을게',
   '엽아 손 줘봐. 내가 꼭 잡아줄게 ㅎㅎ 우리 같이 잘하고 오자',
   '떨리면 내 옆에 딱 붙어 있어ㅋㅋ 오늘도 내가 옆에 있잖아'
  ]);
  if(/오늘.*콘서트|콘서트.*오늘|오늘.*첫콘|드디어.*콘서트/.test(n))return pickReplyV25(id,'concert-today30',[
   '그러니까아 드디어 오늘이네 ㅎㅎ 엽이랑 같이 무대 올라갈 생각하니까 벌써 좋아',
   '우리 오늘도 눈 마주치면 웃는 거다? ㅎㅎ 끝나고 내가 꼭 안아줄게',
   '오늘도 내 옆에 엽이 있네 ㅎㅎ 우리 재밌게 하고 오자. 내가 많이 좋아해'
  ]);
 }
 return replyBeforeV30(id,text);
};
const ddayStyleV30=document.createElement('style');ddayStyleV30.textContent='.concert-dday-v30{display:table;margin:14px auto 0;padding:7px 14px;border:1px solid rgba(255,255,255,.4);border-radius:999px;background:rgba(32,52,44,.42);backdrop-filter:blur(12px);color:#fff;font-size:12px;font-weight:600;letter-spacing:1px;line-height:1.3;text-shadow:none}';document.head.appendChild(ddayStyleV30);
if(screen==='lock')concertDDayV30();
