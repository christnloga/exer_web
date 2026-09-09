import { BiSolidQuoteLeft } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import RevealElement from "./RevealElement";
// import { renderStars } from "../utils/helpers";
const renderStars = (rating: number) =>
  Array.from({ length: rating }, (_, i) => i);

interface TestimonialCardAltProps {
  name: string;
  image: string;
  feedback: string;
  rating: number;
  position: string;
}

const TestimonialCardAlt = ({
  name,
  image,
  feedback,
  rating,
  position,
}: TestimonialCardAltProps) => {
  return (
    <div className="relative flex flex-col items-start lg:items-end gap-4 cursor-default">
      {/* Bubble */}
      <RevealElement>
        <div className="relative z-10 flex p-5 hover:scale-105 lg:p-12 gap-2 lg:gap-3 w-[78%] lg:w-[500px] bg-white items-start lg:ml-16 border border-primary-300/20 rounded-l-[50px] rounded-tr-[50px] shadow-2xl duration-150 shadow-primary-300/70">
          {/* <div className="absolute bottom-0 -right-0 bg-white border-0 size-7 border-primary-300"></div> */}
          <BiSolidQuoteLeft className="shrink-0 lg:size-14 text-primary-300/50" />
          <div>
            <p className="text-slate-600">{feedback}</p>
            <div className="flex gap-1 lg:gap-3 mt-3">
              {renderStars(rating).map((star) => (
                <BsStarFill
                  key={star}
                  className={`text-amber-400 size-4 lg:size-4`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Horizontal dashed line */}
        <img
          className="absolute opacity-20 top-[40%]"
          src="/images/dashed-h-line.svg"
          alt="hero image"
        />
      </RevealElement>

      {/* person */}
      <div className="relative flex gap-3 -right-[60%] lg:-right-[90px]">
        {/* photo */}
        <div className="text-right my-auto">
          <p className="text-slate-700 text-lg font-semibold">{name}</p>
          <p className="text-slate-500 text-sm">{position}</p>
        </div>
        <div className="shrink-0 size-16 rounded-full overflow-hidden">
          <img className="object-cover h-full" src={image} alt="hero image" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCardAlt;
