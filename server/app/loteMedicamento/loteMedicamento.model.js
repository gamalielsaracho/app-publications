import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT * 
			FROM 
				lotesMedicamentos lote,
				proveedores proveedor,
				medicamentos medicamento,
				nombresMedicamentos nombreMedicamento,

				dosis dosis,
				tiposConsumo tipoConsumo,
				unidadesmedidasmedicamentos unidad,
				presentaciones presentacion
			WHERE
				lote.id_medicamento = medicamento.id_medicamento AND
				lote.id_proveedor = proveedor.id_proveedor AND 
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
				lotesMedicamentos lote,
				proveedores proveedor,
				medicamentos medicamento,
				nombresMedicamentos nombreMedicamento,

				dosis dosis,
				tiposConsumo tipoConsumo,
				farmaceuticas farmaceutica,
				unidadesmedidasmedicamentos unidad,
				presentaciones presentacion
			WHERE
				lote.id_medicamento = medicamento.id_medicamento AND
				lote.id_proveedor = proveedor.id_proveedor AND 
				medicamento.id_nombreMedicamento = nombreMedicamento.id_nombreMedicamento AND
				medicamento.id_dosis = dosis.id_dosis AND
				medicamento.id_tipoConsumo = tipoConsumo.id_tipoConsumo AND
				medicamento.id_farmaceutica = farmaceutica.id_farmaceutica AND
				medicamento.id_unidadMedidaMedicamento = unidad.id_unidadMedidaMedicamento AND
				medicamento.id_presentacion = presentacion.id_presentacion AND
				
				id_loteMedicamento = ?
	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_loteMedicamento], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT * FROM lotesMedicamentos 
			WHERE
			id_medicamento = ? AND
			numeroLote = ? AND
			fechaVencimiento = ?
	`
	return connection.query(q, [ data.id_medicamento,
		                         data.numeroLote.trim(),
		                         data.fechaVencimiento.trim() ], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO lotesMedicamentos (
			id_loteMedicamento,
			fechaVencimiento,
			cantidadRecibida,
			id_medicamento,
			id_proveedor,
			numeroLote,
			fecha
		)
			VALUES (null, LOWER(?), LOWER(?), ?, ?, LOWER(?), LOWER(?));
	`
	return connection.query(q, [ data.fechaVencimiento.trim(),
								 data.cantidadRecibida.trim(),
								 data.id_medicamento,
								 data.id_proveedor,
								 data.numeroLote.trim(),
								 data.fecha.trim() ], callback)

	connection.end()
}

exports.findByIdToUpdate = (data, callback) => {

	let q = `
		SELECT * FROM lotesMedicamentos 
			WHERE
				id_loteMedicamento = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_loteMedicamento], callback)

	connection.end()
}

exports.update = (data, callback) => {
	let q = `
		UPDATE lotesMedicamentos SET 
			fechaVencimiento = ?,
			cantidadRecibida = ?,
			id_medicamento = ?,
			id_proveedor = ?,
			numeroLote = ?
		WHERE 
			id_loteMedicamento = ?
	`

	return connection.query(q, [ data.fechaVencimiento.trim(),
								 data.cantidadRecibida.trim(),
								 data.id_medicamento,
								 data.id_proveedor,
								 data.numeroLote.trim(),
								 data.id_loteMedicamento ], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM lotesMedicamentos 
			WHERE
				id_loteMedicamento = ?
	`

	return connection.query(q, [data.id_loteMedicamento], callback)

	connection.end()
}