import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { RedirectType } from "next/dist/client/components/redirect"
import { UserNav } from "@/components/common/user-nav"


export default async function UserApp() {
    let loggedIn = false

  try {
    
    const supabase = createServerComponentClient({cookies})
    
    const { data: { session },} = await supabase.auth.getSession()

    if(session) loggedIn = true

  } catch (error) {

    console.log("Home", error)

  } finally {

    if(!loggedIn) redirect("/", RedirectType.replace)

  }

    return <h1>
            <UserNav />
        </h1>
}