import { useState, useEffect } from "react"
import { AddIcon, DeleteIcon } from "../assets/Icons"
import { formatEmails, formatName } from '../lib/input';

export function Contact({ contact, deleteContact, saveChanges, className }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emails, setEmails] = useState([])
    const [editing, setEditing] = useState(false)

    // load contact passed as param
    function initContact() {
        setFirstName(contact.firstName)
        setLastName(contact.lastName)
        setEmails([...contact.emails])
        setEditing(contact?.id ? false : true)
    }

    function deleteEmail(i) {
        const updatedEmails = emails
        updatedEmails.splice(i, 1)
        setEmails([...updatedEmails])
    }

    function addEmail() {
        setEmails(emails.concat(''))
    }

    function updateEmail(i, val) {
        const updatedEmails = emails
        updatedEmails[i] = val
        setEmails([...updatedEmails])
    }

    // validate contact info and save formatted information 
    function onSaveChanges() {
        const validFirstName = formatName(firstName)
        if (!validFirstName) return

        const validLastName = formatName(lastName)
        if (!validLastName) return

        const validEmails = formatEmails(emails)
        if (!validEmails) return

        if (validFirstName && validLastName && validEmails) {
            saveChanges({
                firstName: validFirstName,
                lastName: validLastName,
                emails: validEmails
            })
        }
    }

    // update contact info states on contact param change
    useEffect(() => {
        initContact()
    }, [contact])


    return (
        <div className={`${className} flex flex-col justify-between gap-12 p-6 pt-10 bg-white overflow-y-auto`}>
            <div className='space-y-4'>
                <div className='flex flex-row gap-4'>
                    <div className='flex flex-col items-start w-1/2'>
                        <label className='text-sm mb-1 opacity-80' htmlFor='contact-firstname'>First Name</label>
                        <input
                            maxLength={32}
                            id='contact-firstname'
                            type='text' value={firstName}
                            onChange={event => setFirstName(event.target.value)}
                            disabled={!editing}
                            className={`transition-all w-full border ${editing ? 'border-input bg-light focus:border-primary' : 'border-transparent bg-transparent'} px-2 py-1 text-lg outline-none`} />
                    </div>
                    <div className='flex flex-col items-start w-1/2'>
                        <label className='text-sm mb-1 opacity-80' htmlFor='contact-lastname'>Last Name</label>
                        <input
                            maxLength={32}
                            id='contact-lastname'
                            type='text'
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}
                            disabled={!editing}
                            className={`transition-all w-full border border-input ${editing ? 'border-opacity-100 bg-light focus:border-primary' : 'border-opacity-0 bg-white'} px-2 py-1 text-lg outline-none`} />
                    </div>
                </div>
                <div className='flex flex-col items-start'>
                    <label className='text-sm mb-1 opacity-80' htmlFor='contact-emails'>Emails</label>
                    <ul className='flex flex-col gap-1' id='contact-emails'>
                        {emails?.map((email, i) =>
                            <li key={i} className={`flex flex-row items-end`}>
                                <button
                                    title="Delete email"
                                    disabled={!editing}
                                    className={`absolute transition-all transform ${editing ? 'scale-100' : ' scale-0 opacity-0 select-none'} place-self-center`}
                                    onClick={() => { deleteEmail(i) }}
                                ><DeleteIcon className='h-7' /></button>
                                <input
                                    key={i.toString()}
                                    type='text' value={emails[i]}
                                    onChange={event => updateEmail(i, event.target.value)}
                                    disabled={!editing}
                                    className={`transition-all transform w-full border ${editing ? ' translate-x-8 border-input bg-light focus:border-primary' : 'border-transparent bg-transparent'} px-2 py-1 text-lg outline-none`} />
                            </li>
                        )}
                        <button
                            title="Add new email"
                            disabled={!editing}
                            className={`transition-all transform ${editing ? '' : 'opacity-0 cursor-default select-none'} flex flex-row h-10 py-1 items-center text-primary mt-2`}
                            onClick={addEmail}
                        ><AddIcon className='h-7 mr-1' />{'add email'}
                        </button>
                    </ul>
                </div>
            </div>
            <div className='flex justify-between'>
                <button
                    title="Delete contact"
                    className='border border-danger bg-danger text-white p-1 w-24 '
                    onClick={deleteContact} >
                    Delete
                </button>

                <div className='space-x-6'>
                    {editing ?
                        <button
                            title="Cancel changes"
                            className='border bg-white border-primary p-1 w-24'
                            onClick={contact.id ? initContact : deleteContact}>
                            Cancel
                        </button> : null}

                    <button
                        title="Save changes"
                        className='border border-primary bg-primary text-white p-1 w-24'
                        onClick={() => {
                            if (editing) onSaveChanges()
                            else setEditing(!editing)
                        }}>
                        {editing ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </div>
    )
}