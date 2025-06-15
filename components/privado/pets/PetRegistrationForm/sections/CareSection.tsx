import React from 'react'
import { FormSectionProps } from '../types'
import { Bone } from 'lucide-react'
import { FormInput } from '@/src/ui/FormInput'
import { FormTextarea } from '@/src/ui/FormTextarea'
import { FormSelect } from '@/src/ui/FormSelect'

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
                {/* Horario de alimentación */}
                <div className="md:col-span-2">
                    <FormTextarea
                        label="Horario de alimentación detallado"
                        name="feedingSchedule"
                        register={register}
                        error={errors.feedingSchedule}
                        rows={3}
                        placeholder="Ej: Desayuno a las 7:30am - 1 taza de croquetas premium
Almuerzo a las 2:00pm - 80g de comida húmeda
Cena a las 8:00pm - 1 taza de croquetas con suplementos"
                    />
                </div>

                {/* Tipo de dieta */}
                {/* Tipo de dieta */}
                <FormSelect
                    label="Tipo de dieta principal"
                    name="diet"
                    register={register}
                    error={errors.diet}
                    options={[
                        { value: "", label: "Seleccionar", disabled: true },
                        { value: "commercial", label: "Comercial (croquetas premium)" },
                        { value: "natural", label: "Natural (casera balanceada)" },
                        { value: "barf", label: "BARF (dieta cruda biológicamente apropiada)" },
                        { value: "mixed", label: "Mixta (comercial + natural)" },
                        { value: "prescription", label: "Dieta veterinaria (recetada)" },
                        { value: "other", label: "Otra (especificar en observaciones)" }
                    ]}
                />

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
