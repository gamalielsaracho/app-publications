import PreConsultaParametro from './preConsultaParametro.model'


exports.listar = function(req, res, next) {
	let idPreconsulta = req.params.idPreconsulta

	PreConsultaParametro.find(idPreconsulta, (err, parametrosPreConsulta) => {
		// console.log(parametrosPreConsulta)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ parametrosPreConsulta: parametrosPreConsulta })
	})
}

exports.mostrar = function(req, res, next) {

	let idPreconsultaParametro = req.params.idPreconsultaParametro

	PreConsultaParametro.findById(idPreconsultaParametro, (err, parametroPreConsulta) => {
		// console.log(parametroPreConsulta)

		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(parametroPreConsulta[0])
	})
}

exports.crear = function(req, res, next) {

	let datos = {
		// id_preconsultaParametro: null,
		id_preconsulta: req.body.id_preconsulta,
		id_parametroPreconsulta: req.body.id_parametroPreconsulta,
		valor: req.body.valor,
		observaciones: req.body.observaciones
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_preconsulta = datos.id_preconsulta
	datosVerificar.id_parametroPreconsulta = datos.id_parametroPreconsulta

	PreConsultaParametro.verifyIfExist(datosVerificar, (err, parametroPreConsultaExistente) => {
		if(err) {
			console.log(err)
		}

		if(parametroPreConsultaExistente[0]) {
			return res.json({ error: 'Este paramentro ya está registrado' })
		} else {
			PreConsultaParametro.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				PreConsultaParametro.findById(result.insertId, (err, parametroPreConsulta) => {
					// console.log(parametroPreConsulta)

					if(err) {
						console.log(err)
						return res.json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({ 
						mensaje: 'Se agregó exitósamente.',
						parametroPreConsultaAgregado: parametroPreConsulta[0]
					})
				})

			})
		}
	})
}

exports.mostrarParaEditar = function(req, res, next) {
	let idPreconsultaParametro = req.params.idPreconsultaParametro

	PreConsultaParametro.findByIdToUpdate(idPreconsultaParametro, (err, parametroPreConsulta) => {
		
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(parametroPreConsulta[0])
	})
}

exports.editar = function(req, res, next) {
	let datos = {
		id_preconsultaParametro: req.body.id_preconsultaParametro,
		id_preconsulta: req.body.id_preconsulta,
		id_parametroPreconsulta: req.body.id_parametroPreconsulta,
		valor: req.body.valor,
		observaciones: req.body.observaciones
	}

	PreConsultaParametro.update(datos, (err) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ mensaje: 'Se actualizó exitósamente.' })
	})
}

exports.eliminar = function(req, res, next) {
	let idPreconsultaParametro = req.params.idPreconsultaParametro

	PreConsultaParametro.delete(idPreconsultaParametro, (err, result) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_preconsultaParametro: idPreconsultaParametro
		})
	})
}