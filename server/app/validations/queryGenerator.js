export default (tablaName, fieldPrimaryKey, primaryKey) => {
	let q = `SELECT * FROM ${tablaName} t WHERE t.${fieldPrimaryKey} = ${primaryKey}`

	return q
}