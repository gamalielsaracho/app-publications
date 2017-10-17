import {

	LISTAR_CONSULTA_SINTOMAS_REQUEST,
	LISTAR_CONSULTA_SINTOMAS_EXITO,
	LISTAR_CONSULTA_SINTOMAS_FALLO,

	ABRIR_FORMULARIO_CREAR_CONSULTA_SINTOMA,

	CREAR_CONSULTA_SINTOMA_REQUEST,
	CREAR_CONSULTA_SINTOMA_EXITO,
	CREAR_CONSULTA_SINTOMA_FALLO,

	CERRAR_FORMULARIO_CONSULTA_SINTOMA,

	// Editar sintomaConsulta.
		// form to edit.
	ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_REQUEST,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_EXITO,
	ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_FALLO,

	EDITAR_CONSULTA_SINTOMA_REQUEST,
	EDITAR_CONSULTA_SINTOMA_EXITO,
	EDITAR_CONSULTA_SINTOMA_FALLO,

	ELIMINAR_CONSULTA_SINTOMA_REQUEST,
	ELIMINAR_CONSULTA_SINTOMA_EXITO,
	ELIMINAR_CONSULTA_SINTOMA_FALLO
} from '../actions/types'

const INITIAL_STATE = {
	formulario: {
		abirtoCrear: false,
		abirtoEditar: false,
		iniciarValores: false,
		error: '',
		cargando: false,
		sintomaConsulta: null
	},
	crear: { mensaje: '', cargando: false, error:'' },
	listar: { sintomasConsulta:[], cargando: false, error: '' },
	eliminar: { cargando: false, mensaje: '', error: '' },
	mostrar: { cargando: false, sintomaConsulta: null, error: '' },
	editar: { cargando: false, mensaje: '', error: '' }
}

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case ABRIR_FORMULARIO_CREAR_CONSULTA_SINTOMA:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: true,
					abirtoEditar: false,
					iniciarValores: false,
					error: '',
					cargando: false,
					sintomaConsulta: null
				},

				// Limpia los estados de error.
				editar: INITIAL_STATE.editar,
				crear: INITIAL_STATE.crear
			})

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_REQUEST:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: true,
					sintomaConsulta: null
				},
				
				// Limpia los estados de error.
				editar: INITIAL_STATE.editar,
				crear: INITIAL_STATE.crear
			})

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_EXITO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: '',
					cargando: false,
					sintomaConsulta: action.payload
				}
			})

		case ABRIR_FORMULARIO_EDITAR_CONSULTA_SINTOMA_FALLO:
			return Object.assign({}, state, {
				formulario: {
					abirtoCrear: false,
					abirtoEditar: true,
					iniciarValores: true,
					error: action.payload,
					cargando: false,
					sintomaConsulta: null
				}
			})

		case CERRAR_FORMULARIO_CONSULTA_SINTOMA:
			return Object.assign({}, state, {
				formulario: INITIAL_STATE.formulario
			})
			

		// CREATE sintomaConsulta.
		case CREAR_CONSULTA_SINTOMA_REQUEST:
			return Object.assign({}, state, {
				crear: { cargando: true }
			})

		case CREAR_CONSULTA_SINTOMA_EXITO:
			
			state = Object.assign({}, state, {
				crear: { 
					mensaje: action.payload.mensaje
				},
				listar: {
					sintomasConsulta: [ ...state.listar.sintomasConsulta, 
											 action.payload.datoInsertado ]
				},
				formulario: INITIAL_STATE.formulario
			})

			// console.log(state)

			return state

		case CREAR_CONSULTA_SINTOMA_FALLO:
			return Object.assign({}, state, {
				crear: { error: action.payload }
			})

		// LISTAR.
		case LISTAR_CONSULTA_SINTOMAS_REQUEST:
			return Object.assign({}, state, {
				crear: INITIAL_STATE.crear,
				listar: { cargando: true, error: '' }
			})


		case LISTAR_CONSULTA_SINTOMAS_EXITO:
			return Object.assign({}, state, {
				listar: { sintomasConsulta: action.payload.sintomasConsulta, cargando: false, error: '' }
			})


		case LISTAR_CONSULTA_SINTOMAS_FALLO:
			return Object.assign({}, state, {
				listar: { error: action.payload, sintomasConsulta:[], cargando: false }
			})


		// EDITAR.
		case EDITAR_CONSULTA_SINTOMA_REQUEST:
			return Object.assign({}, state, {
				editar: { cargando: true }
			})

		case EDITAR_CONSULTA_SINTOMA_EXITO:

			let nuevaLista = state.listar.sintomasConsulta.map((i) => {
				if(i.consultaSintoma.id_consultaSintoma == action.payload.datoActualizado.consultaSintoma.id_consultaSintoma) {

					i = Object.assign({}, i, {
						consultaSintoma: action.payload.datoActualizado.consultaSintoma
					})
				}

				return i
			})

			state = Object.assign({}, state, {
				editar: { 
					cargando: false, 
					mensaje: action.payload.mensaje
				},
				formulario: INITIAL_STATE.formulario,
				listar: {
					sintomasConsulta: nuevaLista
				}
			})

			return state

		case EDITAR_CONSULTA_SINTOMA_FALLO:
			return Object.assign({}, state, {
				editar: { 
					cargando: false,
					mensaje: '', 
					error: action.payload
				}
			})
		

		// ELIMINAR.
		case ELIMINAR_CONSULTA_SINTOMA_REQUEST:
			return Object.assign({}, state, {
				eliminar: { cargando: true },
				crear: INITIAL_STATE.crear,
				formulario: INITIAL_STATE.formulario
			})

		case ELIMINAR_CONSULTA_SINTOMA_EXITO:
					
			let newList = state.listar.sintomasConsulta.filter((i) => {
				return i.consultaSintoma.id_consultaSintoma != action.payload.id_consultaSintoma
			})

			state = Object.assign({}, state, {
				eliminar: {
					cargando: false,
					error: ''
				},
				listar: {
					sintomasConsulta: newList
				}
			})

			return state

		case ELIMINAR_CONSULTA_SINTOMA_FALLO:
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