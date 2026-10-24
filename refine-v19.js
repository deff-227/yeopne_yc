/* Member conversations stay informal; family and work contacts keep their own tone. */
const makeReplyBeforeV19=makeReply;
makeReply=function(id,text){
 const n=normalizeText(text);
 if(id==='yechan'&&/사랑/.test(n))return '나도 사랑해';
 if(['yechan','wonsang','gwangil','group'].includes(id))for(const r of customReplyRules){const key=normalizeText(String(r.keyword||''));if(key&&(r.contact==='all'||r.contact===id)&&n.includes(key))return r.reply}
 if(id==='wonsang'){
  if(/예찬/.test(n))return '형, 예찬이 형한테 직접 물어봐ㅋㅋ';
  if(/밥|먹|고기/.test(n))return '형이 정해. 난 고기면 다 좋아ㅋㅋ';
  if(/잘자|자러|자야/.test(n))return '형도 얼른 자. 내일 봐';
  return '확인했어 형. 내일 맞춰보자';
 }
 if(id==='gwangil'){
  if(/밥|먹|고기/.test(n))return '형이 사는 거지? 그럼 고기ㅋㅋ';
  if(/기타|줄|피크/.test(n))return '고마워 형. 이따 쓰고 제자리에 둘게';
  if(/잘자|자러|자야/.test(n))return '형도 빨리 자ㅋㅋ 내일 보자';
  return '알았어 형. 내일 봐';
 }
 if(id==='group'){
  if(/잘자|자러|자야/.test(n))return '조원상: 형도 얼른 자. 예찬이 형도 이제 자자ㅋㅋ';
  if(/공연|세트|리허설/.test(n))return '신예찬: 엽아 내일도 잘 부탁해ㅋㅋ';
  return '조원상: 형 확인했어ㅋㅋ 내일 보자';
 }
 return makeReplyBeforeV19(id,text)
};
// Repair only exact bundled lines affected by the previous tone migration.
if(!readStore('dialogue-reviewed-v20',false)){
 function repairMemberChatsV19(source){
  if(!source)return;
  const lines={'형 일어났어?':'엽아 일어났어?','많이 먹어야겠다 고마워 형':'많이 먹어야겠다 고마워 엽아','ㅋㅋㅋㅋ알겠어 얼른 자 형':'ㅋㅋㅋㅋ알겠어 얼른 자 엽아','형 잠이 안 온당... 전화 가능해?':storyMessage,'나도 사랑해 형':'나도 사랑해'};
  if(source.yechan)source.yechan=source.yechan.map(m=>[m[0],!m[0]?(lines[m[1]]||m[1]):m[1],m[2]]);
  if(source.group)source.group=source.group.map(m=>[m[0],m[1].replace('신예찬: 형은 내가 재울게','신예찬: 엽이는 내가 재울게').replace('조원상: 왜 형이요','조원상: 왜 형인데ㅋㅋ').replace('형도 잘할 거니까 얼른 자. 다들 얼른 자','잘할 거니까 다들 얼른 자').replace('다들 일찍 자고 이따 봅시다','다들 일찍 자고 이따 보자'),m[2]])
 }
 repairMemberChatsV19(chats);repairMemberChatsV19(chatBaselineV14);
 saveBeforeV14('chat-baseline-v14',chatBaselineV14);saveStore('dialogue-reviewed-v20',true)
}
