// frontier CDPI ticket tool javascript
function get_html_translation_table(table, quote_style) {
	var entities = {},
		hash_map = {},
		decimal;
	var constMappingTable = {},
		constMappingQuoteStyle = {};
	var useTable = {},
		useQuoteStyle = {};

	// Translate arguments
	constMappingTable[0] = 'HTML_SPECIALCHARS';
	constMappingTable[1] = 'HTML_ENTITIES';
	constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
	constMappingQuoteStyle[2] = 'ENT_COMPAT';
	constMappingQuoteStyle[3] = 'ENT_QUOTES';

	useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
	useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

	if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
		throw new Error("Table: " + useTable + ' not supported');
		// return false;
	}
	entities['38'] = '&amp;';
	if (useTable === 'HTML_ENTITIES') {
		entities['160'] = '&nbsp;';
		entities['161'] = '&iexcl;';
		entities['162'] = '&cent;';
		entities['163'] = '&pound;';
		entities['164'] = '&curren;';
		entities['165'] = '&yen;';
		entities['166'] = '&brvbar;';
		entities['167'] = '&sect;';
		entities['168'] = '&uml;';
		entities['169'] = '&copy;';
		entities['170'] = '&ordf;';
		entities['171'] = '&laquo;';
		entities['172'] = '&not;';
		entities['173'] = '&shy;';
		entities['174'] = '&reg;';
		entities['175'] = '&macr;';
		entities['176'] = '&deg;';
		entities['177'] = '&plusmn;';
		entities['178'] = '&sup2;';
		entities['179'] = '&sup3;';
		entities['180'] = '&acute;';
		entities['181'] = '&micro;';
		entities['182'] = '&para;';
		entities['183'] = '&middot;';
		entities['184'] = '&cedil;';
		entities['185'] = '&sup1;';
		entities['186'] = '&ordm;';
		entities['187'] = '&raquo;';
		entities['188'] = '&frac14;';
		entities['189'] = '&frac12;';
		entities['190'] = '&frac34;';
		entities['191'] = '&iquest;';
		entities['192'] = '&Agrave;';
		entities['193'] = '&Aacute;';
		entities['194'] = '&Acirc;';
		entities['195'] = '&Atilde;';
		entities['196'] = '&Auml;';
		entities['197'] = '&Aring;';
		entities['198'] = '&AElig;';
		entities['199'] = '&Ccedil;';
		entities['200'] = '&Egrave;';
		entities['201'] = '&Eacute;';
		entities['202'] = '&Ecirc;';
		entities['203'] = '&Euml;';
		entities['204'] = '&Igrave;';
		entities['205'] = '&Iacute;';
		entities['206'] = '&Icirc;';
		entities['207'] = '&Iuml;';
		entities['208'] = '&ETH;';
		entities['209'] = '&Ntilde;';
		entities['210'] = '&Ograve;';
		entities['211'] = '&Oacute;';
		entities['212'] = '&Ocirc;';
		entities['213'] = '&Otilde;';
		entities['214'] = '&Ouml;';
		entities['215'] = '&times;';
		entities['216'] = '&Oslash;';
		entities['217'] = '&Ugrave;';
		entities['218'] = '&Uacute;';
		entities['219'] = '&Ucirc;';
		entities['220'] = '&Uuml;';
		entities['221'] = '&Yacute;';
		entities['222'] = '&THORN;';
		entities['223'] = '&szlig;';
		entities['224'] = '&agrave;';
		entities['225'] = '&aacute;';
		entities['226'] = '&acirc;';
		entities['227'] = '&atilde;';
		entities['228'] = '&auml;';
		entities['229'] = '&aring;';
		entities['230'] = '&aelig;';
		entities['231'] = '&ccedil;';
		entities['232'] = '&egrave;';
		entities['233'] = '&eacute;';
		entities['234'] = '&ecirc;';
		entities['235'] = '&euml;';
		entities['236'] = '&igrave;';
		entities['237'] = '&iacute;';
		entities['238'] = '&icirc;';
		entities['239'] = '&iuml;';
		entities['240'] = '&eth;';
		entities['241'] = '&ntilde;';
		entities['242'] = '&ograve;';
		entities['243'] = '&oacute;';
		entities['244'] = '&ocirc;';
		entities['245'] = '&otilde;';
		entities['246'] = '&ouml;';
		entities['247'] = '&divide;';
		entities['248'] = '&oslash;';
		entities['249'] = '&ugrave;';
		entities['250'] = '&uacute;';
		entities['251'] = '&ucirc;';
		entities['252'] = '&uuml;';
		entities['253'] = '&yacute;';
		entities['254'] = '&thorn;';
		entities['255'] = '&yuml;';
	}

	if (useQuoteStyle !== 'ENT_NOQUOTES') {
		entities['34'] = '&quot;';
	}
	if (useQuoteStyle === 'ENT_QUOTES') {
		entities['39'] = '&#39;';
	}
	entities['60'] = '&lt;';
	entities['62'] = '&gt;';

	// ascii decimals to real symbols
	for (decimal in entities) {
		if (entities.hasOwnProperty(decimal)) {
			hash_map[String.fromCharCode(decimal)] = entities[decimal];
		}
	}

	return hash_map;
}

function html_entity_decode(string, quote_style) {
	var hash_map = {},
		symbol = '',
		tmp_str = '',
		entity = '';
	tmp_str = string.toString();

	if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
		return false;
	}

	// fix &amp; problem
	// http://phpjs.org/functions/get_html_translation_table:416#comment_97660
	delete(hash_map['&']);
	hash_map['&'] = '&amp;';

	for (symbol in hash_map) {
		entity = hash_map[symbol];
		tmp_str = tmp_str.split(entity).join(symbol);
	}
	tmp_str = tmp_str.split('&#039;').join("'");

	return tmp_str;
}


function isSunday(dateString) {
	var dayOfWeek = (new Date(dateString)).getDay();
	if (dayOfWeek == 0) {
		return true;
	}
	else {
		return false;
	}
}

function include(filename) {
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.type = "text/javascript";
	var uri = filename + (filename.indexOf("?") == -1 ? "?rand=" + (new Date()).valueOf() : (filename.indexOf("&", filename.indexOf("?")) ? "&rand=" + (new Date()).valueOf() : "rand=" + (new Date()).valueOf()))
	script.src = uri;
	head.appendChild(script);
	return true;
}

function brandon() {
	var curtime = new Date();
	if ((curtime.getHours() >= 8 && curtime.getHours() <= 17) && (curtime.getDay() >= 1 && curtime.getDay() <= 5)) {
		return true;
	}
	else {
		return false;
	}
}

function urlencode(what) {
	return encodeURIComponent(what);
}

function Ajax() {
	var ajaxElem = null;
	var requestQueue = (new Array());
	var domobj = null;
	var outputFunc = null;
	var headers = (new Array());

	this.setHeader = function (header, value) {
		headers.push((new Array(header, value)));
		return true;
	}

	this.readyState = function () {
		return (ajaxElem == null ? 0 : ajaxElem.readyState);
	}

	this.getAjax = function () {
		return ajaxElem;
	}

	this.documentElement = function () {
		if (ajaxElem.responseXML) {
			if (ajaxElem.responseXML.documentElement) {
				return ajaxElem.responseXML.documentElement;
			}
			else {
				return null;
			}
		}
		else {
			return null;
		}
	}

	this.addRequest = function (baseURI, variables, outfunc) {
		requestQueue.push((new Array(baseURI, variables)));
		outputFunc = outfunc;
		this.handleNextRequest();
	}

	this.handleNextRequest = function () {
		if (requestQueue.length == 0) {
			return true;
		}
		curRequest = requestQueue.shift();
		this.sendRequest(curRequest);
		return true;
	}

	this.verifyAjax = function () {
		if (ajaxElem.responseXML && ajaxElem.responseXML.documentElement) {
			return true;
		}
		else {
			return false;
		}
	}

	this.sendRequest = function (requestElem) {
		try {
			ajaxElem = new XMLHttpRequest();
		}
		catch (e) {
			try {
				ajaxElem = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e) {
				ajaxElem = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		var uri = requestElem[0] + (requestElem[0].indexOf("?") == -1 ? "?rand=" + (new Date()).valueOf() : (requestElem[0].indexOf("&", requestElem[0].indexOf("?")) ? "&rand=" + (new Date()).valueOf() : "rand=" + (new Date()).valueOf()))
		try {
			if (outputFunc == null) {
				ajaxElem.open("POST", uri, false);
				if (headers.length > 0) {
					for (var h = 0; h < headers.length; h++) {
						ajaxElem.setRequestHeader(headers[h][0], headers[h][1]);
					}
				}
			}
			else {
				ajaxElem.onreadystatechange = (outputFunc == null ? this.parseOutput : outputFunc);
				ajaxElem.open("POST", uri, true);
				if (headers.length > 0) {
					for (var h = 0; h < headers.length; h++) {
						ajaxElem.setRequestHeader(headers[h][0], headers[h][1]);
					}
				}
			}
			if (requestElem[1].length >= 1) {
				//alert("requestElem >=1");
				var varstring = new Array();
				for (var varCount = 0; varCount < requestElem[1].length; varCount++) {
					varstring.push(requestElem[1][varCount].join("="));
				}
				varstring = varstring.join("&");
			}
			else {
				varstring = "";
			}
			ajaxElem.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
				ajaxElem.setRequestHeader("Content-length", varstring.length);
				ajaxElem.setRequestHeader("Connection", "close");
			}
			ajaxElem.send(varstring);
		}
		catch (e) {
			if (requestElem[1].length >= 1) {
				//alert("exception e ");
				var varstring = new Array();
				for (var varCount = 0; varCount < requestElem[1].length; varCount++) {
					varstring.push(requestElem[1][varCount].join("="));
				}
				varstring = varstring.join("&");
			}
			else {
				varstring = "";
			}
			if (outputFunc == null) {
				if (varstring == "") {
					ajax.open("GET", uri, false);
					if (headers.length > 0) {
						for (var h = 0; h < headers.length; h++) {
							ajaxElem.setRequestHeader(headers[h][0], headers[h][1]);
						}
					}
				}
				else {
					ajaxElem.open("GET", uri + "&" + varstring, false);
					if (headers.length > 0) {
						for (var h = 0; h < headers.length; h++) {
							ajaxElem.setRequestHeader(headers[h][0], headers[h][1]);
						}
					}
				}
			}
			else {
				ajaxElem.onreadystatechange = (outputFunc == null ? this.parseOutput : outputFunc);
				if (varstring == "") {
					ajax.open("GET", uri, true);
					if (headers.length > 0) {
						for (var h = 0; h < headers.length; h++) {
							ajaxElem.setRequestHeader(headers[h][0], headers[h][1]);
						}
					}
				}
				else {
					ajaxElem.open("GET", uri + "&" + varstring, true);
					if (headers.length > 0) {
						for (var h = 0; h < headers.length; h++) {
							ajaxElem.setRequestHeader(headers[h][0], headers[h][1]);
						}
					}
				}
			}
			ajaxElem.send(null);
		}
	}
}

// setup our global ajax objects
var onlineAjax = null;
var forceAjax = null;
var ticketAjax = null;
var errorAjax = null;
var ticketInuse = false;
var force = false;

// some global variables to do global things with
var env = null;
var envName = '';
var serviceType = '';


function _(what) {
	return document.getElementById(what);
}

// keep the js from executing before document DOM is loaded

if (document.readyState == "complete") {
	load();
}
else {
	if (/WebKit/i.test(navigator.userAgent)) { // sniff
		var _timer = setInterval(function () {
			if (/loaded|complete/.test(document.readyState)) {
				clearInterval(_timer);
				load(); // call the onload handler
			}
		}, 10);
	}
	else if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", load, false);
	}
	else {
		document.onreadystatechange = function () {
			if (document.readyState == "complete") {
				load();
			}
		};
	}
}

function load() {
	// setup our global ajax objects
	onlineAjax = new Ajax();
	forceAjax = new Ajax();
	ticketAjax = new Ajax();
	errorAjax = new Ajax();
	doReset();
	onlineAjax.addRequest("checkOutage.php", new Array(), onlineStatus);
	//setInterval(function () {
	//    onlineAjax.addRequest("checkOutage.php", new Array(), onlineStatus);
	//}, 30000);
	setInterval(function () {
		if (_("wtn").value.replace(/[^0-9]/g, '').substr(0, 10).length == 10 && _("lanid").value.length > 0) {
			forceAjax.addRequest("force.php", new Array(new Array('lanid', _("lanid").value.substr(0, 10).toUpperCase()), new Array('wtn', _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10))), forceable);
		}
	}, 10000);
}

function forceable() {
	if (forceAjax.readyState() == 4) {
		if (String(typeof(forceAjax.documentElement())).toLowerCase() == "object" && forceAjax.documentElement()) {
			var xmldoc = forceAjax.documentElement();
			var allow = xmldoc.getElementsByTagName("allow");
			if (allow) {
				if (allow.length > 0) {
					if (allow[0].childNodes.length > 0) {
						allow = allow[0].childNodes[0].nodeValue;
					}
					else {
						return;
					}
				}
				else {
					return;
				}
			}
			else {
				return;
			}
			if (Number(allow) == 1) {
				force = true;
				document.body.style.backgroundColor = "rgb(146, 0, 10)";
				document.title = "CDPI Portal";
			}
			else {
				document.body.style.backgroundColor = "rgb(255, 255, 255)";
				document.title = "CDPI Portal";
			}
		}
	}
}

function onlineStatus() {
	if (onlineAjax.readyState() == 4) {
		if (String(typeof(onlineAjax.documentElement())).toLowerCase() == "object" && onlineAjax.documentElement()) {
			var docElem = onlineAjax.documentElement();
			var status = docElem.getElementsByTagName("status");
			if (status) {
				if (status.length > 0) {
					if (status[0].childNodes.length > 0) {
						status = status[0].childNodes[0].nodeValue;
					}
					else {
						return;
					}
				}
				else {
					return;
				}
				switch (status) {
					case "up":
						if (_("outageboard")) {
							_("outageboard").style.display = "none";
						}
						if (_("mainDiv")) {
							if (_("mainDiv").style.display == "none") {
								if (_("offline")) {
									_("offline").style.display = "none";
								}
								if (_("outageboard")) {
									_("outageboard").style.display = "none";
								}
								if (_("mainDiv")) {
									_("mainDiv").style.display = "block";
								}
								window.location.href = unescape(window.location.pathname);
							}
						}
						break;
					case "down":
						if (_("offline")) {
							_("offline").style.display = "inline";
						}
						if (_("mainDiv")) {
							_("mainDiv").style.display = "none";
						}
						if (_("outageboard")) {
							_("outageboard").style.display = "none";
						}
						break;
					default:
						if (_("offline")) {
							if (_("offline").style.display == "none") {
								var h = 3600;
								var m = 60;
								var s = 1;
								var left = status;
								var hours = Math.floor((left / h), 0);
								left = left % h;
								var minutes = Math.floor((left / m), 0);
								left = left % m;
								var seconds = Math.floor((left / s), 0);
								if (_("outageboard")) {
									if (_("outageboard").style.display == "none") {
										_("outageboard").style.display = "block";
									}
								}
								if (_("timeleft")) {
									var out = new Array();
									if (hours > 0)
										out.push((hours + " hour" + (hours == 1 ? "" : "s")));
									if (minutes > 0)
										out.push((minutes + " minute" + (minutes == 1 ? "" : "s")));
									if (seconds > 0)
										out.push((seconds + " second" + (seconds == 1 ? "" : "s")));
									_("timeleft").innerHTML = out.join(" ");
								}
							}
						}
						break;
				}
			}
		}
	}
}


function nextdayCommit() {
	var curDate = new Date();
	var curTime = curDate.getTime() / 1000;
	var otherTime = null;
	switch (env) {
		case 0:
		case 4:
		case 5:
			otherTime = curTime;
			break;
		case 1:
			otherTime = curTime - (3600 * 2);
			break;
		case 2:
		case 3:
		case 6:
			otherTime = curTime + (3600);
			break;
		default:
			otherTime = curTime;
			break;
	}
	otherDate = new Date();
	otherDate.setTime((otherTime * 1000));
	var options = new Array();
	switch (true) {
		case true:
			if (_("newtime")) {
				for (i = 0; i < _("newtime").options.length; i++) {
					_("newtime").remove(0);
				}
				options.push(document.createElement("option"));
				options[0].text = "All Day (8AM - 5PM)";
				options[0].value = 2;
			}
			break;
		case (otherDate.getHours() >= 0 && otherDate.getHours() < 12):
			if (_("newtime")) {
				for (i = 0; i < _("newtime").options.length; i++) {
					_("newtime").remove(0);
				}
				options.push(document.createElement("option"));
				options.push(document.createElement("option"));
				options.push(document.createElement("option"));
				options[0].text = "AM (8AM - 12PM)";
				options[1].text = "PM (1PM - 5PM)";
				options[2].text = "All Day (8AM - 5PM)";
				options[0].value = 0;
				options[1].value = 1;
				options[2].value = 2;
			}
			break;
		case (otherDate.getHours() >= 12 && otherDate.getHours() < 24):
			if (_("newtime")) {
				for (i = 0; i < _("newtime").options.length; i++) {
					_("newtime").remove(0);
				}
				options.push(document.createElement("option"));
				options.push(document.createElement("option"));
				options[0].text = "PM (1PM - 5PM)";
				options[1].text = "All Day (8AM - 5PM)";
				options[0].value = 1;
				options[1].value = 2;
			}
			break;
	}
	if (_("newtime")) {
		for (i = 0; i < options.length; i++) {
			try {
				_("newtime").add(options[i], null);
			}
			catch (e) {
				_("newtime").add(options[i]);
			}
		}
	}
}

function allCommit() {
	var options = new Array();
	if (_("newtime")) {
		while (_("newtime").options.length > 0) {
			_("newtime").remove(0);
		}
		options.push(document.createElement("option"));
		options.push(document.createElement("option"));
		options.push(document.createElement("option"));
		/** for now AM and PM are broke, only all day
		 options[0].text = "AM (8AM - 12PM)";
		 options[1].text = "PM (1PM - 5PM)";
		 **/
		options[0].text = "All Day (8AM - 5PM)";
		/**
		 options[0].value = 0;
		 options[1].value = 1;
		 **/
		options[0].value = 2;
		for (i = 0; i < options.length; i++) {
			try {
				_("newtime").add(options[i], null);
			}
			catch (e) {
				_("newtime").add(options[i]);
			}
		}
	}
}

