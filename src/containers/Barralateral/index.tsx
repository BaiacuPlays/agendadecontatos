import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Filtrocard from '../../components/Filtrocard'
import { RootReducer } from '../../store'
import { alteratermo } from '../../store/reducers/filtro'

import * as S from './styles'
import * as enums from '../../UTILS/enums/tarefa'
import { Botao, Campo } from '../../styles'

type Props = {
  mostrarFiltros: boolean
}

const Barralateral = ({ mostrarFiltros }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  return (
    <S.Aside>
      <div>
        {mostrarFiltros ? (
          <>
            <Campo
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(evento) => dispatch(alteratermo(evento.target.value))}
            />
            <S.Filtros>
              <Filtrocard
                valor={enums.Status.PENDENTE}
                criterio="status"
                legenda="pendente"
              />
              <Filtrocard
                valor={enums.Status.CONCLUIDA}
                criterio="status"
                legenda="concluidas"
              />
              <Filtrocard
                valor={enums.Prioridade.URGENTE}
                criterio="prioridade"
                legenda="urgentes"
              />
              <Filtrocard
                valor={enums.Prioridade.NORMAL}
                criterio="prioridade"
                legenda="importantes"
              />
              <Filtrocard
                valor={enums.Prioridade.IMPORTANTE}
                criterio="prioridade"
                legenda="normal"
              />
              <Filtrocard criterio="todas" legenda="todas" />
            </S.Filtros>
          </>
        ) : (
          <Botao onClick={() => navigate('/')}>Voltar a lista de tarefas</Botao>
        )}
      </div>
    </S.Aside>
  )
}

export default Barralateral
