import React , { Component } from 'react'

class MensajeOerror extends Component {
	render() {
		const contenido = this.props.mensaje ? this.props.mensaje : this.props.error
		// console.log(contenido)
		var colorContenedor

		if(this.props.mensaje) {
			colorContenedor = '8bc34a'
		} else {
			colorContenedor = 'f44336'
		}

		let styles = {
			contenedor: {
				boxShadow: 'none',
				border: `1px solid #${colorContenedor}`,
				color: `#${colorContenedor}`,
				padding: '.1em'
			}
		}

		if(contenido) {
			return <div className='container'>
				<div className='row center-xs center-sm center-md center-lg'>
					<div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
						<div style={styles.contenedor} className='card-panel'>
							<span>{ contenido }</span>
						</div>
					</div>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}
}

export default MensajeOerror