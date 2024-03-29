"use client"
import { Span } from "next/dist/trace";
import Image from "next/image";
import React, { useCallback } from "react";
import { BsTwitter } from "react-icons/bs";
import { RiHome7Fill } from "react-icons/ri";
import { TbHash } from "react-icons/tb";
import { GoBell } from "react-icons/go";
import { CiMail } from "react-icons/ci";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { Inter } from "next/font/google";
import FeedCard from "@/components/feedcard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";


const inter = Inter({ subsets: ["latin"] });

interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItems: TwitterSideBarButton[] = [
  {
    title: "Home",
    icon: <RiHome7Fill />,
  },
  {
    title: "Explore",
    icon: <TbHash />,
  },
  {
    title: "Notifications",
    icon: <GoBell />,
  },
  {
    title: "Messages",
    icon: <CiMail />,
  },
  {
    title: "Bookmarks",
    icon: <PiBookmarkSimpleLight />,
  },
  {
    title: "Twitter Blue",
    icon: <LiaMoneyBillWaveSolid />,
  },
  {
    title: "Profile",
    icon: <CiUser />,
  },
  {
    title: "More",
    icon: <PiDotsThreeCircleLight />,
  },
];

export default function Home() {

  const handleLoginWithGoogle = useCallback (
    async (cred: CredentialResponse) => {
    const googleToken = cred.credential
    if(!googleToken) return toast.error('Google Token Not Found')
    const {verifyGoogleToken} = await graphQLClient.request(
      verifyUserGoogleTokenQuery,{token: googleToken}
      )

      toast.success('Verified Sucess')
      console.log(verifyGoogleToken)

      if(verifyGoogleToken) window.localStorage.setItem('__twitter_token',verifyGoogleToken)
  },[])

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className=" col-span-3 pt-1 ml-20">
          <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all ">
            <BsTwitter />
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                  key={item.title}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-5 pl-2">
              <button className="bg-[#1d9bf0] py-2 rounded-full font-semibold w-full text-lg ">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px]  border-gray-900 h-screen overflow-y-scroll no-scrollbar">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New To Twitter ?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}