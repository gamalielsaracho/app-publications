import Referencia from './referencia.model'

exports.listar = function(req, res, next) {
	Referencia.find((err, referencias) => {
		// console.log(referencias)
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ referencias: referencias })
	})
}

exports.listarPorParametroAnalisis = function(req, res, next) {
	let idParametroAnalisis = req.params.idParametroAnalisis

	Referencia.findByIdParametroAnalisis(idParametroAnalisis, (err, referencias) => {
		// console.log(referencias)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ referencias: referencias })
	})
}

exports.mostrar = function(req, res, next) {

	let idReferencia = req.params.idReferencia

	Referencia.findById(idReferencia, (err, referencia) => {
		// console.log(referencia)

		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(referencia[0])
	})
}

exports.crear = function(req, res, next) {

	let datos = {
		// id_referencia: null,
		diasMaximos: req.body.diasMaximos,
		mesesMaximos: req.body.mesesMaximos,
		anosMaximos: req.body.anosMaximos,
		superior: req.body.superior,
		inferior: req.body.inferior,
		diasMinimos: req.body.diasMinimos,
		mesesMinimos: req.body.mesesMinimos,
		anosMinimos: req.body.anosMinimos,
		sexo: req.body.sexo,
		id_parametroAnalisis: req.body.id_parametroAnalisis
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_parametroAnalisis = datos.id_parametroAnalisis

	Referencia.verifyIfExist(datosVerificar, (err, referenciaExistente) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(referenciaExistente[0]) {
			return res.status(422).json({ error: 'Esta referencia ya está registrada' })
		} else {
			Referencia.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				Referencia.findById(result.insertId, (err, referencia) => {
					// console.log(referencia)
					if(err) {
						console.log(err)
						return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({ 
						mensaje: 'Se agregó exitósamente.',
						referenciaAgregada: referencia[0]
					})
				})

			})
		}
	})
}

exports.mostrarParaEditar = function(req, res, next) {
	let idReferencia = req.params.idReferencia

	Referencia.findByIdToUpdate(idReferencia, (err, referencia) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(referencia[0])
	})
}

exports.editar = function(req, res, next) {
	let datos = {
		diasMaximos: req.body.diasMaximos,
		mesesMaximos: req.body.mesesMaximos,
		anosMaximos: req.body.anosMaximos,
		superior: req.body.superior,
		inferior: req.body.inferior,
		diasMinimos: req.body.diasMinimos,
		mesesMinimos: req.body.mesesMinimos,
		anosMinimos: req.body.anosMinimos,
		sexo: req.body.sexo
	}

	Referencia.update(datos, (err) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		Referencia.findById(datos.id_referencia, (err, referencia) => {
			// console.log(referencia)

			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			return res.json({ 
				mensaje: 'Se actualizó exitósamente.',
				referenciaActualizada: referencia[0]
			})
		})

	})
}

exports.eliminar = function(req, res, next) {
	let idReferencia = req.params.idReferencia

	Referencia.delete(idReferencia, (err, result) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_referencia: idReferencia
		})
	})
}