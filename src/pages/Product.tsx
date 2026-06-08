import { useEffect } from 'react'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import { useDataStore } from '../store/dataStore'

export default function Product() {
  const products = useDataStore((state) => state.products)
  const productsLoading = useDataStore((state) => state.productsLoading)
  const productsError = useDataStore((state) => state.productsError)
  const fetchProducts = useDataStore((state) => state.fetchProducts)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Product Suite</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Integrated diagnostic solutions</h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Our modular product suite spans clinical diagnostics, laboratory operations, digital health, and capacity building to deliver comprehensive TB control solutions.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Product offerings</h2>
          <p className="mt-2 text-slate-600">Scalable tools and platforms for clinical and public health deployment</p>
        </div>
        {productsLoading && <LoadingSpinner />}
        {productsError && <ErrorMessage error={productsError} retry={fetchProducts} />}
        {!productsLoading && !productsError && (
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
