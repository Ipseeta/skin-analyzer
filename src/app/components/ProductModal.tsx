'use client'

interface ProductModalProps {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    price: number
    amazonUrl?: string
    details?: {
      benefits: string[]
      ingredients: string[]
      howToUse: string[]
    }
  }
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="relative h-64 mb-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.details?.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">How to Use</h3>
              <ol className="list-decimal list-inside space-y-1">
                {product.details?.howToUse.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Key Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.details?.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-2xl font-bold">${product.price}</span>
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
              >
                View on Amazon
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 