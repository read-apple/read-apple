let mBrowser = chrome? chrome: browser;

mBrowser.runtime.sendMessage({}, function(response) {

	let loadedScript = false;

	function injectInlineCode() {
		var actualCodeMobile = `// Code here.
			document.uReadDisplayMsgBox = function(_) {}; //For Desktop
			ureadUpdate = function(_, __,___,____) {}; //For Mobile
			ureadInit = function() {}; //For Mobile
			uReadPrompt = function(_, __, ___) {};
			OMOureadEnable = true;
		`;

		var script2 = document.createElement('script');
		script2.textContent = actualCodeMobile;
		(document.head||document.documentElement).appendChild(script2);
		
	}

	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);


		// Handle Android, since not in the same position
		if(!loadedScript) {
			injectInlineCode();
			loadedScript = true;
		}


		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		// ----------------------------------------------------------
		OMOSubscFlag = true; // GLOBAL
		 // override autostop function
		let LHSContent = document.querySelector(".cntb .LHSContent");
		if (LHSContent) {
			LHSContent.className += ' hide-before';
		}
		let contentBlock = document.querySelector(".contentblock-block")
		if(contentBlock) {
			contentBlock.style.display = "none";
		}
		let articleContent = document.querySelector(".cntb.block #articleContent")
		if(articleContent) {
			articleContent.style.height = "auto";
		}
		let content = document.querySelector('div.content');
		if (content) {
			content.classList.remove('block');
		}
		// Must insert at the end of <body>
		var actualCode = `// Code here.
			uReadDisplayMsgBox = function(_) {}; //For Desktop
		`;

		var script = document.createElement('script');
		script.textContent = actualCode;
		(document.body||document.documentElement).appendChild(script);


		var floatingIcon = document.createElement('div');
		floatingIcon.textContent = `🍏`;
		floatingIcon.id = `readapple-icon`;
		(document.body||document.documentElement).appendChild(floatingIcon);

	}



	// Handle Mobile version separately
	else if (document.readyState === "interactive") {
		if(!loadedScript) {
			loadedScript = true;
			injectInlineCode();
		}
	}


	}, 10);
});