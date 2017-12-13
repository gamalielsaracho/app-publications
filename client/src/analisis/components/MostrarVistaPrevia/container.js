import { connect } from 'react-redux'

import {
	mostrarAnalisisVistaPrevia,

	actualizarEstadoImpresionAnalisis
} from '../../actions'

import MostrarVistaPrevia from './MostrarVistaPrevia'

function mapStateToProps(state, ownProps) {
	return {
		urls: ownProps.params,
		vistaPrevia: state.analisis.vistaPrevia
	}
}

function mapDispatchToProps(dispatch) {
	return {
		mostrarAnalisisVistaPrevia: (idAnalisis) => {
			dispatch(mostrarAnalisisVistaPrevia(idAnalisis))
		},

		imprimirAnalisis: (idAnalisis) => {
			var r = confirm("Está seguro que desea Imprimir ?");
		    
		    if (r == true) {
				window.print()

			    window.onafterprint = function(){

				   // alert("..."+ idAnalisis)
					dispatch(actualizarEstadoImpresionAnalisis(idAnalisis))
				}
		    }
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarVistaPrevia)