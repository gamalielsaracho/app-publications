import ConsultaDiagnostico from './consultaDiagnostico.model'

import Consulta from '../consulta/consulta.model'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'
import fieldsToEditData from './././../useFul/fieldsToEditData.js'

exports.listarCantidadDiagnosticosEnAnhos = function(req, res, next) {

	Consulta.findOnlyDiagnosticos((err, diagnosticos) => {
		// console.log(diagnosticos)
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		let longDiag = diagnosticos.length

		diagnosticos.map((i) => {
			Consulta.findCantidadDiagnosticosEnAnhos(i.id_diagnostico, (err, consultas) => {
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
					// i.data.sort()

					c.fecha = c.fecha.toString()
					i.labels.push((c.fecha))
					// i.labels.sort()

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


exports.listarCantidadDiagnosticosPorAnho = function(req, res, next) {

	Consulta.findOnlyYears((err, anhos) => {
		// console.log(anhos)
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		let longAnhos = anhos.length

		anhos.map((i) => {
			// console.log(i.fecha)
			Consulta.findCantidadDiagnosticosPorAnho(i.fecha, (err, diagnosticos) => {
				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
				}

					i.labels = []
					i.data = []
				diagnosticos.map((d) => {

					i.data.push(d.cantidad)
					// i.data.sort()

					// d.fecha = d.fecha.toString()
					i.labels.push((d.descripcion))
					// i.labels.sort()

				})

				// i.contenido = consultas

				if(i == anhos[longAnhos-1]) {
					return res.json(anhos)
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
	let data = {
		id_consultaDiagnostico: req.body.id_consultaDiagnostico,
		observaciones: req.body.observaciones,
		idPersonal: req.body.idPersonal
		// id_diagnostico: req.body.id_diagnostico,
		// id_consulta: req.body.id_consulta,
	}

	ConsultaDiagnostico.findById(data.id_consultaDiagnostico, (err, consultaDiagnosticoDatosAnterior) => {
		let coDiaAnt = consultaDiagnosticoDatosAnterior[0]

		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		ConsultaDiagnostico.update(data, (err) => {
			if(err) {
				console.log(err)
				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			ConsultaDiagnostico.findById(data.id_consultaDiagnostico, (err, consultaDiagnosticoDatosNuevo) => {
				let coDiaNue = consultaDiagnosticoDatosNuevo[0]

				if(err) {
					console.log(err)
					return res.json({ error: 'Ocurrió un error en la auditoría de este módulo.' })
				}

				let listaCampos = [
					{ 
						nombreCampo: 'Nombre',
						datoCampoAnterior: coDiaAnt.diagnostico.descripcion,
						datoCampoNuevo: coDiaNue.diagnostico.descripcion
					},
					{ 
						nombreCampo: 'Observaciones',
						datoCampoAnterior: coDiaAnt.consultaDiagnostico.observaciones,
						datoCampoNuevo: coDiaNue.consultaDiagnostico.observaciones
					}
				]

				// console.log(listaCampos)
				fieldsToEditData(data.id_consultaDiagnostico, listaCampos, 'actualización', 'consulta-diagnosticos', data.idPersonal, coDiaAnt.consultaDiagnostico.id_consulta, (err, datos) => {
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
					consultaDiagnosticoActualizado: coDiaNue
				})
			})
		
		})
	})
}

exports.eliminar = function(req, res, next) {
	let idConsultaDiagnostico = req.params.idConsultaDiagnostico
	let idPersonal = req.params.idPersonal


	ConsultaDiagnostico.findById(idConsultaDiagnostico, (err, consultaDiagnosticoDatosAnterior) => {
		let coDiaAnt = consultaDiagnosticoDatosAnterior[0]

		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		let listaCampos = [
			{ 
				nombreCampo: 'Nombre',
				datoCampoAnterior: coDiaAnt.diagnostico.descripcion
			},
			{ 
				nombreCampo: 'Observaciones',
				datoCampoAnterior: coDiaAnt.consultaDiagnostico.observaciones
			}
		]


		ConsultaDiagnostico.delete(idConsultaDiagnostico, (err, result) => {
			if(err) {
				console.log(err)
				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			// console.log(listaCampos)
			fieldsToEditData(idConsultaDiagnostico, listaCampos, 'eliminación', 'consulta-diagnosticos', idPersonal, coDiaAnt.consultaDiagnostico.id_consulta, (err, datos) => {
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
				id_consultaDiagnostico: idConsultaDiagnostico
			})
		})
	})

}