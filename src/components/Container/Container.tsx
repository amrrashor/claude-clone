import React from 'react'

const Container = ({children, extraClasses}: {children:any, extraClasses?: string}) => {
    return (
        <div className={`${extraClasses} mx-auto w-3/4 h-full text-center`}>
            {children}
        </div>
    )
}

export default Container