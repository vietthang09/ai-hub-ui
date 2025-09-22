import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import toast from "react-hot-toast";
import { useUserContext } from "../../../context/user-context";
import { createUser } from "../../../services/userService";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { registerSchema } from "../../auth/register/schemas/register.schema";
import { DialogDescription } from "@radix-ui/react-dialog";

type RegisterForm = z.infer<typeof registerSchema>;

export default function AddUserDialog() {
  const { modalType, setModalType, setReload } = useUserContext();

  const handleSuccess = () => {
    setReload((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: RegisterForm) => {
    try {
      await createUser({ ...values, role: "user" });
      toast.success("User created!");
      reset();
      handleSuccess();
      setModalType(null);
    } catch (err: any) {
      if (err.message === "Email already exists") {
        toast.error("Email already exists. Please use another one.");
      } else {
        toast.error("Failed to create user");
      }
    }
  };

  return (
    <Dialog

      open={modalType === "add"}
      onOpenChange={(open) => setModalType(open ? "add" : null)}
    >
      <DialogContent className="sm:max-w-[28rem] bg-primary rounded-lg shadow-lg p-6">
        <DialogTitle className="text-base text-white">
          Add New User
          <DialogDescription className="text-gray-400 text-xs">
            Create new user here. Click save when you're done.
          </DialogDescription>
        </DialogTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-2"
          autoComplete="off"
        >
          <div>
            <label className="block text-sm text-white font-medium mb-1">
              Email
            </label>
            <Input
              {...register("email")}
              placeholder="Email"
              autoComplete="off"
              className={`
              w-full px-3 py-2 
              text-gray-400 placeholder:text-gray-400
              border border-gray-500 rounded
              focus:text-white focus:placeholder:text-white
              focus:bg-gray-700 hover:text-white hover:placeholder:text-white
              bg-gray-600 outline-none
              `}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-white font-medium mb-1">
              Password
            </label>
            <Input
              {...register("password")}
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              className={`
                w-full px-3 py-2
                text-gray-400 placeholder:text-gray-400
                border border-gray-500 rounded
                focus:text-white focus:placeholder:text-white
                focus:bg-gray-700 hover:text-white hover:placeholder:text-white
                bg-gray-600 outline-none
              `}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button type="submit" className="bg-gray-400 text-primary" variant="ghost" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Save changes"}
            </Button>
            {/* <Button
              type="button"
              variant="outline"
              onClick={() => setModalType(null)}
            >
              Cancel
            </Button> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
