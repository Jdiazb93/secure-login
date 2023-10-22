import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { getRelatedUsers } from "../api/users";

export const Users = ({ fetch, setFetch }) => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate()

  //Función para traer listado de usuario.
  const getFullUsers = async () => {
    const token = localStorage.getItem('token')
    const list = await getRelatedUsers(token);

    /**
     * Si ocurre un error en la obtención del listado, y el token venció, entonces elimina el token de la memoria local
     * y enviará una navegación a raiz del proyecto, además de refrescar la página.
     */
    if(list.status !== 200 && !list.tokenStatus) {
      localStorage.removeItem('token')
      navigate('/')
      navigate(0)
    }

    /**
     * Si no existen errores, entonces se valida que el atributo data exista, y se entrega al listado para ser mapeado
     */
    if (list?.data) {
      setUserList(list.data);
    }
  };

  useEffect(() => {
    if(fetch){
      getFullUsers();
      setFetch(false)
    }
    //Se agrega regla de Eslint, y aque solicita agregar como dependencia función que ejecutaría el useEffect como loop infinito
    // eslint-disable-next-line
  }, [fetch, setFetch]);

  return (
    <section className="user-section">
      <h2>Listado de usuarios</h2>
      <ul>
        {userList.map((user) => {
          return (
            <li key={user.id}>
              <div className="truncate">
                <span className="text-white">
                  <b>
                    {user.name} {user.surName}
                  </b>
                </span>
              </div>
              <div className="truncate">
                <span className="text-gray-300 text-md">{user.position}</span>
              </div>
              <div className="truncate">
                <span className="text-gray-300 text-xs">{user.email}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
