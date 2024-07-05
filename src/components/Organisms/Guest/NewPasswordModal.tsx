// components/NewPasswordModal.tsx
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
  Button,
} from "@relume_io/relume-ui";

interface NewPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewPasswordModal: React.FC<NewPasswordModalProps> = ({ isOpen, onClose }) => {
  const [newPasswordData, setNewPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleNewPasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newPasswordData.newPassword !== newPasswordData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Setting new password", newPasswordData);
    // Implement your set new password logic here
    onClose();
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
