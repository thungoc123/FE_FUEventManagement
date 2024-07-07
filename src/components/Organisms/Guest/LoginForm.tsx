// components/LoginForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../Features/Auth/authApi';
import { setToken } from '../../../Features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Input, Label, Button, DialogFooter } from '@relume_io/relume-ui';

interface LoginFormProps {
  onClose: () => void;
  onForgotPasswordClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onForgotPasswordClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setToken(result.data));
      localStorage.setItem("email", email);
      sessionStorage.setItem("token", result.data);
      sessionStorage.setItem("email", email);
      onClose();
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
      <div className="grid items-center gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid items-center gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
        <Button type="submit">{isLoading ? "Logging in..." : "Log in"}</Button>
      </div>
      <DialogFooter className="mt-6">
        <span>Forgot your password?</span>
        <Button asChild variant="link" size="link" onClick={onForgotPasswordClick}>
          <a className="underline">Reset password</a>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default LoginForm;
