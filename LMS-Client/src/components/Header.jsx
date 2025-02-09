import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { becomeAdminNow, getUserData, logout } from '../../Redux/Slices/Authslice';
import logo from '../assets/download-removebg-preview (1).png'
import { CiSearch } from "react-icons/ci";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import toast from 'react-hot-toast';

function Header() {

  

    const dispatch = useDispatch()
    const navigate = useNavigate();
  
    const isLoggedIn = useSelector((state) => state?.authstate?.isLoggedIn);
    const role = useSelector((state) => state?.authstate?.role);
    const { data } = useSelector((state) => state?.authstate);
    let { coursesList } = useSelector((state) => state?.courseState);
    const catagoryList = [...new Set(coursesList.map(c => c.catagory))]
  const [showMenuOptions, setShowMenuOptions] = useState(false)
    const [showCourseCatagoryList, setShowCourseCatagoryList] = useState(false)
    const [targetVal, setTargetVal] = useState('')
  let [list, setList] = useState(coursesList.map(c => c.catagory == catagoryList[0]))

  const [showCourseList, setShowCourseList] = useState(false)
  const [foundVal, setFoundVal] = useState(false)

      const handleLogout = async () => {
        const response = await dispatch(logout(data._id));
        if (response?.payload?.success) {
          setShowMenuOptions(false)
          navigate('/')
        }
      };
    
      const [viewAllval, setViewAllVal] = useState("")
    
      const coursesBycatagory = (c) => {
        setList(coursesList.filter(course => course.catagory == c))
        setList(prev => prev.slice(0, 3))
      }


    
        const sendAdminRequest = async () => {
          if (window.confirm('Once you become admin you can add your own courses, do you want send request for admin?')) {
          if (!isLoggedIn) {
            navigate('/login')
            toast.error('please login to continue')
            return;
          }
      
            const response = await dispatch(becomeAdminNow(data._id))
      
            if (response.payload.success) {
              toast.success('you will be notified once aprooved')
              const res = await dispatch(getUserData(data._id));
              console.log(res);
      
            }
      
          }
        }
        const searchCourses = async (e) => {

          setTargetVal(e.target.value)
             setShowCourseList(true)
             
          for(let i=0; i<=coursesList.length; i++){
            if(coursesList[i].title === targetVal){
              setFoundVal(foundVal)
              setFoundVal(courseList.title)
            }
          }
        }

        console.log(showCourseList);
        

    return (
        <header className=" z-50 sticky top-0 left-0  shadow-[0_0_5px_gray] bg-white h-[11.5vh] w-full hidden lg:block ">
                <nav className=" flex  h-full w-full justify-center items-center">
                  <div className="  h-full px-16 flex w-full justify-between items-center text-2xl text-white">
                    <ul className=" flex justify-center  h-full items-center gap-5 relative ">
                      <li
                        onClick={() => navigate('/')}
                        className=" h-14 w-20  flex items-center rounded-md">
                        <img src={logo} alt="" />
                      </li>
                      <li
                        onMouseEnter={() => setShowCourseCatagoryList(true)}
                        onMouseLeave={() => setShowCourseCatagoryList(false)}
                        className=" border-2  border-gray-400 rounded w-48  text-lg py-0.5 bg-white shadow-xl">
                        <select name="" id="" className=" border-1 rounded text-center h-full  w-full bg-white text-black font-semibold">
                          <option onClick={() => navigate('/courses')} value="" className=" tracking-wide text-xl"> Courses</option>
                        </select>
        
                        {/* absolute component of the catagory wise course list in the header */}
                        {showCourseCatagoryList ? (<div className=" absolute w-[940px] h-[22rem] top-12 left-[6.9rem]  shadow-[0_0_5px_gray] my-1 rounded flex bg-white">
                          <div className={`w-[27%] border-black h-full grid-rows-${catagoryList.length} grid`}>
                            {catagoryList.map((c,idx) => 
                            <div 
                             onMouseEnter={() =>{ 
                              coursesBycatagory(c)
                               setViewAllVal(c)}} 
                              //  onMouseLeave={listhide}
                               key={idx} className=" hover:bg-gray-300 transition-all ease-in-out duration-200 flex justify-center items-center  border-2 border-t-0 ">
                              <p className=" underline capitalize font-semibold text-black">{c}</p>
                              {/* <img src={webDev} alt="" className=" h-24 w-24" /> */}
                            </div>)}
                          </div>
                          <div className=" h-full w-[73%] relative ">
                            <div className="w-[90%] grid grid-cols-2 pt-10">
        
                              {
                                list.map(course =>
                                  <div
                                  key={course._id}
                                    onClick={() => navigate('/course/description', { state: { ...course } })}
                                   className=" text-black h-16 flex items-center justify-start gap-4 font-semibold   m-4  border border-gray-200 bg-[#F3F4F6] rounded">
                                    <img src={course?.thumbnail?.secure_Url} className=" w-16 h-16  rounded" alt="" />
                                    <p  className="capitalize">{course.title}</p>
                                  </div>)
                              }
        
                            </div>
                            <div className=" absolute bottom-16 right-24">
                              <button
                                onClick={() => navigate(`/course/${viewAllval}`)}
                                className=" text-black font-semibold bg-[#cfcfd7] py-2 rounded-md px-3 text-lg">View All &gt;&gt;</button>
                            </div>
                          </div>
                        </div>) : null}
                      </li>
                      <li onClick={() => navigate('about')}>
                        <p className=" text-black text-lg font-semibold">About Us</p>
                      </li>
                      <li >
                        {role === 'USER' || role==='ADMIN' || !isLoggedIn?<p
                        onClick={role==="USER"? ()=>sendAdminRequest():role==="ADMIN"?()=>navigate('/course/create'):() => navigate('/login')}
                        className=" text-black text-lg font-semibold">Add Courses</p>:null}
                      </li>
                    </ul>
        
        
                    <ul className=" flex h-full items-center  text-black ">
                      <li className=" bg-white rounded-md relative text-end border-2 border-gray-300   overflow-hidden w-64">
                        <CiSearch className=" absolute left-2 text-3xl top-1  text-gray-500" />
                        <input type="text" value={targetVal} onChange={searchCourses } className=" focus:outline-none text-lg py-1 w-[80%] cursor-pointer text-black bg-white" placeholder="Enter course name..." />
                        {showCourseList ? <div
                        // onClick={searchCourses}
                        className=' absolute border-2 border-black -bottom-12 z-1 w-36 h-14'>
                          <p>{foundVal}</p>
                        </div>:(null)}
                      </li>
                      <li className=" relative">
                        {isLoggedIn ? (
                          <div
                            onMouseEnter={() => setShowMenuOptions(!showMenuOptions)}
                            onMouseLeave={() => setShowMenuOptions(false)}
                            className="  w-24 flex justify-end"
                          >
        
                            <img
                              onClick={() => setShowMenuOptions(!showMenuOptions)}
                              src={data.avatar.secureUrl} alt="" className=" h-11 w-11 hover:border-black hover:border-2 rounded-full" />
                            {showMenuOptions ? (<ul className=" absolute top-12 w-48 bg-white shadow-[0_0_10px_gray]  justify-center  rounded-md right-0 flex flex-col items-start text-gray-500 text-[17px]">
                              <li className="py-2 bg-gray-200 rounded-md text-center w-full capitalize text-blue-500 font-semibold flex justify-center gap-2">
                                <p className=" text-red-400">hey,</p> {data.fullName}</li>
                              <div className=" flex flex-col px-3 border w-full py-2">
                                <li
                                  onClick={() => navigate('/user/profile')}
                                  className=" hover:text-xl transition-all ease-linear hover:text-black duration-200 font-semibold">my profile</li>
                                {role === "ADMIN" ? (
                                  <li onClick={() => navigate('/admin/dashboard')} className="hover:text-xl transition-all ease-linear  hover:text-black  duration-200 font-semibold" >Admin Dashboard</li>
                                ) : null}
                                {role === "SUPER ADMIN" ? (
                                  <li onClick={() => navigate('/super-admin/dashboard')} className="hover:text-xl transition-all ease-linear  hover:text-black  duration-200 font-semibold">Super Admin Panel</li>
                                ) : null}
                                <li className=" hover:text-xl transition-all ease-linear  hover:text-black  duration-200 font-semibold">subscription info</li>
                                <li
                                  onClick={() => navigate('/contact-us')}
                                  className=" hover:text-xl transition-all ease-linear  hover:text-black  duration-200 font-semibold">support</li>
                                <li
                                  onClick={handleLogout}
                                  className=" hover:text-xl transition-all ease-linear  hover:text-black  duration-200 font-semibold">logout</li>
                              </div>
                            </ul>) : null}
                          </div>
                        ) : (
        
                          <div className=" ms-3 border-2 border-blue-400 bg-gray-100 font-bold hover:bg-gray-300 rounded-md px-2 py-1">
                            <p onClick={() => navigate('/login')} className="  text-blue-400 text-lg ">Login / register</p>
                          </div>
                        )}
        
        
        
                      </li>
                    </ul>
                  </div>
                </nav>
              </header>
    )
}

export default Header
