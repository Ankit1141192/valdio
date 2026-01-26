import React from 'react'
import HeroSection from '../components/HeroSection'
import CategoriesSection from '../components/CategoriesSection'
import ProductsSection from '../components/ProductsSection'
import FeaturesSection from '../components/FeaturesSection'
import TrustSection from '../components/TrustSection'
import CTASection from '../components/CTASection'
import HomeProductStrip from "../components/HomeProductStrip";
import products from "../config/Product.json";

const HomePage = () => {
  const flashDeals = products
    .filter((p) => p.discountPrice && p.discountPrice < p.price)
    .slice(0, 4);

  const featured = products
    .filter((p) => (p.badge && String(p.badge).trim()) || p.rating >= 4.5)
    .slice(0, 4);

  const newArrivals = [...products].slice(-4);

  return (
    <div className='mt-20'>
        <HeroSection/>
        <CategoriesSection/>
        <HomeProductStrip
          badgeText="Flash Deals"
          title="Flash Deals"
          subtitle="Don’t miss out — limited time savings"
          products={flashDeals}
        />
        <HomeProductStrip
          badgeText="Featured"
          title="Featured Products"
          subtitle="Hand-picked picks you’ll love"
          products={featured}
        />
        <HomeProductStrip
          badgeText="New"
          title="New Arrivals"
          subtitle="Fresh recommendations added recently"
          products={newArrivals}
        />
        <TrustSection/>
        <ProductsSection/>
        
        <FeaturesSection/>
        <CTASection/>
    </div>
  )
}

export default HomePage