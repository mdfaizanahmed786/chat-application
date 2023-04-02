import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Props = {};

const UserInfo = (props: Props) => {
  const [user, setUser] = useState<User>({
    name:'',
    _id:'',
    email:"",
    channels:[]
  });
  const registeredUser = JSON.parse(localStorage.getItem("token") as string);
  const location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token") as string);
    if (!user) {
      window.location.replace("/login");
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/v1/users/${registeredUser?.user}`,
        {
          headers: {
            Authorization: `Bearer ${registeredUser?.token}`,
          },
        }
      );
     

      setUser(data);
    };
    fetchUser();
  },[]);

 

  return <div className="h-screen flex justify-center items-center">
    <div className="bg-[#110E12] max-w-2xl shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:px-6">
       
        <p className="mt-1  text-xl text-center w-full text-white">
            About You!
        </p>
    </div>
    <div className="">
        <dl>
            <div className="bg-[#3C393F] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-white">
                    Name
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  {user?.name}
                </dd>
            </div>
           
            <div className="bg-[#3C393F] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-white">
                    Email address
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                    {user?.email}
                </dd>
            </div>
            
            <div className="bg-[#3C393F] px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-white">
                    Channels
                </dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">

                  {user?.channels?.length!==0 && user?.channels?.map((channel: any) => (
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={channel?.image} alt="" />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                                {channel?.name}
                            </div>
                            <div className="text-sm text-white">
                                {channel?.description}
                            </div>
                        </div>
                    </div>
                    ))}

                    {user?.channels?.length===0 && <div className="text-sm text-white">
                      You are not subscribed to any channel
                      </div>}

                </dd>
            </div>
        </dl>
    </div>
</div>
  </div>;
};

export default UserInfo;
