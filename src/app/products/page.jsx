import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Product Catalogue | Prince Pipes & Fittings',
  description: 'Explore our comprehensive range of industrial pipe fittings including Stainless Steel, Carbon Steel, Duplex, Alloy Steel and more.',
  alternates: {
    canonical: '/products',
  }
};

export default function ProductsIndexPage() {
  // The home page already serves as the products index via HeroCategories
  redirect('/');
}
