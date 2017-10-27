import consultaDiagnosticoCtrl from './consultaDiagnostico.controller'


export default (app) => {
	// grafica 1.
	app.route('/api/consultaDiagnosticos/grafica1')
	   .get(consultaDiagnosticoCtrl.listarCantidadDiagnosticosEnAnhos)

	// grafica 2.
	app.route('/api/consultaDiagnosticos/grafica2')
	   .get(consultaDiagnosticoCtrl.listarCantidadDiagnosticosPorAnho)
	   
	app.route('/api/consultaDiagnosticos/:idConsulta')
	   .get(consultaDiagnosticoCtrl.listar)

	app.route('/api/consultaDiagnosticos/:idConsultaDiagnostico')
	   .get(consultaDiagnosticoCtrl.mostrar)

	app.route('/api/consultaDiagnosticos/crear')
	   .post(consultaDiagnosticoCtrl.crear)

	app.route('/api/consultaDiagnosticos/:idConsultaDiagnostico/editar')
	   .get(consultaDiagnosticoCtrl.mostrarParaEditar)

	app.route('/api/consultaDiagnosticos/editar')
	   .put(consultaDiagnosticoCtrl.editar)

	app.route('/api/consultaDiagnosticos/:idConsultaDiagnostico/eliminar')
	   .delete(consultaDiagnosticoCtrl.eliminar)
}