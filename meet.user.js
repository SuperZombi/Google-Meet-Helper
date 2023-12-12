// ==UserScript==
// @name         Google Meet Helper
// @version      1.2.2
// @description  Adds additional tools to Google Meets. Automatically join meetings, turn off the camera and microphone, and other.
// @author       Super Zombi
// @match        https://meet.google.com/*
// @icon         data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pg0KPHN2ZyB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiA+DQoJPGNpcmNsZSBjeD0iMTI4IiBjeT0iMTI4IiByPSIxMjAiIGZpbGw9InJnYig1LCAxNDEsIDEyNykiPjwvY2lyY2xlPg0KCTxwYXRoIGQ9Ik01NS41ODAxOTE2LDEyOC4xMDU0MDIgTDU1LjU4MDE5MTYsMTYyLjM0Mzk4IEM1NS41ODAxOTE2LDE3MS4zODI5OTMgNjIuOTc1NzQ3MiwxNzguNzc4NTQ4IDcyLjAxNDc1OTUsMTc4Ljc3ODU0OCBMMTU3LjAzMDc3OSwxNzguNzc4NTQ4IEMxNjYuMDY5NzkyLDE3OC43Nzg1NDggMTczLjQ2NTM0NywxNzEuMzgyOTkzIDE3My40NjUzNDcsMTYyLjM0Mzk4IEwxNzMuNDY1MzQ3LDE0MC43MjExNDYgTDIwNy4xMjQ2MDYsMTc0LjM4MDQwNSBMMjA3LjEyNDYwNiwxMjguMTA1NDAyIEw1NS41ODAxOTE2LDEyOC4xMDU0MDIgWiI+PC9wYXRoPjxwYXRoIGQ9Ik01NS41ODAxOTE2LDEyOC4xMDU0MDIgTDU1LjU4MDE5MTYsMTYyLjM0Mzk4IEM1NS41ODAxOTE2LDE3MS4zODI5OTMgNjIuOTc1NzQ3MiwxNzguNzc4NTQ4IDcyLjAxNDc1OTUsMTc4Ljc3ODU0OCBMMTU3LjAzMDc3OSwxNzguNzc4NTQ4IEMxNjYuMDY5NzkyLDE3OC43Nzg1NDggMTczLjQ2NTM0NywxNzEuMzgyOTkzIDE3My40NjUzNDcsMTYyLjM0Mzk4IEwxNzMuNDY1MzQ3LDE0MC43MjExNDYgTDIwNy4xMjQ2MDYsMTc0LjM4MDQwNSBMMjA3LjEyNDYwNiwxMjguMTA1NDAyIEw1NS41ODAxOTE2LDEyOC4xMDU0MDIgWiIgZmlsbD0iI0Y2RjZGNiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0yMDcuMTI0NjM4LDEyOC4xMDU0MDIgTDIwNy4xMjQ2MzgsODEuNjk4OTIzNSBMMTczLjQ2NTM3OSwxMTUuMjg2NDQgTDE3My40NjUzNzksOTMuODY2ODI0NyBDMTczLjQ2NTM3OSw4NC44Mjc0OTYzIDE2Ni4wNjk4MjMsNzcuNDMyMjU2OCAxNTcuMDMwODExLDc3LjQzMjI1NjggTDcyLjAxNDc5MTEsNzcuNDMyMjU2OCBDNjIuOTc1Nzc4OCw3Ny40MzIyNTY4IDU1LjU4MDIyMzIsODQuODI3NDk2MyA1NS41ODAyMjMyLDkzLjg2NjgyNDcgTDU1LjU4MDIyMzIsMTI4LjEwNTQwMiBMMjA3LjEyNDYzOCwxMjguMTA1NDAyIFoiIGZpbGw9IiNFMkUyRTIiPjwvcGF0aD4NCjwvc3ZnPg==
// @homepageURL  https://github.com/SuperZombi/Google-Meet-Helper
// @supportURL   https://github.com/SuperZombi/Google-Meet-Helper/issues
// @updateURL    https://raw.githubusercontent.com/SuperZombi/Google-Meet-Helper/main/pip.user.js
// @downloadURL  https://raw.githubusercontent.com/SuperZombi/Google-Meet-Helper/main/pip.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';

const images = {
	"close.png": "data:image/png;base64,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",
}

