import express from 'express'
import bodyParser  from 'body-parser'

import routes from './app/routes'

let app = express()

routes(app)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(3000, (err) => {
	if(err) {
		console.log(`Error al correr el servidor 3000`)
	}

	console.log(`Corriendo en el puerto 3000`)
})