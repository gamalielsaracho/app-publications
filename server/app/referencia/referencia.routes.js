import referenciaCtrl from './referencia.controller'

export default (app) => {
	app.route('/api/referencias')
	   .get(referenciaCtrl.listar)

	 // idTipoAnalisis -> hemograma, orina, etc..
	app.route('/api/referencias/:idTipoAnalisis/:fechaNacimiento/:sexo/filtradas')
	   .get(referenciaCtrl.listarReferenciasParaInsertar)

	app.route('/api/referencias/:idParametroAnalisis')
	   .get(referenciaCtrl.listarPorParametroAnalisis)

	app.route('/api/referencias/:idReferencia')
	   .get(referenciaCtrl.mostrar)

	app.route('/api/referencias/crear')
	   .post(referenciaCtrl.crear)

	app.route('/api/referencias/:idReferencia/editar')
	   .get(referenciaCtrl.mostrarParaEditar)

	app.route('/api/referencias/editar')
	   .put(referenciaCtrl.editar)

	app.route('/api/referencias/:idReferencia/eliminar/:idPersonal')
	   .delete(referenciaCtrl.eliminar)
}