function PropertyGallery({ images, currentImage, setCurrentImage, setShowModal }) {
    return (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">

            <div className="lg:col-span-2">
                <img
                    src={images[currentImage]}
                    onClick={() => setShowModal(true)}
                    className="w-full h-[420px] object-cover rounded-xl cursor-pointer"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {images.slice(0, 4).map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        onClick={() => setCurrentImage(index)}
                        className={`h-48 w-full object-cover rounded-xl cursor-pointer
                        ${currentImage === index ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                    />
                ))}
            </div>

        </div>
    );
}

export default PropertyGallery;