/* 2026-10-24: Yechan's middle-concert Bubble and gallery additions. */
(function(){
 const extraBubble=[
  {type:'text',time:'오후 11:16',text:'중콘도 역시 최고여따!!!'},
  {type:'text',time:'오후 11:17',text:'짐짜 너무 재밌어서 정신없이 시간가는줄모르고 뛰어놀아따 ㅎ'},
  {type:'text',time:'오후 11:18',text:'역시 너희랑 노는게 잴재미써 ㅎ'},
  {type:'photo',time:'오후 11:19',src:'assets/yechan-oct24-bubble-01.jpg'},
  {type:'photo',time:'오후 11:20',src:'assets/yechan-oct24-bubble-02.jpg'}
 ];
 for(const row of extraBubble){if(!YECHAN_BUBBLE_OCT24.some(m=>m.type===row.type&&m.time===row.time&&m.text===row.text&&m.src===row.src))YECHAN_BUBBLE_OCT24.push(row)}
 const addedPhotos=[
  {src:'assets/yechan-oct24-bubble-01.jpg',label:'10월 24일 중콘 셀카 1',album:'selfie'},
  {src:'assets/yechan-oct24-bubble-02.jpg',label:'10월 24일 중콘 셀카 2',album:'selfie'}
 ];
 const beforeAlbumPhotos=albumPhotos;
 albumPhotos=function(id){const rows=beforeAlbumPhotos(id);return id==='selfie'||id==='yechan'?[...addedPhotos,...rows]:rows};
 const beforeMessageHtml=messageHtml;
 messageHtml=function(row){
  if(row[3]!=='midconcert-20261024-photo')return beforeMessageHtml(row);
  const src=addedPhotos[1].src;
  return `<div class="bubble-row ${row[0]?'mine':''}">${row[0]?`<time>${esc(row[2])}</time>`:''}<button class="chat-photo-oct24" data-image="${src}" aria-label="상엽에게 보낸 사진 보기" type="button"><img src="${src}" alt="카카오톡으로 전송한 셀카"></button>${row[0]?'':`<time>${esc(row[2])}</time>`}</div>`;
 };
 const styles=document.createElement('style');
 styles.textContent='.bubble-row .chat-photo-oct24{border:0;padding:0;max-width:72%;border-radius:16px;overflow:hidden;background:#eee5f4}.bubble-row .chat-photo-oct24 img{display:block;width:100%;height:auto;max-height:290px;object-fit:cover}.bubble-image img{object-fit:contain;max-height:340px}';
 document.head.append(styles);
})();
