const express = require('express')
const app = express()
app.use(express.json())
var bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json())
const jsonParser = bodyParser.json()
const PORT = 3000;
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`))
const test = require('./test')

const contacts = []

app.get('/whos-there', async (req, res) => {
    return res.status(200).send('Hi Trax! This is Guy Noiman')
})

app.get('/getAllContacts', (req, res) => {
    return res.status(200).json(contacts)
})

app.post('/addContact', jsonParser, (req, res) => {
    const phoneNumber = req.query.phoneNumber
    const userName = req.query.name
    // basic input validation
    if (userName.length === 0) return res.status(500).send('user name must contain at least one charcater')
    if (!(/^\d+$/.test(phoneNumber) && phoneNumber.length === 10)) return res.status(500).send('phone number is not valid')
    if (contacts.find((user) => user.name === userName)) return res.status(500).send('user name is already used, please choose another name')
    // if the input validation success
    const user = {
        phoneNumber: phoneNumber,
        name: userName
    }
    contacts.push(user)
    const newLength = (contacts.length).toString()
    return res.status(200).send(newLength)
})

app.get('/searchName', (req, res) => {
    const getContacts = contacts.find((user) => user.name === req.query.name)
    if (getContacts) return res.status(200).send(getContacts)
    return res.status(500).send('user name does not exist')
})








