/* Final review fixes: updated defaults, media editing, and call navigation cleanup. */
if(!readStore('profile-defaults-final-v20',false)){
 delete mediaV7['profile:self'];delete mediaV7['profile:yechan'];
 persistV7();saveStore('profile-defaults-final-v20',true)
}
const surfaceBeforeV20=setSurface;
setSurface=function(html,opts){const src=esc(mediaV7['photo:yechan-call']||'assets/profile-yechan-v20.jpg');surfaceBeforeV20(html.replaceAll('src="assets/yechan-call.jpg"',`src="${src}"`),opts)};
albumPhotoSrcV9=function(key){return mediaV7['photo:'+key]||(key==='yechan-call'?'assets/profile-yechan-v20.jpg':'assets/'+key+'.jpg')};
const backBeforeV20=goBack;
goBack=function(){if(overlay.querySelector('.call-keypad-sheet-v15')){overlay.querySelector('.call-keypad-sheet-v15').remove();return}if(callStage==='ringing'){declineIncoming();return}if(callStage==='connected'&&overlay.querySelector('.incoming-call')){endIncomingCall();return}backBeforeV20()};
const homeBeforeV20=goHome;
goHome=function(){if(callStage==='ringing')declineIncoming();else if(callStage==='connected'&&overlay.querySelector('.incoming-call'))endIncomingCall();homeBeforeV20()};
const lockBeforeV20=lockPhone;
lockPhone=function(){if(callStage==='ringing')declineIncoming();else if(callStage==='connected')endIncomingCall();if(storyStage==='calling'&&!callStage){clearTimeout(storyCallTimer);storyStage='message'}stopNoticeV17();lockBeforeV20()};

const declineBeforeV20=declineIncoming;
declineIncoming=function(missed=false){declineBeforeV20(missed);storyStage='finished'};
const recentsBeforeV20=recentApps;
recentApps=function(){if(callStage==='ringing')declineIncoming();else if(callStage==='connected'&&overlay.querySelector('.incoming-call'))endIncomingCall();recentsBeforeV20()};
const quickBeforeV20=openQuick;
openQuick=function(){if(callStage==='ringing')declineIncoming();else if(callStage==='connected'&&overlay.querySelector('.incoming-call'))endIncomingCall();quickBeforeV20()};
