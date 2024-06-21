import { useContext, useEffect, useState } from "react";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import { ManagePublishedBlogPost, ManageDraftBlogPost } from "../components/manage-blogcard.component";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import { UserContext } from "../App";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const ManageBlogs = () =>{

    let activePage = useSearchParams()[0].get("tab");

    const [ blogs, setBlogs ] = useState(null);
    const [ drafts, setDrafts ] = useState(null);
    const [ query, setQuery ] = useState();
    const [pendings, setPendings] = useState();
    const [users, setUsers] = useState(null);
    const [isLoading, setIsloading] = useState(false)

    let { userAuth: { access_token, email }, userAuth } = useContext(UserContext);

    const checkAdmin = () => {
        if(email == "okwuosahpaschal@gmail.com" || email == "osemwegie.iredia@uniben.edu"){
            return "/all-written-blogs";
        }else {
            return "/user-written-blogs";
        }
    }

    const isAdmin = () => {
        if(email == "okwuosahpaschal@gmail.com" || email == "osemwegie.iredia@uniben.edu"){
            return true;
        }else {
            return false;
        }
    }

    const checkAdminBlogCount = () => {
        if(email == "okwuosahpaschal@gmail.com" || email == "osemwegie.iredia@uniben.edu"){
            return "/all-written-blogs-count";
        }else {
            return "/user-written-blogs-count";
        }
    }

    const getBlogs = ({ page, draft, deletedDocCount = 0, pending }) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + checkAdmin(), { 
            page: page, 
            draft,
            query,
            pending,
            deletedDocCount
        } , {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(async ( { data }) => {

            let formatedData = await filterPaginationData({
                arr: draft ? drafts : pending ? pendings : blogs, 
                data: data.blogs,
                page,
                user: access_token,
                countRoute: checkAdminBlogCount(),
                data_to_send: { draft, query, pending }
            })

            if (draft) {
                setDrafts(formatedData);
            } else if(pending) {
                setPendings(formatedData)
            } else {
                setBlogs(formatedData);
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        
        if(access_token) {
            if(blogs == null){
                getBlogs({ page: 1, draft: false, pending: false })
            }
            if(drafts == null){
                getBlogs({ page: 1, draft: true, pending: true })
            }
            if(pendings == null){
                getBlogs({ page: 1, pending: true, draft: false })
            }
        }

    }, [access_token, blogs, drafts, query, pendings])

    useEffect(() => {
       const getUsers = () => {
        setIsloading(true)
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/users")
        .then(async ( { data }) => {
            setUsers(data?.users)
            setIsloading(false)
        }).catch(err => console.log(err))
       }

         getUsers()
    }, [])

    const RemoveUser = (user_id) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/delete-user", { user_id: user_id })
        .then(() => {
            toast.success("User Removed 👍");
        })
        .catch(err => {
            console.log(err)
            return toast.error(err)
        })
    }

    const handleSearch = (e) => {
        let searchQuery = e.target.value

        setQuery(searchQuery);

        if(e.keyCode == 13 && searchQuery.length) { // enter key   
            setBlogs(null);
            setDrafts(null); 
            setPendings(null)           
        }

    }

    const handleChange = (e) => {
        if(!e.target.value.length){
            setQuery("");
            setBlogs(null);
            setDrafts(null);  
            setPendings(null) 
        }
    }

    const UserCard = ({ user }) => {
        return (
            <div className="w-full flex items-center place-content-center justify-between">
                <div className="w-full flex">
                    <img src={user?.personal_info.profile_img} className="h-[4rem] w-[4rem] rounded-full object-contain" alt="profile" />
                    <div className="ml-4">
                        <h1 className="text-xl font-bold">{user?.personal_info.fullname}</h1>
                        <Link to={`/user/${user?.personal_info.username}`}><p className="text-md underline mt-1 font-light">@{user?.personal_info.username}</p></Link>
                    </div>
                </div>
                <button onClick={() => RemoveUser(user?._id)} className="bg-red h-[40px] p-2 text-white rounded-md">Remove</button>
            </div>
        )
    }


    return (
        <>
            <h1 className="max-md:hidden font-bold">Manage Projects</h1>

            <Toaster />
            
            <div className="relative max-md:mt-5 md:mt-8 mb-10" id="searchBox">
                <input
                    type="search"
                    className="w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey"
                    placeholder="Search Projects"
                    onKeyDown={handleSearch}
                    onChange={handleChange}
                />

                <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
            </div>

            <InPageNavigation routes={["Published Projects", "Drafts", "Pending", isAdmin() ? ("Users") : (null)]} defaultActiveIndex={ activePage != 'draft' ? 0 : 1 } >

                {   // published blog cards
                    blogs == null ? <Loader /> :
                    blogs.results.length ? 
                        <>
                            {
                                blogs.results.map((blog, i) => {
                                return <AnimationWrapper key={i} transition={{delay: i * 0.04}}>
                                            <ManagePublishedBlogPost blog={{ ...blog, setBlogArr: setBlogs, index: i }} />
                                    </AnimationWrapper>
                                })
                            }
                            
                            <LoadMoreDataBtn dataArr={blogs} fetchDataFunc={getBlogs} additionalParams={{ draft: false, pending: false, deletedDocCount: blogs.deletedDocCount }}/>

                        </>
                    : <NoDataMessage message="No published blogs" /> 
                }


                {   // draft blog cards
                    drafts == null ? <Loader /> :
                    drafts.results.length ? 
                        <>
                            {
                                drafts.results.map((blog, i) => {
                                return <AnimationWrapper key={i} transition={{delay: i * 0.04}}>
                                            <ManageDraftBlogPost blog={{ ...blog, setBlogArr: setDrafts, index: i }} />
                                    </AnimationWrapper>
                                })
                            }
                            
                            <LoadMoreDataBtn dataArr={drafts} fetchDataFunc={getBlogs} additionalParams={{ draft: true, pending: true, deletedDocCount: drafts.deletedDocCount }}/>

                        </>
                    : <NoDataMessage message="Nothing in draft" /> 
                }

                {
                  // published blog cards
                  pendings == null ? <Loader /> :
                    pendings.results.length ? 
                        <>
                            {
                                pendings.results.map((blog, i) => {
                                return <AnimationWrapper key={i} transition={{delay: i * 0.04}}>
                                            <ManagePublishedBlogPost isPending blog={{ ...blog, setBlogArr: setPendings, index: i }} />
                                    </AnimationWrapper>
                                })
                            }
                            
                            <LoadMoreDataBtn dataArr={pendings} fetchDataFunc={getBlogs} additionalParams={{ draft: false, pending: true, deletedDocCount: pendings.deletedDocCount }}/>

                        </>
                    : <NoDataMessage message="No pending post" />
                }

               <div className="space-y-4"> {
                    isLoading ? <Loader/> : users?.length > 0 ? users.map((user, i) => (
                        <div key={i}><UserCard user={user} key={i} /></div>
                    ))  : <NoDataMessage message="No user" />
                }</div>

            </InPageNavigation>

        </>
    )
}

export default ManageBlogs;