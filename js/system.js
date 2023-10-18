let det = document.getElementsByClassName("det")[0]
detBool=true
det.addEventListener('click', () => {
 	if(detBool==true){
 		detBool=false
 		det.style.transform='rotateX(180deg)'
 		det.style.backgroundColor='rgba(256,256,256,0.05)'
 		setTimeout(function(){det.innerHTML=`<span style="transform:rotateX(180deg);color:rgba(144,235,230,0.7);">test</span>`}, 100)
 	}
 	else if(detBool==false){
 		detBool=true
 		det.style.transform='rotateX(0deg)'
 		det.style.backgroundColor='rgba(186,234,231,0.3)'
 		setTimeout(function(){det.innerHTML=`det`}, 100)
 	}
 })