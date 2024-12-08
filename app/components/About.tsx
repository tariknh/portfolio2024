import Fx2TitleAnimation from "./titleanimation";

const About = () => {
  return (
    <div className="h-[60vh] flex flex-col gap-12 text-center px-5 md:px-20 bg-primary">
      <Fx2TitleAnimation />
      <span className="max-w-xl self-center text-sm text-white opacity-40 font-thin">
        Im a product designer based in Norway, passionate about crafting
        refined, interactive digital experiences that engage and resonate with
        users, ensuring seamless functionality and usability
      </span>
    </div>
  );
};

export default About;