const locale = {
	'en': {
		"settings": "Settings",
		"SigninSettings": "Signin Settings",
		"MeetingSettings": "Meeting Settings",
		"AutoJoin": "Auto Join",
		"AutoMute": "Disable camera and microphone",
		"AutoSkipAlerts": "Skip Alerts",
		"FullScreen": "Full screen",
		"FullScreen_HotKey": "HotKey",
		"volumeController": "Volume Controller",
		"volume": "Volume",
		"additionally": "Additionally",
		"account": "Account",
		"language": "Language",
		"pictureInPicture": "Picture in Picture",
		"saveBut": "Save",
		"closeBut": "Close",
		"resetBut": "Reset"
	},
	'ru': {
		"settings": "Настройки",
		"SigninSettings": "Настройки входа",
		"MeetingSettings": "Настройки встречи",
		"AutoJoin": "Автоматическое присоединение",
		"AutoMute": "Отключать камеру и микрофон",
		"AutoSkipAlerts": "Пропустить оповещения",
		"FullScreen": "Полный экран",
		"FullScreen_HotKey": "Горячая клавиша",
		"volumeController": "Регулятор громкости",
		"volume": "Громкость",
		"additionally": "Дополнительно",
		"account": "Аккаунт",
		"language": "Язык",
		"pictureInPicture": "Картинка в Картинке",
		"saveBut": "Сохранить",
		"closeBut": "Закрыть",
		"resetBut": "Сбросить"
	},
	'uk': {
		"settings": "Налаштування",
		"SigninSettings": "Налаштування входу",
		"MeetingSettings": "Налаштування зустрічі",
		"AutoJoin": "Автоматичне приєднання",
		"AutoMute": "Відкючати камеру та мікрофон",
		"AutoSkipAlerts": "Пропустити оповіщення",
		"FullScreen": "Повний екран",
		"FullScreen_HotKey": "Гаряча клавіша",
		"volumeController": "Регулятор гучності",
		"volume": "Гучність",
		"additionally": "Додатково",
		"account": "Акаунт",
		"language": "Мова",
		"pictureInPicture": "Картинка в Картинці",
		"saveBut": "Зберегти",
		"closeBut": "Закрити",
		"resetBut": "Скинути"
	}
}

function db_get(value, default_=undefined){
	let val = GM_getValue(value)
	if (val != undefined){
		return val
	}
	else{ return default_ }
}
function db_save(array){
	for (let el in array) {
		GM_setValue(el, array[el])
	}
}

function get_message(name, default_="en"){
	var userLang = (navigator.language || navigator.userLanguage).slice(0,2).toLowerCase();
	if (Object.keys(locale).includes(userLang) && Object.keys(locale[userLang]).includes(name)){
		return locale[userLang][name]
	}
	return locale[default_][name]
}

const dark_theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

