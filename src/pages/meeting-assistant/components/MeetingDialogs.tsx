import { useMeetingContext } from "../../../context/meeting-context";
import AddMeetingDialog from "./AddMeetingDialog";
import EditMeetingDialog from "./EditMeetingDialog";
   
  
export default function MeetingDialogs({ selectedMeeting }: { selectedMeeting: any | null }) {
    const { modalType } = useMeetingContext();

    if (modalType === "add") {
        return <AddMeetingDialog />
    }

    if (modalType === "edit") {
        return <EditMeetingDialog selectedMeeting={selectedMeeting} />
    }

    return null;
}
