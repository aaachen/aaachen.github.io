import { randomUUID } from "crypto"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { TelescopicText as TelescopicTextData } from "../plugins/transformers/telescopic-text"

// TODO: Instead of component, Can move the telescopic text script to html plugin to directly insert it
function getTelescopicEventListener(telescopicTexts: TelescopicTextData[]): string {
  let populateTelescopic = telescopicTexts
    .map((t) => {
        return `
        node = createTelescopicTextFromBulletedList(\`${t.content}\`);
        container = document.getElementById(\`${t.id}\`);
        container.appendChild(node);
        `
    })
    .join("\n")

  return `
  const populateTelescopicHandler = () => {
      let node, container;
      ${populateTelescopic}
  }
  document.addEventListener("nav", populateTelescopicHandler);`
}

// hacky way to register the script, could do it in html to html transformation
const TelescopicText: QuartzComponent = ({ fileData, displayClass, cfg }: QuartzComponentProps) => {
  if (fileData.telescopicTexts && fileData.telescopicTexts.length > 0) {
    return (
      <script
        key={randomUUID()}
        type="application/javascript"
        spa-preserve={false}
        dangerouslySetInnerHTML={{ __html: getTelescopicEventListener(fileData.telescopicTexts) }}
      ></script>
    )
  }
  return null
}

export default (() => {
  return TelescopicText
}) satisfies QuartzComponentConstructor
