import React from 'react'
// carousel members import


function Carousel({ id, thumb, name, Toatalslides, description }) {
    return (
        <div className="carousel-item text-black bg-white relative w-full " id={`slide${id}`}>
            <div className=' px-[10%] flex flex-col items-center gap-3'>
                <img src={thumb} className=' w-40 rounded-full border border-gray-200' />
                <p className='text-xl text-black'>{description}</p>
                <h2 className=' text-2xl font-semibold capitalize'>{name}</h2>
                <div className=' absolute flex justify-between -translate-y-1/2 transform top-1/2 left-0 right-0'>
                    <a href={Number(id) == 1 ? `#slide${Toatalslides}` : `#slide${Number(id) - 1}`} className='btn btn-circle'>❮</a>
                    <a type='button' href={id == Toatalslides ? `#slide${1}` : `#slide${Number(id) + 1}`} className='btn btn-circle'>❯</a>
                </div>
            </div>
        </div>
    )
}

export default Carousel
