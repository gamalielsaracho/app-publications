import connection from '../../config/connection'

exports.find = (callback) => {
	// LOWER(*)
	return connection.query('SELECT * FROM roles', callback)

	connection.end()
}

exports.findById = (idRol, callback) => {
	return connection.query('select * from roles where id_rol = ?', [idRol], callback)

	connection.end()
}

exports.create = (data, callback) => {
	let q = `
		INSERT INTO roles SET ?
	`
	return connection.query(q, data, callback)

	connection.end()
}

exports.update = (data, callback) => {
	return connection.query('update roles set descripcion = ? where id_rol = ?', [data.descripcion, data.id_rol], callback)

	connection.end()
}

exports.auditoria = (data, accion) => {

	connection.query('select * from roles where id_rol = ?', [data.id_rol], (err, rol) => {
		if(err) {
			console.log(err)
			return
		}

		let q = ``
		let dataField = []

		if(accion == 'eliminación') {
			q = `
				INSERT INTO rolesMovimientos 
					(fecha, descripcion, id_personal, accion) 
				VALUES
					(now(), ?, ?, ?)
			`
			dataField = [rol[0].descripcion, data.usuarioLogeado, accion]
		} else {
			q = `
				INSERT INTO rolesMovimientos 
					(fecha, descripcion, descripcionAnterior, id_personal, accion) 
				VALUES
					(now(), ?, ?, ?, ?)
			`
			dataField = [data.descripcion, rol[0].descripcion, data.usuarioLogeado, accion]
		}
		
		connection.query(q, dataField, (err) => {
			if(err) {
				console.log(err)
				return
			}
		})
	})
}

exports.delete = (idRol, callback) => {
	console.log("el id es :"+idRol)
	
	return connection.query('DELETE FROM roles WHERE id_rol = ?', [idRol], callback)

	connection.end()
}