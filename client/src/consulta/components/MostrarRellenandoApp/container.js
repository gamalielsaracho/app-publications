import { connect } from 'react-redux'

import MostrarRellenandoApp from './MostrarRellenandoApp'

import {
	listarAnalisisSolicitados,
	abrirFormularioCrearAnalisisSolicitado
} from '../../../analisisSolicitado/actions'

function mapStateToProps(state, ownProps) {
	// console.log(ownProps)
	return {

		// Listar todos los analisis solicitados para luego poder
		// filtrarlos por Id_consulta, obviamente si es que encuentra
		// muestra en el menú el link para entrar,
		// y no existe, entonces muestra el btn de agregar una
		// solicitud.

		listar: state.analisisSolicitado.listar,

		// guardamos todos los parametros de la url en el objeto urls.
		urls: ownProps.params
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAnalisisSolicitados: () => {
			dispatch(listarAnalisisSolicitados())
		},
		abrirFormularioCrearAnalisisSolicitado: () => {
			dispatch(abrirFormularioCrearAnalisisSolicitado())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MostrarRellenandoApp)


