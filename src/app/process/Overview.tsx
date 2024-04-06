import Image from "next/image";

export const Overview = () => {
    const mainTitle = "Start getting recommendations";
    const data = [
      {
        title: "Rate a few movies first",
        description: "This is used to match you to other people that have the same taste in movies like you",
        image: "/overview1.png"
      },
      {
        title: "Get recommended movies",
        description: "After some calculations with current data of other users you will get 3 recommended movies to watch next",
        image: "/overview2.png"
      },

    ];
  
    return (
      <div className="flex h-full justify-between items-center px-32 gap-20">
        <div>
          <strong>
            <h1 className="text-5xl leading-normal text-d3prop-light-black">{mainTitle}</h1>
          </strong>
        </div>
        <ul className="flex flex-col gap-16">
          {
            data.map(({ description, title, image }, index) => {
              return <li
                key={title}
                className="flex items-center justify-start gap-6">
                <strong className="text-2xl pt-5 text-d3prop-light-black">
                  <h3>{index + 1}</h3>
                </strong>
                <div className="pt-5">
                  <strong className="text-2xl text-d3prop-light-black">
                    <h3>{title}</h3>
  
                  </strong>
                  <p className="text-d3prop-light-gray">{description}</p>
                </div>
                <div className="relative w-48 h-32">
                  <Image src={image} alt="overview" fill className="object-contain w-[100%] relative"></Image>
                </div>
              </li>
            })
          }
        </ul>
      </div>
    )
}