import React from "react";

export default function CreateOpinion({ opinions }) {
  return (
    <div>
      <table>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>ID de usuario</th>
        </tr>
        {opinions &&
          opinions?.map((opinion, index) => (
            <tr>
              <td key={index}>{index +1}</td>
              <td key={index}>{opinion.text}</td>
              <td key={index}>{opinion.users_id}</td>
            </tr>
        ))}
      </table>
    </div>
  );
}
