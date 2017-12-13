import Referencia from './referencia.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'
import fieldsToEditData from './././../useFul/fieldsToEditData.js'

import moment from 'moment'

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

function filtrandoParametrosSegunReferencia(referencias, dato) {
	let referenciasFiltradas = referencias

	var diaActual = moment(new Date()).format('DD')
	var mesActual = moment(new Date()).format('MM')
	var anhoActual = moment(new Date()).format('YYYY')


	var diaPaciente = moment(dato.fechaNacimiento).format('DD')
	var mesPaciente = moment(dato.fechaNacimiento).format('MM')
	var anhoPaciente = moment(dato.fechaNacimiento).format('YYYY')

	// edad del paciente
	var cantidadAnhos 
	var cantidadMeses
	var cantidadDias


	// Edad.
	if(anhoActual == anhoPaciente) {
		if(mesActual == mesPaciente) { // Estamos Hablando de días.
			cantidadDias = (diaActual - diaPaciente)
		
			referenciasFiltradas = referenciasFiltradas.filter((i) => {
				return (i.ref.general == true || i.ref.sexo == dato.sexo) && 
					i.ref.diasMinimos < cantidadDias && 
					cantidadDias < i.ref.diasMaximos
			})

			return referenciasFiltradas
		} else {
			// Estamos hablando de meses.
			cantidadMeses = mesActual - mesPaciente

			referenciasFiltradas = referenciasFiltradas.filter((i) => {
				return (i.ref.general == true || i.ref.sexo == dato.sexo) && 
					i.ref.mesesMinimos <= cantidadMeses && 
					cantidadMeses <= i.ref.mesesMaximos
			})

			return referenciasFiltradas
		}
	} else {
		cantidadAnhos = anhoActual - anhoPaciente

		referenciasFiltradas = referenciasFiltradas.filter((i) => {
			return (i.ref.general == true || i.ref.sexo == dato.sexo) && 
				i.ref.anosMinimos < cantidadAnhos && 
				cantidadAnhos < i.ref.anosMaximos
		})

		console.log("Estamos hablando de una persona con años. -> " + cantidadAnhos)
		return referenciasFiltradas
	}
}


