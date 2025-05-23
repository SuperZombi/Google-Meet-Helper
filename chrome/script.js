var Settings = {}
chrome.storage.sync.get({ AutoJoin: false, AutoMute: false,
						  Fullscreen: true, fullscreen_hotkey: true, volumeController: true,
						  PictureInPicture: true,
						  account: null, language: null
						  }, results => {
						  	Settings = results;
						  	url_worker();
						  });

chrome.storage.sync.onChanged.addListener(function (changes, namespace) {
	chrome.storage.sync.get({ AutoJoin: false, AutoMute: false,
						  Fullscreen: true, fullscreen_hotkey: true, volumeController: true, PictureInPicture: true
						  }, results => { Settings = results; main(); });
});

function url_worker(){
	if (window.location.pathname != "/"){
		if (Settings.account || Settings.language){
			let old_url = new URL(window.location);
			let new_url = new URL(window.location);
			if (Settings.account){
				new_url.searchParams.set("authuser", Settings.account)
			}
			if (Settings.language){
				new_url.searchParams.set("hl", Settings.language)
			}
			if (old_url.href != new_url.href){
				window.location.href = new_url.href;
			}
		}
	}
}

var first_load = true;
window.onload = function() { main() }
function main(){
	if (window.location.pathname != "/"){
		if (!first_load){in_meet_main()}
		else{
			if (Settings.AutoMute){
				init_event_thrower(get_mic_and_vid_controls, _=>{
					document.querySelectorAll('div[jsname=hw0c9], div[jsname=psRWwc]').forEach(function(e){
						if (e.getAttribute("data-is-muted") != "true"){
							e.click();
						}
					})

					if (Settings.AutoJoin){
						init_event_thrower(get_join_button, _=>{
							get_join_button().click();
						})
					}
				})
			}
			else{
				if (Settings.AutoJoin){
					init_event_thrower(get_join_button, _=>{
						get_join_button().click();
					})
				}
			}

			init_event_thrower(is_in_meeting, _=>{
				document.querySelectorAll('audio, video').forEach(function (el) {
					el.play();
				});
				first_load = false;
				in_meet_main()
			})
		}
	}	
}


function init_event_thrower(func, callback, timeout=1000){
	let interval = setInterval(_=>{
		if (func()){
			clearInterval(interval)
			callback()
		}
	}, timeout)
	return interval
}

function is_in_meeting(){
	if (document.querySelector("button[jsname=CQylAd]")){
		return true;
	}
	return false;
}
function get_join_button(){
	return document.querySelector("div[jsname=Qx7uuf] button")
}
function get_mic_and_vid_controls(){
	let mic = document.querySelector('div[jsname=hw0c9]')
	let cam = document.querySelector('div[jsname=psRWwc]')
	return mic && cam
}

