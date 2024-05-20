import { QuartzTransformerPlugin } from "../types"

export interface TelescopicText {
  id: string
  content: string
}

let telescopicTexts: TelescopicText[] = []

const telescopicTextDataRegex =
  /<telescopic>[\n\r\s]+<id>(.*?)<\/id>[\n\r\s]+<content>(.*?)<\/content>[\n\r\s]+<\/telescopic>/gs
const extractTelescopicText = (str: string): TelescopicText[] => {
  const results = []
  let matches = telescopicTextDataRegex.exec(str)
  while (matches !== null) {
    const id = matches[1].trim()
    const content = matches[2].trim()
    results.push({ id, content })
    matches = telescopicTextDataRegex.exec(str)
  }
  return results
}

export const AddTelescopicText: QuartzTransformerPlugin = () => {
  return {
    name: "AddTelescopicText",
    textTransform(_ctx, src) {
      if (src instanceof Buffer) {
        src = src.toString()
      }
      telescopicTexts = extractTelescopicText(src)
      src = src.replace(telescopicTextDataRegex, "")
      return src
    },
    markdownPlugins() {
      return [
        () => {
          return (tree, file) => {
            // tree is an `mdast` root element
            // file is a `vfile`
            file.data.telescopicTexts = telescopicTexts
          }
        },
      ]
    },
    // TODO: Instead of component, Can move the telescopic text script to html plugin to directly insert it
    externalResources() {
      return {
        css: [
          // base css
          "https://unpkg.com/telescopic-text/lib/index.css",
        ],
        js: [
          {
            src: "https://unpkg.com/telescopic-text/lib/index.js",
            loadTime: "beforeDOMReady",
            contentType: "external",
          },
        ],
      }
    },
  }
}

// tell typescript about our custom data fields we are adding
// other plugins will then also be aware of this data field
declare module "vfile" {
  interface DataMap {
    telescopicTexts: TelescopicText[]
  }
}
