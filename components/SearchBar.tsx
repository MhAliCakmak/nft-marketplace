import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import images from "../assets";

interface SearchBarProps {
  activeSelect: string;
  setActiveSelect: (value: string) => void;
  handleSearch: (query: string) => void;
  clearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  activeSelect,
  setActiveSelect,
  handleSearch,
  clearSearch,
}) => {
  const [search, setSearch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search, handleSearch, clearSearch]);

  return (
    <>
      <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
        <Image
          alt="search"
          src={images.search}
          objectFit="contain"
          width={20}
          height={20}
        />
        {/* Rest of the SearchBar component */}
      </div>
    </>
  );
};

export default SearchBar;
