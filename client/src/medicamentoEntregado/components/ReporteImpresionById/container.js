import { connect } from 'react-redux'

import ReporteImpresionById from './ReporteImpresionById'

import {
	medicamentoEntregadoImpresion,

	actualizarEstadoImpresionMedicamentoEntregado
} from '../../actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {
		urls: ownProps.params,

		medicamentoEntregadoImpresion: state.medicamentoEntregado.medicamentoEntregadoImpresion
	}
}

function mapDispatchToProps(dispatch) {
	return {
		medicamentoEntregadoImpresionFuncion: (idMedicamentoEntregado) => {
			dispatch(medicamentoEntregadoImpresion(idMedicamentoEntregado))
		},
		imprimirMedicamentosEntregados: (idMedicamentoEntregado) => {
			var r = confirm("Está seguro que desea Imprimir ?");
		    
		    if (r == true) {
				window.print()

			    window.onafterprint = function(){

				   // alert("..."+ idMedicamentoEntregado)
					dispatch(actualizarEstadoImpresionMedicamentoEntregado(idMedicamentoEntregado))
				}
		    }
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReporteImpresionById)


