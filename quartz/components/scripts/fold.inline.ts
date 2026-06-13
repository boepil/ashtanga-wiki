document.addEventListener("nav", () => {
  const article = document.querySelector("article.popover-hint")
  if (!article) return

  const toProcess: { heading: Element; content: Element[] }[] = []
  let currentHeading: Element | null = null
  let currentContent: Element[] = []

  for (const child of article.children) {
    const tag = child.tagName
    if (tag === "H3" || tag === "H2") {
      if (currentHeading && tag === "H3") {
        toProcess.push({ heading: currentHeading, content: currentContent })
      }
      currentHeading = child
      currentContent = []
      if (tag === "H2") {
        currentHeading = null
      }
    } else if (currentHeading) {
      currentContent.push(child as Element)
    }
  }
  if (currentHeading) {
    toProcess.push({ heading: currentHeading, content: currentContent })
  }

  for (const { heading, content } of toProcess) {
    if (content.length === 0) continue

    const wrapper = document.createElement("div")
    wrapper.className = "fold-content"
    for (const el of content) {
      wrapper.appendChild(el)
    }
    heading.after(wrapper)
    heading.classList.add("fold-heading")

    const toggle = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("a[role=anchor]")) return
      heading.classList.toggle("is-collapsed")
      wrapper.classList.toggle("is-collapsed")
    }

    heading.addEventListener("click", toggle)
    window.addCleanup(() => heading.removeEventListener("click", toggle))
  }
})
