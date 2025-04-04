import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CreateAdvertisement from "@/app/Forms/CreateAdvertisement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteAdvertisement, enhanceWithAI } from "@/store/advertisementSlice";
import {
  EditIcon,
  Trash2Icon,
  CopyIcon,
  CheckIcon,
  Wand2Icon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import FormComponent from "@/app/Forms/form";

// Define the Advertisement interface
interface Advertisement {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

const Advertisements = () => {
  const advertisements = useSelector(
    (state: RootState) => state.advertisements.advertisements
  );
  const dispatch = useDispatch();
  const [copiedFields, setCopiedFields] = useState<Record<string, boolean>>({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAdvertisement, setSelectedAdvertisement] =
    useState<Advertisement | null>(null);
  const [enhancingField, setEnhancingField] = useState<string | null>(null);

  const handelDeleteAd = (id: string) => {
    dispatch(deleteAdvertisement(id));
  };

  const handleEditAd = (advertisement: Advertisement) => {
    setSelectedAdvertisement(advertisement);
    setEditDialogOpen(true);
  };

  const handleEnhanceWithAI = (id: string, field: string) => {
    setEnhancingField(`${id}-${field}`);

    // Simulate AI enhancement with a timeout
    setTimeout(() => {
      // In a real application, this would call an AI API
      // For now, we'll just show a success message
      toast.success(`Enhanced ${field} with AI!`);
      setEnhancingField(null);

      // Dispatch the enhanceWithAI action
      dispatch(enhanceWithAI(id));
    }, 1500);
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Show success toast
        toast.success("Copied to clipboard!");

        // Set the copied state for this field
        setCopiedFields((prev) => ({ ...prev, [fieldId]: true }));

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopiedFields((prev) => ({ ...prev, [fieldId]: false }));
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast.error("Failed to copy to clipboard");
      });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {advertisements.length === 0 ? (
        <div className="flex justify-center items-center w-full bg-amber-500 p-6 rounded-lg">
          <CreateAdvertisement />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements.map((advertisement) => (
            <Card
              key={advertisement.id}
              className="shadow-md rounded-lg overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{advertisement.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white hover:text-green-400"
                      onClick={() =>
                        copyToClipboard(
                          advertisement.name,
                          `name-${advertisement.id}`
                        )
                      }
                    >
                      {copiedFields[`name-${advertisement.id}`] ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white hover:text-blue-400"
                      onClick={() =>
                        handleEnhanceWithAI(advertisement.id, "name")
                      }
                      disabled={enhancingField === `${advertisement.id}-name`}
                    >
                      {enhancingField === `${advertisement.id}-name` ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Wand2Icon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handelDeleteAd(advertisement.id)}>
                      <Trash2Icon />
                    </Button>
                    <Button onClick={() => handleEditAd(advertisement)}>
                      <EditIcon />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-white">{advertisement.description}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:text-green-400"
                    onClick={() =>
                      copyToClipboard(
                        advertisement.description,
                        `desc-${advertisement.id}`
                      )
                    }
                  >
                    {copiedFields[`desc-${advertisement.id}`] ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:text-blue-400"
                    onClick={() =>
                      handleEnhanceWithAI(advertisement.id, "description")
                    }
                    disabled={
                      enhancingField === `${advertisement.id}-description`
                    }
                  >
                    {enhancingField === `${advertisement.id}-description` ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Wand2Icon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold">
                    Price: {advertisement.price}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:text-green-400"
                    onClick={() =>
                      copyToClipboard(
                        advertisement.price.toString(),
                        `price-${advertisement.id}`
                      )
                    }
                  >
                    {copiedFields[`price-${advertisement.id}`] ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:text-blue-400"
                    onClick={() =>
                      handleEnhanceWithAI(advertisement.id, "price")
                    }
                    disabled={enhancingField === `${advertisement.id}-price`}
                  >
                    {enhancingField === `${advertisement.id}-price` ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Wand2Icon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex gap-2 mt-4">
                  {advertisement.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={advertisement.name}
                      className="w-16 h-16 object-cover rounded-md shadow"
                    />
                  ))}
                </div>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Enhance with AI
                </Button>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Create Faecbook Ad
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <AlertDialogContent className="dark">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Edit Advertisement
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              Update the details of your advertisement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedAdvertisement && (
            <FormComponent
              setOpen={setEditDialogOpen}
              advertisement={selectedAdvertisement}
              isEdit={true}
            />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Advertisements;
