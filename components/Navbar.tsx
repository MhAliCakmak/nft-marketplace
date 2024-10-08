"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { ContractContext } from "../context";

import images from "../assets";
import { CustomConnectButton } from "./CustomConnectButton";

interface ButtonGroupProps {
  setActive: (active: string) => void;
  router: ReturnType<typeof useRouter>;
  setIsOpen: (isOpen: boolean) => void;
}

const ButtonGroup = ({ setActive, router, setIsOpen }: ButtonGroupProps) => {
  const { currentAddress } = useContext(ContractContext);

  return (
    currentAddress && (
      <Button
        btnName="Create"
        classStyles="mx-2 rounded-xl"
        handleClick={() => {
          setActive("");
          router.push("/create-nft");
          setIsOpen(false);
        }}
      />
    )
  );
};

interface MenuItemsProps {
  isMobile?: boolean;
  active: string;
  setActive: (active: string) => void;
  setIsOpen?: (isOpen: boolean) => void;
}

const MenuItems = ({
  isMobile,
  active,
  setActive,
  setIsOpen,
}: MenuItemsProps) => {
  const generateLink = (index: number): string => {
    switch (index) {
      case 0:
        return "/";
      case 1:
        return "/listed-nfts";
      case 2:
        return "/my-nfts";
      default:
        return "/";
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && "flex-col h-full"
      }`}
    >
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);

            if (isMobile) setIsOpen(false);
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${
            active === item
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-gray-3 text-nft-gray-2"
          } 
          ${isMobile && "my-5 text-xl"}`}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const checkActive = (
  active: string,
  setActive: (active: string) => void,
  router: ReturnType<typeof useRouter>
) => {
  switch (router.pathname) {
    case "/":
      if (active !== "Explore NFTs") setActive("Explore NFTs");
      break;
    case "/listed-nfts":
      if (active !== "Listed NFTs") setActive("Listed NFTs");
      break;
    case "/my-nfts":
      if (active !== "My NFTs") setActive("My NFTs");
      break;
    case "/create-nft":
      if (active !== "") setActive("");
      break;
    default:
      setActive("");
  }
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState<string>("Explore NFTs");
  const [isOpen, setIsOpen] = useState<boolean>(false);


  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);

  useEffect(() => {
    // disable body scroll when navbar is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpen]);

  return (
    <nav className="flexBetween w-full  p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div className="flexCenter md:hidden cursor-pointer" onClick={() => setActive('Explore NFTs')}>
            <Image src={images.logo02} style={{ objectFit: "contain" }} width={32} height={32} alt="logo" />
            <p className=" dark:text-white text-nft-black-1 font-semibold text-lg ml-1">CryptoKet</p>
          </div>
        </Link>
        <Link href="/">
          <div
            className="hidden md:flex"
            onClick={() => {
              setActive('Explore NFTs');
              setIsOpen(false);
            }}
          >
            <Image src={images.logo02} style={{ objectFit: "contain" }}width={32} height={32} alt="logo" />
          </div>
        </Link>
      </div>

      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>

        <div className="md:hidden flex">
          <ul className="list-none flexCenter flex-row">
            <MenuItems active={active} setActive={setActive} />
          </ul>
          <div className="ml-2 mr-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
          <CustomConnectButton/>
        </div>
      </div>

      <div className="hidden md:flex ml-2">
        {!isOpen
          ? (
            <Image
              src={images.menu}
              style={{ objectFit: "contain" }}
              width={25}
              height={25}
              alt="menu"
              onClick={() => setIsOpen(!isOpen)}
              className={theme === 'light' ? 'filter invert' : undefined}
            />
          )
          : (
            <Image
              src={images.cross}
              style={{ objectFit: "contain" }}
              width={20}
              height={20}
              alt="close"
              onClick={() => setIsOpen(!isOpen)}
              className={theme === 'light' ? 'filter invert' : undefined}
            />
          )}

        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 flex justify-between border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} />
              
            <CustomConnectButton/>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
