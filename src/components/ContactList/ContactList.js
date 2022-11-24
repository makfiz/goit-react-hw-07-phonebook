import { List, Item, Btn, ItemNav } from 'components/ContactList/ContactList.styled'
import {useDispatch, useSelector  } from "react-redux";
import {deleteContact} from "redux/operations";   
import { getContacts, getFilterValue, getIsLoading, getError } from "redux/selectors";




const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts)
    const filter = useSelector(getFilterValue)
    const isLoading = useSelector(getIsLoading)
    const error = useSelector(getError)


    const filterByName = () => {
        return (
            contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
        )
    }
   return ( 
             <List>
                    <Item>Name/Phone:</Item>
                    {isLoading && <p>Loading tasks...</p>}
                    {error && <p>{error}</p>}
                {(filter === ''
                    ?
                    contacts
                    :
                    filterByName()
           ).map(contact => {
               let date = new Date(contact.createdAt)
               return (

                   <Item key={contact.id}>
                   <div><p>{contact.name} </p><p>{contact.phone }</p></div>
                    <ItemNav>{date.toLocaleString()} <Btn id={contact.id} onClick={(e) => dispatch(deleteContact(e.target.id))}>
                       Delete
                   </Btn></ItemNav>
                   </Item>)
           })   
                }  
            </List>
        )
}

export default ContactList