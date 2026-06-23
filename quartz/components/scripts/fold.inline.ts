;(() => {
  document.addEventListener("nav", () => {
    try {
      const article = document.querySelector<HTMLElement>("article.popover-hint")
      if (!article) return

      const children = Array.from(article.children)
      let stack: { level: number; wrapper: HTMLDivElement }[] = []

      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement
        const tag = child.tagName

        if (tag.startsWith("H") && /^[2-6]$/.test(tag.substring(1))) {
          const level = parseInt(tag.substring(1))

          while (stack.length > 0 && stack[stack.length - 1].level >= level) {
            stack.pop()
          }

          const currentWrapper = document.createElement("div")
          currentWrapper.className = "fold-content"
          
          if (stack.length > 0) {
            stack[stack.length - 1].wrapper.appendChild(child)
            stack[stack.length - 1].wrapper.appendChild(currentWrapper)
          } else {
            child.after(currentWrapper)
          }

          child.classList.add("fold-heading")

          // Inject arrow element (CSS content property gets mangled by Lightning CSS)
          const arrow = document.createElement("span")
          arrow.className = "fold-arrow"
          arrow.textContent = "\u25BC" // ▼ expanded
          child.prepend(arrow)

          const toggle = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest("a[role=anchor]")) return
            child.classList.toggle("is-collapsed")
            currentWrapper.classList.toggle("is-collapsed")
            arrow.textContent = child.classList.contains("is-collapsed") ? "\u25B6" : "\u25BC"
            const key = `fold:${location.pathname}:${child.textContent?.trim()}`
            try { sessionStorage.setItem(key, child.classList.contains("is-collapsed") ? "0" : "1") } catch {}
          }

          child.addEventListener("click", toggle)
          window.addCleanup(() => child.removeEventListener("click", toggle))

          stack.push({ level, wrapper: currentWrapper })
        } else if (stack.length > 0) {
          stack[stack.length - 1].wrapper.appendChild(child)
        }
      }

      document.querySelectorAll<HTMLElement>(
        "article.popover-hint .fold-heading"
      ).forEach(heading => {
        const key = `fold:${location.pathname}:${heading.textContent?.trim()}`
        let saved = "0"
        try { saved = sessionStorage.getItem(key) ?? "0" } catch {}
        const arrow = heading.querySelector<HTMLElement>(".fold-arrow")
        if (saved === "0") {
          heading.classList.add("is-collapsed")
          if (arrow) arrow.textContent = "\u25B6"
          const wrapper = heading.nextElementSibling
          if (wrapper?.classList.contains("fold-content")) {
            wrapper.classList.add("is-collapsed")
          }
        } else {
          if (arrow) arrow.textContent = "\u25BC"
        }
      })
    } catch (err) {
      console.debug("Fold plugin error:", err)
    }
  })
})()
