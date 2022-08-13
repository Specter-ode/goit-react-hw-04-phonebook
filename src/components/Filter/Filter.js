import PropTypes from 'prop-types';
import s from './Filter.module.css';
const Filter = props => {
  const { valueFromFilter, catchFilterInfo } = props;
  return (
    <label className={s.filter__label}>
      <input
        type="text"
        value={valueFromFilter}
        onChange={catchFilterInfo}
        className={s.filter__input}
      ></input>
      Find contacts by name
    </label>
  );
};

Filter.propTypes = {
  valueFromFilter: PropTypes.string,
  catchFilterInfo: PropTypes.func.isRequired,
};
export default Filter;
