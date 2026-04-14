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

      <Item icon={<IoPricetagOutline />} label="Price" value={`₹${property.price}`} />
      <Item icon={<IoPricetagOutline />} label="Deposit" value={`₹${property.deposit || "NA"}`} />
      <Item icon={<IoHomeOutline />} label="Type" value={property.propertyType} />
      <Item icon={<IoBedOutline />} label="Bedrooms" value={property.bedrooms} />
      <Item icon={<IoWaterOutline />} label="Bathrooms" value={property.bathrooms} />
      <Item icon={<IoLocationOutline />} label="City" value={property.city} />

    </div>
  );
};

const Item = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">

    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
      {icon}
    </div>

    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-medium text-slate-900">{value}</p>
    </div>

  </div>
);

export default PropertyInfo;