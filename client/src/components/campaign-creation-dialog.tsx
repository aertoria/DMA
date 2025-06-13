import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCampaignSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import type { InsertCampaign } from "@shared/schema";

interface CampaignCreationDialogProps {
  onCampaignCreated?: (campaignId: number) => void;
}

export default function CampaignCreationDialog({ onCampaignCreated }: CampaignCreationDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<InsertCampaign>({
    resolver: zodResolver(insertCampaignSchema.extend({
      name: insertCampaignSchema.shape.name.min(1, "Campaign name is required"),
    })),
    defaultValues: {
      name: "",
      description: "",
      status: "draft",
      flowData: {
        nodes: [
          {
            id: "start-1",
            type: "start", 
            position: { x: 100, y: 100 },
            data: { label: "Campaign Start", trigger: "New subscriber" }
          }
        ],
        edges: []
      },
      settings: {}
    },
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (data: InsertCampaign) => {
      return apiRequest("POST", "/api/campaigns", data);
    },
    onSuccess: (newCampaign: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      toast({ title: "Campaign created successfully!" });
      setOpen(false);
      form.reset();
      onCampaignCreated?.(newCampaign.id);
    },
    onError: () => {
      toast({ title: "Failed to create campaign", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertCampaign) => {
    createCampaignMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-vscode-accent hover:bg-blue-600 text-white text-sm font-medium">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-vscode-panel border-vscode-border text-vscode-text">
        <DialogHeader>
          <DialogTitle className="text-vscode-text-bright">Create New Campaign</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-vscode-text">Campaign Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter campaign name..."
                      {...field}
                      className="bg-vscode-bg border-vscode-border focus:border-vscode-accent text-vscode-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-vscode-text">Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your campaign..."
                      {...field}
                      value={field.value || ""}
                      className="bg-vscode-bg border-vscode-border focus:border-vscode-accent text-vscode-text resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-vscode-text">Initial Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-vscode-bg border-vscode-border focus:border-vscode-accent text-vscode-text">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-vscode-panel border-vscode-border text-vscode-text">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-vscode-border hover:border-vscode-accent text-vscode-text"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createCampaignMutation.isPending}
                className="bg-vscode-accent hover:bg-blue-600 text-white"
              >
                {createCampaignMutation.isPending ? "Creating..." : "Create Campaign"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}