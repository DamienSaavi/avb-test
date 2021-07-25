export function ContactRow({ contact, selectContact, className }) {
    return (
        <div className={`${className} cursor-pointer`}
        onClick={() => selectContact(contact.id)}>
            <p className='select-none whitespace-nowrap'>{contact.firstName + ' ' + contact.lastName}</p>
        </div>
    )
}