import Resource from './pages/Resource'
import Sidebar from './components/Sidebar'
import AddResource from './pages/AddResource'
;(window as any).Pangaso.booting(({ route, sidebar }: any) => {
    sidebar(Sidebar)
    route('/resources/:resource', Resource)
    route('/resources/:resource/new', AddResource)
    route('/resources/:resource/:primaryKey/edit', AddResource)
})
