import usuarioRoutes from './usuario/usuario.routes.js'
import rolRoutes from './rol/rol.routes.js'


export default (app) => {
	usuarioRoutes(app)
	rolRoutes(app)
}