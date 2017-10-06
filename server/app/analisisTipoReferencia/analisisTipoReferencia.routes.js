import analisisTipoReferenciaCtrl from './analisisTipoReferencia.controller'

export default (app) => {
	app.route('/api/analisisTipoReferencias/:idAnalisisTipo/listar')
	   .get(analisisTipoReferenciaCtrl.listar)

	app.route('/api/analisisTipoReferencias/crear')
	   .post(analisisTipoReferenciaCtrl.crear)

	app.route('/api/analisisTipoReferencias/:idAnalisisTipoAnalisisReferencia/editar')
	   .get(analisisTipoReferenciaCtrl.mostrarParaEditar)

	app.route('/api/analisisTipoReferencias/editar')
	   .put(analisisTipoReferenciaCtrl.editar)

	app.route('/api/analisisTipoReferencias/:idAnalisisTipoAnalisisReferencia/eliminar')
	   .delete(analisisTipoReferenciaCtrl.eliminar)
}