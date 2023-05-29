import { useDispatch, useSelector } from 'react-redux';
import { getFilter, setFilter } from 'redux/filterSlice';
import css from './Filter.module.css';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  return (
    <div>
      <label className={css.labelFilter}>
        {' '}
        Filter by name
        <input
          value={filter}
          onChange={event => dispatch(setFilter(event.target.value))}
        ></input>{' '}
      </label>
    </div>
  );
};
