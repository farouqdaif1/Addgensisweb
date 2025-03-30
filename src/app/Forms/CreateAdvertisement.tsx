import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import FormComponent from "./form";
import { useState } from "react";
const CreateAdvertisement = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger className="bg-primary w-full text-left justify-start flex items-center gap-2 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground duration-200 ease-linear">
        <IconCirclePlusFilled />
        <span>Create Advertisement</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Create Advertisement
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            Create a new advertisement to promote your business or product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormComponent setOpen={setOpen} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateAdvertisement;
