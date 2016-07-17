$(document).ready(function(){
	$.support.cors = true;

	$('.search-partners__button').on('click',function(event){
		event.preventDefault();
		searchInit();
	});

	$('.search-partners__form').keydown(function (event) {
		if(event.keyCode == 13){
			event.preventDefault();
		}
		searchInit();
	});
	
    $('.jcarousel').jcarousel({
			animation: 'slow',
			wrap: 'circular'
		})
			.jcarouselAutoscroll({
			interval: 3000,
			target: '+=1',
			autostart: true
		});
		$('.arrows__prev')
			.jcarouselControl({
			target: '-=1'
		});
		$('.arrows__next')
			.jcarouselControl({
			target: '+=1'
		});

	search ('');

	function searchInit () {
		var query = $('.search-partners__input').val();

		if (query) {
			search(query);
		}
	}

	function search (q) {
		$.ajax({
			url:
			window.location.protocol + '//pixabay.com/api/?key=2737954-40cb35066be026a3dec61f25f&q='+encodeURIComponent(q)+'&image_type=photo&per_page=20',

			success: function(data){
				if(data.hits.length>0){
					updImage(data.hits);
				}
			}
		});
	}

	function updImage(pic) {
		var url = '';
		var random;

		$('.activities__link').each(function (index,elem) {
			random = Math.round(Math.random()*19);
			url = 'url("'+ pic[random].webformatURL + '") no-repeat center';
			$(elem).css("background", url);
			$('.activities__text').eq(index).text(pic[random].tags);
		});

		initIsotope();
	}

	function initIsotope() {
		var elem = document.querySelector('.activities__ideas');
		var isotopeInst = new Isotope( elem, {
			itemSelector: '.activities__item',
			layoutMode: 'masonry',
			transitionDuration: '1.6s',
			masonry: {
				gutter: 20
			}
		});
	}
});
