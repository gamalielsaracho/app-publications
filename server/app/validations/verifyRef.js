import connection from '../../config/connection'

// console.log("hola mundo.!")
// referentialIntegrityTwo

// let d = {
// 	table1: '', 
// 	table2: '', 
// 	table3: '',
// 	fieldPrimaryKey: 'id_',
// 	primaryKey: ''
// }

function verifyIfExist(q) {
	return connection.query(q, (err, content) => {
		if(err) {
			console.error(err)
		} else {
			if(content[0]) {
				return true
			} else {
				return false
			}
		}
	})
}

export default (data, callback) => {
	let q1 = `SELECT * FROM ${data.table1} t WHERE t.${data.fieldPrimaryKey} = ${data.primaryKey}`
	let q2 = `SELECT * FROM ${data.table2} t WHERE t.${data.fieldPrimaryKey} = ${data.primaryKey}`
	let q3 = `SELECT * FROM ${data.table3} t WHERE t.${data.fieldPrimaryKey} = ${data.primaryKey}`


	if(data.table1 && data.table2 && !data.table3) {
		connection.query(q1, (err, content) => {
			if(err) {
				console.error(err)
			} else {
				if(content[0]) {
					callback(null, true)
				} else {
					connection.query(q2, (err, content) => {
						if(err) {
							console.error(err)
						} else {
							if(content[0]) {
								callback(null, true)
							} else {
								callback(null, false)
							}
						}
					})
				}
			}
		})
	}


	if(data.table1 && data.table2 && data.table3) {
		connection.query(q1, (err, content) => {
			if(err) {
				console.error(err)
			} else {
				if(content[0]) {
					callback(null, true)
				} else {
					connection.query(q2, (err, content) => {
						if(err) {
							console.error(err)
						} else {
							if(content[0]) {
								callback(null, true)
							} else {
								connection.query(q3, (err, contentt) => {
									if(err) {
										console.error(err)
									} else {
										if(contentt[0]) {
											callback(null, true)
										} else {
											callback(null, false)
										}
									}
								})
							}
						}
					})
				}
			}
		})
	}



	// connection.end()
}
