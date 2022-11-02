import React from 'react'
import { SearchBox } from './SearchBox'
import { Sidebar } from './Sidebar'

export const InboxPeople = React.forwardRef((props, ref) => {

    return (

        <div className={`inbox_people `} ref={ref}>
            <SearchBox />
            <Sidebar />
        </div>

    )

})
