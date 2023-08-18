import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../../styles/styles';
import { AiOutlineMessage } from 'react-icons/ai';
import { backend_url } from '../../../server';

const ArtisanDetailsCard = ({setOpen,data}) => {
    //const [click,setClick] = useState(false);
    // const [select,setSelect] = useState(false);

    const handleMessageSubmit = {

    }

  return (
    <div className='bg-[#fff]'>
        {
            data ? (
                <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
                    <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
                        <RxCross1 size={30} 
                        className='absolute right-3 top-3 z-50'
                        onClick={() => setOpen(false)}
                        />
                        <div className="block w-full 800px:flex">
                            <div className="w-full 800px:w-[50%]">
                                <img 
                                src={`${backend_url}${data?.images[0]}`} 
                                className='w-full h-[450px] object-contain mb-3'
                                alt="" />
                                <div className="flex">
                                    <img src={`${backend_url}${data?.shop.avatar}`} 
                                    className='w-[50px] h-[50px] rounded-full mr-2'
                                    alt="" />
                                    <div>
                                        <h3 className={`${styles.shop_name}`}> 
                                            {data.shop.name}
                                        </h3>
                                        <h5 className='pb-3 text-[15px]'>
                                            (4/5) Ratings
                                        </h5>
                                    </div>
                                </div>
                                <div className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                                onClick={handleMessageSubmit}
                                >
                                    <span className='text-[#fff] flex items-center'>
                                        Send Message <AiOutlineMessage className='ml-1' />
                                    </span>
                                </div>
                            </div>

                            <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                                <h1 className={`${styles.productTitle} text-[20px]`}> 
                                    {data.name}
                                </h1>
                                <p>{data.description}</p>
                                <div className='flex pt-3'>
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        {data.staffNumber} Staffs | {data.operationYears} Years in operation
                                    </h4>
                                </div>
                                <h5 className='text-[16px] text-[red] mt-5'>
                                    {data.shop.address}
                                </h5>
                            </div>  
                        </div>
                    </div>
                </div>
            ) : null
        }
    </div>
  )
}

export default ArtisanDetailsCard