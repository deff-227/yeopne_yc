(function(){
const baseSave=saveStore;saveStore=function(key,value){if(key==='chats'){value.yechan=(value.yechan||[]).map(m=>{const r=[...m];r[1]=m[0]?PhoneChat.casual(m[1]):m[1];return r});PhoneChat.write(value)}else baseSave(key,value)};
let last='';function refresh(){const raw=localStorage.getItem('yeop-chats')||'';if(raw===last)return;last=raw;const all=PhoneChat.read();chats.yechan=all.yechan;if(activeChat==='yechan'&&screen!=='call')renderChat()}
refresh();addEventListener('storage',refresh);addEventListener('focus',refresh);setInterval(refresh,1200);
})();

/* October 24: photo sent from Yechan; preserve the shared chat direction and time. */
const sangyeopMsgBeforeMidconcert=msgHTML;
msgHTML=function(row,id){
 if(id==='yechan'&&row[3]==='midconcert-20261024-photo'){
  const photo='assets/yechan-oct24-bubble-02.jpg';
  return `<div class="message ${row[0]?'mine':''}">${row[0]?'':profile(id)}<div class="msg-body">${row[0]?'':`<div class="sender-name">${esc(CONTACTS[id]?.name||'예찬이형♥')}</div>`}<div class="bubble-line"><button class="chat-photo-oct24" type="button" onclick="window.open('${photo}','_blank','noopener')" aria-label="예찬이 보낸 사진 열기"><img src="${photo}" alt="예찬이 보낸 셀카"></button><span class="msg-time">${esc(row[2]||'오후 11:21')}</span></div></div></div>`;
 }
 return sangyeopMsgBeforeMidconcert(row,id);
};
const styleMidconcertSangyeop=document.createElement('style');
styleMidconcertSangyeop.textContent='.chat-photo-oct24{border:0;padding:0;max-width:205px;overflow:hidden;border-radius:12px;display:block;background:#f6f6f6;cursor:pointer}.chat-photo-oct24 img{display:block;width:100%;height:auto;max-height:275px;object-fit:cover}';
document.head.append(styleMidconcertSangyeop);
