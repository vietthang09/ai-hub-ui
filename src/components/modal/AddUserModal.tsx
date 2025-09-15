import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import toast from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { userSchema } from "../../utils/validation";
import type { User } from "../../services/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type AddUserForm = z.infer<typeof userSchema>;

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  addUser: (
    email: string,
    password: string,
    role?: string
  ) => Promise<User | undefined>;
}

export default function AddUserModal({
  open,
  onOpenChange,
  addUser,
}: AddUserModalProps) {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AddUserForm>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: AddUserForm) => {
    try {
      await addUser(data.email, data.password || "");
      toast.success("User created!");
      reset();
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.message || "Failed to add user");
    }
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-black/30 backdrop-blur-sm",
      }}
      placement="center"
    >
      <ModalContent className="w-[33rem] bg-white rounded-lg shadow-lg flex flex-col p-6">
        {(onClose) => (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <ModalHeader className="flex justify-center">
              <h2 className="text-lg font-semibold">Add User</h2>
            </ModalHeader>

            <ModalBody className="flex flex-col gap-4">
              <Input
                {...register("email")}
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <Input
                {...register("password")}
                placeholder="Password"
                type="password"
                className="w-full border rounded px-3 py-2"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </ModalBody>
            <ModalFooter className="flex justify-end gap-2 mt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Add"}
              </Button>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
