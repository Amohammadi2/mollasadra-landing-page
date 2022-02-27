import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  NavbarContainer,
  NavbarHeader,
  NavbarLinksContainer,
  NavbarLink,
  NavbarSubLink,
} from "./components/Navbar";
import { useState } from "react";
import { useWindowSize } from "react-use";
import Flickity from "react-flickity-component";
import { screens } from "./shared/constants";


function ToggleMenuButton(props) {
  return (
    <span
      className="
        flex justify-center items-center ml-6 h-[40px] w-[40px]
        transition-all duration-75 ease-out
        active:bg-[rgba(256,256,256,0.4)]
        hover:bg-[rgba(256,256,256,0.15)] rounded-full
      "
      onClick={() => props.setIsNavbarOpen(!props.isNavbarOpen)}
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

  return (
    <>
      <NavbarContainer>
        <NavbarHeader>
          <h1 className="text-2xl flex">
            {width < screens["md"] && (
              <ToggleMenuButton
                isNavbarOpen={isNavbarOpen}
                setIsNavbarOpen={setIsNavbarOpen}
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
      <div className="w-full h-screen">
        {/* Todo: Create a slider here */}
      </div>
    </>
  );
}

export default App;
