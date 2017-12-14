// Para obtener el error al crear o editar.
crear: state.nivel.crear,
editar: state.nivel.editar


let error = this.props.formulario.error ? this.props.formulario.error 
			: this.props.crear.error ? this.props.crear.error : this.props.editar.error 


import jwtDecode from 'jwt-decode'


// delete
idPersonal: jwtDecode(localStorage.getItem('token')).id_personal


// editar
datosFormulario.idPersonal = jwtDecode(localStorage.getItem('token')).id_personal

// ...._REQUEST

mostrar: INITIAL_STATE.mostrar,
crear: INITIAL_STATE.crear,
editar: INITIAL_STATE.editar,
eliminar: INITIAL_STATE.eliminar


// --------------------------------------------------------------------
this.personalLocalSt = jwtDecode(localStorage.getItem('token'))


this.renderBtnAuditByRol = this.renderBtnAuditByRol.bind(this)


renderBtnAuditByRol() {
		let idRol = this.personalLocalSt.id_rol
		
		if(idRol == 3) {
			return <div className='row'>
				<div className='col-xs-11 col-sm-11 col-md-11 col-lg-11 text-right'>
					<br/>
					<Link target="_blank" to={`/dashboard/modulos-auditados/${this.props.urls.idConsulta}/auditoria/consulta-sintomas`}>
						<button type="button" className="btn btn-primary btn-md">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span> Auditoría
						</button>
					</Link>
				</div>
			</div>
		} else {
			return <span></span>
		}
	}


	// -------------------------------------------------
	return <div className='form-group'>
				<label htmlFor={label}>{label}</label>
				
				<div className='form-inline'>
					<div className='form-group'>
						<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Cargando ciudades...
					</div>
				</div>
			</div>


// --------------------
export const LIMPIAR_MENSAJE_ERROR_CONSULTA = 'limpiar_mensaje_error_consulta'


export function limpiarMensajeErrorConsulta() {
	return (dispatch) => {
		dispatch({ type: LIMPIAR_MENSAJE_ERROR_CONSULTA })
	}
}


// dispatch(eliminarConsulta(idConsulta))..

setTimeout(function () {
				dispatch(limpiarMensajeErrorConsulta())
			}, 5000)

case LIMPIAR_MENSAJE_ERROR_CONSULTA:

			state = Object.assign({}, state, {
				crear: { error:'' },
				eliminar: { error:'' },
				editar: { error:'' }
			})

			return state



// ---------------------------------------------------------------

// FORMULARIO FILTRO.
export const ABRIR_FORMULARIO_FILTRO = 'abrir_formulario_filtro'
export const CERRAR_FORMULARIO_FILTRO = 'cerrar_formulario_filtro'


// Formulario Filtro.
	ABRIR_FORMULARIO_FILTRO,
	CERRAR_FORMULARIO_FILTRO,



export function abrirFormularioFiltro() {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_FILTRO })
	}
}


export function cerrarFormularioFiltro() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_FILTRO })
	}
}


formularioFiltro: { abierto: false }



		case ABRIR_FORMULARIO_FILTRO:
			state = Object.assign({}, state, {
				formularioFiltro: {
					abierto: true
				}
			})

			return state

		case CERRAR_FORMULARIO_FILTRO:
			state = Object.assign({}, state, {
				formularioFiltro: {
					abierto: false
				}
			})

			return state


// ....
		eliminarDroga: (idDroga) => {
			var r = confirm("Está seguro que desea eliminar ?");
		    if (r == true) {
				dispatch(eliminarDroga(idDroga))
		    }
		}


// .................................................................
label, showBtnAdd,

this.renderBtnAdd = this.renderBtnAdd.bind(this)


    renderBtnAdd(showBtnAdd) {
		if(showBtnAdd) {
			return <button type="button" onClick={this.props.abrirFormularioCrearNivel} className="btn btn-success btn-space btn-sm">
				<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Nuevo nivel
			</button>
		} else {
			return <span></span>
		}
	}


{ this.renderBtnAdd(showBtnAdd) }


// --------------------------------------------------


  var patronNumero = /^\d*$/; //Expresión regular para aceptar solo números enteros

  var patronNumeroComaNegativo = /^(-[0-9])*[.]?[0-9]*$/

 	 var patronTexto = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/


		if(!patronTexto.test(values.descripcion)) {
        	errors.descripcion = 'Solo texto.'
      	} else if (values.descripcion.length < 3){
   			errors.descripcion = 'Tiene que ser por lo menos 3 caracteres.'
      	}


if (!values.nroRegistro) {
    errors.nroRegistro = 'Nro de registro obligatorio.'
  } else {
      if(!patronNumero.test(values.nroRegistro)) {
        errors.nroRegistro = 'Solo números positivos.'
      } else if(values.nroRegistro.length < 4){
        errors.nroRegistro = 'Por lo menos 4 caracteres.'
      }
  }


 ORDER BY id_especialidad DESC


 exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM drogas 
			WHERE
			descripcion = ?
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}


exports.create = (data, callback) => {
	let q = `
		INSERT INTO drogas (id_droga, descripcion)
			VALUES (null, LOWER(?));
	`
	return connection.query(q, [data.descripcion.trim()], callback)

	connection.end()
}


exports.update = (data, callback) => {
	let q = `
		UPDATE drogas SET 
			descripcion = LOWER(?)
			WHERE 
				id_droga = ?
	`

	return connection.query(q, [data.descripcion.trim(), data.id_droga], callback)

	connection.end()
}


// -----------------------------
this.renderIndice = this.renderIndice.bind(this)

renderIndice(especialidad) {
		if(especialidad.id_especialidad != 1) {
			return <tr key={especialidad.id_especialidad}>
			    <td>{ especialidad.id_especialidad }</td>
			    <td>{ especialidad.descripcion }</td>
			    <td>
			        { this.renderBtsOpciones(especialidad) }
			    </td>
			</tr>
		}
	}