GM_registerMenuCommand(get_message("settings"), ()=>{
	let div = document.createElement("div")
	div.style.position = 'fixed'
	div.style.zIndex = 10000
	div.style.top = 0
	div.style.right = "-50%"
	div.style.willChange = "right"
	div.style.transition = "0.5s"
	div.style.borderRadius = "0 0 0 12px";
	div.style.fontSize = "14pt"
	div.style.minWidth = "300px"
	div.style.maxHeight = "100%"
	div.style.overflowY = "auto"
	if (dark_theme){
		div.style.background = "#222224";
		div.style.color = "white"
		div.style.boxShadow = "white 0 0 3px"
	}
	else{
		div.style.background = "white";
		div.style.color = "black"
		div.style.boxShadow = "black 0 0 3px"
	}
	function close_menu(){
		div.style.right = "-50%"
		setTimeout(()=>{ div.remove() }, 500)
	}

	let close = document.createElement("div")
	close.style.textAlign = "right"
	close.style.margin = "10px"
	let img = document.createElement("img")
	img.title = get_message("closeBut")
	img.style.cursor = "pointer"
	img.style.height = '20px'
	img.style.filter = "drop-shadow(0 0 4px black)"
	img.src = images["close.png"]
	img.onclick = _ => {close_menu()}
	close.appendChild(img)
	div.appendChild(close)

	let content = document.createElement("div")
	content.style.textAlign = "center"
	content.style.padding = "20px"
	content.style.paddingTop = 0
	
	content.innerHTML = `
		<h3>${get_message('settings')}</h3>

		<hr style="border-top: 1px solid #dfe1e8; margin: 0.5em 0;">

		<details open style="cursor:pointer;">
			<summary>${get_message('SigninSettings')}</summary>

			<label style="display:block; cursor:pointer; text-align: left; padding-bottom: 5px; padding-top: 5px;">
				<input style="cursor: pointer;" type="checkbox" name="AutoJoin">
				<span>${get_message('AutoJoin')}</span>
			</label>

			<label style="display:block; cursor:pointer; text-align: left; padding-bottom: 5px;">
				<input style="cursor: pointer;" type="checkbox" name="AutoMute">
				<span>${get_message('AutoMute')}</span>
			</label>

			<label style="display:block; cursor:pointer; text-align: left; padding-bottom: 5px;">
				<input style="cursor: pointer;" type="checkbox" name="AutoSkipAlerts">
				<span>${get_message('AutoSkipAlerts')}</span>
			</label>

			<details style="cursor:pointer;">
				<summary>${get_message('additionally')}</summary>
			
				<label style="display:block; cursor:pointer; text-align: right; padding-bottom: 5px; padding-top: 5px;">
					<span>${get_message('account')}:</span>
					<input list="account_labels" name="account" style="width: 50%; text-align: center;">
					<datalist id="account_labels">
						<option value="0">
						<option value="1">
						<option value="2">
						<option value="@gmail.com">
					</datalist>
				</label>

				<label style="display:block; cursor:pointer; text-align: right; padding-bottom: 5px;">
					<span>${get_message('language')}:</span>
					<input list="language_labels" name="language" style="width: 50%; text-align: center;">
					<datalist id="language_labels">
						<option value="en">
						<option value="ru">
						<option value="uk">
					</datalist>
				</label>
			</details>

		</details>

		<hr style="border-top: 1px solid #dfe1e8; margin: 0.5em 0;">

		<details open style="cursor:pointer;">
			<summary>${get_message('MeetingSettings')}</summary>

			<label style="display:block; cursor:pointer; text-align: left; padding-bottom: 5px; padding-top: 5px;">
				<input type="checkbox" name="Fullscreen" checked>
				<span>${get_message('FullScreen')}</span>

				<label style="display:block; cursor:pointer; text-align: left; margin-left: 20px; font-size: 0.9rem; padding-top: 5px;">
					<input type="checkbox" name="fullscreen_hotkey" checked>
					<span>${get_message('FullScreen_HotKey')} (F)</span>
				</label>
			</label>

			<label style="display:block; cursor:pointer; text-align: left; padding-bottom: 5px;">
				<input type="checkbox" name="volumeController" checked>
				<span>${get_message('volumeController')}</span>
			</label>

			<label style="display:block; cursor:pointer; text-align: left;">
				<input type="checkbox" name="PictureInPicture" checked>
				<span>${get_message('pictureInPicture')}</span>
			</label>
		</details>

		<hr style="border-top: 1px solid #dfe1e8; margin: 0.5em 0;">
		<button name="save" style="font-size: 14pt; cursor: pointer; border: 5em; outline: none;
															margin-top: 5px; padding: 0.5em 1.5em; border-radius: 65px;
															background-image: linear-gradient(45deg, #4568dc, #b06ab3);
															box-shadow: 1px 1px 10px grey; color: white;">
			${get_message('saveBut')}</button>
		<p style="display: flex; align-items: center; justify-content: space-between; margin-top: 1em">
			<a style="display: flex; align-items: center; cursor:alias;" href="https://github.com/SuperZombi/Picture-in-Picture-for-Youtube" target="_blank">
				<svg style="${dark_theme ? "fill: white;" : "background: white;"} border-radius: 50px; padding: 1px;" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
				<span style="margin-left:5px; ${dark_theme ? "color: #00c0ff;" : "color: blue;"}">GitHub</span>
			</a>

			<img style="margin-top:2px;" src="https://shields.io/badge/version-v1.2.2-blue">
		</p>
	`
	div.appendChild(content)
	let keys = GM_listValues()
	keys.forEach(e=>{
		try{
			let els = div.querySelectorAll(`input[name='${e}']`)
			if (els.length > 1){
				let val = db_get(e)
				let el = Array.from(els).filter(e=>e.value == val)[0]
				el.checked = true
			}
			else{
				if (els[0].type == "checkbox"){
					els[0].checked = db_get(e)
				}
				else{
					els[0].value = db_get(e)
				}	
			}
		} catch{
			GM_deleteValue(e)
		}
	})

	let save = div.querySelector("button[name=save]")
	function initSave(){
		let settings = {}
		let inputs = div.querySelectorAll("input")
		Array.from(inputs).forEach(e=>{
			if (e.type == "checkbox"){
				settings[e.name] = e.checked
			}
			else if (e.type == "radio" && e.checked){
				settings[e.name] = e.value
			}
			else{
				if (e.value.trim()){
					settings[e.name] = e.value.trim()
				}
				else{
					GM_deleteValue(e.name)
				}
			}
		})
		db_save(settings)
		close_menu()
		main()
	}
	save.onclick = () => initSave()

	window.addEventListener("keydown", function(e){
		if (e.keyCode == 17){ // CTRL
			if (!event.repeat){
				save.innerHTML = get_message('resetBut')
				save.onclick = _ => {
					let keys = GM_listValues()
					keys.forEach(key=>{
						GM_deleteValue(key)
					})
					close_menu()
					main()
				}
			}
		}
	})
	window.addEventListener("keyup", function(e){
		if (e.keyCode == 17){ // CTRL
			save.innerHTML = get_message('saveBut')
			save.onclick = () => initSave()
		}
	})

	document.body.appendChild(div)
	setTimeout(()=>{ div.style.right = 0; }, 1)
})


