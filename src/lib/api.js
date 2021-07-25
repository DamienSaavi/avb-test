// get contacts by page
export async function getContacts(page, itermsPerPage) {
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

// fetch contact by ID and return info if successful
export async function getContactById(contactId) {
    const response = await fetch(`https://avb-contacts-api.herokuapp.com/contacts/${contactId}`, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(res => res.json())
        .catch(error => console.error('ERROR: ', error))

    const { id, firstName, lastName, emails } = response || {}
    return { id, firstName, lastName, emails }
}

// edit contact and return info if successful
export async function modifyContact(contactId, contact) {
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

export async function deleteContact(contactId) {
    const responseCode = await fetch(`https://avb-contacts-api.herokuapp.com/contacts/${contactId}`, {
        method: 'DELETE',
        redirect: 'follow'
    })
        .then(res => res.status)
        .catch(error => console.error('ERROR: ', error))

    return (responseCode === 200)
}

// add contact and return info if successful
export async function addContact(contact) {
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
        
    const { id, firstName, lastName, emails } = response || {}
    return { id, firstName, lastName, emails }
}
