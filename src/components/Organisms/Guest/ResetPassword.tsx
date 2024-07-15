import React, { useState, FormEvent } from "react";
import {
  Button,
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Input
} from "@relume_io/relume-ui";
import { useRequestPasswordResetMutation, useUpdatePasswordMutation } from "../../../Features/Password/resetPasswordApi"; 

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ isOpen, onClose }) => {
  const [resetData, setResetData] = useState({ email: "", token: "" });
  const [newPasswordData, setNewPasswordData] = useState({ newPassword: "", confirmPassword: "" });
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [tokenEntered, setTokenEntered] = useState(false);
  const [requestPasswordReset] = useRequestPasswordResetMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  const handleNewPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPasswordData.newPassword !== newPasswordData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Setting new password", newPasswordData);
    console.log("Token:", resetData.token);

    try {
      const response = await updatePassword({
        token: resetData.token,
        newPassword: newPasswordData.newPassword, // Gửi mật khẩu mới trong request
      }).unwrap();
      console.log("Password reset successful:", response);
      onClose();
    } catch (error: any) {
      console.error("Error object:", error);
      const status = error?.status ?? error?.data?.status;
      if (status === 403) {
        console.error("Failed to set new password: Access Forbidden. Please check if the token is valid and you have the necessary permissions.");
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
      setTokenEntered(true);
    } catch (err) {
      console.error("Failed to reset password:", err);
    }
  };

  const handleTokenSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsNewPassword(true);
  };

  const handleBackToLoginClick = () => {
    setIsNewPassword(false);
    setTokenEntered(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/25" />
        <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12">
          <DialogHeader>
            <DialogTitle className="mb-2">
              {isNewPassword ? "New Password" : tokenEntered ? "Enter Token" : "Reset Password"}
            </DialogTitle>
            <DialogDescription>
              {isNewPassword ? "Enter your new password" : tokenEntered ? "Enter the token sent to your email" : "Enter your email to reset password"}
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            onSubmit={isNewPassword ? handleNewPasswordSubmit : tokenEntered ? handleTokenSubmit : handleResetPasswordSubmit}
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
            ) : tokenEntered ? (
              <div className="grid items-center gap-2">
                <Label htmlFor="token">Token</Label>
                <Input
                  id="token"
                  type="text"
                  value={resetData.token}
                  required
                  onChange={(e) =>
                    setResetData({ ...resetData, token: e.target.value })
                  }
                />
              </div>
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
                {isNewPassword ? "Set New Password" : tokenEntered ? "Submit Token" : "Reset Password"}
              </Button>
            </div>
            <DialogFooter className="mt-6">
              <Button asChild variant="link" size="link" onClick={handleBackToLoginClick}>
                <a className="underline">Back to Log in</a>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ResetPassword;
