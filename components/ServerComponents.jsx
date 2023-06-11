import React from 'react'
import { TodoButton } from './Clients'

//Export Explicit
export const TodoItem = ({ title, description, id, completed }) => {
    return (
        <div className="todo">
            {/* Server Side Component */}
            <div>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>

            {/* Client Side Component */}
            <div>
                <TodoButton id={id} completed={completed} />
            </div>
        </div>
    )
}
