import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { backend_url } from '../../server';
import { server } from "../../server";
import { toast } from "react-toastify";
import styles from '../../styles/styles';
import { AiOutlinePlusCircle, AiOutlineMessage} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServicesShop } from '../../redux/actions/service';
import { createQuote } from '../../redux/actions/quote';
import axios from "axios";


const ArtisanDetails = ({data}) => {
    const [click,setClick] = useState(false);
    const [select,setSelect] = useState(0);
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.user);

    
    const {services} = useSelector((state) => state.services);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllServicesShop(data && data.shop._id));
    }, [dispatch,data])

    const handleMessageSubmit = async () => {
        if (isAuthenticated) {
          const groupTitle = data._id + user._id;
          const userId = user._id;
          const sellerId = data.shop._id;
          await axios
            .post(`${server}/conversation/create-new-conversation`, {
              groupTitle,
              userId,
              sellerId,
            })
            .then((res) => {
              navigate(`/inbox?${res.data.conversation._id}`);
            })
            .catch((error) => {
              toast.error(error.response.data.message);
            });
        } else {
          toast.error("Please login to create a conversation");
        }
      };

  return (
    <div className='bg-white'>
        {
            data ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                    <div className="w-full py-5">
                        <div className="block w-full 800px:flex">
                            <div className="w-full 800px:w-[50%]">
                                <img src={`${backend_url}${data && data.images[select]}`} alt="" className='w-[80%]' />
                                <div className="w-full flex">
                                    {
                                       data && data.images.map((i,index) => (
                                        <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                            <img src={`${backend_url}${i}`} alt="" 
                                            className='h-[200px] overflow-hidden mr-3 mt-3'
                                            onClick={() => setSelect(index)}
                                            />
                                        </div>
                                       ))  
                                    }
                                    
                                    <div className={`${select === 1 ? "border" : "null"} cursor-pointer`}>

                                    </div>
                                </div>
                            </div>
                            <div className="w-full 800px:w-[50%] pt-5">
                                <h1
                                className={`${styles.productTitle}`}
                                >
                                    {data.name}
                                </h1>
                                <p>{data.description}</p>
                                <div className="flex items-center pt-8">
                                    <img src={`${backend_url}${data?.shop?.avatar}`} alt="" 
                                    className='w-[50px] h-[50px] rounded-full mr-2'
                                    />
                                    <div className="pr-8">
                                        <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                            {data.shop.name}
                                        </h3>
                                        <h5 className='pb-3 text-[15px]'>
                                            (4/5) Ratings
                                        </h5>
                                    </div>
                                    <div className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                                    onClick={handleMessageSubmit}
                                    >
                                        <span className='text-white flex items-center'>
                                            Send Message <AiOutlineMessage className='ml-1' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ArtisanDetailsInfo data={data} services={services}/>
                    <br />
                    <br />
                </div>
            ) : null
        }
    </div>
  );
};

