/* October 22 bubble posts transcribed from the supplied screenshots. */
const screenshotBubbleV28=[
 [20,30,'ㅋㅋㅋㅋㅋ합주부터 다시할래???'],
 [21,55,'리허설 완료 !!'],
 [21,55,'ㅋㅋㅋㅋㅋ스포 하나 더 해줘?'],
 [21,55,'이번엔 약한 스포'],
 [21,56,'순발력이 좋은 왈왈이들이 더 잘 즐길 수 있는 무대가 있다'],
 [21,56,'ㅋㅋㅋㅋㅋ'],
 [21,56,'여기까지'],
 [22,8,'그래도 오늘 저녁은 간만에'],
 [22,8,'일반식을 먹었더니'],
 [22,9,'아주 배가 부르다'],
 [22,12,'ㅋㅋㅋ도시락이랑 컵라면 먹었는데'],
 [22,12,'다 먹진 못했지만 그래도 제법 먹었다'],
 [23,19,'드디어 내일이군'],
 [23,19,'ㅋㅋㅋㅋㅋ이번에 진짜 재밌을거 같다']
];
function importScreenshotBubbleV28(now=Date.now()){
 let changed=false;
 screenshotBubbleV28.forEach(([h,m,text],i)=>{
  const ms=Date.parse(`2026-10-22T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00+09:00`),id='bubble-screenshot-oct22-v28:'+i;
  if(ms>now||bubble.some(row=>row[3]===id))return;
  bubble.push([1,text,`오후 ${h%12||12}:${String(m).padStart(2,'0')}`,id,ms]);changed=true;
 });
 if(changed){
  bubble.sort((a,b)=>(a[4]||0)-(b[4]||0));
  saveStore('bubble',bubble);
 }
 return changed;
}
const renderBubbleBeforeV28=renderBubble;
renderBubble=function(tab=bubbleTab){importScreenshotBubbleV28();renderBubbleBeforeV28(tab)};
importScreenshotBubbleV28();
setInterval(()=>{if(importScreenshotBubbleV28()&&screen==='bubble')renderBubble(bubbleTab)},30000);
