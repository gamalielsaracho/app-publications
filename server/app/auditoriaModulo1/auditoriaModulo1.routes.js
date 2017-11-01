import auditoriaModulo1Ctrl from './auditoriaModulo1.controller.js'

export default (app) => {
	app.route('/api/auditoriaModulo1/nombreTabla/:tableName')
	   .get(auditoriaModulo1Ctrl.listarPorNombreTabla)

	   // /auditoriaModulo1/nombreTabla/${tableName}/idTablaPadre/${idTableFather}
	app.route('/api/auditoriaModulo1/nombreTabla/:tableName/idTablaPadre/:idTableFather')
	   .get(auditoriaModulo1Ctrl.listarPorNombreTablaYidTablaPadre)
}