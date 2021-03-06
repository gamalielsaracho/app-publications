import { connect } from 'react-redux'

import {
	listarAnalisisSolicitadoTipos,
	eliminarAnalisisSolicitadoTipo
} from '../../actions'

import Listar from './Listar'

function mapStateToProps(state) {
	return {
		crear: state.analisisSolicitadoTipo.crear,
		listar: state.analisisSolicitadoTipo.listar,
		analisisSolicitadoTipos: state.analisisSolicitadoTipo.listar.analisisSolicitadoTipos,
	
		// para obtener el id del médico que creo la solicitud para laboratorio.
		mostrar: state.analisisSolicitado.mostrar
	}
}

function mapDispatchToProps(dispatch) {
	return {
		listarAnalisisSolicitadoTipos: (idAnalisisSolicitado) => {
			dispatch(listarAnalisisSolicitadoTipos(idAnalisisSolicitado))
		},
		eliminarAnalisisSolicitadoTipo: (idAnalisisSolicitadoTipo) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarAnalisisSolicitadoTipo(idAnalisisSolicitadoTipo))
		    }
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listar)