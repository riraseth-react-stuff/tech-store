import React, { useState } from 'react';

//strapi function

//handle user
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  // setup user context

  //state values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  let isEmpty = false;

  const toggleMember = () => {};

  const handleSubmit = async e => {
    e.preventDefault();
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
