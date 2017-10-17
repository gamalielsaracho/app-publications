import connection from '../../config/connection'

// MEDICAMENTOS X ENTREGADOS.
exports.find = (idMedicamentoEntregado, callback) => {

	let q = `
		SELECT
			*
		FROM  
			 medicamentosXentregados medicamentoXentregado,
			 medicamentos medicamento,
			 farmaceuticas farmaceutica,
			 nombresMedicamentos nombreMedicamento,
			 presentaciones presentacion
		WHERE
			medicamentoXentregado.id_medicamento = medicamento.id_medicamento AND 
			medicamento.id_farmaceutica = farmaceutica.id_farmaceutica AND
			medicamento.id_nombreMedicamento = nombreMedicamento.id_nombreMedicamento AND
			medicamento.id_presentacion = presentacion.id_presentacion AND
			
			medicamentoXentregado.id_medicamentoEntregado = ?
	`
	
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idMedicamentoEntregado], callback)

	connection.end()
}

exports.findById = (idMedicamentoXentregado, callback) => {

	let q = `
		SELECT
			*
		FROM  
			medicamentosXentregados medicamentoXentregado,
			medicamentos medicamento,
			farmaceuticas farmaceutica,
			nombresMedicamentos nombreMedicamento,
			presentaciones presentacion
		WHERE
			medicamentoXentregado.id_medicamento = medicamento.id_medicamento AND 
			medicamento.id_farmaceutica = farmaceutica.id_farmaceutica AND
			medicamento.id_nombreMedicamento = nombreMedicamento.id_nombreMedicamento AND
			medicamento.id_presentacion = presentacion.id_presentacion AND
			
			medicamentoXentregado.id_medicamentoXentregado = ?

	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [idMedicamentoXentregado], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO medicamentosXentregados (
			id_medicamentoXentregado,
			id_medicamento,
			id_medicamentoEntregado,
			lote,
			cantidad
		)
		VALUES (null, ?, ?, LOWER(?), ?)
	`
	if(data.lote) {
		data.lote = data.lote.trim()
	}
	
	if(data.cantidad) {
		data.cantidad = data.cantidad.toString().trim()
	}
	
	return connection.query(q, [ data.id_medicamento,
								 data.id_medicamentoEntregado,
							     data.lote,
								 data.cantidad ], callback)

	connection.end()
}

exports.findByIdToUpdate = (idMedicamentoXentregado, callback) => {

	let q = `
		SELECT
			medicamentoXentregado.id_medicamentoXentregado,
			medicamentoXentregado.lote,
			medicamentoXentregado.cantidad,

			medicamento.id_medicamento,
			medicamento.cantidadXunidad,
			medicamento.observaciones,

			nombreMedicamento.descripcion nombreMedicamento,

			presentacion.descripcion,

			farmaceutica.nombre,
			farmaceutica.direccion,
			farmaceutica.telefono
		FROM
			medicamentosXentregados medicamentoXentregado,
			medicamentos medicamento,
			farmaceuticas farmaceutica,
			nombresMedicamentos nombreMedicamento,
			presentaciones presentacion
		WHERE
			medicamentoXentregado.id_medicamento = medicamento.id_medicamento AND 
			medicamento.id_farmaceutica = farmaceutica.id_farmaceutica AND
			medicamento.id_nombreMedicamento = nombreMedicamento.id_nombreMedicamento AND
			medicamento.id_presentacion = presentacion.id_presentacion AND
			
			medicamentoXentregado.id_medicamentoXentregado = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [idMedicamentoXentregado], callback)

	connection.end()
}

exports.update = (data, callback) => {
	// console.log(data)
	let q = `
		UPDATE medicamentosXentregados SET
			lote = LOWER(?),
			cantidad = ?
		WHERE
			id_medicamentoXentregado = ?
	`

	if(data.lote) {
		data.lote = data.lote.trim()
	}

	if(data.cantidad) {
		data.cantidad = data.cantidad.toString().trim()
	}

	return connection.query(q, [ data.lote,
								 data.cantidad,
								 data.id_medicamentoXentregado ], callback)

	connection.end()
}

exports.delete = (idMedicamentoXentregado, callback) => {	

	let q = `
		DELETE FROM medicamentosXentregados 
			WHERE
				id_medicamentoXentregado = ?
	`

	return connection.query(q, [idMedicamentoXentregado], callback)

	connection.end()
}