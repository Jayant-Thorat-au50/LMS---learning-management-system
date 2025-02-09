
// lib imports
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

// thunck imports
import { addCourse } from '../../../Redux/Slices/courseSlice';

// components imports
import HomeLayout from '../../components/HomeLayout';

// icons imports
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoCloudUploadOutline } from "react-icons/io5";

//contstant imports

function AddCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {data} = useSelector(state => state?.authstate)
    const {categoryList} = useSelector(state => state?.courseState)
    const [adminInput, setAdminInput] = useState({
        title: "",
        catagory: "",
        description: "",
        thumbnail: null,
        price: "",
        createdby: data.fullName,
        previewImg: ""

    });

    const [showSpinner, setShowSpinner] = useState(false)

    // get img preview when selected
    const getImg = (e) => {
        const img = e.target.files[0];
        if (img) {
            const fileReader = new FileReader;
            fileReader.readAsDataURL(img);
            fileReader.addEventListener('load', function () {
                setAdminInput({
                    ...adminInput,
                    previewImg: this.result,
                    thumbnail: img
                })
            })
        }
    }

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setAdminInput({
            ...adminInput,
            [name]: value
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()
        if (!adminInput.title || !adminInput.catagory || !adminInput.description || !adminInput.createdby || !adminInput.previewImg || !adminInput.previewImg) {
            toast.error("All fields are mandatoryk");
            return
        }
        
        const formData = new FormData();

        formData.append('title', adminInput.title)
        formData.append('catagory', adminInput.catagory)
        formData.append('description', adminInput.description)
        formData.append('thumbnail', adminInput.thumbnail)
        formData.append('price', adminInput.price)
        formData.append('createdby', adminInput.createdby)

        const response = await dispatch(addCourse(formData))

        if (response?.payload?.success) {
            setShowSpinner(!showSpinner)
            setAdminInput({
                title: "",
                catagory: "",
                description: "",
                thumbnail: null,
                price: "",
                createdby: "",
                previewImg: ""
            })
            navigate('/courses')

            setShowSpinner(!showSpinner)
        }else{
        }
    }

   console.log(adminInput);
   

    return (
        <HomeLayout>
            <div className=' flex justify-center items-center h-[100vh] bg-blue-100'>

                <form noValidate
                    className=' flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-[700px] my-10 bg-white shadow-[0_0_10px_black] relative '
                    onSubmit={onFormSubmit}
                    action="">

                    <Link to={-1} className=" text-2xl text-accent cursor-pointer absolute top-5 hover:bg-black p-1 rounded-full transition-all ease-in-out duration-100 hover:text-3xl hover:top-4 link">
                        <AiOutlineArrowLeft />
                    </Link>
                    <h1 className=' text-center text-yellow-500 text-2xl font-bold'>Create new course</h1>
                    <div className=' grid grid-cols-2 gap-x-10'>
                        <div className=' space-y-7'>
                            <div>
                                <label htmlFor="image_upload" className=' cursor-pointer'>
                                    {adminInput.previewImg ? (
                                        <img src={adminInput.previewImg} alt='thumbnail' className=' w-full h-44 m-auto border' />
                                    ) : (
                                        <div className=' w-full h-44 m-auto flex justify-center items-center border-2 border-black rounded-md flex-col gap-5' >
                                            <h1 className=' text-lg text-blue-300 font-bold'>Upload your course thumbnail</h1>
                                            <div className=" text-black text-5xl border-2 border-black"> <IoCloudUploadOutline /> </div>
                                        </div>
                                    )}
                                </label>
                                <input type="file" hidden id='image_upload' className='' onChange={getImg} accept='.jpg, .jpeg, .png' />
                            </div>

                            <div className=' flex flex-col justify-center items-start gap-1'>
                                <label htmlFor="title" className=' font-semibold text-lg'>Course title</label>
                                <input type="text"
                                    required
                                    name='title'
                                    value={adminInput.title}
                                    onChange={handleUserInput}
                                    placeholder='Enter your title'
                                    id='title'
                                    className=' bg-transparent px-2 py-1 w-full border-2 border-black rounded-md text-black'
                                />
                            </div>
                        </div>

                        <div className=' flex flex-col pb-1 gap-2'>
                            <div className=' flex flex-col gap-1'>
                                <label htmlFor="createdby" className=' font-semibold text-lg text-black'>Course Instructor :</label>
                                <input type="text"
                                    required
                                    name='createdby'
                                    value={data.fullName}
                                    onChange={handleUserInput}
                                    placeholder='Enter course instructor'
                                    id='createdby'
                                    className=' text-black bg-transparent px-2 py-1 w-full border-2 border-black rounded-md'
                                />
                            </div>
                           
                             <div className=' flex flex-col gap-1'>
                                <label htmlFor="catagory" className=' font-semibold text-lg text-black'>Course catagory :</label>
                                <input type="text"
                                    required
                                    name='catagory'
                                    value={adminInput.catagory}
                                    onChange={handleUserInput}
                                    placeholder='Enter course catagory'
                                    id='catagory'
                                    className='border-2 border-black bg-transparent px-2 text-black py-1 w-full rounded-md '
                                />
                            </div> 
                            <div className=' flex flex-col gap-1'>
                                <label htmlFor="description" className=' font-semibold text-lg text-black'>Course description :</label>
                                <textarea type="text"
                                    required
                                    name='description'
                                    value={adminInput.description}
                                    onChange={handleUserInput}
                                    placeholder='Enter course description'
                                    id='description'
                                    className=' bg-transparent px-2 py-1 w-full border-2 h-24 overflow-y-scroll border-black rounded-md resize-none text-black'
                                />
                            </div>


                        </div>

                    </div>

                    <div className=' flex justify-center w-full items-center flex-col'>

                        { !showSpinner ?(
                            <button type='Submit' className=' w-full flex justify-center text-center font-bold text-black text-2xl bg-blue-400 py-1 rounded-sm hover:bg-blue-600 hover:text-black transition-all ease-in-out duration-300'>
                     
                      
                        <span>Create course</span>
                        </button>
                        ):(

                            <span className=' text-center h-6 rounded-full border-t-yellow-500 w-6 border-4 animate-spin border-yellow'>

                       </span>)}
                        
                    </div>
               
                </form>
            </div>
        </HomeLayout>
    )
}

export default AddCourse;
