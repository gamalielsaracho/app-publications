import { connect } from 'react-redux'

import {
	mostrarAnalisis,
	eliminarAnalisis,

	limpiarMensajeErrorAnalisis
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		eliminar: state.analisis.eliminar,
		mostrar: state.analisis.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarAnalisis: (idAnalisis) => {
			dispatch(mostrarAnalisis(idAnalisis))
		},
		eliminarAnalisis: (urlToRedirect, idAnalisis) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    
		    if (r == true) {
				dispatch(eliminarAnalisis(urlToRedirect, idAnalisis))
				
				setTimeout(function () {
					dispatch(limpiarMensajeErrorAnalisis())
				}, 5000)
		    }

		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


