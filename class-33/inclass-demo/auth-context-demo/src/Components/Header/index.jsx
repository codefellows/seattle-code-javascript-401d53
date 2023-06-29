import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { AuthContext } from '../../Context/Auth';

function Header() {
  const { title, email, staff, setEmail, addStaff } = useContext(SettingsContext);
  const { login, logout, isLoggedIn } = useContext(AuthContext)
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  console.log('isLoggedIn', isLoggedIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    // addStaff({name, position});
    e.target.reset();
  }


  return (
    <>
      <h1>{title}</h1>
      <h4>email us at {email}</h4>
      <form onSubmit={handleSubmit}>
        <label> username:
          <input onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label> password:
          <input onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>

      <button onClick={logout}>Logout</button>
      {/* <label>Change Email
        <input onChange={(e) => setEmail(e.target.value)} />
      </label>

      <form onSubmit={handleSubmit}>
        <label>Name:
          <input onChange={(e) => setName(e.target.value)} />
        </label>
        <label>Position:
          <input onChange={(e) => setPosition(e.target.value)} />
        </label>
        <button type="submit">Add Staff</button>
      </form>

      {
        staff.map((member, idx) => (
          <li key={`header-${idx}`} >{member.name}, {member.position}</li>
        ))
      } */}
    </>
  )
}

export default Header;
