import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Ashtanga Wiki",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "boepil.github.io/ashtanga-wiki",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Lora",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FAFAF9", // neutral
          lightgray: "#F5F5F4", // surface
          gray: "#D6D3D1", // subtle border
          darkgray: "#57534E", // secondary (body text)
          dark: "#1C1917", // primary (headings)
          secondary: "#B45309", // tertiary (links, amber)
          tertiary: "#92400E", // sanskrit color for accents
          highlight: "rgba(180, 83, 9, 0.15)", // amber highlight
          textHighlight: "#FFFBEB", // controversy flag yellow
        },
        darkMode: {
          light: "#1C1917", // dark background (warm gray)
          lightgray: "#292524", // surface
          gray: "#57534E", // subtle border
          darkgray: "#D6D3D1", // secondary (body text)
          dark: "#FAFAF9", // primary (headings)
          secondary: "#D97706", // tertiary (links, amber 600)
          tertiary: "#F59E0B", // sanskrit color for accents (amber 500)
          highlight: "rgba(217, 119, 6, 0.15)", // amber highlight
          textHighlight: "#453411", // controversy flag yellow (dark)
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
