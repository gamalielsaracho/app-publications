import { connect } from 'react-redux'

import {
	mostrarParametroAnalisis
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.parametroAnalisis.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarParametroAnalisis: (idParametroAnalisis) => {
			dispatch(mostrarParametroAnalisis(idParametroAnalisis))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


