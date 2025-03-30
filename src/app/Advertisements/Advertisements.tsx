import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CreateAdvertisement from "@/app/Forms/CreateAdvertisement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteAdvertisement } from "@/store/advertisementSlice";
import { EditIcon, Trash2Icon } from "lucide-react";

const Advertisements = () => {
  const advertisements = useSelector(
    (state: RootState) => state.advertisements.advertisements
  );
  const dispatch = useDispatch();
  const handelDeleteAd = (id: string) => {
    dispatch(deleteAdvertisement(id));
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
                  {advertisement.name}
                  <div className="flex gap-2">
                    <Button onClick={() => handelDeleteAd(advertisement.id)}>
                      <Trash2Icon />
                    </Button>
                    <Button>
                      <EditIcon />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white mb-2">{advertisement.description}</p>
                <p className="text-white font-semibold">
                  Price: {advertisement.price}
                </p>
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
    </div>
  );
};

export default Advertisements;
