import React, { useState, useEffect } from "react";
import { getUsers } from "../api/users";
import { formatRut } from '../utils/formater'

export const Users = ({ fetch, setFetch }) => {
  const [userList, setUserList] = useState([]);

  const getFullUsers = async () => {
    const list = await getUsers();

    if (list?.data) {
      setUserList(list.data);
    }
  };

  useEffect(() => {
    if(fetch){
      getFullUsers();
      setFetch(false)
    }
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
                    {user.firstName} {user.lastName}
                  </b>
                </span>
              </div>
              <div className="truncate">
                <span className="text-gray-300 text-xs">{formatRut(user.rutOrPassport)}</span>
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
