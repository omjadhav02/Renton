function PropertyInfo({ property }) {
    return (
        <div className="lg:col-span-2">

            <p className="text-2xl font-semibold">
                ₹ {property.price}
                <span className="text-gray-500 text-sm ml-1">/month</span>
            </p>

            <div className="flex gap-6 text-gray-600 mt-4">
                <span>🛏 {property.bedrooms} Bedrooms</span>
                <span>🛁 {property.bathrooms} Bathrooms</span>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                    {property.description}
                </p>
            </div>

        </div>
    );
}

export default PropertyInfo;