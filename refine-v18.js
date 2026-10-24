/* Remove the twelve recently added gallery entries, including saved album copies. */
const removedGalleryKeysV18=new Set(['yechan-call',...Array.from({length:11},(_,i)=>'yechan-photo-'+String(i+8).padStart(2,'0'))]);
const favoriteKeysV18=photoFavorites.map(i=>PHOTOS[i]?.[0]);
PHOTOS.splice(0,PHOTOS.length,...PHOTOS.filter(p=>!removedGalleryKeysV18.has(p[0])));
photoFavorites=favoriteKeysV18.map(key=>PHOTOS.findIndex(p=>p[0]===key)).filter(i=>i>=0);saveStore('photo-favorites',photoFavorites);
for(const album of albumsV9)album.photos=album.photos.filter(key=>!removedGalleryKeysV18.has(key));
saveAlbumsV9();
if(editsV7.photos){editsV7.photos=PHOTOS;persistV7()}
