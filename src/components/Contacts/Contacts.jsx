import PropTypes from 'prop-types';
import css from './Contacts.module.css'

export const Contacts = ({ contactsInfo, onDelete}) => {
    return (
            <ul>
    {contactsInfo.map(contact => {
   return ( <li key={contact.id}>
       <p className={css.names}>{contact.name}: {contact.number}
           <button
               type="button"
               className={css.btn}
           onClick={() => {
                   onDelete(contact.id)
                   console.log(contact.id);
               
               }}>Delete</button> </p>
    </li>)
     })}
 </ul>
    )
}

Contacts.propTypes = {
    contactsInfo: PropTypes.arrayOf(PropTypes.shape({
        
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    
    })).isRequired,
    onDelete: PropTypes.func.isRequired,
}