import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Form } from '../atoms/Form';
import { FormGroup } from '../atoms/FormGroup';
import { Input } from '../atoms/Input';

export interface LoginFormProps {
  isLoading?: boolean;
  onLogin: (username: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        props.onLogin(username, password);
      }}
    >
      <FormGroup>
        <label className="flex-1" htmlFor="username">
          아이디
        </label>
        <Input
          className="flex-2"
          type="text"
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <label className="flex-1" htmlFor="password">
          비밀번호
        </label>
        <Input
          className="flex-2"
          type="password"
          id="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </FormGroup>
      <Button className="w-full" title="로그인" isLoading={props.isLoading} />
    </Form>
  );
};
