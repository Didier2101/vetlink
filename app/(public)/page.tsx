import HeroSection from '@/components/public/principal/HeroSection'
import ServicesSlider from '@/components/public/principal/ServicesSlider'
import SmartTagSection from '@/components/public/principal/SmartTagSection'
import TestimonialsSection from '@/components/public/principal/testimonios/Testimonials'
import Loading from '@/src/ui/Loading'
import React, { Suspense } from 'react'

export default function PublicPage() {
    return (
        <Suspense fallback={<Loading />}>
            <HeroSection />
            <ServicesSlider />
            <SmartTagSection />
            <TestimonialsSection />
        </Suspense>
    )
}
