function PropertyHeader({ property }) {
    return (
        <div className="mb-8">

            <h1 className="text-4xl font-semibold text-slate-900 leading-tight">
                {property.title}
            </h1>

            <div className="flex items-center gap-3 mt-3 flex-wrap">

                <span className="text-slate-500 text-sm">
                    📍 {property.city}
                </span>

                <span className="text-xs bg-slate-100 px-3 py-1 rounded-full">
                    {property.propertyType}
                </span>

                <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full">
                    Available
                </span>

            </div>

        </div>
    );
}

export default PropertyHeader;