import style from "./style.module.css";

export function Title({ image, title, subtitle }) {
  return (
    <div>
      <div className={style.container}>
        <img className={style.image} src={image} alt="Logo" />
        <h2 className={style.title}>{title}</h2>
      </div>
      <h5 className={`${style.subtitle} text-wrap mt-1`}>{subtitle}</h5>
    </div>
  );
}
