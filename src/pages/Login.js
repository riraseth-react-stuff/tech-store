import React, { useState, useContext } from 'react';

//strapi function
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';
//handle user
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';
export default function Login() {
  const history = useHistory();
  // setup user context
  const { userLogin, alert, showAlert } = useContext(UserContext);
  //state values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // default so isEmpty works properly while signing in, with '' it'd always be false
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember(prevMember => {
      //function gets old value as a parameter
      let isMember = !prevMember;
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    });
  };

  const handleSubmit = async e => {
    showAlert({
      msg: 'accessing user data. please wait...'
    });
    // alert
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }
    if (response) {
      const {
        jwt: token,
        user: { username }
      } = response.data;
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({
        msg: `${username} logged in successfully. Shop away`
      });
      history.push('/products');
    } else {
      showAlert({
        msg: 'there was an error. please try again..',
        type: 'danger'
      });
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? 'sign in' : 'register'}</h2>
      <form className="login-form">
        {/* single input */}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            name="setEmail"
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        {/* end of single input */}
        {/* single input */}
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            name="setEmail"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {/* end of single input */}
        {/* single input */}
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input
              name="setUsername"
              type="username"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        )}
        {/* end of single input */}
        {/* empty form text */}
        {isEmpty && (
          <p className="form-empty">please fill out all form fields</p>
        )}
        {/* submit button */}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}
        {/* register link */}
        <p className="register-link">
          {isMember ? 'need to register' : 'already a member'}
          <button type="button" onClick={toggleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
}
