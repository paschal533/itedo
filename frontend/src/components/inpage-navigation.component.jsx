/* eslint-disable react/prop-types */
import { createRef, useEffect, useState } from "react";

export const activeTabLineRef = createRef();
export const activeTabRef = createRef();

const InPageNavigation = ({className, routes, defaultHidden = [], defaultActiveIndex = 0, children}) => {

    let [inPageNavIndex, setInPageNavIndex] = useState(0)

    let [ isResizeEventAdded, setIsResizeEventAdded] = useState(false);

    let [ width, setWidth] = useState(window.innerWidth);

    const changePageState = (e, i) => {
        let { offsetWidth, offsetLeft } = e;

        activeTabLineRef.current.style.width = offsetWidth + "px";
        activeTabLineRef.current.style.left = offsetLeft + "px";

        setInPageNavIndex(i)

    }

    useEffect(() => {
        if(width > 766 && inPageNavIndex != defaultActiveIndex){
            changePageState( activeTabRef.current, defaultActiveIndex );
        }
         
        if(!isResizeEventAdded){
            window.addEventListener('resize', () => {
                if(!isResizeEventAdded){
                    setIsResizeEventAdded(true);
                }
                setWidth(window.innerWidth);
            })
        }
    }, [width])

    return (
        <>
            <div className={"relative mb-8 font-bold bg-white border-b border-grey flex flex-nowrap overflow-x-auto " + className}>
                {routes.map((route, i) => {
                    return (
                        <button ref={ i == defaultActiveIndex ? activeTabRef : null } 
                            className={"p-4 px-5 capitalize " + (defaultHidden.includes(route) ? " md:hidden " : "") + (inPageNavIndex == i ? "text-black" : "text-dark-grey")} 
                            key={i} 
                            onClick={(e) => changePageState(e.target, i)}
                        >
                            {route}
                        </button>
                    )
                })}
                
                <hr ref={activeTabLineRef} className="absolute bottom-0 duration-500 border-dark-grey" />
            </div>

            {Array.isArray(children) ? children[inPageNavIndex] : children}

        </>

    )
}

export default InPageNavigation;