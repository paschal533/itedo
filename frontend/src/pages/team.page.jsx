import React, {useEffect} from 'react'
import { TeamItem } from '../common/team';
import { Fade, Slide, Flip } from "react-awesome-reveal";
import Star from "../imgs/star.png"

const TeamCard = ({image, name, role}) => {
    return (
        <div className='w-full md:w-[250px] items-center align-middle justify-center flex-col flex place-content-center rounded-xl h-full p-6 shadow-2xl '>
            <img src={image} className='h-[10rem] w-[10rem] rounded-full' alt="card" />

            <h1 className='font-bold text-2xl mt-4'>{name}</h1>
            <p className='text-md mt-4'>{role}</p>
            <div className='w-full flex mt-4 space-x-3 justify-center place-content-center '>
                {[1,2,3,4,5].map((item, i) => (
                    <img src={Star} alt='star' className='object-contain h-7 w-7' />
                ))}
            </div>
            <p className='text-md mt-4'>Participated full time</p>
        </div>
    )
 }


export default function TeamPage() {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
  return (
     <div className='p-4 md:p-10 justify-center align-middle text-center items-center place-content-center flex flex-col h-full w-full'>
     <div className=' max-w-[1300px] items-center content-center place-content-center justify-center align-middle'>
     <Slide damping={0.1} className='text-4xl font-bold'>Meet Our Team</Slide>

        <div class="grid space-y-8 md:space-y-0 grid-cols-1 md:grid-cols-4 gap-2 mt-12 place-content-center justify-center w-full">
            {TeamItem.map((item, i) => (
                <Slide damping={0.1 * i}>
                <TeamCard key={i} name={item.name} role={item.role} image={item.image} />
                </Slide>
            ))}
        </div>
     </div>
  </div>
  )
}
