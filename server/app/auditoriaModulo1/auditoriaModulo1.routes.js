import auditoriaModulo1Ctrl from './auditoriaModulo1.controller.js'

export default (app) => {
	app.route('/api/auditoriaModulo1/:tableName/nombreTabla')
	   .get(auditoriaModulo1Ctrl.listarPorNombreTabla)

	app.route('/api/auditoriaModulo1/:idTableFather/idTablaPadre')
	   .get(auditoriaModulo1Ctrl.listarPorIdTablaPadre)
}