var pictureInPictureInterval;
function in_meet_main(){
	var menu_items;
	let temp = document.querySelector('nav.tMdQNe')
	if (!temp.querySelector("#meetHelperTools")){
		menu_items = document.createElement("div")
		menu_items.id = "meetHelperTools"
		temp.prepend(menu_items)
	} else{ menu_items = temp.querySelector("#meetHelperTools") }

	if (Settings.volumeController){
		if (!document.querySelector("#volumeController")){
			var currentVolume = 1;
			let div = document.createElement("div")
			div.id = "volumeController"
			div.style.height = "48px"; div.style.width = "48px";
			div.style.cursor = "pointer";
			div.style.position = "relative";
			div.style.display = "inline-flex";
			div.style.alignItems = "center"; div.style.placeContent = "center";
			div.style.borderRadius = "50px";
			div.style.transition = "0.2s ease";
			div.title = chrome.i18n.getMessage("volume")
			div.innerHTML = `
				<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
					<path d="M15 23l-9.309-6h-5.691v-10h5.691l9.309-6v22zm-9-15.009v8.018l8 5.157v-18.332l-8 5.157zm14.228-4.219c2.327 1.989 3.772 4.942 3.772 8.229 0 3.288-1.445 6.241-3.77 8.229l-.708-.708c2.136-1.791 3.478-4.501 3.478-7.522s-1.342-5.731-3.478-7.522l.706-.706zm-2.929 2.929c1.521 1.257 2.476 3.167 2.476 5.299 0 2.132-.955 4.042-2.476 5.299l-.706-.706c1.331-1.063 2.182-2.729 2.182-4.591 0-1.863-.851-3.529-2.184-4.593l.708-.708zm-12.299 1.299h-4v8h4v-8z"/>
				</svg>
			`
			div.addEventListener("mouseenter", _=> {
				div.style.background = "rgb(255, 255, 255, 0.05)"
			})
			div.addEventListener("mouseleave", _=> {
				div.style.background = ""
			})
			document.body.addEventListener("mousedown", event=>{
				let path = event.path || (event.composedPath && event.composedPath());
				if (path.includes(div)){
					if (path.includes(div.querySelector("div"))){ return }
					let result = div.querySelector("div").style.visibility == "hidden" ? "visible" : "hidden";
					div.querySelector("div").style.visibility = result;
					if (result == "visible"){
						div.querySelector("span").style.top = "-20px"
						div.querySelector("span").style.bottom = ""
						div.querySelector("span").style.opacity = 1;
						div.querySelector("input").style.opacity = 1;
					}
					else{
						div.querySelector("span").style.opacity = 0;
						div.querySelector("input").style.opacity = 0;
					}
				} else {
					div.querySelector("div").style.visibility = "hidden";
					div.querySelector("span").style.opacity = 0;
					div.querySelector("input").style.opacity = 0;
				}
			})

			let slider_area = document.createElement("div")
			slider_area.style.visibility = "hidden";
			slider_area.style.display = "flex";
			slider_area.style.alignItems = "center";
			slider_area.style.position = "absolute";
			slider_area.style.bottom = "50px"
			slider_area.style.zIndex = 100;
			slider_area.style.filter = "drop-shadow(0 0 3px black)"

			let input = document.createElement("input")
			input.type = "range"
			input.style.writingMode = "vertical-lr"
			input.style.direction = "rtl"
			input.min = 0
			input.max = 1
			input.step = 0.1
			input.value = 1
			input.style.width = "6px"
			input.style.cursor = "ns-resize"
			input.style.transition = "0.4s"
			input.style.opacity = 0;

			function on_input_change(input_){
				currentVolume = input_.value
				setAllVolume(currentVolume)
				div.querySelector("span").innerHTML = input_.value * 100;
			}

			var block_wheeling = false;
			div.addEventListener("wheel", e=>{
				if (block_wheeling){return}
				if (div.querySelector("div").style.visibility == "hidden"){
					div.querySelector("span").style.top = ""
					div.querySelector("span").style.bottom = 0
					div.querySelector("span").style.opacity = 1;
				}
				block_wheeling=true
				let delta = Math.max(-0.1, Math.min(0.1, e.wheelDelta));
				let new_value = Math.max(0, Math.min(1, parseFloat(input.value) + delta));
				input.value = new_value;
				on_input_change(input)
				setTimeout(function(){
					block_wheeling=false;
					setTimeout(function(){
						if (!block_wheeling){
							if (div.querySelector("div").style.visibility == "hidden"){
								div.querySelector("span").style.opacity = 0;
							}
						}
					}, 700)
				}, 50)
			})
			input.oninput = function(e){
				on_input_change(input)
			}
			let text = document.createElement("span")
			text.innerHTML = "100";
			text.style.fontSize = "14px";
			text.style.position = "absolute";
			text.style.top = "-20px";
			text.style.left = "50%";
			text.style.transform = "translateX(-50%)";
			text.style.transition = "0.4s"
			text.style.pointerEvents = "none";
			text.style.visibility = "visible"
			text.style.opacity = 0;

			slider_area.appendChild(input)
			slider_area.appendChild(text)
			div.appendChild(slider_area)

			function setAllVolume(volume) {
				let newVol = Math.pow(volume, 1.25)
				document.querySelectorAll('audio, video').forEach(function (el) {
					el.volume = newVol;
					el.play();
				});
			};
			setInterval(_=>{
				setAllVolume(currentVolume)
			}, 200)
			menu_items.prepend(div)
		}
	}
	else{
		let el = document.querySelector("#volumeController")
		if (el){ el.remove() }
	}

	if (Settings.Fullscreen){
		if (!document.querySelector("#MeetFullScreen")){
			let div = document.createElement("div")
			div.id = "MeetFullScreen"
			div.style.height = "48px"; div.style.width = "48px";
			div.style.cursor = "pointer";
			div.style.display = "inline-flex";
			div.style.alignItems = "center"; div.style.placeContent = "center";
			div.style.transition = "0.2s ease";
			div.style.borderRadius = "50px";
			div.title = chrome.i18n.getMessage("FullScreen")
			div.innerHTML = `
				<svg height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fff"
					style="transition: 0.2s ease;">
					<path d="M1 1v6h2V3h4V1H1z"/>
					<path d="M1 12v6h6v-2H3v-4z"/>
					<path d="M19 1v6h-2V3h-4V1h6Z"/>
					<path d="M18.997 12v6h-6v-2h4v-4h2Z"/>
				</svg>
			`
			div.addEventListener("mouseenter", _=> {
				div.style.background = "rgb(255, 255, 255, 0.05)"
			})
			div.addEventListener("mouseleave", _=> {
				div.style.background = ""
			})
			div.addEventListener("mouseenter", _=> {
				div.children[0].style.transform = "scale(1.15)"
				setTimeout(function(){ div.children[0].style.transform = "" }, 200)
			})
			div.addEventListener("click", _=>{
				openInFullScreen()
			})
			menu_items.appendChild(div)
		}
	}
	else{
		let el = document.querySelector("#MeetFullScreen")
		if (el){ el.remove() }
	}

	if (Settings.Fullscreen && Settings.fullscreen_hotkey){
		window.addEventListener("keydown", hotKeyFullscreenHandler)
	}
	else{
		window.removeEventListener("keydown", hotKeyFullscreenHandler)
	}

	if (Settings.PictureInPicture){
		pictureInPictureInterval = setInterval(_=>{
			let arr = [...document.querySelectorAll("video")].filter(x=>x.style.display!="none")
			if (arr.length > 0){
				if (!document.querySelector("#MeetPictureInPicture")){
					let div = document.createElement("div")
					div.id = "MeetPictureInPicture"
					div.style.height = "48px"; div.style.width = "48px";
					div.style.cursor = "pointer";
					div.style.alignItems = "center"; div.style.placeContent = "center";
					div.style.transition = "0.2s ease";
					div.style.borderRadius = "50px";
					div.style.display = "none";
					div.title = chrome.i18n.getMessage("pictureInPicture")
					div.innerHTML = `
						<svg height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill="#fff"
							style="transition: 0.25s ease;">
							<path id="pip_arrow" style="transform-origin: center center; transition: 0.2s" d="M202.2 27.553c-5.25 2.85-7.2 6.6-7.2 13.502s3.45 12.153 9.3 14.103c2.55.9 13.2 1.65 23.55 1.65h18.75l-51.3 51.46-51.3 51.46v7.652c0 6.752.6 8.102 4.65 11.553 3.3 2.85 6.3 3.9 10.8 3.9 6.15 0 6.6-.45 58.35-52.06l52.2-52.21v20.704c0 23.255 1.35 27.905 8.85 31.056 6.3 2.55 14.25.75 18.15-4.05 2.85-3.751 3-5.852 3-47.86v-43.96l-3.6-4.2-3.6-4.2-43.35-.3c-36.15-.3-43.8 0-47.25 1.8Z"/>
							<path d="M3.9 63.709 0 67.759V267l3.75 3.6 3.6 3.751H258.3l4.35-4.35 4.35-4.352V219.59c0-48.76-.45-52.51-7.35-56.26-5.25-2.701-13.05-1.801-18 2.4l-4.65 3.9v74.715H30V89.814h123.3l4.35-4.351c6.15-6.151 6.15-15.153 0-21.304l-4.35-4.351H7.95l-4.05 3.9Z"/>
						</svg>
					`
					div.addEventListener("mouseenter", _=> {
						div.style.background = "rgb(255, 255, 255, 0.05)"
					})
					div.addEventListener("mouseleave", _=> {
						div.style.background = ""
					})
					div.addEventListener("mouseenter", _=> {
						div.children[0].style.transform = "scale(1.15)"
						setTimeout(function(){ div.children[0].style.transform = "" }, 200)
					})
					div.addEventListener("click", _=>{
						openInPicture()
					})
					document.addEventListener('enterpictureinpicture', () => {
						div.querySelector("#pip_arrow").style.transform = "scale(-1, -1) translate(-115px, 60px)"
					})
					document.addEventListener("leavepictureinpicture", _=> {
						div.querySelector("#pip_arrow").style.transform = ""
					})
					menu_items.appendChild(div)
				}
				else{
					document.querySelector("#MeetPictureInPicture").style.display = "inline-flex"
				}
			}
			else{
				let el = document.querySelector("#MeetPictureInPicture");
				if (el){ el.style.display = "none"}
			}
		}, 500)
	}
	else{
		if (pictureInPictureInterval){clearInterval(pictureInPictureInterval)}
		let el = document.querySelector("#MeetPictureInPicture")
		if (el){ el.remove() }
	}
}

function openInFullScreen(){
	if (document.fullscreenElement){
		document.exitFullscreen();
	}
	else{
		let element = [...document.querySelectorAll("video")].filter(x=>x.style.display!="none")[0];
		if (element){element.requestFullscreen()}
	}
}
function hotKeyFullscreenHandler(e){
	if (e.keyCode == 70){
		if (document.activeElement.tagName.toLowerCase() !== "textarea"){
			openInFullScreen()
		}
	}
}

function openInPicture(){
	if (document.pictureInPictureElement){
		document.exitPictureInPicture();
	}
	else{
		let element = [...document.querySelectorAll("video")].filter(x=>x.style.display!="none")[0];
		if (element){element.requestPictureInPicture()}
	}	
}
