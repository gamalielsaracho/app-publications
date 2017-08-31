import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * FROM preconsultas
	`
	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, callback)

	connection.end()
}

// Para el Historial Clínico de los pacientes.
// exports.findByIdPaciente = (data, callback) => {

// 	let q = `
// 		SELECT * FROM preconsultas
// 			id_paciente = ?
// 	`
// 	var options = {
// 		sql: q, 
// 		nestTables: false
// 	}

// 	return connection.query(options,[data.id_paciente], callback)

// 	connection.end()
// }

exports.findById = (data, callback) => {

	let q = `
		SELECT * FROM preconsultas
			WHERE
				id_preconsulta = ? 
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_preconsulta], callback)

	connection.end()
}

// exports.buscarCitasYagregarPreconsultaCreada = (data, callback) => {
// 	let qCita = `
// 		SELECT id_cita
// 		FROM citas
// 			WHERE id_paciente = ?,
// 			fecha = CURDATE()
// 	`

// 	let qPreConsuta = `
// 		UPDATE citas SET id_preconsulta = ? 
// 			WHERE
// 				id_cita = ?
// 	`
// 	connection.query(qCita, [data.id_paciente], (err, citas) => {
// 		if(err) {
// 			console.log(err)
// 		}

// 		citas.map((cita) => {
// 			connection.query(qPreConsuta, [data.id_preconsulta, cita[0].id_cita] (err) => {
// 				if(err) {
// 					console.log(err)
// 				}

// 				console.log('La preconsulta se agrego a todas las citas del DÍA.')
// 			})
// 		})
// 	})
// }

exports.create = (data, callback) => {
	
	return connection.query('INSERT INTO preconsultas SET ?', data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE preconsultas SET 
			fecha = ?, id_nivel = ?
			WHERE 
				id_preconsulta = ?
	`

	return connection.query(q, [
		data.fecha, data.id_nivel, data.id_preconsulta
	], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM preconsultas
			WHERE
				id_preconsulta = ?
	`

	return connection.query(q, [data.id_preconsulta], callback)

	connection.end()
}