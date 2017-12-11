import React, { Component } from 'react'
import moment from 'moment'

import { horaActual } from '../../../globalActions'


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
				<div className='col-xs-7 col-sm-7 col-md-7 col-lg-7'>
					<div className='row'>
						<div className='col-xs-3 col-sm-3 col-md-3 col-lg-3'>
							<img className='img-responsive' src='http://localhost:8080/images/logo.jpg'/>	
						</div>
						<div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>	
							<h3 className=''>Unidad de Salud Familiar</h3>
						</div>
					</div>
				</div>

				<div className='col-xs-5 col-sm-5 col-md-5 col-lg-5'>
					<h4 className='text-right'><strong>Fecha de creación:</strong>
						{ moment(this.props.fechaCreacion).format('DD-MM-YYYY') }
					</h4>
					<br/>
					<h4 className='text-right datos-cabecera-en-modal'><strong>Fecha impresión:</strong>
						{ moment(new Date()).format('DD-MM-YYYY') }
					</h4>
					<h4 className='text-right datos-cabecera-en-modal'><strong>Hora impresión:</strong>
						{ horaActual() }
					</h4>
				</div>
			</div>

			<br/>
			<br/>

		</div>
	}
}

export default Cabecera