"use strict";var thumb=document.querySelector("#thumb"),range=document.querySelector("#range"),rangeValue=document.querySelector("#range-value"),xDown=null,xStart=null,initialThumb=function(){var e=thumb.offsetWidth,t=(range.clientWidth-e)*(parseInt(rangeValue.value)/100)-e;thumb.style.left="".concat(t,"px")},handleTouchStartThumb=function(e){xDown=+e.changedTouches[0].clientX,xStart=parseInt(thumb.style.left)},handleTouchMoveThumb=function(e){var t=thumb.offsetWidth,n=range.clientWidth-t,o=+e.changedTouches[0].clientX,c=xStart+(o-xDown);if(c>=0&&c<=n){thumb.style.left="".concat(c,"px");var u=Math.round(c/n*100);rangeValue.value="".concat(u,"%"),rangeValue.innerHTML="".concat(u,"%")}};thumb.onmousedown=function(e){xDown=+e.pageX,xStart=parseInt(thumb.style.left),document.onmousemove=function(e){var t=thumb.offsetWidth,n=range.clientWidth-t,o=+e.pageX,c=xStart+(o-xDown);if(c>=0&&c<=n){thumb.style.left="".concat(c,"px");var u=Math.round(c/n*100);rangeValue.value="".concat(u,"%"),rangeValue.innerHTML="".concat(u,"%")}},document.onmouseup=function(){document.onmousemove=null,document.onmouseup=null}},thumb.addEventListener("touchstart",handleTouchStartThumb),thumb.addEventListener("touchmove",handleTouchMoveThumb),thumb.ondragstart=function(){return!1},initialThumb();var select=document.querySelector("#type-system"),option=document.querySelectorAll("[data-option]"),selectEvent=function(e){"click"==e.type&&(select.classList.contains("form__select--open")?select.classList.remove("form__select--open"):select.classList.add("form__select--open")),"blur"==e.type&&select.classList.remove("form__select--open")},changeSelectValue=function(e){var t=e.target.innerText;select.value=t};select.addEventListener("click",selectEvent),option.forEach((function(e){return e.addEventListener("click",changeSelectValue)}));
//# sourceMappingURL=script.js.map