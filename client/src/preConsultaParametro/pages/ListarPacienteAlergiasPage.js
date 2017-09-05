import React , { Component } from 'react'

import ListarPacienteAlergiasContainer from '././../components/Listar'

class ListarPacienteAlergiasPage extends Component {
	render() {
		return <ListarPacienteAlergiasContainer
				idPaciente={this.props.params.idPaciente}/>
	}
}

export default ListarPacienteAlergiasPage