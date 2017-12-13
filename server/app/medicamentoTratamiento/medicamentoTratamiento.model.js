import connection from '../../config/connection'

exports.findListByIdTratamiento = (data, callback) => {

	let q = `
		SELECT 
			* 
		FROM
			medicamentostratamientos indicacion
		WHERE
			id_tratamiento = ?
	`

	
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [data.id_tratamiento], callback)

	connection.end()
}


exports.findListByIdTratamientoReporteConsultas = (data, callback) => {
	let q = `
		SELECT
			*
		FROM
			(SELECT
				indicacion.id_medicamentoTratamiento,
				indicacion.medicamentoNoExistente,
				indicacion.cantidadConsumo,
				indicacion.cantidadTiempo,
				indicacion.duracionConsumo,
				indicacion.observaciones,
				indicacion.id_tratamiento,
				indicacion.id_medicamento,

				medicamento.id_nombreMedicamento
			FROM
				medicamentostratamientos indicacion

	 			LEFT JOIN medicamentos medicamento 
	 			ON indicacion.id_medicamento = medicamento.id_medicamento
	 		WHERE indicacion.id_tratamiento = ?) indicacion


	 		LEFT JOIN nombresMedicamentos nombreMedicamento
	 			ON indicacion.id_nombreMedicamento = nombreMedicamento.id_nombreMedicamento
	`

		// WHERE
		// 	indicacion.id_nombreMedicamento = nombreMedicamento.id_nombreMedicamento
	 			
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [data.id_tratamiento], callback)

	connection.end()
}



exports.findById = (data, callback) => {
	let q

	if(data.medicamentoNoExistente) {
		q = `
			SELECT 
				medicamentoTratamiento.medicamentoNoExistente nombreMedicamento,
				medicamentoTratamiento.cantidadConsumo,
				medicamentoTratamiento.cantidadTiempo,
				medicamentoTratamiento.duracionConsumo,
				medicamentoTratamiento.observaciones,
				medicamentoTratamiento.id_tratamiento

			FROM 
				medicamentosTratamientos medicamentoTratamiento
			WHERE
				medicamentoTratamiento.id_medicamentoTratamiento = ?
		`
	} else {
		q = `
			SELECT 
				medicamentoTratamiento.cantidadConsumo,
				medicamentoTratamiento.cantidadTiempo,
				medicamentoTratamiento.duracionConsumo,
				medicamentoTratamiento.observaciones,
				medicamentoTratamiento.id_tratamiento,
				medicamentoTratamiento.id_medicamento,

				presentacion.descripcion presentacion,

				nombreMedicamento.descripcion nombreMedicamento
			FROM 
				medicamentosTratamientos medicamentoTratamiento,
				medicamentos medicamento,
				presentaciones presentacion,
				nombresmedicamentos nombreMedicamento
			WHERE
				medicamentoTratamiento.id_medicamento = medicamento.id_medicamento AND
				medicamento.id_nombreMedicamento = nombreMedicamento.id_nombreMedicamento AND
				medicamento.id_presentacion = presentacion.id_presentacion AND
				medicamentoTratamiento.id_medicamentoTratamiento = ?
		`
	}
	

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_medicamentoTratamiento], callback)

	connection.end()
}

