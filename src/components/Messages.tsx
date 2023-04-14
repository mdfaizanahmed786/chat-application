import { useContext, useMemo } from "react";
import ReactPlayer from "react-player";
import { GlobalContext } from "../context/globalContext";

import { useMediaQuery } from "@mantine/hooks";
import {
  useInfiniteQuery
} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader, FadeLoader } from "react-spinners";

type Props = {};

const Messages = (props: Props) => {
  const colorArray = ["#3C393F", "#120F13"];
  const matches = useMediaQuery('(max-width: 768px)');
  const loggedInUser = JSON.parse(localStorage.getItem("token") as string);
  
  const globalContext = useContext<GlobalContext | null>(GlobalContext);

  const joinedUser =useMemo(()=> globalContext?.messages?.channel?.users?.filter(
    (user) => user?._id === loggedInUser?.user
  ),[globalContext?.messages?.channel?.users])

  const fetchMessages = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/v1/messages?channelId=${
        globalContext?.channelId
      }&page=${pageParam}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser?.token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  };

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["messages", joinedUser?.length, globalContext?.channelId],
    queryFn: fetchMessages,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < pages[0]?.totalPages) {
        return pages.length + 1;
        // otherwise, return the next page number
      } else {
        return false;
      }
    },
 
    enabled: joinedUser?.length !== 0 && globalContext?.channelId !== "",
  });

  if (
    status === "loading" &&
    globalContext?.channelId !== "" &&
    joinedUser?.length !== 0
  ) {
    return <div className="flex items-center justify-center h-full">
      <FadeLoader color="#ffffff"  />
    </div>;
  }

  
  return (
    <div className="h-full">
      {joinedUser?.length !== 0 ? (
        globalContext?.messages?.channel?.name && (
          <div
            id="scrollableDiv"
            className={`h-full overflow-y-scroll flex ${data?.pages?.[0]?.messages?.length<10 ? "flex-col" : "flex-col-reverse"}  scroll-smooth`}
          
          >
            <InfiniteScroll
              dataLength={data?.pages?.length || 0}
              next={fetchNextPage}
              style={{ display: "flex", flexDirection: `column-reverse`}} //To put endMessage and loader to the top.
              inverse={true}
              hasMore={hasNextPage || false}
              loader={
                <div className="flex justify-center m-7">
                  <ClipLoader color="#ffffff" size={45} />
                </div>
              }
              scrollableTarget="scrollableDiv"
            >
              {data?.pages?.map((message) =>
                message?.messages?.map(
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
                )
              )}
            </InfiniteScroll>
          </div>
        )
      ) : (
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