exports.listarReferenciasParaInsertar = function(req, res, next) {
	let dato = {
		fechaNacimiento: req.params.fechaNacimiento,
		sexo: req.params.sexo,
		id_tipoAnalisis: req.params.idTipoAnalisis
	}

	console.log(dato)


	let referenciasFiltradas = []
	Referencia.findListToInsert(dato, (err, referencias) => {

		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		console.log(filtrandoParametrosSegunReferencia(referencias, dato))

		return res.json({ referencias: filtrandoParametrosSegunReferencia(referencias, dato) })
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
	let data = {
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
		sexo: req.body.sexo,

		idPersonal: req.body.idPersonal
	}

	Referencia.findById(data.id_referencia, (err, referenciaDatosAnterior) => {
		let refAnt = referenciaDatosAnterior[0]

		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		Referencia.update(data, (err) => {
			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			Referencia.findById(data.id_referencia, (err, referenciaDatosNuevo) => {
				// console.log(referencia)
				let refNue = referenciaDatosNuevo[0]

				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				let listaCampos = [
					{ 
						nombreCampo: 'Días máximos',
						datoCampoAnterior: refAnt.diasMaximos,
						datoCampoNuevo: refNue.diasMaximos
					},
					{ 
						nombreCampo: 'Meses máximos',
						datoCampoAnterior: refAnt.mesesMaximos,
						datoCampoNuevo: refNue.mesesMaximos
					},
					{ 
						nombreCampo: 'Años máximos',
						datoCampoAnterior: refAnt.anosMaximos,
						datoCampoNuevo: refNue.anosMaximos
					},
					{ 
						nombreCampo: 'Superior',
						datoCampoAnterior: refAnt.superior,
						datoCampoNuevo: refNue.superior
					},
					{ 
						nombreCampo: 'Inferior',
						datoCampoAnterior: refAnt.inferior,
						datoCampoNuevo: refNue.inferior
					},
					{ 
						nombreCampo: 'Días mínimos',
						datoCampoAnterior: refAnt.diasMinimos,
						datoCampoNuevo: refNue.diasMinimos
					},
					{ 
						nombreCampo: 'Meses mínimos',
						datoCampoAnterior: refAnt.mesesMinimos,
						datoCampoNuevo: refNue.mesesMinimos
					},
					{ 
						nombreCampo: 'Años mínimos',
						datoCampoAnterior: refAnt.anosMinimos,
						datoCampoNuevo: refNue.anosMinimos
					},
					{ 
						nombreCampo: 'Sexo',
						datoCampoAnterior: refAnt.sexo,
						datoCampoNuevo: refNue.sexo
					},
					{ 
						nombreCampo: 'Nro. de documento',
						datoCampoAnterior: refAnt.nroDocumento,
						datoCampoNuevo: refNue.nroDocumento
					},
					{
						nombreCampo: 'General',
						datoCampoAnterior: refAnt.general,
						datoCampoNuevo: refNue.general
					}
				]

				// console.log(listaCampos)
				fieldsToEditData(data.id_referencia, listaCampos, 'actualización', 'referencias', data.idPersonal, refAnt.id_parametroAnalisis, (err, datos) => {
					if(err) {
						console.log(err)
						return res.status(422).json({ error: 'Ocurrió un error en la auditoría de este módulo.' })
					}

					// .. Ejecutar esto despues de editar el registro. 
					console.log(datos)

					AuditoriaModulo1.create(datos, (err) => {
						if(err) {
							console.log(err)
							return res.status(422).json({ error: 'Ocurrió un error en la auditoría de este módulo.' })
						}
					})
				})

				return res.json({ 
					mensaje: 'Se actualizó exitósamente.',
					referenciaActualizada: refNue
				})
			})
		})
		
	})

}

exports.eliminar = function(req, res, next) {
	let idReferencia = req.params.idReferencia
	let idPersonal = req.params.idPersonal


	referentialIntegritySimple('analisistiposreferencias', 'id_referencia', idReferencia, (err, enUso) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(enUso[0]) {
			return res.status(422).json({ error: 'Esta referencia es usada por otros registros.' })
		} else {
			Referencia.findById(idReferencia, (err, referenciaDatosAnterior) => {
				let refAnt = referenciaDatosAnterior[0]

				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
				}


				let listaCampos = [
					{ 
						nombreCampo: 'Días máximos',
						datoCampoAnterior: refAnt.diasMaximos
					},
					{ 
						nombreCampo: 'Meses máximos',
						datoCampoAnterior: refAnt.mesesMaximos
					},
					{ 
						nombreCampo: 'Años máximos',
						datoCampoAnterior: refAnt.anosMaximos
					},
					{ 
						nombreCampo: 'Superior',
						datoCampoAnterior: refAnt.superior
					},
					{ 
						nombreCampo: 'Inferior',
						datoCampoAnterior: refAnt.inferior
					},
					{ 
						nombreCampo: 'Días mínimos',
						datoCampoAnterior: refAnt.diasMinimos
					},
					{ 
						nombreCampo: 'Meses mínimos',
						datoCampoAnterior: refAnt.mesesMinimos
					},
					{ 
						nombreCampo: 'Años mínimos',
						datoCampoAnterior: refAnt.anosMinimos
					},
					{ 
						nombreCampo: 'Sexo',
						datoCampoAnterior: refAnt.sexo
					},
					{ 
						nombreCampo: 'Nro. de documento',
						datoCampoAnterior: refAnt.nroDocumento
					},
					{
						nombreCampo: 'General',
						datoCampoAnterior: refAnt.general
					}
				]

				Referencia.delete(idReferencia, (err, result) => {
					if(err) {
						console.log(err)
						return res.json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					// console.log(listaCampos)
					fieldsToEditData(refAnt.id_referencia, listaCampos, 'actualización', 'referencias', idPersonal, refAnt.id_parametroAnalisis, (err, datos) => {
						if(err) {
							console.log(err)
							return res.status(422).json({ error: 'Ocurrió un error en la auditoría de este módulo.' })
						}

						// .. Ejecutar esto despues de eliminar el registro. 
						console.log(datos)

						AuditoriaModulo1.create(datos, (err) => {
							if(err) {
								console.log(err)
								return res.status(422).json({ error: 'Ocurrió un error en la auditoría de este módulo.' })
							}
						})
					})

					return res.json({ 
						mensaje: 'Se Eliminó exitósamente.',
						id_referencia: idReferencia
					})
				})
			})

		}
	})
}