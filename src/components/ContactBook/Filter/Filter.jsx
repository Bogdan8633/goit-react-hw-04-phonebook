import PropTypes from 'prop-types';

import styles from './filter.module.css';

const Filter = ({ value, onChange }) => (
  <div className={styles.wrapper}>
    <label className={styles.label} htmlFor="filter">
      Find contacts by name
    </label>
    <input type="text" name="filter" value={value} onChange={onChange} />
  </div>
);

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
