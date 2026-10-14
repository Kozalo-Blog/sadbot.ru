DFT_BG_COLOR = 204;
SLIDER_REL_COLOR = 30;

PICS_COUNT = [ 27, 26 ];
PICS_URL = [ "pics/small/img", "pics/big/img" ];
COPYRIGHT_URLS = [ "http://viewangle.net/lechenie/proverka/test-na-dal-tonizm.html", "http://rosautopark.ru/page/23626" ];
PICS_MODE = 0;
ANS_BTN_MSG = [ "Проверить", "Далее" ];

wasAns = false;
picCounter = 1;

$(function() {
	$("body").css("background-color", grey2cssrgb(DFT_BG_COLOR));
	$("nav").css("opacity", 0).hide();
	$("#bgc-slider").css("background", grey2cssrgb(DFT_BG_COLOR+SLIDER_REL_COLOR));
	$(document).tooltip({ track: true, tooltipClass: "logotooltip" });
	
	createCheckButton("#bigpic_chkbx", "#bigpic-fig", {checked: "Маленькие изображения", unchecked: "Большие изображения"}, "ui-icon-zoomin", "ui-icon-zoomout", function(checked){		
		PICS_MODE = (checked) ? 1 : 0;
		loadPics();
	});
	
	createCheckButton("#white_chkbx", "#white-fig", {checked: "Чёрный текст", unchecked: "Белый текст"}, "ui-icon-refresh", null, function(checked){
		if (checked) {
			$("body, label, .logotooltip").css("color", "#AAA");
		} else {
			$("body, label, .logotooltip").css("color", "#666");
		}
	});
	
	$("#logo-fig button").button({ icons: { primary: "ui-icon-power" } })
	.on("click", function(event) {
		$("#logo-fig figcaption").animate({opacity: 0}, "fast");
		$("nav").show().animate({ opacity: 1 }, "slow");
		$("#logo-fig").animate({ "margin-top": "5px", "margin-left": "5px", "padding-right": "66%" }, "slow", function(){
			$(this).css({ "margin-bottom": 0, "height": "200px" });
			$("article").css("display", "block").animate({ opacity: 1 }, "fast");
		});
	});
	
	$("#bgc-slider").slider({
		orientation: "horizontal",
		min: 0,
		max: 255,
		value: DFT_BG_COLOR,
		slide: function(event, ui) {
			$("body").css("background-color", grey2cssrgb(ui.value));
			$("#bgc-slider").css("background", grey2cssrgb(ui.value+SLIDER_REL_COLOR));
			$("#bigpic-fig label").css("background", grey2cssrgb(ui.value+SLIDER_REL_COLOR));
			$("#white-fig label").css("background", grey2cssrgb(ui.value+SLIDER_REL_COLOR));
		}
	});
	
	loadPics();
	$("#send_answer").text(ANS_BTN_MSG[0]).on("click", clickAnswerBtn);
	$("#right_answer").tabs().hide();
	
	$("#congrats a").on("click", function(event){
		window.open($(this).attr("href"), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
		return false;
	});
});

function grey2cssrgb(value) {
	return "rgb(" + value + "," + value + "," + value + ")";
}

function createCheckButton(inpSelector, figSelector, newText, prIcon, secIcon, fActs, color)
{
	$(inpSelector).button({ icons: { primary: prIcon } });
	$(figSelector + " label").css("background", grey2cssrgb( (color) ? color : DFT_BG_COLOR+SLIDER_REL_COLOR));
	$(inpSelector).on("change", function(event) {
		if ($(this).prop("checked")) {
			$(this).button({ label: newText.checked, icons: { secondary: (secIcon) ? secIcon : prIcon } });
			fActs(true);
		} else {
			$(this).button({ label: newText.unchecked, icons: { primary: prIcon } });
			fActs(false);
		}
	})
}

function loadPics()
{
	var pics = $("#pics");
	pics.cycle("destroy").html("");
	picCounter = 1;
	wasAns = false;
	$("#send_answer").text(ANS_BTN_MSG[0]);
	$("#right_answer").hide();
	
	for (var i = 1; i <= PICS_COUNT[PICS_MODE]; i++)
		pics.append('<img src="' + PICS_URL[PICS_MODE] + i + '.jpg">');
		
	if (PICS_MODE) $("article img").addClass("artbigimg");
	else $("article img").removeClass("artbigimg");
	
	pics.cycle({ fx: "scrollHorz", "center-horz": true, "center-vert": true }).cycle("pause");
}

function clickAnswerBtn(event)
{
	if (wasAns) {
		if (picCounter >= PICS_COUNT[PICS_MODE]) {
			$("#congrats").dialog();
		} else {
			picCounter++;
			$("#right_answer").hide("fast", function(){ $(this).tabs({ active: 0 }); });
			$("#send_answer").text(ANS_BTN_MSG[0]);
			$("#pics").cycle("next");
			wasAns = !wasAns;
		}
	} else {
		$("#send_answer").text(ANS_BTN_MSG[1]);
		$("#ans").text(_Answers.getAns(picCounter, PICS_MODE));
		$("#inf").text(_Answers.getTxt(picCounter, PICS_MODE));
		$("#right_answer").show("slow");
		wasAns = !wasAns;
	}
}

// ### Universal Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-27525198-6', 'auto');
ga('send', 'pageview');
// ###