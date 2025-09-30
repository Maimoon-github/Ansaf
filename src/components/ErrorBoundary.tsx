import React from 'react'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  error?: Error | null
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: unknown) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error in component tree:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-red-50">
          <div className="max-w-xl w-full bg-white border rounded p-6 shadow">
            <h2 className="text-xl font-semibold text-red-700 mb-2">An error occurred</h2>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">{String(this.state.error)}</pre>
            <p className="mt-4 text-sm text-gray-600">Check the browser console for the full stack trace.</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
