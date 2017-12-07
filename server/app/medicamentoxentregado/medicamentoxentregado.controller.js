import MedicamentoXentregado from './medicamentoXentregado.model'

import MedicamentoDroga from '../medicamentoDroga/medicamentoDroga.model'


exports.listar = function(req, res, next) {
	let idMedicamentoEntregado = req.params.idMedicamentoEntregado

	MedicamentoXentregado.find(idMedicamentoEntregado, (err, medicamentosAgregados) => {
		// console.log(medicamentosAgregados)
		
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ medicamentosAgregados: medicamentosAgregados })
	})
}


exports.mostrarNested = function(req, res, next) {
	let idMedicamentoXentregado = req.params.idMedicamentoXentregado

	MedicamentoXentregado.findById(idMedicamentoXentregado, (err, medicamentoAgregado) => {
			// console.log(medicamentoAgregado)
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		MedicamentoDroga.find(medicamentoAgregado[0].medicamento.id_medicamento , (err, drogas) => {
			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
			}

			medicamentoAgregado[0].drogas = drogas

			return res.json(medicamentoAgregado[0])
		})
	})
}


exports.crear = function(req, res, next) {

	let datos = {
		// id_medicamentoXentregado: null,
		id_medicamento: req.body.id_medicamento,
		id_medicamentoEntregado: req.body.id_medicamentoEntregado,
		lote: req.body.lote,
		cantidad: req.body.cantidad
	}

	// console.log(datos)

	MedicamentoXentregado.create(datos, (err, result) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		MedicamentoXentregado.findById(result.insertId, (err, medicamentoAgregado) => {
			// console.log(medicamentoAgregado)

			if(err) {
				console.log(err)
				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			return res.json({ 
				mensaje: 'Se agregó exitósamente.',
				medicamentoAgregado: medicamentoAgregado[0]
			})
		})

	})
}

exports.mostrarParaEditar = function(req, res, next) {
	let idMedicamentoXentregado = req.params.idMedicamentoXentregado

	MedicamentoXentregado.findByIdToUpdate(idMedicamentoXentregado, (err, medicamentoAgregado) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		MedicamentoDroga.find(medicamentoAgregado[0].id_medicamento , (err, drogas) => {
			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
			}

			medicamentoAgregado[0].drogas = drogas

			return res.json(medicamentoAgregado[0])
		})
	})
}

exports.editar = function(req, res, next) {
	let datos = {
		id_medicamentoXentregado: req.body.id_medicamentoXentregado,
		id_medicamento: req.body.id_medicamento,
		lote: req.body.lote,
		cantidad: req.body.cantidad
	}

	MedicamentoXentregado.update(datos, (err) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		MedicamentoXentregado.findById(datos.id_medicamentoXentregado, (err, medicamentoAgregado) => {
			// console.log(medicamentoAgregado)
			if(err) {
				console.log(err)
				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			return res.json({ 
				mensaje: 'Se actualizó exitósamente.',
				medicamentoAgregadoActualizado: medicamentoAgregado[0]
			})
		})

	})
}

exports.eliminar = function(req, res, next) {
	let idMedicamentoXentregado = req.params.idMedicamentoXentregado

	MedicamentoXentregado.delete(idMedicamentoXentregado, (err, result) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_medicamentoXentregado: idMedicamentoXentregado
		})
	})
}