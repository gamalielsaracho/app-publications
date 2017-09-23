import { connect } from 'react-redux'

import {
	mostrarTipoAnalisis
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {	
	return {
		mostrar: state.tipoAnalisis.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarTipoAnalisis: (idTipoAnalisis) => {
			dispatch(mostrarTipoAnalisis(idTipoAnalisis))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


