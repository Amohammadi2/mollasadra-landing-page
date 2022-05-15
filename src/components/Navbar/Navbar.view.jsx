import { useEffect, useState } from "react";
import { forwardRef } from "react";
import { screens } from "../../shared/constants";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import headerBg from "../../assets/header-bg.png";
import Imam from "../../assets/imam.png";
import {
  useHeaderContentState,
  useHeaderState,
  useSidebarState,
} from "./hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import IconWrapper from "../IconWrapper";

export default forwardRef(function NavbarView({ widndowWidth }, ref) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { showHeader } = useHeaderState();
  const { showSidebar } = useSidebarState();
  const { showFullText, showDate, decreaseFontSize } = useHeaderContentState();

  function redirectToPortal() {
    window.location = "https://mollasadraschool.ir/Account/Login";
  }

  function redirectToPreregistration() {
    window.location = "https://mollasadraschool.ir/PreRegistration/Level0";
  }

  //#region Navbar Animation Variants
  const navLinkContainerVariants = {
    first: {
      opacity: 1,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 1,
      },
    },
  };

  const navLinkitemVariants = {
    first: {
      x: -100,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
    },
  };
  //#endregion

  const navButtonGroup = (
    <>
      <Button onClick={redirectToPreregistration}>پیش‌ثبت نام</Button>
      <Button onClick={redirectToPortal} variant="primary">
        ورود
      </Button>
    </>
  );

  const navLinks = (
    <>
      <motion.a
        href="#parvareshi"
        className="mx-4"
        variants={navLinkitemVariants}
      >
        معاونت پرورشی
      </motion.a>
      <motion.a
        href="#amoozeshi"
        className="mx-4"
        variants={navLinkitemVariants}
      >
        معاونت آموزشی
      </motion.a>
      <motion.a
        href="#features"
        className="mx-4"
        variants={navLinkitemVariants}
      >
        امکانات
      </motion.a>
      <motion.a
        href="#stats"
        className="mx-4"
        variants={navLinkitemVariants}
      >
        ارتباط با ما
      </motion.a>
    </>
  )

  return (
    <motion.div
      className="fixed text-white top-0 right-0 left-0 z-[1000000]"
      style={{
        backgroundImage: `url(${headerBg})`,
        backgroundPositionY: "0px",
        backgroundRepeat: "repeat no-repeat",
      }}
      ref={ref}
    >
      <motion.div
        layout
        className={`${decreaseFontSize ? "px-1" : "px-12"}`}
        style={{ height: showHeader ? "160px" : "auto" }}
      >
        <motion.div
          layout
          className="flex justify-between items-center"
          style={
            showHeader
              ? { height: "120px", opacity: 1 }
              : { height: "0", opacity: 0 }
          }
          initial={false}
        >
          <div className="flex items-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              src={Imam}
              alt="imam"
              className="rounded-xl"
            />
            <motion.h1
              className={`${
                decreaseFontSize ? "text-xl mr-2" : "text-3xl"
              } mr-3"`}
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", delay: 0.4 }}
            >
              {showFullText
                ? "دبیرستان هیئت امنایی ملاصدرا"
                : "دبیرستان ملاصدرا"}
            </motion.h1>
          </div>
          {showHeader && (
            <motion.div
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {showDate && (
                <div className="flex items-center justify-center border-2 px-3 border-blue-300 rounded-lg">
                  امروز: ۱۳۹۷/۱۰/۱۰
                </div>
              )}
              {navButtonGroup}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        variants={navLinkContainerVariants}
        animate="show"
        initial="first"
        className="flex items-center justify-between py-4 px-2"
        style={{ height: showHeader ? "120px" : "unset" }}
      >
        <AnimatePresence>
          {showSidebar && sidebarOpen && (
            <motion.div initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.4)]" onClick={()=>setSidebarOpen(false)}>
              <motion.div initial={{x: 200}} animate={{x: 0}} exit={{x: 200}} className="w-[200px] h-screen flex flex-col bg-white text-black" onClick={e=>e.stopPropagation()}>
                <div className="my-2 px-2">
                  <a href="#parvareshi">معاونت پرورشی</a>
                </div>
                <div className="my-2 px-2">
                  <a href="#amoozeshi">معاونت آموزشی</a>
                </div>
                <div className="my-2 px-2">
                  <a href="#features">امکانات</a>
                </div>
                <div className="my-2 px-2">
                  <a href="#stats">ارتباط با ما</a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center px-2">
          {!showSidebar ? (
            navLinks
          ) : (
            <IconWrapper dark onClick={()=>setSidebarOpen(true)}>
              <FontAwesomeIcon
                icon={faBars}
                className="text-xl"
                style={{ alignContent: "middle" }}
              />
            </IconWrapper>
          )}
        </div>

        <AnimatePresence>
          {!showHeader && (
            <motion.div
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {navButtonGroup}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});
