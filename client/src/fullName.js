import React from 'react'

const FullName = ({ firstName, lastName, children }) => {
    return children(`${firstName} ${lastName}`)
} 


export default FullName