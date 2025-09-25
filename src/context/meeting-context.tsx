import { createContext, useContext, useState, type ReactNode } from "react";
type MeetingModalType = "add" | "edit";
interface MeetingContextType {
  modalType: MeetingModalType | null;
  setModalType: (modalType: MeetingModalType | null) => void;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
const MeetingContext = createContext<MeetingContextType | undefined>(undefined);
export const MeetingProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<MeetingModalType | null>(null);
  const [reload, setReload] = useState(false);
  return (
    <MeetingContext.Provider
      value={{ modalType, setModalType, reload, setReload }}
    >
      {" "}
      {children}{" "}
    </MeetingContext.Provider>
  );
};
export const useMeetingContext = () => {
  const context = useContext(MeetingContext);
  if (!context)
    throw new Error("useMeetingContext must be used inside MeetingProvider");
  return context;
};
