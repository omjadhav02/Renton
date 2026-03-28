function PropertyHeader({ property }) {
    return (
        <div className="mb-8">

            <h1 className="text-4xl font-semibold text-gray-900 leading-tight">
                {property.title}
            </h1>

            <div className="flex items-center gap-3 mt-3 flex-wrap">

                <span className="text-gray-500 text-sm">
                    📍 {property.city}
                </span>

                <span className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full">
                    {property.propertyType}
                </span>

                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Available
                </span>

            </div>

        </div>
    );
}

export default PropertyHeader;