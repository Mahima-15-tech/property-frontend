import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { Link, NavLink, useNavigate } from "react-router-dom"
import useOnClickOutside from "../hooks/useOnClickOutside"
import { CiSaveUp2 } from "react-icons/ci";


export default function ProfileDropdown({ onLogoutClick, watchList }) {
 

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const role = localStorage.getItem("role");

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <button className="relative " onClick={() => setOpen(true)}  >
      <div className="flex items-center gap-x-1">
        {/* <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        /> */}
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-50 divide-y-[1px] divide-richblack-700 bg-white overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          {role !== "broker" && (
           <NavLink to='/watchlist'> 
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
            <CiSaveUp2  className="text-lg" />
              WatchList <span className="w-5 h-5 bg-green-400 rounded-full animate-bounce  px-2  flex items-center justify-center py-2">{watchList?.length || 0}</span>
            </div>
          </NavLink>
          )}

         

          <div
            onClick={() => {
              onLogoutClick();
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>

        
        
        </div>
      )}
    </button>
  )
}