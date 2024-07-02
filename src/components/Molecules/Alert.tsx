import React from 'react'

type Props = {
    text: string,
}
export const Alert:React.FC<Props> = (props) => {
  return (
    <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">Danger alert!</span> {props.text}
      </div>
  )
}
