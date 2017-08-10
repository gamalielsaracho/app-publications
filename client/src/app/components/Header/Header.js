import React, { Component } from 'react'

class Header extends Component {

	componentDidMount() {
		// $('.carousel.carousel-slider').carousel({fullWidth: true});
		
		$('.carousel.carousel-slider').carousel({fullWidth: true});

		autoplay()   
		function autoplay() {
		    $('.carousel.carousel-slider').carousel('next');
		    setTimeout(autoplay, 4500);
		}
	}

	render() {
		return <div id='inicio' className="container-fluid wide">
			<h1 className='text-center'>Hola</h1>
  		</div>
	}
}

export default Header