"use strict";
const JSCCommon = {
	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() {
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
};

const $ = jQuery;
if(typeof(galloop)!='undefined')var galloopp=galloop;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const sBestDealsSlider = new Swiper('.sBestDeals__slider--js', {
		slidesPerView: 1,
	/*	loop: true, */
		slideToClickedSlide: true,
		watchOverflow: true,
		spaceBetween: 20,
		lazy: {
			loadPrevNext: true,
		},
		pagination: {
			el: ' .sBestDeals  .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
		navigation: {
			nextEl: '.sBestDeals .swiper-button-next',
			prevEl: '.sBestDeals .swiper-button-prev',
		},
		breakpoints: {
			428: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 20
			},
			992: {
				slidesPerView: 4,
				spaceBetween: 20
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 30
			}
		}
	});

	const sAboutSlider = new Swiper('.sAbout__slider--js', {
		slidesPerView: 'auto',
		loop: true,
		slideToClickedSlide: true,
		watchOverflow: true,
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},

		navigation: {
			nextEl: '.sAbout .swiper-button-next',
			prevEl: '.sAbout .swiper-button-prev',
		},
	});

	if(typeof(galloop1)=='undefined')var galloop1=true; 
	const sCatalogItemSlider = new Swiper('.sCatalogItem__slider--js', {
		slidesPerView: 'auto',
		loop: galloopp,
		slideToClickedSlide: true,
		watchOverflow: true,
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},

		navigation: {
			nextEl: '.sCatalogItem .swiper-button-next',
			prevEl: '.sCatalogItem .swiper-button-prev',
		},
	});

	const sServicesSlider = new Swiper('.sServices__slider--js', {
		slidesPerView: 2,
		grid: {
			rows: 2,
			fill:	'row',
		},
		// loop: true,
		// slideToClickedSlide: true,
		// watchOverflow: true,
		spaceBetween: 23,
		// lazy: {
		// 	loadPrevNext: true,
		// },
		navigation: {
			nextEl: '.sServices .swiper-button-next',
			prevEl: '.sServices .swiper-button-prev',
		},
		pagination: {
			el: '.sServices .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
			},
			// when window width is >= 640px
			992: {
				slidesPerView: 4,
				spaceBetween: 30
			}
		}
	});
	const breadSlider = new Swiper('.bread-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
		spaceBetween: 0,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// slideToClickedSlide: true,
		// freeModeMomentum: true,

	});
	const filterHeadSlider = new Swiper('.filter-head__slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
		spaceBetween: 0,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// slideToClickedSlide: true,
		// freeModeMomentum: true,

	});
	// modal window

	var interleaveOffset = 0.5;

	var swiperOptions = {
		loop: true,
		speed: 1000,
		grabCursor: true,
		watchSlidesProgress: true,
		mousewheelControl: true,
		keyboardControl: true,
		autoplay: {
					delay: 5000,
				},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
				pagination: {
				el: ".swiper-pagination",
				type: 'bullets',
				clickable: true,
			},
			on: {
				progress: function() {
					var swiper = this;
					for (var i = 0; i < swiper.slides.length; i++) {
						var slideProgress = swiper.slides[i].progress;
						var innerOffset = swiper.width * interleaveOffset;
						var innerTranslate = slideProgress * innerOffset;
						swiper.slides[i].querySelector(".headerBlock picture").style.transform = 
							"translate3d(" + innerTranslate + "px, 0, 0)"; 
					}      
				},
				touchStart: function(swiper) { 
					for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.transition = "";
					} 
				},
				setTransition: function(swiper, transition) { 
					for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.transition = transition + "ms";
						swiper.slides[i].querySelector(".headerBlock picture").style.transition = 
						transition + "ms";
					} 
				}
			}
	};
	
	var sliderLength = $('.headerBlock__slide').length;
	if (sliderLength > 1) {
		var swiper144 = new Swiper(".headerBlock__slider--js", swiperOptions);
	} else {
		$('.headerBlock__slider').addClass('single');
	}

	// const headerBlockSlider = new Swiper('.headerBlock__slider--js', {
	// 	slidesPerView: 1,
	// 	loop: true,
	// 	autoplay: true,
	// 	pagination: {
	// 		el: ' .headerBlock .swiper-pagination',
	// 		type: 'bullets',
	// 		clickable: true,
	// 	},
	// 	navigation: {
	// 		nextEl: '.headerBlock .swiper-button-next',
	// 		prevEl: '.headerBlock .swiper-button-prev',
	// 	},
	// });
	$(document).on("click", ".filter-toggle-js", function(){
		$(".filter-block--js").toggleClass("active")
		$("body").toggleClass("fixed")
	})
	$(document).on("click", ".filter-close-js", function(){
		$(".filter-block--js").removeClass("active")
		$("body").removeClass("fixed")
	})
	$(document).on("click", ".filter-map-close-js", function(){
		$('.filter-block--map').css({'visibility':'hidden'});
/*		$('.filter-block--map').hide();
		$(".filter-block--js").toggleClass("active"); */
	})

	$(".btn-tab").click(function(e){
		$(".btn-tab").removeClass("active")
		$(this).addClass("active")
		e.preventDefault();
		let tab = $(this).attr("href");
		$(`.tabs__block:not(${tab})`).hide();
		$('.filter-block--map').css({'visibility':'visible'});
		$(tab).fadeIn()
	})

	$(document).on('click', '.main-page a.sSearch__btn', function(e){
		let filterNaz=0;
		e.preventDefault();if(!$(this).data('p'))return false;
		var pageNum=Number(document.querySelector('a.sSearch__btn').dataset.p)+1;
		let query=filterParams;
		query.p=pageNum;
		$.get('/objects', query, function(data){
		if(typeof(data)=='undefined' || !data || !data.objects.length)return false;
		let clas,href,data_p,html=getObjectsHtml(data.objects);
		let $this=document.querySelector('a.sSearch__btn');
		if(pageNum<data.pages)$this.dataset.p=pageNum;
		else $this.style.display='none';
		$('#object_list').append(html);
		}, 'json');
	});

	$(document).on("click", "a.page-numbers,.pager-numbers .prev,.pager-numbers .next", function(e){
		let filterNaz=0;
		if(typeof(objNaz)!='undefined' && objNaz)filterNaz=objNaz;
		e.preventDefault();if(!$(this).data('p'))return false;
		var pageNum=$(this).data('p');
		let query=filterParams;
		query.p=pageNum;
		if(filterNaz)query.naz=filterNaz;
		$.get('/objects', query, function(data){
		if(typeof(data)=='undefined' || !data || !data.objects.length)return false;
		let html=getObjectsHtml(data.objects),phtml=getPaginationHtml(data.pages,pageNum);
		$('.pager-numbers').html(phtml);
		$('#object_list').html(html);
		window.scroll(0,document.querySelector('#object_list').getBoundingClientRect().top+pageYOffset-180);
		}, 'json');
	});
	
	$('#apply_filter').on('click', function(){
		
		let query={},filterNaz=[],filterRegion=[],filterRoad=[];
		if($(this).hasClass('mapfilter'))query.map=1;
		$('[name="objectnaz2[]"]').each(function(){if($(this).prop('checked'))filterNaz.push($(this).val());});
		$('[name="region[]"]').each(function(){if($(this).prop('checked'))filterRegion.push($(this).val());});
		$('[name="road[]"]').each(function(){if($(this).prop('checked'))filterRoad.push($(this).val());});
		if($('[name="dist-min"]').val())query.dmin=$('[name="dist-min"]').val();
		if($('[name="dist-max"]').val())query.dmax=$('[name="dist-max"]').val();
		if($('[name="area-min"]').val())query.amin=$('[name="area-min"]').val();
		if($('[name="area-max"]').val())query.amax=$('[name="area-max"]').val();
		if($('[name="price-min"]').val())query.pmin=$('[name="price-min"]').val();
		if($('[name="price-max"]').val())query.pmax=$('[name="price-max"]').val();
		if(filterNaz.length)query.naz=filterNaz;
		if(filterRegion.length)query.reg=filterRegion;
		if(filterRoad.length)query.rd=filterRoad;

		filterParams=query;

		$.get('/objects', query, function(data){
		let html,phtml;
		if(typeof(data)!='undefined' && data && data.objects.length){
			html=getObjectsHtml(data.objects),phtml=getPaginationHtml(data.pages,1);
		}else{html='<p style="padding-top: 50px;font-size: 32px;font-weight:600;">Поиск не дал результатов</p>';phtml=getPaginationHtml(1,1);}
		$('.pager-numbers').html(phtml);
		$('#object_list').html(html);
		if(typeof(data.objects_map)!='undefined' && data.objects_map.length){
		var mapFeatures=[];
		for(let i=0;i<data.objects_map.length;i++){
			let obj=data.objects_map[i],longlat=obj.coords.split(','), coords=[Number(longlat[0]),Number(longlat[1])];
			let price=(obj.price&&obj.price!='0')?(new Intl.NumberFormat('ru-RU').format(obj.price))+' ₽':'Цена по запросу';
			let area=(obj.area&&obj.area!='0')?obj.area+' га':'';
			mapFeatures.push({
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: coords,
					},
					properties: {
						balloonContentBody: balloonBody(obj.title,price,objectNaz[obj.objectnaz].title,area,'/catalog/'+objectNaz[obj.objectnaz].name+'/'+obj.name),
						balloonPanelMaxMapArea: 0,
						iconContent: '<i class="map-icon ico-'+obj.objectnaz+'"></i>'
					},
					options: { 
						preset:  'islands#circleIcon',
						iconColor: 'transparent'
					}
				});
		}
		myObjects2.removeFromMap(myMap4);
		myObjects2 = ymaps.geoQuery({
			type: "FeatureCollection",
			features: mapFeatures
		}).addToMap(myMap4);
		}else if(typeof(data.objects_map)!='undefined')myObjects2.removeFromMap(myMap4);
		$('.filter-block__close').click();
		if(typeof($('#o_count')[0])!='undefined'){
			$('#o_count').text(data.count);
			window.scroll(0,document.querySelector('#o_count').getBoundingClientRect().top+pageYOffset-150);
		}else if(typeof($('.sSearch__row-head')[0])!='undefined')window.scroll(0,document.querySelector('.sSearch__row-head').getBoundingClientRect().top+pageYOffset-150);

		let sSearch=document.querySelector('.main-page a.sSearch__btn');
		sSearch.dataset.p=1;sSearch.style.display=data.pages>1?'inline-block':'none';

		$('.filter-head__btn').removeClass('active')
		$('.filter-head__btn[data-sort="date"]').addClass('active')
		}, 'json');
	});
	
	$('.filter-head__btn').on('click', function(){
		let sort=$(this).data('sort'),query=filterParams,$this=this;
		query.sort=sort;
		query.p=1;

		$.get('/objects', query, function(data){
		let html,phtml;
		if(typeof(data)!='undefined' && data && data.objects.length){
			html=getObjectsHtml(data.objects),phtml=getPaginationHtml(data.pages,1);
			$('.pager-numbers').html(phtml);
			$('#object_list').html(html);
		}
		$('.filter-head__btn').removeClass('active')
		$($this).addClass('active')
		if(data.pages>1)document.querySelector('.main-page a.sSearch__btn').style.display='inline-block';
		}, 'json');
	});
	
	$('#del_filter').on('click', function(){
		$('.filter-block [type="checkbox"]').each(function(){
			if(typeof(prechecked[$(this).attr('name')])=='undefined'||prechecked[$(this).attr('name')]!=$(this).attr('value')) $(this).prop('checked',false);
		});
		$('.filter-block [type="text"]').val('');
		if(typeof($('#o_count')[0])!='undefined'){
			if(typeof(data)!='undefined' && data)$('#o_count').text(data.count);
			else $('#o_count').text('0');
			window.scroll(0,document.querySelector('#o_count').getBoundingClientRect().top+pageYOffset-150);
		}else if(typeof($('.sSearch__row-head')[0])!='undefined')window.scroll(0,document.querySelector('.sSearch__row-head').getBoundingClientRect().top+pageYOffset-150);
		document.location.reload();
	});

	$('input[name="region[]"][value="2"]').on('change', function(){if($(this).prop('checked')) $('.mosreg').show();
	else{$('input[name="road[]"]').prop('checked',false);$('input[name="dist-min"],input[name="dist-max"]').val('');$('.mosreg').hide();}});

	$("#feedback form,#request form,.request form").on('submit', function(){var result,$this=$(this),str=$(this).serialize();$this.find('[type="submit"]').hide();$.ajax({type:"POST",url:"/proc/"+$this.data('type'),data:str,success:function(msg){$this.find('[type="submit"]').show();if(msg=='OK'){result='<div class="ok">Ваше сообщение получено. В ближайшее время мы Вам перезвоним.</div>';$this.trigger('reset');}else{result='<div class="err">'+msg+'</div>';$this.find('input').each(function(){if(!$(this).val())$(this).addClass('red-label')});};$this.find('.response').html(result);}});return false;});
	$('.menu-item a[href="/services"]').removeAttr('href');

};

