const express = require ('express')
const winston = require ('winston')

const { createLogger, format, transports } = winston

const app = express()

const PORT = 8080

//Nivel Desarrollo
const DevLogger = createLogger({
    level: 'verbose',
    format: format.simple(),
        transports: [new transports.Console()]
})
//Nivel Produccion
const ProdLogger = winston.createLogger({
   /*  level: 'http',
    format: format.simple(), */
    transports: [
        new winston.transports.Console({level:'http'}),
        new winston.transports.File({filename: './app.log', level: 'warn'})
                            
                ]
})

//Middleware
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production'){
        req.logger= ProdLogger
    }else{
        req.logger= DevLogger
    }
    next()
})

//Ruta prueba
app.get('/', (req, res) => {
    //req.logger.verbose('MENSAJE A NIVEL DE VERBOSE')
   // req.logger.http('MENSAJE A NIVEL DE HTTP')
    req.logger.warn('MENSAJE A NIVEL DE WARN')
    //req.logger.error('MENSAJE A NIVEL DE ERROR')
    res.send({message: 'REGISTROS'})
})

app.listen(PORT, () =>{
    console.log(`Server running in port ${PORT}`)
    }) 

    

