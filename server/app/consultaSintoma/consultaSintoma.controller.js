import ConsultaSintoma from './consultaSintoma.model'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'
import fieldsToEditData from './././../useFul/fieldsToEditData.js'

exports.listar = function(req, res, next) {
	let idConsulta = req.params.idConsulta

	ConsultaSintoma.find(idConsulta, (err, sintomasConsulta) => {
		// console.log(sintomasConsulta)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ sintomasConsulta: sintomasConsulta })
	})
}

exports.mostrarParaEditar = function(req, res, next) {

	let idConsultaSintoma = req.params.idConsultaSintoma

	ConsultaSintoma.findByIdToEdit(idConsultaSintoma, (err, sintomaConsulta) => {
		// console.log(sintomaConsulta)

		if(err) {
			console.log(err)
			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(sintomaConsulta[0])
	})
}

exports.crear = function(req, res, next) {

	let datos = {
		// id_consultaSintoma: null,
		id_sintoma: req.body.id_sintoma,
		id_consulta: req.body.id_consulta,
		observaciones: req.body.observaciones
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_sintoma = datos.id_sintoma
	datosVerificar.id_consulta = datos.id_consulta

	ConsultaSintoma.verifyIfExist(datosVerificar, (err, sintomaExistente) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(sintomaExistente[0]) {
			return res.status(422).json({ error: 'Este síntoma ya está registrado' })
		} else {
			ConsultaSintoma.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				ConsultaSintoma.findById(result.insertId, (err, sintomaConsulta) => {
					// console.log(sintomaConsulta)

					if(err) {
						console.log(err)
						return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({ 
						mensaje: 'Se agregó exitósamente.',
						sintomaConsultaAgregado: sintomaConsulta[0]
					})
				})

			})
		}
	})
}

exports.editar = function(req, res, next) {
	let data = {
		id_consultaSintoma: req.body.id_consultaSintoma,
		id_sintoma: req.body.id_sintoma,
		id_consulta: req.body.id_consulta,
		observaciones: req.body.observaciones,
		idPersonal: req.body.idPersonal
	}

	ConsultaSintoma.findById(data.id_consultaSintoma, (err, sintomaConsultaDatosAnterior) => {
		let siCoAnt = sintomaConsultaDatosAnterior[0]

		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		ConsultaSintoma.update(data, (err) => {
			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			ConsultaSintoma.findById(data.id_consultaSintoma, (err, sintomaConsultaDatosNuevo) => {
				let siCoNue = sintomaConsultaDatosNuevo[0]

				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Ocurrió un error en la auditoría de este módulo.' })
				}

				let listaCampos = [
					{ 
						nombreCampo: 'Nombre',
						datoCampoAnterior: siCoAnt.sintoma.descripcion,
						datoCampoNuevo: siCoNue.sintoma.descripcion
					},
					{ 
						nombreCampo: 'Observaciones',
						datoCampoAnterior: siCoAnt.consultaSintoma.observaciones,
						datoCampoNuevo: siCoNue.consultaSintoma.observaciones
					}
				]


				// console.log(listaCampos)
				fieldsToEditData(data.id_consultaSintoma, listaCampos, 'actualización', 'consulta-sintomas', data.idPersonal, data.id_consulta, (err, datos) => {
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
					sintomaConsultaActualizado: siCoNue
				})
			})
		})

	})

}

exports.eliminar = function(req, res, next) {
	let idConsultaSintoma = req.params.idConsultaSintoma
	let idPersonal = req.params.idPersonal

	ConsultaSintoma.findById(idConsultaSintoma, (err, sintomaConsultaDatosAnterior) => {
		let siCoAnt = sintomaConsultaDatosAnterior[0]

		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		let listaCampos = [
			{ 
				nombreCampo: 'Nombre',
				datoCampoAnterior: siCoAnt.sintoma.descripcion
			},
			{ 
				nombreCampo: 'Observaciones',
				datoCampoAnterior: siCoAnt.consultaSintoma.observaciones
			}
		]


		ConsultaSintoma.delete(idConsultaSintoma, (err, result) => {
			if(err) {
				console.log(err)
				return res.json({ error: 'Ocurrió un error, intente más tarde.' })
			}


			// console.log(listaCampos)
			fieldsToEditData(idConsultaSintoma, listaCampos, 'eliminación', 'consulta-sintomas', idPersonal, siCoAnt.consultaSintoma.id_consulta, (err, datos) => {
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
				id_consultaSintoma: idConsultaSintoma
			})
		})
		
	})

}