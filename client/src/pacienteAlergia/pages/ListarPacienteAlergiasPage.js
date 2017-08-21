import React , { Component } from 'react'

import ListarPacienteAlergiasContainer from '././../components/Listar'

class ListarPacienteAlergiasPage extends Component {
	render() {
		return <ListarPacienteAlergiasContainer
				nroDocumento={this.props.params.nroDocumento}
				idTipoDocumento={this.props.params.idTipoDocumento}/>
	}
}

export default ListarPacienteAlergiasPage