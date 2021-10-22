export interface IDate {
    year: number,
    month: number,
    day: number
}

export interface ITime {
    hour: number,
    minute: number,
    second: number,
    nano: number
}

export interface IFecha {
    date: IDate,
    time: ITime
}

export interface IPost {
    id: number,
    titulo: string,
    cuerpo: string,
    fecha: IFecha,
    etiquetas: string,
    visible: boolean
}

export interface IPage {
    content: IPost[];
    totalElements: number,
    totalPages: number
}