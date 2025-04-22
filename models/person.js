
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

mongoose.connect(url)
    .then(result => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log("Error connecting to MongoDB", error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type : String,
        validate : {
            validator : (number) => {
                return number.length >= 8 && (/\d{2}-\d/.test(number) || /\d{3}-\d/.test(number))
            },
            message: props => `${props.value} is not a valid phone number. Needs to be in format 000-0000000 or 00-00000000`
        }
        
    } 
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const person = mongoose.model("Person", personSchema)

const options = { runvalidators: true }

person.updateOne({}, {}, options)

module.exports = person