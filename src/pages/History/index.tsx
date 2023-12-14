import { useContext, useEffect, useState } from 'react'
import { ActivityCycleContext, Cycle } from '../../context/CycleContext'
import { HistoryContainer, HistoryList, Status } from './style'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
export function History() {
  const { cycles } = useContext(ActivityCycleContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} Minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDateTime), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishDateTime && (
                      <Status statusColor="green">Concluído</Status>
                    )}

                    {cycle.interruptionsDateTime && (
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {!cycle.interruptionsDateTime && !cycle.finishDateTime && (
                      <Status statusColor="yellow">Em Andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
