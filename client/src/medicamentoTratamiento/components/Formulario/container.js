import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import {
	crearMedicamentoTratamiento,
	editarMedicamentoTratamiento,
	cerrarFormularioMedicamentoTratamiento
} from '../../actions'


import {
	listarMedicamentos
} from '../../../medicamento/actions'

import {
	listarTodaLaListaMedicamentoDrogas
} from '../../../medicamentoDroga/actions'

// Filtro medicamentos.
import {
	listarPresentaciones
} from '../../../presentacion/actions'


import Formulario from './Formulario'

const validate = (values) => {
	const errors = {}

	// id_medicamento
	// medicamentoNoExistente
	// cantidadConsumo
	// cantidadTiempo
	// duracionConsumo

	if(values.id_medicamento && values.medicamentoNoExistente) {
		errors.id_medicamento = 'Tienes que introducir o un medicamento existente.'
		errors.medicamentoNoExistente = 'O un medicamento no existente.'
	}

	if(!values.id_medicamento && !values.medicamentoNoExistente) {
		errors.id_medicamento = 'Tienes que introducir o un medicamento existente.'
		errors.medicamentoNoExistente = 'O un medicamento no existente.'
	}

	if(!values.cantidadConsumo) {
   		errors.cantidadConsumo = 'Obligatorio Ej. (1 comp, 7.5 ml, 3 disparos).'
	} else if (values.cantidadConsumo.trim().length > 30) {
   		errors.cantidadConsumo = 'No más de 30 caracteres.'
	}

	if(!values.cantidadTiempo) {
   		errors.cantidadTiempo = 'Obligatorio Ej. (cada 4 horas, cada 8 horas).'
	} else if (values.cantidadTiempo.trim().length > 30) {
   		errors.cantidadTiempo = 'No más de 30 caracteres.'
	}

	if(!values.duracionConsumo) {
   		errors.duracionConsumo = 'Obligatorio Ej. (por 15 días, por 2 meses).'
	} else if (values.duracionConsumo.trim().length > 30) {
   		errors.duracionConsumo = 'No más de 30 caracteres.'
	}

	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.medicamentoTratamiento.formulario,
		initialValues: state.medicamentoTratamiento.formulario.medicamentoTratamiento,
		enableReinitialize: state.medicamentoTratamiento.formulario.iniciarValores,
		editarContenido: state.medicamentoTratamiento.formulario.iniciarValores,


		// Para obtener el error al crear o editar.
		crear: state.medicamentoTratamiento.crear,
		editar: state.medicamentoTratamiento.editar,

		// listar todas las presentaciones.
		listarPresentaciones: state.presentacion.listar,

		// Listar todos los medicamentos 
		// al ejecutar la función listarMedicamentosFuncion.
		listarMedicamentos: state.medicamento.listar,


		// DATOS DEL FORMUARIO DE FILTRO PARA FILTRAR LOS MEDICAMENTOS.
		// Obtenemos los valores de los inputs para pasarle
		// el objeto valoresFiltro.
		valoresFiltro: {
			id_presentacion: selector(state, 'id_presentacion') || ''
    	},

		// Para filtrar las drogas según el id_medicamento obtenido desde
		// el select option.
		id_medicamento: selector(state, 'id_medicamento'),


		// Listar todas las drogas para poder filtrarlas despues 
		// por id_medicamento.
		listarMedicamentoDrogas: state.medicamentoDroga.listar
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearMedicamentoTratamiento: (datosFormulario) => {
			dispatch(crearMedicamentoTratamiento(datosFormulario))
		},
		cerrarFormularioMedicamentoTratamiento: () => {
			// var r = confirm("Está seguro que desea cancelar?");
		    // if (r == true) {
				dispatch(cerrarFormularioMedicamentoTratamiento())
		    // }
		},
		editarMedicamentoTratamiento: (datosFormulario) => {
			dispatch(editarMedicamentoTratamiento(datosFormulario))
		},

		listarPresentacionesFuncion: () => {
			dispatch(listarPresentaciones())
		},


		// Función para llamarlo en componentWillMount.
		listarMedicamentosFuncion: () => {
			dispatch(listarMedicamentos())
		},

		// Listar todas las drogas existentes para despues poder 
		// filtrarlas.
		listarTodaLaListaMedicamentoDrogasFuntion: () => {
			dispatch(listarTodaLaListaMedicamentoDrogas())
		},

		filtrarDrogasByIdMedicamento: (drogas, valores) => {
	 		drogas = drogas.filter((droga) => {
	 			return droga.medicamentoDroga.id_medicamento.toString().match(valores.id_medicamento)
	 		})

	 		return drogas

 			// console.log(personales)
 		}
	}
}

const form = reduxForm({
	form: 'FormularioMedicamentoTratamiento',
	validate
})

const selector = formValueSelector('FormularioMedicamentoTratamiento')


export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
