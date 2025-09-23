import { createContext, useContext, useState, type ReactNode } from "react";

type ReviewModalType = "detail" | "reply";

interface ReviewContextType {
  modalType: ReviewModalType | null;
  setModalType: (modalType: ReviewModalType | null) => void;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ReviewModalType | null>(null);
  const [reload, setReload] = useState(false);


  return (
    <ReviewContext.Provider
      value={{
        modalType,
        setModalType,
        reload,
        setReload,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context)
    throw new Error("useReviewContext must be used inside ReviewProvider");
  return context;
};
