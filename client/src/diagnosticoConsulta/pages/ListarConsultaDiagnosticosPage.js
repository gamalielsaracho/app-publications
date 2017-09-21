import React , { Component } from 'react'

import ListarConsultaDiagnosticosContainer from '././../components/Listar'

class ListarConsultaDiagnosticosPage extends Component {
	render() {
		return <ListarConsultaDiagnosticosContainer
					idConsulta={this.props.params.idConsulta}/>
	}
}

export default ListarConsultaDiagnosticosPage