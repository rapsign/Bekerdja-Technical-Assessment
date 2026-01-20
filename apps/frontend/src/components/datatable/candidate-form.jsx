import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const baseSchema = {
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(8, "Phone too short"),
  position: z.string().min(1, "Position is required"),
};

const createSchema = z.object({
  ...baseSchema,
  status: z.literal("New"),
  created_at: z.string().nullable(),
});

const editSchema = z.object({
  ...baseSchema,
  status: z.enum(["New", "Contacted", "Interested", "Rejected"]),
  created_at: z.string().nullable(),
});

export function CandidateForm({ candidate, onCancel, onSubmit }) {
  const isEdit = Boolean(candidate?.id);

  const form = useForm({
    resolver: zodResolver(isEdit ? editSchema : createSchema),
    defaultValues: {
      name: candidate?.name || "",
      phone: candidate?.phone || "",
      position: candidate?.position || "",
      status: candidate?.status || "New",
      created_at: candidate?.created_at || null,
    },
  });

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    form.reset({
      name: candidate?.name || "",
      phone: candidate?.phone || "",
      position: candidate?.position || "",
      status: candidate?.status || "New",
      created_at: candidate?.created_at || null,
    });
  }, [candidate, form]);

  const handleFormSubmit = async (values) => {
    if (loading) return;
    setLoading(true);

    try {
      let payload;

      if (isEdit) {
        payload = {
          ...candidate,
          status: values.status,
        };
      } else {
        payload = {
          ...values,
          status: "New",
          created_at: new Date().toISOString(),
        };
      }

      await onSubmit(payload);
      toast.success(isEdit ? "Status updated" : "Candidate added");

      if (!isEdit) {
        form.reset({
          name: "",
          phone: "",
          position: "",
          status: "New",
          created_at: null,
        });
      }
    } catch {
      toast.error("Failed to save candidate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          isEdit ? "lg:grid-cols-5" : "lg:grid-cols-4"
        } gap-4 p-4 border rounded-lg `}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col lg:min-h-22">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isEdit} />
              </FormControl>
              <FormMessage className="lg:min-h-5 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col lg:min-h-22">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} disabled={isEdit} />
              </FormControl>
              <FormMessage className="lg:min-h-5 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col lg:min-h-22">
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input {...field} disabled={isEdit} />
              </FormControl>
              <FormMessage className="lg:min-h-5 text-xs" />
            </FormItem>
          )}
        />

        {isEdit && (
          <FormField
            name="status"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col lg:min-h-22">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Interested">Interested</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="lg:min-h-5 text-xs" />
              </FormItem>
            )}
          />
        )}
        <div className="flex flex-col lg:justify-between lg:min-h-22 w-full">
          <div className="flex gap-2 mt-5.5">
            <Button className="flex-1" type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Status" : "Add"}
            </Button>
            <Button
              className="flex-1"
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
          <div className="lg:min-h-5" />
        </div>
      </form>
    </Form>
  );
}
