import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImageIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState, useEffect } from "react";
import {
  addAdvertisement,
  updateAdvertisement,
} from "@/store/advertisementSlice";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  name: z.string().min(1, "Post name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  images: z.array(z.instanceof(File)),
});

interface FormComponentProps {
  setOpen: (open: boolean) => void;
  advertisement?: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
  isEdit?: boolean;
}

const FormComponent = ({
  setOpen,
  advertisement,
  isEdit = false,
}: FormComponentProps) => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      images: [],
    },
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Set form values when editing an existing advertisement
  useEffect(() => {
    if (advertisement && isEdit) {
      form.reset({
        name: advertisement.name,
        description: advertisement.description,
        price: advertisement.price.toString(),
        images: [],
      });
      setExistingImages(advertisement.images);
    }
  }, [advertisement, form, isEdit]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEdit && advertisement) {
      // Update existing advertisement
      dispatch(
        updateAdvertisement({
          id: advertisement.id,
          name: values.name,
          description: values.description,
          price: parseFloat(values.price),
          images: existingImages,
        })
      );
    } else {
      // Create new advertisement
      dispatch(
        addAdvertisement({
          id: Math.random().toString(),
          name: values.name,
          description: values.description,
          price: parseFloat(values.price),
          images: selectedImages.map((image) => URL.createObjectURL(image)),
        })
      );
    }
    setOpen(false);
    form.reset();
    setSelectedImages([]);
    setExistingImages([]);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prev: File[]) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev: File[]) =>
      prev.filter((_: File, i: number) => i !== index)
    );
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setOpen(false);
    form.reset();
    setSelectedImages([]);
    setExistingImages([]);
  };

  return (
    <div className="w-[460px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 h-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-white">
                  Post Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter post name"
                    className="bg-[#2c2f33] border-none text-gray-300 placeholder:text-gray-400 h-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-white">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description"
                    className="bg-[#2c2f33] border-none text-gray-300 placeholder:text-gray-400 h-10 resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-white">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter price"
                    className="bg-[#2c2f33] border-none text-gray-300 placeholder:text-gray-400 h-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="image-upload"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <label htmlFor="image-upload">
            <Button
              onClick={triggerFileInput}
              type="button"
              className="w-full bg-[#ffd43b] hover:bg-[#ffc107] text-black font-semibold h-10 text-xl"
            >
              <ImageIcon className="mr-2 h-5 w-5" /> Select Images
            </Button>
          </label>

          {/* Display existing images when editing */}
          {isEdit && existingImages.length > 0 && (
            <div className="h-[180px] p-4 w-full overflow-x-auto">
              <div className="flex flex-row gap-2 w-[100%] scrollbar-auto">
                {existingImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg aspect-square w-[150px] h-[150px]"
                  >
                    <img
                      src={image}
                      alt={`Existing image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full p-0"
                      onClick={() => removeExistingImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display newly selected images */}
          {selectedImages.length > 0 && (
            <div className="h-[180px] p-4 w-full overflow-x-auto">
              <div className="flex flex-row gap-2 w-[100%] scrollbar-auto">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg aspect-square w-[150px] h-[150px]"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 justify-end">
            <Button
              type="submit"
              className="w-full bg-[#ffd43b] hover:bg-[#ffc107] text-black font-semibold h-10 text-xl"
            >
              {isEdit ? "Update Advertisement" : "Create Advertisement"}
            </Button>
            <Button
              type="button"
              className="w-full bg-[#ffd43b] hover:bg-[#ffc107] text-black font-semibold h-10 text-xl"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormComponent;
