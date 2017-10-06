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


exports.listarReferenciasParaInsertar = function(req, res, next) {
	let dato = {
		fechaNacimiento: req.params.fechaNacimiento,
		sexo: req.params.sexo,
		id_tipoAnalisis: req.params.idTipoAnalisis
	}

	var dateNow = new Date() 
	var datePaciente = new Date(dato.fechaNacimiento)

	var anhoActual = dateNow.getFullYear()
	var mesActual = dateNow.getMonth() + 1
	var diaActual = dateNow.getDay()


	// var diaActual = dateNow.getFullYear()

	var anhoPaciente = datePaciente.getFullYear()
	var mesPaciente = datePaciente.getMonth() + 1
	var diaPaciente = datePaciente.getDay()


	// edad del paciente
	var cantidadAnhos = anhoActual - anhoPaciente
	var cantidadMeses = 12 - mesPaciente

	var cantidadMesesRecienNacido = mesActual - mesPaciente

	if(cantidadMesesRecienNacido == 0) {
		var cantidadDias =  diaActual - diaPaciente
	}

	// let condition

	if(cantidadAnhos) {
		cantidadMeses = null
		cantidadDias = null
	} else {
		if(cantidadMeses) {
			cantidadAnhos = null
			cantidadDias = null
		} else {
			cantidadMeses = null
			cantidadAnhos = null
		}
	}

	let referenciasFiltradas = []
	Referencia.findListToInsert(dato, (err, referencias) => {
		referenciasFiltradas = referencias

		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		// referenciasFiltradas = referenciasFiltradas.filter((i) => {
		// 	return (i.general == true || i.sexo == dato.sexo || 
		// 		(i.anosMinimos < cantidadAnhos && cantidadAnhos <i.anosMaximos) ||
		// 		(i.mesesMinimos < cantidadMeses && cantidadMeses <i.mesesMaximos) ||
		// 		(i.diasMinimos < cantidadDias && cantidadDias <i.diasMaximos)
		// 	)

		// })

		return res.json({ referencias: referenciasFiltradas })
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
		general: req.body.general,
		id_parametroAnalisis: req.body.id_parametroAnalisis
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_parametroAnalisis = datos.id_parametroAnalisis

	// Referencia.verifyIfExist(datosVerificar, (err, referenciaExistente) => {
	// 	if(err) {
	// 		console.log(err)
	// 		return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
	// 	}

	// 	if(referenciaExistente[0]) {
		// 	return res.status(422).json({ error: 'Esta referencia ya está registrada' })
		// } else {
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
	// 	}
	// })
}

exports.mostrarParaEditar = function(req, res, next) {
	let idReferencia = req.params.idReferencia

	Referencia.findByIdToUpdate(idReferencia, (err, referencia) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		// para el formulario.
		if(referencia[0].sexo == '') {
			referencia[0].sexo = 'true'
		}

		return res.json(referencia[0])
	})
}

exports.editar = function(req, res, next) {
	let datos = {
		id_referencia: req.body.id_referencia,
		diasMaximos: req.body.diasMaximos,
		mesesMaximos: req.body.mesesMaximos,
		anosMaximos: req.body.anosMaximos,
		superior: req.body.superior,
		inferior: req.body.inferior,
		diasMinimos: req.body.diasMinimos,
		mesesMinimos: req.body.mesesMinimos,
		anosMinimos: req.body.anosMinimos,
		general: req.body.general,
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