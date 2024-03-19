import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";





const FeedCard: React.FC = () => {
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-900 p-5 hover:bg-gray-900 transition-all cursor-pointer ">
      <div className="grid grid-cols-12">
      <div className="col-span-1">
        <Image className="rounded-full p-1"
          src="https://avatars.githubusercontent.com/u/113224698?v=4"
          alt="user-image"
          height={50}
          width={50}
        />
      </div>
      <div className="col-span-11">
        <h5>Hariharan</h5>
        <p>
        “The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.”
        </p>
        <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
    <div>
    <BiMessageRounded />
    </div>
    <div>
    <FaRetweet />
    </div>
    <div>
    <FaRegHeart />
    </div>
    <div>
    <MdOutlineFileUpload />
    </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FeedCard;
