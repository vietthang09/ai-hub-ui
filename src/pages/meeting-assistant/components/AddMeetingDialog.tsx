import React from "react";
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
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

// Zod schema
const meetingSchema = z.object({
  link: z.string().url({ message: "Link phải là URL hợp lệ" }),
  datetime: z.string().min(1, "Chọn thời gian"),
  description: z.string().optional(),
});

type MeetingForm = z.infer<typeof meetingSchema>;

export default function AddMeetingDialog() {
  const { modalType, setModalType, setReload } = useMeetingContext();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const form = useForm<MeetingForm>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      link: "",
      datetime: "",
      description: "",
    },
  });

  const onSubmit = async (values: MeetingForm) => {
    try {
      console.log("New meeting:", values);
      toast.success("Meeting added!");
      setReload((prev) => !prev);
      setModalType(null);
    } catch (err) {
      toast.error("Failed to add meeting");
    }
  };

  return (
    <Dialog
      open={modalType === "add"}
      onOpenChange={(open) => !open && setModalType(null)}
    >
      <DialogContent className="sm:max-w-[28rem] bg-primary rounded-lg shadow-lg p-6">
        <DialogTitle className="text-base text-white">
          Add Meeting
          <DialogDescription className="text-gray-400 text-xs">
            Fill in meeting details and click save.
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

            <FormItem className="flex flex-col">
              <FormLabel>Date & Time</FormLabel>
              <div className="flex gap-2">
                {/* Calendar */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      id="date-picker"
                      className="w-32 justify-between bg-gray-400 font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto bg-gray-500 overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>

                {/* Time */}
                <FormControl>
                  <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="00:00:00"
                    className="w-[100] bg-gray-500"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>

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
