import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import BetterPropTypes from 'better-prop-types'
import PantryForm from "./PantryForm"
import Togglable from "./Toggleable"
import PantryItem from './PantryItem'
import pantryService from './services/base_service'

const Pantry = ({ errorMessage, setErrorMessage, userId }) => {
    const [items, setItems] = useState([])
    const pantryFormRef = useRef()


    const addItem = (item) => {
        pantryFormRef.current.toggleVisibility()
        pantryService.create(item)
            .then(response => {
                setItems(items.concat(response))
            })
            .catch(() => {
                return setErrorMessage("Item could not be added")
            })
    }

    const editItem = (item) => {
        pantryService.update(item.id, item)
            .then(response => {
                const new_items = items.map(other_item => { return other_item.name === item.name ? response.data : other_item })
                setItems(new_items)

            })
            .catch(() => {
                return setErrorMessage("Item could not be added")
            })
    }

    const handleDeleteItem = (id) => {
        pantryService.remove(id)
        setItems(items.filter((item) => { return item.id !== id }))
    }

    useEffect(() => {
        pantryService.setBaseUrl("/api/pantry")
        pantryService.getAllForUser(userId).then(response => {
            setItems(response.data)
        })

    }, [])

    return (
        <div>
            <h1>Pantry</h1>
            <div>
                <Togglable buttonLabel='Add item to pantry' ref={pantryFormRef}>
                    <PantryForm createItem={addItem} />
                </Togglable>
                <ul>
                    {items.map(item =>
                        <div key={item.id}>
                            <PantryItem testkey={item.id} item={item} handleDelete={() => handleDeleteItem(item.id)} editItem={editItem} />
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}

Pantry.propTypes = {
    errorMessage: BetterPropTypes.string.isRequiredButNullable,
    setErrorMessage: PropTypes.func.isRequired
}

export default Pantry