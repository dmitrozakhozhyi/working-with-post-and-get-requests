import './user.sass';
import photoCover from '../../images/photo-cover.svg';
import Tooltip from '../../utils/Tooltip';

function User({ photo, name, position, email, phone }) {
  return (
    <div className="user__item">
      <img
        className="user__item-photo"
        src={
          photo ===
          'https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png'
            ? photoCover
            : photo
        }
        alt="user avatar"
        width="70px"
      />

      {name.length >= 30 
        ? <Tooltip tooltip={name}><div className="user__item-name">{name}</div></Tooltip> 
        : <div className="user__item-name">{name}</div>
      }
      <div className="user__item-body">
        <div className="user__item-position">{position}</div>
        <Tooltip tooltip={email}>
          <div className="user__item-email">{email}</div>
        </Tooltip>
        <div className="user__item-phone">{phone}</div>
      </div>
    </div>
  );
}

export default User;
