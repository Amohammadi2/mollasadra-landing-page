import StyleList from "../styleManager"

export default function Button ({ children, icon, styles, variant="default", size='default', rounded=false, disabled=false, ...props }) {

  if (rounded) size = undefined
  
  return (
    <button
      className={
        new StyleList(
          `flex justify-center items-center mx-1 rounded-lg transition-all duration-100 ease-out drop-shadow-lg
          ${size === "default" && "pt-2 pb-2 pr-3 pl-3"}
          ${size === "small" && "py-1 px-2 text-sm"}
          ${size === "large" && "text-lg"}
          ${variant === "default" && "bg-white text-black hover:bg-gray-300"}
          ${variant === "primary" && "bg-blue-400 text-white hover:bg-blue-600"}
          ${variant === "secondary" && "bg-slate-600 text-white hover:bg-slate-800"}
          ${variant === "action" && "bg-yellow-300 text-black hover:bg-yellow-400"}
          ${variant === "alert" && "bg-red-600 text-white hover:bg-red-800"}
          ${rounded && "w-10 h-10 rounded-full"}
          ${disabled && "opacity-70 cursor-not-allowed pointer-events-none"}
          `
        )
        .update(styles)
        .toClassList()
      }
      disabled={disabled}
      {...props}
    >
      {icon && 
        <span className="ml-2">
          {icon}
        </span>
      }
      <span>
        {children}
      </span>
    </button>
  )
}

