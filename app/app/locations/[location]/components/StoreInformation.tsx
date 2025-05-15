import React from "react";
import { MapPin, Phone } from "lucide-react";
import { StoreLocation } from "@/utils/supabase/locationDetails";

interface StoreInformationProps {
  storeInfo: StoreLocation;
}

const StoreInformation: React.FC<StoreInformationProps> = ({ storeInfo }) => (
  <div className="bg-card text-card-foreground  ">
    <div className="space-y-2  ">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="w-4 h-4 flex-shrink-0 text-[#ffc579]" />
        <p className="text-sm sm:text-base break-words">
          {`${storeInfo.address}, ${storeInfo.city}, ${storeInfo.state} ${storeInfo.zipCode}`}
        </p>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Phone className="w-4 h-4 flex-shrink-0 text-[#ffc579]" />
        <p className="text-sm sm:text-base">{storeInfo.phoneNumber || "No phone number available"}</p>
      </div>
    </div>
  </div>
);

export default StoreInformation;
