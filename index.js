const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
    return [    
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req)
    ].join(' ')
}))

app.use(cors())



let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>` + 
        `<p>${new Date().toString()}</p>`)
})

app.get('/api/persons', (request, response) => {
    if (persons) {
        response.json(persons)
    } else {
        response.status(404).end()
    }
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'persons name or number is missing'
        })
    }

    if(persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'persons name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000)
    }

    persons = persons.concat(person)

    response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})