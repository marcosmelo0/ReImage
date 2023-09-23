import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";
import UserAppHeader from "@/components/user-app/user-app-header";
import { Sidebar } from "./user-app-sidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { PlusCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageUploadPlaceholder } from "@/components/user-app/img-upload-placeholder";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserAppImage } from "./user-app-image";

export default async function UserApp() {
  let loggedIn = false;
  const supabase = createServerComponentClient({ cookies });

  try {
    const supabase = createServerComponentClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      loggedIn = true;
    }
  } catch (error) {
    console.log("Home", error);
  } finally {
    if (!loggedIn) redirect("/", RedirectType.replace);
  }

  const { data: restoredImages, error} = await supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FOLDER).
      list(process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FOLDER_RESTORED, {
        limit: 10,
        offset: 0,
        sortBy: {
          column: "name",
          order: "asc" 
        }
      })

  const { data: {publicUrl}} = await supabase.storage.from(process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FOLDER).getPublicUrl(process.env.NEXT_PUBLIC_SUPABASE_IMAGE_FOLDER_RESTORED)


  return (
    <>
      <div className=" md:block">
        <UserAppHeader />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="photos" className="h-full space-y-6">
                    <div className="space-between flex items-center flex-wrap gap-2">
                      <TabsList>
                        <TabsTrigger value="photos" className="relative">
                          Fotos
                        </TabsTrigger>
                        <TabsTrigger value="documents">Documentos</TabsTrigger>
                        <TabsTrigger value="other" disabled>
                          Outros
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-2 mr-4">
                        <Button>
                          <PlusCircleIcon className="mr-2 h-4 w-4" />
                          Criar Galeria
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value="photos"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Galeria de fotos
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Suas fotos com pixels novos :)
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <ImageUploadPlaceholder />
                        <ScrollArea>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-evenly">
                            {restoredImages?.map((restoredImage) => (
                              <UserAppImage
                                key={restoredImage.name}
                                image={restoredImage}
                                className="w-[15.625rem]"
                                aspectRatio="square"
                                width={250}
                                height={330}
                                publicUrl={publicUrl}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <Separator className="my-4" />
                    </TabsContent>
                    <TabsContent
                      value="document"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      {/* <PodcastEmptyPlaceholder /> */}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
