import React, { Component } from 'react'
import { Link } from 'react-router'

class ListarApp extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		let activeList
		let activeShow

		if(this.props.uls.idTipoAnalisis) {
			activeList = ''
			activeShow = 'active'
		} else {
			activeList = 'active'
			activeShow = ''
		}


		return <div>
			<ul className="nav nav-tabs">
				<li className="nav-item nav-link" className={activeList}>
			    	<Link to='/dashboard/tipos-analisis'>Listar</Link>
			  	</li>
			  	<li className="nav-item nav-link" className={activeShow}>
			    	<a className="nav-link">Detalle Tipo de Análisis</a>
			  	</li>			  
			</ul>

			{ this.props.children }
			
		</div>
	}
}

export default ListarApp