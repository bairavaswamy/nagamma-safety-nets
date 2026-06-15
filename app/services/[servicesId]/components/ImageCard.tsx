import Image from "next/image";

type ImageCardProps = {
  image: string;
  title: string;
};

const ImageCard = ({ image, title }: ImageCardProps) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
      <Image
        src={image}
        alt={title}
        width={680}
        height={500}
        sizes="(max-width: 768px) 92vw, 520px"
        className="aspect-[4/3] w-full rounded-md object-cover"
      />
    </div>
  );
};

export default ImageCard;
