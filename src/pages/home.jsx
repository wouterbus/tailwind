import Hero from '../components/Hero';
import GradientMap from '../components/GradientMap';

const customGradient = [
  { stop: 0, color: [255, 255, 180] },   // Yellow center
  { stop: 0.5, color: [255, 100, 100] }, // Peachy orange
  { stop: 1, color: [200, 0, 50] }       // Deep red edges
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="p-8 flex justify-center items-center">
        <GradientMap src="public/gradient-map-image-test.png"gradient={customGradient} />
      </section>
    </main>
  );
}
