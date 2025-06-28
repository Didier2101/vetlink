

// import { useState } from 'react';
// import { User, Pencil, PawPrint, CreditCard, Calendar, Crown, Gift, Check, X } from 'lucide-react';
// import { prisma } from '@/src/lib/prisma';


// export default async function OwnerProfilePage({ params }: { params: { idOwner: string } }) {
//     const [activeTab, setActiveTab] = useState('general');
//     const [editMode, setEditMode] = useState(false);

//     // Obtener datos del owner con Prisma
//     const owner = await prisma.owners.findUnique({
//         where: { id: parseInt(params.idOwner) },
//         include: {
//             users: {
//                 include: {
//                     plans: {
//                         include: {
//                             features: true
//                         }
//                     },
//                     pets: true
//                 }
//             }
//         }
//     });

//     if (!owner) {
//         return <div>Owner no encontrado</div>;
//     }

//     // Formatear fechas
//     const formatDate = (date: Date) => {
//         return new Date(date).toLocaleDateString('es-MX');
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">
//                     Perfil de {owner.name} {owner.lastName}
//                 </h1>
//                 <button
//                     onClick={() => setEditMode(!editMode)}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 >
//                     <Pencil size={18} />
//                     {editMode ? 'Cancelar' : 'Editar'}
//                 </button>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b mb-6">
//                 <button
//                     onClick={() => setActiveTab('general')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'general' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
//                 >
//                     <div className="flex items-center gap-2">
//                         <User size={18} />
//                         General
//                     </div>
//                 </button>
//                 <button
//                     onClick={() => setActiveTab('pets')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'pets' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
//                 >
//                     <div className="flex items-center gap-2">
//                         <PawPrint size={18} />
//                         Mascotas ({owner.user.pets.length})
//                     </div>
//                 </button>
//                 <button
//                     onClick={() => setActiveTab('plan')}
//                     className={`px-4 py-2 font-medium ${activeTab === 'plan' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
//                 >
//                     <div className="flex items-center gap-2">
//                         <CreditCard size={18} />
//                         Plan
//                     </div>
//                 </button>
//             </div>

//             {/* Contenido de los tabs */}
//             <div className="bg-white rounded-lg shadow p-6">
//                 {activeTab === 'general' && (
//                     <div className="space-y-6">
//                         <h2 className="text-xl font-semibold flex items-center gap-2">
//                             <User size={20} />
//                             Información General
//                         </h2>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-500">Nombre</label>
//                                 {editMode ? (
//                                     <input
//                                         type="text"
//                                         defaultValue={`${owner.name} ${owner.lastName}`}
//                                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                                     />
//                                 ) : (
//                                     <p className="mt-1 text-lg">{owner.name} {owner.lastName}</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-500">Email</label>
//                                 <p className="mt-1 text-lg">{owner.user.email}</p>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-500">Teléfono</label>
//                                 {editMode ? (
//                                     <input
//                                         type="text"
//                                         defaultValue={owner.phone}
//                                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                                     />
//                                 ) : (
//                                     <p className="mt-1 text-lg">{owner.phone}</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-500">Teléfono secundario</label>
//                                 {editMode ? (
//                                     <input
//                                         type="text"
//                                         defaultValue={owner.secondaryPhone || ''}
//                                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                                     />
//                                 ) : (
//                                     <p className="mt-1 text-lg">{owner.secondaryPhone || 'No especificado'}</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-500">Dirección</label>
//                                 {editMode ? (
//                                     <input
//                                         type="text"
//                                         defaultValue={owner.address}
//                                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                                     />
//                                 ) : (
//                                     <p className="mt-1 text-lg">{owner.address}</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-500">Ciudad/Colonia</label>
//                                 {editMode ? (
//                                     <div className="flex gap-2 mt-1">
//                                         <input
//                                             type="text"
//                                             defaultValue={owner.city}
//                                             className="block w-full border border-gray-300 rounded-md p-2"
//                                             placeholder="Ciudad"
//                                         />
//                                         <input
//                                             type="text"
//                                             defaultValue={owner.neighborhood}
//                                             className="block w-full border border-gray-300 rounded-md p-2"
//                                             placeholder="Colonia"
//                                         />
//                                     </div>
//                                 ) : (
//                                     <p className="mt-1 text-lg">{owner.city}, {owner.neighborhood}</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-500">Miembro desde</label>
//                                 <p className="mt-1 text-lg">{formatDate(owner.createdAt)}</p>
//                             </div>
//                         </div>

