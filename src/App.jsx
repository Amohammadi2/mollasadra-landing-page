import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faClipboard, faDownload, faLocation, faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons"
import {
  NavbarContainer,
  NavbarHeader,
  NavbarLinksContainer,
  NavbarLink,
  NavbarSubLink,
} from "./components/Navbar"
import { Swiper, SwiperSlide } from "swiper/react"
import { ToastContainer, toast } from "react-toastify"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { useEffect, useRef, useState } from "react"
import { useWindowSize } from "react-use"
import { screens } from "./shared/constants"
import { ReactComponent as GrayWave } from "./assets/svgs/gray-wave.svg"
import { ReactComponent as PurpleWave } from "./assets/svgs/purple-wave.svg"
import { ReactComponent as LibraryIcon } from "./assets/svgs/library-icon.svg"
import { ReactComponent as BallIcon } from "./assets/svgs/ball.svg"
import L from "leaflet"
import FeaturesBG  from "./assets/features-bg.png"
import "swiper/css"
import "swiper/css/a11y"
import "swiper/css/controller"
import "swiper/css/pagination"
import "swiper/css/navigation"
import 'react-toastify/dist/ReactToastify.css'


function showToast() {
  toast('هنوز داریم روش کار می کنیم', {
    position: "bottom-center",
    theme: "dark",
    rtl: true,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

function ToggleMenuButton({ toggleFn, ...props }) {
  return (
    <span
      className="
        flex justify-center items-center ml-3 h-[40px] w-[40px]
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

  const mapContainerRef = useRef(null)
  const schoolLocation = [35.672362489915976, 51.489943005909694]

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: schoolLocation,
        zoom: 16,
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker(schoolLocation).addTo(map)
		    .bindPopup('دبیرستان هیئت امنایی ملاصدرا').openPopup();
    }
  }, [mapContainerRef])

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavbarContainer ref={navbarContainerRef}>
        {/* Todo: merge `NavbarHeader` and `NavbarContainer` into a single component */}
        <NavbarHeader>
          <h1 className="text-xl leading-[34px] flex">
            {width < screens["md"] && (
              <ToggleMenuButton
                toggleFn={() => setIsNavbarOpen(!isNavbarOpen)}
              />
            )}
            دبیسرتان هیئت امنایی ملاصدرا
          </h1>
          <NavbarLinksContainer 
            isOpen={isNavbarOpen}
            toggleOpen={() => setIsNavbarOpen(!isNavbarOpen)}
          >
            <NavbarLink text="معاونت">
              <NavbarSubLink text="معاونت آموزشی" />
              <NavbarSubLink text="معاونت پرورشی" />
            </NavbarLink>
            <NavbarLink text="درباره ما" />
            <NavbarLink text="امکانات" />
            <NavbarLink text="گالری" />
            <NavbarLink text="تالار افتخارات" />
            <NavbarLink text="نظرات" />
          </NavbarLinksContainer>
          <Loginlink text="ورود"/>
        </NavbarHeader>
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
          style={{height: `calc(100vh - ${navbarCurrentHeight}px)`}}
        >
          <SwiperSlide className="w-96 flex justify-center items-center bg-slate-100 flex-shrink-0">hello world</SwiperSlide>
          <SwiperSlide className="w-96 flex justify-center items-center bg-slate-200 flex-shrink-0">hello world</SwiperSlide>
          <SwiperSlide className="w-96 flex justify-center items-center bg-slate-300 flex-shrink-0">hello world</SwiperSlide>
          <SwiperSlide className="w-96 flex justify-center items-center bg-slate-400 flex-shrink-0">hello world</SwiperSlide>
          <SwiperSlide className="w-96 flex justify-center items-center bg-slate-500 flex-shrink-0">hello world</SwiperSlide>
          <SwiperSlide className="w-96 flex justify-center items-center bg-slate-600 flex-shrink-0">hello world</SwiperSlide>
        </Swiper>
      </div>
      {/* Review: should we turn this into a `ContentContainer` component? */}
      <section className="mt-12 pr-12 pl-12 md:pr-28 md:pl-28 lg:pr-48 lg:pl-48 mb-7">
        <h1 className="text-5xl text-center">
          درباره ما
        </h1>
        <p className="mt-8 leading-loose">
          دبیرستان ملاصدرا یکی از دبیرستان های دولتی منطقه ۱۴ است که با رویکرد علمی_پرورشی اداره می گردد. دغدغه اصلی اعضای هیئت امنا و عوامل اجرایی دبیرستان, تربیت دانش آموزان کوشا در مسائل آموزشی و توانمند در مسائل اعتقادی می باشد. 
          در کنار فعالیتهای آموزشی که همه ساله منجر به کسب رتبه برتر امتحانات نهایی در بین مدارس سطح منطقه و موفقیت دانش آموزان در آزمون سراسری دانشگاه های کشور می شود, تلاش های پرورشی در سه سطح عام (کلیه دانش آموزان دبیرستان ), سطح خاص(فعالیتهای تفریحی اعتقادی در طرح عمار ) و هیئت محبان الائمه (رهروان امام و شهدا) می باشد.
          از مجموعه فعالیت های پرورشی دبیرستان طرح مطالعاتی اندیشه برتر, با رویکرد مطالعه کتب شهید مطهری و آثار مقام معظم رهبری وکسب عناوین برتر مسابقات فرهنگی و هنری ادبی و قرآن و عترت دانش آموزی در سطح منطقه و شهر تهران و ...می باشد .
        </p>
      </section>
      {/* Review: should we turn this into a `SectionContainer` component? */}
      <div className="relative mt-96 pb-52" style={{backgroundColor: "#FAFAFA"}}>
        <GrayWave className="absolute" style={{transform: "translateY(-210px)"}} />
        {/* Review: should we turn this into a `ContentContainer` component? */}
        <section className="pr-12 pl-12 md:pr-28 md:pl-28 lg:pr-48 lg:pl-48">
          <h1 className="text-4xl text-center md:text-right md:mr-24" style={{transform: "translateY(-80px)"}}>
            معاونت پرورشی
          </h1>
          <p className="leading-loose">
            دبیرستان ملاصدرا یکی از دبیرستان های دولتی منطقه ۱۴ است که با رویکرد علمی_پرورشی اداره می گردد. دغدغه اصلی اعضای هیئت امنا و عوامل اجرایی دبیرستان, تربیت دانش آموزان کوشا در مسائل آموزشی و توانمند در مسائل اعتقادی می باشد. 
            در کنار فعالیتهای آموزشی که همه ساله منجر به کسب رتبه برتر امتحانات نهایی در بین مدارس سطح منطقه و موفقیت دانش آموزان در آزمون سراسری دانشگاه های کشور می شود, تلاش های پرورشی در سه سطح عام (کلیه دانش آموزان دبیرستان ), سطح خاص(فعالیتهای تفریحی اعتقادی در طرح عمار ) و هیئت محبان الائمه (رهروان امام و شهدا) می باشد.
            از مجموعه فعالیت های پرورشی دبیرستان طرح مطالعاتی اندیشه برتر, با رویکرد مطالعه کتب شهید مطهری و آثار مقام معظم رهبری وکسب عناوین برتر مسابقات فرهنگی و هنری ادبی و قرآن و عترت دانش آموزی در سطح منطقه و شهر تهران و ...می باشد .
          </p>
        </section>
      </div>
      {/* Review: should we turn this into a `SectionContainer` component? */}
      <div className="relative text-white pb-12" style={{backgroundColor: "#5F83F2"}}>
        <PurpleWave className="absolute z-0" style={{transform: "translateY(-110px)"}} />
        <section className="pr-12 pl-12 md:pr-28 md:pl-28 lg:pr-48 lg:pl-48">
          <h1 className="text-4xl text-center md:text-right pt-12 mb-10">
            معاونت آموزشی
          </h1>
          {/* Todo: turn this into a `DownloadBox` component */}
          <div className="w-full flex flex-row justify-between px-5 py-4 my-5 drop-shadow-lg rounded-lg bg-white text-black">
            <span>تقویم آموزشی دهم و یازدهم</span>
            <a href="#" className="text-blue-700" onClick={e=>{e.preventDefault();showToast()}}>
              <span className="ml-2">دانلود تقویم</span>
              <FontAwesomeIcon icon={faDownload} />
            </a>
          </div>
          <div className="w-full flex flex-row justify-between px-5 py-4 my-5 drop-shadow-lg rounded-lg bg-white text-black">
            <span>تقویم آموزشی دوازدهم</span>
            <a href="#" className="text-blue-700" onClick={e=>{e.preventDefault();showToast()}}>
              <span className="ml-2">دانلود تقویم</span>
              <FontAwesomeIcon icon={faDownload} />
            </a>
          </div>
        </section>
      </div>
      <div 
        className="w-full min-h-[400px] flex justify-center items-center px-10 py-5 md:px-24 lg:px-56" 
        style={{
          backgroundImage: `url(${FeaturesBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <section className="bg-[rgba(255,255,255,0.6)] rounded-lg drop-shadow-lg flex flex-col md:flex-row justify-center items-center w-full py-10 px-5">
          <div className="w-full basis-4/12 px-3 py-5 m-2 flex flex-col items-center bg-[rgba(255,255,255,0.94)] drop-shadow-lg rounded-lg">
            <BallIcon className="transition-all duration-75 ease-out hover:scale-125"/>
            <p className="mt-5">
              امکانات ورزشی
            </p>
          </div>
          <div className="w-full basis-4/12 px-3 py-5 m-2 flex flex-col items-center bg-[rgba(255,255,255,0.94)] drop-shadow-lg rounded-lg">
            <LibraryIcon className="transition-all duration-75 ease-out hover:scale-125"/>
            <p className="mt-5">
              کتابخانه
            </p>
          </div>
          <div className="w-full basis-4/12 px-3 py-5 m-2 flex flex-col items-center bg-[rgba(255,255,255,0.94)] drop-shadow-lg rounded-lg">
            <LibraryIcon className="transition-all duration-75 ease-out hover:scale-125"/>
            <p className="mt-5">
              امکانات ورزشی
            </p>
          </div>
        </section>
      </div>
      <section className="px-4 py-10 flex flex-col md:flex-row justify-center">
        <div className="basis:1/2 mx-4">
          <h1 className="text-3xl">مشخصات</h1>
          <div className="w-full flex flex-row justify-between px-5 py-4 my-5 drop-shadow-lg rounded-lg bg-white text-black">
            <FontAwesomeIcon icon={faLocation} className="ml-3" style={{verticalAlign: "middle", height: "24px"}} />
            <span>بزرگراه آیت ال... محلاتی، بلوار ابوذر، بین پل دوم و سوم، خیابان بوستان</span>
          </div>
          <div className="w-full flex flex-row justify-between px-5 py-4 my-5 drop-shadow-lg rounded-lg bg-white text-black">
            <button>
              <FontAwesomeIcon icon={faPhone} className="ml-3" style={{verticalAlign: "middle", height: "24px"}} />
            </button>
            <span>09904237001</span>
          </div>
        </div>
        <div className="basis-1/2 mx-4 bg-slate-100 h-96 rounded-lg" ref={mapContainerRef}></div>
      </section>
    </>
  );
}

export default App;
