import Botaoadicionar from '../../components/Botaoadicionar'
import Barralateral from '../../containers/Barralateral'
import Listadetarefas from '../../containers/Listadetarefas'

const Home = () => (
  <>
    <Barralateral mostrarFiltros />
    <Listadetarefas />
    <Botaoadicionar />
  </>
)

export default Home
