const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
	document.body.className = "dark"
	theme = "dark"
}
else{
	theme = "light"
}

chrome.storage.sync.get(null, results => {
	for (let [key, value] of Object.entries(results)) {
		let elements = document.querySelectorAll(`input[name='${key}']`)
		let input;
		if (elements.length > 0){
			if (elements.length > 1){
				input = document.querySelector(`input[name='${key}'][value='${value}']`)
			} else{ input = elements[0]; }
			if (input.type == "radio" || input.type == "checkbox"){
				input.checked = value
			} else{ input.value = value }
			checkSub(input.parentNode)
			input.parentNode.onclick=_=>{
				checkSub(input.parentNode)
			}
		}
		else{
			chrome.storage.sync.remove(key)
		}
	}

	main();
});

function main(){
	initSave();
	initReset();
}

function initSave(){
	document.getElementById("save").onclick = _ => {
		let settings = {}
		let elements = document.querySelectorAll(`input`)
		elements.forEach(function(el){
			if (el.type == "checkbox"){
				settings[el.name] = el.checked
			}
			else if (el.type == "radio"){
				if (el.checked){
					settings[el.name] = el.value
				}
			}
			else{
				if (el.value.trim()){
					settings[el.name] = el.value.trim()
				}
				else{
					chrome.storage.sync.remove(el.name)
				}
			}
		})
		chrome.storage.sync.set({
			...settings
			}, _ => {
			window.close();
		});
	};
}
function initReset(){
	window.addEventListener("keydown", function(e){
		if (e.keyCode == 17){ // CTRL
			if (!event.repeat){
				document.getElementById("save").innerHTML = chrome.i18n.getMessage("resetBut")
				document.getElementById("save").onclick = _ => {
					chrome.storage.sync.clear();
					chrome.runtime.reload();
					window.close();
				}
			}
		}
	})
	window.addEventListener("keyup", function(e){
		if (e.keyCode == 17){ // CTRL
			document.getElementById("save").innerHTML = chrome.i18n.getMessage("saveBut")
			initSave()
		}
	})
}

var blocking = false;
function checkSub(element){
	blocking = true;
	let childs = element.children
	let input = element.getElementsByTagName("input")[0]
	Object.keys(childs).forEach(function(el){
	if (childs[el].classList.contains("sub")){
		if (input.checked){
			childs[el].classList.remove("sub-disabled")
		}
		else{
			childs[el].classList.add("sub-disabled") 
		}
	}
	})
	setTimeout(function(){blocking = false;}, 100)
}
