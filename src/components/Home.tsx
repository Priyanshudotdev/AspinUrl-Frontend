import { useEffect } from "react";
import { signOut } from "../firebase/Auth";
import { useAuth } from "../hooks/useAuth";

const Home: React.FC = () => {
  const { currentUser } = useAuth();

  const data = useAuth();

  useEffect(() => {
    console.log(data);
  }, []);
  console.log("DATA", data);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="p-10 bg-zinc-800 text-white">
      {currentUser ? (
        <>
          <h1>Hii ! {currentUser} You LoggedIn</h1>
          <button className="p-2 text-red-600" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <h1>You are not logged in.</h1>
      )}
    </div>
  );
};

export default Home;
