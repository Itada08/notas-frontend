"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlusIcon, EllipsisVerticalIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function truncate(text, length = 80) {
  if (!text) return ""
  return text.length > length ? `${text.slice(0, length)}...` : text
}

function NoteFormDrawer({ note, open, onOpenChange, onSubmit, saving }) {
  const isMobile = useIsMobile()
  const [title, setTitle] = React.useState(note?.title ?? "")
  const [content, setContent] = React.useState(note?.content ?? "")

  React.useEffect(() => {
    if (open) {
      setTitle(note?.title ?? "")
      setContent(note?.content ?? "")
    }
  }, [note, open])

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{note ? "Editar nota" : "Nova nota"}</DrawerTitle>
          <DrawerDescription>
            {note
              ? "Atualize o título e o conteúdo da nota."
              : "Preencha o título e o conteúdo da nova nota."}
          </DrawerDescription>
        </DrawerHeader>
        <form
          className="flex flex-col gap-4 px-4"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit({ title, content })
          }}
        >
          <div className="flex flex-col gap-3">
            <Label htmlFor="note-title">Título</Label>
            <Input
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="note-content">Conteúdo</Label>
            <textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={8}
              className="resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </div>
          <DrawerFooter className="px-0">
            <Button type="submit" disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export function NotesTable({ notes, onCreate, onUpdate, onDelete }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [editingNote, setEditingNote] = React.useState(null)
  const [saving, setSaving] = React.useState(false)

  function openCreate() {
    setEditingNote(null)
    setDrawerOpen(true)
  }

  function openEdit(note) {
    setEditingNote(note)
    setDrawerOpen(true)
  }

  async function handleSubmit(values) {
    setSaving(true)
    try {
      if (editingNote) {
        await onUpdate(editingNote.id, values)
      } else {
        await onCreate(values)
      }
      setDrawerOpen(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Suas notas</h2>
        <Button size="sm" onClick={openCreate}>
          <PlusIcon />
          <span className="hidden lg:inline">Nova nota</span>
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead className="hidden md:table-cell">
                Conteúdo
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                Atualizada em
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  Você ainda não tem nenhuma nota. Crie a primeira!
                </TableCell>
              </TableRow>
            ) : (
              notes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>
                    <Button
                      variant="link"
                      className="w-fit px-0 text-left text-foreground"
                      onClick={() => openEdit(note)}
                    >
                      {note.title}
                    </Button>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {truncate(note.content)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {formatDate(note.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <EllipsisVerticalIcon />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={() => openEdit(note)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => onDelete(note.id)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <NoteFormDrawer
        key={editingNote?.id ?? "new"}
        note={editingNote}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </div>
  );
}
