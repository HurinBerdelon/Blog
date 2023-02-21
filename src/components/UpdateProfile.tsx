import { availableImageTypes } from "@/config/availableImageType";
import { useUser } from "@/hooks/useUser";
import { Form, Formik, FormikValues } from "formik";
import { useTranslation } from "next-i18next";
import { CircleNotch } from "phosphor-react";
import { useEffect, useState } from "react";
import * as yup from 'yup'
import { DropImage } from "./DropImage";

export function UpdateProfile(): JSX.Element {

    const { user, updateUserImage } = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        setIsLoading(false)
    }, [user])

    async function handleSubmit(values: FormikValues): Promise<void> {
        setIsLoading(true)
        updateUserImage(values)
    }

    const initialValues = {
        avatar: ''
    }

    const avatarSchema = yup.object().shape({
        avatar: yup.mixed().test('fileFormat',
            t('common:imageOnly'), value => {
                if (value) {
                    return availableImageTypes.includes(value.type)
                } else {
                    return false
                }
            })
    })

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={avatarSchema}
        >
            {({ errors, setFieldValue }) => (
                <Form className="flex flex-col items-center text-backgroundDark dark:text-textLight">
                    <DropImage
                        setFieldValue={setFieldValue}
                        errors={errors}
                    />
                    <div className="flex flex-col items-center">
                        <h2 className="py-4 text-xl font-medium">{user?.name}</h2>
                        <button
                            className="bg-greenBrandDark dark:bg-greenBrand w-fit text-textLight font-medium rounded py-[2px] px-3 hover:brightness-90"
                            type="submit"
                        >
                            {isLoading
                                ? <CircleNotch className='animate-spin' weight="fill" />
                                : t('common:saveAvatar')
                            }
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}