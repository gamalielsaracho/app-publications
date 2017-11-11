import PreConsultaParametro from './preConsultaParametro.model'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'

import fieldsToEditData from './././../useFul/fieldsToEditData.js'

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
			return res.status(422).json({ error: 'Este paramentro ya está registrado' })
		} else {
			PreConsultaParametro.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				let data = {
					id_preconsultaParametro: result.insertId
				}

				PreConsultaParametro.findById(data, (err, parametroPreConsulta) => {
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
	let data = {
		id_preconsultaParametro: req.body.id_preconsultaParametro,
		id_preconsulta: req.body.id_preconsulta,
		id_parametroPreconsulta: req.body.id_parametroPreconsulta,
		valor: req.body.valor,
		observaciones: req.body.observaciones,
		idPersonal: req.body.idPersonal
	}

	PreConsultaParametro.findById(data, (err, parametroPreConsultaDatosAnterior) => {
		// console.log(parametroPreConsulta)
		let preAnt = parametroPreConsultaDatosAnterior[0]


		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		PreConsultaParametro.update(data, (err) => {
			if(err) {
				console.log(err)
				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			PreConsultaParametro.findById(data, (err, parametroPreConsultaDatosNuevo) => {
				// console.log(parametroPreConsulta)
				let preNue = parametroPreConsultaDatosNuevo[0]


				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				let listaCampos = [
					{ 
						nombreCampo: 'Nombre',
						datoCampoAnterior: preAnt.parametro.descripcion,
						datoCampoNuevo: preNue.parametro.descripcion
					},
					{ 
						nombreCampo: 'Valor',
						datoCampoAnterior: `${preAnt.preconsultaParametro.valor} ${preAnt.unidad.descripcion}`,
						datoCampoNuevo: `${preNue.preconsultaParametro.valor} ${preNue.unidad.descripcion}`
					},
					{ 
						nombreCampo: 'Observaciones',
						datoCampoAnterior: preAnt.preconsultaParametro.observaciones,
						datoCampoNuevo: preNue.preconsultaParametro.observaciones
					}
				]


				// console.log(listaCampos)
				fieldsToEditData(data.id_preconsultaParametro, listaCampos, 'actualización', 'pre-consulta-parametro', data.idPersonal, data.id_preconsulta, (err, datos) => {
					if(err) {
						console.log(err)
						return res.json({ error: 'Ocurrió un error en la auditoría de este módulo.' })
					}

					// .. Ejecutar esto despues de editar el registro. 
					console.log(datos)

					AuditoriaModulo1.create(datos, (err) => {
						if(err) {
							console.log(err)
							return res.json({ error: 'Ocurrió un error en la auditoría de este módulo.' })
						}
					})
				})

				return res.json({ 
					mensaje: 'Se actualizó exitósamente.',
					parametroPreConsultaActualizado: preNue
				})
									
			})

		})
	})

}

exports.eliminar = function(req, res, next) {
	let idPreconsultaParametro = req.params.idPreconsultaParametro
	let idPersonalParametro = req.params.idPersonalParametro

	let data = {
		id_preconsultaParametro: idPreconsultaParametro 
	}

	PreConsultaParametro.findById(data, (err, parametroPreConsultaDatosAnterior) => {
		// console.log(parametroPreConsulta)
		let preAnt = parametroPreConsultaDatosAnterior[0]

		console.log(preAnt)
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		let listaCampos = [
			{
				nombreCampo: 'Nombre',
				datoCampoAnterior: preAnt.parametro.descripcion
			},
			{ 
				nombreCampo: 'Valor',
				datoCampoAnterior: `${preAnt.preconsultaParametro.valor} ${preAnt.unidad.descripcion}`
			},
			{ 
				nombreCampo: 'Observaciones',
				datoCampoAnterior: preAnt.preconsultaParametro.observaciones
			}
		]


		PreConsultaParametro.delete(idPreconsultaParametro, (err, result) => {
			if(err) {
				console.log(err)
				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			// console.log(listaCampos)
			fieldsToEditData(preAnt.preconsultaParametro.id_preconsultaParametro, listaCampos, 'eliminación', 'pre-consulta-parametro', idPersonalParametro, preAnt.preconsultaParametro.id_preconsulta, (err, datos) => {
				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error en la auditoría de este módulo.' })
				}

				// .. Ejecutar esto despues de eliminar el registro. 
				console.log(datos)

				AuditoriaModulo1.create(datos, (err) => {
					if(err) {
						console.log(err)
						return res.json({ error: 'Ocurrió un error en la auditoría de este módulo.' })
					}
				})
			})

			return res.json({ 
				mensaje: 'Se Eliminó exitósamente.',
				id_preconsultaParametro: idPreconsultaParametro
			})
		})

	})

}