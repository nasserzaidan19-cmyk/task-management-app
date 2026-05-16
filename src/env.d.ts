/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // Add other env variables here as the project grows
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
