import { IoBedOutline, IoCashOutline, IoLocationOutline, IoOpenOutline, IoWaterOutline } from "react-icons/io5";

const Info = ({ selectedProperty, navigate }) => {
    return (
        <div className="mt-4">
        
            {selectedProperty ? (
                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl shadow-lg p-5 hover:shadow-xl transition">
        
                    {/* IMAGE */}
                    <div className="relative mb-4">
                        <img
                          src={selectedProperty.images?.[0]?.imageUrl || "https://via.placeholder.com/400"}
                          className="w-full h-40 object-cover rounded-2xl"
                        />
                        <div className="absolute bottom-3 left-3 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow">
                        ₹ {selectedProperty.price}/month
                        </div>
                    </div>
        
                    {/* TITLE */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-1">
                        {selectedProperty.title}
                    </h3>
        
                    {/* LOCATION */}
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                        <IoLocationOutline className="text-indigo-500" />
                        <span className="line-clamp-1">{selectedProperty.address}</span>
                    </div>
        
                    {/* DETAILS */}
                    <div className="flex justify-between items-center bg-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 mb-4">
                        <div className="flex items-center gap-1">
                          <IoBedOutline className="text-indigo-500" />
                          <span>{selectedProperty.bedrooms} Bedrooms</span>
                        </div>
        
                        <div className="flex items-center gap-1">
                          <IoWaterOutline className="text-blue-500" />
                          <span>{selectedProperty.bathrooms} Bathrooms</span>
                        </div>
        
                        <div className="flex items-center gap-1">
                          <IoCashOutline className="text-green-600" />
                          <span>₹{selectedProperty.deposit}</span>
                        </div>
                    </div>
        
                    {/* DESCRIPTION */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {selectedProperty.description}
                    </p>
        
                    {/* ACTION */}
                    <button
                        onClick={() => navigate(`/property/${selectedProperty.id}`)}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-medium"
                    >
                        <IoOpenOutline size={18} />
                            View Details
                    </button>
        
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 mt-10">
                    <IoLocationOutline size={48} />
                    <p className="mt-2 text-center">Select a property to see details here</p>
                </div>
            )}
        
        </div>
    )
}

export default Info;