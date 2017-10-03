import React , { Component } from 'react'

import ListarAnalisisTiposContainer from '././../components/Listar'

class ListarAnalisisTiposPage extends Component {
	render() {
		return <ListarAnalisisTiposContainer
					idAnalisis = {this.props.params.idAnalisis}/>
	}
}

export default ListarAnalisisTiposPage