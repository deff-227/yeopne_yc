const appIconBeforeV11=appIcon;
appIcon=function(id){return ['settings','drive','google'].includes(id)?`<img class="real-app-icon" src="assets/icon-${id}-clean.svg" alt="">`:appIconBeforeV11(id)};
