import React, { Component } from 'react'
import removeAccents from 'remove-accents'
import jwtDecode from 'jwt-decode'

import Cargando from '../../../app/components/Cargando'
import MensajeOerror from '../../../app/components/MensajeOerror'

import FormularioReferenciaContainer from '../Formulario'

class Listar extends Component {
	constructor(props) {
		super(props)
		this.renderReferencias = this.renderReferencias.bind(this)
		this.renderSexo = this.renderSexo.bind(this)
	}

	renderSexo(sexo, general) {
		if(general) {
			return <p>Ambos</p>
		} else {
			if(sexo == 'femenino') {
				return <p>Femenino</p>
			} else {
				return <p>Masculino</p>
			}
			
		}
	}

	// this.props.idParametroAnalisis -> es pasado como property.

	componentWillMount() {
		this.props.listarReferencias(this.props.urls.idParametroAnalisis)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.referencias !== this.props.referencias
	}

	renderReferencias(referencias) {
		return <tbody>
			{
				referencias.map((i) => {
					return <tr key={i.id_referencia}>
			            <td>{ i.id_referencia }</td>
			            <td>{ i.diasMinimos }</td>
			            <td>{ i.diasMaximos }</td>
			            <td>{ i.mesesMinimos }</td>
			            <td>{ i.mesesMaximos }</td>
			            <td>{ i.mesesMinimos }</td>
			            <td>{ i.anosMaximos }</td>
			            <td>{ this.renderSexo(i.sexo, i.general) }</td>
			            <td>{ i.superior }</td>
			            <td>{ i.inferior }</td>

			            <td>
							<button type="button" onClick={() => { this.props.abrirFormularioEditarReferencia(i.id_referencia) }} className="btn btn-warning btn-space">Editar</button>
							<button type="button" onClick={() => { this.props.eliminarReferencia(i.id_referencia) }} className="btn btn-danger btn-space">Eliminar</button>
						</td>
			        </tr>		
				})
			}
		</tbody>
	}

	render() {
		const { referencias, cargando, error } = this.props.listar		

		if(cargando) {
			return <Cargando/>
		} else {
				return <div>
					<h3 className='text-center'></h3>
											
					<MensajeOerror error={error} mensaje={null}/>

					<FormularioReferenciaContainer 
						idParametroAnalisis={this.props.urls.idParametroAnalisis}/>

					<div className='row'>
						<div className='col-xs-12 col-sm-8 col-md-6 col-lg-4'>
							<button onClick={ this.props.abrirFormularioCrearReferencia } className='btn btn-success'>Agregar</button>
						</div>
					</div>
					<br/>

					<div className='table-responsive'>
						<table className='table table-striped'>
							<thead>
						    	<tr>
						        	<th>Id</th>
						        	<th>Días. Mín</th>
						        	<th>Días. Máx</th>
						        	<th>Meses. Mín</th>
						        	<th>Meses. Máx</th>
						        	<th>Años. Mín</th>
						        	<th>Años. Máx</th>
						        	<th>Sexo</th>
						        	<th>Superior</th>
						        	<th>Inferior</th>
						        	<th>Opciones</th>
						    	</tr>
						    </thead>

							{ this.renderReferencias(referencias) }

						</table>
					</div>
				</div>
		}

	}
}

export default Listar