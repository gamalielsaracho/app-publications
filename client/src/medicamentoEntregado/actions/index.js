import {
	ABRIR_FORMULARIO_CREAR_MEDICAMENTO_ENTREGADO,

	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_REQUEST,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_EXITO,
	ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_FALLO,

	CERRAR_FORMULARIO_MEDICAMENTO_ENTREGADO,

	LISTAR_MEDICAMENTOS_ENTREGADOS_REQUEST,
	LISTAR_MEDICAMENTOS_ENTREGADOS_EXITO,
	LISTAR_MEDICAMENTOS_ENTREGADOS_FALLO,

	// Create rol.
	CREAR_MEDICAMENTO_ENTREGADO_REQUEST,
	CREAR_MEDICAMENTO_ENTREGADO_EXITO,
	CREAR_MEDICAMENTO_ENTREGADO_FALLO,

	// Show rol.
	MOSTRAR_MEDICAMENTO_ENTREGADO_REQUEST,
	MOSTRAR_MEDICAMENTO_ENTREGADO_EXITO,
	MOSTRAR_MEDICAMENTO_ENTREGADO_FALLO,

	// Editar Rol.
	EDITAR_MEDICAMENTO_ENTREGADO_REQUEST,
	EDITAR_MEDICAMENTO_ENTREGADO_EXITO,
	EDITAR_MEDICAMENTO_ENTREGADO_FALLO,

	// Delete Rol.
	ELIMINAR_MEDICAMENTO_ENTREGADO_REQUEST,
	ELIMINAR_MEDICAMENTO_ENTREGADO_EXITO,
	ELIMINAR_MEDICAMENTO_ENTREGADO_FALLO,


	// Formulario Filtro.
	ABRIR_FORMULARIO_FILTRO,
	CERRAR_FORMULARIO_FILTRO,


	MEDICAMENTO_ENTREGADO_IMPRESION_REQUEST,
	MEDICAMENTO_ENTREGADO_IMPRESION_EXITO,
	MEDICAMENTO_ENTREGADO_IMPRESION_FALLO,

	ACTUALIZAR_ESTADO_IMPRESION_MEDICAMENTO_ENTREGADO
} from './types'

import io from 'socket.io-client'

import { browserHistory } from 'react-router'
import { reset } from 'redux-form'

var medEntregadoSocket = io.connect('http://localhost:3000/medicamentoEntregado');


export function actualizarEstadoImpresionMedicamentoEntregado(idMedicamentoEntregado) {
	return (dispatch) => {
	
		medEntregadoSocket.emit('atualizar_estado_impresion_medicamentoEntregado', { 
			id_medicamentoEntregado: idMedicamentoEntregado 
		})

		medEntregadoSocket.on('atualizar_estado_impresion_medicamentoEntregado', (data) => {
			console.log(data)
			// if(data.error) {
			// 	dispatch({ type: ACTUALIZAR_ESTADO_IMPRESION_MEDICAMENTO_ENTREGADO, payload: data.error })
			// } else {
			// 	dispatch({ type: ACTUALIZAR_ESTADO_IMPRESION_MEDICAMENTO_ENTREGADO, payload: data })
			// }
		})
	}
}


export function medicamentoEntregadoImpresion(idMedicamentoEntregado) {
	return (dispatch) => {
		dispatch({ type: MEDICAMENTO_ENTREGADO_IMPRESION_REQUEST })

		medEntregadoSocket.emit('medicamentoEntregado_impresion', { 
			id_medicamentoEntregado: idMedicamentoEntregado 
		})

		medEntregadoSocket.on('medicamentoEntregado_impresion', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: MEDICAMENTO_ENTREGADO_IMPRESION_FALLO, payload: data.error })
			} else {
				dispatch({ type: MEDICAMENTO_ENTREGADO_IMPRESION_EXITO, payload: data })
			}
		})
	}
}


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


export function abrirFormularioCrearMedicamentoEntregado() {
	return (dispatch) => {
		dispatch(reset('FormularioMedicamentoEntregado'))

		dispatch({ type: ABRIR_FORMULARIO_CREAR_MEDICAMENTO_ENTREGADO })
	}
}

