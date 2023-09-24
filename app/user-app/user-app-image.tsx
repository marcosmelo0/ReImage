"use client"

import Image from "next/image"
import { PlusCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { RestoredImage } from "@/types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  image: RestoredImage
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
  publicUrl: string
}

export function UserAppImage({
  image,
  aspectRatio = "portrait",
  width,
  height,
  className,
  publicUrl,
  ...props
}: AlbumArtworkProps) {

  const downloadImage = async (image: string) => {
    const supabase = createClientComponentClient()

    const { data, error} = await supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FOLDER).download(`${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FOLDER_RESTORED}/${image}`)

    if(data) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        let url = window.URL.createObjectURL(data);
        a.href = url;
        a.download = image;
        a.click()
        window.URL.revokeObjectURL(url);
    }
  }
      

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <img
              src={publicUrl + "/" + image.name}
              alt={image.name}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Adicionar a galeria</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Adicionar a Fotos</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Nova Galeria
              </ContextMenuItem>
              <ContextMenuSeparator />
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Deletar</ContextMenuItem>
          <ContextMenuItem>Duplicar</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => {
            downloadImage(image.name)
          }}>Download</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Compartilhar</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <p className="text-xs text-muted-foreground">{image.name}</p>
      </div>
    </div>
  )
}