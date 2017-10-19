import { connect } from 'react-redux'

import {
	eliminarAnalisisSolicitado,
	mostrarAnalisisSolicitado,
	abrirFormularioEditarAnalisisSolicitado
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		eliminar: state.analisisSolicitado.eliminar,

		mostrar: state.analisisSolicitado.mostrar,

		// estado del formulario para hacer render.
		// unicamente si se abre.
		formulario: state.analisisSolicitado.formulario
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarAnalisisSolicitado: (idAnalisisSolicitado) => {
			dispatch(mostrarAnalisisSolicitado(idAnalisisSolicitado))
		},
		abrirFormularioEditarAnalisisSolicitado: (idAnalisisSolicitado) => {
			dispatch(abrirFormularioEditarAnalisisSolicitado(idAnalisisSolicitado))
		},
		eliminarAnalisisSolicitado: (idAnalisisSolicitado, urlToRedirect) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarAnalisisSolicitado(idAnalisisSolicitado, urlToRedirect))
		    }
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