function createError(text) {
	createNotice('<span style="font-size: 25px; font-weight: bold;">READ THIS</span>', text);
}

function createNotice(title, text) {
	var rows = new Array(document.createElement("tr"), document.createElement("tr"));
	var th = document.createElement("th");
	th.style.textAlign = "center";
	th.innerHTML = title;
	rows[0].appendChild(th);
	var td = document.createElement("td");
	td.style.textAlign = "center";
	var span = document.createElement("span");
	span.style.fontWeight = "bold";
	span.innerHTML = text;
	td.appendChild(span);
	rows[1].appendChild(td);
	_("errortbl").appendChild(rows[0]);
	_("errortbl").appendChild(rows[1]);
	if (_("errortbl").style.display == "none") {
		_("errortbl").style.display = "inline";
	}
}

function clearNotice() {
	while (_("errortbl").childNodes.length > 0) {
		_("errortbl").removeChild(_("errortbl").lastChild);
	}
	_("errortbl").style.display = "none";
}

function showModemNotice() {
	createNotice("**Please Read**",
		"You are about to submit a modem replacement.  Please review the wiki to ensure you are submitting it through the correct form.<br>\n" +
		"Wiki Link: <a href='http://wiki.telenetwork.com/index.php/Frontier_Modem_Replacement' target=_blank'>http://wiki.telenetwork.com/index.php/Frontier_Modem_Replacement</a><br>\n" +
		"TTL Submission Form: <a href='https://itdev.corp.telenetwork.com/portal/?single=1&widget=FSecure%20Sales' target='_blank'>https://itdev.corp.telenetwork.com/portal/?single=1&widget=FSecure%20Sales</a><br>\n" +
		"<br>\n" +
		"If you have any questions please contact a L2/TL.");
}


function showCTFFiosNotice() {
	createNotice("**Please Read**",
		"Is this customer affected by one of these issues?:<p>" +
		"<br>1. Adding/Activating ONT" +
		"<br>2. Adding/Activating STB" +
		"<br>3. Adding/Activating BHR" +
		"<br>4. Orange/Red Internet Light" +
		"<br>5. Packet Loss/Frequent Disconnects" +
		"<br>6. Static IP Trouble " +
		"<br>7. Routing Trouble" +
		"<br>8. Video On Demand Access" +
		"<br>9. Interactive Media Guide Access" +
		"<br>10. Guide Access" +
		"<br>11. Caller ID" +
		"<br>12. Caller ID on TV" +
		"<br>13. No Dial Tone" +
		"<br>14. FDV Call Quality" +
		"<p> If so, you are required to contact NT chat <a href='http://ihelp.frontiercorp.com/HelpRequest?Area=ctf-ats-rtnt' target='_blank'>here</a> before entering a ticket for this customer. ");
}

// Cookies & Logged on Verification

var today = new Date();

//var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days

function setCookie(name, value) {
	document.cookie = name + "=" + escape(value) + "; path=/;";
}

function storeValues(form) {
	setCookie('lanid', form.lanid.value);
	setCookie('lanpwd', form.lanpwd.value);
	$('#portalLogin').hide();
	$('#lpb').show();
	checkForLogin();
	return true;
}

function getCookie(name) {
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null;
}

var expired = new Date(today.getTime() - 24 * 3600 * 1000); // less 24 hours

function deleteCookie(name) {
	document.cookie = name + "=null; path=/; expires=" + expired.toGMTString();
}

function clearCookies() {
	deleteCookie('lanid');
	deleteCookie('lanpwd');
	deleteCookie('portalPW');
	$("#lanpwd").val("");
	$('#portalLogin').show();
	$('#lpb').hide();
	$('#logout').hide();
	$('#tix_nav').css("display", "none");
	$('#bill_nav').css("display", "none");
	$('#ts_nav').css("display", "none");
}

function checkForLogin() {
	if (getCookie('lanid')) {
		$("#portalLogin").hide();
		$("#logout").hide();
		$("#lpb").show();
		vjhttp = new XMLHttpRequest();
		vjhttp.open("POST", "jwalk/speed/VJ.php", true);
		vjhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		vjhttp.send("user=" + getCookie('lanid') + "&pass=" + getCookie('lanpwd'));
		vjhttp.onreadystatechange = function () {
			var txt;
			var obj;
			if (vjhttp.readyState == 4 && vjhttp.status == 200) {
				txt = vjhttp.responseText;
				obj = eval("(" + txt + ")");
				if (obj.l_error) {
					clearCookies();
					$("#errorMsg").html(obj.l_error);
					$('#errorModal').modal('show');
					// alert(obj.l_error);
					return false;
				}
				else {
					$('#tix_nav').css("display", "inline");
					$('#bill_nav').css("display", "inline");
					$('#ts_nav').css("display", "inline");
				}
			}
			$('#lpb').hide();
			$('#logout').show();
		}
	}
	else {
		$('#lpb').hide();
		$('#logout').hide();
		$('#portalLogin').show();
	}

}

// End of Cookies & Logged on Verification


function changeMind() {
	$('#afterVerified').css("display", "none");
	$('#login').css("display", "inline");
	$('#vl').css("display", "none");
	$('#vnum').css("display", "inline");
	$('#v').css("display", "inline");
	$('#wtn').val("");
	clearTicketInfo();
}

function verifyNumber() {
	if (ticketInuse) {
		return;
	}
	clearNotice();
	var params;

	if (_("wtn")) {
		var wtn = _("wtn");
	}
	else {
		params = new Array();
		params.push(new Array("lanid", "System"));
		params.push(new Array("error", "Missing WTN / lanid / lanpwd (Function: numberVerify)"));
		errorAjax.addRequest("error.php", params);
		if (brandon()) {
			window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tickettool&amp;body=" + urlencode("Missing WTN / lanid / lanpwd (Function: numberVerify)");
		}
		alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
		window.location.href = unescape(window.location.pathname);
		return;
	}
	/* check login info */
	switch (true) {
		case (getCookie('lanid').length == 0):
			_(getCookie('lanid')).focus();
			_(getCookie('lanid')).select();
			return;
			break;
		case (getCookie('lanpwd').length == 0):
			_(getCookie('lanpwd')).focus();
			_(getCookie('lanpwd')).select();
			return;
			break;
		case (wtn.value.replace(/[^0-9]/g, '').substr(0, 10).length != 10):
			_("wtn").focus();
			_("wtn").value = _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10);
			_("wtn").select();
			return;
			break;
	}

	// run through our checks
	/* fict number
     * 570 - 091
     *       092
     *       093
     *       094
     */
	if (!force) {
		var npa = Number(wtn.value.replace(/[^0-9]/g, '').substr(0, 10).substr(0, 3));
		var nxx = Number(wtn.value.replace(/[^0-9]/g, '').substr(0, 10).substr(3, 3));
		if (npa == 570) {
			if (nxx >= 091 && nxx <= 094) {
				createError("This is an Epix fictitious number. Please attempt to enter a ticket on the customers valid WTN, if you need more assistance contact a Level II in your teams chat room.");
				_("wtn").focus();
				return;
			}
		}
	}

	ticketInuse = true;

	if (_("v")) {
		_("v").style.display = "none";
	}
	if (_("vl")) {
		_("vl").style.display = "inline";
	}

	params = new Array();
	params.push(new Array("lanid", getCookie('lanid')));
	params.push(new Array("lanpwd", getCookie('lanpwd')));
	params.push(new Array("wtn", wtn.value.replace(/[^0-9]/g, '').substr(0, 10)));

	ticketAjax.addRequest("verifyNumber.php", params, numberVerify);
	return;
}

$(function () {
	$("input[name=lanid]").val(getCookie("lanid"));
});
$(function () {
	$("input[name=lanpwd]").val(getCookie("lanpwd"));
});

function numberVerify() {
	if (ticketAjax.readyState() == 4) {
		ticketInuse = false;
		var params;
		if (_("wtn") && getCookie('lanid') && getCookie('lanid')) {
			var wtn = _("wtn");
			var lanid = _("lanid");
			var lanpwd = _("lanpwd");
		}
		if (ticketAjax.documentElement()) {
			var xmldoc = ticketAjax.documentElement();
			// errors come before everything
			var errorCheck = xmldoc.getElementsByTagName("error");
			if (errorCheck) {
				if (errorCheck.length > 0) {
					if (errorCheck[0].childNodes.length > 0) {
						var error = errorCheck[0].childNodes[0].nodeValue
						_("wtn").focus();
						_("v").style.display = "inline";
						_("vl").style.display = "none";
						createError("Jwalk Error: " + error + "<br /><br />Don't understand this error? Check with a L2 in your team chat.");
						// check for password change required
						var passCheck = xmldoc.getElementsByTagName("password");
						if (passCheck) {
							if (passCheck.length > 0) {
								if (passCheck[0].childNodes.length > 0) {
									var pass = passCheck[0].childNodes[0].nodeValue;
									_("passwordchange").style.display = 'inline';
								}
							}
						}
						return;
					}
				}
			}
			// check for open ticket
			var refCheck = xmldoc.getElementsByTagName("ref_ticket");
			if (refCheck) {
				var refStage = xmldoc.getElementsByTagName("ref_stage");
				var refType = xmldoc.getElementsByTagName("ref_type");
				if (refCheck.length > 0) {
					if (refCheck[0].childNodes.length > 0) {
						refCheck = refCheck[0].childNodes[0].nodeValue;
						if (refStage) {
							if (refStage.length > 0) {
								if (refStage[0].childNodes.length > 0) {
									refStage = refStage[0].childNodes[0].nodeValue.replace(/[ ]/g, '');
								}
							}
						}
						else {
							refStage = null;
						}
						if (refType) {
							if (refType.length > 0) {
								if (refType[0].childNodes.length > 0) {
									refType = refType[0].childNodes[0].nodeValue.replace(/[ ]/g, '');
								}
							}
						}
						else {
							refType = null;
						}
						switch (true) {
							case (refCheck.length > 6):
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an open service order on this account, check with a L2 in your team chat to determine if further escalation is needed.<br>SO: " + refCheck);
								return;
								break;
							case (refType == "CC"):
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is a common cause issue currently in place for this customers area. Do not continue with this repair ticket, inform customer of issue.<br><a href='https://www.ihd.frontiernet.net/TechManual/common_causes/index.html' target='_blank'>View the Wiki Page here. /a> Need help? Contact a L2 in your team's chat room.<br>CC Ticket: " + refCheck + "<br>CC Commit:" + refCommitDate + " " + refCommitTime);
								return;
								break;
							case (refStage == "DIS" && refType == "DS"):
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is already an active ticket in place on this account. Do not place another repair ticket on this account. Need help? Try viewing the active ticket in Viryanet. For further assistance contact a L2 in your team chat room.<br>Ticket: " + refCheck + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
							case (refStage == "TEN"):
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an active repair ticket in place on this account. The repair ticket is currently being worked (there is a repair tech in the field).<br>Inform the customer of this. For further assistance contact a L2 in your team chat room.<br>Ticket Number: " + refCheck);
								return;
								break;
							case (refStage == "***"):
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an unstaged repair ticket on this account, contact a L2 in your team chat room to have this problem resolved.");
								return;
								break;
							case (refType == "RS"):
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an active residential service repair ticket on this account.<br>Message a L2 in your team chat room for further assistance.<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
							case (refType == "BS"):
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an active business service repair ticket on this account.<br>Message a L2 in your team chat room for further assistance.<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
							default:
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is a repair ticket currently in place on this account. Message a L2 in your team chat room for further assistance.<br>Type: " + refType + "<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
						}
					}
				}
			}
			var linecard = xmldoc.getElementsByTagName("linecard");
			if (linecard.length > 0) {
				if (linecard[0].childNodes.length > 0 && linecard[0].childNodes[0].data > 0) {
					// this verifies that there is a line card, in which case we can continue on and check for other services.
					if (xmldoc.getElementsByTagName("lineCardType").length > 0) {
						var lineCardType = xmldoc.getElementsByTagName("lineCardType")[0].childNodes[0].nodeValue;
						_("lineCardType").value = lineCardType;
						console.log(_("lineCardType").value);
						linecard = Number(linecard[0].childNodes[0].nodeValue);
						if (linecard == 1) {
							// like inside wire care
							var iwc = (xmldoc.getElementsByTagName("IWM") ? Number(xmldoc.getElementsByTagName("IWM")[0].childNodes[0].nodeValue) : null);

							var envCheck = xmldoc.getElementsByTagName("env");
							if (envCheck) {
								if (envCheck.length > 0) {
									env = Number(envCheck[0].childNodes[0].nodeValue);
									if (env == 3) {
										_('epixstuf').style.display = "inline";
									}
									else {
										_('epixstuf').style.display = 'none';
									}
								}
								else {
									env = 0;
									_('epixstuf').style.display = 'none';
								}
							}
							else {
								env = 0;
								_('epixstuf').style.display = 'none';
							}

							var ticEnv = xmldoc.getElementsByTagName('envname');
							if (ticEnv.length > 0) {
								if (ticEnv[0].childNodes.length > 0) {
									ticEnv = ticEnv[0].childNodes[0].nodeValue;
								}
								else {
									ticEnv = '';
								}
							}
							else {
								ticEnv = '';
							}
							envName = ticEnv;

							var stype = xmldoc.getElementsByTagName('service_type');
							if (stype.length > 0) {
								if (stype[0].childNodes.length > 0) {
									stype = stype[0].childNodes[0].nodeValue;
								}
								else {
									stype = '';
								}
							}
							else {
								stype = '';
							}
							serviceType = stype;

							var $LC = lineCardType.trim();
							if ($LC.substring(0, 1) == "F") {
								$("#customerType").val("fiber");
								$("#affectedServicesContain").show();
								$("#affectedDslIssues").hide();
								$("#dslIssues").hide();
								$("#fiosIssues").show();
								$("#ftvIssues").hide();
								$("#pppInfo").hide();

								if (ticEnv == 'CP1CZ' || ticEnv == 'CP1FT') {
									showCTFFiosNotice();

								}
							}
							else if ($LC.substring(0, 1) == "U" || $LC.match(/XR1SB|XR1U|XR1UB|XR1US|XR1UV|XR1VB|XR1VS|XSVVR/)) {
								$("#customerType").val("ftv");
								$("#affectedServicesContain").show();
								$("#affectedDslIssues").hide();
								$("#ftvIssues").show();
								//$("#fwIssues").hide();
								$("#dslIssues").hide();
								$("#fiosIssues").hide();
								$("#pppInfo").hide();
							}
							else if ($LC.match(/WBFWB|WRFWB|XRFWB|XBFWB/)) {
								$("#customerType").val("fw");
								$("#affectedServicesContain").hide();
								$("#affectedDslIssues").hide();
								$("#fwIssues").show();
								$("#dslIssues").hide();
								$("#fiosIssues").hide();
								$("#ftvIssues").hide();
								$("#issueType").hide();
								$("#pppInfo").hide();
							}
							else {
								$("#customerType").val("dsl");
								$("#affectedDslIssues").show();
								$("#dslIssues").show();
								$("#fiosIssues").hide();
								$("#ftvIssues").hide();
								$("#affectedServicesContain").hide();
								$("#pppInfo").show();
							}


							var lcaddress = (xmldoc.getElementsByTagName("linecard_address") ? xmldoc.getElementsByTagName("linecard_address")[0].childNodes[0].nodeValue : "");
							var pnum = "";
							if (xmldoc.getElementsByTagName("phoneNumber").length != 0) {
								pnum = (xmldoc.getElementsByTagName("phoneNumber") ? xmldoc.getElementsByTagName("phoneNumber")[0].childNodes[0].nodeValue : "");
							}
							var fnam = "";
							if (xmldoc.getElementsByTagName("firstName").length != 0) {
								fnam = (xmldoc.getElementsByTagName("firstName")[0].childNodes[0] ? xmldoc.getElementsByTagName("firstName")[0].childNodes[0].nodeValue : "");
							}
							var lnam = "";
							if (xmldoc.getElementsByTagName("lastName").length != 0) {
								lnam = (xmldoc.getElementsByTagName("lastName")[0].childNodes[0] ? xmldoc.getElementsByTagName("lastName")[0].childNodes[0].nodeValue : "");
							}
							var usi = "";
							if (xmldoc.getElementsByTagName("USI").length != 0) {
								usi = (xmldoc.getElementsByTagName("USI")[0].childNodes[0] ? xmldoc.getElementsByTagName("USI")[0].childNodes[0].nodeValue : "");
							}
							if (confirm("Please verify with the customer that the following address is where the issue is:\r\n" + lcaddress)) {
								if (_("afterVerified")) {
									_("afterVerified").style.display = "inline";
									if (_("login")) {
										_("login").style.display = "none";
									}
									_("contactname").focus();
									_("idNum").value = pnum;
									_("idName").value = fnam + " " + lnam;
									_("idAddy").value = lcaddress;
									_("dslTType").checked = true;
									_("idUSI").value = usi;
									_("USI").value = usi;
									return;
								}
								else {
									params = new Array();
									params.push(new Array("lanid", getCookie('lanid')));
									params.push(new Array("error", "Missing afterVerified, function verifyNumber, line: 535"));
									errorAjax.addRequest("error.php", params);
									if (brandon()) {
										window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tt&amp;body=" + urlencode("Missing afterverified document element, function verifyNumber, line: 535");
									}
									alert("Unexpected error.\r\n\r\nClick ok to send error report and reload the page.");
									window.location.href = unescape(window.location.pathname);
								}
							}
							else {
								_("wtn").focus();
								_("v").style.display = "inline";
								_("vl").style.display = "none";
								return;
							}
						}
						else {
							createError("This phone number does not have a dsl line card attached to it, you may only submit a POTS ticket.  Message a L2 in your team chat room for further assistance.");
							_("lineCardType").value = lineCardType;
							_('epixstuf').style.display = 'none';
							var lcaddress = (xmldoc.getElementsByTagName("linecard_address") ? xmldoc.getElementsByTagName("linecard_address")[0].childNodes[0].nodeValue : "");
							if (confirm("Please verify with the customer that the following address is where the issue is:\r\n" + lcaddress)) {
								if (_("afterVerified")) {
									_("afterVerified").style.display = "inline";
									_("potsIssues").style.display = "inline";
									_("dslIssues").style.display = "none";
									_("dslTType").disabled = true;
									_("potsTType").checked = true;
									if (_("login")) {
										_("login").style.display = "none";
									}
									_("contactname").focus();
									return;
								}
								else {
									params = new Array();
									params.push(new Array("lanid", getCookie('lanid')));
									params.push(new Array("error", "Missing afterVerified, function verifyNumber, line: 535"));
									errorAjax.addRequest("error.php", params);
									if (brandon()) {
										window.location.href = "xmpp:ethan.lamkin@telenetwork.com?message&amp;subject=tt&amp;body=" + urlencode("Missing afterverified document element, function verifyNumber, line: 535");
									}
									alert("Unexpected error.\r\n\r\nClick ok to send error report and reload the page.");
									window.location.href = unescape(window.location.pathname);
								}
							}
							else {
								_("wtn").focus();
								_("v").style.display = "inline";
								_("vl").style.display = "none";
								return;
							}
						}
					}
					else {
						createError("This phone number does not have ANY line card attached to it, ensure you are using the WTN. You may only submit a POTS ticket. Message a L2 in your team chat room for further assistance.");
						//_("lineCardType").value = lineCardType;
						_('epixstuf').style.display = 'none';
						var lcaddress = (xmldoc.getElementsByTagName("linecard_address") ? xmldoc.getElementsByTagName("linecard_address")[0].childNodes[0].nodeValue : "");
						if (confirm("This number does not have a line card, if you proceed you will only be able to submit a POTS ticket. Would you like to continue?")) {
							if (_("afterVerified")) {
								_("afterVerified").style.display = "inline";
								_("potsIssues").style.display = "inline";
								_("dslIssues").style.display = "none";
								_("dslTType").disabled = true;
								_("potsTType").checked = true;
								if (_("login")) {
									_("login").style.display = "none";
								}
								_("contactname").focus();
								return;
							}
							else {
								params = new Array();
								params.push(new Array("lanid", getCookie('lanid')));
								params.push(new Array("error", "Missing afterVerified, function verifyNumber, line: 535"));
								errorAjax.addRequest("error.php", params);
								if (brandon()) {
									window.location.href = "xmpp:brandon.nelson@telenetwork.com?message&amp;subject=tt&amp;body=" + urlencode("Missing afterverified document element, function verifyNumber, line: 535");
								}
								alert("Unexpected error.\r\n\r\nClick ok to send error report and reload the page.");
								window.location.href = unescape(window.location.pathname);
							}
						}
						else {
							_("wtn").focus();
							_("v").style.display = "inline";
							_("vl").style.display = "none";
							return;
						}
						/*_("wtn").focus();
                        _("wtn").select();
                        _("v").style.display = "inline";
                        _("vl").style.display = "none";
                        createError("This phone number does not have ANY line card attached to it, ensure you are using the WTN, if you cannot find the correct number Message a L2 in your team chat room for further assistance.");*/
						return;
					}
				}
				else {
					/* _("wtn").focus();
                    _("wtn").select();
                    _("v").style.display = "inline";
                    _("vl").style.display = "none";
                    createError("This phone number does not have a dsl line card attached to it, ensure you are using the WTN, if you cannot find the correct number Message a L2 in your team chat room for further assistance.");
                    return;*/
					createError("This phone number does not have ANY line card attached to it, ensure you are using the WTN. You may only submit a POTS ticket. Message a L2 in your team chat room for further assistance.");
					//_("lineCardType").value = lineCardType;
					_('epixstuf').style.display = 'none';
					var lcaddress = (xmldoc.getElementsByTagName("linecard_address") ? xmldoc.getElementsByTagName("linecard_address")[0].childNodes[0].nodeValue : "");
					if (confirm("This number does not have a line card, if you proceed you will only be able to submit a POTS ticket. Would you like to continue?")) {
						if (_("afterVerified")) {
							_("afterVerified").style.display = "inline";
							_("potsIssues").style.display = "inline";
							_("dslIssues").style.display = "none";
							_("dslTType").disabled = true;
							_("potsTType").checked = true;
							if (_("login")) {
								_("login").style.display = "none";
							}
							_("contactname").focus();
							return;
						}
						else {
							params = new Array();
							params.push(new Array("lanid", getCookie('lanid')));
							params.push(new Array("error", "Missing afterVerified, function verifyNumber, line: 535"));
							errorAjax.addRequest("error.php", params);
							if (brandon()) {
								window.location.href = "xmpp:brandon.nelson@telenetwork.com?message&amp;subject=tt&amp;body=" + urlencode("Missing afterverified document element, function verifyNumber, line: 535");
							}
							alert("Unexpected error.\r\n\r\nClick ok to send error report and reload the page.");
							window.location.href = unescape(window.location.pathname);
						}
					}
					else {
						_("wtn").focus();
						_("v").style.display = "inline";
						_("vl").style.display = "none";
						return;
					}
					return;
				}
			}
			else {
				/*_("wtn").focus();
                _("wtn").select();
                _("v").style.display = "inline";
                _("vl").style.display = "none";
                createError("This phone number does not have a dsl line card attached to it, ensure you are using the WTN, if you cannot find the correct number Message a L2 in your team chat room for further assistance.");
                return;*/
				createError("This phone number does not have ANY line card attached to it, ensure you are using the WTN. You may only submit a POTS ticket. Message a L2 in your team chat room for further assistance.");
				//_("lineCardType").value = lineCardType;
				_('epixstuf').style.display = 'none';
				var lcaddress = (xmldoc.getElementsByTagName("linecard_address") ? xmldoc.getElementsByTagName("linecard_address")[0].childNodes[0].nodeValue : "");
				if (confirm("This number does not have a line card, if you proceed you will only be able to submit a POTS ticket. Would you like to continue?")) {
					if (_("afterVerified")) {
						_("afterVerified").style.display = "inline";
						_("potsIssues").style.display = "inline";
						_("dslIssues").style.display = "none";
						_("dslTType").disabled = true;
						_("potsTType").checked = true;
						if (_("login")) {
							_("login").style.display = "none";
						}
						_("contactname").focus();
						return;
					}
					else {
						params = new Array();
						params.push(new Array("lanid", getCookie('lanid')));
						params.push(new Array("error", "Missing afterVerified, function verifyNumber, line: 535"));
						errorAjax.addRequest("error.php", params);
						if (brandon()) {
							window.location.href = "xmpp:brandon.nelson@telenetwork.com?message&amp;subject=tt&amp;body=" + urlencode("Missing afterverified document element, function verifyNumber, line: 535");
						}
						alert("Unexpected error.\r\n\r\nClick ok to send error report and reload the page.");
						window.location.href = unescape(window.location.pathname);
					}
				}
				else {
					_("wtn").focus();
					_("v").style.display = "inline";
					_("vl").style.display = "none";
					return;
				}
				return;
			}
		}
		else {
			params = new Array();
			params.push(new Array("lanid", getCookie('lanid')));
			params.push(new Array("error", "Missing document element, function verifynumber response: " + urlencode(ticketAjax.getAjax().responseText.replace("<", "&lt;").replace(">", "&gt;"))));
			errorAjax.addRequest("error.php", params);
			if (brandon()) {
				window.location.href = "xmpp:brandon.nelson@telenetwork.com?message&amp;subject=tickettool&amp;body=" + urlencode("Missing document element, function verifynumber: " + ticketAjax.getAjax().responseText.replace("<", "&lt;").replace(">", "&gt;"));
			}
			alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
			window.location.href = unescape(window.location.pathname);
			return;
		}
	}
}

