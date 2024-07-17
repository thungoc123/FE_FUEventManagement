import React, { useState, FormEvent } from "react";
import {
  Dialog,
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
import { useUpdatePasswordMutation } from "../../../Features/Password/resetPasswordApi";

interface NewPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  email: string;
}

const NewPasswordModal: React.FC<NewPasswordModalProps> = ({ isOpen, onClose, token, email }) => {
  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: "",
  });
  const [updatePassword] = useUpdatePasswordMutation();

  const handleNewPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Setting new password", newPasswordData);

    try {
      const response = await updatePassword({
        token: token,
        newPassword: newPasswordData.newPassword,
      }).unwrap();
      console.log("Password reset successful:", response);
      onClose();
    } catch (error: any) {
      console.error("Error details:", error); // In thêm log chi tiết để debug
      if (error.status === 403) {
        console.error("Failed to set new password: Access Forbidden. Please check if the token is valid and you have the necessary permissions.");
      } else if (error.data) {
        console.error("Failed to set new password:", error.data);
      } else {
        console.error("Failed to set new password:", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/25" />
        <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12">
          <DialogHeader>
            <DialogTitle className="mb-2">New Password</DialogTitle>
            <DialogDescription>Enter your new password</DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleNewPasswordSubmit}>
            <div className="grid items-center gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPasswordData.newPassword}
                required
                onChange={(e) => setNewPasswordData({ ...newPasswordData, newPassword: e.target.value })}
              />
            </div>
            <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
              <Button type="submit">Set New Password</Button>
            </div>
            <DialogFooter className="mt-6">
              <Button asChild variant="link" size="link" onClick={onClose}>
                <a className="underline">Back to Log in</a>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default NewPasswordModal;
