import { Link } from "react-router-dom";

function Error() {
  return (
    <main className="main">
      <div className="error-content">
        <h1>Opps this page does not exist!</h1>
        <Link className="btn" to={"/notes"}>
          Back Home
        </Link>
      </div>
    </main>
  );
}

export default Error;
