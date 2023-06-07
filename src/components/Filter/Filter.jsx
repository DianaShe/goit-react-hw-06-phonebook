import { InputField } from './Filter.styled';
import { Input } from 'utils/Utils.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  
  const handleChange = e => {
    dispatch(setFilter(e.currentTarget.value.toLowerCase()))
  }
  
  return (
    <InputField>
      <p>Find contacts by name</p>
      <Input type="text" name="filter" value={filter} onChange={handleChange} onBlur={() => dispatch(setFilter(''))}/>
    </InputField>
  );
}
