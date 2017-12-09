import { connect } from 'react-redux'

// import {
	
// } from '../../actions'


import ReporteListaConsultas from './ReporteListaConsultas'

// ownProps obtiene todas las properties que son pasados a
// ListarConsultasContainer DENTRO DE FiltrosConsultasAppContainer
//  Así que NO hace falta ya que no trae los parametros de la url
// en donde el usuario está parado.

// Vamos a pasarle urls a ListarConsultasContainer al ser llamado de 
// FiltrosConsultasAppContainer (El componente Index en las rutas)

function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return {
		imprimirReporte: () => {
			var r = confirm("Está seguro que desea Imprimir ?");
		    
		    if (r == true) {
				window.print()
		    }
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReporteListaConsultas)