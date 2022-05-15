import { useEffect, useState } from "react";
import usePageScroll from "../../hooks/usePageScroll";

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