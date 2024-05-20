import { QuartzComponentConstructor, QuartzComponentProps, QuartzComponent } from "./types"
import { SimpleSlug, resolveRelative } from "../util/path"
import style from "./styles/sidenav.scss"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface Options {
  links: Link[]
}

type Link = [string, SimpleSlug]

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  links: [
    ["Writing", "/writings/" as SimpleSlug],
    ["Creation", "/Creations" as SimpleSlug],
    ["Notes", "/notes/" as SimpleSlug],
  ],
})

// about, writing, creations, notes, (featured)

export default ((userOpts?: Partial<Options>) => {
  const SideNav: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }

    return (
      <div class={classNames(displayClass, "side-nav")}>
        <ul class="nav-ul">
          {opts.links.map((linkTup) => {
            return (
              <li class="nav-li">
                <a href={linkTup[1]}>{linkTup[0]}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  SideNav.css = style
  return SideNav
}) satisfies QuartzComponentConstructor
