import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";

type Props = {};

const Messages = (props: Props) => {
  const colorArray = ["#3C393F", "#120F13"];
  const loggedInUser = JSON.parse(localStorage.getItem("token") as string);
  const messageContext = useContext<GlobalContext | null>(GlobalContext);
  const joinedUsers = messageContext?.messages?.channel?.users;

  return (
    <div className="h-full">
      {joinedUsers?.filter((user) => user._id === loggedInUser?.user).length !==
      0 ? (
        <div>
          {messageContext?.messages?.channel?.messages?.map(
            (message: ArrayOfmessages, i: number) => (
              <div
                key={message._id}
                className={`flex gap-4 w-full bg-[${
                  colorArray[i % colorArray.length]
                }] px-24 py-10 justify-center   items-center `}
              >
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_C7SruCkVSu5AxowynH7TAApdKNH7TD1SLR8tBS5bpQ&usqp=CAU&ec=48665701"
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
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <img src="/empty.svg" className="w-52" />
          <p className="font-semibold text-lg">
            Join the channel to start conversation!
          </p>
        </div>
      )}

      {!messageContext?.messages?.channel?.name && (
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <img src="/nochat.svg" className="w-52" />
          <p className="font-semibold text-lg">Select a channel to begin!</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
