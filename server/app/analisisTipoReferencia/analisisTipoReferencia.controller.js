import AnalisisTipoReferencia from './analisisTipoReferencia.model'

import AuditoriaModulo1 from './././../auditoriaModulo1/auditoriaModulo1.model'
import fieldsToEditData from './././../useFul/fieldsToEditData.js'

exports.listar = function(req, res, next) {
	let idAnalisisTipo = req.params.idAnalisisTipo

	AnalisisTipoReferencia.find(idAnalisisTipo, (err, analisisTipoReferencias) => {
		// console.log(analisisTipoReferencias)
		if(err) {
			console.log(err)
						
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ analisisTipoReferencias: analisisTipoReferencias })
	})
}


exports.crear = function(req, res, next) {

	let datos = {
		// id_analisisTipoReferencia: null,
		id_analisisTipo: req.body.id_analisisTipo,
		id_analisis: req.body.id_analisis,
		id_tipoAnalisis: req.body.id_tipoAnalisis,
		id_referencia: req.body.id_referencia,
		valor: req.body.valor
	}

	// console.log(datos)

	let datosVerificar = {}
	datosVerificar.id_analisis = datos.id_analisis
	datosVerificar.id_tipoAnalisis = datos.id_tipoAnalisis
	datosVerificar.id_referencia = datos.id_referencia

	AnalisisTipoReferencia.verifyIfExist(datosVerificar, (err, paramentroExistente) => {
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		if(paramentroExistente[0]) {
			return res.status(422).json({ error: 'Este paramentro ya está registrado.' })
		} else {
			// console.log(datos)
			AnalisisTipoReferencia.create(datos, (err, result) => {
				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				AnalisisTipoReferencia.findById(result.insertId, (err, analisisTipoReferencia) => {
					// console.log(analisisTipoReferencia)

					if(err) {
						console.log(err)
						return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
					}

					return res.json({ 
						mensaje: 'Se agregó exitósamente.',
						analisisTipoReferenciaAgregado: analisisTipoReferencia[0]
					})
				})

			})
		}
	})
}

exports.mostrarParaEditar = function(req, res, next) {
	let idAnalisisTipoAnalisisReferencia = req.params.idAnalisisTipoAnalisisReferencia

	AnalisisTipoReferencia.findByIdToUpdate(idAnalisisTipoAnalisisReferencia, (err, analisisTipoReferencia) => {
		
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		return res.json(analisisTipoReferencia[0])
	})
}

exports.editar = function(req, res, next) {
	let data = {
		id_analisisTipoReferencia: req.body.id_analisisTipoReferencia,
		valor: req.body.valor,
		idPersonal: req.body.idPersonal
	}


	AnalisisTipoReferencia.findById(data.id_analisisTipoReferencia, (err, analisisTipoReferenciaDatosAnterior) => {
		let aTpRefAnt = analisisTipoReferenciaDatosAnterior[0]

		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		AnalisisTipoReferencia.update(data, (err) => {
			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			AnalisisTipoReferencia.findById(data.id_analisisTipoReferencia, (err, analisisTipoReferenciaDatosNuevo) => {
				let aTpRefNue = analisisTipoReferenciaDatosNuevo[0]

				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
				}

				let listaCampos = [
					{ 
						nombreCampo: 'Nombre',
						datoCampoAnterior: aTpRefAnt.parametro.descripcion,
						datoCampoNuevo: aTpRefNue.parametro.descripcion
					}, 
					{
						nombreCampo: 'Valor',
						datoCampoAnterior: `${aTpRefAnt.analisisTipoReferencia.valor} ${aTpRefAnt.unidad.descripcion}`,
						datoCampoNuevo: `${aTpRefNue.analisisTipoReferencia.valor} ${aTpRefNue.unidad.descripcion}`
					}
				]

				// console.log(listaCampos)
				fieldsToEditData(aTpRefAnt.analisisTipoReferencia.id_analisisTipoReferencia, listaCampos, 'actualización', 'resultados-analisis', data.idPersonal, aTpRefAnt.analisisTipoReferencia.id_analisisTipo, (err, datos) => {
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
					analisisTipoReferenciaActualizado: aTpRefNue
				})
			})
		})

	})


}

exports.eliminar = function(req, res, next) {
	let idAnalisisTipoAnalisisReferencia = req.params.idAnalisisTipoAnalisisReferencia
	let idPersonal = req.params.idPersonal

	AnalisisTipoReferencia.findById(idAnalisisTipoAnalisisReferencia, (err, analisisTipoReferenciaDatosAnterior) => {
		let aTpRefAnt = analisisTipoReferenciaDatosAnterior[0]

		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
		}

		let listaCampos = [
			{ 
				nombreCampo: 'Nombre',
				datoCampoAnterior: aTpRefAnt.parametro.descripcion
			}, 
			{
				nombreCampo: 'Valor',
				datoCampoAnterior: `${aTpRefAnt.analisisTipoReferencia.valor} ${aTpRefAnt.unidad.descripcion}`
			}
		]

		AnalisisTipoReferencia.delete(idAnalisisTipoAnalisisReferencia, (err, result) => {
			if(err) {
				console.log(err)
				return res.status(422).json({ error: 'Ocurrió un error, intente más tarde.' })
			}

			// console.log(listaCampos)
			fieldsToEditData(aTpRefAnt.analisisTipoReferencia.id_analisisTipoReferencia, listaCampos, 'eliminación', 'resultados-analisis', idPersonal, aTpRefAnt.id_analisisTipo, (err, datos) => {
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
				id_analisisTipoReferencia: idAnalisisTipoAnalisisReferencia
			})
		})
	})

}