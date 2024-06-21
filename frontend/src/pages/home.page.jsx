 import React, { useContext, useState, useEffect } from 'react'
 import Banner from '../imgs/banner-image.png'
 import { Link } from "react-router-dom";
 import CardImag from "../imgs/how.png"
 import AboutImage from "../imgs/about-image.png"
 import ProjectImage from "../imgs/project-image.png"
 import { ThemeContext } from "../App";
 import OurLecturer from "../team/lecture.jpg"
 import Arrow from "../imgs/Up arrow.png"
 import axios from "axios";
import {Card, Skeleton} from "@nextui-org/react";
import { Fade, Slide, Flip } from "react-awesome-reveal";
import { TeamItem } from '../common/team';
import Star from "../imgs/star.png"


 const PostCard = ({title, para}) => {
    return (
        <div className='w-full md:w-[350px] rounded-xl h-[300px] p-6 shadow-2xl '>
            <img src={CardImag} className='h-14 w-14' alt="card" />

            <h1 className='font-bold text-2xl mt-8'>{title}</h1>
            <p className='text-md mt-6'>{para}</p>
        </div>
    )
 }

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

 const ProjetCard = ({title, para, image, link}) => {
    return (
        <div className='w-full md:w-[580px] flex rounded-xl h-full md:h-[300px] p-6 shadow-2xl '>
          <div className='flex flex-wrap space-x-0 md:space-x-4 space-y-4 md:space-y-0'>
            <img src={image} className='h-[200px] rounded-md md:h-full w-full md:w-[230px]' alt="card" />

            <div className='md:mt-0 mt-4 w-full md:w-[250px]'>
              <h1 className='font-bold line-clamp-[2] text-2xl'>{title}</h1>
              <p className='text-md mt-4 line-clamp-[7]'>{para}</p>
              <div className='mt-4'>
              <Link className='underline underline-offset-1 py-2' to={link}>Learn more</Link>
              </div>
            </div>
          </div>
        </div>
    )
 }

 const LoadingCard = () => {
        return (
            <Card className="w-full space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">  
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
    )
 }
 
 function HomePage() {
    let {theme, setTheme} = useContext(ThemeContext)
    const [ projects, setProjects ] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    const fetchTrendingBlogs = () => {
        //trending blogs
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
        .then(({ data }) => {
           setProjects(data.blogs);
           setIsLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
      fetchTrendingBlogs();
    }, [])

   return (
      <div className=''>

      {/* Banner */}
        <div class="bg-gradient-to-r from-[#d2c2dd] justify-center flex to-[#b98cdc] md:h-[100%] h-full w-full" >
            <div className='w-full p-4 md:p-10 flex max-w-[1300px] h-full flex-wrap items-center content-center place-content-center justify-center align-middle'>
                <div className='md:mt-0 md:w-[45%] mt-14 items-center content-center place-content-center w-full h-full flex-col justify-center align-middle'>
                  <Slide damping={0.2}>
                    <h1 className='text-4xl font-bold text-[#191A1A] mb-8'>Connect. Learn. Publish</h1>
                    <Fade className='text-xl mr-6 text-[#191A1A]'>Sign up now and embark on your journey to brand success with our platform. Let’s help you get your project Published.</Fade>
                    <Link to="/projects"><button className="btn-purple mt-8 w-2/3 py-4">Get Started</button></Link>
                    </Slide>
                </div>
                <Slide damping={0.1} className='md:mt-0 md:w-[55%] w-full mt-8'>
                    <img src={Banner} alt="banner-image" />
                </Slide>
            </div>
        </div>

        {/* How it works */}

        <div className='p-4 md:p-10 mt-8'>
            <Slide damping={0.2} className='text-4xl text-center font-bold'>How <span className='text-[#5E4075] text-4xl text-center font-bold'>ITEDO223</span> Works</Slide>
            <Slide damping={0.3} className='mt-6 text-center font-medium text-xl'>Browse through a variety of collaboration opportunities available on the platform</Slide>
            <div className='w-full items-center place-content-center flex'>
                <div className='flex mt-10 flex-wrap space-y-6 space-x-0 md:space-x-6 md:space-y-0'>
                <Slide damping={0.1}>
                <PostCard title="Sign Up" para="Designing, creating, testing, and maintaining school projects." /> 
                </Slide>
                <Slide damping={0.2}>
                    <PostCard title="Join a Team" para="Join our dynamic team and be part of an inclusive community dedicated to excellence in education! " /> 
                </Slide>
                <Slide damping={0.3}>
                    <PostCard title="Publish Project" para=" Integrate interactive learning resources, educational materials, and multimedia content to support student learning both in and out of the classroom." />
                </Slide> 
                </div>
            </div>
        </div>

         {/* About Us */}

         <div className={`p-4 md:pl-10 md:pr-10 mt-4 md:mt-8 flex justify-center h-full w-full`}>
           <div className='w-full p-4 md:p-10 flex h-full max-w-[1300px] flex-wrap items-center content-center place-content-center justify-center align-middle'>
               <Slide damping={0.2} className='md:mt-0 hidden md:block md:w-[55%] w-full mt-8'>
                    <img src={AboutImage} alt="banner-image" />
                </Slide>
                <div className='md:mt-0 md:w-[45%] mt-14 items-center content-center place-content-center w-full h-full flex-col justify-center align-middle'>
                <Slide damping={0.3}>
                <h1 className='text-4xl font-bold mb-4'>About <span className='text-4xl font-bold text-[#5E4075] mb-4'>ITEDO223</span></h1>
                    <p className='text-xl'>ITEDO223 is an AI powered online platform that promotes smooth communication and sharing of resources between students and the course instructor. It functions as a modern e-library tailored for the course, allowing students and the instructor to upload, arrange, and access vital course materials. This platform is designed to enrich the learning journey by offering a centralized location for accessing course content, encouraging collaboration, and facilitating the efficient distribution of educational materials.</p>
                    <Link to="/projects"><button className="btn-purple mt-8 md:w-2/3 w-full py-4">Get Started</button></Link>
                </Slide>
                </div>
                <Slide damping={0.2} className='md:mt-0 md:w-[55%] w-full mt-8 md:hidden block'>
                    <img src={AboutImage} alt="banner-image" />
                </Slide>
            </div>
         </div>

          {/* Our projects */}
          <div className='p-4 md:p-10 mt-4 justify-center flex h-full w-full'>
          <div className='max-w-[1300px] items-center content-center place-content-center justify-center align-middle'>
          <div className='w-full flex flex-wrap justify-between'>
            <div  className=''>
                <Slide damping={0.2} className='text-4xl font-bold'>Our Trending Projects</Slide>
                <Slide damping={0.2} className='text-xl md:w-[600px] w-full mt-4'>Browse through a variety of collaboration opportunities available on the platform</Slide>
            </div>
            <Link to="/projects"><Slide damping={0.2} className="btn-purple mt-8 py-2">View All</Slide></Link>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 place-content-center justify-center w-full">
             {isLoading && !projects?.length ? (
                  [1,2,3,4].map((item, i) => (
                    <Slide damping={0.1 * i}>
                      <LoadingCard key={i} />
                    </Slide>
                  ))
             ) : (
                projects?.slice(0, 4).map((item, i) => (
                    <Slide damping={0.1 * i}>
                    <ProjetCard key={i} title={item.title} para={item.des} link={`/blog/${item.blog_id}`} image={item.banner} />
                    </Slide>
                ))
             )}
          </div>
          </div>
            
          </div>

          {/* our lecturer */}
          <div class="bg-gradient-to-r from-[#d2c2dd] flex to-[#b98cdc] md:h-[100%] justify-center h-full w-full" >
            <div className='w-full p-4 md:p-10 flex h-full flex-wrap max-w-[1300px] items-center content-center place-content-center justify-center align-middle'>
                <div className='md:mt-0 md:w-[45%] mt-14 items-center content-center place-content-center w-full h-full flex-col justify-center align-middle'>
                 <Slide damping={0.1}>
                    <h1 className='text-4xl font-bold text-[#191A1A] mb-8'>Meet Our Lecturer</h1>
                    <p className='text-xl mr-6 text-[#191A1A]'>Mr. Ọsẹmwegie-Ẹro Irredia Liberty is a language curriculum expert and instructional technologist. He currently serves as Assistant Lecturer in the Department of Curriculum and Instructional Technology at the University of Benin, Nigeria. With his expertise, Mr. Liberty is well-equipped to provide valuable insights into language instruction and the integration of technology in education. His contributions to the field of education are sure to benefit both his students and the larger academic community.</p>
                    <h1 className='mt-4 text-[#191A1A] font-bold text-3xl'>Irredia Liberty</h1>
                    <h2 className='mt-2 text-[#5a6565] font-bold text-3xl'>Lecturer</h2>
                </Slide>
                </div>
                <div className='md:mt-0 rounded-full md:w-[55%] object-contain w-full mt-8'>
                    <Slide damping={0.2} className='rounded-full'>
                      <img src={OurLecturer} className='object-contain rounded-full h-full md:h-[500px]  w-full' alt="banner-image" />
                    </Slide>
                </div>
            </div>
          </div>

          {/* our Team */}
          <div className='p-4 md:p-10 mt-4 justify-center align-middle text-center items-center place-content-center md:mt-8 flex flex-col h-full w-full'>
             <div className=' max-w-[1300px] items-center content-center place-content-center justify-center align-middle'>
             <Slide damping={0.1} className='text-4xl font-bold'>Meet Our Team</Slide>

                <div class="grid space-y-8 md:space-y-0 grid-cols-1 md:grid-cols-4 gap-2 mt-12 place-content-center justify-center w-full">
                    {TeamItem.slice(0, 4).map((item, i) => (
                        <Slide damping={0.1 * i}>
                        <TeamCard key={i} name={item.name} role={item.role} image={item.image} />
                        </Slide>
                    ))}
                </div>

                <Slide damping={0.1} className='w-full mt-6'>
                <Link to="/team"><button className="btn-purple md:w-2/3 mt-8 w-full py-4">View All</button></Link>
                </Slide>
             </div>
          </div>

          {/* Footer */}
          <div class="bg-gradient-to-r from-[#785a8e] content-center items-center mt-4 flex place-content-center flex-col to-[#5E4075] md:h-[100%] justify-center h-full w-full">
            <div className='w-full p-4 "grid space-y-8 md:space-y-0 grid-cols-1 md:grid-cols-5 gap-[7rem] mt-12  md:p-10 flex h-full flex-wrap max-w-[1300px] content-center place-content-center justify-center '>
                <Slide damping={0.1}>
                    <h1 className='text-4xl text-white font-bold'>ITEDO223</h1>
                </Slide>

                <div>
                    <Slide damping={0.2} className='text-xl font-light text-white'>1154, P.M.B, Benin Ore Rd, </Slide>
                    <Slide damping={0.2} className='text-xl mt-2 font-light text-white'>Uniben, Benin City, Edo </Slide>

                    <div className='mt-8'>
                      <Slide damping={0.2} className='text-xl font-light text-white'>(+234) 9060303571 </Slide>
                      <Slide damping={0.2} className='text-xl font-light mt-4 text-white'>osemwegie.iredia@uniben.edu</Slide>
                    </div>
                </div>

                <div damping={0.3} className='space-y-2'>
                    <Slide damping={0.2} className='text-xl font-light text-white'>About</Slide>
                    <Slide damping={0.2} className='text-xl font-light text-white'>Career</Slide>
                    <Slide damping={0.2} className='text-xl font-light text-white'>Partners</Slide>
                    <Slide damping={0.2} className='text-xl font-light text-white'>Contact</Slide>
                    <Slide damping={0.2} className='text-xl font-light text-white'>Location</Slide>
                </div>

                <div damping={0.4} className='space-y-2'>
                    <Slide damping={0.2} className='text-xl font-light text-white'>Facebook</Slide>
                    <Slide damping={0.2} className='text-xl font-light text-white'>Twitter</Slide>
                    <Slide damping={0.2} className='text-xl font-light text-white'>Linkedin</Slide>
                    <Slide damping={0.2} className='text-xl font-light text-white'>Instagram</Slide>
                </div>

                <Slide damping={0.5}>
                    <button onClick={() => {window.scrollTo(0, 0)}}><img src={Arrow} alt='arrow' className='h-20 w-20 object-contain'/></button>
                </Slide>
            </div>

            <div damping={0.6} className='mt-8 text-center p-2 md:p-8'>
                        <Slide damping={0.2} className='text-xl font-light text-white'>© 2024 ITEDO223. All rights reserved.</Slide>
            </div>
          </div>

      </div>
   )
 }
 
 export default HomePage