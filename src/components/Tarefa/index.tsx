import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'
import { Botao, Botaosalvar } from '../../styles'

import * as enums from '../../UTILS/enums/tarefa'

type Props = TarefaClass

const Tarefa = ({
  descricao: descricaooriginal,
  prioridade,
  status,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, Setdescricao] = useState('')

  useEffect(() => {
    if (descricaooriginal.length > 0) {
      Setdescricao(descricaooriginal)
    }
  }, [descricaooriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    Setdescricao(descricaooriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => Setdescricao(evento.target.value)}
      />
      <S.Barraacao>
        {estaEditando ? (
          <>
            <Botaosalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    prioridade,
                    status,
                    titulo,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </Botaosalvar>
            <S.botaocancelarremover onClick={cancelarEdicao}>
              Cancelar
            </S.botaocancelarremover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.botaocancelarremover onClick={() => dispatch(remover(id))}>
              Remover
            </S.botaocancelarremover>
          </>
        )}
      </S.Barraacao>
    </S.Card>
  )
}

export default Tarefa
