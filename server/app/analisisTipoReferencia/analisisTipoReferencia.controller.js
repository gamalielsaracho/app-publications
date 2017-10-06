import AnalisisTipoReferencia from './analisisTipoReferencia.model'


exports.listar = function(req, res, next) {
	let idAnalisisTipo = req.params.idAnalisisTipo

	AnalisisTipoReferencia.find(idAnalisisTipo, (err, analisisTipoReferencias) => {
		// console.log(analisisTipoReferencias)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ analisisTipoReferencias: analisisTipoReferencias })
	})
}


exports.crear = function(req, res, next) {

	let datos = {
		// id_analisisTipoAnalisisReferencia: null,
		id_analisisTipo: req.body.id_analisisTipo,
		id_analisis: req.body.id_analisis,
		id_tipoAnalisis: req.body.id_tipoAnalisis,
		id_referencia: req.body.id_referencia,
		valor: req.body.valor
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_analisis = datos.id_analisis
	datosVerificar.id_tipoAnalisis = datos.id_tipoAnalisis
	datosVerificar.id_referencia = datos.id_referencia

	AnalisisTipoReferencia.verifyIfExist(datosVerificar, (err, paramentroExistente) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(paramentroExistente[0]) {
			return res.status(422).json({ error: 'Este paramentro ya está registrado.' })
		} else {
			AnalisisTipoReferencia.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				AnalisisTipoReferencia.findById(result.insertId, (err, analisisTipoReferencia) => {
					// console.log(analisisTipoReferencia)

					if(err) {
						console.log(err)
						return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({ 
						mensaje: 'Se agregó exitósamente.',
						analisisTipoReferenciaAgregado: analisisTipoReferencia[0]
					})
				})

			})
		}
	})
}

exports.mostrarParaEditar = function(req, res, next) {
	let idAnalisisTipoAnalisisReferencia = req.params.idAnalisisTipoAnalisisReferencia

	AnalisisTipoReferencia.findByIdToUpdate(idAnalisisTipoAnalisisReferencia, (err, analisisTipoReferencia) => {
		
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(analisisTipoReferencia[0])
	})
}

exports.editar = function(req, res, next) {
	let datos = {
		id_analisisTipoAnalisisReferencia: req.body.id_analisisTipoAnalisisReferencia,
		valor: req.body.valor
	}

	AnalisisTipoReferencia.update(datos, (err) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		AnalisisTipoReferencia.findById(datos.id_analisisTipoAnalisisReferencia, (err, analisisTipoReferencia) => {
			// console.log(analisisTipoReferencia)

			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			return res.json({ 
				mensaje: 'Se actualizó exitósamente.',
				analisisTipoReferenciaActualizado: analisisTipoReferencia[0]
			})
		})

	})
}

exports.eliminar = function(req, res, next) {
	let idAnalisisTipoAnalisisReferencia = req.params.idAnalisisTipoAnalisisReferencia

	AnalisisTipoReferencia.delete(idAnalisisTipoAnalisisReferencia, (err, result) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({
			mensaje: 'Se Eliminó exitósamente.',
			id_analisisTipoAnalisisReferencia: idAnalisisTipoAnalisisReferencia
		})
	})
}