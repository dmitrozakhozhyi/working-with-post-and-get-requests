import './spinner.sass';
import preloader from '../../images/preloader.svg';

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={preloader} alt="preloader" width="48px" />
    </div>
  );
};

export default Spinner;
