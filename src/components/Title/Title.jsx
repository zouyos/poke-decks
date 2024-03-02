import style from "./style.module.css";

export function Title({ image, title, subtitle }) {
  return (
    <div>
      <div className={style.container}>
        <img className={style.image} src={image} alt="Logo" />
        <span className={style.title}>{title}</span>
      </div>
      <span className={style.subtitle}>{subtitle}</span>
    </div>
  );
}
