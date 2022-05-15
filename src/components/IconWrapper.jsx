export default function IconWrapper({ children, dark=false, side='10', styles='', ...props}) {
  // Todo: find a way to optimize and clean up this shit ...
  if (dark) {
    return (
      <i className={`
        flex justify-center items-center w-${side} h-${side} 
        cursor-pointer rounded-full 
        transition-all ease-out hover:bg-[rgba(255,255,255,0.15)] ${styles}
      `} {...props}>
        {children}
      </i>
    )
  }
  else {
    return (
      <i className={`
        flex justify-center items-center w-${side} h-${side} 
        cursor-pointer rounded-full 
        transition-all ease-out hover:bg-[rgba(0,0,0,0.11)] ${styles}
      `} {...props}>
        {children}
      </i>
    )
  }
}