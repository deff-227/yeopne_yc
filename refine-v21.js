/* Import this media update once so subsequent user edits and deletions persist. */
const mediaImportKeyV21='media-import-20261022-v21';
const addedPhotosV21=[["yechan-oct22-1790352644619", "신예찬 01", "10월 22일"], ["yechan-oct22-1790352656602", "신예찬 02", "10월 22일"], ["yechan-oct22-1790352656809", "신예찬 03", "10월 22일"], ["yechan-oct22-1790352656976", "신예찬 04", "10월 22일"], ["yechan-oct22-1790352657040", "신예찬 05", "10월 22일"], ["yechan-oct22-1790352657116", "신예찬 06", "10월 22일"], ["yechan-oct22-1790352662443", "신예찬 07", "10월 22일"], ["yechan-oct22-1790352662519", "신예찬 08", "10월 22일"], ["yechan-oct22-1790352662588", "신예찬 09", "10월 22일"], ["yechan-oct22-1790352662711", "신예찬 10", "10월 22일"], ["yechan-oct22-1790352662839", "신예찬 11", "10월 22일"], ["yechan-oct22-1790352662928", "신예찬 12", "10월 22일"], ["yechan-oct22-1790352662999", "신예찬 13", "10월 22일"], ["yechan-oct22-1790352663090", "신예찬 14", "10월 22일"]];
const addedRecordingsV21=[{"id": "upload-oct22-1792642009976", "name": "음성 녹음 04", "date": "10월 22일", "length": "00:11", "src": "assets/recording-oct22-04.mp3", "note": "원본: 1792642009976.mp4"}, {"id": "upload-oct22-1792642023663", "name": "음성 녹음 05", "date": "10월 22일", "length": "00:08", "src": "assets/recording-oct22-05.mp3", "note": "원본: 1792642023663.mp4"}, {"id": "upload-oct22-1792642034045", "name": "음성 녹음 06", "date": "10월 22일", "length": "00:12", "src": "assets/recording-oct22-06.mp3", "note": "원본: 1792642034045.mp4"}, {"id": "upload-oct22-1792642056294", "name": "음성 녹음 07", "date": "10월 22일", "length": "00:40", "src": "assets/recording-oct22-07.mp3", "note": "원본: 1792642056294.mp4"}, {"id": "upload-oct22-qPrU-HnzAGvNR8G7", "name": "음성 녹음 08", "date": "10월 22일", "length": "00:28", "src": "assets/recording-oct22-08.mp3", "note": "원본: qPrU-HnzAGvNR8G7.mp4"}];
if(!readStore(mediaImportKeyV21,false)){
 for(const photo of addedPhotosV21)if(!PHOTOS.some(p=>p[0]===photo[0]))PHOTOS.push(photo.slice());
 let album=albumsV9.find(a=>a.id==='yechan')||albumsV9.find(a=>a.name==='신예찬');
 if(!album){album={id:'yechan',name:'신예찬',photos:[]};albumsV9.push(album)}
 for(const photo of addedPhotosV21)if(!album.photos.includes(photo[0]))album.photos.push(photo[0]);
 for(const recording of addedRecordingsV21)if(!RECORDINGS.some(r=>r.id===recording.id||r.src===recording.src))RECORDINGS.push({...recording});
 editsV7.photos=PHOTOS;editsV7.recordings=RECORDINGS;persistV7();saveAlbumsV9();
 saveStore(mediaImportKeyV21,true);
}
