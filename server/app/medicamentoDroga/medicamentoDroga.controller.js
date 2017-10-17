import MedicamentoDroga from './medicamentoDroga.model'

exports.listarTodaLaLista = function(req, res, next) {

	MedicamentoDroga.findAllList((err, medicamentoDrogas) => {
		// console.log(medicamentoDrogas)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ medicamentoDrogas: medicamentoDrogas })
	})
}

exports.listar = function(req, res, next) {
	let idMedicamento = req.params.idMedicamento

	MedicamentoDroga.find(idMedicamento, (err, medicamentoDrogas) => {
		// console.log(medicamentoDrogas)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ medicamentoDrogas: medicamentoDrogas })
	})
}


exports.crear = function(req, res, next) {

	let datos = {
		// id_medicamentoDroga: null,
		id_medicamento: req.body.id_medicamento,
		id_droga: req.body.id_droga,
		descripcionProporcion: req.body.descripcionProporcion
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_medicamento = datos.id_medicamento
	datosVerificar.id_droga = datos.id_droga

	MedicamentoDroga.verifyIfExist(datosVerificar, (err, drogaExistente) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(drogaExistente[0]) {
			return res.status(422).json({ error: 'Esta droga ya está registrada' })
		} else {
			MedicamentoDroga.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				MedicamentoDroga.findById(result.insertId, (err, medicamentoDroga) => {
					// console.log(medicamentoDroga)

					if(err) {
						console.log(err)
						return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({ 
						mensaje: 'Se agregó exitósamente.',
						medicamentoDrogaAgregado: medicamentoDroga[0]
					})
				})

			})
		}
	})
}

exports.mostrarParaEditar = function(req, res, next) {
	let idMedicamentoDroga = req.params.idMedicamentoDroga

	MedicamentoDroga.findByIdToUpdate(idMedicamentoDroga, (err, medicamentoDroga) => {
		
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(medicamentoDroga[0])
	})
}

exports.editar = function(req, res, next) {
	let datos = {
		id_medicamentoDroga: req.body.id_medicamentoDroga,
		descripcionProporcion: req.body.descripcionProporcion
	}

	MedicamentoDroga.update(datos, (err) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		MedicamentoDroga.findById(datos.id_medicamentoDroga, (err, medicamentoDroga) => {
			// console.log(medicamentoDroga)

			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			return res.json({ 
				mensaje: 'Se actualizó exitósamente.',
				medicamentoDrogaActualizado: medicamentoDroga[0]
			})
		})

	})
}

exports.eliminar = function(req, res, next) {
	let idMedicamentoDroga = req.params.idMedicamentoDroga

	MedicamentoDroga.delete(idMedicamentoDroga, (err, result) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_medicamentoDroga: idMedicamentoDroga
		})
	})
}