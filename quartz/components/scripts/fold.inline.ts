;(() => {
  const cleanup = typeof window.addCleanup === "function" ? window.addCleanup : (fn: () => void) => fn()

  document.addEventListener("nav", () => {
    try {
      const article = document.querySelector<HTMLElement>("article.popover-hint")
      if (!article) return

      const children = Array.from(article.children)
      let stack: { level: number; wrapper: HTMLDivElement }[] = []

      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement
        const tag = child.tagName

        if (tag.startsWith("H") && /^[1-6]$/.test(tag.substring(1))) {
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

          const toggle = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest("a[role=anchor]")) return
            child.classList.toggle("is-collapsed")
            currentWrapper.classList.toggle("is-collapsed")
          }

          child.addEventListener("click", toggle)
          cleanup(() => child.removeEventListener("click", toggle))

          stack.push({ level, wrapper: currentWrapper })
        } else if (stack.length > 0) {
          stack[stack.length - 1].wrapper.appendChild(child)
        }
      }
    } catch (err) {
      console.debug("Fold plugin error:", err)
    }
  })
})()
