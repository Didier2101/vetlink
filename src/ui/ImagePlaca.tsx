import Image from "next/image";
import React from "react";

const ImagePlaca = () => {
  return (
    <div className="relative w-full max-w-[180px] md:max-w-[300px]">
      <Image
        src={"/placa-frente.jpg"}
        alt="Placa Inteligente VetLink"
        width={500}
        height={500}
        className=" shadow-2xl w-full h-auto object-contain rounded-[50px] md:rounded-[80px]"
      />
    </div>
  );
};

export default ImagePlaca;
