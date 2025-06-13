




// {/* Sección: Documentos */ }
// {
//     activeSection === "documents" && (
//         <div className="space-y-8" >
//             {/* Encabezado con gradiente */ }
//             < div className = "flex items-center gap-3 mb-6" >
//                 <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg" >
//                     <Shield className="text-white" size = { 20} />
//                         </div>
//                         < h2 className = "text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" >
//                             Documentos Adjuntos
//                                 </h2>
//                                 </div>

//     {/* Documentos Adjuntos - Sección mejorada */ }
//     <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-800 shadow-lg" >
//         <label className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2" >
//                   📄 Documentos adicionales
//         < span className = "text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full" >
//             Opcional
//             </span>
//             </label>

//     {/* Zona de subida de archivos */ }
//     <div className="relative group" >
//         <div className="border-3 border-dashed border-amber-300 dark:border-amber-600 rounded-xl p-8 text-center bg-white dark:bg-gray-800 hover:border-teal-400 hover:bg-gradient-to-br hover:from-teal-50 hover:to-blue-50 dark:hover:from-teal-900/20 dark:hover:to-blue-900/20 transition-all duration-300 cursor-pointer group-hover:shadow-lg" >
//             <input
//                       type="file"
//     multiple
//     accept = ".pdf,.jpg,.jpeg,.png"
//     className = "hidden"
//     id = "documents-upload"
//     onChange = { handleDocumentsChange }
//         />

//         <label
//                       htmlFor="documents-upload"
//     className = "flex flex-col items-center justify-center gap-4 cursor-pointer"
//         >
//         <div className="p-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 group-hover:from-teal-400 group-hover:to-blue-400 transition-all duration-300 shadow-lg" >
//             <ArrowUp
//                           className="text-white group-hover:animate-bounce"
//     size = { 32}
//         />
//         </div>

//         < div className = "space-y-2" >
//             <span className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" >
//                           📎 Arrastra archivos aquí o haz clic para seleccionar
//         </span>
//         < div className = "flex flex-wrap justify-center gap-2 text-xs text-gray-500 dark:text-gray-400" >
//             <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full" >
//                 PDF
//                 </span>
//                 < span className = "bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full" >
//                     JPG
//                     </span>
//                     < span className = "bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full" >
//                         PNG
//                         </span>
//                         < span className = "bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full" >
//                             Máx. 5MB
//                                 </span>
//                                 </div>
//                                 </div>
//                                 </label>
//                                 </div>
//                                 </div>

//     {/* Lista de archivos seleccionados */ }
//     {
//         selectedDocuments && selectedDocuments.length > 0 && (
//             <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800" >
//                 <p className="text-sm font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2" >
//                       ✅ Archivos seleccionados({ selectedDocuments.length })
//             </p>
//             < ul className = "space-y-2" >
//                 {
//                     Array.from(selectedDocuments).map((file, index) => (
//                         <li
//                           key= { index }
//                           className = "flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-green-200 dark:border-green-700"
//                         >
//                         <div className="flex items-center gap-3" >
//                     <div className="p-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-400" >
//                     {
//                         file.type.includes("pdf") ? (
//                             <span className= "text-white text-xs font-bold" >
//                             PDF
//                             </span>
//                               ) : file.type.startsWith("image/") ? (
//                         <span className= "text-white text-xs font-bold" >
//                         IMG
//                         </span>
//                               ) : (
//                             <span className="text-white text-xs font-bold" >
//                             DOC
//                         </span>
//                         )
//     }
//     </div>
//         < div >
//         <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-xs" >
//             { file.name }
//             </p>
//             < p className = "text-xs text-gray-500 dark:text-gray-400" >
//                 {(file.size / 1024 / 1024).toFixed(1)
// } MB
//     </p>
//     </div>
//     </div>
//     < button
// type = "button"
// onClick = {() => handleRemoveDocument(index)}
// className = "hover:bg-red-200 dark:hover:bg-red-700 rounded-full p-1 transition-all duration-200"
//     >
//     <X
//                               className="text-red-500 dark:text-red-400"
// size = { 16}
//     />
//     </button>
//     </li>
//                       ))}
// </ul>
//     </div>
//                 )}

// {
//     errors.documents && (
//         <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800" >
//             <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2" >
//                 <AlertCircle size={ 16 } />
//     {
//         errors.documents &&
//             typeof errors.documents.message === "string"
//             ? errors.documents.message
//             : "Error en los documentos"
//     }
//     </p>
//         </div>
//                 )
// }

// {/* Información adicional */ }
// <div className="mt-4 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl border border-amber-200 dark:border-amber-700" >
//     <p className="text-sm text-amber-800 dark:text-amber-200" >
//                     💡 <strong>Sugerencia: </strong> Puedes subir carnet de
// vacunas, certificados veterinarios, resultados de exámenes,
//     o cualquier documento importante sobre tu mascota.
//                   </p>
//         </div>
//         </div>
//         </div>
//           )}


















// const getSectionFields = (sectionId: string): (keyof PetFormData)[] => {
//     const sectionFields: Record<string, (keyof PetFormData)[]> = {
//         basic: ["name", "species", "breed", "sex", "color"],
//         identification: ["microchipNumber", "tattooCode", "passportNumber"],
//         medical: ["sterilized", "bloodType"],
//         behavior: ["activityLevel", "aggressive"],
//         care: ["feedingSchedule", "diet", "lastVetVisit"],
//         documents: ["photo", "documents", "codeVetlink"], // Aunque sean opcionales
//     };

//     return sectionFields[sectionId] || [];
// };




// // {
// //   id: "documents",
// //   title: "Documentos",
// //   icon: <Shield size={18} />,
// //   color: "text-emerald-500",
// // },