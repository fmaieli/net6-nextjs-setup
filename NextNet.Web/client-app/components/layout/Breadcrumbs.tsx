import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import { BreadCrumb } from 'primereact/breadcrumb'

export const BreadCrumbs = (props) => {
  const home = {
    icon: 'pi pi-home',
    url: '/',
  }
  const colorStyle = "#F0F0F0"
  return (
    <div>
      <BreadCrumb className="ml-7" style={{ backgroundColor:colorStyle , borderColor:colorStyle }} model={props.paths} home={home} />
    </div>
  )
}
