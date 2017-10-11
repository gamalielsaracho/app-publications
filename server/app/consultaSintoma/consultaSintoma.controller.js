import ConsultaSintoma from './consultaSintoma.model'


exports.listar = function(req, res, next) {
	let idConsulta = req.params.idConsulta

	ConsultaSintoma.find(idConsulta, (err, sintomasConsulta) => {
		// console.log(sintomasConsulta)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ sintomasConsulta: sintomasConsulta })
	})
}

exports.mostrarParaEditar = function(req, res, next) {

	let idConsultaSintoma = req.params.idConsultaSintoma

	ConsultaSintoma.findByIdToEdit(idConsultaSintoma, (err, sintomaConsulta) => {
		// console.log(sintomaConsulta)

		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(sintomaConsulta[0])
	})
}

exports.crear = function(req, res, next) {

	let datos = {
		// id_consultaSintoma: null,
		id_sintoma: req.body.id_sintoma,
		id_consulta: req.body.id_consulta,
		observaciones: req.body.observaciones
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_sintoma = datos.id_sintoma
	datosVerificar.id_consulta = datos.id_consulta

	ConsultaSintoma.verifyIfExist(datosVerificar, (err, sintomaExistente) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(sintomaExistente[0]) {
			return res.status(422).json({ error: 'Este síntoma ya está registrado' })
		} else {
			ConsultaSintoma.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				ConsultaSintoma.findById(result.insertId, (err, sintomaConsulta) => {
					// console.log(sintomaConsulta)

					if(err) {
						console.log(err)
						return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({ 
						mensaje: 'Se agregó exitósamente.',
						sintomaConsultaAgregado: sintomaConsulta[0]
					})
				})

			})
		}
	})
}

exports.editar = function(req, res, next) {
	let datos = {
		id_consultaSintoma: req.body.id_consultaSintoma,
		id_sintoma: req.body.id_sintoma,
		id_consulta: req.body.id_consulta,
		observaciones: req.body.observaciones
	}

	ConsultaSintoma.update(datos, (err) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		ConsultaSintoma.findById(datos.id_consultaSintoma, (err, sintomaConsulta) => {
			// console.log(sintomaConsulta)

			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			return res.json({ 
				mensaje: 'Se actualizó exitósamente.',
				sintomaConsultaActualizado: sintomaConsulta[0]
			})
		})

	})
}

exports.eliminar = function(req, res, next) {
	let idConsultaSintoma = req.params.idConsultaSintoma

	ConsultaSintoma.delete(idConsultaSintoma, (err, result) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_consultaSintoma: idConsultaSintoma
		})
	})
}