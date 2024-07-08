import React, { useState, FormEvent } from "react";
import { Button, Dialog, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Label, Input } from "@relume_io/relume-ui";
import { useRequestPasswordResetMutation, useUpdatePasswordMutation } from "../../../Features/Password/resetPasswordApi"; // Correctly import both mutations

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ isOpen, onClose }) => {
  const [resetData, setResetData] = useState({ email: "", token: "" });
  const [newPasswordData, setNewPasswordData] = useState({ newPassword: "", confirmPassword: "" });
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [requestPasswordReset] = useRequestPasswordResetMutation(); // Use the correct mutation hook
  const [updatePassword] = useUpdatePasswordMutation(); // Use the correct mutation hook

  const handleNewPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPasswordData.newPassword !== newPasswordData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Setting new password", newPasswordData);

    try {
      const response = await updatePassword({
        token: resetData.token,
        newPassword: newPasswordData.newPassword,
      }).unwrap();
      console.log("Password reset successful:", response);
      onClose();
    } catch (error: any) {
      if (error.status === 403) {
        console.error("Failed to set new password: Access Forbidden. Please check if the token is valid and you have the necessary permissions.");
      } else if (error.data) {
        console.error("Failed to set new password:", error.data);
      } else {
        console.error("Failed to set new password:", error);
      }
    }
  };

  const handleResetPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Resetting password for", resetData.email);
    try {
      const result = await requestPasswordReset({ email: resetData.email }).unwrap();
      console.log(result);
      setResetData((prevData) => ({ ...prevData, token: result.token }));
      setIsNewPassword(true);
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
