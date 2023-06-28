import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';

function Header() {
  const { title, email, staff, setEmail, addStaff } = useContext(SettingsContext);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addStaff({name, position});
    e.target.reset();
  }


  return (
    <>
      <h1>{title}</h1>
      <h4>email us at {email}</h4>
      <label>Change Email
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
      }
    </>
  )
}

export default Header;
