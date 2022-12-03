import Header from './header'
import Footer from './footer'
import Background from './background'

export default function Layout({ children }) {
  return (
    <div>
      <Background />
      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}
