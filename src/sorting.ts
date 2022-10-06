type sortedBy<typeField> = {
    fieldName: keyof typeField,
    direction: 'asc' | 'desc'
}

export const sortResult = <typeField>(result: typeField[], sortBy: sortedBy<typeField>[]) => {
    return [...result].sort((first, second) => {
        for (let sort of sortBy) {
            if (first[sort.fieldName] < second[sort.fieldName]) {
                return sort.direction === 'asc' ? -1 : 1
            }
            if (first[sort.fieldName] > second[sort.fieldName]) {
                return sort.direction === 'asc' ? 1 : -1
            }
        }

        return 0
    })
}