export function abrirFormularioEditarMedicamentoEntregado(idMedicamentoEntregado) {
	return (dispatch) => {
		dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_REQUEST })

		medEntregadoSocket.emit('mostrar_medicamentoEntregado_editar', { 
			id_medicamentoEntregado: idMedicamentoEntregado 
		})

		medEntregadoSocket.on('mostrar_medicamentoEntregado_editar', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ABRIR_FORMULARIO_EDITAR_MEDICAMENTO_ENTREGADO_EXITO, payload: data })
			}
		})
	}
}

export function cerrarFormularioMedicamentoEntregado() {
	return (dispatch) => {
		dispatch({ type: CERRAR_FORMULARIO_MEDICAMENTO_ENTREGADO })
	}
}

export function listarMedicamentosEntregados() {
	return (dispatch) => {

		dispatch({ type: LISTAR_MEDICAMENTOS_ENTREGADOS_REQUEST })

		var medEntregadoSocket = io.connect('http://localhost:3000/medicamentoEntregado');

		medEntregadoSocket.on('listar_medicamentosEntregados', (data) => {

			if(data.error) {
				dispatch({ type: LISTAR_MEDICAMENTOS_ENTREGADOS_FALLO, payload: data.error })
			} else {
				dispatch({ type: LISTAR_MEDICAMENTOS_ENTREGADOS_EXITO, payload: data })
			}
		})
	}
}

export function crearMedicamentoEntregado(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: CREAR_MEDICAMENTO_ENTREGADO_REQUEST })

		medEntregadoSocket.emit('crear_medicamentoEntregado', datosFormulario)

		medEntregadoSocket.on('crear_medicamentoEntregado', (data) => {
			// console.log(data)
			if(data.error) {
				dispatch({ type: CREAR_MEDICAMENTO_ENTREGADO_FALLO, payload: data.error })
			} else {
				dispatch({ type: CREAR_MEDICAMENTO_ENTREGADO_EXITO, payload: data })

				dispatch(reset('FormularioMedicamentoEntregado'))
			}
		})
	
	}
}

export function eliminarMedicamentoEntregado(idMedicamentoEntregado) {
	return (dispatch) => {
		// alert(idMedicamentoEntregado)

		dispatch({ type: ELIMINAR_MEDICAMENTO_ENTREGADO_REQUEST })

		medEntregadoSocket.emit('eliminar_medicamentoEntregado', { 
			id_medicamentoEntregado: idMedicamentoEntregado 
		})

		medEntregadoSocket.on('eliminar_medicamentoEntregado', (data) => {
			console.log(data)
			if(data.error) {
				dispatch({ type: ELIMINAR_MEDICAMENTO_ENTREGADO_FALLO, payload: data.error })
			} else {
				dispatch({ type: ELIMINAR_MEDICAMENTO_ENTREGADO_EXITO, payload: data })
				
				browserHistory.push(`/dashboard/medicamentos-entregados/`)
			}
		})
	}
}


export function mostrarMedicamentoEntregado(idMedicamentoEntregado) {
	return (dispatch) => {
		dispatch({ type: MOSTRAR_MEDICAMENTO_ENTREGADO_REQUEST })

		medEntregadoSocket.emit('mostrar_medicamentoEntregado', { 
			id_medicamentoEntregado: idMedicamentoEntregado 
		})

		medEntregadoSocket.on('mostrar_medicamentoEntregado', (data) => {
			if(data.error) {
				dispatch({ type: MOSTRAR_MEDICAMENTO_ENTREGADO_FALLO, payload: data.error })
			} else {
			console.log(data)
				// Guardamos el estado de impresión..
				localStorage.setItem('medicamentoEntregadoImprimido', data.medicamentoEntregado.imprimido)

				dispatch({ type: MOSTRAR_MEDICAMENTO_ENTREGADO_EXITO, payload: data })
			}
		})
	}
}

export function editarMedicamentoEntregado(datosFormulario) {
	return (dispatch) => {

		dispatch({ type: EDITAR_MEDICAMENTO_ENTREGADO_REQUEST })

		medEntregadoSocket.emit('editar_medicamentoEntregado', datosFormulario)

		medEntregadoSocket.on('editar_medicamentoEntregado', (data) => {
			if(data.error) {
				dispatch({ type: EDITAR_MEDICAMENTO_ENTREGADO_FALLO, payload: data.error })
			} else {
				dispatch({ type: EDITAR_MEDICAMENTO_ENTREGADO_EXITO, payload: data })
			}
		})

	}
}









