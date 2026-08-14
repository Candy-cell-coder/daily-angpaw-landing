import Hero from '@/components/Hero';
import Features from '@/components/Features';
import RewardGallery from '@/components/RewardGallery';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main>
      <Hero />
      <Features />
      <RewardGallery />
      <CTASection />
      <Footer />
    </main>
  );
}
