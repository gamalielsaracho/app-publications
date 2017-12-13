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