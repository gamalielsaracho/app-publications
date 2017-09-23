import { connect } from 'react-redux'

import {
	abrirFormularioCrearParametroAnalisis
} from '../../actions'

import FieldSelectParametrosAnalisis from './FieldSelectParametrosAnalisis'

function mapStateToProps(state) {
	return {
		// Para comparar las props cuando se agrega un nuevo dato
		// y poder actualizar la lista del select option.
		parametrosAnalisis: state.parametroAnalisis.listar.parametrosAnalisis,

		// estado del formulario para hacer render.
		// unicamente si se abre.
		formulario: state.parametroAnalisis.formulario
	}
}

function mapDispatchToProps(dispatch) {
	return {
		abrirFormularioCrearParametroAnalisis: () => {
			dispatch(abrirFormularioCrearParametroAnalisis())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldSelectParametrosAnalisis)