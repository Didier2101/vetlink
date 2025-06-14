import React from 'react'
import { FormSectionProps } from '../types'
import { User } from 'lucide-react'
import { FormInput } from '../components/FormInput'

const IdentificationSection = ({ register, errors }: FormSectionProps) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <User className="text-blue-500" size={20} />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Identificación
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                    label="Número de microchip (Opcional)"
                    name="microchipNumber"
                    register={register}
                    error={errors.microchipNumber}
                    placeholder="Ej: 985120001234567"
                />

                <FormInput
                    label="Código de tatuaje (Opcional)"
                    name="tattooCode"
                    register={register}
                    error={errors.tattooCode}
                    placeholder="Ej: ABC123"
                />

                <FormInput
                    label="Número de pasaporte (Opcional)"
                    name="passportNumber"
                    register={register}
                    error={errors.passportNumber}
                    placeholder="Ej: PETP12345678"
                />
            </div>
        </div>
    )
}

export default IdentificationSection
