import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { useMeetingContext } from "../../../context/meeting-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Calendar } from "../../../components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";

// Zod schema
const meetingSchema = z.object({
  link: z.string().url({ message: "Link phải là URL hợp lệ" }),
  datetime: z.string().min(1, "Chọn thời gian"),
  description: z.string().optional(),
});

type MeetingForm = z.infer<typeof meetingSchema>;

interface EditMeetingDialogProps {
  selectedMeeting: any | null;
}
 

export default function EditMeetingDialog({
  selectedMeeting,
}: EditMeetingDialogProps) {
  const { modalType, setModalType, setReload } = useMeetingContext();
  const [open, setOpen] = React.useState(false);
 
  const form = useForm<MeetingForm>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      link: selectedMeeting?.link || "",
      datetime: selectedMeeting?.datetime || "",
      description: selectedMeeting?.description || "",
    },
  });

  useEffect(() => {
    form.reset({
      link: selectedMeeting?.link || "",
      datetime: selectedMeeting?.datetime || "",
      description: selectedMeeting?.description || "",
    });
  }, [selectedMeeting]);

  const onSubmit = async (values: MeetingForm) => {
    try {
      console.log("Updated meeting:", values);
      toast.success("Meeting updated!");
      setReload((prev) => !prev);
      setModalType(null);
    } catch (err) {
      toast.error("Failed to update meeting");
    }
  };

  const handleDateSelect = (date: Date | undefined, field: any) => {
    if (!date) return;
    const current = field.value ? new Date(field.value) : new Date();
    const newDate = new Date(date);
    newDate.setHours(
      current.getHours(),
      current.getMinutes(),
      current.getSeconds()
    );
    field.onChange(newDate.toISOString());
    setOpen(false);
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const [hours, minutes, seconds] = e.target.value.split(":").map(Number);
    const newDate = field.value ? new Date(field.value) : new Date();
    newDate.setHours(hours, minutes, seconds);
    field.onChange(newDate.toISOString());
  };

  return (
    <Dialog
      open={modalType === "edit"}
      onOpenChange={(open) => !open && setModalType(null)}
    >
      <DialogContent className="sm:max-w-[28rem] bg-primary rounded-lg shadow-lg p-6">
        <DialogTitle className="text-base text-white">
          Edit Meeting
          <DialogDescription className="text-gray-400 text-xs">
            Update meeting details and click save.
          </DialogDescription>
        </DialogTitle>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-2"
            autoComplete="off"
          >
            {/* Meeting Link */}
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Meeting Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://meet.google.com/xxx"
                      className="bg-gray-600 text-gray-400 border border-gray-500 rounded px-3 py-2 focus:text-white focus:bg-gray-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date & Time */}

            <FormField
              control={form.control}
              name="datetime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Date & Time</FormLabel>
                  <div className="flex gap-2">
                     <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          id="date-picker"
                          className="w-32 justify-between bg-gray-400 font-normal"
                        >
                          {field.value
                            ? new Date(field.value).toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto bg-gray-500 overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          captionLayout="dropdown"
                          onSelect={(date) => handleDateSelect(date, field)}
                        />
                      </PopoverContent>
                    </Popover>
                     <FormControl>
                      <Input
                        type="time"
                        step="1"
                        value={
                          field.value
                            ? new Date(field.value).toTimeString().slice(0, 8)
                            : "00:00:00"
                        }
                        onChange={(e) => handleTimeChange(e, field)}
                        className="w-[120px] bg-gray-500"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Agenda, attendee notes, objectives…"
                      className="bg-gray-600 text-gray-400 border border-gray-500 rounded px-3 py-2 focus:text-white focus:bg-gray-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button
                type="submit"
                className="bg-gray-400 text-primary"
                variant="ghost"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Processing..." : "Save changes"}
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setModalType(null)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
