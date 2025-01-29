import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { editCourse, getcoursesList } from '../../Redux/Slices/courseSlice';

function EditCourseModal({stateObj, getNewCourse}) {

    const dispatch = useDispatch()

        const [editCourseModalData, setEditCourseModalData] = useState(stateObj)

        const handleInputChage = (e) => {
         
            const {name , value} = e.target;
             
            setEditCourseModalData({
                ...editCourseModalData,
                [name]:value
            })
        }

        console.log(editCourseModalData);
    
        const getVideo = (e) => {
    
            const video = e.target.files[0]
    
            const source = window.URL.createObjectURL(video);
    
            if(source){
                setEditCourseModalData({
                    ...editCourseModalData,
                    newThumbnail:video,
                    thumbnail:{
                        secure_Url:source
                    }
                })
            }
        }

        const onCourseEdit = async (e) => {

            e.preventDefault()
    
            if(!editCourseModalData.title || !editCourseModalData.description ){
                toast.error("Every field is required")
                return
            }
            const formData = new FormData();
            formData.append('title', editCourseModalData.title)
            formData.append('description', editCourseModalData.description)
            formData.append('newThumbnail', editCourseModalData.newThumbnail)
    
            console.log(formData.entries());
    
            const response = await dispatch(editCourse([editCourseModalData._id, formData]))
                await dispatch(getcoursesList())
                   
            console.log(response);
            if(response?.payload?.success){
                console.log('course updated successfully');
                console.log(response.payload.updatedCourse);
                getNewCourse(response.payload.updatedCourse)
                setEditCourseModalData({})
          
               // window.location.reload()
            }
            
            
        }
    
    return (
       
  <form onSubmit={onCourseEdit} className="modal-box w-11/12 max-w-5xl">
  <h1 className=' text-4xl text-yellow-500 text-center font-semibold my-5 shadow-[0_0_20px_black] py-1'>Edit course</h1>

  <div className=' w-full shadow-[0_0_20px_black] p-4 grid grid-cols-2 gap-5'>


     <div className='  flex flex-col gap-5'>
     <div className=' flex flex-col justify-center items-start   w-full  px-4'>
        <label htmlFor="" className=' text-2xl text-yellow-500'>Title :</label>
        <input type="text" name='title' value={editCourseModalData.title} onChange={handleInputChage} className='bg-transparent border text-xl text-white px-2
         rounded w-full py-1' />
      </div>
      <div className=' flex flex-col justify-center items-start  w-full  px-4'>
        <label htmlFor="" className=' text-2xl text-yellow-500'>Description :</label>
        <textarea type="text" name='description'  value={editCourseModalData.description} onChange={handleInputChage}  className=' rounded resize-none h-44 w-full text-xl  text-white px-2
          py-1 bg-transparent border' />
      </div>
     </div>

     <div  className=' space-y-5'>
        {
            editCourseModalData?.thumbnail?.secure_Url ? (
                <div className=' relative'>
               <img
                src={editCourseModalData?.thumbnail?.secure_Url}
                className=' w-full  h-60'
                 alt="" />
                 <button 
                 onClick={() => setEditCourseModalData({...editCourseModalData,thumbnail:{secure_Url:""}})}
                 className=' bg-red-700 rounded-md font-semibold px-2 text-lg text-white absolute -bottom-7 left-0'>
                    remove img
                 </button>
                 </div>
            ):(
                <div className=' border h-60  w-full'>
                    <label htmlFor="avatar" className='   h-60 border w-full flex justify-center items-center '><p className='text-xl text-white'>Choose your thumbnail</p></label>
                    <input type="file" name='avatar' id='avatar' hidden value={editCourseModalData?.thumbnail?.secure_Url} onChange={getVideo}  />
                </div>
            )
        }
        <div className=" w-full  h-14 flex items-center justify-center  text-2xl">
        
        <div className=' w-full ps-6 grid grid-cols-2'>
        <label htmlFor="" className=' text-center mx-auto text-yellow-400'>Course catagory :</label>
             <select name="select" id="" className=' bg-transparent rounded-lg shadow-[0_0_7px_black]'>
                <option value="" className=' text-white rounded-lg bg-transparent'>Ai Ml</option>
             </select>
      
        </div>
        </div>
     </div>
     </div>

     
  <div className=' flex py-0 w-full items-center justify-end relative'>
    <button
    type='Submit'
    className=' bg-green-500 btn text-black text-2xl absolute bottom-0 right-24'>Save</button>
  <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn text-2xl bg-red-500 text-black">Close</button>
      </form>
    </div>
  </div>
  </form>

    )
}

export default EditCourseModal
