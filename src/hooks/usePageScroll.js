import { useEffect, useState } from "react"

export default function usePageScroll() {

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // just register an event listener and give me the Y scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    
    return () => window.removeEventListener("scroll", handleScroll)
  })

  return { scrollY }
}