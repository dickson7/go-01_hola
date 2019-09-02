(function ($, root, undefined) {
	//Facebook Script
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=1470033003324440";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	//Twitter Script
	!function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
		if (!d.getElementById(id)) {
			js = d.createElement(s);
			js.id = id;
			js.src = p + '://platform.twitter.com/widgets.js';
			fjs.parentNode.insertBefore(js, fjs);
		}
	}(document, 'script', 'twitter-wjs');
	$(function () {

		'use strict';

		if ($('#mobile-menu').length > 0) {
			new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('mp-trigger'));
		}

		$('.fbShare').click(function(){
			var width  = 575,
				height = 460,
				left   = ($(window).width()  - width)  / 2,
				top    = ($(window).height() - height) / 2,
				url    = this.href,
				opts   = 'status=1' +
					',width='  + width  +
					',height=' + height +
					',top='    + top    +
					',left='   + left;

			window.open(url, 'facebook', opts);
			return false;

			//var elem = $(this);
			//postToFeed(elem.data('title'), elem.data('desc'), elem.prop('href'), elem.data('image'));
            //
			//return false;
		});
		$('.twShare').click(function(event) {
			var width  = 575,
				height = 460,
				left   = ($(window).width()  - width)  / 2,
				top    = ($(window).height() - height) / 2,
				url    = this.href,
				opts   = 'status=1' +
					',width='  + width  +
					',height=' + height +
					',top='    + top    +
					',left='   + left;

			window.open(url, 'twitter', opts);
			return false;
		});
		$('.owl-carousel:not(.foro-empresarial)').owlCarousel({
			items: 3,
			nav: true,
			navText: [
				"<i class='icon icon-arrow-left'></i>",
				"<i class='icon icon-arrow-right'></i>"
			]
		});
		$('.owl-carousel.foro-empresarial').owlCarousel({
			items: 4,
			nav: true,
			navText: [
				"<i class='arrow-icon arrow-icon-arrow-left-circle'></i>",
				"<i class='arrow-icon arrow-icon-arrow-right-circle'></i>"
			]
		});
		$('.load-more').click(function() {
			var $loadMore_input = $(this);
			var oldTxt = $loadMore_input.val();
			$loadMore_input.val('CARGANDO...');
			var data = $loadMore_input.attr('data-cat') == null ?
			{
				action: $loadMore_input.attr('data-action'),
				paged: $loadMore_input.attr('data-paged'),
				dnd: $loadMore_input.attr('data-dnd')
			} :
			{
				action: $loadMore_input.attr('data-action'),
				cat: $loadMore_input.attr('data-cat'),
				paged: $loadMore_input.attr('data-paged'),
				dnd: $loadMore_input.attr('data-dnd')
			};
			$.ajax({
				url: wp_ajax.ajaxURL,
				dataType : 'json',
				data: data,
				success: function(response) {
					if (response['data'].length > 0) {
						var $items = $(response['data']);
						$($loadMore_input.attr('data-target')).append($items);
					}
					if (response['pages_left'] == 0) {
						$loadMore_input.addClass('no-more-posts');
					}
					else {
						$loadMore_input.val(oldTxt);
						$loadMore_input.attr('data-paged', (parseInt(response['paged']) + 1));
						$loadMore_input.attr('data-dnd', (parseInt(response['dnd'])));
					}
				},
			    error: function() {
			        console.log('Error!!');
			    }
			});
		});
		$('#event-register-button').click(function() {
			$(this).hide();
			$('#event-register').addClass('register');
		});
		$('.rsLink').click(function(e) {
			//e.preventDefault();
		});
		$('a.scroll').click(function(){
			$('html, body').animate({
				scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 500);
			return false;
		});
		$('footer').ready(function() {
			$(this).find('.footer-contact-button > a').attr('data-toggle', 'modal');
			$(this).find('.footer-contact-button > a').attr('data-target', '#footer-contact-modal');
		});

		$.widget( 'ui.dialog', $.ui.dialog, {
			options: {
				clickOutside: false,
				clickOutsideTrigger: ''
			},
			open: function() {
				var clickOutsideTriggerEl = $( this.options.clickOutsideTrigger );
				var that = this;
				if (this.options.clickOutside){
					$(document).on( 'click.ui.dialogClickOutside' + that.eventNamespace, function(event){
						if ( $(event.target).closest($(clickOutsideTriggerEl)).length == 0 && $(event.target).closest($(that.uiDialog)).length == 0){
							that.close();
						}
					});
				}
				this._super();
			},
			close: function() {
				var that = this;
				$(document).off( 'click.ui.dialogClickOutside' + that.eventNamespace );
				this._super(); // Invoke parent close method
			}
		});
		$('.rs-video').click(function(e) {
			createVideoModal("rs-video-modal", $(this).data('src'), ".rs-video", 1280, 720);
			e.preventDefault();
			e.stopPropagation();
		});
		$('.foro-video').click(function(){
			createVideoModal("foro-empresarial-modal", "https://www.youtube.com/embed/"+$(this).data('video-link'), ".foro-video", 640, 360);
		});
	});
	function createVideoModal(name, src, outsideTrigger, width, height) {
		var modal = '#'+name;
		$('body').append("<div id='"+name+"' style='overflow:hidden;'><iframe width='"+width+"' height='"+height+"' src='"+src+"' frameborder='0' allowfullscreen></iframe></div>");
		$(modal).ready(function(){
			$(modal).dialog({
				autoOpen: true,
				width: width,
				height: height,
				resizable: false,
				modal: true,
				closeOnEscape: true,
				draggable: false,
				clickOutside: true, // clicking outside the dialog will close it
				clickOutsideTrigger: outsideTrigger,
				create: function() {
					$('.ui-dialog').find('.ui-dialog-titlebar').css({
						'display': 'none'
					});
					$('.ui-widget-overlay.ui-front').ready(function(){
						$('.ui-widget-overlay.ui-front').css({
							'background': '#000000',
							'opacity': '0.7',
							'position': 'fixed',
							'top': '0',
							'left': '0',
							'width': '100%',
							'height': '100%',
							'z-index': '100'
						});
					});
					$(modal+', .ui-dialog').css({
						'padding': '0',
						'border': 'none',
						'position': 'relative',
						'z-index': '200'
					});
				},
				close: function() {
					$('.ui-dialog.ui-widget.ui-widget-content').remove();
					$(modal).remove();
				}
			});
		});
	}
	function postToFeed(title, desc, url, image){
		var obj = {method: 'feed', link: url, picture: image, name: title, description: desc};
		function callback(response){}
		FB.ui(obj, callback);
	}
})(jQuery, this);
