import { getToken } from "./tokenFunctions";

export async function addToFavorite(product, setProfileFavorites) {
  // console.log("add To Favorite loader entered");

  const token = JSON.parse(getToken());
  var requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };
  await fetch(
    `https://techtrack-be.vercel.app/api/v1/favorites/${product._id}`,
    requestOptions
  );
  setProfileFavorites((favorites) => {
    localStorage.setItem(
      "userFavorites",
      JSON.stringify([...favorites, product])
    );
    return [...favorites, product];
  });
}

export async function removeFromFavorite(id, setProfileFavorites) {
  // console.log("remove From Favorite loader entered");

  const token = JSON.parse(getToken());
  var requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };

  await fetch(
    `https://techtrack-be.vercel.app/api/v1/favorites/${id}`,
    requestOptions
  );
  setProfileFavorites((favorites) => {
    const temp = [...favorites];
    temp.splice(
      temp.findIndex((product) => product._id === id),
      1
    );
    localStorage.setItem("userFavorites", JSON.stringify([...temp]));
    return [...temp];
  });
}
