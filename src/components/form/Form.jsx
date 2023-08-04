import { useState, useEffect, useRef } from 'react';
import './form.sass';
import preloader from '../../images/preloader.svg';
import Success from '../success/Success';

const Form = ({ onFormSubmit }) => {
  const fileField = useRef(null); // Create a useRef to access the file select field
  const [data, setData] = useState({
    // Create state to store form data
    name: '',
    email: '',
    phone: '',
    photo: null,
    position_id: 1,
  });
  const [positions, setPositions] = useState({
    // Создание состояния для хранения списка должностей
    position_id: 1,
  });

  const [errors, setErrors] = useState({}); // Create state to store form errors
  const [isLoading, setIsLoading] = useState(true); // Create a state to display loading
  const [isSubmitting, setIsSubmitting] = useState(false); // Create state to handle form submission
  const [isFormValid, setIsFormValid] = useState(false); // Create state for form validation
  const [isSubmitted, setIsSubmitted] = useState(false); // Create state to display successful form submission
  const [selectedFileName, setSelectedFileName] = useState(''); // Create a state to display the name of the selected file

  useEffect(() => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then((response) => response.json())
      .then((positions) => setPositions(positions.positions))
      .catch((error) => {
        setErrors(error.message);
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Effect triggered when the value of isSubmitting changes
  useEffect(() => {
    if (isSubmitting) {
      const isValid = validateForm();
      if (isValid) {
        submitForm();
        setIsSubmitting(false);
      }
    }
  }, [isSubmitting]);

  // Handler for changes to the input of text fields of the form
  const handleInputChange = (event, fieldName) => {
    if (fieldName === 'photo') {
      const file = event.target.files[0];
      setData({
        ...data,
        [fieldName]: file,
      });
      setSelectedFileName(file ? file.name : '');
    } else {
      setData({
        ...data,
        [fieldName]: event.target.value,
      });
    }
    validateForm();
  };

  // Handler for input changes of form radio buttons
  const handleRadioChange = (event, fieldName) => {
    setData({
      ...data,
      [fieldName]: +event.target.id,
    });
    validateForm();
  };

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    submitForm();
  };

  // Form validation function
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Валидация полей формы

    if (!data.name) {
      isValid = false;
      errors.name = 'Please enter your name.';
    } else if (data.name.length < 2 || data.name.length > 60) {
      errors.name = 'The name must be at least 2 characters.';
    }

    if (!data.email) {
      isValid = false;
      errors.email = 'Please enter your email address.';
    } else if (
      !/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~\u002D]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~\u002D]+)*|"(?:[\u0021-\u007E\u0080-\u00FF]|\\[\t\n\r\u0020-\u007F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\u0021-\u007E\u0080-\u00FF]|\\[\t\n\r\u0020-\u007F])+)\])$/.test(
        data.email
      )
    ) {
      isValid = false;
      errors.email = 'The email must be a valid email address.';
    }

    if (!data.phone) {
      isValid = false;
      errors.phone = 'Please enter your phone number.';
    } else if (!/^(\+)?380([0-9]{9})$/.test(data.phone)) {
      isValid = false;
    }

    setErrors(errors);
    setIsFormValid(isValid);
    return isValid;
  };

  // Form submit function
  const submitForm = async () => {
    try {
      const tokenResponse = await fetch(
        'https://frontend-test-assignment-api.abz.agency/api/v1/token'
      );
      const tokenData = await tokenResponse.json();
      const token = tokenData.token;

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('photo', data.photo);
      formData.append('position_id', data.position_id);

      const response = await fetch(
        'https://frontend-test-assignment-api.abz.agency/api/v1/users',
        {
          method: 'POST',
          body: formData,
          headers: {
            Token: token,
          },
        }
      );
      const responseData = await response.json();

      if (responseData.success === true) {
        setIsSubmitted(true);
        onFormSubmit();
      } else {
        // Обработка ошибок сервера
        console.log(responseData);
      }
    } catch (error) {
      // Обработка сетевых ошибок
      console.log(error.message);
      alert(error.message);
    }
  };

  if (isSubmitted) {
    <Success />;
  } else {
    // Otherwise, the form is displayed
    return (
      <section className="form-section">
        <div className="container">
          <h2 className="heading">Working with POST request</h2>
          <form
            onSubmit={handleSubmit}
            id="form"
            className="form"
            autoComplete="off"
          >
            <div className="text-input">
              <input
                className={!errors.name ? 'input' : 'input input-error'}
                type="text"
                name="name"
                placeholder="Your name"
                value={data.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
              {errors.name && (
                <label className="label input-error">{errors.name}</label>
              )}
            </div>

            <div className="text-input">
              <input
                className={!errors.email ? 'input' : 'input input-error'}
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => handleInputChange(e, 'email')}
              />
              {errors.email && (
                <label className="label input-error">{errors.email}</label>
              )}
            </div>

            <div className="text-input">
              <input
                className={!errors.phone ? 'input' : 'input input-error'}
                type="tel"
                name="phone"
                placeholder="Phone"
                value={data.phone}
                onChange={(e) => handleInputChange(e, 'phone')}
              />

              {errors.phone ? (
                <label className="label input-error">{errors.phone}</label>
              ) : (
                <label className="label">+38 (XXX) XXX - XX - XX</label>
              )}
            </div>

            <div className="form__positions">
              <p>Select your position</p>

              {isLoading ? (
                <>
                  <h3>Loading...</h3>
                  <div className="users__item">
                    <img
                      className="users__item-photo"
                      src={preloader}
                      alt="preloader"
                    />
                  </div>
                </>
              ) : (
                positions.map((position) => {
                  return (
                    <label key={position.id} className="form__check-label">
                      <input
                        id={position.id}
                        onChange={(e) => handleRadioChange(e, 'position_id')}
                        checked={data.position_id === position.id}
                        type="radio"
                      />
                      {position.name}
                    </label>
                  );
                })
              )}
            </div>

            <label className="labelPhoto">
              <span>Upload</span>
              <input
                name="photo"
                type="file"
                accept=".jpg, .jpeg"
                ref={fileField}
                onChange={(e) => handleInputChange(e, 'photo')}
              />
              <span>{selectedFileName || 'Upload your photo'}</span>
            </label>

            <button
              className="button form__button"
              type="submit"
              name="submit"
              disabled={!isFormValid}
            >
              Sign up
            </button>
          </form>
        </div>
      </section>
    );
  }
};

export default Form;
