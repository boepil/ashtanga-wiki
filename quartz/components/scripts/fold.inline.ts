;(() => {
  const cleanup = typeof window.addCleanup === "function" ? window.addCleanup : (fn: () => void) => fn()

  document.addEventListener("nav", () => {
    try {
      const article = document.querySelector<HTMLElement>("article.popover-hint")
      if (!article) return

      const children = Array.from(article.children)
      let currentHeading: { element: Element; level: number } | null = null
      let currentWrapper: HTMLDivElement | null = null

      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement
        const tag = child.tagName

        if (tag.startsWith("H") && /^[1-6]$/.test(tag.substring(1))) {
          const level = parseInt(tag.substring(1))

          if (currentHeading && level <= currentHeading.level) {
            currentHeading = null
            currentWrapper = null
          }

          currentHeading = { element: child, level }

          currentWrapper = document.createElement("div")
          currentWrapper.className = "fold-content"
          child.after(currentWrapper)
          child.classList.add("fold-heading")

          const toggle = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest("a[role=anchor]")) return
            child.classList.toggle("is-collapsed")
            currentWrapper!.classList.toggle("is-collapsed")
          }

          child.addEventListener("click", toggle)
          cleanup(() => child.removeEventListener("click", toggle))
        } else if (currentWrapper) {
          currentWrapper.appendChild(child)
        }
      }
    } catch (err) {
      console.debug("Fold plugin error:", err)
    }
  })
})()
