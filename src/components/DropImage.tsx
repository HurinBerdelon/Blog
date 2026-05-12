import { createRef, useEffect, useState } from "react";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { ArrowCounterClockwise, TrashSimple } from "phosphor-react";
import { FormikErrors } from "formik";
import { useUser } from "@/hooks/useUser";
import { availableImageTypes } from "@/config/availableImageType";
import Image from "next/image";
import { useTranslation } from "next-i18next";

interface DropImageProps {
    errors: FormikErrors<{
        avatar: string
    }>
    setFieldValue(field: string, value: any): void
}

export function DropImage({ errors, setFieldValue }: DropImageProps): JSX.Element {

    const [preview, setPreview] = useState('')
    const dropzoneRef = createRef<DropzoneRef>()
    const { t } = useTranslation()
    const { user } = useUser()

    useEffect(() => {
        setPreview(user?.avatarURL as string)
    }, [user])


    return (
        <Dropzone
            onDrop={(file) => {
                setFieldValue('avatar', file[0])
                const reader = new FileReader()
                reader.readAsDataURL(file[0])
                reader.onload = () => {
                    const dataType = String(reader.result).split(';')[0].split(':')[1]
                    if (availableImageTypes.includes(dataType)) {
                        setPreview(String(reader.result))
                    }
                }
            }}
            ref={dropzoneRef}
        >
            {({ getRootProps, getInputProps, isDragActive }) => (
                preview
                    ? <div className='w-60 h-60 md:w-80 md:h-80 rounded-full relative border-2 border-greenBrand dark:border-greenBrandDark '>
                        <Image width={240} height={240} className='object-cover w-full h-full p-[2px] rounded-full' alt="Profile Preview" src={preview} />
                        <TrashSimple
                            weight="fill"
                            className="absolute bottom-0 right-0 cursor-pointer text-2xl text-red-800 hover:text-red-700 "
                            tabIndex={0}
                            onClick={() => {
                                setPreview('')
                                setFieldValue('avatar', null)
                            }}

                        />
                    </div>
                    : <div className={
                        `w-60 md:w-80 h-60 md:h-80 rounded-full border-2 border-dashed border-greenBrand dark:border-greenBrandDark flex flex-col items-center justify-center relative gap-2 focus:text-red-800 focus:border-red-800 cursor-pointer
                            ${errors.avatar ? 'text-red-800 border-red-800 dark:border-red-800 hover:dark:border-red-700 ' : ''}
                            ${isDragActive ? 'text-red-800 border-red-800 dark:border-red-800 hover:dark:border-red-700' : ''}`
                    }
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <ArrowCounterClockwise
                            weight="bold"
                            className='absolute bottom-0 right-0 cursor-pointer text-2xl text-red-800 hover:text-red-700 '
                            tabIndex={0}
                            onClick={(event) => {
                                event.stopPropagation()
                                setPreview(user?.avatarURL as string)
                            }}
                        />
                        {isDragActive ? (
                            <p className="w-1/2 text-center text-sm text-backgroundDark dark:text-textLight">
                                {t('common:dropHere')}
                            </p>
                        ) : (
                            <p className="w-1/2 text-center text-sm text-backgroundDark dark:text-textLight">
                                {t('common:drag&drop')}
                            </p>
                        )
                        }

                        {errors.avatar && <div className="w-1/2 text-center">{String(errors.avatar)}</div>}
                    </div>
            )}
        </Dropzone>
    )
}