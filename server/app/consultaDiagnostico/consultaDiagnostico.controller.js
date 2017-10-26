import ConsultaDiagnostico from './consultaDiagnostico.model'

import Consulta from '../consulta/consulta.model'

exports.listarCantidadDiagnosticosPorAnho = function(req, res, next) {

	// findOnlyDiagnosticos
	// findConsultaXdiagnosticos

	Consulta.findOnlyDiagnosticos((err, diagnosticos) => {
		// console.log(diagnosticos)
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		let longDiag = diagnosticos.length

		diagnosticos.map((i) => {
			Consulta.findCantidadDiagnosticosPorAnho(i.id_diagnostico, (err, consultas) => {
				// console.log(consultas)
				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
				}

					i.labels = []
					i.data = []
				consultas.map((c) => {
					// console.log(c)
					i.data.push(c.cantidad)
					i.data.sort()

					c.fecha = c.fecha.toString()
					i.labels.push((c.fecha))
					i.labels.sort()

				})

				// i.contenido = consultas

				if(i == diagnosticos[longDiag-1]) {
					return res.json(diagnosticos)
				}
			})
		})

		// return res.json(diagnosticos)
	})
	
}


exports.listar = function(req, res, next) {
	let idConsulta = req.params.idConsulta

	ConsultaDiagnostico.find(idConsulta, (err, consultaDiagnosticos) => {
		// console.log(consultaDiagnosticos)
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ consultaDiagnosticos: consultaDiagnosticos })
	})
}

exports.mostrar = function(req, res, next) {

	let idConsultaDiagnostico = req.params.idConsultaDiagnostico

	ConsultaDiagnostico.findById(idConsultaDiagnostico, (err, consultaDiagnostico) => {
		// console.log(consultaDiagnostico)

		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(consultaDiagnostico[0])
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

	ConsultaDiagnostico.verifyIfExist(datosVerificar, (err, diagnosticoExistente) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(diagnosticoExistente[0]) {
			return res.status(422).json({ error: 'Este diagnóstico ya está registrado' })
		} else {
			ConsultaDiagnostico.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				ConsultaDiagnostico.findById(result.insertId, (err, consultaDiagnostico) => {
					// console.log(consultaDiagnostico)

					if(err) {
						console.log(err)
						return res.json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({
						mensaje: 'Se agregó exitósamente.',
						consultaDiagnosticoAgregado: consultaDiagnostico[0]
					})
				})

			})
		}
	})
}

exports.mostrarParaEditar = function(req, res, next) {
	let idConsultaDiagnostico = req.params.idConsultaDiagnostico

	ConsultaDiagnostico.findByIdToUpdate(idConsultaDiagnostico, (err, consultaDiagnostico) => {
		// console.log(consultaDiagnostico[0])
		
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(consultaDiagnostico[0])
	})
}

exports.editar = function(req, res, next) {
	let datos = {
		id_consultaDiagnostico: req.body.id_consultaDiagnostico,
		observaciones: req.body.observaciones
		// id_diagnostico: req.body.id_diagnostico,
		// id_consulta: req.body.id_consulta,
	}

	ConsultaDiagnostico.update(datos, (err) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		ConsultaDiagnostico.findById(datos.id_consultaDiagnostico, (err, consultaDiagnosticoEncontrada) => {
			// console.log(consultaDiagnostico)
			let consultaDiagnostico = consultaDiagnosticoEncontrada[0]

			if(err) {
				console.log(err)
				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			// let listaCampos = [
			// 			{ 
			// 				nombreCampo: 'Nombre',
			// 				datoCampoAnterior: farmaceutica.nombre,
			// 				datoCampoNuevo: data.nombre
			// 			},
			// 			{ 
			// 				nombreCampo: 'Dirección',
			// 				datoCampoAnterior: farmaceutica.direccion,
			// 				datoCampoNuevo: data.direccion
			// 			},
			// 			{ 
			// 				nombreCampo: 'Telefono',
			// 				datoCampoAnterior: farmaceutica.telefono,
			// 				datoCampoNuevo: data.telefono
			// 			}
			// ]

			return res.json({ 
				mensaje: 'Se actualizó exitósamente.',
				consultaDiagnosticoActualizado: consultaDiagnostico
			})
		})

	})
}

exports.eliminar = function(req, res, next) {
	let idConsultaDiagnostico = req.params.idConsultaDiagnostico

	ConsultaDiagnostico.delete(idConsultaDiagnostico, (err, result) => {
		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json({ 
			mensaje: 'Se Eliminó exitósamente.',
			id_consultaDiagnostico: idConsultaDiagnostico
		})
	})
}