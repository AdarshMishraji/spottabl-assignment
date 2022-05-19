import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { locale } from "../../constants";
import { UsersType, UserType } from "../../types";
import { UserRow } from "../UserRow";

type Props = {
  options: UsersType;
  isVisible: boolean;
  onSelected: (item: UserType) => void;
};

export const OptionsContainer = memo(
  forwardRef(({ options, isVisible, onSelected }: Props, ref) => {
    const containerRef = useRef<HTMLDivElement>();
    const [visible, setVisible] = useState(true);

    const close = useCallback(() => {
      setVisible(false);
    }, [visible]);

    const open = useCallback(() => {
      setVisible(true);
    }, [visible]);

    useImperativeHandle(ref, () => ({
      close,
      open,
    }));

    if (isVisible == false || visible == false) return null;
    return (
      <div
        className="options-container options-container-mq"
        ref={containerRef}
      >
        {options.map((option, index) => {
          return (
            <UserRow
              onSelected={() => {
                onSelected(option);
              }}
              {...option}
              isLast={index === options.length - 1}
              key={index}
              showDescIcon
              showEmail
            />
          );
        })}
        {options.length === 0 && (
          <div className="empty-list">{locale.noUserFound}</div>
        )}
      </div>
    );
  })
);
