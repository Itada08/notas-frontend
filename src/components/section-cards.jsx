"use client"

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileTextIcon,
  CalendarIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "lucide-react"

function formatLastUpdated(dateStr) {
  if (!dateStr) return "Nenhuma nota ainda"
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function SectionCards({ stats }) {
  const { total = 0, thisWeek = 0, thisMonth = 0, lastUpdatedAt = null } =
    stats || {}

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de notas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <FileTextIcon />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Todas as suas notas salvas
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Criadas essa semana</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {thisWeek}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <CalendarIcon />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Notas novas nos últimos 7 dias
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Criadas esse mês</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {thisMonth}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <CalendarDaysIcon />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Notas novas no mês atual</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Última atualização</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {formatLastUpdated(lastUpdatedAt)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <ClockIcon />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Nota mais recente editada
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
