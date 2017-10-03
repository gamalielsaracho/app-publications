import analisisTipoCtrl from './analisisTipo.controller'

export default (app) => {
	app.route('/api/analisisTipos/:idAnalisis')
	   .get(analisisTipoCtrl.listar)

	app.route('/api/analisisTipos/:idAnalisisTipo')
	   .get(analisisTipoCtrl.mostrar)

	app.route('/api/analisisTipos/crear')
	   .post(analisisTipoCtrl.crear)

	app.route('/api/analisisTipos/:idAnalisisTipo/eliminar')
	   .delete(analisisTipoCtrl.eliminar)
}