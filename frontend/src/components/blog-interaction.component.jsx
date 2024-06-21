import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlogPageContext } from "../pages/blog.page";
import { UserContext } from "../App";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import axios from "axios";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    MailruShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    PinterestIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    MailruIcon,
    EmailIcon,
  } from "react-share";

const BlogInteraction = () => {

    let { blog, blog: { title, _id, banner, blog_id, activity, activity: { total_likes, total_comments }, author : { personal_info: { username: aurthorUsername } } }, setBlog, likedByUser, setLikedByUser, setCommentWrapper } = useContext(BlogPageContext);
    
    let { userAuth: { username, access_token } } = useContext(UserContext);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [url, setUrl] = useState(location.href);
    const [name, setName] = useState(title);
    const [image, setImage] = useState(banner);

    let navigate = useNavigate();

    useEffect(() => {

        if(username){
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/isliked-by-user", { blog_id: _id }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({data: { result }}) => {
                setLikedByUser(Boolean(result));
            })
            .catch(err => {
                console.log(err)
            })
        }
        
    }, [username])

    const handleLike = () => {

        if ( access_token ) {
            setLikedByUser(Boolean(!likedByUser));

            !likedByUser ? total_likes++ : total_likes-- ;

            setBlog({ ...blog, activity: { ...activity, total_likes } });

            // like the post
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/like-blog", { _id , likedByUser: Boolean(likedByUser) }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`, 
                }
            })
            .then(({data}) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            navigate("/signin")
        }

    }

    return (
        <>
            <hr className="border-grey my-2" />
            <div className="w-full p-1 px-5 flex items-center justify-between">

                <div className="flex gap-6">
                    <div className="flex gap-3 items-center">
                        <button onClick={handleLike} 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${ likedByUser ? "bg-red/20 text-red" : "bg-grey/80" }`}>
                        <i className={`fi ${ likedByUser ? "fi-sr-heart" : "fi-rr-heart" } text-xl mt-2 pointer-events-none`}></i>
                        </button>
                        <p className="text-xl text-dark-grey">{total_likes}</p>
                    </div>

                    <div className="flex gap-3 items-center">
                        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80" onClick={() => setCommentWrapper(preVal => !preVal)}>
                        <i className="fi fi-rr-comment-dots text-xl mt-2"></i>
                        </button>
                        <p className="text-xl text-dark-grey">{total_comments}</p>
                    </div>
                </div>

                <div className="flex gap-6 items-center">
                    { username == aurthorUsername ? 
                        <Link to={`/editor/${blog_id}`} className="underline hover:text-purple">Edit</Link> : ""
                    }

                    <div onClick={onOpen} className="pt-2 cursor-pointer"><i className="fi fi-bs-share text-2xl hover:text-share"></i></div>
                </div>

            </div>
            <hr className="border-grey my-2" />

            <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent className="text-justify lg:!px-1">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Share Post On</ModalHeader>
              <ModalBody>
                <div className="flex w-full space-x-1 flex-wrap justify-center items-center">
                <TwitterShareButton url={url} title={name}>
                    <TwitterIcon size={40} round />
                </TwitterShareButton>

                <TelegramShareButton url={url} title={name}>
                    <TelegramIcon size={40} round />
                </TelegramShareButton>

                <WhatsappShareButton url={url} title={name} separator=":: ">
                    <WhatsappIcon size={40} round />
                </WhatsappShareButton>

                <FacebookShareButton url={url} quote={name}>
                    <FacebookIcon size={40} round />
                </FacebookShareButton>

                <LinkedinShareButton url={url} title={name}>
                    <LinkedinIcon size={40} round />
                </LinkedinShareButton>

                <RedditShareButton
                    url={url}
                    title={name}
                    windowWidth={660}
                    windowHeight={460}
                >
                    <RedditIcon size={40} round />
                </RedditShareButton>

                <MailruShareButton url={url} title={name}>
                    <MailruIcon size={40} round />
                </MailruShareButton>

                <EmailShareButton url={url} subject={name} body="body">
                    <EmailIcon size={40} round />
                </EmailShareButton>

                <PinterestShareButton url={url} media={image}>
                    <PinterestIcon size={40} round />
                </PinterestShareButton>
             </div>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-[#5E4075] text-white" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </>
    )
}

export default BlogInteraction;