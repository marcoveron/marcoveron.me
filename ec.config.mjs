import { defineEcConfig } from "astro-expressive-code"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"

/**
 * El bloque de código vive dentro de una página de papel, así que no se
 * comporta como una ventana de terminal: nada de fondo oscuro ni marco. Es un
 * bloque sangrado, marcado solo por un filete a la izquierda, con el mismo
 * papel de fondo que el resto del texto.
 */
export default defineEcConfig({
  themes: ["github-light"],
  useThemedScrollbars: false,
  useThemedSelectionColors: false,
  styleOverrides: {
    codeFontFamily: "Geist Mono Variable, monospace",
    codeFontSize: "0.875rem",
    codeLineHeight: "1.7",
    uiFontFamily: "Geist Mono Variable, monospace",
    uiFontSize: "0.75rem",

    borderWidth: "0",
    borderRadius: "0",
    borderColor: "transparent",
    codeBackground: "var(--flexoki-base-50)",
    codePaddingBlock: "1rem",
    codePaddingInline: "1.25rem",

    frames: {
      // Sin cromo de ventana: ni luces de semáforo ni sombra
      shadowColor: "transparent",
      frameBoxShadowCssValue: "none",
      editorActiveTabBackground: "var(--flexoki-base-100)",
      editorActiveTabForeground: "var(--flexoki-base-600)",
      editorActiveTabBorderBottom: "transparent",
      editorActiveTabIndicatorBottomColor: "var(--flexoki-red-600)",
      editorActiveTabIndicatorTopColor: "transparent",
      editorTabBarBackground: "var(--flexoki-base-50)",
      editorTabBarBorderBottomColor: "var(--flexoki-base-150)",
      editorBackground: "var(--flexoki-base-50)",
      terminalBackground: "var(--flexoki-base-50)",
      terminalTitlebarBackground: "var(--flexoki-base-100)",
      terminalTitlebarForeground: "var(--flexoki-base-600)",
      terminalTitlebarBorderBottomColor: "var(--flexoki-base-150)",
      terminalTitlebarDotsForeground: "transparent",
      terminalTitlebarDotsOpacity: "0",
      inlineButtonForeground: "var(--flexoki-base-600)",
    },

    lineNumbers: {
      foreground: "var(--flexoki-base-300)",
      highlightForeground: "var(--flexoki-base-600)",
    },
  },
  plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
  defaultProps: {
    // Disable line numbers by default
    showLineNumbers: false,

    // Change the default style of ExpressiveCode collapsible section plugin
    collapseStyle: "collapsible-auto",
  },
})
