import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * 
			FROM 
				medicamentos medicamento,
				nombresMedicamentos nombreMedicamento,
				dosis dosis,
				tiposConsumo tipoConsumo,
				unidadesMedidasMedicamentos unidad,
				presentaciones presentacion
			WHERE
				medicamento.id_nombreMedicamento = nombreMedicamento.id_nombreMedicamento AND
				medicamento.id_dosis = dosis.id_dosis AND
				medicamento.id_tipoConsumo = tipoConsumo.id_tipoConsumo AND
				medicamento.id_unidadMedidaMedicamento = unidad.id_unidadMedidaMedicamento AND
				medicamento.id_presentacion = presentacion.id_presentacion
	`

	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findById = (data, callback) => {

	let q = `
		SELECT * 
			FROM 
				medicamentos medicamento,
				nombresMedicamentos nombreMedicamento,
				dosis dosis,
				tiposConsumo tipoConsumo,
				unidadesMedidasMedicamentos unidad,
				presentaciones presentacion,
				farmaceuticas farmaceutica

			WHERE
				medicamento.id_nombreMedicamento = nombreMedicamento.id_nombreMedicamento AND
				medicamento.id_dosis = dosis.id_dosis AND
				medicamento.id_tipoConsumo = tipoConsumo.id_tipoConsumo AND
				medicamento.id_unidadMedidaMedicamento = unidad.id_unidadMedidaMedicamento AND
				medicamento.id_presentacion = presentacion.id_presentacion AND
				medicamento.id_farmaceutica = farmaceutica.id_farmaceutica AND
				id_medicamento = ?
	`

	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_medicamento], callback)

	connection.end()
}

// exports.verifyIfExist = (data, callback) => {
// 	let q = `
// 		SELECT * FROM medicamentos 
// 			WHERE
// 			descripcion = ?
// 	`
// 	return connection.query(q, [data.descripcion.trim()], callback)

// 	connection.end()
// }

exports.create = (data, callback) => {
	let q = `
		INSERT INTO medicamentos (
			id_medicamento,
			id_nombreMedicamento,
			id_dosis,
			stockMinimo,
			id_tipoConsumo,
			id_farmaceutica,
			id_unidadMedidaMedicamento,
			id_presentacion,
			cantidadFarmaceutica
		) VALUES (null, LOWER(?), LOWER(?), LOWER(?), LOWER(?), 
			      LOWER(?), LOWER(?), LOWER(?), LOWER(?))
	`

	if(data.cantidadFarmaceutica) {
		data.cantidadFarmaceutica.trim()
	}

	return connection.query(q, [ data.id_nombreMedicamento,
								 data.id_dosis,
								 data.stockMinimo.trim(),
								 data.id_tipoConsumo,
								 data.id_farmaceutica,
								 data.id_unidadMedidaMedicamento,
								 data.id_presentacion,
								 data.cantidadFarmaceutica ], callback)

	connection.end()
}

exports.findByIdToUpdate = (data, callback) => {

	let q = `
		SELECT * FROM medicamentos
			WHERE
				id_medicamento = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_medicamento], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE medicamentos SET 
			id_nombreMedicamento = ?,
			id_dosis = ?,
			stockMinimo = ?,
			id_tipoConsumo = ?,
			id_farmaceutica = ?,
			id_unidadMedidaMedicamento = ?,
			id_presentacion = ?,
			cantidadFarmaceutica = ?
			WHERE 
				id_medicamento = ?
	`

	if(data.cantidadFarmaceutica) {
		data.cantidadFarmaceutica.trim()
	}

	return connection.query(q, [ data.id_nombreMedicamento,
								 data.id_dosis,
								 data.stockMinimo.trim(),
								 data.id_tipoConsumo,
								 data.id_farmaceutica,
								 data.id_unidadMedidaMedicamento,
								 data.id_presentacion,
								 data.cantidadFarmaceutica,
								 data.id_medicamento ], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM medicamentos 
			WHERE
				id_medicamento = ?
	`

	return connection.query(q, [data.id_medicamento], callback)

	connection.end()
}