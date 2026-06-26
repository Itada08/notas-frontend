"use client"

import * as React from "react"
import { toast } from "sonner"
import { SectionCards } from "@/components/section-cards"
import { NotesTable } from "@/components/notes-table"
import { Skeleton } from "@/components/ui/skeleton"
import { notesApi } from "@/lib/api"

export default function Dashboard() {
  const [notes, setNotes] = React.useState([])
  const [stats, setStats] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  async function loadData() {
    try {
      setError(null)
      const [notesData, statsData] = await Promise.all([
        notesApi.list(),
        notesApi.stats(),
      ])
      setNotes(notesData)
      setStats(statsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  async function handleCreate(values) {
    await notesApi.create(values)
    toast.success("Nota criada.")
    await loadData()
  }

  async function handleUpdate(id, values) {
    await notesApi.update(id, values)
    toast.success("Nota atualizada.")
    await loadData()
  }

  async function handleDelete(id) {
    try {
      await notesApi.remove(id)
      toast.success("Nota excluída.")
      await loadData()
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="text-center">
          <p className="mb-2 text-muted-foreground">
            Não foi possível carregar suas notas.
          </p>
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 py-4">
      <SectionCards stats={stats} />
      <NotesTable
        notes={notes}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}