const uploadedRecordingsV12=[
 {id:'upload-1792566622520',name:'음성 녹음 01',date:'10월 23일',length:'00:16',src:'assets/recording-added-01.mp3',note:'원본: 1792566622520.mp4'},
 {id:'upload-tfxBOtizFNuZJY9Y',name:'음성 녹음 02',date:'10월 23일',length:'06:37',src:'assets/recording-added-02.mp3',note:'원본: tfxBOtizFNuZJY9Y.mp4'},
 {id:'upload-EFb7rBsNis4yHlwm',name:'음성 녹음 03',date:'10월 23일',length:'03:56',src:'assets/recording-added-03.mp3',note:'원본: EFb7rBsNis4yHlwm.mp4'}
];
if(!editsV7.recordings||!readStore('recordings-import-v12',false)){for(const r of uploadedRecordingsV12)if(!RECORDINGS.some(x=>x.id===r.id||x.src===r.src))RECORDINGS.push({...r});if(editsV7.recordings){editsV7.recordings=RECORDINGS;persistV7()}saveStore('recordings-import-v12',true)}
function recordingTimeV12(t){t=Math.floor(t||0);return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`}
const recordingBeforeV12=openRecording;
openRecording=function(i){const r=RECORDINGS[i];if(!r?.src){recordingBeforeV12(i);return}screen='record-detail';shell(r.name,`<div class="record-player-v12"><div class="record-file-label-v12">음성 녹음</div><h3>${esc(r.name)}</h3><p class="record-date">${esc(r.date)} · ${esc(r.length)}</p><div class="record-wave-v12" aria-hidden="true">${Array.from({length:47},(_,j)=>`<i style="height:${12+(j*31+j*j*7)%75}%"></i>`).join('')}</div><div class="record-progress-v12"><span id="recordCurrentV12">00:00</span><span>${esc(r.length)}</span></div><button class="record-toggle-v12" id="recordToggleV12" aria-label="녹음 재생" onclick="toggleRecordingV12()">▶</button><audio onplay="setRecordingButtonV12(true)" onpause="setRecordingButtonV12(false)" onended="setRecordingButtonV12(false)" id="recordAudioV12" controls preload="metadata" src="${esc(r.src)}" aria-label="${esc(r.name)} 재생" ontimeupdate="document.querySelector('#recordCurrentV12').textContent=recordingTimeV12(this.currentTime)" onerror="toast('녹음 파일을 불러오지 못했습니다. 다시 열어 주세요.')"></audio><div class="record-speed-v12"><span>재생 속도</span>${[.75,1,1.25,1.5].map(n=>`<button class="${n===1?'active':''}" onclick="setRecordingSpeedV12(${n},this)">${n}×</button>`).join('')}</div><button class="record-edit-v12" onclick="showSiteEditorV5('recordings')">이름·날짜·메모 편집</button><details class="record-source-v12"><summary>파일 정보</summary><p>${esc(r.note)}</p></details></div>`,`<button class="icon-btn" aria-label="녹음 목록으로" onclick="renderRecorder()">${icon('back')}</button>`,`<nav class="app-tabs"><button class="active" onclick="renderRecorder()">목록</button><button onclick="openApp('notes')">메모</button></nav>`,'recorder-view actual-recorder-v12')};
function setRecordingSpeedV12(rate,button){const audio=$('#recordAudioV12');if(audio)audio.playbackRate=rate;button.parentElement.querySelectorAll('button').forEach(el=>el.classList.toggle('active',el===button))}
const sourceRecordingBeforeV12=showRecordingSource;
showRecordingSource=function(i){if(RECORDINGS[i]?.src)openRecording(i);else sourceRecordingBeforeV12(i)};
const surfaceBeforeV12=setSurface;
setSurface=function(html,opts){const audio=$('#recordAudioV12');if(audio){audio.pause();audio.removeAttribute('src');audio.load()}surfaceBeforeV12(html,opts)};
const callBeforeV12=showIncomingCall;
showIncomingCall=function(){const audio=$('#recordAudioV12');if(audio)audio.pause();callBeforeV12()};

function setRecordingButtonV12(playing){const button=$('#recordToggleV12');if(button){button.textContent=playing?'Ⅱ':'▶';button.setAttribute('aria-label',playing?'녹음 일시정지':'녹음 재생')}}
function toggleRecordingV12(){const audio=$('#recordAudioV12');if(!audio)return;if(audio.paused)audio.play().catch(()=>toast('재생 버튼을 다시 눌러 주세요.'));else audio.pause()}
