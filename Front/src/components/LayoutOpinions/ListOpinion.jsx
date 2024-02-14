import React from "react";

export default function ListOpinion({ opinions }) {
  return (
    <>
      <div className="mt-10 mb-5">
        <span className="text-gray-200">
          Total de opiniones: {opinions?.length || 0}
        </span>
      </div>
      <div className="w-80 max-h-80 overflow-y-auto p-2 ">
        {opinions &&
          opinions?.map(
            (
              opinion,
              index // recoremos las opiniones con un map para pintarlo en pantalla
            ) => (
              <div key={index} className="bg-slate-200 mt-2 p-2 rounded-md">
                <div>
                  <span className="font-bold text-xs">Nombre: {opinion.name}</span>
                  <p className="font-medium">{opinion.text}</p>
                </div>
                <div>
                  <p className="text-xs">{opinion.created_at}</p>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
}
