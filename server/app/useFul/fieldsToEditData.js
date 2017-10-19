

// let listaCampos = [
// 	{ 
// 		nombreCampo: 'nombreColumna',
// 		datoCampoAnterior: 'algo',
// 		datoCampoNuevo: 'algo nuevo'
// 	}
// ]

export default (listaCampos, action, tableName, idPersonal, callback) => {
	let datos = {}

	let fieldsAnteriores = []
	let fieldsNuevos = []

	let datoAnterior = ''
	let datoNuevo = ''

	listaCampos.map((i) => {
		if(action ==  'eliminación') {
			fieldsAnteriores.push({
				nombreCampo: i.nombreCampo,
				datoCampo: i.datoCampoAnterior
			})
		} else {
			if(i.datoCampoAnterior != i.datoCampoNuevo) {
				fieldsAnteriores.push({
					nombreCampo: i.nombreCampo,
					datoCampo: i.datoCampoAnterior
				})

				fieldsNuevos.push({
					nombreCampo: i.nombreCampo,
					datoCampo: i.datoCampoNuevo
				})
			}
		}
	})
				

	fieldsAnteriores.map(function(i) { 
		var dataLineAnt = ''; 
		if(i.datoCampo != null && i.nombreCampo != null) {
			dataLineAnt = `> __${i.nombreCampo}:__ ${i.datoCampo} \n\n`
		}

		datoAnterior = datoAnterior + dataLineAnt  
	})

	if(action == 'actualización') {
		fieldsNuevos.map(function(i) { 
			var dataLineNew = ''; 
			if(i.datoCampo != null && i.nombreCampo != null) {
				dataLineNew =  `> __${i.nombreCampo}:__ ${i.datoCampo} \n\n`
			}

			datoNuevo = datoNuevo + dataLineNew  
		})
	}

	datos.id_personal = idPersonal
	datos.accion = action
	datos.tabla = tableName
	datos.datoAnterior = datoAnterior
	datos.datoNuevo = datoNuevo

	callback(null, datos)
}