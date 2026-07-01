const Profile = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={user.image}
          alt={user.firstName}
          className="profile-image"
        />

        <h1>
          {user.firstName} {user.lastName}
        </h1>

        <p className="username">@{user.username}</p>

         <div className="profile-info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Gender:</strong> {user.gender}
          </p>

          <p>
            <strong>Age:</strong> {user.age}
          </p>
        </div>
    

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;