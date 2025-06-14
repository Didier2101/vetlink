import React from 'react'
import { FormSectionProps } from '../types'
import { Bone } from 'lucide-react'
import { FormInput } from '../components/FormInput'

const CareSection = ({ register, errors }: FormSectionProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <Bone className="text-amber-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Cuidados y Alimentación
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Horario de alimentación */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Horario de alimentación
                    </label>
                    <textarea
                        {...register("feedingSchedule")}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.feedingSchedule
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                            }`}
                        placeholder="Ej: 2 veces al día - 8am y 6pm"
                    />
                    {errors.feedingSchedule && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.feedingSchedule.message}
                        </p>
                    )}
                </div>

                {/* Tipo de dieta */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tipo de dieta
                    </label>
                    <select
                        {...register("diet")}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 ${errors.diet
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                            }`}
                    >
                        <option value="" disabled>
                            {" "}
                            Seleccionar{" "}
                        </option>
                        <option value="commercial"> Comercial(croquetas) </option>
                        <option value="natural"> Natural(casera) </option>
                        <option value="barf"> BARF(dieta cruda) </option>
                        <option value="mixed"> Mixta </option>
                        <option value="other"> Otra </option>
                    </select>
                    {errors.diet && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.diet.message}
                        </p>
                    )}
                </div>

                {/* Comida favorita */}
                <FormInput
                    label="Comida favorita"
                    name="favoriteFood"
                    register={register}
                    error={errors.favoriteFood}
                    placeholder="Ej: Pollo cocido, croquetas de salmón, etc."
                />

                {/* Próxima visita al vet */}
            </div>
        </div>
    )
}

export default CareSection
