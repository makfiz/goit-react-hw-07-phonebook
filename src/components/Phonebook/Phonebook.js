import {useEffect } from "react";
import {  useSelector, useDispatch  } from "react-redux";
import ContactForm from 'components/ContactForm/ContactForm'
import Filter from 'components/Filter/Filter'
import ContactList from "components/ContactList/ContactList";
import { selectContacts} from "redux/selectors";
// import { addContact } from "redux/contactsSlice";

import { fetchContacts, addContact } from "redux/operations";

const Phonebook = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts)
    
        useEffect(() => {
            dispatch(fetchContacts());
        }, [dispatch]);

    const onSubmitHandler = (data) => {
        
      const alreadyInContacts =  [...contacts].map(contact => {
          if (contact.name.toLowerCase() === data.name.toLowerCase()) {
              alert(`${contact.name} is already in contacts.`)
              return true
          }
          
          return false
      })
    
        if (alreadyInContacts.includes(true)) return
        else {
            dispatch(addContact({
                name: data.name,
                phone: data.number 
            }))
        }
    }

        return (
            <>  
                <h1 >Phonebook</h1>
                <ContactForm submit={onSubmitHandler} />
                {contacts.length > 0 && <div>
                    <h2 >Contact</h2>
                    <Filter name={'filter'} />
                    <ContactList />
                </div>}

            </>
        )
    
}

export default Phonebook