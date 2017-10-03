import AnalisisTipo from './analisisTipo.model'


exports.listar = function(req, res, next) {
	let idAnalisis = req.params.idAnalisis

	AnalisisTipo.find(idAnalisis, (err, analisisTipos) => {
		// console.log(analisisTipos)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ analisisTipos: analisisTipos })
	})
}

exports.mostrar = function(req, res, next) {

	let idAnalisisTipo = req.params.idAnalisisTipo

	AnalisisTipo.findById(idAnalisisTipo, (err, analisisTipo) => {
		// console.log(analisisTipo)

		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(analisisTipo[0])
	})
}

exports.crear = function(req, res, next) {

	let datos = {
		// id_preconsultaParametro: null,
		id_analisis: req.body.id_analisis,
		id_tipoAnalisis: req.body.id_tipoAnalisis
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_analisis = datos.id_analisis
	datosVerificar.id_tipoAnalisis = datos.id_tipoAnalisis

	AnalisisTipo.verifyIfExist(datosVerificar, (err, tipoExistente) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(tipoExistente[0]) {
			return res.status(422).json({ error: 'Este tipo de análisis ya está registrado' })
		} else {
			AnalisisTipo.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				AnalisisTipo.findById(result.insertId, (err, analisisTipo) => {
					// console.log(analisisTipo)

					if(err) {
						console.log(err)
						return res.json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({ 
						mensaje: 'Se agregó exitósamente.',
						analisisTipoAgregado: analisisTipo[0]
					})
				})

			})
		}
	})
}


exports.eliminar = function(req, res, next) {
	let idAnalisisTipo = req.params.idAnalisisTipo

	AnalisisTipo.delete(idAnalisisTipo, (err, result) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_analisisTipo: idAnalisisTipo
		})
	})
}