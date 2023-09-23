declare global {

    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_SUPABASE_URL: string;
            NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
            REPLICATE_APi_TOKEN: string;
            NEXT_PUBLIC_SUPABASE_IMAGE_FOLDER: string;
            NEXT_PUBLIC_SUPABASE_IMAGE_FOLDER_RESTORED: string;
            NEXT_PUBLIC_SUPABASE_IMAGE_FOLDER_PROCESSING: string;
            NEXT_PUBLIC_SUPABASE_IMAGE_PUBLIC_URL: string;
            NEXT_PUBLIC_SUPABASE_IMAGE_URL: string;
        }
    }
}

export {}