const ArtisanDetailsInfo = ({data,services}) => {
    const [active,setActive] = useState(1);
    const [images,setImages] = useState([]);
    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { user, isAuthenticated } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        e.preventDefault();

        let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleSubmit = (e) => {
        if (isAuthenticated) {
            e.preventDefault();

            const newForm = new FormData();

            images.forEach((image) => {
                newForm.append("images", image);
            });
            newForm.append("title", title);
            newForm.append("description", description);
            newForm.append("shopId", data.shop._id); 
            newForm.append("userId", user); 
            dispatch(createQuote(newForm));
            toast.success("Your request have been submitted successfully!");
        } else {
            toast.error("Please login to request a quote!");
          } 
    };

    return (
        <div className='bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded'>
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5
                    className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                    }
                    onClick={() => setActive(1)}
                    >
                        Artisan Information

                    </h5>
                    {active === 1 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                    className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                    }
                    onClick={() => setActive(2)}
                    >
                        Artisan Reviews

                    </h5>
                    {active === 2 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                    className={"text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                    }
                    onClick={() => setActive(3)}
                    >
                        Request Quote

                    </h5>
                    {active === 3 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>
            </div>
            {
                active === 1 && (
                    <div className="w-full block 800px:flex p-5">
                        <div className="w-full 800px:w-[50%]">
                            <div className="flex items-center">
                                <img 
                                src={`${backend_url}${data?.shop.avatar}`} 
                                className='w-[50px] h-[50px] rounded-full'
                                alt="" />
                                <div className="pl-3">
                                    <h3 className={`${styles.shop_name}`}>
                                        {data.shop.name}
                                    </h3>
                                    <h5 className='pb-2 text-[15px]'>
                                        (4/5) Ratings
                                    </h5>
                                </div>
                            </div>
                            <p className="pt-2">
                                {data.shop.description}
                            </p>
                        </div>
                        <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
                            <div className="text-left">
                                <h5 className='font-[600]'>
                                    Joined on: <span className='font-[500]'>{data.shop?.createdAt?.slice(0,10)}</span>
                                </h5>
                                <h5 className='font-[600]'>
                                    Total Services: <span className='font-[500]'>{services && services.length}</span>
                                </h5>
                                <h5 className='font-[600]'>
                                    Total Reviews: <span className='font-[500]'>0</span>
                                </h5>
                                <Link to={`/shop/preview/${data.shop._id}`}>
                                    <div className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}>
                                        <h4 className="text-white">Visit Shop</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                active === 2 ? (
                    <div className="w-full justify-center min-h-[40vh] flex items-center">
                        <p>No Reviews yet!</p>
                    </div>
                ) : null
            }

            {
                active === 3 ? (
                    <>
                    <div className="w-full block 800px:flex p-5">
                        <div className="w-full">
                            <div className="w-full mt-5 800px:mt-0 800px:flex flex-col items-end">
                            <div className="text-left">
                                    <h5 className='font-[600]'>
                                        Mail us on: <span className='font-[500]'>{data.shop?.email}</span>
                                    </h5>
                                    <h5 className='font-[600]'>
                                        Contact us on: <span className='font-[500]'>{data.shop?.phoneNumber}</span>
                                    </h5>
                                    <Link to={`/shop/preview/${data.shop._id}`}>
                                        <div className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}>
                                            <h4 className="text-white">Visit Shop</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                         {/* create request */}
                        {/* <form onSubmit={handleSubmit}>
                            <br />
                            <div>
                                <label className='pb-2'>
                                    Title <span className='text-red-500'>*</span>
                                </label>
                                <input 
                                type="text"
                                name="title"
                                value={title}
                                className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Enter request title...'
                                />
                            </div>
                            <br />
                            <div>
                                <label className='pb-2'>
                                    Description <span className='text-red-500'>*</span>
                                </label>
                                <textarea
                                cols="30"
                                required
                                rows="8" 
                                type="text"
                                name="description"
                                value={description}
                                className='mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Enter request description...'
                                ></textarea>
                            </div>
                            <br />
                            <div>
                                <label className='pb-2'>
                                    Upload Images <span className='text-red-500'>*</span>
                                </label>
                                <input type="file" 
                                name='images'
                                id='upload'
                                className='hidden'
                                multiple
                                onChange={handleImageChange}
                                />
                                <div className="w-full flex items-center flex-wrap">
                                <label htmlFor="upload">
                                    <AiOutlinePlusCircle 
                                    size={30}
                                    className='mt-3'
                                    color='#555'
                                    />
                                </label>
                                {
                                    images &&
                                    images.map((i) => (
                                        <img 
                                        src={URL.createObjectURL(i)} 
                                        key={i}
                                        className='h-[120px] w-[120px] object-cover m-2'
                                        />
                                    ))
                                }
                                </div>
                                <br />
                                <div>
                                    <input type="submit" value="Send Request"
                                    className='mt-2 cursor-pointer bg-[#000000] text-[#fff] appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                    />
                                </div>
                            </div>

                        </form> */}
                    </>
                ) : null
            }
            
        </div>
    )
}

export default ArtisanDetails;