function passwordchange() {
	if (ticketInuse) {
		return;
	}
	clearNotice();
	createError("Your password has expired.<br>Need help? Contact a TL.");
	var params = new Array();
	if (_("npass1") && _("npass2")) {
		var npass1 = _("npass1").value.replace(/[^a-zA-Z0-9]/g, '').substr(0, 10);
		var npass2 = _("npass2").value.replace(/[^a-zA-Z0-9]/g, '').substr(0, 10);
	}
	else {
		params = new Array();
		params.push(new Array("lanid", _("lanid").value));
		params.push(new Array("error", urlencode("Missing npass1 / npass2.")));
		errorAjax.addRequest("error.php", params);
		if (brandon()) {
			window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tt&amp;body=" + urlencode("missing npass1 / npass2");
		}
		alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
		window.location.href = unescape(window.location.pathname);
		return;
	}

	switch (true) {
		case (npass1 == ""):
			_("npass1").focus();
			_("npass1").select();
			return;
			break;
		case (npass2 == ""):
			_("npass2").focus();
			_("npass2").select();
			return;
			break;
		case (npass1 != npass2):
			_("npass1").focus();
			_("npass1").select();
			createError("Passwords do not match, please try again.");
			return;
			break;
		case (npass1.substr(0, 1).match(/[0-9]/) != null):
			_("npass1").focus();
			_("npass1").select();
			createError("Password cannot start with a number, please try again.");
			return;
			break;
		case (npass2.substr(0, 1).match(/[0-9]/) != null):
			_("npass2").focus();
			_("npass2").select();
			createError("Password cannot start with a number, please try again.");
			return;
			break;
		case (npass1.length < 6):
			_("npass1").focus();
			_("npass1").select();
			createError("Password cannot be less than 6 characters, please try again.");
			return;
			break;
		case (npass2.length < 6):
			_("npass2").focus();
			_("npass2").select();
			createError("Password cannot be less than 6 characters, please try again.");
			return;
			break;
		case (npass1.match(/[0-9]/g) == null):
			_("npass1").focus();
			_("npass1").select();
			createError("Password must contain atleast 1 number, please try again.");
			return;
			break;
		case (npass2.match(/[0-9]/g) == null):
			_("npass2").focus();
			_("npass2").select();
			createError("Password must contain atleast 1 number, please try again.");
			return;
			break;
		case (npass1.match(/[a-zA-Z]/g) == null):
			_("npass1").focus();
			_("npass1").select();
			createError("Password must contain atleast 1 letter, please try again.");
			return;
			break;
		case (npass2.match(/[a-zA-Z]/g) == null):
			_("npass2").focus();
			_("npass2").select();
			createError("Password must contain atleast 1 letter, please try again.");
			return;
			break;
		case (npass1 == _("lanpwd").value || npass2 == _("lanpwd").value):
			_("npass1").focus();
			_("npass1").select();
			createError("New password cannot be the same as current password.");
			return;
			break;
	}

	ticketInuse = true;
	if (_("pb")) {
		_("pb").style.display = "none";
	}
	if (_("pl")) {
		_("pl").style.display = "inline";
	}

	params = new Array();
	params.push(new Array("lanid", _("lanid").value.substr(0, 10).toUpperCase()));
	params.push(new Array("lanpwd", _("lanpwd").value));
	params.push(new Array("newpwd", npass1));
	ticketAjax.addRequest("changePassword.php", params, changePassword);

}

function changePassword() {
	var params;
	if (ticketAjax.readyState() == 4) {
		ticketInuse = false;
		if (ticketAjax.documentElement()) {
			var xmldoc = ticketAjax.documentElement();
			params = new Array();
			params.push(new Array("lanid", _("lanid").value));
			params.push(new Array("error", "Test, function changepassword readystate: " + ticketAjax.readyState() + " response: (" + ticketAjax.getAjax().responseText.length + ") " + ticketAjax.getAjax().responseText));
			errorAjax.addRequest("error.php", params);
			// errors come before everything
			var errorCheck = xmldoc.getElementsByTagName("error");
			if (errorCheck) {
				if (errorCheck.length > 0) {
					if (errorCheck[0].childNodes.length > 0) {
						var error = errorCheck[0].childNodes[0].nodeValue
						_("pb").style.display = "inline";
						_("pl").style.display = "none";
						createError("Jwalk Error: " + error + "<br /><br />Don't understand this error? Check with an L2 in your team chat.");
						return;
					}
				}
			}
			//re check for the result
			var result = xmldoc.getElementsByTagName("result");
			if (result) {
				if (result.length > 0) {
					if (result[0].childNodes.length > 0) {
						result = Number(result[0].childNodes[0].nodeValue);
						switch (result) {
							case 1:
								_("lanpwd").value = _("npass1").substr(0, 10);
								_("npass1").value = "";
								_("npass2").value = "";
								_("pb").style.display = "inline";
								_("pl").style.display = "none";
								_("v").style.display = "inline";
								_("vl").style.display = "none";
								_("wtn").focus();
								clearNotice();
								_("passwordchange").style.display = "none";
								return;
								break;
							case -1:
								_("lanpwd").value = _("npass1").value.substr(0, 10);
								_("npass1").value = "";
								_("npass2").value = "";
								_("pb").style.display = "inline";
								_("pl").style.display = "none";
								_("v").style.display = "inline";
								_("vl").style.display = "none";
								_("wtn").focus();
								clearNotice();
								createError("Your password does not need to be changed.");
								_("passwordchange").style.display = "none";
								return;
								break;
						}
					}
				}
			}
		}
		else {
			params = new Array();
			params.push(new Array("lanid", _("lanid").value));
			params.push(new Array("error", "Missing document element, function changepassword readystate: " + ticketAjax.readyState() + " response: (" + ticketAjax.getAjax().responseText.length + ") " + urlencode(ticketAjax.getAjax().responseText)));
			errorAjax.addRequest("error.php", params);
			if (brandon()) {
				window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tickettool&amp;body=" + urlencode("Missing document element, function changepassword : " + ticketAjax.getAjax().responseText);
			}
			alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
			window.location.href = unescape(window.location.pathname);
			return;
		}
	}
}

function domodem(selobj) {
	if (selobj.selectedIndex == selobj.options.length - 1) {
		_("other").style.display = "inline";
	}
	else {
		_("other").style.display = "none";
	}
}

function clearTicketInfo() {
	try {
		_("idNum").value = "";
		_("idAddy").value = "";
		_("idName").value = "";
		_("contactname").value = "";
		_("contactnumber").value = "";
		_('contacttype').selectedIndex = 0;
		_("modem").selectedIndex = 0;
		_("other").style.display = "none";
		_("othermodem").value = "";
		_("issue").selectedIndex = 0;
		_("email").value = "";
		_("domain").selectedIndex = 0;
		_("iwc").style.display = "none";
		_("pwd").value = "";
		_("insidewire").checked = false;
		_("subissue").selectedIndex = 0;
		_("subOptions").style.display = "none";
		_('speedoptions1').style.display = 'none';
		_('provSpeed').value = '';
		_('speedoptions2').style.display = 'none';
		_('resultSpeed').value = '';
		_('ftvDataIssue').selectedIndex = 0;
		_('ftvVideoIssue').selectedIndex = 0;
		_('ftvVoiceIssue').selectedIndex = 0;
		_('ftvCpe').selectedIndex = 0;
		_('ftvStb').selectedIndex = 0;
		_('voipIssue').selectedIndex = 0;
		_('dataIssue').selectedIndex = 0;
		_('videoIssue').selectedIndex = 0;
		_('fiosRouter').selectedIndex = 0;
		$('#newcommittype').empty();
		$('#newcommitallday').empty();
		$('#newcommitallday').hide();
		$('#newcommitam').empty();
		$('#newcommitam').hide();
		$('#newcommitpm').empty();
		$('#newcommitpm').hide();
		$('#newcommit4h').empty();
		$('#newcommit4h').hide();
		$('#newcommit2h').empty();
		$('#newcommit2h').hide();
		//_('fiosOnt').selectedIndex = 0;
	}
	catch (e) {
		var params = new Array();
		params.push(new Array("lanid", "System"));
		params.push(new Array("error", "test clearTicketInfo: error: " + urlencode(e.description) + " - " + urlencode(e.message)));
		errorAjax.addRequest('error.php', params);
	}
}

function doReset() {
	clearTicketInfo();
	try {
		_("afterVerified").style.display = 'none';
		_("s").style.display = 'inline';
		_("l").style.display = 'none';
		_("login").style.display = 'block';
		_("wtn").value = '';
		_("vl").style.display = 'none';
		_("v").style.display = 'inline';
		_("reset").style.display = 'none';
		_("info").style.display = 'none';
		_("passwordchange").style.display = 'none';
		_("npass1").value = '';
		_("npass2").value = '';
		_("pb").style.display = 'inline';
		_("pl").style.display = 'none';
		//_("cblue").checked = '';
		_("ticketNumber").innerHTML = '';
		_("snr").value = '';
		_("attenuation").value = '';
		$('#commitload').hide();
		$('#commitsave').hide();
		$('#commit').hide();
		try {
			_("wtn").focus();
		}
		catch (e) {
			// oops it focused before the browser processed the display
		}
	} catch (e) {
		var params = new Array();
		params.push(new Array("lanid", "System"));
		params.push(new Array("error", "test doReset: error: " + urlencode(e.description) + " - " + urlencode(e.message)));
		errorAjax.addRequest('error.php', params);
	}
}


function annoyingslowspeedpopupfunction() {
	var out = new Array();
	out.push("It looks like you're putting in a slow speed ticket.");
	out.push('');
	out.push('Make sure you did the following before proceeding with this ticket:');
	out.push('1: Power cycle the modem');
	out.push('2: Verify customer is connected');
	out.push('3: Run Loopcare to get provisioned speed (if no DSL query, check the train speed in the modem)');
	out.push('4: Check for routers and bypass');
	out.push('5: Run speedtest');
	out.push('6: If the customer is getting less than 70% of provisioned/trained speed, ticket');

	var s = out.join('\r\n');

	alert(s);
	_('speedoptions1').style.display = 'block';
	_('speedoptions2').style.display = 'block';


}

