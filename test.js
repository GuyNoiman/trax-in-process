const fetch = require('node-fetch')
const URL = 'http://localhost:3000'
const success = 'OK'
const fail = 'FAILURE'

const testUser1 = {
    name: '',
    phoneNumber: '1234447890'
}
const testUser2 = {
    name: 'gguuyy2',
    phoneNumber: '123'
}
const testUser3 = {
    name: 'gguuyy3',
    phoneNumber: '123gfhd456'
}
const testUser4 = {
    name: 'gguuyy4',
    phoneNumber: '1234567890'
}


async function test() {
    try {
        // whos-there
        let res = await fetch(`${URL}/whos-there`, { method: 'GET' })
        let ans = await res.text()
        if (ans === 'Hi Trax! This is Guy Noiman') console.log('whos-there', success)
        else console.log('whos-there', fail)

        // gelAllContacts
        res = await fetch(URL + '/getAllContacts', { method: 'GET' })
        ans = await res.text()
        if (ans === '[]') console.log('getAllContacts', success)
        else console.log('getAllContacts', fail)

        // addContact
        res = await fetch(URL + `/addContact?name=${testUser4.name}&phoneNumber=${testUser4.phoneNumber}`, { method: 'POST' })
        ans = await res.text()
        let res1 = await fetch(URL + `/addContact?name=${testUser3.name}&phoneNumber=${testUser4.phoneNumber}`, { method: 'POST' })
        let ans1 = await res1.text()
        if (ans !== ans1) console.log('addContact', success)
        else console.log('addContact', fail)

        // addContact-phone number validation
        res = await fetch(URL + `/addContact?name=${testUser2.name}&phoneNumber=${testUser2.phoneNumber}`, { method: 'POST' })
        ans = await res.text()
        res1 = await fetch(URL + `/addContact?name=${testUser3.name}&phoneNumber=${testUser3.phoneNumber}`, { method: 'POST' })
        ans1 = await res1.text()
        if (ans === 'phone number is not valid' && ans1 === 'phone number is not valid') console.log('addContact-phoneValidation', success)
        else console.log('addContact-phoneValidation', fail)

        // addContact-name validation
        res = await fetch(URL + `/addContact?name=${testUser1.name}&phoneNumber=${testUser1.phoneNumber}`, { method: 'POST' })
        ans = await res.text()
        if (ans === 'user name must contain at least one charcater') console.log('addContact-nameValidation', success)
        else console.log('addContact-nameValidation', fail)

        // addContact-duplicate user name
        res = await fetch(URL + `/addContact?name=${testUser4.name}&phoneNumber=${testUser1.phoneNumber}`, { method: 'POST' })
        ans = await res.text()
        if (ans === 'user name is already used, please choose another name') console.log('addContact-duplicatUserName', success)
        else console.log('addContact-duplicatUserName', fail)

        // gelAllContacts - after add contcts
        res = await fetch(URL + '/getAllContacts', { method: 'GET' })
        ans = await res.text()
        if (ans !== '[]') console.log('getAllContacts-afterAddContact', success)
        else console.log('getAllContacts-afterAddContact', fail)

        // searchName
        const username = 'user1'
        res = await fetch(URL + `/getAllContacts?name=${username}`, { method: 'GET' })
        ans = await res.text()
        if (ans === 'user name does not exist') console.log('searchName', fail)
        else console.log('searchName', success)
    } catch (error) {
        console.log(fail + ' ' + error)
    }
}

test()
