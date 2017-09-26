import TipoAnalisisParametro from './tipoAnalisisParametro.model'


exports.listar = function(req, res, next) {
	let idTipoAnalisis = req.params.idTipoAnalisis

	TipoAnalisisParametro.find(idTipoAnalisis, (err, parametrosTipoAnalisis) => {
		// console.log(parametrosTipoAnalisis)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ parametrosTipoAnalisis: parametrosTipoAnalisis })
	})
}

exports.mostrar = function(req, res, next) {

	let idTipoAnalisisParametro = req.params.idTipoAnalisisParametro

	TipoAnalisisParametro.findById(idTipoAnalisisParametro, (err, parametroTipoAnalisis) => {
		// console.log(parametroTipoAnalisis)

		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(parametroTipoAnalisis[0])
	})
}

exports.crear = function(req, res, next) {

	let datos = {
		// id_tipoAnalisisParametro: null,
		id_tipoAnalisis: req.body.id_tipoAnalisis,
		id_parametroAnalisis: req.body.id_parametroAnalisis
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_tipoAnalisis = datos.id_tipoAnalisis
	datosVerificar.id_parametroAnalisis = datos.id_parametroAnalisis

	TipoAnalisisParametro.verifyIfExist(datosVerificar, (err, parametroExistente) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		// console.log(parametroExistente[0])

		if(parametroExistente[0]) {
			return res.status(422).json({ error: 'Este paramentro ya está registrado' })
		} else {
			TipoAnalisisParametro.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				TipoAnalisisParametro.findById(result.insertId, (err, parametroTipoAnalisis) => {
					// console.log(parametroTipoAnalisis)

					if(err) {
						console.log(err)
						return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({ 
						mensaje: 'Se agregó exitósamente.',
						parametroTipoAnalisisAgregado: parametroTipoAnalisis[0]
					})					
				})

			})
		}
	})
}

// exports.mostrarParaEditar = function(req, res, next) {
// 	let idPreconsultaParametro = req.params.idPreconsultaParametro

// 	TipoAnalisisParametro.findByIdToUpdate(idPreconsultaParametro, (err, parametroPreConsulta) => {
		
// 		if(err) {
// 			console.log(err)
// 			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
// 		}

// 		return res.json(parametroPreConsulta[0])
// 	})
// }

// exports.editar = function(req, res, next) {
// 	let datos = {
// 		id_preconsultaParametro: req.body.id_preconsultaParametro,
// 		id_preconsulta: req.body.id_preconsulta,
// 		id_parametroPreconsulta: req.body.id_parametroPreconsulta,
// 		valor: req.body.valor,
// 		observaciones: req.body.observaciones
// 	}

// 	TipoAnalisisParametro.update(datos, (err) => {
// 		if(err) {
// 			console.log(err)
// 			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
// 		}

// 		TipoAnalisisParametro.findById(datos.id_preconsultaParametro, (err, parametroPreConsulta) => {
// 			// console.log(parametroPreConsulta)

// 			if(err) {
// 				console.log(err)
// 				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
// 			}

// 			return res.json({ 
// 				mensaje: 'Se actualizó exitósamente.',
// 				parametroPreConsultaActualizado: parametroPreConsulta[0]
// 			})
// 		})

// 	})
// }

exports.eliminar = function(req, res, next) {
	let idTipoAnalisisParametro = req.params.idTipoAnalisisParametro

	TipoAnalisisParametro.delete(idTipoAnalisisParametro, (err) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_tipoAnalisisParametro: idTipoAnalisisParametro
		})
	})
}