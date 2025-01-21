/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_DB_HOST: string;
    readonly VITE_DB_USER: string;
    readonly VITE_DB_PASSWORD: string;
    readonly VITE_DB_NAME: string;
    readonly VITE_API_KEY_WEATHER: string;
    readonly VITE_EMAILJS_PUBLIC_KEY: string;
    readonly VITE_EMAILJS_SERVICE_ID: string;
    readonly VITE_EMAILJS_TEMPLATE_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}