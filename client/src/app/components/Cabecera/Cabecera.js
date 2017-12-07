import React, { Component } from 'react'
import moment from 'moment'


class Cabecera extends Component {
	constructor(props) {
		super(props)
	}


	render() {
		// const customStyles = {
		//     datosCabecera: {
		//   		height: '40vh',
		//   		position: 'none',
		//   		display: `${this.props.displayInView}`
		//   	}
		// }
		
		// alert(this.props.displayInView)

		return <div className={`${this.props.styleData}`}>
			<div className='row'>
				<div className='col-xs-2 col-sm-3 col-md-3 col-lg-2'>
					<img className='img-responsive' src='http://localhost:8080/images/logo.jpg'/>	
				</div>
				<div className='col-xs-5 col-sm-4 col-md-4 col-lg-4'>	
					<h3 className='text-center'>Unidad de Salud Familiar</h3>
				</div>
			</div>

			<div className='row'>
				<div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					<h4 className='text-right'><strong>Fecha de creación:</strong>
						{ moment(this.props.fechaTratamiento).format('DD-MM-YYYY') }
					</h4>
				</div>
			</div>
		</div>
	}
}

export default Cabecera