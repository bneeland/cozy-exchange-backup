import Header from './header'
import Footer from './footer'
import Button from '../ui/button'
import { PANELS } from '../../helpers/constants'
import { useContext } from 'react'
import { PanelContext } from '../../pages/_app'

export default function Layout({ children }) {
  const panelContext = useContext(PanelContext)

  return (
    <div className="h-screen w-screen flex flex-col gap-4 p-4 text-sm">
      <Header />
      <div className="flex-1 flex overflow-y-auto gap-4">
        <div className="w-40 flex flex-col gap-4">
          {PANELS
            .filter(panel => panel.isShown)
            .map(panel => (
              <Button
                key={panel.id}
                icon={panel.icon}
                label={panel.label}
                callback={() => panelContext.panelDispatch({ payload: panel })}
              />
          ))}
        </div>
        <div className="flex-1 flex flex-col overflow-hidden rounded-2xl bg-slate-100 border border-t-4">
          <div className="overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
