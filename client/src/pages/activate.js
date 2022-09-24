import { useDispatch, useSelector } from "react-redux";
import ActivationForm from "../components/home/ActivateForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const url = `${process.env.REACT_APP_API_URL}/activate`;
const Activate = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const activateContact = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(url, { token });
        setSuccess(data.message);
        setLoading(false);
        navigate("/auth");
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    };
    activateContact();
  }, [token, user, dispatch, navigate]);
  return (
    <div className="home">
      {success && (
        <ActivationForm
          header={"Account verification successful"}
          text={success}
          type={"success"}
          loading={loading}
        />
      )}
      {error && (
        <ActivationForm
          header={"Account verification failed"}
          text={error}
          type={"error"}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Activate;
