/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useAppContext } from "../context/appContext";
function Title({ title, name }) {
  return (
    <h1>
      {title} <span>{name}</span>
    </h1>
  );
}

export default Title;
