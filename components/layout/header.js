import Logo from './logo'
import { PANELS } from '../../helpers/constants'
import { useContext } from 'react'
import { PanelContext } from '../../pages/_app'

export default function Header() {
  const panelContext = useContext(PanelContext)
  
  return (
    <div className="flex justify-center">
      <div className="cursor-pointer" onClick={() => panelContext.panelDispatch({ payload: PANELS[0] })}>
        <Logo />
      </div>
    </div>
  )
}
