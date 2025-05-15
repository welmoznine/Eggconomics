import React from 'react';
import { ShoppingCart, MapPin, TrendingUpDownIcon } from 'lucide-react';

const EggPriceFeatures = () => {
  return (
    <div className=" bg-card text-card-foreground ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#ffc579] uppercase tracking-wide">Features</h2>
          <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Making egg shopping easier
          </p>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
            Eggconomics helps you make informed decisions and save money on your grocery shopping.
          </p>
        </div>
        
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-accent/50 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#ffc579] text-primary-foreground">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Compare Prices</h3>
              <p className="mt-2 text-base text-muted-foreground text-center">
                Compare egg prices across different stores and brands to find the best deals.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-accent/50 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#ffc579] text-primary-foreground">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Find Nearby Stores</h3>
              <p className="mt-2 text-base text-muted-foreground text-center">
                Locate stores near you with the best egg prices using our interactive map.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-accent/50 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#ffc579] text-primary-foreground">
                <TrendingUpDownIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Track Price Trends</h3>
              <p className="mt-2 text-base text-muted-foreground text-center">
                Monitor how egg prices change over time to shop during the best periods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EggPriceFeatures;
