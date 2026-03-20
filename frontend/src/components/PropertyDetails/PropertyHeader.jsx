function PropertyHeader({ property }) {
    return (
        <>
            <h1 className="text-3xl font-semibold text-gray-800">
                {property.title}
            </h1>
            <p className="text-gray-500 mt-1">
                {property.city}
            </p>
        </>
    );
}

export default PropertyHeader;