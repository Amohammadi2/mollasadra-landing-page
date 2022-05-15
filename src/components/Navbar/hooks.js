import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import usePageScroll from "../../hooks/usePageScroll";
import { screens } from "../../shared/constants";

export function useHeaderState() {
  const { scrollY } = usePageScroll()
  const [showHeader, setShowHeader] = useState(true)

  useEffect(() => {
    if (scrollY >= 150) {
      setShowHeader(false)
    }
    else {
      setShowHeader(true)
    }
  }, [scrollY])

  return { showHeader }
}


export function useSidebarState() {
  const { width } = useWindowSize()
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (width <= screens['md']) {
      setShowSidebar(true)
    }
    else {
      setShowSidebar(false)
    }
    console.log(showSidebar)
  }, [width])

  return { showSidebar }
}

export function useHeaderContentState() {
  const [showDate, setShowDate] = useState(true)
  const [showFullText, setShowFullText] = useState(true)
  const [decreaseFontSize, setDecreaseFontSize] = useState(false)
  const { width } = useWindowSize()
  
  useEffect(() => {
    if (width <= 900) {
      setShowFullText(false)
    }
    else {
      setShowFullText(true)
    }

    if (width <= 670) {
      setShowDate(false)
    }
    else {
      setShowDate(true)
    }

    if (width <= 550) {
      setDecreaseFontSize(true)
    }
    else {
      setDecreaseFontSize(false)
    }
  }, [width])

  return { showDate, showFullText, decreaseFontSize }
}