//                         {editMode && (
//                             <div className="flex justify-end gap-4 mt-6">
//                                 <button
//                                     onClick={() => setEditMode(false)}
//                                     className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2"
//                                 >
//                                     <X size={18} />
//                                     Cancelar
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         // Lógica para guardar cambios
//                                         setEditMode(false);
//                                     }}
//                                     className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
//                                 >
//                                     <Check size={18} />
//                                     Guardar cambios
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {activeTab === 'pets' && (
//                     <div className="space-y-6">
//                         <h2 className="text-xl font-semibold flex items-center gap-2">
//                             <PawPrint size={20} />
//                             Mascotas ({owner.user.pets.length})
//                         </h2>

//                         {owner.user.pets.length > 0 ? (
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                                 {owner.user.pets.map(pet => (
//                                     <div key={pet.id} className="border rounded-lg p-4 hover:shadow-md transition">
//                                         <div className="flex justify-between items-start">
//                                             <h3 className="font-medium text-lg">{pet.name}</h3>
//                                             <button className="text-gray-400 hover:text-blue-600">
//                                                 <Pencil size={16} />
//                                             </button>
//                                         </div>
//                                         <p className="text-gray-600">{pet.breed} {pet.type}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="text-center py-8 text-gray-500">
//                                 <PawPrint size={48} className="mx-auto mb-4 text-gray-300" />
//                                 <p>No hay mascotas registradas</p>
//                             </div>
//                         )}

//                         <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2">
//                             <PawPrint size={18} />
//                             Agregar mascota
//                         </button>
//                     </div>
//                 )}

//                 {activeTab === 'plan' && (
//                     <div className="space-y-6">
//                         <h2 className="text-xl font-semibold flex items-center gap-2">
//                             <CreditCard size={20} />
//                             Plan Actual
//                         </h2>

//                         <div className="bg-blue-50 rounded-lg p-6">
//                             <div className="flex justify-between items-start">
//                                 <div>
//                                     <div className="flex items-center gap-3 mb-2">
//                                         {owner.user.plan.isFree ? (
//                                             <Gift size={24} className="text-green-500" />
//                                         ) : owner.user.plan.isTrial ? (
//                                             <Calendar size={24} className="text-blue-500" />
//                                         ) : (
//                                             <Crown size={24} className="text-purple-500" />
//                                         )}
//                                         <h3 className="text-xl font-bold">{owner.user.plan.title}</h3>
//                                     </div>
//                                     <p className="text-gray-600 mb-4">{owner.user.plan.description}</p>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="text-2xl font-bold">
//                                         {owner.user.plan.isFree ? 'Gratis' : `$${owner.user.plan.price}`}
//                                     </p>
//                                     <p className="text-gray-500">
//                                         {owner.user.plan.isFree ? '' : `por ${owner.user.plan.period}`}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="mt-6">
//                                 <h4 className="font-medium mb-3">Características del plan:</h4>
//                                 <ul className="space-y-2">
//                                     {owner.user.plan.features.map(feature => (
//                                         <li key={feature.id} className="flex items-center gap-2">
//                                             <Check size={16} className="text-green-500" />
//                                             <span>{feature.name}</span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                             <div className="border rounded-lg p-4">
//                                 <h4 className="font-medium mb-2 flex items-center gap-2">
//                                     <Calendar size={18} />
//                                     Estado del plan
//                                 </h4>
//                                 <p>
//                                     {owner.user.plan.isFree ? 'Plan Gratis' :
//                                         owner.user.plan.isTrial ? 'Prueba Gratis' : 'Plan Activo'}
//                                 </p>
//                                 {owner.user.plan.isTrial && owner.user.plan.trialEndsAt && (
//                                     <p className="text-sm text-blue-600 mt-1">
//                                         Prueba hasta: {formatDate(owner.user.plan.trialEndsAt)}
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="border rounded-lg p-4">
//                                 <h4 className="font-medium mb-2">Acciones</h4>
//                                 <div className="space-y-2">
//                                     <button className="w-full text-left py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2">
//                                         <CreditCard size={16} />
//                                         Cambiar plan
//                                     </button>
//                                     <button className="w-full text-left py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2">
//                                         <Calendar size={16} />
//                                         Ver historial de pagos
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };