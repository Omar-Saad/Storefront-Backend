import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import routes from './handlers'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"
// adidng cors middlewareclear

app.use(cors())
app.use(bodyParser.json())
app.use(routes);




app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app