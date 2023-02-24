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
                color="gray"
              />
          ))}
        </div>
        <div className="flex-1 flex flex-col overflow-hidden rounded-2xl bg-slate-200 border border-t-4 border-slate-300">
          <div className="overflow-y-auto px-4 py-12">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
