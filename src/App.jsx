import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faDownload, faEnvelope, faLocation, faPhone } from "@fortawesome/free-solid-svg-icons"
import { Swiper, SwiperSlide } from "swiper/react"
import { ToastContainer, toast } from "react-toastify"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { useEffect, useRef, useState } from "react"
import { useWindowSize } from "react-use"
import { Navbar } from "./components/Navbar"
import { ReactComponent as GrayWave } from "./assets/svgs/gray-wave.svg"
import { ReactComponent as PurpleWave } from "./assets/svgs/purple-wave.svg"
import { ReactComponent as LibraryIcon } from "./assets/svgs/library-icon.svg"
import { ReactComponent as BallIcon } from "./assets/svgs/ball.svg"
import { ReactComponent as SoroushPlus } from "./assets/svgs/soroush-plus.svg"
import L from "leaflet"
import FeaturesBG  from "./assets/features-bg.png"
import  * as slideImgs from "./assets/slide-show"
import "swiper/css"
import "swiper/css/a11y"
import "swiper/css/controller"
import "swiper/css/pagination"
import "swiper/css/navigation"
import 'react-toastify/dist/ReactToastify.css'
import { SliderItem } from "./components/SliderItem"
import usePageScroll from "./hooks/usePageScroll"


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
        cursor-pointer px-4 rounded-lg pb-1 box-border
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
  const { scrollY } = usePageScroll();

  const navbarContainerRef = useRef(null)
  const [navbarCurrentHeight, setNavbarCurrentHeight] = useState(0)

  useEffect(() => {
    setNavbarCurrentHeight(navbarContainerRef.current.clientHeight-30)
  }, [width, scrollY])

  const mapContainerRef = useRef(null)
  const schoolLocation = [35.672362489915976, 51.489943005909694]

  useEffect(() => {
    if (mapContainerRef.current) {
      try { // throws error during HMR, thus is wrapped inside try-catch clause
        const map = L.map(mapContainerRef.current, {
          center: schoolLocation,
          zoom: 16,
        })
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
          foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker(schoolLocation).addTo(map)
          .bindPopup('دبیرستان هیئت امنایی ملاصدرا').openPopup();
      } catch (e) {}
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
      <Navbar ref={navbarContainerRef} />
      <div className="w-full" style={{marginTop: navbarCurrentHeight+"px"}}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          onSwiper={(swiper) => (window.swiper = swiper)}
          spaceBetween={0}
          navigation
          loop
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          style={{height: `calc(100vh - ${navbarCurrentHeight}px)`}}
        >
          {[
            [3, 'اردوی نفرات برتر آموزشی و پرورشی'],
            [15, 'مسجد جمکران'],
            [2, 'اردوی آشنایی دماوند'],
            [4, 'اردوی آشنایی دماوند'],
            [6, 'هیئت محبان الائمه'],
            [9, 'قرائت قرآن'],
            [11, 'مراسمات'],
            [12, 'سینما'],
            [13, ''],
            [14, 'اردوی نفرات برتر آموزشی و پرورشی']
          ].map(([index, description]) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <SliderItem index={index} description={description} isActive={isActive} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Review: should we turn this into a `SectionContainer` component? */}
      <div className="relative mt-36 pb-10" style={{backgroundColor: "#FAFAFA"}} id="parvareshi">
        {/* <GrayWave className="absolute" style={{transform: "translateY(-210px)"}} /> */}
        {/* Review: should we turn this into a `ContentContainer` component? */}
        <section className="pr-12 pl-12 md:pr-28 md:pl-28 lg:pr-48 lg:pl-48">
          <h1 className="text-4xl text-center md:text-right md:mr-24" style={{transform: "translateY(-80px)"}}>
            درباره ما
          </h1>
          <p className="leading-loose">
            دبیرستان ملاصدرا یکی از دبیرستان های دولتی منطقه ۱۴ است که با رویکرد علمی_پرورشی اداره می گردد. دغدغه اصلی اعضای هیئت امنا و عوامل اجرایی دبیرستان, تربیت دانش آموزان کوشا در مسائل آموزشی و توانمند در مسائل اعتقادی می باشد. 
            در کنار فعالیتهای آموزشی که همه ساله منجر به کسب رتبه برتر امتحانات نهایی در بین مدارس سطح منطقه و موفقیت دانش آموزان در آزمون سراسری دانشگاه های کشور می شود, تلاش های پرورشی در سه سطح عام (کلیه دانش آموزان دبیرستان ), سطح خاص(فعالیتهای تفریحی اعتقادی در طرح عمار ) و هیئت محبان الائمه (رهروان امام و شهدا) می باشد.
            از مجموعه فعالیت های پرورشی دبیرستان طرح مطالعاتی اندیشه برتر, با رویکرد مطالعه کتب شهید مطهری و آثار مقام معظم رهبری وکسب عناوین برتر مسابقات فرهنگی و هنری ادبی و قرآن و عترت دانش آموزی در سطح منطقه و شهر تهران و ...می باشد .
          </p>
        </section>
      </div>
      {/* Review: should we turn this into a `SectionContainer` component? */}
      <div className="relative text-white pb-12" style={{backgroundColor: "#5F83F2"}} id="amoozeshi">
        {/* <PurpleWave className="absolute z-0" style={{transform: "translateY(-110px)"}} /> */}
        <section className="pr-12 pl-12 md:pr-28 md:pl-28 lg:pr-48 lg:pl-48">
          <h1 className="text-4xl text-center md:text-right pt-12 mb-10">
            معاونت آموزشی
          </h1>
          {/* Todo: turn this into a `DownloadBox` component */}
          <div className="w-full flex flex-row justify-between px-5 py-4 my-5 drop-shadow-lg rounded-lg bg-white text-black text-sm md:text-base">
            <span>تقویم آموزشی دهم و یازدهم</span>
            <a href="#" className="text-blue-700" onClick={e=>{e.preventDefault();showToast()}}>
              <span className="ml-2">دانلود تقویم</span>
              <FontAwesomeIcon icon={faDownload} />
            </a>
          </div>
          <div className="w-full flex flex-row justify-between px-5 py-4 my-5 drop-shadow-lg rounded-lg bg-white text-black text-sm md:text-base">
            <span>تقویم آموزشی دوازدهم</span>
            <a href="#" className="text-blue-700" onClick={e=>{e.preventDefault();showToast()}}>
              <span className="ml-2">دانلود تقویم</span>
              <FontAwesomeIcon icon={faDownload} />
            </a>
          </div>
        </section>
      </div>
      <div
        id="features"
        className="w-full min-h-[400px] flex justify-center items-center px-10 py-5 md:px-24 lg:px-56" 
        style={{
          backgroundImage: `url(${FeaturesBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          overflow: "hidden"
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
      <section className="px-4 py-10 flex flex-col md:flex-row justify-center" id="stats">
        <div className="basis-full md:basis-1/2 mx-4">
          <h1 className="text-3xl">مشخصات</h1>
          { /* Todo: Turn this component into a `InfoItem` component */ }
          <div className="w-full flex flex-row justify-between px-5 py-4 my-5 drop-shadow-lg rounded-lg bg-white text-black">
            <span>آدرس: بزرگراه آیت ال... محلاتی، بلوار ابوذر، بین پل دوم و سوم، خیابان بوستان</span>
            <FontAwesomeIcon icon={faLocation} className="ml-3" style={{verticalAlign: "middle", height: "24px"}} />
          </div>
          <div className="w-full flex flex-row justify-between px-5 py-4 my-5 drop-shadow-lg rounded-lg bg-white text-black">
            <span>شماره تلفن: 09904237001</span>
            <button>
              <FontAwesomeIcon icon={faPhone} className="ml-3" style={{verticalAlign: "middle", height: "24px"}} />
            </button>
          </div>
          <div className="w-full flex flex-row justify-between px-5 py-4 my-5 drop-shadow-lg rounded-lg bg-white text-black">
            <span>@mollasadra_highschool</span>
            <button>
              <SoroushPlus style={{verticalAlign: "middle", height: "24px"}} />
            </button>
          </div>
          <div className="w-full flex flex-row justify-between px-5 py-4 my-5 drop-shadow-lg rounded-lg bg-white text-black">
            <span>کد پستی: 1766814573</span>
            <button>
              <FontAwesomeIcon icon={faEnvelope} className="ml-3" style={{verticalAlign: "middle", height: "24px"}} />
            </button>
          </div>
        </div>
        <div className="basis-1/2 px-4 w-full rounded-lg">
          <div className="w-full h-96" ref={mapContainerRef}></div>
        </div>
      </section>
    </>
  );
}

export default App;
