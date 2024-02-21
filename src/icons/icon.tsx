import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { LiaCitySolid } from "react-icons/lia";
import { BsWhatsapp } from "react-icons/bs";
import { LuTwitter } from "react-icons/lu";
import { FaFacebook } from "react-icons/fa";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { FaMoon } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import { MdTrolley } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { PiArticleBold } from "react-icons/pi";
import { TbCategoryPlus } from "react-icons/tb";
import { FaCircleQuestion } from "react-icons/fa6";
import { FaServicestack } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhoneOutgoing } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";

export const WhatsUpIcon = () => (
  <BsWhatsapp size={"25px"} style={{ marginRight: "0.5rem" }} />
);
export const TwitterIcon = () => (
  <LuTwitter size={"25px"} style={{ marginRight: "0.5rem" }} />
);
export const FaceIcon = () => (
  <FaFacebook size={"25px"} style={{ marginRight: "0.5rem" }} />
);
export const HomeIcon = () => <MdHome size={"25px"} />;
export const CountryIcon = () => <LiaCitySolid size={"25px"} />;
export const MoneyIcon = () => <RiMoneyPoundCircleFill size={"25px"} />;
export const LogoutIcon = () => <RiLogoutCircleRFill size={"25px"} />;

export const IconMoon = () => <FaMoon size={"20px"} />;
export const IconPainting = () => <MdOutlineColorLens size={"25px"} />;
export const IconTrolley = () => <MdTrolley size={"25px"} />;
export const IconEnvelope = () => <FaRegEnvelope size={"20px"} />;
export const IconNotifications = () => (
  <IoIosNotificationsOutline size={"25px"} />
);
export const IconEdit = () => <FiEdit2 size={"20px"} />;
export const IconDelete = () => <RiDeleteBinLine size={"20px"} />;
export const IconArticle = () => <PiArticleBold size={"25px"} />;
export const IconCategory = () => <TbCategoryPlus size={"25px"} />;
export const IconFaq = () => <FaCircleQuestion size={"25px"} />;
export const IconService = () => <FaServicestack size={"25px"} />;
export const IconEmail = () => <MdOutlineEmail size={"20px"} />;
export const IconPhone = () => <LuPhoneOutgoing size={"20px"} />;
export const IconLocation = () => <GrMapLocation size={"20px"} />;
export const IconProfile = () => <FaUserEdit size={"20px"} color="black" />;
export const IconUser = () => <HiUsers size={"20px"} />;
