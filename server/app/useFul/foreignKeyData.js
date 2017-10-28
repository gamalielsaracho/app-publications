import connection from '../../config/connection'


export default (tableName, fieldPrimaryKey, primaryKey) => {
	
	let q = `
		SELECT 
			* 
		FROM 
			${tableName} t
		WHERE 
			t.${fieldPrimaryKey} = ${primaryKey}
	`

	// return connection.query(q)
	return connection.query(q, (err, content) => {
		if(err) {
			console.error(err)
		} else {
			if(content[0]) {
				return content[0]
			}
		}
	})

	// connection.end()
}
