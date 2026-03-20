function ImageModal({ images, currentImage, setCurrentImage, setShowModal }) {

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">

            <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-8 text-white text-2xl"
            >
                ✕
            </button>

            <button
                onClick={prevImage}
                className="absolute left-10 text-white text-3xl"
            >
                ‹
            </button>

            <img
                src={images[currentImage]}
                className="max-h-[80vh] rounded-lg"
            />

            <button
                onClick={nextImage}
                className="absolute right-10 text-white text-3xl"
            >
                ›
            </button>

        </div>
    );
}

export default ImageModal;