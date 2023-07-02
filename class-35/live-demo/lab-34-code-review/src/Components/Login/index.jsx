import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/Auth';
import { If, Else, Then } from 'react-if';
import { Button, Group, TextInput } from '@mantine/core';

function Login() {
  const { logout, login, isLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogout = () => {
    logout();
    setUsername('');
    setPassword('');
  }

  return (
    <>
      <If condition={isLoggedIn}>
        <Then>
          <Button color="red" onClick={handleLogout}>Log Out</Button>
        </Then>
        <Else>
          <Group>
            <TextInput
              data-testid="login-username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
              data-testid="login-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button color="gray.8" onClick={() => login(username, password)}>Log In</Button>
          </Group>
        </Else>
      </If>
    </>
  )
}

export default Login;