/////////////////////////////////

url_worker();
function url_worker(){
	if (window.location.pathname != "/"){
		if (db_get("account") || db_get("language")){
			let old_url = new URL(window.location);
			let new_url = new URL(window.location);
			if (db_get("account")){
				new_url.searchParams.set("authuser", db_get("account"))
			}
			if (db_get("language")){
				new_url.searchParams.set("hl", db_get("language"))
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
			if (db_get("AutoSkipAlerts", false)){
				var interv = init_event_thrower(get_auto_skip, _=>{
					get_auto_skip().querySelector("button").click()
				})
			}

			if (db_get("AutoMute", false)){
				init_event_thrower(get_mic_and_vid_controls, _=>{
					document.querySelectorAll('div[jsname=BOHaEe]').forEach(function(e){
						if (e.getAttribute("data-is-muted") != "true"){
							e.click();
						}
					})

					if (db_get("AutoJoin", false)){
						init_event_thrower(get_join_button, _=>{
							get_join_button().click();
						})
					}
				})
			}
			else{
				if (db_get("AutoJoin", false)){
					init_event_thrower(get_join_button, _=>{
						get_join_button().click();
					})
				}
			}

			init_event_thrower(is_in_meeting, _=>{
				if (db_get("AutoSkipAlerts", false)){
					try{clearInterval(interv)}catch{}
					if (get_auto_skip()){get_auto_skip().querySelector("button").click()}
				}
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
	if (document.querySelector("button[jsname=BOHaEe]")){
		return true;
	}
	return false;
}
function get_join_button(){
	return document.querySelector("button[jsname=Qx7uuf]")
}
function get_auto_skip(){
	return document.querySelector('div[aria-modal="true"][role="alertdialog"]')
}
function get_mic_and_vid_controls(){
	let temp = document.querySelector('div[jsname=BOHaEe]')
	if (temp){return temp.getAttribute("data-is-muted")}
	return false
}

var pictureInPictureInterval;
function in_meet_main(){
	var menu_items;
	let temp = document.querySelector('div.tMdQNe')
	if (!temp.querySelector("#meetHelperTools")){
		menu_items = document.createElement("div")
		menu_items.id = "meetHelperTools"
		temp.appendChild(menu_items)
	} else{ menu_items = temp.querySelector("#meetHelperTools") }

	if (db_get("volumeController", true)){
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
			div.title = get_message("volume")
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
					}
					else{
						div.querySelector("span").style.opacity = 0;
					}
				} else {
					div.querySelector("div").style.visibility = "hidden";
					div.querySelector("span").style.opacity = 0;
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
			input.setAttribute("orient", "vertical");
			input.style.webkitAppearance = "slider-vertical";
			input.min = 0
			input.max = 1
			input.step = 0.1
			input.value = 1
			input.style.width = "6px"
			input.style.cursor = "ns-resize"

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
			text.style.transition = "0.5s"
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

	if (db_get("Fullscreen", true)){
		if (!document.querySelector("#MeetFullScreen")){
			let div = document.createElement("div")
			div.id = "MeetFullScreen"
			div.style.height = "48px"; div.style.width = "48px";
			div.style.cursor = "pointer";
			div.style.display = "inline-flex";
			div.style.alignItems = "center"; div.style.placeContent = "center";
			div.style.transition = "0.2s ease";
			div.style.borderRadius = "50px";
			div.title = get_message("FullScreen")
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

	if (db_get("Fullscreen", true) && db_get("fullscreen_hotkey", true)){
		window.addEventListener("keydown", hotKeyFullscreenHandler)
	}
	else{
		window.removeEventListener("keydown", hotKeyFullscreenHandler)
	}

	if (db_get("PictureInPicture", true)){
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
					div.title = get_message("pictureInPicture")
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
					menu_items.prepend(div)
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
 
})();
