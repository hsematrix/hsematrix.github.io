let det = document.getElementsByClassName("det")[0]
let rank = document.getElementsByClassName("rank")

// - - - Здесь функция по подсчету определителя
// - - -

// - - - Здесь по рангам
// - - -

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 13) {
    event.preventDefault()
    let activeElement = document.activeElement
    let formElements = Array.from(document.getElementsByClassName('num'))
   	let currentIndex = formElements.indexOf(activeElement)
    let nextIndex = (currentIndex + 1) % formElements.length
    formElements[nextIndex].focus()
  }
});
rank[0].value='3'
rank[1].value='3'
detBool=true
document.body.style.overflow='hidden'
det.addEventListener('click', () => {
 	if(detBool==true){
 		let flag=true
 		Array.from(document.getElementsByClassName('num')).forEach(function(item, index, array){
 			if (item.value === '' || !/^-?\d+(\.\d+)?$/.test(item.value)){
 				det.style.animation = 'shake 0.3s'
 				setTimeout(function(){det.style.animation = 'none'}, 300)
 				item.style.transitionDuration='0s'
 				item.style.outline='2px solid rgba(227,109,109,0.7)'
 				item.addEventListener('focus', function(){item.style=''})
 				flag=false
 			}
 		})
 		if(flag==true){
	 		detBool=false
	 		det.style.transform='rotateX(180deg)'
	 		det.style.backgroundColor='rgba(256,256,256,0.05)'
	 		setTimeout(function(){det.innerHTML=`<span style="transform:rotateX(180deg);color:rgba(144,235,230,0.7);">reset</span>`}, 100)
 		}
 	}
 	else if(detBool==false){
 		detBool=true
 		det.style.transform='rotateX(0deg)'
 		det.style.backgroundColor='rgba(186,234,231,0.3)'
 		numList=Array.from(document.getElementsByClassName('num'))
 		numList.forEach(function(item, index, array){
 			item.style.transform='rotateX(-180deg)'
 			setTimeout(function(){
 				item.value=''
 			}, 100)
 			setTimeout(function(){
 				item.style.transitionDuration='0s'
 				item.style.transform='rotateX(0deg)'
 				setTimeout(function(){item.style.transitionDuration='0.5s'}, 50)
 			}, 500)
 		})
 		setTimeout(function(){det.innerHTML=`det`}, 100)
 	}
 })
Array.from(document.getElementsByClassName('num')).forEach(function(item, index, array){
		item.addEventListener('input', function(){
			let inputValue = item.value
			let numericValue = inputValue.replace(/[^0-9.-]/g, '')
  			item.value = numericValue
		})	
	})
rank[0].addEventListener('change',function(){
	string=``
	for (let i = 0; i < parseInt(rank[0].value); i++){
		string+='<div class="line">'
		for (let j = 0; j < parseInt(rank[1].value); j++){
			string+=`<input type="text" class="num">`
		}
		string+='</div>'
	}
	document.getElementsByClassName('matrix')[0].innerHTML=string
	Array.from(document.getElementsByClassName('num')).forEach(function(item, index, array){
		item.addEventListener('input', function(){
			let inputValue = item.value
			let numericValue = inputValue.replace(/[^0-9.-]/g, '')
  			item.value = numericValue
		})	
	})
})
rank[1].addEventListener('change',function(){
	string=``
	for (let i = 0; i < parseInt(rank[0].value); i++){
		string+='<div class="line">'
		for (let j = 0; j < parseInt(rank[1].value); j++){
			string+='<input type="text" class="num">'
		}
		string+='</div>'
	}
	document.getElementsByClassName('matrix')[0].innerHTML=string
	Array.from(document.getElementsByClassName('num')).forEach(function(item, index, array){
		item.addEventListener('input', function(){
			let inputValue = item.value
			let numericValue = inputValue.replace(/[^0-9.-]/g, '')
  			item.value = numericValue
		})	
	})
})

