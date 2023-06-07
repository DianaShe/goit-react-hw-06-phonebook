import { Contact, Info } from './ContactList.styled';
import { Button } from 'utils/Utils.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';
import PropTypes from 'prop-types';

const getVisibleContacts = (search, contacts) => {
  if (search === '') {
    return contacts;
  } else {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(search)
    );
  }
};

export default function ContactList() {
  const dispatch = useDispatch();
  
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const visibleContacts = getVisibleContacts(filter, contacts);

  return (
    <ul>
      {visibleContacts &&
        visibleContacts.map(({ name, id, number }) => (
          <Contact key={id}>
            <Info>
              {name}: {number}
            </Info>
            <Button type="button" onClick={() => dispatch(deleteContact(id))}>
              Delete
            </Button>
          </Contact>
        ))}
    </ul>
  );
}

getVisibleContacts.propTypes = {
  search: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
