let det = document.getElementsByClassName("det")[0]
let rank = document.getElementsByClassName("rank")
rank[0].value='3'
rank[1].value='3'
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

rank[0].addEventListener('change',function(){
	string=``
	for (let i = 0; i < parseInt(rank[0].value); i++){
		string+='<div class="line">'
		for (let j = 0; j < parseInt(rank[1].value); j++){
			string+=`<input type="" class="num">`
		}
		string+='</div>'
	}
	document.getElementsByClassName('matrix')[0].innerHTML=string
})
rank[1].addEventListener('change',function(){
	string=``
	for (let i = 0; i < parseInt(rank[0].value); i++){
		string+='<div class="line">'
		for (let j = 0; j < parseInt(rank[1].value); j++){
			string+='<input type="" class="num">'
		}
		string+='</div>'
	}
	document.getElementsByClassName('matrix')[0].innerHTML=string
})

