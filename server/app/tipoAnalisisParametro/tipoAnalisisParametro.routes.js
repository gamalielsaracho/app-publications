import tipoAnalisisParametroCtrl from './tipoAnalisisParametro.controller'

export default (app) => {
	app.route('/api/tipoAnalisisParametros/:idTipoAnalisis')
	   .get(tipoAnalisisParametroCtrl.listar)

	app.route('/api/tipoAnalisisParametros/:idTipoAnalisisParametro')
	   .get(tipoAnalisisParametroCtrl.mostrar)

	app.route('/api/tipoAnalisisParametros/crear')
	   .post(tipoAnalisisParametroCtrl.crear)

	// app.route('/api/tipoAnalisisParametros/:idTipoAnalisisParametro/editar')
	//    .get(tipoAnalisisParametroCtrl.mostrarParaEditar)

	// app.route('/api/tipoAnalisisParametros/editar')
	//    .put(tipoAnalisisParametroCtrl.editar)

	app.route('/api/tipoAnalisisParametros/:idTipoAnalisisParametro/eliminar')
	   .delete(tipoAnalisisParametroCtrl.eliminar)
}