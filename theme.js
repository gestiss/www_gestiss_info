( function( $ ) {
	// Responsive videos
	var all_videos = $( '.entry-content' ).find( 'iframe[src^="http://player.vimeo.com"], iframe[src^="http://www.youtube.com"], iframe[src^="http://www.dailymotion.com"], object, embed' ),
    	input = document.createElement( 'input' ),
    	i;

	all_videos.each(function() {
		var el = $(this);
		el
			.attr( 'data-aspectRatio', el.height() / el.width() )
			.attr( 'data-oldWidth', el.attr( 'width' ) );
	} );

	$(window)
		.resize( function() {
			all_videos.each( function() {
				var el = $(this),
					newWidth = el.parents( '.entry-content' ).width(),
					oldWidth = el.attr( 'data-oldWidth' );

				if ( oldWidth > newWidth ) {
					el
						.removeAttr( 'height' )
						.removeAttr( 'width' )
					    .width( newWidth )
				    	.height( newWidth * el.attr( 'data-aspectRatio' ) );
				}
			} );
		} )
		.resize();

	// Placeholder fix for older browsers
    if ( ( 'placeholder' in input ) == false ) {
		$( '[placeholder]' ).focus( function() {
			i = $( this );
			if ( i.val() == i.attr( 'placeholder' ) ) {
				i.val( '' ).removeClass( 'placeholder' );
				if ( i.hasClass( 'password' ) ) {
					i.removeClass( 'password' );
					this.type = 'password';
				}
			}
		} ).blur( function() {
			i = $( this );
			if ( i.val() == '' || i.val() == i.attr( 'placeholder' ) ) {
				if ( this.type == 'password' ) {
					i.addClass( 'password' );
					this.type = 'text';
				}
				i.addClass( 'placeholder' ).val( i.attr( 'placeholder' ) );
			}
		} ).blur().parents( 'form' ).submit( function() {
			$( this ).find( '[placeholder]' ).each( function() {
				i = $( this );
				if ( i.val() == i.attr( 'placeholder' ) )
					i.val( '' );
			} );
		} );
	}

	// Mobile menu
	$( '#header' ).on( 'click', '#mobile-menu a', function() {
		if ( $(this).hasClass( 'left-menu' ) )
			$( 'body' ).toggleClass( 'left-menu-open' );
		else
			$( '#drop-down-search' ).slideToggle( 'fast' );
	} );

	$( '#secondary, #left-nav' ).on( 'click', '.sub-menu-parent > a', function(e) {
		e.preventDefault();
		$(this).toggleClass( 'open' ).parent().find( '.sub-menu:first' ).toggle();
	} );

	var id = ( $( 'body' ).hasClass( 'left-sidebar' ) ) ? $( '#secondary' ) : $( '#left-nav' );
	Harvey.attach( 'screen and (max-width:768px)', {
      	setup: function() {
      		id.addClass( 'offcanvas' );
	      	$( '#site-navigation' ).prependTo( id ).show();
      	},
      	on: function() {
      		id.addClass( 'offcanvas' );
	      	$( '#site-navigation' ).prependTo( id );
			$( '.widget_search' ).hide();
      	},
      	off: function() {
      		id.removeClass( 'offcanvas' );
      		$( 'body' ).removeClass( 'left-menu-open' );
	      	$( '#secondary, .widget_search' ).show();
			$( '#site-navigation' ).appendTo( '#header .c12' );
			$( '#drop-down-search' ).hide();
      	}
    } );

	// Image anchor
	$( 'a:has(img)' ).addClass('image-anchor');

	$( 'a[href="#"]' ).click( function(e) {
		e.preventDefault();
	});
} )( jQuery );