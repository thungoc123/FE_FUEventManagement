// components/ResetPassword.tsx
import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Label, Input } from "@relume_io/relume-ui";
import { setToken } from "../Features/Auth/authSlice"; // Adjust the import path as needed
import { useResetPasswordMutation } from "../../../Features/Password/passwordApi";

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ isOpen, onClose }) => {
  const [resetData, setResetData] = useState({ email: "", newPassword: "" });
  const [newPasswordData, setNewPasswordData] = useState({ newPassword: "", confirmPassword: "" });
  const [isNewPassword, setIsNewPassword] = useState(false);
  const dispatch = useDispatch();
  const [resetPassword] = useResetPasswordMutation();

  const handleNewPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPasswordData.newPassword !== newPasswordData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Setting new password", newPasswordData);
    // Implement your set new password logic here
    onClose();
  };

  const handleResetPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Resetting password for", resetData.email);
    try {
      const result = await resetPassword(resetData.email).unwrap();
      console.log(result);
      setIsNewPassword(true);
      // Store the token in state or dispatch to Redux if needed
    } catch (err) {
      console.error("Failed to reset password:", err);
    }
  };

  const handleBackToLoginClick = () => {
    setIsNewPassword(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/25" />
        <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12">
          <DialogHeader>
            <DialogTitle className="mb-2">
              {isNewPassword ? "New Password" : "Reset Password"}
            </DialogTitle>
            <DialogDescription>
              {isNewPassword ? "Enter your new password" : "Enter your email to reset password"}
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            onSubmit={isNewPassword ? handleNewPasswordSubmit : handleResetPasswordSubmit}
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
                      setNewPasswordData({ ...newPasswordData, newPassword: e.target.value })
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
                      setNewPasswordData({ ...newPasswordData, confirmPassword: e.target.value })
                    }
                  />
                </div>
              </>
            ) : (
              <div className="grid items-center gap-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={resetData.email}
                  required
                  onChange={(e) =>
                    setResetData({ ...resetData, email: e.target.value })
                  }
                />
              </div>
            )}
            <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
              <Button type="submit">
                {isNewPassword ? "Set New Password" : "Reset Password"}
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
              ) : (
                <>
                  <span>Forgot your password?</span>
                  <Button
                    asChild
                    variant="link"
                    size="link"
                    onClick={() => setIsNewPassword(true)}
                  >
                    <a className="underline">New Password</a>
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

export default ResetPassword;
