/* import { useEffect, useState } from 'react';
import User from '../user/User';
import './users.sass';
import SkeletonLoader from '../skeleton/SkeletonLoader';

const API = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';

function Users({ isFormSubmitted }) {
  // Component state
  const [users, setUsers] = useState([]); //List of users
  const [error, setError] = useState(''); //Request error
  const [isLoading, setIsLoading] = useState(true); //Download status
  const [currentPage, setCurrentPage] = useState(1); //Current page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Loading users when mounting the component
    fetchUsers(API);
  }, []);

  // Function to load users from API
  const fetchUsers = (url) => {
    fetch(`${url}?page=${currentPage}&count=6`)
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, ...data.users]); // Adding the received users to the list
        setTotalPages(data.total_pages); // Set the total number of pages
        setCurrentPage((prevPage) => prevPage + 1); // Enlarge current page
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // User reload handler on form submission
  const onReload = () => {
    const firstPage = `${API}?page=1&count=6`;
    setUsers([]); // Reset user list
    fetchUsers(firstPage); // Loading users
    setCurrentPage(1); // Set current page to 1
  };

  useEffect(() => {
    // Reload users if the form has been submitted
    if (isFormSubmitted) {
      onReload();
    }
  }, [isFormSubmitted]); // Dependency on isFormSubmitted

  useEffect(() => {
    // Load users if current page is greater than 1
    if (currentPage > 1) {
      setUsers([]); // Reset user list
      fetchUsers(API); // Loading users
    }
  }, []); // Empty dependency, only executed when the component is mounted

  // Обработчик загрузки следующей страницы пользователей
  const handleLoadMore = () => {
    const nextPageURL = `${API}?page=${currentPage + 1}&count=6`;
    fetchUsers(nextPageURL); // Load users next page
  };

  if (error) {
    return <h1>Error: {error}</h1>; // Display error if any
  }

  console.log(users.length);

  return (
    <section className="users">
      <div className="container">
        <h2 className="heading">Working with GET request</h2>
        <div className="users__grid" id="users">
          {isLoading ? (
            // Display preloader while loading

            <SkeletonLoader count={6} />
          ) : (
            // Display a list of users
            users.map((user) => {
              return <User key={user.id} {...user} />;
            })
          )}
        </div>
        <button
          className="button users__button"
          onClick={handleLoadMore}
          disabled={currentPage === totalPages}
        >
          Show more
        </button>
      </div>
    </section>
  );
}

export default Users;
 */

import { useEffect, useState } from 'react';
import User from '../user/User';
import './users.sass';
import SkeletonLoader from '../skeleton/SkeletonLoader';
import Spinner from '../spiner/Spinner';

const API = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';

function Users({ isFormSubmitted }) {
  // Component state
  const [users, setUsers] = useState([]); //List of users
  const [error, setError] = useState(''); //Request error
  const [isLoading, setIsLoading] = useState(true); //Download status
  const [loadingMore, setLoadingMore] = useState(false); //Download status

  const [currentPage, setCurrentPage] = useState(1); //Current page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Loading users when mounting the component
    fetchUsers(API);
  }, []);

  // Function to load users from API
  const fetchUsers = (url) => {
    fetch(`${url}?page=${currentPage}&count=6`)
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, ...data.users]); // Adding the received users to the list
        setTotalPages(data.total_pages); // Set the total number of pages
        setCurrentPage((prevPage) => prevPage + 1); // Enlarge current page
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
        setLoadingMore(false);
      });
  };

  // User reload handler on form submission
  const onReload = () => {
    const firstPage = `${API}?page=1&count=6`;
    setUsers([]); // Reset user list
    fetchUsers(firstPage); // Loading users
    setCurrentPage(1); // Set current page to 1
  };

  useEffect(() => {
    // Reload users if the form has been submitted
    if (isFormSubmitted) {
      onReload();
    }
  }, [isFormSubmitted]); // Dependency on isFormSubmitted

  useEffect(() => {
    // Load users if current page is greater than 1
    if (currentPage > 1) {
      setUsers([]); // Reset user list
      fetchUsers(API); // Loading users
    }
  }, []); // Empty dependency, only executed when the component is mounted

  // Обработчик загрузки следующей страницы пользователей
  const handleLoadMore = () => {
    setLoadingMore(true);
    const nextPageURL = `${API}?page=${currentPage + 1}&count=6`;
    fetchUsers(nextPageURL); // Load users next page
  };

  if (error) {
    return <h1>Error: {error}</h1>; // Display error if any
  }

  return (
    <section className="users">
      <div className="container">
        <h2 className="heading">Working with GET request</h2>
        <div className="users__grid" id="users">
          {isLoading ? (
            // Display preloader while loading

            <SkeletonLoader count={6} />
          ) : (
            // Display a list of users
            users.map((user) => {
              return <User key={user.id} {...user} />;
            })
          )}
        </div>
        {loadingMore ? (
          <Spinner />
        ) : (
          <button
            className="button users__button"
            onClick={handleLoadMore}
            disabled={currentPage === totalPages}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
}

export default Users;
