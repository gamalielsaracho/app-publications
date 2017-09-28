import { connect } from 'react-redux'

import {
	mostrarParametroAnalisis,
	abrirFormularioEditarParametroAnalisis
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.parametroAnalisis.mostrar,

		// estado del formulario para hacer render.
		// unicamente si se abre.
		formulario: state.parametroAnalisis.formulario
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarParametroAnalisis: (idParametroAnalisis) => {
			dispatch(mostrarParametroAnalisis(idParametroAnalisis))
		},
		abrirFormularioEditarParametroAnalisis: (idParametroAnalisis) => {
			dispatch(abrirFormularioEditarParametroAnalisis(idParametroAnalisis))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


