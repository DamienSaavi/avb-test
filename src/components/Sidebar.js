import { useEffect, useState } from "react"
import { AddIcon } from "../assets/Icons"
import { ContactRow } from "./ContactRow"

export function Sidebar({ contacts, selectContact, selectedId, loading, className }) {
    const [searchInput, setSearchInput] = useState('')
    const [searchTerms, setSearchTerms] = useState([])

    function updateSearchTerms() {
        const terms = searchInput.split(' ').filter(Boolean)
        setSearchTerms([...terms])
    }

    useEffect(() => {
        updateSearchTerms()
    }, [searchInput])

    return (
        <div className={`${className} bg-light text-left flex flex-col py-2`}>
            <div className='flex justify-between align-baseline px-3 py-2'>
                <p className='text-4xl opacity-80 font-light'>Contacts</p>
                <button
                    title="Add new contact"
                    onClick={() => selectContact(null)}>
                    <AddIcon className='h-10' />
                </button>
            </div>
            <div className='flex p-2'>
                <input
                    className='w-full py-1 px-2 border border-input focus:border-primary outline-none'
                    type='text'
                    value={searchInput}
                    placeholder='search'
                    onChange={event => setSearchInput(event.target.value)}
                    onFocus={(event) => event.target.select()}
                />
            </div>
            <ul className='overflow-y-auto h-full'>
                {contacts.filter(contact => searchTerms.every(term => {
                    const fullName = contact.firstName + ' ' + contact.lastName
                    return fullName.toLowerCase().includes(term.toLowerCase())
                })
                ).map(contact => {
                    return <ContactRow
                        className={`${contact.id == selectedId ? 'bg-primary text-white' : 'hover:bg-blue-100'} px-3 py-2 new-row-animated`}
                        selectContact={(id) => selectContact(id)}
                        key={contact.id} contact={contact} />
                })}
            </ul>
        </div>
    )
}