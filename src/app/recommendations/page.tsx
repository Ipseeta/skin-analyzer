'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '../types'
import ProductModal from '../components/ProductModal'
import { mockProducts } from '../data/mockProducts'

// Helper function to generate Amazon affiliate link
const generateAmazonLink = (productId: string, tag: string) => {
  return `https://www.amazon.com/dp/${productId}?tag=${tag}`
}

export default function Recommendations() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [sortBy, setSortBy] = useState<'price' | 'name'>('price')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Amazon affiliate tag
  const AMAZON_TAG = 'skinguru07-20' // Replace with your Amazon Associates tag

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        // Using mock products for now, but with Amazon links
        const productsWithAmazonLinks = mockProducts.map(product => ({
          ...product,
          amazonUrl: generateAmazonLink(product.id, AMAZON_TAG)
        }))
        setProducts(productsWithAmazonLinks)
        setFilteredProducts(productsWithAmazonLinks)
      } catch (error) {
        console.error('Error setting up recommendations:', error)
      } finally {
        setLoading(false)
      }
    }

    getRecommendations()
  }, [])

  useEffect(() => {
    let filtered = [...products]
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price
      }
      return a.name.localeCompare(b.name)
    })

    setFilteredProducts(filtered)
  }, [products, selectedCategory, sortBy])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6">Loading Recommendations...</h1>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-4">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Recommended Products</h1>

        <div className="mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              {['all', ...new Set(mockProducts.map(p => p.category))].map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'name')}
              className="border rounded-lg px-3 py-2"
            >
              <option value="price">Sort by Price</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
              <div 
                className="relative h-48 bg-gray-100 rounded mb-4 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.concerns.map((concern) => (
                  <span 
                    key={concern}
                    className="bg-secondary bg-opacity-10 text-secondary px-2 py-1 rounded-full text-sm"
                  >
                    {concern}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Details
                  </button>
                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Buy on Amazon
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        <button
          onClick={() => router.push('/analysis')}
          className="mt-6 w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Analysis
        </button>
      </div>
    </div>
  )
} 