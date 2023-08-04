import successImage from '../../images/success-image.svg';
import './success.sass';

const Success = () => {
  return (
    <section className="registered">
      <div className="container">
        <h2 className="heading">User successfully registered</h2>
        <img
          className="registered-img"
          src={successImage}
          alt="Submitted"
        />{' '}
        <div className="copyright">
          © abz.agency specially for the test task
        </div>
      </div>
    </section>
  );
};

export default Success;
