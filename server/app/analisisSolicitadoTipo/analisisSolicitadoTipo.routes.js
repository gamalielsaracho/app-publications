import analisisSolicitadoTipoCtrl from './analisisSolicitadoTipo.controller'

export default (app) => {
	app.route('/api/analisisSolicitadoTipos/:idAnalisisSolicitado')
	   .get(analisisSolicitadoTipoCtrl.listar)

	app.route('/api/analisisSolicitadoTipos/crear')
	   .post(analisisSolicitadoTipoCtrl.crear)

	app.route('/api/analisisSolicitadoTipos/:idAnalisisSolicitadoTipo/eliminar')
	   .delete(analisisSolicitadoTipoCtrl.eliminar)
}