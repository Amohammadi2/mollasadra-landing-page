import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCaretDown, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import Imam from '../assets/imam.png'
import { screens } from '../shared/constants'


export function NavbarContainer({ children, ...props }) {
  return (
    <div className="fixed top-0 left-0 right-0 flex flex-col bg-blue-500 text-white">
      {children}
    </div>
  )
}

export function NavbarHeader({ children, ...props }) {
  return (
    <div className="flex justify-between pt-3 pb-3 pr-8 pl-8">
      {children}
    </div>
  )
}

  
export function NavbarLinksContainer({ children, isOpen, toggleOpen, ...props }) {
  const { width } = useWindowSize()

  return (
    <div className="flex flex-row text-white file:overflow-visible">
      {width < screens['md'] && isOpen &&
        <div 
          className="fixed w-full h-screen z-10" 
          style={{backgroundColor: "rgba(0,0,0,.7)"}}
          onClick={()=>toggleOpen()}
        />
      }
      <div
        className="
          flex flex-col fixed top-0 left-0 h-screen w-48 z-20 pr-3 pl-3 pt-3 pb-3 overflow-visible bg-blue-400
          md:static md:flex-grow md:justify-center md:flex-row md:h-fit md:w-auto md:bg-transparent
        "
        style={{
          transform: width < screens['md'] && (isOpen ? 'translateX(0)' : 'translateX(-120%)')
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function NavbarLink({ children, to, text, ...props }) {

  const [showSubLinks, setShowSubLinks] = useState(false)

  return (
    <div className="relative mr-2 ml-2 cursor-pointer transition-all duration-75 ease-out">
      <div className="peer pr-2 pl-2 pt-1 pb-1 mb-2 rounded-lg
        transition-all duration-75 ease-out
       hover:bg-[rgba(256,256,256,0.15)]">
        {children && 
          <span onClick={()=>setShowSubLinks(!showSubLinks)}>
            {showSubLinks
              ? <FontAwesomeIcon icon={faCaretDown} className="ml-3" />
              : <FontAwesomeIcon icon={faCaretLeft} className="ml-3" />
            }
          </span>
        }
        <a href={to}>{text}</a>
      </div>
      {children && showSubLinks && 
        <div 
          className={`
            text-black flex flex-col rounded-lg mb-3 drop-shadow-lg
            md:absolute md:top-full md:w-48
          `}
          style={{
            backgroundColor: "rgb(250, 250, 250)",
          }}
        >
          {children}
        </div>
      }
    </div>
  )
}

export function NavbarSubLink({ to, text }) {
  return (
    <a href={to} className="pr-3 pl-3 pt-2 pb-2 hover:text-blue-700">{text}</a>
  )
}
