import {
    IoBedOutline,
    IoWaterOutline,
    IoHomeOutline,
    IoLocationOutline,
    IoCashOutline
} from "react-icons/io5";

const PropertyInfo = ({ property }) => {
    return (
        <div className="space-y-10">

            {/* DESCRIPTION */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-white">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    About this property
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                    {property.description}
                </p>
            </div>

            {/* KEY DETAILS */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-5">
                    Key details
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                    <Feature color="bg-green-100 text-green-700" icon={<IoCashOutline />} label="Price" value={`₹${property.price}`} sub="per month" />
                    <Feature color="bg-yellow-100 text-yellow-700" icon={<IoCashOutline />} label="Deposit" value={`₹${property.deposit || "NA"}`} />
                    <Feature color="bg-blue-100 text-blue-700" icon={<IoBedOutline />} label="Bedrooms" value={property.bedrooms} />
                    <Feature color="bg-indigo-100 text-indigo-700" icon={<IoWaterOutline />} label="Bathrooms" value={property.bathrooms} />
                    <Feature color="bg-purple-100 text-purple-700" icon={<IoHomeOutline />} label="Type" value={property.propertyType} />
                    <Feature color="bg-pink-100 text-pink-700" icon={<IoLocationOutline />} label="City" value={property.city} />

                </div>
            </div>

            {/* LOCATION */}
            <div className="p-6 rounded-3xl bg-gray-50 flex items-start gap-4">

                <div className="bg-black text-white p-3 rounded-xl">
                    <IoLocationOutline className="text-lg" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Location
                    </h3>

                    <p className="text-gray-600 text-sm">
                        {property.address}, {property.city}, {property.state},{" "}
                        {property.country} - {property.postCode}
                    </p>
                </div>

            </div>

        </div>
    );
};

const Feature = ({ icon, label, value, sub, color }) => (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:shadow-md transition">

        <div className={`p-2 rounded-xl ${color}`}>
            {icon}
        </div>

        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-semibold text-gray-900 leading-tight">
                {value}
            </p>
            {sub && (
                <p className="text-xs text-gray-400">{sub}</p>
            )}
        </div>

    </div>
);

export default PropertyInfo;