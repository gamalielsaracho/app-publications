import React, { Component } from 'react'

class Nosotros extends Component {
	render() {

		var coter = {
			border: '1px solid red'
		}

		return <div id='nosotros' className='container-fluid container-max'>
			<h2 className='center'>Nosotros</h2>

			<div className='row beetwen-lg around-md around-sm center-xs'>
				<div className='col-xs-12 col-sm-5 col-md-5 col-lg-5 container'>
					<h5 className='center'>Misión</h5>
					<p className='text-justify'>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur.
					</p>
				</div>
				<div className='col-xs-12 col-sm-5 col-md-5 col-lg-5 container'>
					<h5 className='center'>Visión</h5>
					<p className='text-justify'>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur.
					</p>
				</div>
			</div>

		</div>
	}
}

export default Nosotros