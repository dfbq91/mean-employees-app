/* This interface is a definition about what an object contains */
export interface Employee {
    name: string,
    office: string,
    position: string,
    salary: number
    createdAt?: string // ? means optional, useful when we are creating an object
    updatedAt?: string
    _id?: string
}