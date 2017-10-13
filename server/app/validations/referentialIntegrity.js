import connection from '../../config/connection'

// console.log("hola mundo.!")

export default (tableList, fieldPrimaryKey, primaryKey, callback) => {
	
	// let tableList = [
	// 	{ name: 'personales' },
	// 	{ name: 'pacientes' }
	// ]

	let queriesList = []
	let q
	tableList.map((i) => {
		q = `SELECT * FROM ${i.name} t WHERE t.${fieldPrimaryKey} = ${primaryKey}`
		queriesList.push({ q: q })
	})

	queriesList.map((i) => {
		connection.query(i.q, (err, content) => {
			if(err) {
				console.error(err)
			} else {
				callback(null, content[0])
			}
		})
	}) 

	// connection.end()
}
