import AuditoriaModulo1 from './auditoriaModulo1.model'


exports.listarPorNombreTabla = function(req, res, next) {
	let tableName = req.params.tableName

	AuditoriaModulo1.findByTableName(tableName, (err, auditoria1Movimientos) => {
		// console.log(auditoria1Movimientos)
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ auditoria1Movimientos: auditoria1Movimientos })
	})
}


exports.listarPorIdTablaPadre = function(req, res, next) {
	let idTableFather = req.params.idTableFather

	AuditoriaModulo1.findByIdTableFather(idTableFather, (err, auditoria1Movimientos) => {
		// console.log(auditoria1Movimientos)
		if(err) {
			console.log(err)
			return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
		}

		return res.json({ auditoria1Movimientos: auditoria1Movimientos })
	})
}


// exports.crear = function(req, res, next) {

// 	let datos = {
// 		id_diagnostico: req.body.id_diagnostico,
// 		id_consulta: req.body.id_consulta,
// 		observaciones: req.body.observaciones
// 	}

// 	// console.log(datos)

// 	let datosVerificar = {}
// 	datosVerificar.id_consulta = datos.id_consulta
// 	datosVerificar.id_diagnostico = datos.id_diagnostico


// 	ConsultaDiagnostico.create(datos, (err, result) => {
// 		if(err) {
// 			console.log(err)
// 			return res.json({ error: 'Ocurrió un error, intente más tarde.' })
// 		}

// 		return res.json({ mensaje: 'Se agregó exitósamente.' })
// 	})
// }