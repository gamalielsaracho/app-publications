import DiagnosticoConsulta from './diagnosticoConsulta.model'


exports.listar = function(req, res, next) {
	let idConsulta = req.params.idConsulta

	DiagnosticoConsulta.find(idConsulta, (err, diagnosticosConsulta) => {
		// console.log(diagnosticosConsulta)
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ diagnosticosConsulta: diagnosticosConsulta })
	})
}

exports.mostrar = function(req, res, next) {

	let idDiagnosticoConsulta = req.params.idDiagnosticoConsulta

	DiagnosticoConsulta.findById(idDiagnosticoConsulta, (err, diagnosticoConsulta) => {
		// console.log(diagnosticoConsulta)

		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(diagnosticoConsulta[0])
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

	DiagnosticoConsulta.verifyIfExist(datosVerificar, (err, diagnosticoExistente) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(diagnosticoExistente[0]) {
			return res.status(422).json({ error: 'Este diagnóstico ya está registrado' })
		} else {
			DiagnosticoConsulta.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				DiagnosticoConsulta.findById(result.insertId, (err, diagnostico) => {
					// console.log(diagnostico)

					if(err) {
						console.log(err)
						return res.json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({
						mensaje: 'Se agregó exitósamente.',
						diagnosticoAgregado: diagnostico[0]
					})
				})

			})
		}
	})
}

exports.mostrarParaEditar = function(req, res, next) {
	let idDiagnosticoConsulta = req.params.idDiagnosticoConsulta

	DiagnosticoConsulta.findByIdToUpdate(idDiagnosticoConsulta, (err, diagnostico) => {
		
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(diagnostico[0])
	})
}

exports.editar = function(req, res, next) {
	let datos = {
		id_diagnosticoConsulta: req.body.id_diagnosticoConsulta,
		observaciones: req.body.observaciones
		// id_diagnostico: req.body.id_diagnostico,
		// id_consulta: req.body.id_consulta,
	}

	DiagnosticoConsulta.update(datos, (err) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		DiagnosticoConsulta.findById(datos.id_diagnosticoConsulta, (err, diagnostico) => {
			// console.log(diagnostico)

			if(err) {
				console.log(err)
				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			return res.json({ 
				mensaje: 'Se actualizó exitósamente.',
				diagnosticoActualizado: diagnostico[0]
			})
		})

	})
}

exports.eliminar = function(req, res, next) {
	let idDiagnosticoConsulta = req.params.idDiagnosticoConsulta

	DiagnosticoConsulta.delete(idDiagnosticoConsulta, (err, result) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_diagnosticoConsulta: idDiagnosticoConsulta
		})
	})
}