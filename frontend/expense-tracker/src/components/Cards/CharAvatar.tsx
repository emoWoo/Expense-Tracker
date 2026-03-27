import { getInitials } from "../../utils/helper";

interface CharAvatarProps {
  fullName: string;
  width?: string;
  height?: string;
  style?: string;
}

const CharAvatar: React.FC<CharAvatarProps> = ({
  fullName,
  width,
  height,
  style,
}) => {
  return (
    <div
      className={`${width || "w-20"} ${height || "h-20"} ${style || "text-xl"} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