function submitPhoneTicket() {
	if (!(_("potsTType").checked)) {
		submitTicket();
	}
	else {
		if (ticketInuse) {
			return;
		}
		clearNotice();
		var params = new Array();
		if (_("contactname") && _("contactnumber") && _("contacttype") && _("potsIssue") && _("OOS")) {
			var contactname = _("contactname").value.substr(0, 16);
			var contactnumber = _("contactnumber").value.replace(/[^0-9]/g, '').substr(0, 10);
			var OOS = _("OOS").checked;
			var contacttype = _("contacttype").selectedIndex;
			var issue = _("potsIssue").value;
		}
		else {
			params = new Array();
			params.push(new Array('lanid', _("lanid").value));
			params.push(new Array('error', 'Missing element in submitTicket, line 809'));
			errorAjax.addRequest('error.php', params);
			if (brandon()) {
				window.location.href = "xmpp:ethan.lamkin@telenetwork.com?message&amp;subject=tt&amp;body=Missing%20element%20in%20submitPhoneTicket";
			}
			alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
			window.location.href = unescape(window.location.pathname);
			return;
		}
		if (contactnumber.substr(0, 1) == '0') {
			alert("This is not a valid contact number, enter a valid contact number.");
			_("contactnumber").focus();
			_("contactnumber").select();
			return;
		}

		if (contactnumber.match(/0/g)) {
			if (contactnumber.match(/0/g).length >= 6) {
				alert("This is not a valid contact number, enter a valid contact number.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
		}

		/*if (contactnumber == _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)) {
            alert("The WTN can not be the same as the CTN for this customer.  Please ensure that the WTN and CTN do not match.");
            return;
        }*/

		if (contactnumber == _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)) {
			/*         alert("The contact number you entered is invalid, have you asked for another contact number?\r\n\r\n" +
             "If we do not provide a valid contact number then a repair tech will not be able to reach the customer to work the ticket.\r\n\r\n" +
             "Click OK to enter a DIFFERENT contact number, or, if the customer has NO OTHER contact numbers, re-enter the contact number. " +
             "Failure to enter a valid contact number can result in administrative action. ");
             var nnum = prompt(
             "Invalid Contact Number! Re-enter a different contact number below, or if NO OTHER numbers, re-enter same number.", "");
             */
			var nnum = prompt(
				"The contact number you entered is invalid, have you asked for another contact number?\r\n\r\n" +
				"If we do not provide a valid contact number then a repair tech will not be able to reach the customer to work the ticket.\r\n\r\n" +
				"Re-enter a different contact number below, or if NO OTHER numbers, re-enter same number.\r\n\r\n" +
				"Failure to enter a valid contact number can result in administrative action. ", "");
			if (nnum == null) {
				alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
			nnum = nnum.replace(/[^0-9]/g, '').substr(0, 10);
			if (nnum.replace(/[^0-9]/g, '').substr(0, 10).length != 10 || nnum.substr(0, 1) == '0') {
				alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
			if (nnum.match(/0/g)) {
				if (nnum.match(/0/g).length >= 6) {
					alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
					_("contactnumber").focus();
					_("contactnumber").select();
					return;
				}
			}
			contactnumber = nnum;
			_("contactnumber").value = nnum
			//alert("Contact number is the same as the DSL number. Please obtain an alternate contact number for this customer.");
			//return;
		}


		switch (true) {
			case (contactname.length == 0):
				_("contactname").focus();
				return;
				break;
			case (contactnumber.length != 10):
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
				break;
			case (contacttype == 0):
				_("contacttype").focus();
				return;
				break;
			case (issue == ''):
				_("issue").focus();
				return;
				break;
		}

		if (_("s")) {
			_("s").style.display = "none";
		}
		if (_("l")) {
			_("l").style.display = "inline";
		}

		var confirmString = 'Please verify with the customer that the following information is correct:\r\n\r\n';
		params = new Array();

		params.push(new Array('lanid', urlencode(_("lanid").value.toUpperCase().substr(0, 10))));
		params.push(new Array('lanpw', urlencode(_("lanpwd").value)));
		params.push(new Array('wtn', _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)));
		params.push(new Array('contactName', urlencode(contactname.substr(0, 31))));
		confirmString += 'Contact Name: ' + contactname.substr(0, 16) + '\r\n';
		params.push(new Array('contactNumber', contactnumber.replace(/[^0-9]/g, '').substr(0, 10)));
		confirmString += 'Contact Number: ' + contactnumber.replace(/[^0-9]/g, '').substr(0, 10) + ' ';
		params.push(new Array('contactType', contacttype));
		confirmString += _("contacttype").options[contacttype].text + '\r\n';
		params.push(new Array('OOS', OOS));
		confirmString += 'OOS: ' + (OOS ? 'yes' : 'no') + '\r\n';
		params.push(new Array('issue', issue));
		confirmString += 'Issue: ' + _("potsIssue").options[_("potsIssue").selectedIndex].text + '\r\n';
		params.push(new Array('memo', _("memoNotes").value));
		confirmString += 'Memo: ' + _("memoNotes").value + '\r\n';


		params.push(new Array('TType', 'pots'));

		if ($('#newcommittype').val().length == 0) {
			createError("You must select an appointment type");
			return;
		}

		var type = $('#newcommittype').val();
		var committ = null;
		switch (type) {
			case 'D':
				committ = $('#newcommitallday');
				break;
			case 'A':
				committ = $('#newcommitam');
				break;
			case 'P':
				committ = $('#newcommitpm');
				break;
			case '4':
				committ = $('#newcommit4h');
				break;
			case '2':
				committ = $('#newcommit2h');
				break;
				;
		}

        params.push(['appttype', type]);
        if (type != '0') {
            var split = committ.val().split('|');
            cdate = split[0];
            cstart = split[1];
            cend = split[2];
            var date = split[0];
            var start = split[1].replace(/[^0-9]/g, '');
            var end = split[2].replace(/[^0-9]/g, '');

            var dsplit = date.split('/');
            date = ''.concat(padLeft(dsplit[0].replace(/[^0-9]/g, ''), 2), padLeft(dsplit[1].replace(/[^0-9]/g, ''), 2), padLeft(dsplit[2].replace(/[^0-9]/g, ''), 2));

            params.push(['apptdate', date]);
            params.push(['apptstart', start]);
            params.push(['apptend', end]);
        }

		if (confirm(confirmString)) {
			ticketInuse = true;
			ticketAjax.addRequest('submitPhoneTicket.php', params, ticketSubmit);
		}
		else {
			_("s").style.display = "inline";
			_("l").style.display = "none";
			return;
		}
	}
	return;

}


function submitFTicket() {
	var customerType = _("customerType").value;

	//alert("submit FTicket hit");
	if (!(_("customerType").value == "ftv" || _("customerType").value == "fiber")) {
		submitTicket();
	}
	else {
		if (ticketInuse) {
			return;
		}
		clearNotice();
		var params = new Array();

		var currentIssue = "";
		var issueType = _("issueType").value;
		var currentIssueText = "";

		if (_("issueType").selectedIndex == 0) {
			alert("Please select an issue type");
			_("issueType").focus();
			return;
		}

		if (_("customerType").value == "ftv") {
			if (issueType == "voice") {
				currentIssue = _("ftvVoiceIssue").value;
				currentIssueText = _("ftvVoiceIssue").options[_("ftvVoiceIssue").selectedIndex].text;
			}
			else if (issueType == "data") {
				currentIssue = _("ftvDataIssue").value;
				currentIssueText = _("ftvDataIssue").options[_("ftvDataIssue").selectedIndex].text;
			}
			else if (issueType == "video") {
				currentIssue = _("ftvVideoIssue").value;
				currentIssueText = _("ftvVideoIssue").options[_("ftvVideoIssue").selectedIndex].text;
			}
		}
		else if (_("customerType").value == "fiber") {
			if (issueType == "voice") {
				currentIssue = _("voipIssue").value;
				if (currentIssue == 0) {
					alert("Please fill in issue.");
					_("voipIssue").focus();
					return;
				}
				currentIssueText = _("voipIssue").options[_("voipIssue").selectedIndex].text;
			}
			else if (issueType == "data") {
				currentIssue = _("dataIssue").value;
				if (currentIssue == 0) {
					alert("Please fill in issue.");
					_("dataIssue").focus();
					return;
				}
				currentIssueText = _("dataIssue").options[_("dataIssue").selectedIndex].text;
			}
			else if (issueType == "video") {
				currentIssue = _("videoIssue").value;
				if (currentIssue == 0) {
					alert("Please fill in issue.");
					_("videoIssue").focus();
					return;
				}
				currentIssueText = _("videoIssue").options[_("videoIssue").selectedIndex].text;
			}
		}

		if (_("contactname") && _("contactnumber") && _("contacttype") && currentIssue != "") {
			var contactname = _("contactname").value.substr(0, 16);
			var contactnumber = _("contactnumber").value.replace(/[^0-9]/g, '').substr(0, 10);
			var contacttype = _("contacttype").selectedIndex;
		}
		else {
			params = new Array();
			params.push(new Array('lanid', _("lanid").value));
			params.push(new Array('error', 'Missing element in submitTicket, line 809'));
			errorAjax.addRequest('error.php', params);
			if (brandon()) {
				window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tt&amp;body=Missing%20element%20in%20submitTicket";
			}
			alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
			window.location.href = unescape(window.location.pathname);
			return;
		}

		/*if (contactnumber == _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)) {
            alert("The WTN can not be the same as the CTN for this customer.  Please ensure that the WTN and CTN do not match.");
            return;
        }*/

		if (issueType == "data") {
			if ((_("customerType").value == "fios" && _("dataIssue").options[_("dataIssue").selectedIndex].attributes['speed']) || (_("customerType").value == "ftv" && _("ftvDataIssue").options[_("ftvDataIssue").selectedIndex].attributes['speed'])) {
				if (_('provSpeed').value.length == 0) {
					_('provSpeed').focus();
					return;
				}
				if (_('resultSpeed').value.length == 0) {
					_('resultSpeed').focus();
					return;
				}
				var perc70 = Math.round((70 * Number(_('provSpeed').value)) / 100);
				if (Number(_('resultSpeed').value) >= perc70) {
					alert("Customer is getting more than 70% provisioned/trained speed.");
					return;
				}
			}
		}

		if (_("customerType").value == "ftv" && _("ftvNotes").value.replace(/\s/g, '').length == 0) {
			alert("Please briefly describe the issue the customer is experiencing in the notes field.");
			_("ftvNotes").focus();
			return;
		}
		if (_("customerType").value == "fiber" && _("fiosNotes").value.replace(/\s/g, '').length == 0) {
			alert("Please briefly describe the issue the customer is experiencing in the notes field.");
			_("fiosNotes").focus();
			return;
		}

		if (contactnumber.substr(0, 1) == '0') {
			alert("This is not a valid contact number, enter a valid contact number.");
			_("contactnumber").focus();
			_("contactnumber").select();
			return;
		}

		if (contactnumber.match(/0/g)) {
			if (contactnumber.match(/0/g).length >= 6) {
				alert("This is not a valid contact number, enter a valid contact number.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
		}

		if (_("wireless").selectedIndex == 0) {
			alert("Please select how the customer is connected.");
			_("wireless").focus();
			return;
		}

		if (contactnumber == _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)) {
			/*         alert("The contact number you entered is invalid, have you asked for another contact number?\r\n\r\n" +
             "If we do not provide a valid contact number then a repair tech will not be able to reach the customer to work the ticket.\r\n\r\n" +
             "Click OK to enter a DIFFERENT contact number, or, if the customer has NO OTHER contact numbers, re-enter the contact number. " +
             "Failure to enter a valid contact number can result in administrative action. ");
             var nnum = prompt(
             "Invalid Contact Number! Re-enter a different contact number below, or if NO OTHER numbers, re-enter same number.", "");
             */
			var nnum = prompt(
				"The contact number you entered is invalid, have you asked for another contact number?\r\n\r\n" +
				"If we do not provide a valid contact number then a repair tech will not be able to reach the customer to work the ticket.\r\n\r\n" +
				"Re-enter a different contact number below, or if NO OTHER numbers, re-enter same number.\r\n\r\n" +
				"Failure to enter a valid contact number can result in administrative action. ", "");
			if (nnum == null) {
				alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
			nnum = nnum.replace(/[^0-9]/g, '').substr(0, 10);
			if (nnum.replace(/[^0-9]/g, '').substr(0, 10).length != 10 || nnum.substr(0, 1) == '0') {
				alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
			if (nnum.match(/0/g)) {
				if (nnum.match(/0/g).length >= 6) {
					alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
					_("contactnumber").focus();
					_("contactnumber").select();
					return;
				}
			}
			contactnumber = nnum;
			_("contactnumber").value = nnum;
			//alert("Contact number is the same as the DSL number. Please obtain an alternate contact number for this customer.");
			//return;
		}


		switch (true) {
			case (contactname.length == 0):
				_("contactname").focus();
				return;
				break;
			case (contactnumber.length != 10):
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
				break;
			case (contacttype == 0):
				_("contacttype").focus();
				return;
				break;
		}

		if (env == 3) {
			if (_('epixhour1').value.replace(/[^0-9]/g, '').length == 0) {
				_('epixhour1').focus();
				return;
			}
			if (_('epixhour2').value.replace(/[^0-9]/g, '').length == 0) {
				_('epixhour2').focus();
				return;
			}
		}

		if (_("s")) {
			_("s").style.display = "none";
		}
		if (_("l")) {
			_("l").style.display = "inline";
		}

		var confirmString = 'Please verify with the customer that the following information is correct:\r\n\r\n';
		params = new Array();

		params.push(new Array('lanid', urlencode(_("lanid").value.toUpperCase().substr(0, 10))));
		params.push(new Array('lanpw', urlencode(_("lanpwd").value)));
		params.push(new Array('wtn', _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)));
		params.push(new Array('USI', _('USI').value));
		params.push(new Array('wireless', _('wireless').value));
		params.push(new Array('fiosNotes', _('fiosNotes').value));
		params.push(new Array('ftvNotes', _('ftvNotes').value));
		params.push(new Array('ftvVap', _('ftvVap').value));
		params.push(new Array('contactName', urlencode(contactname.substr(0, 31))));
		confirmString += 'Contact Name: ' + contactname.substr(0, 16) + '\r\n';
		params.push(new Array('contactNumber', contactnumber.replace(/[^0-9]/g, '').substr(0, 10)));
		confirmString += 'Contact Number: ' + contactnumber.replace(/[^0-9]/g, '').substr(0, 10) + ' ';
		params.push(new Array('contactType', contacttype));
		confirmString += _("contacttype").options[contacttype].text + '\r\n';

		params.push(new Array('customerType', customerType));
		confirmString += 'Customer Type: ' + customerType + '\r\n';
		params.push(new Array('issueType', issueType));
		confirmString += 'Issue Type: ' + _("issueType").options[_("issueType").selectedIndex].text;

		if (customerType == "fiber") {
			params.push(new Array('fiosRouter', _("fiosRouter").options[_("fiosRouter").selectedIndex].text));
			confirmString += 'FIOS Router: ' + _("fiosRouter").options[_("fiosRouter").selectedIndex].text;

			// params.push(new Array('fiosOnt', _("fiosOnt").options[_("fiosOnt").selectedIndex].text));
			//confirmString += 'FIOS ONT: ' + _("fiosOnt").options[_("fiosOnt").selectedIndex].text;

			//if(issueType)
		}
		else if (customerType == "ftv") {
			params.push(new Array('ftvStb', _("ftvStb").options[_("ftvStb").selectedIndex].text));
			confirmString += 'Set top box: ' + _("ftvStb").options[_("ftvStb").selectedIndex].text;

			params.push(new Array('ftvCpe', _("ftvCpe").options[_("ftvCpe").selectedIndex].text));
			confirmString += 'CPE: ' + _("ftvCpe").options[_("ftvCpe").selectedIndex].text;
		}

		params.push(new Array('issue', currentIssue));
		confirmString += 'Issue: ' + currentIssueText + '\r\n';

		params.push(new Array('env', env));
		if (env == 3) {
			params.push(new Array('epixhour1', _('epixhour1').value.replace(/[^0-9]/g, '')));
			params.push(new Array('epixhour2', _('epixhour2').value.replace(/[^0-9]/g, '')));
		}

		if (_("insidewire")) {
			if (_("insidewire").checked) {
				params.push(new Array('iwc', '1'));
				confirmString += 'Sold Inside Wire: Yes\r\n';
			}
		}
		/*
        if (_('cbdsl').checked) {
            params.push(new Array('cbdsl', '1'));
            params.push(new Array('wbdsl', _('wbdsl').value));
            params.push(new Array('lbdsl', _('lbdsl').value));
            confirmString += 'BDSL: Yes\r\nBDSL WAN: ' + _('wbdsl').value + '\r\nBDSL LAN: ' + _('lbdsl').value;
        }*/

		params.push(new Array('phoneissue', _("phoneissue").selectedIndex));
		/*if (_("cblue").checked) {
            params.push(new Array('cblue', '1'));
            confirmString += "Code Blue: True\r\n";
        }*/
		if ((_("customerType").value == "fios" && _("dataIssue").options[_("dataIssue").selectedIndex].attributes['speed']) || (_("customerType").value == "ftv" && _("ftvDataIssue").options[_("ftvDataIssue").selectedIndex].attributes['speed'])) {
			confirmString += "Provisioned Speed: " + _('provSpeed').value + "\r\n";
			confirmString += "Test Results: " + _('resultSpeed').value + "\r\n";
			params.push(new Array("provSpeed", _('provSpeed').value));
			params.push(new Array("resultSpeed", _('resultSpeed').value));
		}

		if ($('#newcommittype').val().length == 0) {
			createError("You must select an appointment type");
			return;
		}

		var type = $('#newcommittype').val();
		var committ = null;
		switch (type) {
			case 'D':
				committ = $('#newcommitallday');
				break;
			case 'A':
				committ = $('#newcommitam');
				break;
			case 'P':
				committ = $('#newcommitpm');
				break;
			case '4':
				committ = $('#newcommit4h');
				break;
			case '2':
				committ = $('#newcommit2h');
				break;
				;
		}
		params.push(['appttype', type]);
		if (type != '0') {
			var split = committ.val().split('|');
			cdate = split[0];
			cstart = split[1];
			cend = split[2];
			var date = split[0];
			var start = split[1].replace(/[^0-9]/g, '');
			var end = split[2].replace(/[^0-9]/g, '');

			var dsplit = date.split('/');
			date = ''.concat(padLeft(dsplit[0].replace(/[^0-9]/g, ''), 2), padLeft(dsplit[1].replace(/[^0-9]/g, ''), 2), padLeft(dsplit[2].replace(/[^0-9]/g, ''), 2));

			params.push(['apptdate', date]);
			params.push(['apptstart', start]);
			params.push(['apptend', end]);
		}

		if (confirm(confirmString)) {
			ticketInuse = true;
			ticketAjax.addRequest('submitFiosTicket2.php', params, ticketFSubmit);
		}
		else {
			_("s").style.display = "inline";
			_("l").style.display = "none";
			return;
		}
		return;
	}
}

// submit Fixed Wireless Ticket
function submitFWTicket() {
	var customerType = _("customerType").value;

	//alert("submit FTicket hit");
	if (!(_("customerType").value == "fw")) {
		submitTicket();
	}
	else {
		if (ticketInuse) {
			return;
		}
		clearNotice();
		var params = new Array();

		var currentIssue = "";
		var currentIssueText = "";

		currentIssue = _("fwDataIssue").value;
		currentIssueText = _("fwDataIssue").options[_("fwDataIssue").selectedIndex].text;


		if (_("contactname") && _("contactnumber") && _("contacttype") && currentIssue != "") {
			var contactname = _("contactname").value.substr(0, 16);
			var contactnumber = _("contactnumber").value.replace(/[^0-9]/g, '').substr(0, 10);
			var contacttype = _("contacttype").selectedIndex;
		}
		else {
			params = new Array();
			params.push(new Array('lanid', _("lanid").value));
			params.push(new Array('error', 'Missing element in submitTicket, line 809'));
			errorAjax.addRequest('error.php', params);
			if (brandon()) {
				window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tt&amp;body=Missing%20element%20in%20submitTicket";
			}
			alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
			window.location.href = unescape(window.location.pathname);
			return;
		}

		/*if (contactnumber == _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)) {
         alert("The WTN can not be the same as the CTN for this customer.  Please ensure that the WTN and CTN do not match.");
         return;
         }*/

		if ((_("customerType").value == "fw" && _("fwDataIssue").options[_("fwDataIssue").selectedIndex].attributes['speed'])) {
			if (_('provSpeed').value.length == 0) {
				_('provSpeed').focus();
				return;
			}
			if (_('resultSpeed').value.length == 0) {
				_('resultSpeed').focus();
				return;
			}
			var perc70 = Math.round((70 * Number(_('provSpeed').value)) / 100);
			if (Number(_('resultSpeed').value) >= perc70) {
				alert("Customer is getting more than 70% provisioned/trained speed.");
				return;
			}
		}

		if (_("customerType").value == "fw" && _("fwNotes").value.replace(/\s/g, '').length == 0) {
			alert("Please briefly describe the issue the customer is experiencing in the notes field.");
			_("fwNotes").focus();
			return;
		}

		if (contactnumber.substr(0, 1) == '0') {
			alert("This is not a valid contact number, enter a valid contact number.");
			_("contactnumber").focus();
			_("contactnumber").select();
			return;
		}

		if (contactnumber.match(/0/g)) {
			if (contactnumber.match(/0/g).length >= 6) {
				alert("This is not a valid contact number, enter a valid contact number.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
		}

		if (_("wireless").selectedIndex == 0) {
			alert("Please select how the customer is connected.");
			_("wireless").focus();
			return;
		}

		if (contactnumber == _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)) {
			/*         alert("The contact number you entered is invalid, have you asked for another contact number?\r\n\r\n" +
             "If we do not provide a valid contact number then a repair tech will not be able to reach the customer to work the ticket.\r\n\r\n" +
             "Click OK to enter a DIFFERENT contact number, or, if the customer has NO OTHER contact numbers, re-enter the contact number. " +
             "Failure to enter a valid contact number can result in administrative action. ");
             var nnum = prompt(
             "Invalid Contact Number! Re-enter a different contact number below, or if NO OTHER numbers, re-enter same number.", "");
             */
			var nnum = prompt(
				"The contact number you entered is invalid, have you asked for another contact number?\r\n\r\n" +
				"If we do not provide a valid contact number then a repair tech will not be able to reach the customer to work the ticket.\r\n\r\n" +
				"Re-enter a different contact number below, or if NO OTHER numbers, re-enter same number.\r\n\r\n" +
				"Failure to enter a valid contact number can result in administrative action. ", "");
			if (nnum == null) {
				alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
			nnum = nnum.replace(/[^0-9]/g, '').substr(0, 10);
			if (nnum.replace(/[^0-9]/g, '').substr(0, 10).length != 10 || nnum.substr(0, 1) == '0') {
				alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
			if (nnum.match(/0/g)) {
				if (nnum.match(/0/g).length >= 6) {
					alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
					_("contactnumber").focus();
					_("contactnumber").select();
					return;
				}
			}
			contactnumber = nnum;
			_("contactnumber").value = nnum;
			//alert("Contact number is the same as the DSL number. Please obtain an alternate contact number for this customer.");
			//return;
		}


		switch (true) {
			case (contactname.length == 0):
				_("contactname").focus();
				return;
				break;
			case (contactnumber.length != 10):
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
				break;
			case (contacttype == 0):
				_("contacttype").focus();
				return;
				break;
		}

		if (env == 3) {
			if (_('epixhour1').value.replace(/[^0-9]/g, '').length == 0) {
				_('epixhour1').focus();
				return;
			}
			if (_('epixhour2').value.replace(/[^0-9]/g, '').length == 0) {
				_('epixhour2').focus();
				return;
			}
		}

		if (_("s")) {
			_("s").style.display = "none";
		}
		if (_("l")) {
			_("l").style.display = "inline";
		}

		var confirmString = 'Please verify with the customer that the following information is correct:\r\n\r\n';
		params = new Array();

		params.push(new Array('lanid', urlencode(_("lanid").value.toUpperCase().substr(0, 10))));
		params.push(new Array('lanpw', urlencode(_("lanpwd").value)));
		params.push(new Array('wtn', _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)));
		params.push(new Array('USI', _('USI').value));
		params.push(new Array('wireless', _('wireless').value));
		params.push(new Array('fwNotes', _('fwNotes').value));
		params.push(new Array('contactName', urlencode(contactname.substr(0, 31))));
		confirmString += 'Contact Name: ' + contactname.substr(0, 16) + '\r\n';
		params.push(new Array('contactNumber', contactnumber.replace(/[^0-9]/g, '').substr(0, 10)));
		confirmString += 'Contact Number: ' + contactnumber.replace(/[^0-9]/g, '').substr(0, 10) + ' ';
		params.push(new Array('contactType', contacttype));
		confirmString += _("contacttype").options[contacttype].text + '\r\n';

		params.push(new Array('customerType', customerType));
		confirmString += 'Customer Type: ' + customerType + '\r\n';

		params.push(new Array('fwRouter', _("fwRouter").options[_("fwRouter").selectedIndex].text));
		confirmString += 'FW Router: ' + _("fwRouter").options[_("fwRouter").selectedIndex].text;

		params.push(new Array('issue', currentIssue));
		confirmString += 'Issue: ' + currentIssueText + '\r\n';

		params.push(new Array('env', env));
		if (env == 3) {
			params.push(new Array('epixhour1', _('epixhour1').value.replace(/[^0-9]/g, '')));
			params.push(new Array('epixhour2', _('epixhour2').value.replace(/[^0-9]/g, '')));
		}

		if (_("insidewire")) {
			if (_("insidewire").checked) {
				params.push(new Array('iwc', '1'));
				confirmString += 'Sold Inside Wire: Yes\r\n';
			}
		}
		/*
         if (_('cbdsl').checked) {
         params.push(new Array('cbdsl', '1'));
         params.push(new Array('wbdsl', _('wbdsl').value));
         params.push(new Array('lbdsl', _('lbdsl').value));
         confirmString += 'BDSL: Yes\r\nBDSL WAN: ' + _('wbdsl').value + '\r\nBDSL LAN: ' + _('lbdsl').value;
         }*/

		params.push(new Array('phoneissue', _("phoneissue").selectedIndex));
		/*if (_("cblue").checked) {
         params.push(new Array('cblue', '1'));
         confirmString += "Code Blue: True\r\n";
         }*/
		if ((_("customerType").value == "fw" && _("dataIssue").options[_("fwDataIssue").selectedIndex].attributes['speed'])) {
			confirmString += "Provisioned Speed: " + _('provSpeed').value + "\r\n";
			confirmString += "Test Results: " + _('resultSpeed').value + "\r\n";
			params.push(new Array("provSpeed", _('provSpeed').value));
			params.push(new Array("resultSpeed", _('resultSpeed').value));
		}

		if ($('#newcommittype').val().length == 0) {
			createError("You must select an appointment type");
			return;
		}

		var type = $('#newcommittype').val();
		var committ = null;
		switch (type) {
			case 'D':
				committ = $('#newcommitallday');
				break;
			case 'A':
				committ = $('#newcommitam');
				break;
			case 'P':
				committ = $('#newcommitpm');
				break;
			case '4':
				committ = $('#newcommit4h');
				break;
			case '2':
				committ = $('#newcommit2h');
				break;
				;
		}

		var split = committ.val().split('|');
		cdate = split[0];
		cstart = split[1];
		cend = split[2];
		var date = split[0];
		var start = split[1].replace(/[^0-9]/g, '');
		var end = split[2].replace(/[^0-9]/g, '');

		var dsplit = date.split('/');
		date = ''.concat(padLeft(dsplit[0].replace(/[^0-9]/g, ''), 2), padLeft(dsplit[1].replace(/[^0-9]/g, ''), 2), padLeft(dsplit[2].replace(/[^0-9]/g, ''), 2));
		params.push(['appttype', type]);
		params.push(['apptdate', date]);
		params.push(['apptstart', start]);
		params.push(['apptend', end]);


		if (confirm(confirmString)) {
			ticketInuse = true;
			ticketAjax.addRequest('submitFWTicket.php', params, ticketFWSubmit);
		}
		else {
			_("s").style.display = "inline";
			_("l").style.display = "none";
			return;
		}
		return;
	}
}


function ticketFWSubmit() {
	if (ticketAjax.readyState() == 4) {
		ticketInuse = false;
		var params = new Array();
		if (_("contactname") && _("contactnumber") && _("contacttype")) {
			var contactname = _("contactname").value.substr(0, 16);
			var contactnumber = _("contactnumber").value.replace(/[^0-9]/g, '').substr(0, 10);
			var contacttype = _("contacttype").selectedIndex;

			/*var pwd = _("pwd").value.replace("'", '').substr(0, 16);
             var modem = _("modem").selectedIndex;
             var issue = _("issue").selectedIndex;*/

		}
		if (ticketAjax.documentElement()) {
            var xmldoc = ticketAjax.documentElement();
            // do a error check
            var errorCheck = xmldoc.getElementsByTagName("error");
            if (errorCheck) {
                if (errorCheck.length > 0) {
                    if (errorCheck[0].childNodes.length > 0) {
                        errorCheck = errorCheck[0].childNodes[0].nodeValue;
                        _("s").style.display = "inline";
                        _("l").style.display = "none";
                        createError(errorCheck);
                        // check for password change required
                        var passCheck = xmldoc.getElementsByTagName("password");
                        if (passCheck) {
                            if (passCheck.length > 0) {
                                if (passCheck[0].childNodes.length > 0) {
                                    var pass = passCheck[0].childNodes[0].nodeValue;
                                    _("passwordchange").style.display = 'inline';
                                }
                            }
                        }
                        return;
                    }
                }
            }
            // check for open ticket
            var refCheck = xmldoc.getElementsByTagName("ref_ticket");
            if (refCheck) {
                var refStage = xmldoc.getElementsByTagName("ref_stage");
                var refType = xmldoc.getElementsByTagName("ref_type");
                if (refCheck.length > 0) {
                    if (refCheck[0].childNodes.length > 0) {
                        refCheck = refCheck[0].childNodes[0].nodeValue;
                        if (refStage) {
                            if (refStage.length > 0) {
                                if (refStage[0].childNodes.length > 0) {
                                    refStage = refStage[0].childNodes[0].nodeValue.replace(/[ ]/g, '');
                                }
                            }
                        }
                        else {
                            refStage = null;
                        }
                        if (refType) {
                            if (refType.length > 0) {
                                if (refType[0].childNodes.length > 0) {
                                    refType = refType[0].childNodes[0].nodeValue.replace(/[ ]/g, '');
                                }
                            }
                        }
                        else {
                            refType = null;
                        }
                        switch (true) {
                            case (refCheck.length > 6):
                                _("login").style.display = 'inline';
                                _("afterVerified").style.display = 'none';
                                clearTicketInfo();
                                _("s").style.display = 'inline';
                                _("l").style.display = 'none';
                                _("wtn").focus();
                                _("v").style.display = 'inline';
                                _("vl").style.display = 'none';
                                createError("There is an open service order on this account, check with a L2 in your team chat to determine if further escalation is needed.<br>SO: " + refCheck);
                                return;
                                break;
                            case (refType == "CC"):
                                var refCommitDate = xmldoc.getElementsByTagName("date");
                                var refCommitTime = xmldoc.getElementsByTagName("time");
                                if (refCommitDate && refCommitTime) {
                                    if (refCommitDate.length > 0 && refCommitTime.length > 0) {
                                        if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
                                            refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
                                            refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
                                        }
                                    }
                                }
                                else {
                                    refCommitDate = null;
                                    refCommitTime = null;
                                }
                                _("login").style.display = 'inline';
                                _("afterVerified").style.display = 'none';
                                clearTicketInfo();
                                _("s").style.display = 'inline';
                                _("l").style.display = 'none';
                                _("wtn").focus();
                                _("v").style.display = 'inline';
                                _("vl").style.display = 'none';
                                createError("There is a common cause issue currently in place for this customers area. Do not continue with this repair ticket, inform customer of issue.<br><a href='https://www.ihd.frontiernet.net/TechManual/common_causes/index.html' target='_blank'>View the Wiki Page here. /a> Need help? Contact a L2 in your team's chat room.<br>CC Ticket: " + refCheck + "<br>CC Commit:" + refCommitDate + " " + refCommitTime);
                                return;
                                break;
                            case (refStage == "DIS" && refType == "DS"):
                                var refCommitDate = xmldoc.getElementsByTagName("date");
                                var refCommitTime = xmldoc.getElementsByTagName("time");
                                if (refCommitDate && refCommitTime) {
                                    if (refCommitDate.length > 0 && refCommitTime.length > 0) {
                                        if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
                                            refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
                                            refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
                                        }
                                    }
                                }
                                else {
                                    refCommitDate = null;
                                    refCommitTime = null;
                                }
                                _("login").style.display = 'inline';
                                _("afterVerified").style.display = 'none';
                                clearTicketInfo();
                                _("s").style.display = 'inline';
                                _("l").style.display = 'none';
                                _("wtn").focus();
                                _("v").style.display = 'inline';
                                _("vl").style.display = 'none';
                                createError("There is already an active ticket in place on this account. Do not place another repair ticket on this account. Need help? Try viewing the active ticket in Viryanet. For further assistance contact a L2 in your team chat room.<br>Ticket: " + refCheck + "<br>Commit: " + refCommitDate + " " + refCommitTime);
                                return;
                                break;
                            case (refStage == "TEN"):
                                _("login").style.display = 'inline';
                                _("afterVerified").style.display = 'none';
                                clearTicketInfo();
                                _("s").style.display = 'inline';
                                _("l").style.display = 'none';
                                _("wtn").focus();
                                _("v").style.display = 'inline';
                                _("vl").style.display = 'none';
                                createError("There is an active repair ticket in place on this account. The repair ticket is currently being worked (there is a repair tech in the field).<br>Inform the customer of this. For further assistance contact a L2 in your team chat room.<br>Ticket Number: " + refCheck);
                                return;
                                break;
                            case (refStage == "***"):
                                _("login").style.display = 'inline';
                                _("afterVerified").style.display = 'none';
                                clearTicketInfo();
                                _("s").style.display = 'inline';
                                _("l").style.display = 'none';
                                _("wtn").focus();
                                _("v").style.display = 'inline';
                                _("vl").style.display = 'none';
                                createError("There is an unstaged repair ticket on this account, contact a L2 in your team chat room to have this problem resolved.");
                                return;
                                break;
                            case (refType == "RS"):
                                var refCommitDate = xmldoc.getElementsByTagName("date");
                                var refCommitTime = xmldoc.getElementsByTagName("time");
                                if (refCommitDate && refCommitTime) {
                                    if (refCommitDate.length > 0 && refCommitTime.length > 0) {
                                        if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
                                            refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
                                            refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
                                        }
                                    }
                                }
                                else {
                                    refCommitDate = null;
                                    refCommitTime = null;
                                }
                                _("login").style.display = 'inline';
                                _("afterVerified").style.display = 'none';
                                clearTicketInfo();
                                _("s").style.display = 'inline';
                                _("l").style.display = 'none';
                                _("wtn").focus();
                                _("v").style.display = 'inline';
                                _("vl").style.display = 'none';
                                createError("There is an active residential service repair ticket on this account<br>Message a L2 in your team chat room for further assistance.<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
                                return;
                                break;
                            case (refType == "BS"):
                                _("login").style.display = 'inline';
                                _("afterVerified").style.display = 'none';
                                clearTicketInfo();
                                _("s").style.display = 'inline';
                                _("l").style.display = 'none';
                                _("wtn").focus();
                                _("v").style.display = 'inline';
                                _("vl").style.display = 'none';
                                createError("There is an active business service repair ticket on this account.<br>Message a L2 in your team chat room for further assistance.<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
                                return;
                                break;
                            default:
                                var refCommitDate = xmldoc.getElementsByTagName("date");
                                var refCommitTime = xmldoc.getElementsByTagName("time");
                                if (refCommitDate && refCommitTime) {
                                    if (refCommitDate.length > 0 && refCommitTime.length > 0) {
                                        if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
                                            refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
                                            refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
                                        }
                                    }
                                }
                                else {
                                    refCommitDate = null;
                                    refCommitTime = null;
                                }
                                _("login").style.display = 'inline';
                                _("afterVerified").style.display = 'none';
                                clearTicketInfo();
                                _("s").style.display = 'inline';
                                _("l").style.display = 'none';
                                _("wtn").focus();
                                _("v").style.display = 'inline';
                                _("vl").style.display = 'none';
                                createError("There is a repair ticket currently in place on this account. Message an L2 in your team chat room for further assistance.<br>Type: " + refType + "<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
                                return;
                                break;
                        }
                    }
                }
            }
            var ticketNumber = xmldoc.getElementsByTagName("ticketnumber");
            if (ticketNumber) {
                if (ticketNumber.length > 0) {
                    if (ticketNumber[0].childNodes.length > 0) {
                        ticketNumber = ticketNumber[0].childNodes[0].nodeValue;
                        if (ticketNumber == "000000") {
                            createNotice("ATTENTION", "The ticket tool is in backlog mode right now, quote the customer 24/48 hours, THIS TICKET INFO IS NOT CORRECT.<br>There is no ticket numbers at this time, they will be entered when the endeavor system is online again.<br><span style='font-size: 30px;'>The ticket will be worked in 24-48 Business Hours (Mon - Fri)</span>");
                        }
                        if (xmldoc.getElementsByTagName("ce").length > 0) {
                            commitdate = null;
                            committime = null;
                        }
                        else {
                            var commitdate = xmldoc.getElementsByTagName("date");
                            var committime = xmldoc.getElementsByTagName("time");
                            if (commitdate && committime) {
                                if (commitdate.length > 0 && committime.length > 0) {
                                    commitdate = commitdate[0].childNodes[0].nodeValue;
                                    if (isSunday(commitdate + '/' + (new Date()).getFullYear())) {
                                        if (window.confirm('Please verify that the customer would like a technician to visit on Sunday.  If the customer would like a technician to visit on Monday instead, please click OK and follow the instructions on the next page to revise the commit date.  If Sunday is fine, click Cancel.')) {
                                            window.open('https://www.ihd.frontiernet.net/repair_tick/cdpi/14.htm', '_blank');
                                        }
                                    }
                                    committime = committime[0].childNodes[0].nodeValue;
                                }
                                else {
                                    commitdate = null;
                                    committime = null;
                                }
                            }
                            else {
                                commitdate = null;
                                committime = null;
                            }
                        }
                    }
                    else {
                        commitdate = null;
                        committime = null;
                    }
                    if (xmldoc.getElementsByTagName("ce").length > 0) {
                        commitdate = "1 - 2 Business Days";
                        committime = '-';
                    }
                    else {
                        var d = new Date();
                        var datesplit = commitdate.split("/");
                        var timesplit = committime.split(":");
                        d.setHours(timesplit[0]);
                        d.setMinutes(timesplit[1]);
                        d.setMonth(datesplit[0]);
                        d.setDate(datesplit[1]);
                        /*if (d.getHours() >= 17) {
                            createNotice("ATTENTION", "<span style='font-size: 18px; font-weight: bold;'>For tickets quoted after 5PM, Techs will try to be out by 5PM, but it may be pushed to the next day. Please inform the customer.</span>");
                        }
                        if (d.getDay() == 0 || d.getDay() == 6) {
                            createNotice("ATTENTION", "<span style='font-size: 18px; font-weight: bold;'>Tickets quoted on weekends are generally worked the following business day (monday - friday), please inform the customer.</span>");
                        }*/
                    }
                    _("afterVerified").style.display = "none";
                    _("ticketNumber").innerHTML = ticketNumber;
                    _("commitDate").innerHTML = commitdate;
                    if ($('#newcommittype').val() == '0') {
                        _("commitTime").innerHTML = committime;
                    }
                    else {
                        _("commitTime").innerHTML = ''.concat(cstart, ' - ', cend);
                    }
                    // _("commit").style.display = "inline";
                    _("info").style.display = "inline";
                    _("finish").style.display = "inline";
                    try {
                        if (xmldoc.getElementsByTagName("aftermessage").length > 0) {
                            if (xmldoc.getElementsByTagName("aftermessage")[0].childNodes[0].nodeValue.length > 0) {
                                createNotice('ATTENTION', xmldoc.getElementsByTagName("aftermessage")[0].childNodes[0].nodeValue);
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }
		else {
			params = new Array();
			params.push(new Array('lanid', _("lanid").value));
			params.push(new Array('error', 'Missing document element in submit ticket, line 959: response: ' + urlencode(ticketAjax.getAjax().responseText)));
			errorAjax.addRequest('error.php', params);
			if (brandon()) {
				window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tt&amp;body=Missing%20document%20element%20in%20submitTicket,%20response:%20" + urlencode(ticketAjax.getAjax().responseText);
			}
			else {
			}
			alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
			window.location.href = unescape(window.location.pathname);
			return;
		}
	}

}

// submit ticket
function submitTicket() {
	if (_("customerType").value == "ftv" || _("customerType").value == "fiber") {
		submitFTicket();
	}
	else if (_("potsTType").checked) {
		submitPhoneTicket();
	}
	else {
		if (ticketInuse) {
			return;
		}
		clearNotice();

		if (_("wireless").selectedIndex == 0) {
			alert("Please select how the customer is connected.");
			_("wireless").focus();
			return;
		}

		var params = new Array();
		if (_("contactname") && _("contactnumber") && _("contacttype") && _("email") && _("modem") && _("issue") && _("domain")) {
			var contactname = _("contactname").value.substr(0, 16);
			var contactnumber = _("contactnumber").value.replace(/[^0-9]/g, '').substr(0, 10);
			var contacttype = _("contacttype").selectedIndex;
			var email = _("email").value.replace(/[^a-zA-Z0-9-_.]/g, '');
			var pwd = _("pwd").value.replace((new RegExp("/[']/g")), '').replace(/[ ]/g, '').substr(0, 16);
			var modem = _("modem").selectedIndex;
			var issue = $("#issue").val();
			var issueDom = _("issue").options[_("issue").selectedIndex];
			var domain = _("domain").options[_('domain').selectedIndex].value;
		}
		else {
			params = new Array();
			params.push(new Array('lanid', _("lanid").value));
			params.push(new Array('error', 'Missing element in submitTicket, line 809'));
			errorAjax.addRequest('error.php', params);
			if (brandon()) {
				window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tt&amp;body=Missing%20element%20in%20submitTicket";
			}
			alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
			window.location.href = unescape(window.location.pathname);
			return;
		}

		/*if (contactnumber == _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)) {
            alert("The WTN can not be the same as the CTN for this customer.  Please ensure that the WTN and CTN do not match.");
            return;
        }*/

		if (issueDom.attributes['speed']) {
			if (_('provSpeed').value.length == 0) {
				_('provSpeed').focus();
				return;
			}
			if (_('resultSpeed').value.length == 0) {
				_('resultSpeed').focus();
				return;
			}
			var perc70 = Math.round((70 * Number(_('provSpeed').value)) / 100);
			if (Number(_('resultSpeed').value) >= perc70) {
				alert("Customer is getting more than 70% provisioned/trained speed.");
				return;
			}
		}

		var sanID = _('sanID').value
		if ((issueDom.attributes['satlights']) && sanID.length == 0) {
			_('sanID').focus();
			alert("SAN ID is required for Satellite issues.");
			return false;
		}

		if (contactnumber.substr(0, 1) == '0') {
			alert("This is not a valid contact number, enter a valid contact number.");
			_("contactnumber").focus();
			_("contactnumber").select();
			return;
		}

		if (contactnumber.match(/0/g)) {
			if (contactnumber.match(/0/g).length >= 6) {
				alert("This is not a valid contact number, enter a valid contact number.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
		}

		if (contactnumber == _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)) {
			/*         alert("The contact number you entered is invalid, have you asked for another contact number?\r\n\r\n" +
             "If we do not provide a valid contact number then a repair tech will not be able to reach the customer to work the ticket.\r\n\r\n" +
             "Click OK to enter a DIFFERENT contact number, or, if the customer has NO OTHER contact numbers, re-enter the contact number. " +
             "Failure to enter a valid contact number can result in administrative action. ");
             var nnum = prompt(
             "Invalid Contact Number! Re-enter a different contact number below, or if NO OTHER numbers, re-enter same number.", "");
             */
			var nnum = prompt(
				"The contact number you entered is invalid, have you asked for another contact number?\r\n\r\n" +
				"If we do not provide a valid contact number then a repair tech will not be able to reach the customer to work the ticket.\r\n\r\n" +
				"Re-enter a different contact number below, or if NO OTHER numbers, re-enter same number.\r\n\r\n" +
				"Failure to enter a valid contact number can result in administrative action. ", "");
			if (nnum == null) {
				alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
			nnum = nnum.replace(/[^0-9]/g, '').substr(0, 10);
			if (nnum.replace(/[^0-9]/g, '').substr(0, 10).length != 10 || nnum.substr(0, 1) == '0') {
				alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
			}
			if (nnum.match(/0/g)) {
				if (nnum.match(/0/g).length >= 6) {
					alert("The number you entered is not valid.\r\n" + nnum + "\r\n\r\nPlease try again.");
					_("contactnumber").focus();
					_("contactnumber").select();
					return;
				}
			}
			contactnumber = nnum;
			_("contactnumber").value = nnum
			//alert("Contact number is the same as the DSL number. Please obtain an alternate contact number for this customer.");
			//return;
		}


		switch (true) {
			case (contactname.length == 0):
				_("contactname").focus();
				return;
				break;
			case (contactnumber.length != 10):
				_("contactnumber").focus();
				_("contactnumber").select();
				return;
				break;
			case (contacttype == 0):
				_("contacttype").focus();
				return;
				break;
			case (modem == 0):
				alert('Please select a modem.');
				_("modem").focus();
				return;
				break;
			case (issue == ''):
				_("issue").focus();
				return;
				break;
			case (email.length == 0):
				_("email").focus();
				return;
				break;
			case (domain == -1):
				_("domain").focus();
				return;
				break;
		}


		/*if (issue == 5) {
            if (_("subissue")) {
                var subissue = _("subissue").selectedIndex;
                if (subissue == 0) {
                    _("subissue").focus();
                    return;
                }
            }
            else {
                params = new Array();
                params.push(new Array('lanid', _("lanid").value));
                params.push(new Array('error', 'Missing subissue in submitTicket, line 809'));
                errorAjax.addRequest('error.php', params);
                if (brandon()) {
                    window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tt&amp;body=Missing%20subissue%20in%20submitTicket";
                }
                alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
                window.location.href = unescape(window.location.pathname);
                return;
            }
        }*/
		if (modem == _("modem").options.length - 1) {
			if (_("othermodem")) {
				var other = _("othermodem").value.substr(0, 10);
				if (other.length == 0) {
					_("othermodem").focus();
					return;
				}
			}
			else {
				params = new Array();
				params.push(new Array('lanid', _("lanid").value));
				params.push(new Array('error', 'Missing subissue in submitTicket, line 809'));
				errorAjax.addRequest('error.php', params);
				if (brandon()) {
					window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tt&amp;body=Missing%20subissue%20in%20submitTicket";
				}
				alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
				window.location.href = unescape(window.location.pathname);
				return;
			}
		}

		if (env == 3) {
			if (_('epixhour1').value.replace(/[^0-9]/g, '').length == 0) {
				_('epixhour1').focus();
				return;
			}
			if (_('epixhour2').value.replace(/[^0-9]/g, '').length == 0) {
				_('epixhour2').focus();
				return;
			}
		}

		/*if(_("issue").selectedIndex == 13) {
         if(_("loop_conf_up").value.replace(/[^0-9\.]/g,'').length == 0) {
         _("loop_conf_up").focus();
         return;
         }
         if(_("loop_conf_dwn").value.replace(/[^0-9\.]/g,'').length == 0) {
         _("loop_conf_down").focus();
         return;
         }
         if(_("loop_op_up").value.replace(/[^0-9\.]/g,'').length == 0) {
         _("loop_op_up").focus();
         return;
         }
         if(_("loop_op_dwn").value.replace(/[^0-9\.]/g,'').length == 0) {
         _("loop_op_dwn").focus();
         return;
         }
         }*/

		if (_("s")) {
			_("s").style.display = "none";
		}
		if (_("l")) {
			_("l").style.display = "inline";
		}

		var confirmString = 'Please verify with the customer that the following information is correct:\r\n\r\n';
		params = new Array();

		params.push(new Array('lanid', urlencode(_("lanid").value.toUpperCase().substr(0, 10))));
		params.push(new Array('lanpw', urlencode(_("lanpwd").value)));
		params.push(new Array('wtn', _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)));
		params.push(new Array('USI', _('USI').value));
		params.push(new Array('wireless', _('wireless').value));
		params.push(new Array('contactName', urlencode(contactname.substr(0, 31))));
		confirmString += 'Contact Name: ' + contactname.substr(0, 16) + '\r\n';
		params.push(new Array('contactNumber', contactnumber.replace(/[^0-9]/g, '').substr(0, 10)));
		confirmString += 'Contact Number: ' + contactnumber.replace(/[^0-9]/g, '').substr(0, 10) + ' ';
		params.push(new Array('contactType', contacttype));
		confirmString += _("contacttype").options[contacttype].text + '\r\n';
		params.push(new Array('modem', modem - 1));
		confirmString += 'Modem: ' + _("modem").options[modem].text + '\r\n';
		if (modem == _("modem").options.length - 1) {
			params.push(new Array('otherModem', urlencode(other.substr(0, 10))));
			confirmString += 'Modem: ' + other.substr(0, 10) + "\r\n";
		}
		params.push(new Array('issue', issue));
		confirmString += 'Issue: ' + _("issue").options[_("issue").selectedIndex].text + '\r\n';
		/*if (issue == 5) {
            params.push(new Array('subissue', subissue - 1));
            confirmString += 'Issue: ' + _("subissue").options[subissue].text + '\r\n';
        }*/
		params.push(new Array('email', email));
		confirmString += 'Email: ' + email;
		params.push(new Array('domain', domain));
		confirmString += '@' + _("domain").options[_("domain").selectedIndex].text + '\r\n';
		params.push(new Array('password', urlencode(pwd)));
		confirmString += 'Password: ' + pwd + '\r\n';
		params.push(new Array('env', env));
		if (env == 3) {
			params.push(new Array('epixhour1', _('epixhour1').value.replace(/[^0-9]/g, '')));
			params.push(new Array('epixhour2', _('epixhour2').value.replace(/[^0-9]/g, '')));
		}
		if (_("insidewire")) {
			if (_("insidewire").checked) {
				params.push(new Array('iwc', '1'));
				confirmString += 'Sold Inside Wire: Yes\r\n';
			}
		}
		/*
        if (_('cbdsl').checked) {
            params.push(new Array('cbdsl', '1'));
            params.push(new Array('wbdsl', _('wbdsl').value));
            params.push(new Array('lbdsl', _('lbdsl').value));
            confirmString += 'BDSL: Yes\r\nBDSL WAN: ' + _('wbdsl').value + '\r\nBDSL LAN: ' + _('lbdsl').value;
        }*/
		params.push(new Array('phoneissue', _("phoneissue").selectedIndex));
		/*if (_("cblue").checked) {
            params.push(new Array('cblue', '1'));
            confirmString += "Code Blue: True\r\n";
        }*/
		if (issueDom.attributes['speed']) {
			confirmString += "Provisioned Speed: " + _('provSpeed').value + "\r\n";
			confirmString += "Test Results: " + _('resultSpeed').value + "\r\n";
			params.push(new Array("provSpeed", _('provSpeed').value));
			params.push(new Array("resultSpeed", _('resultSpeed').value));
		}
		/*    if (issue == 13) {
         confirmString += "Configured: " + _('loop_conf_up').value + " / " + _('loop_conf_dwn').value + "\r\n";
         confirmString += "Operating: " + _('loop_op_up').value + " / " + _('loop_op_dwn').value + "\r\n";
         params.push(new Array("loop_configured", _('loop_conf_up').value + " / " + _('loop_conf_dwn').value));
         params.push(new Array("loop_operating", _('loop_op_up').value + " / " + _('loop_op_dwn').value));
         }*/
		if (issueDom.attributes['satlights']) {
			confirmString += "SAN ID: " + _('sanID').value + "\r\n";
			params.push(new Array("sanID", _('sanID').value));
		}
		if (issueDom.attributes['satlights']) {
			if (_('sattxlight').checked) {
				confirmString += "TX Light On \r\n";
				params.push(new Array("sattxlight", 1));
			}
			if (_('satrxlight').checked) {
				confirmString += "RX Light On \r\n";
				params.push(new Array("satrxlight", 1));
			}
			if (_('satsyslight').checked) {
				confirmString += "SYS Light On \r\n";
				params.push(new Array("satsyslight", 1));
			}
		}
		if (_('snrRow').style.display != 'none') {
			params.push(new Array('snr', _('snr').value));
			params.push(new Array('attenuation', _('attenuation').value));
		}

		if ($('#newcommittype').val().length == 0) {
			createError("You must select an appointment type");
			return;
		}

		var type = $('#newcommittype').val();
		var committ = null;
		switch (type) {
			case 'D':
				committ = $('#newcommitallday');
				break;
			case 'A':
				committ = $('#newcommitam');
				break;
			case 'P':
				committ = $('#newcommitpm');
				break;
			case '4':
				committ = $('#newcommit4h');
				break;
			case '2':
				committ = $('#newcommit2h');
				break;
				;
		}

        params.push(['appttype', type]);
        if (type != '0') {
            var split = committ.val().split('|');
            cdate = split[0];
            cstart = split[1];
            cend = split[2];
            var date = split[0];
            var start = split[1].replace(/[^0-9]/g, '');
            var end = split[2].replace(/[^0-9]/g, '');

            var dsplit = date.split('/');
            date = ''.concat(padLeft(dsplit[0].replace(/[^0-9]/g, ''), 2), padLeft(dsplit[1].replace(/[^0-9]/g, ''), 2), padLeft(dsplit[2].replace(/[^0-9]/g, ''), 2));

            params.push(['apptdate', date]);
            params.push(['apptstart', start]);
            params.push(['apptend', end]);
        }

		if (confirm(confirmString)) {
			ticketInuse = true;
			ticketAjax.addRequest('submitTicket.php', params, ticketSubmit);
		}
		else {
			_("s").style.display = "inline";
			_("l").style.display = "none";
			return;
		}
		return;
	}
}

function getAppointments(ticnum) {
	if (_('ticketNumber').innerHTML.replace(/[\s]*/g, '').length == 0) {
		return;
	}
	$('#commitload').show();
	var params = [];
	params.push(['lanid', urlencode(_("lanid").value.toUpperCase().substr(0, 10))]);
	params.push(['lanpw', urlencode(_("lanpwd").value)]);
	params.push(['wtn', _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)]);
	params.push(['ticketnumber', _("ticketNumber").innerHTML]);

	ticketAjax.addRequest('getAppointments.php', params, parseAppointments);

}

function parseAppointments() {
	if (ticketAjax.readyState() == 4) {
		$('#commitload').hide();
		if (ticketAjax.documentElement()) {
			var xmldoc = ticketAjax.documentElement();
			// do a error check
			var errorCheck = xmldoc.getElementsByTagName("error");
			if (errorCheck) {
				if (errorCheck.length > 0) {
					if (errorCheck[0].childNodes.length > 0) {
						errorCheck = errorCheck[0].childNodes[0].nodeValue;
						//_("s").style.display = "inline";
						//_("l").style.display = "none";
						createError(errorCheck);
						// check for password change required
						var passCheck = xmldoc.getElementsByTagName("password");
						if (passCheck) {
							if (passCheck.length > 0) {
								if (passCheck[0].childNodes.length > 0) {
									var pass = passCheck[0].childNodes[0].nodeValue;
									_("passwordchange").style.display = 'inline';
								}
							}
						}
						return;
					}
				}
			}
			var typed = xmldoc.getElementsByTagName("type_D");
			var typea = xmldoc.getElementsByTagName("type_A");
			var typep = xmldoc.getElementsByTagName("type_P");
			var type4 = xmldoc.getElementsByTagName("type_4");
			var type2 = xmldoc.getElementsByTagName("type_2");
			if (typed.length == 0 && typea.length == 0 && typep.length == 0 && type4.length == 0 && type2.length == 0) {
				createError("no valid appointments could be located.");
				return;
			}
			$('#committype').empty().append('<option value="">Select One</option>').val('');
			$('#commitallday').empty().hide();
			$('#commitam').empty().hide();
			$('#commitpm').empty().hide();
			$('#commit4h').empty().hide();
			$('#commit2h').empty().hide();
			if (typed.length > 0) {
				$('#committype').append('<option value="D">All Day</option>');
				var cad = $('#commitallday');
				for (i = 0; i < typed[0].childNodes.length; i++) {
					var date = typed[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
					var start = typed[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
					var end = typed[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
					cad.append('<option value="' + date + '|' + start + '|' + end + '">' + date + '</option>');
				}
			}
			if (typea.length > 0) {
				$('#committype').append('<option value="A">AM</option>');
				var cam = $('#commitam');
				for (i = 0; i < typea[0].childNodes.length; i++) {
					var date = typea[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
					var start = typea[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
					var end = typea[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
					cam.append('<option value="' + date + '|' + start + '|' + end + '">' + date + ' ' + start + ' - ' + end + '</option>');
				}
			}
			if (typep.length > 0) {
				$('#committype').append('<option value="P">PM</option>');
				var cpm = $('#commitpm');
				for (i = 0; i < typep[0].childNodes.length; i++) {
					var date = typep[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
					var start = typep[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
					var end = typep[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
					cpm.append('<option value="' + date + '|' + start + '|' + end + '">' + date + ' ' + start + ' - ' + end + '</option>');
				}
			}
			if (type4.length > 0) {
				$('#committype').append('<option value="4">4 hour</option>');
				var c4h = $('#commit4h');
				for (i = 0; i < type4[0].childNodes.length; i++) {
					var date = type4[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
					var start = type4[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
					var end = type4[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
					c4h.append('<option value="' + date + '|' + start + '|' + end + '">' + date + ' ' + start + ' - ' + end + '</option>');
				}
			}
			if (type2.length > 0) {
				$('#committype').append('<option value="2">2 hour</option>');
				var c2h = $('#commit2h');
				for (i = 0; i < type2[0].childNodes.length; i++) {
					var date = type2[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
					var start = type2[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
					var end = type2[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
					c2h.append('<option value="' + date + '|' + start + '|' + end + '">' + date + ' ' + start + ' - ' + end + '</option>');
				}
			}
			$('#commit').show();
		}
	}
}

function hideshowCommit() {
	var type = $('#committype').val();
	$('#commitallday').hide();
	$('#commitam').hide();
	$('#commitpm').hide();
	$('#commit4h').hide();
	$('#commit2h').hide();
	switch (type) {
		case 'D':
			$('#commitallday').show();
			break;
		case 'A':
			$('#commitam').show();
			break;
		case 'P':
			$('#commitpm').show();
			break;
		case '4':
			$('#commit4h').show();
			break;
		case '2':
			$('#commit2h').show();
			break;
	}
}

function hideshowNewCommit() {
	var type = $('#newcommittype').val();
	$('#newcommitallday').hide();
	$('#newcommitam').hide();
	$('#newcommitpm').hide();
	$('#newcommit4h').hide();
	$('#newcommit2h').hide();
	switch (type) {
		case 'D':
			$('#newcommitallday').show();
			break;
		case 'A':
			$('#newcommitam').show();
			break;
		case 'P':
			$('#newcommitpm').show();
			break;
		case '4':
			$('#newcommit4h').show();
			break;
		case '2':
			$('#newcommit2h').show();
			break;
		default:
            if(apptschedtype == 2) {
                alert('This appointment code is not recommended for the ticket type you have selected. Please check that the customer does not want to schedule an appointment before proceeding.');
            }
            break;
	}
}

var apptttype = null;
var apptschedtype = null;

function getAppointmentsApi() {
    getAppointmentsApiSel();
	/*var params = [];
	params.push(['wtn', _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)]);
	params.push(['bus', 0]);
	params.push(['oos', 0]);
	params.push(['custype', 'dsl']);
	ticketAjax.addRequest('getAppointmentsApi.php', params, parseAppointmentsApi);*/
}

function getAppointmentsApiSel(elem) {
	var params = [];

	if(elem) {

        var option = elem.options[elem.selectedIndex];
        var ttype = option.attributes['restype'].value;
        if (serviceType.match(/B/g)) {
            ttype = option.attributes['bustype'].value;
        }
        if (envName == 'CP1CZ' || envName == 'CP1FT') {
            if (option.attributes['ctftype'].value.replace(/[^0-9a-zA-Z]/g, '').length > 0) {
                ttype = option.attributes['ctftype'].value;
            }
        }
        var schedType = 0;
        if (serviceType.match(/B/g)) {
            schedType = option.attributes['bussched'].value;
        }
        else {
            schedType = option.attributes['ressched'].value;
        }

        apptttype = ttype;
        apptschedtype = parseInt(schedType, 10);
    }

	if (apptschedtype == 1) {
		$('#newcommittype').empty().append('<option value="">Select One</option>').val('');
		$('#newcommittype').append('<option value="0">Default Appt</option>');
		$('#newcommitallday').empty().hide();
		$('#newcommitam').empty().hide();
		$('#newcommitpm').empty().hide();
		$('#newcommit4h').empty().hide();
		$('#newcommit2h').empty().hide();
		return;
	}
	params.push(['wtn', _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)]);
	params.push(['tictype', apptttype]);
	ticketAjax.addRequest('getAppointmentsApi.php', params, parseAppointmentsApi);
}

function parseAppointmentsApi() {
	if (ticketAjax.readyState() == 4) {
        $('#newcommittype').empty().append('<option value="">Select One</option>').val('');
        $('#newcommittype').append('<option value="0">Default Appt</option>');
        $('#newcommitallday').empty().hide();
        $('#newcommitam').empty().hide();
        $('#newcommitpm').empty().hide();
        $('#newcommit4h').empty().hide();
        $('#newcommit2h').empty().hide();
        try {
            if (ticketAjax.documentElement()) {
                var xmldoc = ticketAjax.documentElement();
                // do a error check
                var errorCheck = xmldoc.getElementsByTagName("error");
                if (errorCheck) {
                    if (errorCheck.length > 0) {
                        if (errorCheck[0].childNodes.length > 0) {
                            errorCheck = errorCheck[0].childNodes[0].nodeValue;
                            //_("s").style.display = "inline";
                            //_("l").style.display = "none";
                            createError(errorCheck);
                            return;
                        }
                    }
                }
                $('#newcommittype').empty().append('<option value="">Select One</option>').val('');
                if(apptschedtype != 2) {
                	$('#newcommittype').append('<option value="0">Default Appt</option>');
				}
                $('#newcommitallday').empty().hide();
                $('#newcommitam').empty().hide();
                $('#newcommitpm').empty().hide();
                $('#newcommit4h').empty().hide();
                $('#newcommit2h').empty().hide();
                var typed = xmldoc.getElementsByTagName("type_D");
                var typea = xmldoc.getElementsByTagName("type_A");
                var typep = xmldoc.getElementsByTagName("type_P");
                var type4 = xmldoc.getElementsByTagName("type_4");
                var type2 = xmldoc.getElementsByTagName("type_2");
                if (typed.length == 0 && typea.length == 0 && typep.length == 0 && type4.length == 0 && type2.length == 0) {
                    createError("no valid appointments could be located.");
                    return;
                }
                if (typed.length > 0) {
                    $('#newcommittype').append('<option value="D">All Day</option>');
                    var cad = $('#newcommitallday');
                    for (i = 0; i < typed[0].childNodes.length; i++) {
                        var date = typed[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
                        var start = typed[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
                        var end = typed[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
                        cad.append('<option value="' + date + '|' + start + '|' + end + '">' + date + '</option>');
                    }
                }
                if (typea.length > 0) {
                    $('#newcommittype').append('<option value="A">AM</option>');
                    var cam = $('#newcommitam');
                    for (i = 0; i < typea[0].childNodes.length; i++) {
                        var date = typea[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
                        var start = typea[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
                        var end = typea[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
                        cam.append('<option value="' + date + '|' + start + '|' + end + '">' + date + ' ' + start + ' - ' + end + '</option>');
                    }
                }
                if (typep.length > 0) {
                    $('#newcommittype').append('<option value="P">PM</option>');
                    var cpm = $('#newcommitpm');
                    for (i = 0; i < typep[0].childNodes.length; i++) {
                        var date = typep[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
                        var start = typep[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
                        var end = typep[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
                        cpm.append('<option value="' + date + '|' + start + '|' + end + '">' + date + ' ' + start + ' - ' + end + '</option>');
                    }
                }
                if (type4.length > 0) {
                    $('#newcommittype').append('<option value="4">4 hour</option>');
                    var c4h = $('#newcommit4h');
                    for (i = 0; i < type4[0].childNodes.length; i++) {
                        var date = type4[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
                        var start = type4[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
                        var end = type4[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
                        c4h.append('<option value="' + date + '|' + start + '|' + end + '">' + date + ' ' + start + ' - ' + end + '</option>');
                    }
                }
                if (type2.length > 0) {
                    $('#newcommittype').append('<option value="2">2 hour</option>');
                    var c2h = $('#newcommit2h');
                    for (i = 0; i < type2[0].childNodes.length; i++) {
                        var date = type2[0].childNodes[i].childNodes[0].childNodes[0].nodeValue;
                        var start = type2[0].childNodes[i].childNodes[2].childNodes[0].nodeValue;
                        var end = type2[0].childNodes[i].childNodes[1].childNodes[0].nodeValue;
                        c2h.append('<option value="' + date + '|' + start + '|' + end + '">' + date + ' ' + start + ' - ' + end + '</option>');
                    }
                }
                if(apptschedtype == 2) {
                    $('#newcommittype').append('<option value="0">Default Appt</option>');
                }
            }
        }
        catch(e) {}
	}
}

var cdate = '';
var cstart = '';
var cend = '';

function setAppointment() {
	if ($('#committype').val().length == 0) {
		createError("You must select an appointment type");
		return;
	}

	var type = $('#committype').val();
	var committ = null;
	switch (type) {
		case 'D':
			committ = $('#commitallday');
			break;
		case 'A':
			committ = $('#commitam');
			break;
		case 'P':
			committ = $('#commitpm');
			break;
		case '4':
			committ = $('#commit4h');
			break;
		case '2':
			committ = $('#commit2h');
			break;
			;
	}

	$('#commit').hide();
	$('#commitsave').show();

	var split = committ.val().split('|');
	cdate = split[0];
	cstart = split[1];
	cend = split[2];
	var date = split[0];
	var start = split[1].replace(/[^0-9]/g, '');
	var end = split[2].replace(/[^0-9]/g, '');

	var dsplit = date.split('/');
	date = ''.concat(padLeft(dsplit[0].replace(/[^0-9]/g, ''), 2), padLeft(dsplit[1].replace(/[^0-9]/g, ''), 2), padLeft(dsplit[2].replace(/[^0-9]/g, ''), 2));

	var params = [];
	params.push(['lanid', urlencode(_("lanid").value.toUpperCase().substr(0, 10))]);
	params.push(['lanpw', urlencode(_("lanpwd").value)]);
	params.push(['wtn', _("wtn").value.replace(/[^0-9]/g, '').substr(0, 10)]);
	params.push(['ticketnumber', _("ticketNumber").innerHTML]);
	params.push(['appttype', type]);
	params.push(['apptdate', date]);
	params.push(['apptstart', start]);
	params.push(['apptend', end]);

	ticketAjax.addRequest('setAppointment.php', params, parseApptResult);
}

function parseApptResult() {
	if (ticketAjax.readyState() == 4) {
		if (ticketAjax.documentElement()) {
			var xmldoc = ticketAjax.documentElement();
			// do a error check
			var errorCheck = xmldoc.getElementsByTagName("error");
			if (errorCheck) {
				if (errorCheck.length > 0) {
					if (errorCheck[0].childNodes.length > 0) {
						errorCheck = errorCheck[0].childNodes[0].nodeValue;
						//_("s").style.display = "inline";
						//_("l").style.display = "none";
						createError(errorCheck);
						// check for password change required
						var passCheck = xmldoc.getElementsByTagName("password");
						if (passCheck) {
							if (passCheck.length > 0) {
								if (passCheck[0].childNodes.length > 0) {
									var pass = passCheck[0].childNodes[0].nodeValue;
									_("passwordchange").style.display = 'inline';
								}
							}
						}
						_("afterVerified").style.display = "none";
						// _("commit").style.display = "inline";
						_("info").style.display = "inline";
						_("finish").style.display = "inline";

						return;
					}
				}
			}
			$('#commitsave').hide();
			$('#commitDate').html(cdate);
			$('#commitTime').html(''.concat(cstart, ' - ', cend));
		}
	}
}

function padLeft(nr, n, str) {
	return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

var _ticketnumber = '';

function ticketSubmit() {
	if (ticketAjax.readyState() == 4) {
		ticketInuse = false;
		var params = new Array();
		if (_("contactname") && _("contactnumber") && _("contacttype") && _("email") && _("modem") && _("issue") && _("domain")) {
			var contactname = _("contactname").value.substr(0, 16);
			var contactnumber = _("contactnumber").value.replace(/[^0-9]/g, '').substr(0, 10);
			var contacttype = _("contacttype").selectedIndex;
			var email = _("email").value.replace(/[^a-zA-Z0-9-_.]/g, '');
			var pwd = _("pwd").value.replace("'", '').substr(0, 16);
			var modem = _("modem").selectedIndex;
			var issue = _("issue").selectedIndex;
			var domain = _("domain").selectedIndex;
		}
		if (ticketAjax.documentElement()) {
			var xmldoc = ticketAjax.documentElement();
			// do a error check
			var errorCheck = xmldoc.getElementsByTagName("error");
			if (errorCheck) {
				if (errorCheck.length > 0) {
					if (errorCheck[0].childNodes.length > 0) {
						errorCheck = errorCheck[0].childNodes[0].nodeValue;
						_("s").style.display = "inline";
						_("l").style.display = "none";
						createError(errorCheck);
						getAppointmentsApi();
						// check for password change required
						var passCheck = xmldoc.getElementsByTagName("password");
						if (passCheck) {
							if (passCheck.length > 0) {
								if (passCheck[0].childNodes.length > 0) {
									var pass = passCheck[0].childNodes[0].nodeValue;
									_("passwordchange").style.display = 'inline';
								}
							}
						}
						return;
					}
				}
			}
			// check for open ticket
			var refCheck = xmldoc.getElementsByTagName("ref_ticket");
			if (refCheck) {
				var refStage = xmldoc.getElementsByTagName("ref_stage");
				var refType = xmldoc.getElementsByTagName("ref_type");
				if (refCheck.length > 0) {
					if (refCheck[0].childNodes.length > 0) {
						refCheck = refCheck[0].childNodes[0].nodeValue;
						if (refStage) {
							if (refStage.length > 0) {
								if (refStage[0].childNodes.length > 0) {
									refStage = refStage[0].childNodes[0].nodeValue.replace(/[ ]/g, '');
								}
							}
						}
						else {
							refStage = null;
						}
						if (refType) {
							if (refType.length > 0) {
								if (refType[0].childNodes.length > 0) {
									refType = refType[0].childNodes[0].nodeValue.replace(/[ ]/g, '');
								}
							}
						}
						else {
							refType = null;
						}
						switch (true) {
							case (refCheck.length > 6):
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an open service order on this account, check with a L2 in your team chat to determine if further escalation is needed.<br>SO: " + refCheck);
								return;
								break;
							case (refType == "CC"):
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is a common cause issue currently in place for this customers area. Do not continue with this repair ticket, inform customer of issue.<br><a href='https://www.ihd.frontiernet.net/TechManual/common_causes/index.html' target='_blank'>View the Wiki Page here. /a> Need help? Contact a L2 in your team's chat room.<br>CC Ticket: " + refCheck + "<br>CC Commit:" + refCommitDate + " " + refCommitTime);
								return;
								break;
							case (refStage == "DIS" && refType == "DS"):
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is already an active ticket in place on this account. Do not place another repair ticket on this account. Need help? Try viewing the active ticket in Viryanet. For further assistance contact a L2 in your team chat room.<br>Ticket: " + refCheck + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
							case (refStage == "TEN"):
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an active repair ticket in place on this account. The repair ticket is currently being worked (there is a repair tech in the field).<br>Inform the customer of this. For further assistance contact a L2 in your team chat room.<br>Ticket Number: " + refCheck);
								return;
								break;
							case (refStage == "***"):
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an unstaged repair ticket on this account, contact a L2 in your team chat room to have this problem resolved.");
								return;
								break;
							case (refType == "RS"):
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an active residential service repair ticket on this account<br>Message a L2 in your team chat room for further assistance.<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
							case (refType == "BS"):
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an active business service repair ticket on this account.<br>Message a L2 in your team chat room for further assistance.<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
							default:
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is a repair ticket currently in place on this account. Message an L2 in your team chat room for further assistance.<br>Type: " + refType + "<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
						}
					}
				}
			}
			var ticketNumber = xmldoc.getElementsByTagName("ticketnumber");
			if (ticketNumber) {
				if (ticketNumber.length > 0) {
					if (ticketNumber[0].childNodes.length > 0) {
						ticketNumber = ticketNumber[0].childNodes[0].nodeValue;
						if (ticketNumber == "000000") {
							createNotice("ATTENTION", "The ticket tool is in backlog mode right now, quote the customer 24/48 hours, THIS TICKET INFO IS NOT CORRECT.<br>There is no ticket numbers at this time, they will be entered when the endeavor system is online again.<br><span style='font-size: 30px;'>The ticket will be worked in 24-48 Business Hours (Mon - Fri)</span>");
						}
						if (xmldoc.getElementsByTagName("ce").length > 0) {
							commitdate = null;
							committime = null;
						}
						else {
							var commitdate = xmldoc.getElementsByTagName("date");
							var committime = xmldoc.getElementsByTagName("time");
							if (commitdate && committime) {
								if (commitdate.length > 0 && committime.length > 0) {
									commitdate = commitdate[0].childNodes[0].nodeValue;
									if (isSunday(commitdate + '/' + (new Date()).getFullYear())) {
										if (window.confirm('Please verify that the customer would like a technician to visit on Sunday.  If the customer would like a technician to visit on Monday instead, please click OK and follow the instructions on the next page to revise the commit date.  If Sunday is fine, click Cancel.')) {
											window.open('https://www.ihd.frontiernet.net/repair_tick/cdpi/14.htm', '_blank');
										}
									}
									committime = committime[0].childNodes[0].nodeValue;
								}
								else {
									commitdate = null;
									committime = null;
								}
							}
							else {
								commitdate = null;
								committime = null;
							}
						}
					}
					else {
						commitdate = null;
						committime = null;
					}
					if (xmldoc.getElementsByTagName("ce").length > 0) {
						commitdate = "1 - 2 Business Days";
						committime = '-';
					}
					else {
						var d = new Date();
						var datesplit = commitdate.split("/");
						var timesplit = committime.split(":");
						d.setHours(timesplit[0]);
						d.setMinutes(timesplit[1]);
						d.setMonth(datesplit[0]);
						d.setDate(datesplit[1]);
						if ($('#newcommittype').val() == '0') {
							/*if (d.getHours() >= 17) {
								createNotice("ATTENTION", "<span style='font-size: 18px; font-weight: bold;'>For tickets quoted after 5PM, Techs will try to be out by 5PM, but it may be pushed to the next day. Please inform the customer.</span>");
							}
							if (d.getDay() == 0 || d.getDay() == 6) {
								createNotice("ATTENTION", "<span style='font-size: 18px; font-weight: bold;'>Tickets quoted on weekends are generally worked the following business day (monday - friday), please inform the customer.</span>");
							}*/
						}
					}
					_("afterVerified").style.display = "none";
					_("ticketNumber").innerHTML = ticketNumber;
					_("commitDate").innerHTML = commitdate;
					if ($('#newcommittype').val() == '0') {
						_("commitTime").innerHTML = committime;
					}
					else {
						_("commitTime").innerHTML = ''.concat(cstart, ' - ', cend);
					}
					//_("commit").style.display = "inline";
					_("info").style.display = "inline";
					_("finish").style.display = "inline";
					return;
				}
			}
		}
		else {
			params = new Array();
			params.push(new Array('lanid', _("lanid").value));
			params.push(new Array('error', 'Missing document element in submit ticket, line 959: response: ' + urlencode(ticketAjax.getAjax().responseText)));
			errorAjax.addRequest('error.php', params);
			if (brandon()) {
				window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tt&amp;body=Missing%20document%20element%20in%20submitTicket,%20response:%20" + urlencode(ticketAjax.getAjax().responseText);
			}
			else {
			}
			alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
			window.location.href = unescape(window.location.pathname);
			return;
		}
	}
}


function ticketFSubmit() {
	if (ticketAjax.readyState() == 4) {
		ticketInuse = false;
		var params = new Array();
		if (_("contactname") && _("contactnumber") && _("contacttype")) {
			var contactname = _("contactname").value.substr(0, 16);
			var contactnumber = _("contactnumber").value.replace(/[^0-9]/g, '').substr(0, 10);
			var contacttype = _("contacttype").selectedIndex;

			/*var pwd = _("pwd").value.replace("'", '').substr(0, 16);
             var modem = _("modem").selectedIndex;
             var issue = _("issue").selectedIndex;*/

		}
		if (ticketAjax.documentElement()) {
			var xmldoc = ticketAjax.documentElement();
			// do a error check
			var errorCheck = xmldoc.getElementsByTagName("error");
			if (errorCheck) {
				if (errorCheck.length > 0) {
					if (errorCheck[0].childNodes.length > 0) {
						errorCheck = errorCheck[0].childNodes[0].nodeValue;
						_("s").style.display = "inline";
						_("l").style.display = "none";
						createError(errorCheck);
						getAppointmentsApi();
						// check for password change required
						var passCheck = xmldoc.getElementsByTagName("password");
						if (passCheck) {
							if (passCheck.length > 0) {
								if (passCheck[0].childNodes.length > 0) {
									var pass = passCheck[0].childNodes[0].nodeValue;
									_("passwordchange").style.display = 'inline';
								}
							}
						}
						return;
					}
				}
			}
			// check for open ticket
			var refCheck = xmldoc.getElementsByTagName("ref_ticket");
			if (refCheck) {
				var refStage = xmldoc.getElementsByTagName("ref_stage");
				var refType = xmldoc.getElementsByTagName("ref_type");
				if (refCheck.length > 0) {
					if (refCheck[0].childNodes.length > 0) {
						refCheck = refCheck[0].childNodes[0].nodeValue;
						if (refStage) {
							if (refStage.length > 0) {
								if (refStage[0].childNodes.length > 0) {
									refStage = refStage[0].childNodes[0].nodeValue.replace(/[ ]/g, '');
								}
							}
						}
						else {
							refStage = null;
						}
						if (refType) {
							if (refType.length > 0) {
								if (refType[0].childNodes.length > 0) {
									refType = refType[0].childNodes[0].nodeValue.replace(/[ ]/g, '');
								}
							}
						}
						else {
							refType = null;
						}
						switch (true) {
							case (refCheck.length > 6):
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an open service order on this account, check with a L2 in your team chat to determine if further escalation is needed.<br>SO: " + refCheck);
								return;
								break;
							case (refType == "CC"):
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is a common cause issue currently in place for this customers area. Do not continue with this repair ticket, inform customer of issue.<br><a href='https://www.ihd.frontiernet.net/TechManual/common_causes/index.html' target='_blank'>View the Wiki Page here. /a> Need help? Contact a L2 in your team's chat room.<br>CC Ticket: " + refCheck + "<br>CC Commit:" + refCommitDate + " " + refCommitTime);
								return;
								break;
							case (refStage == "DIS" && refType == "DS"):
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is already an active ticket in place on this account. Do not place another repair ticket on this account. Need help? Try viewing the active ticket in Viryanet. For further assistance contact a L2 in your team chat room.<br>Ticket: " + refCheck + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
							case (refStage == "TEN"):
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an active repair ticket in place on this account. The repair ticket is currently being worked (there is a repair tech in the field).<br>Inform the customer of this. For further assistance contact a L2 in your team chat room.<br>Ticket Number: " + refCheck);
								return;
								break;
							case (refStage == "***"):
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an unstaged repair ticket on this account, contact a L2 in your team chat room to have this problem resolved.");
								return;
								break;
							case (refType == "RS"):
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an active residential service repair ticket on this account<br>Message a L2 in your team chat room for further assistance.<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
							case (refType == "BS"):
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is an active business service repair ticket on this account.<br>Message a L2 in your team chat room for further assistance.<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
							default:
								var refCommitDate = xmldoc.getElementsByTagName("date");
								var refCommitTime = xmldoc.getElementsByTagName("time");
								if (refCommitDate && refCommitTime) {
									if (refCommitDate.length > 0 && refCommitTime.length > 0) {
										if (refCommitDate[0].childNodes.length > 0 && refCommitTime[0].childNodes.length > 0) {
											refCommitDate = refCommitDate[0].childNodes[0].nodeValue;
											refCommitTime = refCommitTime[0].childNodes[0].nodeValue;
										}
									}
								}
								else {
									refCommitDate = null;
									refCommitTime = null;
								}
								_("login").style.display = 'inline';
								_("afterVerified").style.display = 'none';
								clearTicketInfo();
								_("s").style.display = 'inline';
								_("l").style.display = 'none';
								_("wtn").focus();
								_("v").style.display = 'inline';
								_("vl").style.display = 'none';
								createError("There is a repair ticket currently in place on this account. Message an L2 in your team chat room for further assistance.<br>Type: " + refType + "<br>Stage: " + refStage + "<br>Commit: " + refCommitDate + " " + refCommitTime);
								return;
								break;
						}
					}
				}
			}
			var ticketNumber = xmldoc.getElementsByTagName("ticketnumber");
			if (ticketNumber) {
				if (ticketNumber.length > 0) {
					if (ticketNumber[0].childNodes.length > 0) {
						ticketNumber = ticketNumber[0].childNodes[0].nodeValue;
						if (ticketNumber == "000000") {
							createNotice("ATTENTION", "The ticket tool is in backlog mode right now, quote the customer 24/48 hours, THIS TICKET INFO IS NOT CORRECT.<br>There is no ticket numbers at this time, they will be entered when the endeavor system is online again.<br><span style='font-size: 30px;'>The ticket will be worked in 24-48 Business Hours (Mon - Fri)</span>");
						}
						if (xmldoc.getElementsByTagName("ce").length > 0) {
							commitdate = null;
							committime = null;
						}
						else {
							var commitdate = xmldoc.getElementsByTagName("date");
							var committime = xmldoc.getElementsByTagName("time");
							if (commitdate && committime) {
								if (commitdate.length > 0 && committime.length > 0) {
									commitdate = commitdate[0].childNodes[0].nodeValue;
									if (isSunday(commitdate + '/' + (new Date()).getFullYear())) {
										if (window.confirm('Please verify that the customer would like a technician to visit on Sunday.  If the customer would like a technician to visit on Monday instead, please click OK and follow the instructions on the next page to revise the commit date.  If Sunday is fine, click Cancel.')) {
											window.open('https://www.ihd.frontiernet.net/repair_tick/cdpi/14.htm', '_blank');
										}
									}
									committime = committime[0].childNodes[0].nodeValue;
								}
								else {
									commitdate = null;
									committime = null;
								}
							}
							else {
								commitdate = null;
								committime = null;
							}
						}
					}
					else {
						commitdate = null;
						committime = null;
					}
					if (xmldoc.getElementsByTagName("ce").length > 0) {
						commitdate = "1 - 2 Business Days";
						committime = '-';
					}
					else {
						var d = new Date();
						var datesplit = commitdate.split("/");
						var timesplit = committime.split(":");
						d.setHours(timesplit[0]);
						d.setMinutes(timesplit[1]);
						d.setMonth(datesplit[0]);
						d.setDate(datesplit[1]);
						if ($('#newcommittype').val() == '0') {
							/*if (d.getHours() >= 17) {
								createNotice("ATTENTION", "<span style='font-size: 18px; font-weight: bold;'>For tickets quoted after 5PM, Techs will try to be out by 5PM, but it may be pushed to the next day. Please inform the customer.</span>");
							}
							if (d.getDay() == 0 || d.getDay() == 6) {
								createNotice("ATTENTION", "<span style='font-size: 18px; font-weight: bold;'>Tickets quoted on weekends are generally worked the following business day (monday - friday), please inform the customer.</span>");
							}*/
						}
					}
					_("afterVerified").style.display = "none";
					_("ticketNumber").innerHTML = ticketNumber;
					_("commitDate").innerHTML = commitdate;
					if ($('#newcommittype').val() == '0') {
						_("commitTime").innerHTML = committime;
					}
					else {
						_("commitTime").innerHTML = ''.concat(cstart, ' - ', cend);
					}
					//_("commit").style.display = "inline";
					_("info").style.display = "inline";
					_("finish").style.display = "inline";
	                try {
		                if (xmldoc.getElementsByTagName("aftermessage").length > 0) {
			                if (xmldoc.getElementsByTagName("aftermessage")[0].childNodes[0].nodeValue.length > 0) {
				                createNotice('ATTENTION', xmldoc.getElementsByTagName("aftermessage")[0].childNodes[0].nodeValue);
			                }
		                }
	                } catch(e) {
		                console.error(e);
	                }
					return;
				}
			}
		}
		else {
			params = new Array();
			params.push(new Array('lanid', _("lanid").value));
			params.push(new Array('error', 'Missing document element in submit ticket, line 959: response: ' + urlencode(ticketAjax.getAjax().responseText)));
			errorAjax.addRequest('error.php', params);
			if (brandon()) {
				window.location.href = "xmpp:ty.mcguire@telenetwork.com?message&amp;subject=tt&amp;body=Missing%20document%20element%20in%20submitTicket,%20response:%20" + urlencode(ticketAjax.getAjax().responseText);
			}
			else {
			}
			alert("Unexpected error.\r\nClick ok to send error report and reload the page.");
			window.location.href = unescape(window.location.pathname);
			return;
		}
	}
}

function fiosIssueSwitch(sel) {
	_("voiceContain").style.display = 'none';
	_("dataContain").style.display = 'none';
	_("videoContain").style.display = 'none';
	_("ftvVoiceContain").style.display = 'none';
	_("ftvDataContain").style.display = 'none';
	_("ftvVideoContain").style.display = 'none';
	_('speedoptions1').style.display = 'none';
	_('speedoptions2').style.display = 'none';
	_('vapid').style.display = 'none';

	//alert(_("customerType").value + " -- " + sel.value);

	if (_("customerType").value == "fiber") {
		if (sel.value == "voice") {
			_("voiceContain").style.display = '';
		} else if (sel.value == "data") {
			_("dataContain").style.display = '';
		} else if (sel.value == "video") {
			_("videoContain").style.display = '';
		}
	}
	else if (_("customerType").value == "ftv") {
		if (sel.value == "voice") {
			_("ftvVoiceContain").style.display = '';
		} else if (sel.value == "data") {
			_("ftvDataContain").style.display = '';
		} else if (sel.value == "video") {
			_("ftvVideoContain").style.display = '';
			_('vapid').style.display = '';
		}
	}
}

function speedSwitch(sel) {
	if (sel.options[sel.selectedIndex].attributes['speed']) {
		annoyingslowspeedpopupfunction();
	}
	else {
		$('#speedoptions1').hide();
		$('#speedoptions2').hide();
	}
	/*if (sel.selectedIndex == 5) {
        annoyingslowspeedpopupfunction();
    }
    else {
        _('speedoptions1').style.display = 'none';
        _('speedoptions2').style.display = 'none';
    }*/
}

function issue_switch(sel) {
	clearNotice();
	if (sel.options[sel.selectedIndex].attributes['satlights']) {
		$('#satlights').show();
		$('#sanIDtr').show();
	}
	else {
		$('#satlights').hide();
		$('#sanIDtr').hide();
	}

	if (sel.options[sel.selectedIndex].innerText.match(/modem/i)) {
		showModemNotice();
	}

	if (sel.options[sel.selectedIndex].attributes['speed']) {
		annoyingslowspeedpopupfunction();
	}
	else {
		$('#speedoptions1').hide();
		$('#speedoptions2').hide();
	}

	if (sel.options[sel.selectedIndex].attributes['snr']) {
		$('#snrRow').show();
		$('#attenuationRow').show();
		$('#snr').focus();
	}
	else {
		$('#snrRow').hide();
		$('#attenuationRow').hide();
	}
	/*
    if (sel.selectedIndex >= 9 && sel.selectedIndex <= 12) {
        if (sel.selectedIndex == 12) {
            _('satlights').style.display = '';
        }
        else {
            _('satlights').style.display = 'none';
        }
        _('sanIDtr').style.display = '';
    }
    else {
        _('satlights').style.display = 'none';
        _('sanIDtr').style.display = 'none';
    }
    if (sel.selectedIndex == 5) {
        _('subOptions').style.display = 'block';
        _('subissue').focus();
        showModemNotice();
    }
    else {
        clearNotice();
        _('subOptions').style.display = 'none';
        _('subissue').selectedIndex = 0;
    }
    if (sel.selectedIndex == 2) {
        annoyingslowspeedpopupfunction();
    }
    else {
        _('speedoptions1').style.display = 'none';
        _('speedoptions2').style.display = 'none';
    }
    if (sel.selectedIndex != 0 && sel.selectedIndex != 1 && sel.selectedIndex != 5 && sel.selectedIndex != 7 && !(sel.selectedIndex >= 9 && sel.selectedIndex <= 12)) {
        _('snrRow').style.display = 'block';
        _('attenuationRow').style.display = 'block';
        _('snr').focus();
    }
    else {
        _('snrRow').style.display = 'none';
        _('attenuationRow').style.display = 'none';
    }*/
	/*
     if(sel.selectedIndex == 13) {
     _("loop_stuff_1").style.display = "block";
     _("loop_stuff_2").style.display = "block";
     _("loop_stuff_3").style.display = "block";
     _("loop_stuff_4").style.display = "block";
     }
     else {
     _("loop_stuff_1").style.display = "none";
     _("loop_stuff_2").style.display = "none";
     _("loop_stuff_3").style.display = "none";
     _("loop_stuff_4").style.display = "none";
     }*/
}
