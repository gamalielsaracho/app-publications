import AnalisisSolicitadoTipo from './analisisSolicitadoTipo.model'


exports.listar = function(req, res, next) {
	let idAnalisisSolicitado = req.params.idAnalisisSolicitado

	AnalisisSolicitadoTipo.find(idAnalisisSolicitado, (err, analisisSolicitadoTipos) => {
		// console.log(analisisSolicitadoTipos)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ analisisSolicitadoTipos: analisisSolicitadoTipos })
	})
}


exports.crear = function(req, res, next) {

	let datos = {
		// id_analisisSolicitadoTipo: null,
		id_analisisSolicitado: req.body.id_analisisSolicitado,
		id_tipoAnalisis: req.body.id_tipoAnalisis
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_analisisSolicitado = datos.id_analisisSolicitado
	datosVerificar.id_tipoAnalisis = datos.id_tipoAnalisis

	AnalisisSolicitadoTipo.verifyIfExist(datosVerificar, (err, tipoExistente) => {
		if(err) {
			console.log(err)
		}

		if(tipoExistente[0]) {
			return res.status(422).json({ error: 'Este tipo de análisis ya está registrado' })
		} else {
			AnalisisSolicitadoTipo.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				AnalisisSolicitadoTipo.findById(result.insertId, (err, analisisSolicitadoTipo) => {
					// console.log(analisisSolicitadoTipo)

					if(err) {
						console.log(err)
						return res.json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({ 
						mensaje: 'Se agregó exitósamente.',
						analisisSolicitadoTipoAgregado: analisisSolicitadoTipo[0]
					})
				})

			})
		}
	})
}


exports.eliminar = function(req, res, next) {
	let idAnalisisSolicitadoTipo = req.params.idAnalisisSolicitadoTipo

	AnalisisSolicitadoTipo.delete(idAnalisisSolicitadoTipo, (err, result) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_analisisSolicitadoTipo: idAnalisisSolicitadoTipo
		})
	})
}