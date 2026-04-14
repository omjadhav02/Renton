const PropertyInfo = ({ property }) => {
    return (
        <div className="space-y-10">

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    About this property
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                    {property.description}
                </p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-5">
                    Key details
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                    <Feature label="Price" value={`₹${property.price}`} sub="per month" />
                    <Feature label="Deposit" value={`₹${property.deposit || "NA"}`} />
                    <Feature label="Bedrooms" value={property.bedrooms} />
                    <Feature label="Bathrooms" value={property.bathrooms} />
                    <Feature label="Type" value={property.propertyType} />
                    <Feature label="City" value={property.city} />

                </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">

                <div className="bg-indigo-600 text-white p-3 rounded-xl">
                    📍
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        Location
                    </h3>

                    <p className="text-slate-600 text-sm">
                        {property.address}, {property.city}, {property.state},{" "}
                        {property.country} - {property.postCode}
                    </p>
                </div>

            </div>

        </div>
    );
};

const Feature = ({ label, value, sub }) => (
    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">

        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-semibold text-slate-900">{value}</p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}

    </div>
);

export default PropertyInfo;