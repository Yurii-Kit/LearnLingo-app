import css from "./TeacherAvatar.module.css";
import Icon from "../Icon/Icon";

interface TeacherAvatarProps {
  avatarUrl: string;
  name: string;
  surname: string;
}

export default function TeacherAvatar({
  avatarUrl,
  name,
  surname,
}: TeacherAvatarProps) {
  return (
    <div className={css.avatarWrapper}>
      <img
        src={avatarUrl}
        alt={`${name} ${surname}`}
        className={css.avatar}
        width={96}
        height={96}
      />
      <Icon className={css.spot} name="Group-82" width={12} height={12} />
    </div>
  );
}
