import connection from '../../config/connection'


let Query = {
	find: (table, callback) => {
		return connection.query(`select * from ${table}`, callback)

		connection.end()
	},
	findById: (table, fieldId, id, callback) => {
		return connection.query(`select * from ${table} where ${fieldId} = ?`, [id], callback)

		connection.end()
	},
	findOne: (table, fields, condition, callback) => {
		return connection.query(`select * from ${table} where ${fields}`, condition, callback)
	
		connection.end()
	},
	delete: (table, fieldId, id, callback) => {
		return connection.query(`delete from ${table} where ${fieldId} = ?`, [id], callback)

		connection.end()
	}
}

export default Query