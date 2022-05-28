import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faDownload, faEnvelope, faLocation, faPhone } from "@fortawesome/free-solid-svg-icons"
import { Swiper, SwiperSlide } from "swiper/react"
import { ToastContainer, toast } from "react-toastify"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { useEffect, useRef, useState, Suspense } from "react"
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
import FeatureCard from "./components/FeatureCard/FeatureCard.view"
import Button from "./components/Button"




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
    
      <section className="flex flex-col md:flex-row w-full" id="aboutus">
        <div className="flex-grow basis-8/12 lg:basis-10/12 px-6 py-3">
          <h1 className="text-3xl mb-5">درباره ما</h1>
          <p className="leading-loose">
            دبیرستان ملاصدرا یکی از دبیرستان های دولتی منطقه 14 که با رویکرد علمی - پرورشی به صورت هیئت امنایی اداره میگردد، دغدغه اصلی اعضاء هیئت امناء و کادراجرایی دبیرستان ، تربیت نسلی است تا به مراتبی از حیات طیبه ، در زمینه های فعالیت های علمی ، آموزشی ، پرورشی ، ورزشی و سبک زندگی اجتماعی رسیده باشد ؛ دانش آموزی که توانایی پیمودن گام های استوار در گام دوم انقلاب را داشته باشد؛بدین منظور فعالیت های زیر راهکارهای اصلی در دبیرستان ملاصدرا برای رسیدن به اهداف فوق می باشد. در زمینه های آموزشی با ارائه برنامه ، پیگیری های آموزشی ، جلسات مشاوره فردی و گروهی ، استفاده از اساتید مجرب و دلسوز ، جلسات آموزش خانواده و نهایتاً ایجاد ارتباط دوستانه بین اساتید و دانش آموزان و ... که منجر به تبدیل دبیرستان ملاصدرا به یک دبیرستان شاخص در بین مدارس منطقه 14 از لحاظ رتبه های برتر قبولی در کنکور سراسری و امتحانات نهائی گردیده است ؛ در بعد پرورشی نیز با ارائه برنامه های مهارتی مثل آموزشهای فتوشاپ ، فعالیت های کتابخوانی و جهادی ، کلاسهای اعتقادی،آموزش احکام،صحت قرائت نماز،طرح کلی اندیشه اسلامی مقام معظم رهبری (مدظله العالی) ، شرکت در مسابقات فرهنگی هنری ادبی دانش آموزان و کسب نتایج برتر در سطح منطقه و استان،برگزاری اردوهای علمی – تفریحی و ...؛ توانسته است گامی در جهت ایجاد مدرسه ای در تراز انقلاب اسلامی در جهت تربیت دانش آموزانی در تراز انقلاب اسلامی بردارد.
            جهت مشاهده فعالیت های صورت گرفته در سال های قبل به کانال سروش دبیرستان به آدرس @mollasadra_highschool مراجعه کنید.
          </p>
          <div className="py-7 flex justify-center">
            <Button variant="action" onClick={()=>window.location="https://mollasadraschool.ir/PreRegistration/Level0"}>ورود به صفحه پیش‌ثبت‌نام</Button>
          </div>
        </div>
        <div className="basis-4/12 lg:basis-2/12 py-3 md:px-1 bg-[rgb(245,245,245)]">
          <h1 className="text-xl mr-2">لینک های مفید</h1>
          <ul className="flex flex-col pr-12 md:pr-0">
            <li className="mt-1"><a href="https://farsi.khamenei.ir/" className="text-blue-600" target="_blank">سایت مقام معظم رهبری</a></li>
            <li className="mt-1"><a href="https://www.medu.ir/fa/" className="text-blue-600" target="_blank">سایت آموزش و پرورش</a></li>
            <li className="mt-1"><a href="https://medu.ir/fa?ocode=90111401" className="text-blue-600">سایت آموزش و پرورش منطقه 14</a></li>
            <li className="mt-1"><a href="https://hamgam.medu.ir/portal/home.php?r=login" className="text-blue-600" target="_blank">سایت همگام</a></li>
            <li className="mt-1"><a href="https://irtextbook.com/Account/Login" className="text-blue-600" target="_blank">سایت ثبت نام کتاب</a></li>
            <li className="mt-1"><a href="http://Splus.ir/heiat_mohebban" className="text-blue-600" target="_blank">کانال سروش هیئت</a></li>
          </ul>
        </div>
      </section>
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
        <section className="bg-[rgba(255,255,255,0.6)] rounded-lg drop-shadow-lg flex flex-col md:flex-row w-full py-10 px-5">
          <FeatureCard title="امکانات ورزشی" description="زمین فوتبال و سالن ورزشی مجهز، زمین والیبال، بدمینتون و میز تنیس روی میز" Icon={<BallIcon />} />
          <FeatureCard title="امکانات رفاهی" description="" Icon={<BallIcon />} />
          <FeatureCard title="سامانه آموزشی پشتیبان" description="کلاس های هوشمند، وب سایت و امکان برگزاری جلسات آنلاین زنده از طریق امکانات داخلی سایت مدرسه" softwareService />
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
