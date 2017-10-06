import {

	LISTAR_ANALISIS_TIPO_REFERENCIAS_REQUEST,
	LISTAR_ANALISIS_TIPO_REFERENCIAS_EXITO,
	LISTAR_ANALISIS_TIPO_REFERENCIAS_FALLO,

	CREAR_ANALISIS_TIPO_REFERENCIA_REQUEST,
	CREAR_ANALISIS_TIPO_REFERENCIA_EXITO,
	CREAR_ANALISIS_TIPO_REFERENCIA_FALLO,

	CERRAR_FORMULARIO_ANALISIS_TIPO_REFERENCIA,

	// Editar analisisTipoReferencia.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_EXITO,
	ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_FALLO,


	EDITAR_ANALISIS_TIPO_REFERENCIA_REQUEST,
	EDITAR_ANALISIS_TIPO_REFERENCIA_EXITO,
	EDITAR_ANALISIS_TIPO_REFERENCIA_FALLO,


	ELIMINAR_ANALISIS_TIPO_REFERENCIA_REQUEST,
	ELIMINAR_ANALISIS_TIPO_REFERENCIA_EXITO,
	ELIMINAR_ANALISIS_TIPO_REFERENCIA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		analisisTipoReferencia: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { analisisTipoReferencias:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {

		case ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					analisisTipoReferencia: null
				}
			})

		case ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					analisisTipoReferencia: action.payload
				},

				// Limpia los estados de error.
				editar: INITIAL_STATE.editar,
				crear: INITIAL_STATE.crear
			})

		case ABRIR_FORMULARIO_EDITAR_ANALISIS_TIPO_REFERENCIA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					analisisTipoReferencia: null
				}
			})


		case CERRAR_FORMULARIO_ANALISIS_TIPO_REFERENCIA:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})


		// CREATE analisisTipoReferencia.
		case CREAR_ANALISIS_TIPO_REFERENCIA_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_ANALISIS_TIPO_REFERENCIA_EXITO:

			state = Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				listar: {
					analisisTipoReferencias: [ ...state.listar.analisisTipoReferencias, 
											 action.payload.datoInsertado ]
				},
				formulario: INITIAL_STATE.formulario
			})

			// console.log(state)

			return state

		case CREAR_ANALISIS_TIPO_REFERENCIA_FALLO:
			return Object.assign({}, state, {
				crear: { error: action.payload }
			})


		// LISTAR.
		case LISTAR_ANALISIS_TIPO_REFERENCIAS_REQUEST:
			return Object.assign({}, state, {
				crear: INITIAL_STATE.crear,
				editar: INITIAL_STATE.editar,
				listar: { cargando: true, error: '' },
				formulario: INITIAL_STATE.formulario
			})

		case LISTAR_ANALISIS_TIPO_REFERENCIAS_EXITO:
			return Object.assign({}, state, {
				listar: { analisisTipoReferencias: action.payload.analisisTipoReferencias, cargando: false, error: '' }
			})

		case LISTAR_ANALISIS_TIPO_REFERENCIAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, analisisTipoReferencias:[], cargando: false }
			})

		
		// EDITAR.
		case EDITAR_ANALISIS_TIPO_REFERENCIA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_ANALISIS_TIPO_REFERENCIA_EXITO:
			// console.log('Datos Actualizados.')
			// console.log(action.payload.datoActualizado)
			
			let nuevaLista = state.listar.analisisTipoReferencias.map((i) => {
				if(i.analisisTipoReferencia.id_analisisTipoAnalisisReferencia == action.payload.datoActualizado.analisisTipoReferencia.id_analisisTipoAnalisisReferencia) {
					// console.log('i')
					// console.log(i)

					i = Object.assign({}, i, {
						analisisTipoReferencia: action.payload.datoActualizado.analisisTipoReferencia
					})
				}

				return i
			})

			// console.log('nuevaLista')
			// console.log(nuevaLista)

			state = Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: { abirtoEditar: false },
				listar: {
					analisisTipoReferencias: nuevaLista
				}
			})

			return state

		case EDITAR_ANALISIS_TIPO_REFERENCIA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_ANALISIS_TIPO_REFERENCIA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true },
				crear: INITIAL_STATE.crear,
				formulario: INITIAL_STATE.formulario
			})

		case ELIMINAR_ANALISIS_TIPO_REFERENCIA_EXITO:
					
			let newList = state.listar.analisisTipoReferencias.filter((i) => {
				return i.analisisTipoReferencia.id_analisisTipoAnalisisReferencia != action.payload.id_analisisTipoAnalisisReferencia
			})

			state = Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				},
				listar: {
					analisisTipoReferencias: newList
				}
			})

			return state

		case ELIMINAR_ANALISIS_TIPO_REFERENCIA_FALLO:
			return Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: action.payload
				}
			})


		default: 
			return state
	}

}