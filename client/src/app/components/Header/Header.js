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
		let styles = {
			headerContainer1: {
				// backgroundColor:'#F43838',
				background:'url(https://dempsey-siders.com/wp-content/uploads/2014/08/dempseyPageHeaderHealth.jpg)',
				backgroundSize:'cover',
				backgroundPosition:'center',
				backgroundRepeat:'no-repeat',
				height:'100%',
				paddingTop:'80px',
				width:'auto'
			},
			headerContainer2: {
				// backgroundColor:'#F43838',
				background:'url(http://localhost:8080/images/header.jpg)',
				backgroundSize:'cover',
				backgroundPosition:'center',
				backgroundRepeat:'no-repeat',
				height:'100%',
				paddingTop:'80px',
				width:'auto'
			}
		}

		return <div id='inicio' className="carousel carousel-slider center" data-indicators="true">
		    <div className="carousel-item" href="#one!">
		    	<div style={styles.headerContainer1}>
			      <h2>First Panel</h2>
			      <p className="white-text">This is your first panel</p>
		    	</div>
		    </div>
		    <div className="carousel-item red white-text" href="#two!">
		    	<div style={styles.headerContainer2}>
		      		<h2>Second Panel</h2>
			    	<p className="white-text">This is your second panel</p>
		    	</div>
		    </div>
  		</div>
	}
}

export default Header