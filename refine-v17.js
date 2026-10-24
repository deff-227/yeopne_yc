/* Notification audio shares the call audio context and stops immediately on answer. */
const noticeAudioV17={context:null,nodes:new Map()};
function primeNoticeAudioV17(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;audioContext??=new C();noticeAudioV17.context=audioContext;if(audioContext.state==='suspended')audioContext.resume().catch(()=>{})}catch{}}
function stopNoticeV17(kind){for(const [node,type] of noticeAudioV17.nodes)if(!kind||type===kind){try{node.stop()}catch{}noticeAudioV17.nodes.delete(node)}try{navigator.vibrate?.(0)}catch{}}
function playNoticeToneV17(kind='message'){
 if(!soundOn)return;
 try{primeNoticeAudioV17();const c=noticeAudioV17.context;if(!c||c.state!=='running')return;const now=c.currentTime,notes=kind==='call'?[[659,0],[784,.2],[988,.4]]:[[880,0],[1175,.12]];
 for(const [hz,delay] of notes){const osc=c.createOscillator(),gain=c.createGain();osc.type='sine';osc.frequency.setValueAtTime(hz,now+delay);gain.gain.setValueAtTime(.0001,now+delay);gain.gain.exponentialRampToValueAtTime(kind==='call'?.055:.035,now+delay+.018);gain.gain.exponentialRampToValueAtTime(.0001,now+delay+(kind==='call'?.18:.13));osc.connect(gain);gain.connect(c.destination);noticeAudioV17.nodes.set(osc,kind);osc.onended=()=>{noticeAudioV17.nodes.delete(osc);osc.disconnect();gain.disconnect()};osc.start(now+delay);osc.stop(now+delay+(kind==='call'?.2:.15))}
 }catch{}
}
function vibrateNoticeV17(kind='message'){if(!soundOn||!navigator.vibrate)return;try{navigator.vibrate(kind==='call'?[180,100,180,450]:[70,45,70])}catch{}}
const receiveBannerBeforeV17=receiveBanner;
receiveBanner=function(id,text){if(!callStage){playNoticeToneV17();vibrateNoticeV17()}return receiveBannerBeforeV17(id,text)};
ringTone=function(){if(callStage!=='ringing')return;playNoticeToneV17('call');vibrateNoticeV17('call')};
const clearCallTimersBeforeV17=clearCallTimers;
clearCallTimers=function(){clearCallTimersBeforeV17();stopNoticeV17('call')};
const quickBeforeV17=openQuick;
openQuick=function(){quickStates.sound=soundOn;quickBeforeV17()};
const quickToggleBeforeV17=quickToggle;
quickToggle=function(id){if(id==='sound'){soundOn=!soundOn;saveStore('sound',soundOn);if(!soundOn)stopNoticeV17();openQuick();return}quickToggleBeforeV17(id)};
document.addEventListener('pointerdown',primeNoticeAudioV17,{passive:true});
document.addEventListener('keydown',primeNoticeAudioV17);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopNoticeV17('call')});
