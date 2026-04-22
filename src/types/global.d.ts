// CSS module declarations
declare module '*.css' {
  const content: Record<string, string>
  export default content
}

// Allow side-effect CSS imports (globals.css)
declare module '*/globals.css'