function getObjectsHtml(objects){
	let html='';
	for(let i=0;i<objects.length;i++){
		let obj=objects[i];
		    html+='<div class="'+class_obj+'col-lg-4 col-6"><div class="product-item">'+
				'<a href="/catalog/'+obj.naz_name+'/'+obj.name+'" target="_blank"><picture>'+
				'<img class="object-fit-js" src="'+obj.isrc+'" alt="" loading="lazy"/></picture></a>'+
				'<h6><a class="text-body" href="/catalog/'+obj.naz_name+'/'+obj.name+'" target="_blank">'+obj.title+'</a></h6>'+
				'<table><tr><td>Тип</td><td>'+obj.naz_title+'</td></tr>'+
				'<tr><td>Адрес</td><td>'+obj.address+'</td></tr>'+
				'<tr><td>Площадь</td><td>'+obj.area+'</td></tr></table>'+
				'<div class="product-item__price">'+(obj.price?obj.price:'Цена по запросу')+'</div>'+
				'<a class="product-item__btn" href="/catalog/'+obj.naz_name+'/'+obj.name+'" target="_blank">Подробнее</a></div></div>';
	}
	return html;
}

function getPaginationHtml(pages,pageNum){
	let clas,href,data_p,pstyle='',nstyle='';
	if(pageNum==1)pstyle=' style="visibility: hidden;"';if(pageNum==pages)nstyle=' style="visibility: hidden;"';
	let html='<li><a class="prev" href="#"'+pstyle+' data-p="'+(pageNum-1)+'">'+
			'<svg class="icon icon-arrow-left "><use xlink:href="/img/svg/sprite.svg#arrow-left"></use></svg></span></li>';
		if(pages>1)for (let i=1;i<pages+1;i++){
		  if(i!=pageNum){clas = '';href = ' href="#"';data_p = ' data-p="'+i+'"';}
		  else{clas = ' current';href = '';data_p= '';}
		  html+='<li><a class="page-numbers'+clas+'"'+href+data_p+'>'+i+'</a></li>';
		}
		html+='<li><a class="next" href="#"'+nstyle+' data-p="'+(pageNum+1)+'">'+
				'<svg class="icon icon-arrow-right "><use xlink:href="/img/svg/sprite.svg#arrow-right"></use></svg></a></li>';
	return html;
}

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
