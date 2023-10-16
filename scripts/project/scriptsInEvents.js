


const scriptsInEvents = {

	async ["EventSheet-GameLayout_Event1_Act7"](runtime, localVars)
	{
		// focus and blur events for accessibility close button
		
		const closeBtn = document.getElementById("close_btn");
		
		closeBtn.addEventListener('focus', function() { runtime.callFunction("HighlightPopupClose"); });
		
		closeBtn.addEventListener('blur', function() { closeBtn.focus();  });
		//runtime.callFunction("UnHighlightPopupClose");
		
		closeBtn.onclick = function() { runtime.callFunction("ClosePopup"); }
		
		const fakeBtn = document.getElementById("faker");
		
		fakeBtn.addEventListener('focus', function() { runtime.callFunction("HighlightPopupClose"); });
		fakeBtn.onclick = function() { runtime.callFunction("ClosePopup"); }
		
		const closeHowtoBtn = document.getElementById("close_howto_btn");
		
		closeHowtoBtn.addEventListener('focus', function() { runtime.callFunction("HighlightHowtoClose"); });
		
		closeHowtoBtn.addEventListener('blur', function() { closeHowtoBtn.focus();  });
		
		closeHowtoBtn.onclick = function() { runtime.callFunction("CloseHowto"); }
		
		const fakeHowtoBtn = document.getElementById("howto_faker");
		
		fakeHowtoBtn.addEventListener('focus', function() { runtime.callFunction("HighlightHowtoClose"); });
		fakeHowtoBtn.onclick = function() { runtime.callFunction("CloseHowto"); }
	},

	async ["EventSheet-GameLayout_Event1_Act12"](runtime, localVars)
	{
		document.getElementById("instruction_text").focus();
	},

	async ["EventSheet-GameLayout_Event2_Act1"](runtime, localVars)
	{
		document.getElementById("close_btn").focus();
	},

	async ["EventSheet-GameLayout_Event106_Act1"](runtime, localVars)
	{
		document.getElementById("howto_body").innerHTML = document.getElementById("howto_acc_text").innerHTML;
	},

	async ["EventSheet-GameLayout_Event112_Act2"](runtime, localVars)
	{
		document.getElementById("close_howto_btn").focus();
	},

	async ["EventSheet-GameLayout_Event113_Act11"](runtime, localVars)
	{
		document.getElementById("close_howto_btn").focus();
	},

	async ["EventSheet-GameLayout_Event130_Act2"](runtime, localVars)
	{
		document.getElementById("h2_text").innerHTML = runtime.objects["popup_text_title"].getFirstInstance().text;
	},

	async ["EventSheet-GameLayout_Event131_Act2"](runtime, localVars)
	{
		document.getElementById("body_text").innerHTML = "";
		
		document.getElementById("body_text").innerHTML = runtime.objects["popup_text_body"].getFirstInstance().text;
	},

	async ["EventSheet-GameLayout_Event135_Act4"](runtime, localVars)
	{
		document.getElementById("status_lives").innerHTML = "<p>You have " + runtime.globalVars.lives_left + " of " + runtime.globalVars.lives_max + " lives left</p>";
		document.getElementById("status_items").innerHTML = "<p>You have found " + runtime.globalVars.score + " of " + runtime.globalVars.score_max + " security risks in the office</p>";
	},

	async ["EventSheet-GameLayout_Event139_Act4"](runtime, localVars)
	{
		document.getElementById("status_lives").innerHTML = "<p>You have " + runtime.globalVars.lives_left + " of " + runtime.globalVars.lives_max + " lives left</p>";
		document.getElementById("status_items").innerHTML = "<p>You have found " + runtime.globalVars.score + " of " + runtime.globalVars.score_max + " security risks in the office</p>";
	},

	async ["EventSheet-GameLayout_Event144_Act3"](runtime, localVars)
	{
		document.getElementById("status_rats").innerHTML = "<p>You have found " + runtime.globalVars.bonus_collected + " out of " + runtime.globalVars.bonus_max + " rats.</p>";
		document.getElementById("status_bonus").innerHTML = "<p>You have found " + runtime.globalVars.bonus_collected + " out of " + runtime.globalVars.bonus_max + " rats.</p>"
	},

	async ["EventSheet-GameLayout_Event150_Act2"](runtime, localVars)
	{
		document.getElementById("body_text").innerHTML = "";
		
		document.getElementById("body_text").innerHTML = runtime.objects["popup_text_body"].getFirstInstance().text;
	},

	async ["EventSheet-GameLayout_Event154_Act1"](runtime, localVars)
	{
		document.getElementById("body_text").innerHTML = "";
		
		document.getElementById("body_text").innerHTML = runtime.objects["popup_text_body"].getFirstInstance().text + runtime.objects["text_to_append"].getFirstInstance().text;
	},

	async ["EventSheet-GameLayout_Event156_Act3"](runtime, localVars)
	{
		setScormScore(100);  
		setScormCompletion();
		
	},

	async ["EventSheet-GameLayout_Event163_Act2"](runtime, localVars)
	{
		document.getElementById("close_btn").focus();
	},

	async ["EventSheet-GameLayout_Event166_Act11"](runtime, localVars)
	{
		document.getElementById("close_btn").focus();
	},

	async ["EventSheet-GameLayout_Event233_Act2"](runtime, localVars)
	{
		//const arItems = runtime.objects["items_all"].getAllInstances();
		const arButtons = runtime.objects["buttons_acc"].getAllInstances();
		
		arButtons[runtime.globalVars.cur_item-1].focus();
	},

	async ["EventSheet-Intro_Event1_Act2"](runtime, localVars)
	{
		try {
		    var scormPresent = isScormPresent();
		    runtime.globalVars.connectedToScorm = scormPresent;
		}
		catch(err) {
		    console.log('This is not a Scorm Build');
		    console.log(err);
		}
		
	},

	async ["EventSheet-Intro_Event1_Act4"](runtime, localVars)
	{
		document.getElementById("title").tabIndex = -1;
		
		document.getElementById("intro_body").innerHTML = runtime.objects["intro_body_text"].getFirstInstance().text;
		
		document.getElementById("intro_text").focus();
		
		const howtoBtn = document.getElementById("howto_btn");
		const startBtn = document.getElementById("start_btn");
		
		howtoBtn.addEventListener('focus', function() { runtime.callFunction("HighlightHowToBtn"); });
		howtoBtn.onclick = function() { runtime.callFunction("ShowHowTo"); }
		
		startBtn.addEventListener('focus', function() { runtime.callFunction("HighlightStartBtn"); });
		startBtn.onclick = function() { runtime.callFunction("StartGame"); }
	},

	async ["EventSheet-Intro_Event11_Act12"](runtime, localVars)
	{
		document.getElementById("howto_body").innerHTML = document.getElementById("howto_acc_text").innerHTML;
		
		document.getElementById("howto_text").focus();
		
		const htpStartBtn = document.getElementById("htp_start_btn");
		
		htpStartBtn.addEventListener('focus', function() { runtime.callFunction("HighlightStartBtn"); });
		htpStartBtn.onclick = function() { runtime.callFunction("StartGame"); }
	},

	async ["EventSheet-Intro_Event12_Act1"](runtime, localVars)
	{
		document.getElementById("loading_text").innerHTML = "loading game";
		document.getElementById("loading_text").focus();
	},

	async ["EventSheet-End_Event1_Act2"](runtime, localVars)
	{
		
		const replayBtn = document.getElementById("replay_btn");
		const downloadBtn = document.getElementById("download_btn");
		const closeGameBtn = document.getElementById("closegame_btn");
		
		replayBtn.addEventListener('focus', function() { runtime.callFunction("HighlightReplayBtn"); });
		replayBtn.onclick = function() { runtime.callFunction("ReplayGame"); }
		
		downloadBtn.addEventListener('focus', function() { runtime.callFunction("HighlightDownloadBtn"); });
		downloadBtn.onclick = function() { runtime.callFunction("DownloadImage"); }
		
		closeGameBtn.addEventListener('focus', function() { runtime.callFunction("HighlightCloseGameBtn"); });
		closeGameBtn.onclick = function() { runtime.callFunction("CloseGame"); }
	},

	async ["EventSheet-End_Event2_Act6"](runtime, localVars)
	{
		document.getElementById("h1_end_title").innerHTML = runtime.objects["end_text_title_win"].getFirstInstance().text;
		
		document.getElementById("end_body").innerHTML =  runtime.objects["end_screen_text"].getFirstInstance().text + runtime.objects["text_accessibility_win"].getFirstInstance().text;
		
		document.getElementById("end_text").focus();
	},

	async ["EventSheet-End_Event3_Act1"](runtime, localVars)
	{
		document.getElementById("download_btn").style.display = "none";
	},

	async ["EventSheet-End_Event3_Act8"](runtime, localVars)
	{
		document.getElementById("h1_end_title").innerHTML = runtime.objects["end_text_title_lose"].getFirstInstance().text;
		
		document.getElementById("end_body").innerHTML =  runtime.objects["end_screen_text"].getFirstInstance().text;
		
		
		document.getElementById("end_text").focus();
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

