import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"

export default (() => {
  const PageNavigation: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
    if (fileData.slug === "index") {
      return null
    }

    // Filter out index pages and sort by title for a logical reading sequence
    const sortedFiles = allFiles
      .filter((f) => f.slug !== "index" && !f.slug?.startsWith("tags/") && !f.slug?.startsWith("folder/"))
      .sort((a, b) => {
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
            <span>&larr; Previous</span>
            <span class="nav-title">{prevPage.frontmatter?.title ?? prevPage.slug}</span>
          </a>
        )}
        {nextPage && (
          <a href={resolveRelative(fileData.slug!, nextPage.slug!)} class="nav-next">
            <span>Next &rarr;</span>
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
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--lightgray);
    gap: 2rem;
  }
  .page-navigation a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: var(--secondary);
    transition: color 0.2s ease;
    flex: 1;
  }
  .page-navigation a:hover {
    color: var(--tertiary);
  }
  .nav-prev {
    text-align: left;
  }
  .nav-next {
    text-align: right;
  }
  .page-navigation span:first-child {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.8;
  }
  .nav-title {
    font-weight: 600;
    font-size: 1.1rem;
    margin-top: 0.25rem;
  }
  `

  return PageNavigation
}) satisfies QuartzComponentConstructor
