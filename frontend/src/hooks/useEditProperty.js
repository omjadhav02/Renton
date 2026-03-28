import { useEffect, useRef, useState } from "react"
import { deleteProperty, getPropertyById, updateProperty } from "../services/propertyService"
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast"
import { deletePropertyImage, uploadPropertyImages } from "../services/imageService";


export const useEditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        deposit: "",
        city: "",
        address: "",
        propertyType: "",
        bedrooms: "",
        bathrooms: "",
        state:"",
        country: "",
        postCode: "",
    });

    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch property
    useEffect(() => {
        const fetchProperty = async () => {
        try {
            const data = await getPropertyById(id);

            setForm({
                title: data.title,
                description: data.description,
                price: Number(data.price),
                deposit: Number(data.deposit),
                postCode: data.postCode,
                city: data.city,
                address: data.address,
                state: data.state,
                country: data.country,
                propertyType: data.propertyType,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,

            });

            setExistingImages(data.images || []);
            setLoading(false);

        } catch (error) {
            toast.error("Failed to load property");
      }
    };

    fetchProperty();
    }, [id]);

    // handle inputs
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }))
    }

    // new image select
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);

        setNewImages(files);

        const previewUrls = files.map((file) =>
            URL.createObjectURL(file)
        );

        setPreview(previewUrls);
    };

  // remove new image
    const removeNewImage = (index) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
        setPreview((prev) => prev.filter((_, i) => i !== index));
    };

    // delete existing image
    const handleRemoveExisting = async (imageId) => {
        try {
            await deletePropertyImage(imageId);

            setExistingImages((prev) =>
                prev.filter((img) => img.id !== imageId)
            );

            toast.success("Image removed");
        } catch (error) {
            toast.error("Failed to delete image");
        }
  };

    // update property
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // update property
            await updateProperty(id, form);

            // upload new images
            if (newImages.length > 0) {
                const formData = new FormData();

                newImages.forEach((img) => {
                    formData.append("images", img);
                });

                await uploadPropertyImages(id, formData);
            }

            toast.success("Property updated!");
            navigate("/owner/properties");

        } catch (error) {
            toast.error("Update failed");
        } finally {
            setLoading(false);
        }
    };

    // delete property
    const handleDelete = async () => {
        if (!window.confirm("Delete this property?")) return;

        try {
            await deleteProperty(id);
            toast.success("Property deleted");
            navigate("/owner/properties");
        } catch (error) {
            toast.error("Delete failed");
        }
  };

    return {
        form,
        setForm,
        existingImages,
        newImages,
        preview,
        loading,
        handleChange,
        handleImageChange,
        removeNewImage,
        handleRemoveExisting,
        handleSubmit,
        handleDelete,
    };
}