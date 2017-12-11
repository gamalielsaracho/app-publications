import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import {
	crearMedicamentoAgregado,
	editarMedicamentoAgregado,
	cerrarFormularioMedicamentoAgregado
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

	if(!values.id_medicamento) {
		errors.id_medicamento = 'Medicamento obligatorio.'
	}

	if(!values.lote) {
		errors.lote = 'Lote Obligatorio.'
	} else if (values.lote.trim() < 3) {
   		errors.lote = 'Introducir 3 caracteres.'
	}
	
	if(!values.cantidad) {
		errors.cantidad = 'Cantidad Obligatorio.'
	} else if (values.cantidad.toString().trim() == '' || values.cantidad.toString().trim() == '0') {
   		errors.cantidad = 'Cantidad Obligatorio.'
	}


	return errors
}

function mapStateToProps(state) {
	return {
		formulario: state.medicamentoAgregado.formulario,
		initialValues: state.medicamentoAgregado.formulario.medicamentoAgregado,
		enableReinitialize: state.medicamentoAgregado.formulario.iniciarValores,
		editarContenido: state.medicamentoAgregado.formulario.iniciarValores,

		// Para obtener el error al crear o editar.
		crear: state.medicamentoAgregado.crear,
		editar: state.medicamentoAgregado.editar,

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
		listarMedicamentoDrogas: state.medicamentoDroga.listar,


		// listar todas las presentaciones.
		listarPresentaciones: state.presentacion.listar,
	}
}


function mapDispatchToProps(dispatch) {
	return {
		crearMedicamentoAgregado: (datosFormulario) => {
			dispatch(crearMedicamentoAgregado(datosFormulario))
		},
		editarMedicamentoAgregado: (datosFormulario) => {
			dispatch(editarMedicamentoAgregado(datosFormulario))
		},
		cerrarFormularioMedicamentoAgregado: () => {
			dispatch(cerrarFormularioMedicamentoAgregado())
		},

		// Listar las presentaciones para filtrar los medicamentos.
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
	form: 'FormularioMedicamentoAgregado',
	validate
})

const selector = formValueSelector('FormularioMedicamentoAgregado')


export default connect(mapStateToProps, mapDispatchToProps)(form(Formulario))
