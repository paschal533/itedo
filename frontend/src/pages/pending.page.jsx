// import Blog from "../components/blog.component";
import React from "react";
import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import PageNotFound from "./404.page";
import { blogStructure } from "./editor.pages";
import { getDay } from "../common/date";
import BlogContent from "../components/blog-content.component";
import BlogPlayer from "../components/blog-player.component"
import {Button} from "@nextui-org/react";
import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "../App";
import ConversationPage from "../components/AI/blog-AI-component";

export const BlogPageContext = createContext({});

const PendingPage = () => {
    let { blog_id } = useParams(); 

    let navigate = useNavigate();

    const [ blog, setBlog ] = useState(blogStructure);
    const [ likedByUser, setLikedByUser ] = useState(false);
    const [ loading, setLoading ] = useState(true); 
    const [ commentWrapper, setCommentWrapper ] = useState(false);
    const [ totalParentCommentsLoaded, setTotalParentCommentsLoaded ] = useState(0);
    const [text, setText] = React.useState('');

    let { userAuth: { access_token, email }, userAuth } = useContext(UserContext);


    let { title, content, banner, author: { personal_info: { username: author_username, fullname, profile_img } }, publishedAt } = blog;

    const checkAdmin = () => {
        if(email == "okwuosahpaschal@gmail.com" || email == "osemwegie.iredia@uniben.edu"){
            return true;
        }else {
            return false;
        }
    }

    useEffect(() => {

        resetPage();
        
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
        .then( async ({ data: { blog } }) => {
            
            setBlog(blog);
            setLoading(false);
            
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });

    }, [blog_id]);

    const resetPage = () => {
        setBlog(blogStructure);
        setLoading(true)
        setTotalParentCommentsLoaded(0);
    }

    const ApprovePost = async () => {
        let loadingToast = toast.loading("Publishing...");

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/approve-post", { blog_id })
        .then( async (data) => {
            toast.dismiss(loadingToast);
            toast.success("Published 👍");
            setTimeout(() => {
                navigate(`/dashboard/blogs`);
            }, 500);
        })
        .catch((error) => {
            console.log(error)
            toast.dismiss(loadingToast);
            return toast.error('Something went wrong.')
        })
    }

    useEffect(() => {
        const getText = () => {
            let result = ''
            content[0]?.blocks.map((block, i) => {
               if(block.type == "paragraph" || block.type == "header"){
                 result = result + " " + block.data.text + "."
               }else if(block.type == "list"){
                 block.data.items.map((item, i) => {
                    result = result + " " + item +"."
                 })
               }
            })
    
            let res = result.replace(/&nbsp;/g, " ")
    
            setText(res)
        }
    
        getText();
      }, [text, content])


    return (
        <>
        <AnimationWrapper> 
        <ConversationPage text={"Does this violate plagiarism" + "" + text + ""} />
            {
                loading ? 
                <Loader />
                : title.length ? 
                
                <BlogPageContext.Provider value={{ blog, setBlog, likedByUser, setLikedByUser, commentWrapper, setCommentWrapper, totalParentCommentsLoaded, setTotalParentCommentsLoaded }}>


                    <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">

                        <img src={banner} className="aspect-video" />


                        <div className="mt-12">
                            <h2>{title}</h2>

                            <div className="flex max-sm:flex-col justify-between my-8">
                                <div className="flex gap-5 items-start">
                                    <img src={profile_img} className="w-12 h-12 rounded-full" />
                                    <p className="capitalize">
                                        {fullname}
                                        <br />
                                        @
                                        <Link to={`/user/${author_username}`} className="underline">
                                            {author_username}
                                        </Link>
                                    </p>
                                </div>
                                <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">Published on {getDay(publishedAt)}</p>
                            </div>
                        </div>

                        <BlogPlayer blog={blog} />

                        {/* Blog Content */}
                        <div className="my-12 font-gelasio blog-page-content">
                            {
                                content[0].blocks.map((block, i) => {
                                    return  <div key={i} className="my-4 md:my-8">
                                                <BlogContent block={block} />
                                            </div>
                                })
                            }
                        </div>

                      
                        {checkAdmin() ? (<Button onClick={ApprovePost} color="success" className="text-white" endContent={<i classname="fi fi-rs-memo-circle-check"></i>}>
                            Approve 👍
                        </Button>) : (<p className="text-xl font-semibold">This post is under review</p>)}
                    </div>
                </BlogPageContext.Provider>

                : <PageNotFound />
            }

            <Toaster />

        </AnimationWrapper>

        </>
    );
};

export default PendingPage;