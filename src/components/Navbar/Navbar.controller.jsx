import { useState } from "react";
import { useWindowSize } from "react-use";
import { forwardRef } from "react/cjs/react.production.min";
import NavbarView from "./Navbar.view";

export default forwardRef(function NavbarController(props,  ref) {
  const { width } = useWindowSize()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NavbarView windowWidth={width} ref={ref} />
  )
})