exports.verifyIfExist = (data, callback) => {
	let q = `
		SELECT
			* 
		FROM 
			medicamentostratamientos 
		WHERE
			medicamentoNoExistente = ? AND
			cantidadConsumo = ? AND
			cantidadTiempo = ? AND
			duracionConsumo = ? AND
			id_tratamiento = ? AND
			id_medicamento = ?

	`
	return connection.query(q, [ data.medicamentoNoExistente,
								 data.cantidadConsumo,
								 data.cantidadTiempo,
								 data.duracionConsumo,
								 data.id_tratamiento,
								 data.id_medicamento ], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO medicamentostratamientos (
			id_medicamentoTratamiento,
			medicamentoNoExistente,
			cantidadConsumo,
			cantidadTiempo,
			duracionConsumo,
			observaciones,
			id_tratamiento,
			id_medicamento
		)
		VALUES (null, LOWER(?), LOWER(?), LOWER(?), LOWER(?), LOWER(?), ?, ?)
	`

	if(data.medicamentoNoExistente) {
		data.medicamentoNoExistente.trim()
	}

	if(data.cantidadConsumo) {
		data.cantidadConsumo.trim()
	}

	if(data.cantidadTiempo) {
		data.cantidadTiempo.trim()
	}

	if(data.duracionConsumo) {
		data.duracionConsumo.trim()
	}

	if(data.observaciones) {
		data.observaciones.trim()
	}
	

	return connection.query(q, [ data.medicamentoNoExistente,
								 data.cantidadConsumo,
								 data.cantidadTiempo,
								 data.duracionConsumo,
								 data.observaciones,
								 data.id_tratamiento,
								 data.id_medicamento ], callback)

	connection.end()
}


exports.findByIdIfHaveIdMedicamento = (data, callback) => {

	let q = `
		SELECT 
			*
		FROM 
			medicamentosTratamientos
		WHERE
			id_medicamentoTratamiento = ?
	`

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_medicamentoTratamiento], callback)

	connection.end()
}


exports.findByIdToUpdate = (data, callback) => {
	// console.log('findByIdToUpdate')
	// console.log(data)

	let q
	if(data.medicamentoNoExistente) {
		q = `
			SELECT 
				*
			FROM 
				medicamentosTratamientos
			WHERE
				id_medicamentoTratamiento = ?
		`
	} else {
		q = `
			SELECT
				medicamentoTratamiento.id_medicamentoTratamiento,
				medicamentoTratamiento.cantidadConsumo,
				medicamentoTratamiento.cantidadTiempo,
				medicamentoTratamiento.duracionConsumo,
				medicamentoTratamiento.observaciones,
				medicamentoTratamiento.id_tratamiento,
				medicamentoTratamiento.id_medicamento,

				presentacion.descripcion presentacion,

				nombreMedicamento.descripcion nombreMedicamento
			FROM 
				medicamentosTratamientos medicamentoTratamiento,
				medicamentos medicamento,
				presentaciones presentacion,
				nombresmedicamentos nombreMedicamento
			WHERE
				medicamentoTratamiento.id_medicamento = medicamento.id_medicamento AND
				medicamento.id_nombreMedicamento = nombreMedicamento.id_nombreMedicamento AND
				medicamento.id_presentacion = presentacion.id_presentacion AND
				medicamentoTratamiento.id_medicamentoTratamiento = ?
		`
	}
	

	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_medicamentoTratamiento], callback)

	connection.end()
}


exports.update = (data, callback) => {
	// console.log('update -------->')
	// console.log(data)
	
	let q = `
		UPDATE medicamentostratamientos SET 
			medicamentoNoExistente = LOWER(?),
			cantidadConsumo = LOWER(?),
			cantidadTiempo = LOWER(?),
			duracionConsumo = LOWER(?),
			observaciones = LOWER(?),
			id_tratamiento = ?,
			id_medicamento = ?

		WHERE 
			id_medicamentoTratamiento = ?
	`

	if(data.medicamentoNoExistente) {
		data.medicamentoNoExistente.trim()
	}

	if(data.cantidadConsumo) {
		data.cantidadConsumo.trim()
	}

	if(data.cantidadTiempo) {
		data.cantidadTiempo.trim()
	}

	if(data.duracionConsumo) {
		data.duracionConsumo.trim()
	}

	if(data.observaciones) {
		data.observaciones.trim()
	}

	return connection.query(q, [ data.medicamentoNoExistente,
								 data.cantidadConsumo,
								 data.cantidadTiempo,
								 data.duracionConsumo,
								 data.observaciones,
								 data.id_tratamiento,
								 data.id_medicamento,
								 data.id_medicamentoTratamiento ], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM medicamentostratamientos 
			WHERE
				id_medicamentoTratamiento = ?
	`

	return connection.query(q, [data.id_medicamentoTratamiento], callback)

	connection.end()
}