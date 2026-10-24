/* Live notification shade; brightness and accessory state stay local to this phone. */
let brightnessV27=readStore('screen-brightness-v27',90),mediaVolumeV27=readStore('media-volume-v27',65);
const notificationReadV27=readStore('notification-read-v27',{}),dismissedV27=readStore('notification-dismissed-v27',[]);
quickStates.bluetooth=readStore('bluetooth-connected-v27',false);
function setBrightness(value){
 brightnessV27=Math.max(10,Math.min(100,Number(value)||10));const display=$('#screen');display.dataset.brightness=brightnessV27/100;surface.style.filter='';
 let shade=$('#brightnessShadeV27');if(!shade){shade=document.createElement('div');shade.id='brightnessShadeV27';shade.setAttribute('aria-hidden','true');display.appendChild(shade)}
 shade.style.opacity=(1-brightnessV27/100)*.72;saveStore('screen-brightness-v27',brightnessV27);
 const label=$('#quickBrightnessValueV27');if(label)label.textContent=brightnessV27+'%';
}
function setMediaVolumeV27(value){mediaVolumeV27=Number(value);saveStore('media-volume-v27',mediaVolumeV27);callSong.volume=mediaVolumeV27/100;outgoingVoiceV13.volume=mediaVolumeV27/100;document.querySelectorAll('audio').forEach(a=>a.volume=mediaVolumeV27/100)}
function notificationItemsV27(){
 return Object.entries(chats).flatMap(([id,rows])=>{
  if(id==='yechan'&&allRead)return [];
  const row=rows.filter(row=>!row[0]&&row[4]>(notificationReadV27[id]||0)).at(-1);if(!row)return [];
  const key=row[3]||id+':'+row[4]+':'+row[1];if(dismissedV27.includes(key))return [];
  return [{id,key,row}];
 }).sort((a,b)=>b.row[4]-a.row[4]);
}
function notificationContentV27(){
 const items=notificationItemsV27();return items.length?items.map(({id,key,row})=>`<button class="quick-notification-v27" onclick="openQuickMessageV27('${esc(encodeURIComponent(id))}')"><span class="quick-notification-icon-v27">TALK</span><div><small>카카오톡 · ${esc(row[2])}</small><b>${esc(CONTACTS[id]?.name||id)}</b><p>${esc(row[1]==='[예찬 음성메시지]'?'음성메시지':row[1].startsWith('[음성 녹음:')?'음성 녹음 파일':row[1].startsWith('[사진:')?'사진을 보냈습니다.':row[1])}</p></div></button>`).join(''):'<div class="quick-empty-v27">새로운 알림이 없습니다</div>';
}
function openQuickMessageV27(encoded){const id=decodeURIComponent(encoded);overlay.innerHTML='';if(unlocked)openChat(id);else beginUnlock(id)}
const readChatBeforeV27=openChat;
openChat=function(id){readChatBeforeV27(id);notificationReadV27[id]=Date.now();saveStore('notification-read-v27',notificationReadV27)};
function refreshQuickNotificationsV27(){const box=$('#quickNotificationsV27');if(!box)return;const html=notificationContentV27();if(box.innerHTML!==html)box.innerHTML=html}
function clearQuickNotificationsV27(){for(const item of notificationItemsV27())if(!dismissedV27.includes(item.key))dismissedV27.push(item.key);saveStore('notification-dismissed-v27',dismissedV27);refreshQuickNotificationsV27()}
function toggleBluetoothV27(fromQuick=true){quickStates.bluetooth=!quickStates.bluetooth;saveStore('bluetooth-connected-v27',quickStates.bluetooth);toast(quickStates.bluetooth?'신예찬_이어폰 연결됨':'블루투스 연결 해제');if(fromQuick)openQuick();else renderConnections()}
const toggleBeforeV27=quickToggle;
quickToggle=function(id){if(id==='bluetooth'){toggleBluetoothV27();return}toggleBeforeV27(id)};
function openQuickMusicV27(){
 let index=SONGS.findIndex(song=>song.artist==='LUCY'&&song.title.toLowerCase()==='opening');
 if(index<0){index=SONGS.length;SONGS.push({title:'Opening',artist:'LUCY',query:'LUCY Opening official audio',color:'#748d83'})}
 currentSong=index;overlay.innerHTML='';if(!unlocked){beginUnlock('music');return}openApp('music');if(typeof openPlayer==='function')openPlayer(index);
}
const quickBeforeV27=openQuick;
openQuick=function(){
 quickBeforeV27();const d=phoneDate();
 overlay.innerHTML=`<section class="quick-panel quick-panel-v27"><header class="quick-header-v27"><div><h2>${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}</h2><span>${d.getMonth()+1}월 ${d.getDate()}일 ${realtimeDaysV22[d.getDay()]}</span></div><div><button aria-label="전원" onclick="lockPhone()">⏻</button><button aria-label="설정 열기" onclick="overlay.innerHTML='';openApp('settings')">${icon('settings')}</button></div></header><div class="quick-main"><button class="quick-tile ${quickStates.wifi?'on':''}" onclick="quickToggle('wifi')">${icon('wifi')}<span>Wi-Fi<small>${quickStates.wifi?'LUCY_STUDIO':'꺼짐'}</small></span></button><button class="quick-tile ${quickStates.bluetooth?'on':''}" aria-label="블루투스 연결" onclick="quickToggle('bluetooth')"><strong>ᛒ</strong><span>블루투스<small>${quickStates.bluetooth?'신예찬_이어폰':'연결 안 됨'}</small></span></button></div><div class="quick-circles">${[['sound','♫','소리'],['rotate','↻','자동 회전'],['airplane','✈','비행기 모드'],['torch','ϟ','손전등'],['location','⌖','위치'],['saving','▯','절전 모드'],['link','▣','Windows 연결'],['capture','▧','화면 캡처']].map(([id,symbol,name])=>`<button class="${quickStates[id]?'on':''}" onclick="quickToggle('${id}')"><span>${symbol}</span>${name}</button>`).join('')}</div><div class="quick-range-v27"><label for="brightnessRangeV27">☀ 화면 밝기 <span id="quickBrightnessValueV27">${brightnessV27}%</span></label><input id="brightnessRangeV27" type="range" aria-label="화면 밝기" min="10" max="100" value="${brightnessV27}" oninput="setBrightness(this.value)"></div><div class="quick-range-v27"><label for="mediaVolumeV27">♫ 미디어 음량</label><input id="mediaVolumeV27" type="range" aria-label="미디어 음량" min="0" max="100" value="${mediaVolumeV27}" oninput="setMediaVolumeV27(this.value)"></div><button class="quick-music-v27" aria-label="LUCY Opening 열기" onclick="openQuickMusicV27()"><img src="assets/stage.jpg" alt=""><span><small>YouTube Music</small><b>Opening</b><span>LUCY</span></span><strong>▷</strong></button><div class="quick-notification-heading-v27"><span>알림</span><button onclick="clearQuickNotificationsV27()">모두 지우기</button></div><div id="quickNotificationsV27">${notificationContentV27()}</div><button class="quick-close" onclick="overlay.innerHTML=''">닫기 ⌃</button></section>`;
};
const connectionsBeforeV27=renderConnections;
renderConnections=function(){connectionsBeforeV27();const button=surface.querySelector('[aria-label="블루투스 전환"]');if(button){button.onclick=()=>toggleBluetoothV27(false);if(quickStates.bluetooth)button.closest('.wifi-row').insertAdjacentHTML('afterend','<div class="wifi-row"><span>신예찬_이어폰<small style="display:block;color:#738875">연결됨</small></span><span>ᛒ</span></div>')}};
const bannerBeforeV27=receiveBanner;
receiveBanner=function(id,text){const showing=!!$('#quickNotificationsV27');bannerBeforeV27(id,text);if(showing){overlay.querySelector('.incoming-banner')?.remove();refreshQuickNotificationsV27()}};
setInterval(refreshQuickNotificationsV27,1000);
setBrightness(brightnessV27);
