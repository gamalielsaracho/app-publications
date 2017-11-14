import connection from '../../config/connection'

exports.find = (callback) => {

	let q = `
		SELECT
			cita.id_cita,
			cita.fecha,
			cita.start,
			cita.end,
			cita.pendiente,
			cita.id_personal,
			cita.allDay,
			cita.title,
			cita.id_preconsulta,
			cita.id_paciente,

			personalMedico.id_personal medico_id_personal,
			personalMedico.nroDocumento medico_nroDocumento,
			personalMedico.nroRegistro medico_nroRegistro,
			personalMedico.nombres medico_nombres,
			personalMedico.apellidos medico_apellidos,
			personalMedico.id_especialidad medico_id_especialidad,
			especialidad.descripcion medico_especialidad,

			personalMedico.id_tipoDocumento medico_id_tipoDocumento,
			tpDocMe.descripcion medico_tipoDocumento,


			paciente.id_paciente paciente_id_paciente,
			paciente.nroDocumento paciente_nroDocumento,
			paciente.nombres paciente_nombres,
			paciente.apellidos paciente_apellidos,
			paciente.fechaNacimiento paciente_fechaNacimiento,
			paciente.direccion paciente_direccion,
			paciente.fechaMuerte paciente_fechaMuerte,
			paciente.celular paciente_celular,
			paciente.telefono paciente_telefono,
			paciente.id_area paciente_id_area,
			paciente.id_ciudad paciente_id_ciudad,
			paciente.sexo paciente_sexo,
			paciente.id_tipoDocumento paciente_id_tipoDocumento,

			tpDocPa.descripcion paciente_tipoDocumento


		 FROM 
		 	citas cita,
		 	personales personalMedico,
		 	especialidades especialidad,
		 	tiposdocumentos tpDocMe,
		 	tiposdocumentos tpDocPa,

		 	pacientes paciente

		WHERE
			cita.id_personal = personalMedico.id_personal AND
			personalMedico.id_tipoDocumento = tpDocMe.id_tipoDocumento AND
			personalMedico.id_especialidad = especialidad.id_especialidad AND
			cita.id_paciente = paciente.id_paciente AND
			paciente.id_tipoDocumento = tpDocPa.id_tipoDocumento
	`
	
	var options = {
		sql: q, 
		nestTables: false
	}

	return connection.query(options, callback)

	connection.end()
}

exports.findListByIdPersonal = (idPersonal, callback) => {

	let q = `
		SELECT * 
			FROM 
				citas cita, 
				personales personal,
				pacientes paciente
			WHERE
				cita.id_personal = personal.id_personal AND
				cita.id_paciente = paciente.id_paciente AND
				cita.id_personal = ?
	`
	
	var options = {
		sql: q, 
		nestTables: true
	}

	return connection.query(options, [idPersonal], callback)

	connection.end()
}

exports.findById = (data, callback) => {
	// console.log(data)
	let q = `
		SELECT * FROM citas cita, personales personal, pacientes paciente, 
		especialidades especialidad
			WHERE
				cita.id_personal = personal.id_personal AND
				cita.id_paciente = paciente.id_paciente AND
				personal.id_especialidad = especialidad.id_especialidad AND
				cita.id_cita = ?
	`
	var options = {
		sql: q,
		nestTables: true
	}

	return connection.query(options, [data.id_cita], callback)

	connection.end()
}

exports.create = (data, callback) => {
	return connection.query('INSERT INTO citas SET ?', data, callback)

	connection.end()
}

exports.findByIdToUpdate = (data, callback) => {
	// console.log(data)
	let q = `
		SELECT 
			* 
		FROM 
			citas
		WHERE
			id_cita = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_cita], callback)

	connection.end()
}

exports.verifyBeforeUpdate = (data, callback) => {
	// console.log(data)
	let q = `
		SELECT 
			*
		FROM 
			citas cita
		WHERE
			pendiente = 0 AND
			id_preconsulta IS NOT NULL AND
			id_cita = ?
	`
	var options = {
		sql: q,
		nestTables: false
	}

	return connection.query(options, [data.id_cita], callback)

	connection.end()
}

exports.update = (data, callback) => {
	console.log(data)
	let q = `
		UPDATE citas SET 
			fecha = ?, start = ?, end = ?, pendiente = ?,
			id_personal = ?, id_paciente = ?, id_preconsulta = ?
			WHERE 
				id_cita = ?
	`

	return connection.query(q, [
		data.fecha, data.start, data.end, 
		data.pendiente, data.id_personal,
		data.id_paciente, data.id_preconsulta, data.id_cita
	], callback)

	connection.end()
}

exports.updateIdPreConsultaField = (data, callback) => {
	let q = `
		UPDATE citas SET
			id_preconsulta = ?
		WHERE
			id_cita = ?
	`

	return connection.query(q, [data.id_preconsulta, data.id_cita], callback)

	connection.end()
}

exports.delete = (data, callback) => {	

	let q = `
		DELETE FROM citas 
			WHERE
				id_cita = ?
	`

	return connection.query(q, [data.id_cita], callback)

	connection.end()
}