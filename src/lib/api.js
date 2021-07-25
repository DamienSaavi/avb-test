async function getContacts(page, itermsPerPage) {
    const response = await fetch(`https://avb-contacts-api.herokuapp.com/contacts/paginated?itemsPerPage=${itermsPerPage}&page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        redirect: 'follow'
    })
        .then(res => res.json())
        .catch(error => console.error('ERROR: ', error))

    const { contacts, totalItems } = response || {}
    return { contacts, totalItems }
}


async function getContactById(contactId) {
    const response = await fetch(`https://avb-contacts-api.herokuapp.com/contacts/${contactId}`, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(res => res.json())
        .catch(error => console.error('ERROR: ', error))

    const { id, firstName, lastName, emails } = response || {}
    return { id, firstName, lastName, emails }
}


async function modifyContact(contactId, contact) {
    const response = await fetch(`https://avb-contacts-api.herokuapp.com/contacts/${contactId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify(contact)
    })
        .then(res => res.json())
        .catch(error => { console.error('ERROR: ', error) })

    const { id, firstName, lastName, emails } = response || {}
    return { id, firstName, lastName, emails }
}

async function deleteContact(contactId) {
    const responseCode = await fetch(`https://avb-contacts-api.herokuapp.com/contacts/${contactId}`, {
        method: 'DELETE',
        redirect: 'follow'
    })
        .then(res => res.status)
        .catch(error => console.error('ERROR: ', error))

    return (responseCode === 200)
}


async function addContact(contact) {
    const response = await fetch(`https://avb-contacts-api.herokuapp.com/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(contact)
    })
        .then(res => res.json())
        .catch(error => console.error('ERROR: ', error))
    console.log(response)
    const { id, firstName, lastName, emails } = response || {}
    return { id, firstName, lastName, emails }
}

module.exports = {
    addContact,
    deleteContact,
    modifyContact,
    getContactById,
    getContacts
}