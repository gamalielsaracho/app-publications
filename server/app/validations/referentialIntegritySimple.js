import connection from '../../config/connection'


export default (tableName, fieldPrimaryKey, primaryKey, callback) => {
	
	let q = `
		SELECT 
			* 
		FROM 
			${tableName} t 
		WHERE 
			t.${fieldPrimaryKey} = ${primaryKey}
	`

	connection.query(q, callback)

	// connection.end()
}
