import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import {
  NavbarContainer,
  NavbarHeader,
  NavbarLinksContainer,
  NavbarLink,
  NavbarSubLink,
} from "./components/Navbar"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { useEffect, useRef, useState } from "react"
import { useWindowSize } from "react-use"
import { screens } from "./shared/constants"
import "swiper/css"
import "swiper/css/a11y"
import "swiper/css/controller"
import "swiper/css/pagination"
import "swiper/css/navigation"


function ToggleMenuButton({ toggleFn, ...props }) {
  return (
    <span
      className="
        flex justify-center items-center ml-6 h-[40px] w-[40px]
        transition-all duration-75 ease-out
        active:bg-[rgba(256,256,256,0.4)]
        hover:bg-[rgba(256,256,256,0.15)] rounded-full
      "
      onClick={() => toggleFn()}
    >
      <FontAwesomeIcon
        icon={faBars}
        className="cursor-pointer"
        style={{
          verticalAlignment: "middle",
        }}
      />
    </span>
  );
}

function Loginlink({ text, ...props }) {
  return (
    <a
      href="https://mollasadraschool.ir"
      target="_blank"
      className="
        flex justify-center items-center
        cursor-pointer pr-5 pl-5 rounded-lg pb-1 box-border
        bg-white text-gray-900 hover:bg-gray-200 hover:drop-shadow-lg
      "
    >
      <span className="text-lg">{text}</span>
    </a>
  );
}

function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { width } = useWindowSize();

  const navbarContainerRef = useRef(null)
  const [navbarCurrentHeight, setNavbarCurrentHeight] = useState(0)

  useEffect(() => {
    setNavbarCurrentHeight(navbarContainerRef.current.clientHeight)
  }, [width])

  return (
    <>
      <NavbarContainer ref={navbarContainerRef}>
        <NavbarHeader>
          <h1 className="text-2xl flex">
            {width < screens["md"] && (
              <ToggleMenuButton
                toggleFn={() => setIsNavbarOpen(!isNavbarOpen)}
              />
            )}
            دبیرستان ملاصدرا
          </h1>
          <Loginlink text="ورود"/>
        </NavbarHeader>
        <NavbarLinksContainer
          isOpen={isNavbarOpen}
          toggleOpen={() => setIsNavbarOpen(!isNavbarOpen)}
        >
          <NavbarLink text="معاونت">
            <NavbarSubLink text="معاونت آموزشی" />
            <NavbarSubLink text="معاونت پرورشی" />
          </NavbarLink>
          <NavbarLink text="درباره ما">
            <NavbarSubLink text="معرفی" />
            <NavbarSubLink text="امکانات" />
          </NavbarLink>
          <NavbarLink text="گالری" />
          <NavbarLink text="تالار افتخارات" />
          <NavbarLink text="نظرات" />
        </NavbarLinksContainer>
      </NavbarContainer>

      <div className="w-full" style={{marginTop: navbarCurrentHeight+"px"}}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        onSwiper={(swiper) => (window.swiper = swiper)}
        slidesPerView={1}
        spaceBetween={0}
        navigation
        loop
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
        className="h-96"
      >
        <SwiperSlide className="w-96 flex justify-center items-center bg-slate-100 flex-shrink-0">hello world</SwiperSlide>
        <SwiperSlide className="w-96 flex justify-center items-center bg-slate-200 flex-shrink-0">hello world</SwiperSlide>
        <SwiperSlide className="w-96 flex justify-center items-center bg-slate-300 flex-shrink-0">hello world</SwiperSlide>
        <SwiperSlide className="w-96 flex justify-center items-center bg-slate-400 flex-shrink-0">hello world</SwiperSlide>
        <SwiperSlide className="w-96 flex justify-center items-center bg-slate-500 flex-shrink-0">hello world</SwiperSlide>
        <SwiperSlide className="w-96 flex justify-center items-center bg-slate-600 flex-shrink-0">hello world</SwiperSlide>
      </Swiper>
      </div>
    </>
  );
}

export default App;
