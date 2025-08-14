import { useEffect, useRef, useState } from "react";

interface CardProps {
  name: string;
  url: string;
  onClick: () => void;
}

const Card = ({ name, url, onClick }: CardProps) => {
  const [data, setData] = useState<any>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-card border border-border rounded-lg shadow-md p-4 flex flex-col items-center gap-3 transition hover:scale-105 hover:shadow-lg"
    >
      <img
        src={data?.sprites?.front_default}
        alt={name}
        className="w-40 h-40 object-contain mb-2 drop-shadow"
        loading="lazy"
      />
      <h3 className="font-bold text-lg text-card-foreground capitalize tracking-wide">
        {name}
      </h3>
    </div>
  );
};

export default Card;
