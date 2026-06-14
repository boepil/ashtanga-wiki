import { QuartzTransformerPlugin } from "../types"
// @ts-ignore
import foldScript from "../../components/scripts/fold.inline"
import { JSResource, CSSResource } from "../../util/resources"

export interface Options {
  enableFold: boolean
}

const defaultOptions: Options = {
  enableFold: true,
}

export const Fold: QuartzTransformerPlugin<Options> = (opts) => {
  const opts_ = { ...defaultOptions, ...opts }

  return {
    name: "Fold",
    externalResources() {
      const js: JSResource[] = []
      const css: CSSResource[] = []

      if (opts_.enableFold) {
        js.push({
          script: foldScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
        })

        css.push({
          content: `article.popover-hint .fold-heading {
    cursor: pointer;
    user-select: none;
  }
  article.popover-hint .fold-heading::before {
    content: "\\25B6";
    display: inline-block;
    margin-right: 0.5em;
    font-size: 0.8em;
    transition: transform .2s ease;
    color: var(--gray);
  }
  article.popover-hint .fold-heading.is-collapsed::before {
    content: "\\25BC";
  }
  article.popover-hint .fold-content.is-collapsed {
    display: none;
  }`,
          inline: true,
        })
      }

      return { js, css }
    },
  }
}
