// components/LoginDialog.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Input,
  Button
} from "@relume_io/relume-ui";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../Store/Store";
import { useLoginMutation } from "../../Features/Auth/authApi";
import { setToken } from "../../Features/Auth/authSlice";
import ResetPassword from "../Organisms/Guest/ResetPassword";

interface LoginDialogProps {
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ authModalOpen, setAuthModalOpen }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isNewPasswordOpen, setIsNewPasswordOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    setIsResetPassword(true);
  };

  const handleBackToLoginClick = () => {
    setIsResetPassword(false);
    setIsNewPasswordOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setToken(result.data));
      localStorage.setItem("email", email);
      sessionStorage.setItem("token", result.data);
      sessionStorage.setItem("email", email);
      setAuthModalOpen(false);
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
      <DialogTrigger asChild>
        <div></div>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/25" />
        <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12">
          <DialogHeader>
            <DialogTitle className="mb-2">
              {isResetPassword
                ? "Reset Password"
                : isLoginForm
                ? "Log In"
                : "Sign Up"}
            </DialogTitle>
            <DialogDescription>
              {isResetPassword
                ? "Enter your email to reset password"
                : isLoginForm
                ? "Log in to your account"
                : "Create an account to get started"}
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (isResetPassword) {
                // No need to handle it here, ResetPassword component handles it
              } else {
                setAuthModalOpen(false);
                handleSubmit(e);
              }
            }}
          >
            {isResetPassword ? (
              <ResetPassword
                isOpen={isResetPassword}
                onClose={() => {
                  setIsResetPassword(false);
                  setIsNewPasswordOpen(true);
                }}
              />
            ) : (
              <>
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
              </>
            )}
            <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
              <Button type="submit">
                {isLoginForm ? "Log in" : "Sign up"}
              </Button>
            </div>
            <DialogFooter className="mt-6">
              {isResetPassword ? (
                <Button
                  asChild
                  variant="link"
                  size="link"
                  onClick={handleForgotPasswordClick}
                >
                  <a className="underline">Reset password</a>
                </Button>
              ) : (
                <>
                  <span>Forgot your password?</span>
                  <Button
                    asChild
                    variant="link"
                    size="link"
                    onClick={handleForgotPasswordClick}
                  >
                    <a className="underline">Reset password</a>
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default LoginDialog;
