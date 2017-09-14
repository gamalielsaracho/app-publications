import { connect } from 'react-redux'

import {
	listarConsultas,
	listarConsultasMedico,
	mostrarConsulta
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.consulta.crear,
		listar: state.consulta.listar,
		consultas: state.consulta.listar.consultas
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarConsultas: () => {
			dispatch(listarConsultas())
		},
		mostrarConsulta: (idConsulta) => {
			dispatch(mostrarConsulta(idConsulta))
		},
		listarConsultasMedico: (idPersonal) => {
			dispatch(listarConsultasMedico(idPersonal))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)