// Common error types
export type ApiError = {
  message: string
  code?: string
  details?: unknown
}

// Error handling utilities
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      details: error.stack
    }
  }
  
  if (typeof error === 'string') {
    return {
      message: error
    }
  }
  
  return {
    message: 'An unexpected error occurred',
    details: error
  }
}

// User-friendly error messages
export const getErrorMessage = (error: ApiError): string => {
  switch (error.code) {
    case 'ANALYSIS_FAILED':
      return 'Unable to analyze the image. Please try again with a clearer photo.'
    case 'NO_FACE_DETECTED':
      return 'No face detected in the image. Please ensure your face is clearly visible.'
    case 'BAD_LIGHTING':
      return 'Poor lighting detected. Please take the photo in better lighting conditions.'
    case 'NETWORK_ERROR':
      return 'Network connection issue. Please check your internet connection.'
    default:
      return error.message || 'Something went wrong. Please try again.'
  }
}

// Error state management
export const createErrorState = (error: unknown) => {
  const apiError = handleApiError(error)
  const userMessage = getErrorMessage(apiError)
  return {
    error: apiError,
    message: userMessage,
    hasError: true
  }
} 