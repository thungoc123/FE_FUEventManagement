// components/ResetPassword.tsx
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
import { useRequestPasswordResetMutation } from "../../../Features/Password/resetPasswordApi"; 

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onSetNewPasswordOpen: (email: string, token: string) => void; // Add new prop
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ isOpen, onClose, onSetNewPasswordOpen }) => {
  const [resetData, setResetData] = useState({ email: "" });
  const [requestPasswordReset] = useRequestPasswordResetMutation();

  const handleResetPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Resetting password for", resetData.email);
    try {
      const result = await requestPasswordReset({ email: resetData.email }).unwrap();
      console.log(result);
      onSetNewPasswordOpen(resetData.email, result.token); // Pass email and token to onSetNewPasswordOpen
    } catch (err) {
      console.error("Failed to reset password:", err);
    }
  };

  const handleBackToLoginClick = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/25" />
        <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12">
          <DialogHeader>
            <DialogTitle className="mb-2">Reset Password</DialogTitle>
            <DialogDescription>Enter your email to reset password</DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleResetPasswordSubmit}>
            <div className="grid items-center gap-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                value={resetData.email}
                required
                onChange={(e) => setResetData({ ...resetData, email: e.target.value })}
              />
            </div>
            <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
              <Button type="submit">Reset Password</Button>
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
