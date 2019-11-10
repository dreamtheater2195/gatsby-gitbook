/** @jsx jsx */
import { jsx, css } from "theme-ui"
import styled from "@emotion/styled"
import OpenedSvg from "./../../images/opened"
import ClosedSvg from "./../../images/closed"
import config from "./../../../config"
import { navigate } from "gatsby"
import { useAppContext } from "./../../index"

const StyledLi = styled("li")(
  css({
    listStyle: "none",
    padding: 0,
  }),
  props =>
    props.level >= 2 &&
    css({
      ml: 2,
      borderLeft: "1px solid transparent",
      borderLeftColor: "lightgray",
    })
)

const TreeNode = ({
  className = "",
  setCollapsed,
  collapsed,
  url,
  title,
  items,
  level,
}) => {
  const { setOpen } = useAppContext()

  const isCollapsed = collapsed[url]
  const collapse = () => {
    setCollapsed(url)
  }
  const hasChildren = items.length !== 0
  let location
  if (typeof document != "undefined") {
    location = document.location
  }
  const active =
    location &&
    (location.pathname === url ||
      location.pathname === config.gatsby.pathPrefix + url)

  const navigateToUrl = () => {
    setOpen(false)
    navigate(url)
  }
  return (
    <StyledLi level={level}>
      {title && (
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            color: "#fff",
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: 1.5,
            width: "100%",
            py: 2,
            px: 3,
            backgroundColor: active && "secondary",
            "&:hover": {
              backgroundColor: "secondary",
            },
          }}
          onClick={navigateToUrl}
        >
          <span>{title}</span>
          {hasChildren ? (
            <button
              onClick={collapse}
              sx={{
                background: "transparent",
                border: "none",
                outline: "none",
                mt: 2,
                zIndex: 1,
                "& svg": {
                  fill: "#fff",
                },
              }}
            >
              {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
            </button>
          ) : null}
        </div>
      )}

      {!isCollapsed && hasChildren ? (
        <ul sx={{ padding: 0, margin: 0 }}>
          {items.map(item => (
            <TreeNode
              key={item.url}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              isChild={true}
              level={level + 1}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </StyledLi>
  )
}
export default TreeNode
