const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

export function formatName(name = '') {
    let formattedName = name.trim()
    formattedName.replace(/\s{2,}/, ' ')

    if (formattedName.length == 0) {
        alert('Cannot save contact: first and last name cannot be empty.')
        return false
    }

    if (formattedName.match(/[^\w\d\s]/)) {
        alert('Cannot save contact: name can only contain alphanumeric and white space characters.')
        return false
    }

    if (formattedName.length > 32) {
        alert('Cannot save contact: first or last name cannot be longer than 32 characters.')
        return false
    }
    return formattedName
}

export function formatEmails(emails) {
    const formattedEmails = []
    for (let i = 0; i < emails.length; i++) {
        const formattedEmail = formatEmail(emails[i])
        if (formattedEmail) {
            formattedEmails.push(formattedEmail)
        } else {
            return false
        }
    }

    for (let i = 0; i < formattedEmails.length-1; i++) {
        for (let j = i + 1; j < formattedEmails.length; j++) {
            if (formattedEmails[i].toUpperCase() === formattedEmails[j].toUpperCase()) {
                alert('Cannot save contact: email address ' + formattedEmails[i] + ' already exists for this contact.')
                return false
            }
        }
    }

    return formattedEmails
}

function formatEmail(email) {
    let formattedEmail = email.trim()

    if (email === '') {
        alert('Cannot save contact: email address cannot be empty.')
        return false
    } else if (formattedEmail.match(emailRegex)) {
        return formattedEmail
    } else {
        alert('Cannot save contact: invalid email address.')
        return false
    }

}