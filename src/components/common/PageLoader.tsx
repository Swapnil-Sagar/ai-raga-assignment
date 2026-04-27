interface PageLoaderProps {
  message?: string
}

export const PageLoader = ({ message = 'Loading...' }: PageLoaderProps) => {
  return (
    <div className="screen-loader" role="status" aria-live="polite">
      <div className="screen-loader__spinner" />
      <p>{message}</p>
    </div>
  )
}
