import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {};

const Messages = (props: Props) => {
  const colorArray = ["#3C393F", "#120F13"];
  const loggedInUser = JSON.parse(localStorage.getItem("token") as string);
  const queryClient = useQueryClient();
  const globalContext = useContext<GlobalContext | null>(GlobalContext);
  const joinedUsers = globalContext?.messages?.channel?.users;
  const joinedUser = globalContext?.messages?.channel?.users?.filter(
    (user) => user?._id === loggedInUser?.user
  );

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

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["messages", globalContext?.channelId, joinedUser?.length],
    queryFn: fetchMessages,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < pages[0]?.totalPages) {
        return pages.length + 1;
        // otherwise, return the next page number
      } else {
        return false;
      }
    },
    enabled: joinedUser?.length !== 0,
  });

  if (
    status === "loading" &&
    globalContext?.channelId !== "" &&
    joinedUser?.length !== 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full scroll-smooth">
      <div
        id="scrollableDiv"
        style={{
          height: "100%",
          overflowY: "scroll",

          display: "flex",
          flexDirection: "column-reverse",
          scrollBehavior: "smooth",
        }}
      >
        <InfiniteScroll
          dataLength={data?.pages?.length || 0}
          next={fetchNextPage}
          style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
          inverse={true}
          hasMore={hasNextPage || false}
          loader={<h4>Cra</h4>}
          scrollableTarget="scrollableDiv"
        >
          {data?.pages?.map((message, i: number) =>
            message?.messages?.map((message: ArrayOfmessages, i: number) => (
              <div
                key={message._id}
                className={`flex gap-4 w-full bg-[${
                  colorArray[i % colorArray.length]
                }] md:px-24 px-5 py-10 justify-center   items-center `}
              >
                <div>
                  <img
                    src={`https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=${message?.user?.name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center flex-1 ">
                  <div className="flex gap-2 items-center">
                    <p className="text-[#828282] font-semibold text-lg">
                      {message?.user?.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(message.createdAt).toDateString()}
                    </p>
                  </div>
                  <div>
                    {message.message.includes(
                      import.meta.env.VITE_FIREBASE_URL
                    ) ? (
                      <img
                        src={message.message}
                        className="w-52 rounded-md shadow-md"
                      />
                    ) : (
                      <p className="text-white text-lg">{message.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Messages;
