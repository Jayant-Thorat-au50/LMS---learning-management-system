import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { addCourse } from '../../../Redux/Slices/courseSlice';
import HomeLayout from '../../components/HomeLayout';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function AddCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const [adminInput, setAdminInput] = useState({
        title: "",
        catagory: "",
        description: "",
        thumbnail: null,
        price: "",
        createdby: "",
        previewImg: ""

    });

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

        console.log(adminInput);

        e.preventDefault()

        if (!adminInput.title || !adminInput.catagory || !adminInput.description || !adminInput.createdby || !adminInput.previewImg || !adminInput.previewImg) {
            toast.error("All fields are mandatory");
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

        }
    }
    return (
        <HomeLayout>
            <div className=' flex justify-center items-center h-[100vh]'>

                <form noValidate
                    className=' flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative '
                    onSubmit={onFormSubmit}
                    action="">

                    <Link to={-1} className=" text-2xl text-accent cursor-pointer absolute top-5 hover:bg-black p-1 rounded-full transition-all ease-in-out duration-100 hover:text-3xl hover:top-4 link">
                        <AiOutlineArrowLeft />
                    </Link>
                    <h1 className=' text-center text-2xl font-bold'>Create new course</h1>
                    <div className=' grid grid-cols-2 gap-x-10'>
                        <div className=' space-y-7'>
                            <div>
                                <label htmlFor="image_upload" className=' cursor-pointer'>
                                    {adminInput.previewImg ? (
                                        <img src={adminInput.previewImg} alt='thumbnail' className=' w-full h-44 m-auto border' />
                                    ) : (
                                        <div className=' w-full h-44 m-auto flex justify-center items-center border'>
                                            <h1 className=' text-lg font-bold'>Upload your course thumbnail</h1>
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
                                    className=' bg-transparent px-2 py-1 w-full border'
                                />
                            </div>
                        </div>

                        <div className=' flex flex-col gap-2 pb-1'>
                            <div className=' flex flex-col gap-1'>
                                <label htmlFor="createdby" className=' font-semibold text-lg'>Course Instructor</label>
                                <input type="text"
                                    required
                                    name='createdby'
                                    value={adminInput.createdby}
                                    onChange={handleUserInput}
                                    placeholder='Enter course instructor'
                                    id='createdby'
                                    className=' bg-transparent px-2 py-1 w-full border'
                                />
                            </div>
                            <div className=' flex flex-col gap-1'>
                                <label htmlFor="catagory" className=' font-semibold text-lg'>Course catagory</label>
                                <input type="text"
                                    required
                                    name='catagory'
                                    value={adminInput.catagory}
                                    onChange={handleUserInput}
                                    placeholder='Enter course catagory'
                                    id='catagory'
                                    className=' bg-transparent px-2 py-1 w-full border'
                                />
                            </div>
                            <div className=' flex flex-col gap-1'>
                                <label htmlFor="description" className=' font-semibold text-lg'>Course description</label>
                                <textarea type="text"
                                    required
                                    name='description'
                                    value={adminInput.description}
                                    onChange={handleUserInput}
                                    placeholder='Enter course description'
                                    id='description'
                                    className=' bg-transparent px-2 py-1 w-full border h-24 overflow-y-scroll resize-none'
                                />
                            </div>


                        </div>

                    </div>

                    <div className=' flex justify-center w-full'>

                        <button type='submit' className=' w-full text-center font-bold text-white text-2xl bg-yellow-600 py-1 rounded-sm hover:bg-yellow-500 hover:text-black transition-all ease-in-out duration-300'>Create course</button>
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default AddCourse;
