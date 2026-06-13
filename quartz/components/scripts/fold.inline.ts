document.addEventListener("nav", () => {
  const article = document.querySelector("article.popover-hint")
  if (!article) return

  const children = Array.from(article.children)
  let currentHeading = null
  let currentWrapper = null

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const tag = child.tagName
    
    if (tag.startsWith("H") && /^[1-6]$/.test(tag.substring(1))) {
      const level = parseInt(tag.substring(1))
      
      if (currentHeading && level <= currentHeading.level) {
        currentHeading = null
        currentWrapper = null
      }
      
      currentHeading = { element: child, level: level }
      
      currentWrapper = document.createElement("div")
      currentWrapper.className = "fold-content"
      child.after(currentWrapper)
      child.classList.add("fold-heading")
      
      const toggle = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.closest("a[role=anchor]")) return
        child.classList.toggle("is-collapsed")
        currentWrapper.classList.toggle("is-collapsed")
      }
      
      child.addEventListener("click", toggle)
      window.addCleanup(() => child.removeEventListener("click", toggle))
    } else if (currentWrapper) {
      currentWrapper.appendChild(child)
    }
  }
})
