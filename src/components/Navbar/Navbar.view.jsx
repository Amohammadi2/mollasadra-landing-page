import { useEffect, useState } from "react";
import { forwardRef } from "react";
import { screens } from "../../shared/constants";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import headerBg from "../../assets/header-bg.png";
import Imam from "../../assets/imam.png";
import { useHeaderState } from "./hooks";

export default forwardRef(function NavbarView({ widndowWidth }, ref) {
  const [sidebarActive, setSidebarActive] = useState(false);
  const { showHeader } = useHeaderState();

  function redirectToPortal() {
    window.location = "https://mollasadraschool.ir/Account/Login";
  }

  function redirectToPreregistration() {
    window.location = "https://mollasadraschool.ir/PreRegistration/Level0";
  }

  useEffect(() => {
    if (widndowWidth <= screens["md"]) setSidebarActive(true);
    else setSidebarActive(false);
  }, [widndowWidth]);

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
        className="px-12"
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
          <AnimatePresence>
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
                className="text-3xl mr-3"
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", delay: 0.4 }}
              >
                دبیرستان هیئت امنایی ملاصدرا
              </motion.h1>
            </div>
            {showHeader && (
              <motion.div
                className="flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-center border-2 px-3 border-blue-300 rounded-lg">
                  امروز: ۱۳۹۷/۱۰/۱۰
                </div>
                {navButtonGroup}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div
        variants={navLinkContainerVariants}
        animate="show"
        initial="first"
        className="flex items-center justify-between py-4 px-2"
        style={{ height: showHeader ? "120px" : "unset" }}
      >
        <div className="flex items-center">
          <motion.a href="#" className="mx-4" variants={navLinkitemVariants}>
            معاونت پرورشی
          </motion.a>
          <motion.a href="#" className="mx-4" variants={navLinkitemVariants}>
            معاونت آموزشی
          </motion.a>
          <motion.a href="#" className="mx-4" variants={navLinkitemVariants}>
            امکانات
          </motion.a>
          <motion.a href="#" className="mx-4" variants={navLinkitemVariants}>
            ارتباط با ما
          </motion.a>
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
