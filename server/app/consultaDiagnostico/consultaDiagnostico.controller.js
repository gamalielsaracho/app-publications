import ConsultaDiagnostico from './consultaDiagnostico.model'


exports.listar = function(req, res, next) {
	let idConsulta = req.params.idConsulta

	ConsultaDiagnostico.find(idConsulta, (err, consultaDiagnosticos) => {
		// console.log(consultaDiagnosticos)
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ consultaDiagnosticos: consultaDiagnosticos })
	})
}

exports.mostrar = function(req, res, next) {

	let idConsultaDiagnostico = req.params.idConsultaDiagnostico

	ConsultaDiagnostico.findById(idConsultaDiagnostico, (err, consultaDiagnostico) => {
		// console.log(consultaDiagnostico)

		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(consultaDiagnostico[0])
	})
}

exports.crear = function(req, res, next) {

	let datos = {
		id_diagnostico: req.body.id_diagnostico,
		id_consulta: req.body.id_consulta,
		observaciones: req.body.observaciones
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_consulta = datos.id_consulta
	datosVerificar.id_diagnostico = datos.id_diagnostico

	ConsultaDiagnostico.verifyIfExist(datosVerificar, (err, diagnosticoExistente) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(diagnosticoExistente[0]) {
			return res.status(422).json({ error: 'Este diagnóstico ya está registrado' })
		} else {
			ConsultaDiagnostico.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				ConsultaDiagnostico.findById(result.insertId, (err, consultaDiagnostico) => {
					// console.log(consultaDiagnostico)

					if(err) {
						console.log(err)
						return res.json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({
						mensaje: 'Se agregó exitósamente.',
						consultaDiagnosticoAgregado: consultaDiagnostico[0]
					})
				})

			})
		}
	})
}

exports.mostrarParaEditar = function(req, res, next) {
	let idConsultaDiagnostico = req.params.idConsultaDiagnostico

	ConsultaDiagnostico.findByIdToUpdate(idConsultaDiagnostico, (err, consultaDiagnostico) => {
		// console.log(consultaDiagnostico[0])
		
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(consultaDiagnostico[0])
	})
}

exports.editar = function(req, res, next) {
	let datos = {
		id_consultaDiagnostico: req.body.id_consultaDiagnostico,
		observaciones: req.body.observaciones
		// id_diagnostico: req.body.id_diagnostico,
		// id_consulta: req.body.id_consulta,
	}

	ConsultaDiagnostico.update(datos, (err) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		ConsultaDiagnostico.findById(datos.id_consultaDiagnostico, (err, consultaDiagnostico) => {
			// console.log(consultaDiagnostico)

			if(err) {
				console.log(err)
				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			return res.json({ 
				mensaje: 'Se actualizó exitósamente.',
				consultaDiagnosticoActualizado: consultaDiagnostico[0]
			})
		})

	})
}

exports.eliminar = function(req, res, next) {
	let idConsultaDiagnostico = req.params.idConsultaDiagnostico

	ConsultaDiagnostico.delete(idConsultaDiagnostico, (err, result) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_consultaDiagnostico: idConsultaDiagnostico
		})
	})
}