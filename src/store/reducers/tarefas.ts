import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefa'
import * as enums from '../../UTILS/enums/tarefa'

type TarefasState = {
  itens: Tarefa[]
}

const initialState: TarefasState = {
  itens: [
    {
      id: 1,
      descricao: 'estudar java',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.CONCLUIDA,
      titulo: 'estudar aquilo ali'
    },
    {
      id: 2,
      descricao: 'estudar carac',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.PENDENTE,
      titulo: 'estudar la'
    },
    {
      id: 3,
      descricao: 'estudar aboleuio',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.PENDENTE,
      titulo: 'estudar aquilo '
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((tarefa) => tarefa.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexdatarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexdatarefa >= 0) {
        state.itens[indexdatarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaexiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )

      if (tarefaexiste) {
        alert('ja existe essa tarefa')
      } else {
        const ultimatarefa = state.itens[state.itens.length - 1]
        const tarefanova = {
          ...action.payload,
          id: ultimatarefa ? ultimatarefa.id + 1 : 1
        }
        state.itens.push(tarefanova)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexdatarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexdatarefa >= 0) {
        state.itens[indexdatarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } = tarefasSlice.actions

export default tarefasSlice.reducer
