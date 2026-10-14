"use strict";

$(function() {

	// Checks if the screen has proper size.
	const minWidth = 925;
	const minHeight = 375;

	if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
		document.getElementById('scrollDownHint').remove();
		let div = document.querySelector('#index-page > div.flexible');
		div.getElementsByTagName('h1')[0].innerHTML = 'Your screen is too small!';
		div.getElementsByTagName('h2')[0].innerHTML = 'We support only screens bigger than ' + minWidth + 'x' + minHeight + '.';

		throw new Exception("Your screen is too small!");
	}


	// Scrolling
	window.addEventListener("wheel", function(e) {
		let offset = (e.deltaY > 0) ? window.innerHeight : -window.innerHeight;
		$('body, html').scrollBy(offset, function() {
			let scrollTop = $(this).scrollTop();

			if ((scrollTop % window.innerHeight) != 0) {
				let page = Math.round(scrollTop / window.innerHeight);
				let rightOffset = window.innerHeight * page;
				$(this).scrollBy( rightOffset - scrollTop );
			}
		});
	});


	// Images on the index and last pages
	let welcomeImgLoader = new ImageLoader('Loli reads comics about himself', [444, 342]);
	welcomeImgLoader.getImage().className += ' closer';
	welcomeImgLoader.getElement().className += ' no-page-img';
	document.querySelector('#index-page > div.flexible').appendChild(welcomeImgLoader.getElement());
	welcomeImgLoader.load('images/phone.png');

	let lastImgLoader = new ImageLoader('Loli loves you', [518, 306]);
	lastImgLoader.getImage().className += ' closer';
	lastImgLoader.getElement().className += ' no-page-img';
	document.querySelector('#last-page > div.flexible').appendChild(lastImgLoader.getElement());
	lastImgLoader.load('images/love.png');


	// 1st page
	Page.setOrigin(1);		// Since we have the index page, we must set a new value of the origin.
	let p1 = new Page(1);
	p1.setMap(
		[p1o1, p1o2],
		[toPage2, toPage3]
	);

	let hint = new Image();
	hint.id = 'chooseOptionHint';
	hint.className = 'hint';
	hint.src = 'images/choose.png';
	p1.getElement().appendChild(hint);

	p1.append(getScene());
	
});


function getScene() {
	return document.getElementById('comics-pages');
}