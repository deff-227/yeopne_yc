(function(){
const baseSave=saveStore;saveStore=function(key,value){if(key==='chats'){value.yechan=(value.yechan||[]).map(m=>{const r=[...m];r[1]=m[0]?PhoneChat.casual(m[1]):m[1];return r});PhoneChat.write(value)}else baseSave(key,value)};
let last='';function refresh(){const raw=localStorage.getItem('yeop-chats')||'';if(raw===last)return;last=raw;const all=PhoneChat.read();chats.yechan=all.yechan;if(activeChat==='yechan'&&screen!=='call')renderChat()}
refresh();addEventListener('storage',refresh);addEventListener('focus',refresh);setInterval(refresh,1200);
})();
