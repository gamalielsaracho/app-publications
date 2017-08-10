import React, { Component } from 'react'

class Nosotros extends Component {
	render() {

		var coter = {
			border: '1px solid red'
		}

		return <div id='nosotros' className='container work-sans'>
			<h2 className='text-center'>Nosotros</h2>

			<div className='row between-xs between-sm between-md between-lg'>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-5'>
					<h3 className='text-center'>Misión</h3>
					<p className='text-justify nosotros__text-descripcion'>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur.
					</p>
				</div>
				<div className='col-xs-12 col-sm-6 col-md-6 col-lg-5'>
					<h3 className='text-center'>Visión</h3>
					<p className='text-justify nosotros__text-descripcion'>
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