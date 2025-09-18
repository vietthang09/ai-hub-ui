import { useUserContext } from "../../../context/user-context";
import AddUserDialog from "./AddUserDialog";
import EditUserDialog from "./EditUserDialog";

export default function UserDialogs() {
    const { modalType, user } = useUserContext()

    if (modalType === "add") {
        return <AddUserDialog />
    }

    if (modalType === 'edit' && user) {
        return <EditUserDialog />
    }

}