import { useNavigate } from "react-router-dom";
import { createProperty } from "../services/propertyService";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

export const useAddProperty = () => {

    const navigate = useNavigate();

    const handleSubmit = async ({e, form, images, setLoading}) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await createProperty(form);
      const propertyId = data.id;

      if (images.length > 0) {
        const formData = new FormData();

        images.forEach((img) => {
          formData.append("images", img);
        });

        await axiosInstance.post(
          `/upload/property/${propertyId}`,
          formData
        );
      }

      toast.success("Property created successfully!");
      navigate("/owner/properties");

    } catch (err) {
      console.error(err);
      toast.error("Failed to create property. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return { handleSubmit, }
}