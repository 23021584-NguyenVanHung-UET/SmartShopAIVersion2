"use client";

import Navbar from "@/components/home/Navbar";
import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import FlashSale from "@/components/home/FlashSale";
import ProductGrid from "@/components/home/ProductGrid";

export default function HomePageShop() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-20">
                <Banner />
                <Categories />
                <FlashSale />
                <ProductGrid />
            </div>
        </div>
    );
}
