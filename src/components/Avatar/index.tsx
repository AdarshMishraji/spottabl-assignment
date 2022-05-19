import { memo } from "react";
import "./index.css";

type Props = {
  name: string;
  size: number;
};

export const Avatar = memo(({ name, size }: Props) => {
  const sumChars = () => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return sum;
  };

  const generateBackgroundColor = () => {
    if (name.length >= 2) {
      const bgColors = [
        "#2ecc71",
        "#3498db",
        "#1ed4fd",
        "#e67e22",
        "#e74c3c",
        "#1abc9c",
        "#2c3e50",
      ];
      const i = sumChars() % bgColors.length;
      return bgColors[i];
    } else return "";
  };

  const backgroundColor = generateBackgroundColor();

  const nameSplited = name.split(" ");
  return (
    <div
      className="avatar"
      style={{
        backgroundColor,
        height: size,
        width: size,
        fontSize: size / 3,
      }}
    >
      {nameSplited?.[0]?.[0]}
      {nameSplited?.[1]?.[0]}
    </div>
  );
});
