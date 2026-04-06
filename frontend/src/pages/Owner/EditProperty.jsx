import { IoImagesOutline } from "react-icons/io5"
import { useEditProperty } from "../../hooks/useEditProperty";
import { useRef } from "react";

function EditProperty() {
  const fileInputRef = useRef();
  const {
    form,
    existingImages,
    preview,
    loading,
    handleChange,
    handleImageChange,
    removeNewImage,
    handleRemoveExisting,
    handleSubmit,
    handleDelete,
  } = useEditProperty();
  

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="w-full mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-2 text-gray-800">
        Edit Property
      </h1>
      <p className="text-gray-500 mb-8">
        Update your property details
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow space-y-8"
      >

        {/* BASIC */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Info</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Title"
              required
            />

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Price" 
              required
            />

            <input
              type="number"
              name="deposit"
              value={form.deposit}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Deposit" 
              required
            />
            

          </div>
        </div>

        {/* LOCATION */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Location</h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Address"
              required
            />
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="City"
              required
            />
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="State"
              required
            />
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Country"
              required
            />
            <input
              type="text"
              name="postCode"
              value={form.postCode}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Postal Code"
              required
            />
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>

          <div className="grid md:grid-cols-3 gap-5">
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Select Propeterty Type"
              required
            >
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
              <option>Studio</option>
            </select>

            <input
              type="number"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Bedrooms"
              required
            />

            <input
              type="number"
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              placeholder="Bathrooms"
              required
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Description</h2>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        {/* EXISTING IMAGES */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Images</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((img) => (
              <div key={img.id} className="relative group">

                <img
                  src={img.imageUrl}
                  className="w-full h-32 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveExisting(img.id)}
                  className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* NEW IMAGES */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Images</h2>

          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <button type="button" onClick={() => fileInputRef.current.click()} className="p-2.5 rounded-xl flex items-center gap-1 bg-gray-10 shadow-sm hover:cursor-pointer hover:bg-gray-200">
            <IoImagesOutline className="inline"/>Choose Images
          </button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {preview.map((img, index) => (
              <div key={index} className="relative group">

                <img
                  src={img}
                  className="w-full h-32 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>

              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between">

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            Update Property
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </form>
    </div>
  );
}

export default EditProperty;