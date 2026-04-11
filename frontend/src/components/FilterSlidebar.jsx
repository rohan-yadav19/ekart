import { Input } from "./ui/input";
import { all } from "axios";
import React from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const FilterSlidebar = ({ allProducts, priceRange }) => {
  const Categories = allProducts.map((p) => p.category);
  const uniqueCategories = ["ALl", ...new Set(Categories)];
  const Brands = allProducts.map((p) => p.brand);
  const uniqueBrands = ["ALl", ...new Set(Brands)];
  console.log(uniqueBrands);
  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64">
      {/* Search */}
      <Input
        type="text"
        placeholder="Search..."
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />
      {/* Categories */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {uniqueCategories.map((item, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <input type="radio" />
              <label htmlFor="">{item}</label>
            </div>
          );
        })}
      </div>
      {/* Brands */}
      <h1 className="mt-5 font-semibold text-xl">Brand</h1>
      <select className="bg-white w-full p-2 border-gray-200 border-2 rounded-md">
        {uniqueBrands.map((item, index) => {
          return <option key={index}>{item.toUpperCase()}</option>;
        })}
      </select>
      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range </h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="">
          price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="0"
            max="5000"
            className="w-20 p-1 border border-gray-300 rounded"
          />
          <span>-</span>
          <input
            type="number"
            min="0"
            max="999999"
            className="w-20 p-1 border border-gray-300 rounded"
          />
        </div>
        <input type="range" min="0" max="5000" step="100" className="w-full" />
        <input
          type="range"
          min="0"
          max="999999"
          step="100"
          className="w-full"
        />
      </div>
      {/* Reset Button */}
      <Button className="bg-pink-600 text-white mt-5 cursor-pointer w-full">
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSlidebar;
