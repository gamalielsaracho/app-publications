import React from 'react'
import { Route, IndexRoute } from 'react-router'


// LISTAR TIPOS DE ANALISIS APP.
import ListarTiposAnalisisApp from './components/ListarApp'
import ListarTiposAnalisisPage from './pages/ListarTiposAnalisisPage'
	
	// MOSTRAR TIPO DE ANALISIS APP.
import MostrarTipoAnalisisAppContainer from './components/MostrarApp'

// LISTAR PARAMETROS-ANALISIS BY ID_TIPOANALISIS.
import ListarParametrosAnalisisContainer from '.././parametroAnalisis/components/Listar'


// MOSTRAR PARAMETRO ANALISIS APP.
import MostrarParametroAnalisisAppContainer from '.././parametroAnalisis/components/MostrarApp'

import ListarReferenciasContainer from '.././referencia/components/Listar'


const tipoAnalisisRoutes = (
	<Route path='/dashboard/tipos-analisis' component={ListarTiposAnalisisApp}>
		<IndexRoute component={ListarTiposAnalisisPage}/>
		
		<Route path='/dashboard/tipos-analisis/:idTipoAnalisis' component={MostrarTipoAnalisisAppContainer}>
			<Route path='/dashboard/tipos-analisis/:idTipoAnalisis/parametros' 
				component={ListarParametrosAnalisisContainer}/>
					
			<Route path='/dashboard/tipos-analisis/:idTipoAnalisis/parametros/:idParametroAnalisis' 
				component={MostrarParametroAnalisisAppContainer}>

				<Route path='/dashboard/tipos-analisis/:idTipoAnalisis/parametros/:idParametroAnalisis/referencias' 
					component={ListarReferenciasContainer}/>						
			</Route>
		</Route>
	</Route>
)

export default tipoAnalisisRoutes