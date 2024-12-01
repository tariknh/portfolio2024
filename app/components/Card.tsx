import Image from "next/image";

type CardProps = {
  key: Number;
  id: string;
  frontSrc: string;
  frontAlt: string;
  backText: string;
};
const Card = ({ key, id, frontSrc, frontAlt, backText }: CardProps) => {
  return (
    <div className="card" id={id}>
      <div className="card-wrapper">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Image
              width={500}
              height={500}
              priority
              alt={frontAlt}
              src={frontSrc}
            />
          </div>
          <div className="flip-card-back"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
