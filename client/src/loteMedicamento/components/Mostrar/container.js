import { connect } from 'react-redux'

import {
	mostrarLoteMedicamento
} from '../../actions'

import Mostrar from './Mostrar'

function mapStateToProps(state) {
	return {
		mostrar: state.loteMedicamento.mostrar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		mostrarLoteMedicamento: (idLoteMedicamento) => {
			dispatch(mostrarLoteMedicamento(idLoteMedicamento))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mostrar)


