import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"

export default (() => {
  const PageNavigation: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
    if (fileData.slug === "index") {
      return null
    }

    // Filter out index pages and sort by sequence for logical reading
    const sortedFiles = allFiles
      .filter((f) => f.slug !== "index" && !f.slug?.startsWith("tags/") && !f.slug?.startsWith("folder/"))
      .sort((a, b) => {
        const seqA = a.frontmatter?.sequence ?? 9999
        const seqB = b.frontmatter?.sequence ?? 9999
        if (seqA !== seqB) {
          return (seqA as number) - (seqB as number)
        }
        const titleA = a.frontmatter?.title ?? a.slug!
        const titleB = b.frontmatter?.title ?? b.slug!
        return titleA > titleB ? 1 : -1
      })

    const currentIndex = sortedFiles.findIndex((f) => f.slug === fileData.slug)
    
    if (currentIndex === -1) return null

    const prevPage = currentIndex > 0 ? sortedFiles[currentIndex - 1] : null
    const nextPage = currentIndex < sortedFiles.length - 1 ? sortedFiles[currentIndex + 1] : null

    return (
      <div class={classNames(displayClass, "page-navigation")}>
        {prevPage && (
          <a href={resolveRelative(fileData.slug!, prevPage.slug!)} class="nav-prev">
            <span class="nav-label">&larr; Previous</span>
            <span class="nav-title">{prevPage.frontmatter?.title ?? prevPage.slug}</span>
          </a>
        )}
        {nextPage && (
          <a href={resolveRelative(fileData.slug!, nextPage.slug!)} class="nav-next">
            <span class="nav-label">Next &rarr;</span>
            <span class="nav-title">{nextPage.frontmatter?.title ?? nextPage.slug}</span>
          </a>
        )}
      </div>
    )
  }

  PageNavigation.css = `
  .page-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--lightgray);
    gap: 2rem;
  }
  .page-navigation a.nav-prev, .page-navigation a.nav-next {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: var(--secondary);
    transition: color 0.2s ease, transform 0.2s ease;
    flex: 1;
    position: relative;
  }
  .page-navigation a:hover {
    color: var(--tertiary);
  }
  
  /* Text Styles */
  .nav-prev { text-align: left; }
  .nav-next { text-align: right; }
  .page-navigation span.nav-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    opacity: 0.7;
    font-weight: 500;
  }
  .nav-title {
    font-weight: 400;
    font-size: 0.9rem;
    margin-top: 0.2rem;
    opacity: 0.9;
  }
  `

  return PageNavigation
}) satisfies QuartzComponentConstructor
