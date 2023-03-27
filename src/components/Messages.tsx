import React from "react";

type Props = {};

const Messages = (props: Props) => {
  const colorArray=["#828282", "#120F13"]
  return (
    <div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className={`flex gap-4 w-full bg-[${colorArray[i%(colorArray.length)]}] px-24 py-10 justify-center   items-center `}>
          <div>
            <img
              src="https://image-upload-nidx.onrender.com/uploads/fifafinal.jpeg"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center flex-1 ">
            <div className="flex gap-2 items-center">
              <p className="text-[#828282] font-semibold text-lg">Nouman Ahmed</p>
              <p className="text-gray-400 text-sm">yesterday, 4:40PM</p>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id corporis nesciunt excepturi, sit suscipit labore quam. Iure voluptates voluptatem dolores.
               
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
