import Home from '@/features/home/home-page/Home'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async () => {
    const currentUrl = window.location.href
    const verificationUrl = currentUrl.split('verification_url=')[1]

    if (verificationUrl) {
      try {
        const response = await fetch(verificationUrl)
        if (!response.ok) {
          throw new Error('Verification failed')
        }
        return redirect({ to: '/login', search: { verification: 'success' } })
      } catch (error) {
        console.error('Error during verification:', error)
      }
    }
  },
  component: Home,
})

// function Index() {
//   useDocumentTitle('Homepage')
//   return (
//     <>
//       <title>Homepage</title>
//       <div>Welcome Home!</div>
//     </>
//   )
// }
