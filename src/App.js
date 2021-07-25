import './App.css'
import {
  addContact,
  modifyContact,
  deleteContact,
  getContactById,
  getContacts
} from './lib/api';
import { Sidebar } from './components/Sidebar';
import { Contact } from './components/Contact';
import { useEffect, useState } from 'react';

function App() {
  const [allContacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [loadingContact, setLoadingContact] = useState(false)

  // load all contacts upon startup
  useEffect(() => {
    loadContacts()

    // update contact list in case another client makes changes
    setInterval(() => { loadContacts() }, 5000)
  }, [])

  // set loading state to false once contact information is fetched
  useEffect(() => {
    setLoadingContact(false)
  }, [selectedContact])

  // load all contacts using paginated api endpoint and sort alphabetically
  async function loadContacts() {
    let page = 1, itemsPerPage = 20;
    const contacts = []

    let res = await getContacts(page, itemsPerPage)
    let contactsFrag = res.contacts
    let totalItems = res.totalItems

    contacts.push(...contactsFrag)

    while (totalItems && page * itemsPerPage < totalItems) {
      page++

      let res = await getContacts(page, itemsPerPage)
      contactsFrag = res.contacts
      totalItems = res.totalItems

      contacts.push(...contactsFrag)
    }

    contacts.sort((a, b) => {
      const contact1 = a.firstName.concat(a.lastName)
      const contact2 = b.firstName.concat(b.lastName)

      if (contact1.toUpperCase() > contact2.toUpperCase())
        return 1
      else
        return -1
    })

    setContacts(contacts)
  }

  // fetch contact by ID and set as selected contact
  // if no id is supplied, a new empty contact is created and selected for editing
  async function selectContact(id) {
    setLoadingContact(true)

    if (id) {
      const contact = await getContactById(id)
      if (contact.id)
        setSelectedContact(contact)
      else
        alert('Cannot fetch data: contact no longer exists in database.')
    } else {
      const contact = id ? await getContactById(id) : {
        firstName: '',
        lastName: '',
        emails: []
      }
      setSelectedContact(contact)
    }
  }

  // delete selected contact.
  async function deleteSelectedContact() {
    if (selectedContact.id)
      if (window.confirm('Do you wish to delete ' + selectedContact.firstName + ' ' + selectedContact.lastName + ' from your contact list?'))
        await deleteContact(selectedContact.id)
      else
        return

    setSelectedContact(null)
    loadContacts()
  }

  // save changes made to an existing contact or save new contact (when selected contact has no ID)
  async function saveChanges(contact) {
    if (contact.id) {
      const res = await modifyContact(contact.id, contact)
      if (!res.id) {
        alert('Cannot save changes: selected user no longer exists in database.')
        setSelectedContact(null)
      }
    } else {
      setSelectedContact(await addContact(contact))
    }
    loadContacts()
  }

  return (
    <div
      className="App w-screen h-screen p-32 px-8 bg-gradient-to-t from-indigo-500 to-indigo-400">
      <div className='bg-white flex flex-row min-w-min mx-auto max-w-5xl h-full max-h-full shadow-2xl'>
        <Sidebar
          className='w-56 flex-shrink-0 flex-grow-0'
          contacts={allContacts}
          selectContact={selectContact}
          selectedId={selectedContact?.id}
        />
        {!loadingContact && selectedContact ?
          <Contact
            className='flex-grow'
            contact={selectedContact}
            saveChanges={saveChanges}
            deleteContact={deleteSelectedContact}
          />
          : <div className='flex-grow text-center place-self-center'>{loadingContact ? 'Loading...' : 'Select a contact or create a new one. '}</div>
        }
      </div>
    </div>
  );
}

export default App;
