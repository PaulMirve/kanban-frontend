import { FormikTouched, FormikValues, useFormikContext } from "formik";
import { useMemo } from "react";

export const useInputHasErrors = (name: string) => {
  const { errors, touched } = useFormikContext<FormikValues>();

  const hasError = useMemo((): boolean => {
    if (name.includes("[")) {
      const nameAndIndex = name.split("[");
      const justName = nameAndIndex[0];
      const index: number = parseInt(nameAndIndex[1].split("]")[0] || "-1");
      const touchedValues = touched[justName] as FormikTouched<any>[];
      return (
        !!(errors[justName] as string[])?.[index] && !!touchedValues?.[index]
      );
    } else {
      return !!errors[name] && !!touched[name];
    }
  }, [errors, touched]);
  return hasError;
};
