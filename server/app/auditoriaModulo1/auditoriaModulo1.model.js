import connection from '../../config/connection'

import getHour from '../useFul/getHour'

exports.findByTableName = (tableName, callback) => {

	let q = `
		SELECT 
			*
		FROM
			auditoriamodulo1 auditoria,
			personales personal			
		WHERE
			auditoria.id_personal = personal.id_personal AND
			auditoria.tabla = ?
	`
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [tableName], callback)

	connection.end()
}


	// let q = `
	// 	SELECT 
	// 		*
	// 	FROM
	// 		auditoriamodulo1			
	// `
	// var options = {
	// 	sql: q, 
	// 	nestTables: false
	// }

	// connection.query(options, (err, datos) => {
	// 	if(err) {
	// 		console.error(err)
	// 	}else {
	// 		console.log(datos)
	// 	}
	// })

	// connection.end()


exports.findByIdTableFather = (idTableFather, callback) => {

	let q = `
		SELECT 
			*
		FROM
			auditoriamodulo1 auditoria,
			personales personal			
		WHERE
			auditoria.id_personal = personal.id_personal AND
			auditoria.idTablaPadre = ?
	`
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idTableFather], callback)

	connection.end()
}


exports.create = (data, callback) => {

	let q = `
		INSERT INTO auditoriamodulo1 (
			id_auditoriaModulo1, datoAnterior, datoNuevo, fecha, hora,
			accion, tabla, id_personal, idTablaPadre
		)
		VALUES (null, ?, ?, now(), ?, ?, ?, ?, ?)
	`

	return connection.query(q, [ data.datoAnterior,
								 data.datoNuevo || 'Ninguno',
								 getHour(),
								 data.accion,
								 data.tabla,
								 data.id_personal,
								 data.idTablaPadre ], callback)

	connection.end()
}


