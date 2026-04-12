import {
  IoPricetagOutline,
  IoHomeOutline,
  IoBedOutline,
  IoWaterOutline,
  IoLocationOutline
} from "react-icons/io5";

const PropertyInfo = ({ property }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

      <Item icon={<IoPricetagOutline />} label="Price" value={`₹${property.price}`} color="bg-green-100 text-green-700" />
      
      <Item icon={<IoPricetagOutline />} label="Deposit" value={`₹${property.deposit || "NA"}`} color="bg-yellow-100 text-yellow-700" />

      <Item icon={<IoHomeOutline />} label="Type" value={property.propertyType} color="bg-purple-100 text-purple-700" />

      <Item icon={<IoBedOutline />} label="Bedrooms" value={property.bedrooms} color="bg-blue-100 text-blue-700" />

      <Item icon={<IoWaterOutline />} label="Bathrooms" value={property.bathrooms} color="bg-indigo-100 text-indigo-700" />

      <Item icon={<IoLocationOutline />} label="City" value={property.city} color="bg-pink-100 text-pink-700" />

    </div>
  );
};

const Item = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 border border-slate-700">

    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
      {icon}
    </div>

    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="font-medium text-white">{value}</p>
    </div>

  </div>
);

export default PropertyInfo;