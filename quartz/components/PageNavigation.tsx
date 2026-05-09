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
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--lightgray);
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
  
  /* Bottom Text Styles */
  .nav-prev { text-align: left; }
  .nav-next { text-align: right; }
  .page-navigation span.nav-label {
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

  /* Floating Side Arrows (Desktop) */
  @media all and (min-width: 1000px) {
    .page-navigation a::before {
      content: '';
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: var(--gray);
      background: var(--light);
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      z-index: 100;
      transition: all 0.2s ease;
    }
    .page-navigation a.nav-prev::before {
      content: '←';
      left: calc(50% - 460px); /* 800px/2 + padding */
    }
    .page-navigation a.nav-next::before {
      content: '→';
      right: calc(50% - 460px);
    }
    .page-navigation a:hover::before {
      color: var(--tertiary);
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    }
  }
  `

  return PageNavigation
}) satisfies QuartzComponentConstructor
