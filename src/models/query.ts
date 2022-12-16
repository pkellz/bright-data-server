export interface IQuery {
    keyword: string,
    products: IProduct[]
}

interface IProduct {
    search: string,
    title: string,
    url: string,
    price: number,
    image: string,
    imageset: string,
    input: {
        keyword: string
    }
    error?: string
}