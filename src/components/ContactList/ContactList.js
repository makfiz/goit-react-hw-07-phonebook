import { List, Item, Btn, ItemNav } from 'components/ContactList/ContactList.styled'
import {useDispatch, useSelector  } from "react-redux";
import {deleteContact} from "redux/operations";   
import { selectContacts, selectFilterValue, selectIsLoading, selectError } from "redux/selectors";




const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts)
    const filter = useSelector(selectFilterValue)
    const isLoading = useSelector(selectIsLoading)
    const error = useSelector(selectError)


    const filterByName = () => {
        return (
            contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
        )
    }
   return ( 
             <List>
                    <Item>Name/Phone:</Item>

                {(filter === ''
                    ?
                    contacts
                    :
                    filterByName()
           ).map(contact => {
               return (

                   <Item key={contact.id}>
                   <div><p>{contact.name} </p><p>{contact.phone }</p></div>
                    <ItemNav><Btn id={contact.id} onClick={(e) => dispatch(deleteContact(e.target.id))}>
                       Delete
                   </Btn></ItemNav>
                   </Item>)
           })   
                }
                {isLoading && <p>Loading tasks...</p>}
                {error && <p>{error}</p>}      
            </List>
        )
}

export default ContactList