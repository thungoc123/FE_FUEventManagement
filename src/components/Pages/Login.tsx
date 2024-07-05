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
  Button,
} from "@relume_io/relume-ui";

type AuthModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const Login1 = ({ isOpen, onOpenChange, handleSubmit }: AuthModalProps) => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetData, setResetData] = useState({ email: "", newPassword: "" });
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleForgotPasswordClick = () => {
    setIsResetPassword(true);
  };

  const handleNewPasswordClick = () => {
    setIsNewPassword(true);
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    if (newPasswordData.newPassword !== newPasswordData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Setting new password", newPasswordData);
    setIsResetPassword(false);
    setIsNewPassword(false);
    onOpenChange(false);
  };

  const handleBackToLoginClick = () => {
    setIsResetPassword(false);
    setIsNewPassword(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div></div>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/25" />
        <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12 md.data-[state=open]:duration-300 md.data-[state=open]:animate-in md.data-[state=closed]:animate-out md.data-[state=closed]:fade-out-0 md.data-[state=open]:fade-in-0 md.data-[state=closed]:slide-out-to-left-1/2 md.data-[state=open]:slide-in-from-left-1/2">
          <DialogHeader>
            <DialogTitle className="mb-2">
              {isNewPassword
                ? "New Password"
                : isResetPassword
                ? "Reset Password"
                : isLoginForm
                ? "Log In"
                : "Sign Up"}
            </DialogTitle>
            <DialogDescription>
              {isNewPassword
                ? "Enter your new password"
                : isResetPassword
                ? "Enter your email to reset password"
                : isLoginForm
                ? "Log in to your account"
                : "Create an account to get started"}
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            onSubmit={(e) => {
              if (isNewPassword) {
                handleNewPasswordSubmit(e);
              } else if (isResetPassword) {
                e.preventDefault();
                console.log("Resetting password for", resetData.email);
                handleNewPasswordClick();
              } else {
                e.preventDefault();
                console.log(isLoginForm ? "Logging in" : "Signing up");
                onOpenChange(false);
                handleSubmit(e);
              }
            }}
          >
            {isNewPassword ? (
              <>
                <div className="grid items-center gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPasswordData.newPassword}
                    required
                    onChange={(e) =>
                      setNewPasswordData({
                        ...newPasswordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid items-center gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={newPasswordData.confirmPassword}
                    required
                    onChange={(e) =>
                      setNewPasswordData({
                        ...newPasswordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </>
            ) : isResetPassword ? (
              <div className="grid items-center gap-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={resetData.email}
                  required
                  onChange={(e) =>
                    setResetData({
                      ...resetData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
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
                {isNewPassword
                  ? "Set New Password"
                  : isResetPassword
                  ? "Reset Password"
                  : isLoginForm
                  ? "Log in"
                  : "Sign up"}
              </Button>
            </div>
            <DialogFooter className="mt-6">
              {isNewPassword ? (
                <Button
                  asChild
                  variant="link"
                  size="link"
                  onClick={handleBackToLoginClick}
                >
                  <a className="underline">Back to Log in</a>
                </Button>
              ) : isResetPassword ? (
                <Button
                  asChild
                  variant="link"
                  size="link"
                  onClick={handleNewPasswordClick}
                >
                  <a className="underline">New Password</a>
                </Button>
              ) : isLoginForm ? (
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
              ) : (
                <>
                  <span>Already have an account?</span>
                  <Button
                    asChild
                    variant="link"
                    size="link"
                    onClick={() => setIsLoginForm(true)}
                  >
                    <a className="underline">Log in</a>
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

export default Login1;
