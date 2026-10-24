/* Each visit is a new story run. Only deliberate content edits persist. */
let runStartedV14=Date.now();
phoneDate=function(){return new Date(new Date(2026,9,23,1,0,0).getTime()+Date.now()-runStartedV14)};
const runMessageTextsV14=new Set([storyMessage,'목소리 들으니까 좋다 ㅎㅎ','형 잠이 안 온당... 전화 가능해?','어땠어?','잘 자 엽아 ㅎㅎ','사랑해 내일 봐','어땠어?\n잘 자 엽아 이따 봐','ㅋㅋㅋㅋ잘 자 엽아. 이따 봐','엽아 잤어? 나 잠깐 전화했는데','바쁘면 이따 해도 돼ㅋㅋ 나 아직 안 자']);
let chatBaselineV14=readStore('chat-baseline-v14',null);
if(!chatBaselineV14){chatBaselineV14=structuredClone(chats);const rows=chatBaselineV14.yechan||[],first=rows.findIndex(m=>m[1]===storyMessage);chatBaselineV14.yechan=(first>=0?rows.slice(0,first):rows).filter(m=>!runMessageTextsV14.has(m[1]));saveStore('chat-baseline-v14',chatBaselineV14)}
const saveBeforeV14=saveStore;
saveStore=function(key,value){if(['chats','call-log','allRead','story-v3-seeded'].includes(key))return;saveBeforeV14(key,value)};
// Real-time conversation snapshots are retained by refine-v22.
chats=structuredClone(chatBaselineV14);callLog=[];savedRecentV5=readStore('call-baseline-v15',readStore('recent-history-v5',RECENT_SEED_V5));allRead=true;storyStage='locked';callStage=null;callQueued=false;clearTimeout(storyCallTimer);clearCallTimers();postCallMessageTimers.forEach(clearTimeout);postCallMessageTimers=[];
queueIncomingCall=function(){if(storyStage!=='locked')return;runStartedV14=Date.now();storyStage='message';allRead=false;chats.yechan=(chats.yechan||[]).filter(m=>!runMessageTextsV14.has(m[1]));chats.yechan.push([0,storyMessage,'오전 1:00']);updatePhoneClock();refreshUnreadBadges();setTimeout(()=>{if(unlocked&&storyStage==='message')receiveBanner('yechan',storyMessage)},650)};
const editorSaveBeforeV14=saveSiteEditorV5;
saveSiteEditorV5=function(section){const target=section==='chat'?$('#editChatTarget')?.value:null;editorSaveBeforeV14(section);if(target&&!overlay.querySelector('#editDataV5')){chatBaselineV14[target]=structuredClone(chats[target]);saveBeforeV14('chat-baseline-v14',chatBaselineV14)}};
// Story runs always begin with the incoming message, even if a call shortcut is used first.
const startCallBeforeV14=startCall;
startCall=function(id){if(id==='yechan'&&['locked','message','calling'].includes(storyStage)){if(!unlocked){beginUnlock();return}if(storyStage==='locked')queueIncomingCall();openChat('yechan');return}startCallBeforeV14(id)};
updatePhoneClock();if(screen==='lock')renderLock();
