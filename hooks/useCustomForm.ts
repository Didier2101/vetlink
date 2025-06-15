// hooks/useCustomForm.ts
import { useForm, UseFormProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

interface UseCustomFormProps<T extends FieldValues> extends Omit<UseFormProps<T>, 'resolver'> {
    schema: ZodSchema<T>;
}

export const useCustomForm = <T extends FieldValues>({
    schema,
    mode = "all",
    ...props
}: UseCustomFormProps<T>) => {
    return useForm<T>({
        resolver: zodResolver(schema),
        mode,
        ...props,
    });
};