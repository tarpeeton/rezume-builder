import { Link } from "@/i18n/navigation";
import styles from "./button.module.css";
import { IButtonProps } from "./types";

export const Button = ({
  children,
  variant = "default",
  type = "button",
  href,
  text,
}: IButtonProps) => {
  const content = children ?? text ?? "Click";

  const className = `${styles.button} ${styles[variant]}`;

  return type === "button" ? (
    <button className={className}>{content}</button>
  ) : (
    <Link className={className} href={href ?? "/"}>
      {content}
    </Link>
  );
};
