import { useContext, useMemo, } from "react";
import ReactPlayer from "react-player";
import { GlobalContext } from "../context/globalContext";
import { useMediaQuery } from "@mantine/hooks";


type Props = {};

const Messages = (props: Props) => {
  const colorArray = ["#3C393F", "#120F13"];
  const matches = useMediaQuery('(max-width: 768px)');
  const loggedInUser = JSON.parse(localStorage.getItem("token") as string);
  
  const globalContext = useContext<GlobalContext | null>(GlobalContext);

  const joinedUser =useMemo(()=> globalContext?.messages?.channel?.users?.filter(
    (user) => user?._id === loggedInUser?.user
  ),[globalContext?.messages?.channel?.users])




 








 

 

  
 
  
  return (
    <div className="h-full">
      {joinedUser?.filter((user) => user._id === loggedInUser?.user).length !==
      0 ? (
        <div>
          {globalContext?.messages?.channel?.messages?.map(
            (message: ArrayOfmessages, i: number) => (
              <div
              key={message._id}
              className={`flex gap-4 w-full   md:px-24 px-5 py-10 justify-center   items-center `}
              style={{
                backgroundImage: `linear-gradient(90deg, ${colorArray[i % 2]} 0%, ${colorArray[(i + 1) % 2]} 100%)`,
              }}
            >
              <div>
              </div>
              <div className="flex flex-col gap-2 justify-center flex-1 ">
                <div className="flex gap-2 items-center">
                <img
                  src={`https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=${message?.user?.name}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                  <p className="text-white font-semibold text-lg">
                    {message?.user?.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {new Date(message.createdAt).toDateString()}
                  </p>
                </div>
                <div className="flex justify-start mx-6 my-1">
                  {message.message.includes(
                    import.meta.env.VITE_FIREBASE_URL
                  )  ? (
                    !message.message.includes('mp4') ?
                    <img
                      src={message.message}
                      className="w-60 rounded-md shadow-md"
                    />
                    :
                

                      <ReactPlayer
                      url={message.message}
                      width={`${matches ? "100%" : "40%"}`}
                      height={`${matches ? "100%" : "40%"}`}
                      controls
                    />
                 

                  ) : (
                    <p className="text-white text-lg px-6">
                      {message.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        )}
   
  
  </div>
)

: (
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <img src="/empty.svg" className="w-52" />
          <p className="font-semibold text-lg">
            Join the channel to start conversation!
          </p>
        </div>
      )}

      {!globalContext?.messages?.channel?.name && (
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <img src="/nochat.svg" className="w-52" />
          <p className="font-semibold text-lg">Select a channel to begin!</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
