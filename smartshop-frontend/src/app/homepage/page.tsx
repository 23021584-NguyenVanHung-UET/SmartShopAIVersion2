"use client";

import { useState } from "react";
import Navbar from "@/components/home/Navbar";
import Banner from "@/components/home/Banner";
import FlashSale from "@/components/home/FlashSale";
import ProductGrid from "@/components/home/ProductGrid";
import Footer from "@/components/shared/Footer";
import TrendingProducts from "@/components/home/TrendingProducts";
import CategorySections from "@/components/home/CategorySections";

export default function HomePageShop() {
    const selectedCategory = "all";
    const selectedCategoryName = "Tất cả";
    const [searchKeyword, setSearchKeyword] = useState("");

    return (
        <div className="bg-background min-h-screen">
            <Navbar onSearch={(text) => setSearchKeyword(text)} />
            <div className="pt-[calc(var(--header-height)+28px)] lg:pt-[calc(var(--header-height)+36px)]">
                <Banner />
                <div id="flash-sale">
                    <FlashSale />
                </div>
                <div className="max-w-screen-2xl mx-auto px-6">
                    <TrendingProducts />
                </div>
                <CategorySections />
                <ProductGrid
                    selectedCategorySlug={selectedCategory}
                    selectedCategoryName={selectedCategoryName}
                    searchKeyword={searchKeyword}
                />
            </div>
            <Footer />
        </div>
    );
}
